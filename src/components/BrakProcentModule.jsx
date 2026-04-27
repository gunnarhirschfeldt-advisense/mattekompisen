import { useState, useEffect } from 'react';
import {
  hämtaProgress,
  sparaProgress,
  rensaProgress,
  getNextQuestionFromBank,
  uppdateraEfterSvar,
  checkLevelChange,
  byggFrågeprompt,
} from '../utils/adaptiveEngine';
import { genereraFråga } from '../api/claudeApi';
import { BRAK_PROCENT_BANK } from '../data/brakProcentBank';

import LevelIndicator       from './LevelIndicator';
import SubtopicStrengths    from './SubtopicStrengths';
import StreakBar             from './StreakBar';
import QuestionCard         from './QuestionCard';
import LoadingSpinner       from './LoadingSpinner';
import LevelSuggestionModal from './LevelSuggestionModal';

// ─── Module constants ─────────────────────────────────────────────────────────
const STORAGE_KEY = 'progress_bråk_procent';

const SUBTOPIC_KEYS = ['jämförelse', 'tallinje', 'omvandling', 'andel'];

const INITIAL_PROGRESS = {
  levels: {
    E: { completed: false, score: 0, total: 0 },
    C: { completed: false, score: 0, total: 0 },
    A: { completed: false, score: 0, total: 0 },
  },
  subtopics: {
    jämförelse: { correct: 0, attempts: 0, lastSeen: null },
    tallinje:   { correct: 0, attempts: 0, lastSeen: null },
    omvandling: { correct: 0, attempts: 0, lastSeen: null },
    andel:      { correct: 0, attempts: 0, lastSeen: null },
  },
  recentMistakes:     [],
  recentResults:      [],
  currentLevel:       'C',
  seenIds:            [],
  consecutiveCorrect: 0,
  consecutiveWrong:   0,
};

const SUBTOPIC_NAMN = {
  jämförelse: 'Jämförelse',
  tallinje:   'Tallinje',
  omvandling: 'Omvandling',
  andel:      'Andel',
};

const SUBTOPIC_ETIKETTER = {
  jämförelse: '⚖️ Jämförelse',
  tallinje:   '📏 Tallinje',
  omvandling: '🔄 Omvandling',
  andel:      '📊 Andel',
};

const FRÅGE_EXTRA = `
Instruktioner:
- Använd vardagliga svenska kontexter (sport, mat, skola)
- Om eleven har missat samma subtopic 3+ gånger: formulera uppgiften med mer stöd men sänk inte nivån
- Variera talen så uppgiften inte liknar startbanken
- För type "open": skriv evaluation_criteria som beskriver vad ett godkänt resonemang innehåller`;

// ─── Bedömningsprompt ──────────────────────────────────────────────────────────
const SYSTEM_PROMPT = `Du är en varm och uppmuntrande matematiklärare för elever i årskurs 6 (ca 12 år). Din uppgift är att bedöma elevens svar om bråk och procent och ge pedagogisk feedback på svenska.

BEDÖMNING — returnera alltid giltig JSON i exakt detta format, inget annat:
{
  "correct": true,
  "feedback": "Din förklaring här.",
  "hint": null
}
eller om fel:
{
  "correct": false,
  "feedback": "Din feedback här.",
  "hint": "Din ledtråd här."
}

REGLER FÖR FEEDBACK (max 3 meningar):
- Börja alltid med vad eleven gör rätt, även vid fel svar
- Förklara kort vad som saknas eller är fel med enkla ord
- Avsluta med ett konkret nästa steg eller en fråga som hjälper eleven vidare
- Använd aldrig: tyvärr, fel, felaktigt, inte rätt
- Använd gärna: nästan, bra start, du är på rätt spår, prova att tänka på

HINT — bara om correct=false:
- En kort ledtråd som pekar mot rätt tankesätt utan att avslöja svaret
- Max en mening
- null om correct=true

NIVÅANPASSNING baserat på elevens nivå:
- E: bekräfta rätt svar och beröm konkret observation, inga höga krav på förklaring
- C: lyft fram om eleven förklarar sambandet, uppmuntra till mer om det saknas
- A: efterfråga generalisering om den saknas, bekräfta systematiskt resonemang

TIDIGARE MISSTAG: Om tidigare misstag anges — koppla feedbacken till mönstret om det är relevant.`;

