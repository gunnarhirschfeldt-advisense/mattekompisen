import { useState } from 'react';
import { bedömSvar, tolkaHandskrift } from '../api/claudeApi';
import FeedbackCard from './FeedbackCard';
import FigureRenderer from './FigureRenderer';
import FelrapportButton from './FelrapportButton';
import HandwritingCanvas from './HandwritingCanvas';

// ─── MultipleChoice ───────────────────────────────────────────────────────────
function MultipleChoice({ options, onVälj, vald, visaResultat, rätt }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      {options.map((opt) => {
        let stil = 'w-full py-3 px-4 rounded-2xl border-2 text-left font-medium transition-all ';
        if (!visaResultat) {
          stil += vald === opt
            ? 'border-indigo-500 bg-indigo-50 text-indigo-700'
            : 'border-gray-200 bg-white hover:border-indigo-300 hover:bg-indigo-50 text-gray-700 cursor-pointer';
        } else {
          if (opt === rätt) {
            stil += 'border-green-500 bg-green-50 text-green-700';
          } else if (opt === vald) {
            stil += 'border-red-400 bg-red-50 text-red-600';
          } else {
            stil += 'border-gray-100 bg-white text-gray-300';
          }
        }
        return (
          <button key={opt} className={stil} onClick={() => !visaResultat && onVälj(opt)} disabled={visaResultat}>
            {opt}
          </button>
        );
      })}
    </div>
  );
}

// ─── NumericInput ─────────────────────────────────────────────────────────────
function NumericInput({ onSkicka, visaResultat }) {
  const [val, setVal] = useState('');
  return (
    <div className="flex items-center gap-3">
      <input
        type="number"
        value={val}
        onChange={(e) => setVal(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && val && !visaResultat && onSkicka(val)}
        disabled={visaResultat}
        placeholder="Ditt svar…"
        className="w-36 py-3 px-4 rounded-2xl border-2 border-gray-200 focus:border-indigo-400 focus:outline-none text-xl font-bold text-center"
      />
      {!visaResultat && (
        <button
          onClick={() => val && onSkicka(val)}
          disabled={!val}
          className="py-3 px-5 rounded-2xl bg-indigo-600 text-white font-bold hover:bg-indigo-700 disabled:opacity-40 transition-colors"
        >
          OK
        </button>
      )}
    </div>
  );
}

// ─── OpenAnswer ───────────────────────────────────────────────────────────────
function OpenAnswer({ onSkicka, laddar, visaResultat }) {
  const [text, setText] = useState('');
  return (
    <div className="space-y-3">
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-3 text-sm text-blue-700">
        ✏️ <strong>Visa din uträkning.</strong> Skriv hur du tänker — AI-läraren bedömer ditt resonemang.
      </div>
      <textarea
        rows={4}
        value={text}
        onChange={(e) => setText(e.target.value)}
        disabled={visaResultat || laddar}
        placeholder="Skriv din uträkning och ditt svar här…"
        className="w-full p-4 rounded-2xl border-2 border-gray-200 focus:border-indigo-400 focus:outline-none resize-none text-gray-800"
      />
      {!visaResultat && (
        <button
          onClick={() => text.trim() && onSkicka(text)}
          disabled={!text.trim() || laddar}
          className="w-full py-3 rounded-2xl bg-indigo-600 text-white font-bold hover:bg-indigo-700 disabled:opacity-40 transition-colors flex items-center justify-center gap-2"
        >
          {laddar ? (
            <>
              <span className="animate-spin inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full" />
              Läraren läser…
            </>
          ) : (
            'Lämna in svar'
          )}
        </button>
      )}
    </div>
  );
}

// ─── InputToggle ─────────────────────────────────────────────────────────────
function InputToggle({ handskrift, onChange, disabled }) {
  return (
    <div className="flex gap-2 justify-end">
      <button
        onClick={() => onChange(false)}
        disabled={disabled}
        className={`text-xs px-3 py-1.5 rounded-xl font-medium transition-colors ${
          !handskrift
            ? 'bg-indigo-100 text-indigo-700'
            : 'text-gray-400 hover:text-gray-600'
        }`}
      >
        ⌨️ Tangentbord
      </button>
      <button
        onClick={() => onChange(true)}
        disabled={disabled}
        className={`text-xs px-3 py-1.5 rounded-xl font-medium transition-colors ${
          handskrift
            ? 'bg-indigo-100 text-indigo-700'
            : 'text-gray-400 hover:text-gray-600'
        }`}
      >
        ✍️ Rita svar
      </button>
    </div>
  );
}

// ─── QuestionCard — public ────────────────────────────────────────────────────
/**
 * @param {object}   fråga              – question object (may include .figure)
 * @param {function} onSvarat(correct, mistakeSummary)
 * @param {string[]} recentMistakes     – passed to Claude for context
 * @param {object}   subtopicEtiketter  – { subtopicKey: 'Label' }
 * @param {string}   level              – elevens nivå ('E'|'C'|'A'), skickas till bedömSvar
 * @param {string}   systemPrompt       – modulens bedömningsprompt, skickas till bedömSvar
 */
export default function QuestionCard({
  fråga,
  onSvarat,
  recentMistakes = [],
  subtopicEtiketter = {},
  level = null,
  systemPrompt = null,
}) {
  const [vald, setVald]             = useState(null);
  const [visaResultat, setVisa]     = useState(false);
  const [feedback, setFeedback]     = useState(null);
  const [bedömLaddar, setBedöm]     = useState(false);
  const [visionLaddar, setVision]   = useState(false);
  const [handskrift, setHandskrift] = useState(false);

  const laddar = bedömLaddar || visionLaddar;
  const kanRita = fråga.type === 'numeric' || fråga.type === 'open';

  async function hanteraSvar(svar) {
    if (fråga.type === 'open') {
      setBedöm(true);
      try {
        const res = await bedömSvar({
          question:            fråga.question,
          correct_answer:      fråga.correct_answer,
          evaluation_criteria: fråga.evaluation_criteria,
          elevensSvar:         svar,
          recentMistakes,
          level,
          systemPrompt,
        });
        setFeedback(res);
        setVisa(true);
        onSvarat(res.correct, res.mistakeSummary ?? '');
      } catch {
        const fallback = {
          correct: false,
          feedback: 'Kunde inte kontakta AI-läraren just nu. Försök igen.',
          hint: fråga.hint,
          mistakeSummary: '',
        };
        setFeedback(fallback);
        setVisa(true);
        onSvarat(false, '');
      } finally {
        setBedöm(false);
      }
    } else {
      // Numeric / multiple_choice — check in code
      const normSvar  = svar.toString().trim().replace(',', '.');
      const normFacit = fråga.correct_answer.toString().trim().replace(',', '.');
      const korrekt   = normSvar.toLowerCase() === normFacit.toLowerCase();
      setVald(svar);
      setFeedback({
        correct: korrekt,
        feedback: korrekt ? 'Bra jobbat!' : '',
        hint: fråga.hint,
        mistakeSummary: '',
      });
      setVisa(true);
      onSvarat(
        korrekt,
        korrekt ? '' : `${fråga.subtopic}: svarade ${svar} istället för ${fråga.correct_answer}`
      );
    }
  }

  async function hanteraHandskrift(base64) {
    setVision(true);
    try {
      const { text } = await tolkaHandskrift(base64, fråga.type, fråga.question);
      await hanteraSvar(text);
    } catch {
      const fallback = {
        correct: false,
        feedback: 'Kunde inte läsa handskriften just nu. Försök igen eller byt till tangentbord.',
        hint: fråga.hint,
        mistakeSummary: '',
      };
      setFeedback(fallback);
      setVisa(true);
      onSvarat(false, '');
    } finally {
      setVision(false);
    }
  }

  const etikett = subtopicEtiketter[fråga.subtopic] ?? fråga.subtopic;

  return (
    <div className="bg-white rounded-3xl border border-gray-200 shadow-sm p-6 space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <span className="text-xs text-gray-400 font-medium">{etikett}</span>
        <span className="text-xs text-gray-400">
          {fråga.type === 'multiple_choice' && '⚡ Flervalsfråga'}
          {fråga.type === 'numeric'         && '🔢 Siffersvar'}
          {fråga.type === 'open'            && '✏️ Redovisning'}
        </span>
      </div>

      {/* Optional figure — above question text */}
      {fråga.figure_svg && (
        <div className="bg-gray-50 rounded-2xl p-3">
          <FigureRenderer figure_svg={fråga.figure_svg} questionId={fråga.id} />
        </div>
      )}

      {/* Question */}
      <p className="text-lg font-medium text-gray-800 leading-relaxed whitespace-pre-line">
        {fråga.question}
      </p>

      {/* Input mode toggle */}
      {kanRita && !visaResultat && (
        <InputToggle handskrift={handskrift} onChange={setHandskrift} disabled={laddar} />
      )}

      {/* Input */}
      {fråga.type === 'multiple_choice' && (
        <MultipleChoice
          options={fråga.options}
          onVälj={hanteraSvar}
          vald={vald}
          visaResultat={visaResultat}
          rätt={fråga.correct_answer}
        />
      )}
      {fråga.type === 'numeric' && (
        handskrift
          ? <HandwritingCanvas onSkicka={hanteraHandskrift} laddar={laddar} visaResultat={visaResultat} />
          : <NumericInput onSkicka={hanteraSvar} visaResultat={visaResultat} />
      )}
      {fråga.type === 'open' && (
        handskrift
          ? <HandwritingCanvas onSkicka={hanteraHandskrift} laddar={laddar} visaResultat={visaResultat} />
          : <OpenAnswer onSkicka={hanteraSvar} laddar={bedömLaddar} visaResultat={visaResultat} />
      )}

      {visionLaddar && (
        <div className="flex items-center gap-2 text-indigo-500 text-sm">
          <span className="animate-spin inline-block w-4 h-4 border-2 border-indigo-300 border-t-indigo-500 rounded-full" />
          Läser handskriften…
        </div>
      )}
      {bedömLaddar && !visionLaddar && (
        <div className="flex items-center gap-2 text-indigo-500 text-sm">
          <span className="animate-spin inline-block w-4 h-4 border-2 border-indigo-300 border-t-indigo-500 rounded-full" />
          AI-läraren bedömer ditt svar…
        </div>
      )}

      <FeedbackCard
        korrekt={feedback?.correct}
        feedback={feedback?.feedback}
        hint={feedback?.hint}
        rättSvar={!feedback?.correct ? fråga.correct_answer : null}
        visar={visaResultat}
      />

      {visaResultat && (
        <div className="pt-2 border-t border-gray-100">
          <FelrapportButton fråga={fråga} />
        </div>
      )}
    </div>
  );
}