function byggPrompt(progress) {
  return byggFrågeprompt(progress, SUBTOPIC_KEYS) + FRÅGE_EXTRA;
}

function hämtaFallback(level) {
  const kandidater = BRAK_PROCENT_BANK.filter((q) => q.level === level);
  if (!kandidater.length) return BRAK_PROCENT_BANK[0];
  return kandidater[Math.floor(Math.random() * kandidater.length)];
}

// ─── BrakProcentModule ────────────────────────────────────────────────────────
export default function BrakProcentModule({ modul }) {
  const [progress, setProgress]               = useState(() => hämtaProgress(STORAGE_KEY, INITIAL_PROGRESS));
  const [aktivFråga, setAktivFråga]           = useState(null);
  const [laddar, setLaddar]                   = useState(false);
  const [apiError, setApiError]               = useState(null);
  const [svaratPåAktiv, setSvarat]            = useState(false);
  const [levelSuggestion, setLevelSuggestion] = useState(null);

  async function laddaNästaFråga(prog) {
    setLaddar(true);
    setApiError(null);
    setSvarat(false);

    const frånBank = getNextQuestionFromBank(prog, BRAK_PROCENT_BANK);
    if (frånBank) {
      setAktivFråga(frånBank);
      setLaddar(false);
      return;
    }

    try {
      const generated = await genereraFråga(byggPrompt(prog));
      setAktivFråga(generated);
    } catch (err) {
      setApiError(
        err.message === 'API_KEY_SAKNAS'
          ? 'API-nyckel saknas. Skapa .env med VITE_ANTHROPIC_API_KEY.'
          : 'Kunde inte hämta ny fråga från AI. Kontrollera din anslutning.'
      );
      setAktivFråga(hämtaFallback(prog.currentLevel));
    } finally {
      setLaddar(false);
    }
  }

  useEffect(() => { laddaNästaFråga(progress); }, []); // eslint-disable-line

  function hanteraSvarat(korrekt, mistakeSummary) {
    setSvarat(true);
    const { progress: ny } = uppdateraEfterSvar(progress, aktivFråga, korrekt, mistakeSummary);
    sparaProgress(STORAGE_KEY, ny);
    setProgress(ny);
    const suggestion = checkLevelChange(ny, BRAK_PROCENT_BANK);
    if (suggestion) setLevelSuggestion(suggestion);
  }

  function hanteraNivåbyte(suggestion) {
    const nyNivå = suggestion === 'upgrade'
      ? { E: 'C', C: 'A' }[progress.currentLevel]
      : { C: 'E', A: 'C' }[progress.currentLevel];
    if (!nyNivå) { setLevelSuggestion(null); return; }
    const nyProgress = { ...progress, currentLevel: nyNivå, recentResults: [], consecutiveCorrect: 0, consecutiveWrong: 0 };
    sparaProgress(STORAGE_KEY, nyProgress);
    setProgress(nyProgress);
    setLevelSuggestion(null);
    laddaNästaFråga(nyProgress);
  }

  function hanteraManuellUppgradering() {
    const nästa = { E: 'C', C: 'A' }[progress.currentLevel];
    if (!nästa) return;
    const nyProgress = { ...progress, currentLevel: nästa, recentResults: [], consecutiveCorrect: 0, consecutiveWrong: 0 };
    sparaProgress(STORAGE_KEY, nyProgress);
    setProgress(nyProgress);
    laddaNästaFråga(nyProgress);
  }

  function hanteraManuellNedgradering() {
    const föregående = { C: 'E', A: 'C' }[progress.currentLevel];
    if (!föregående) return;
    const nyProgress = { ...progress, currentLevel: föregående, recentResults: [], consecutiveCorrect: 0, consecutiveWrong: 0 };
    sparaProgress(STORAGE_KEY, nyProgress);
    setProgress(nyProgress);
    laddaNästaFråga(nyProgress);
  }

  function hanteraNästa() {
    setProgress((latest) => { laddaNästaFråga(latest); return latest; });
  }

  const apiKeyMissing = !import.meta.env.VITE_PROXY_URL;

  return (
    <div className="max-w-2xl mx-auto px-4 py-8 space-y-6">

      {levelSuggestion && (
        <LevelSuggestionModal
          suggestion={levelSuggestion}
          currentLevel={progress.currentLevel}
          onAccept={() => hanteraNivåbyte(levelSuggestion)}
          onDismiss={() => setLevelSuggestion(null)}
        />
      )}

      {/* Header */}
      <div className="flex items-center gap-3">
        <div className={`w-12 h-12 rounded-2xl ${modul.ikonBg} flex items-center justify-center text-2xl`}>
          {modul.ikon}
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{modul.namn}</h1>
          <p className="text-gray-500 text-sm">{modul.beskrivning}</p>
        </div>
      </div>

      <LevelIndicator current={progress.currentLevel} levels={progress.levels} />
      <SubtopicStrengths subtopics={progress.subtopics} namen={SUBTOPIC_NAMN} />
      <StreakBar
        progress={progress}
        currentLevel={progress.currentLevel}
        onManualUpgrade={hanteraManuellUppgradering}
        onManualDowngrade={hanteraManuellNedgradering}
      />

      {/* Module complete */}
      {progress.levels.A.completed && (
        <div className="bg-gradient-to-br from-indigo-50 to-purple-50 border border-indigo-200 rounded-3xl p-8 text-center space-y-3">
          <div className="text-6xl">🏆</div>
          <h2 className="text-2xl font-bold text-indigo-700">Modulen avklarad!</h2>
          <p className="text-gray-600">Du har klarat alla nivåer i {modul.namn}. Imponerande!</p>
          <button
            onClick={() => { rensaProgress(STORAGE_KEY); window.location.reload(); }}
            className="mt-2 px-5 py-2 rounded-xl bg-indigo-100 text-indigo-700 font-semibold hover:bg-indigo-200 transition-colors text-sm"
          >
            Öva igen från början
          </button>
        </div>
      )}

      {apiKeyMissing && (
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-3 text-sm text-amber-700 flex gap-2">
          <span>⚠️</span>
          <span>
            <strong>Proxy saknas.</strong> Redovisningsfrågor och AI-genererade frågor
            kräver att <code className="bg-amber-100 px-1 rounded">VITE_PROXY_URL</code> är satt.
          </span>
        </div>
      )}

      {apiError && (
        <div className="bg-red-50 border border-red-200 rounded-2xl p-3 text-sm text-red-700">
          ⚠️ {apiError}
        </div>
      )}

      {laddar ? (
        <LoadingSpinner text="Hämtar nästa fråga…" />
      ) : aktivFråga && !progress.levels.A.completed ? (
        <>
          <QuestionCard
            key={aktivFråga.id}
            fråga={aktivFråga}
            onSvarat={hanteraSvarat}
            recentMistakes={progress.recentMistakes}
            subtopicEtiketter={SUBTOPIC_ETIKETTER}
            level={progress.currentLevel}
            systemPrompt={SYSTEM_PROMPT}
          />
          {svaratPåAktiv && (
            <button
              onClick={hanteraNästa}
              className="w-full py-3 px-6 rounded-2xl bg-indigo-600 text-white font-bold text-lg hover:bg-indigo-700 transition-colors"
            >
              Nästa fråga →
            </button>
          )}
        </>
      ) : null}

      <div className="bg-white rounded-2xl border border-gray-200 p-4 grid grid-cols-3 gap-3 text-center text-sm">
        {['E', 'C', 'A'].map((l) => {
          const lv = progress.levels[l];
          return (
            <div key={l}>
              <div className="font-bold text-gray-700">Nivå {l}</div>
              <div className="text-gray-500">{lv.score}/{lv.total} rätt</div>
              {lv.completed && <div className="text-green-500 text-xs">✓ Klar</div>}
            </div>
          );
        })}
      </div>
    </div>
  );
}
