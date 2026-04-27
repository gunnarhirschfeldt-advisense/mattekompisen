// ─── Thresholds (exported so UI can import them) ──────────────────────────────
export const UPGRADE_WINDOW      = 6;
export const UPGRADE_THRESHOLD   = 4;    // ≥ 4 rätt av 6 → föreslå uppgradering
export const DOWNGRADE_WINDOW    = 4;
export const DOWNGRADE_THRESHOLD = 1;   // ≤ 1 rätt av 4 → föreslå nedgradering
export const MANUAL_UPGRADE_MIN  = 0.5; // andel rätt för att "Prova nästa nivå" ska vara klickbar

// ─── localStorage helpers ─────────────────────────────────────────────────────

/**
 * Load progress from localStorage.
 * @param {string} storageKey      – e.g. 'progress_geometri'
 * @param {object} initialProgress – module-specific default structure
 */
export function hämtaProgress(storageKey, initialProgress) {
  try {
    const raw = localStorage.getItem(storageKey);
    if (!raw) return structuredClone(initialProgress);
    const parsed = JSON.parse(raw);
    return {
      ...structuredClone(initialProgress),
      ...parsed,
      levels:    { ...initialProgress.levels,    ...parsed.levels },
      subtopics: { ...initialProgress.subtopics, ...parsed.subtopics },
      consecutiveCorrect: parsed.consecutiveCorrect ?? 0,
      consecutiveWrong:   parsed.consecutiveWrong   ?? 0,
      recentResults:      parsed.recentResults      ?? [],
    };
  } catch {
    return structuredClone(initialProgress);
  }
}

/** @param {string} storageKey */
export function sparaProgress(storageKey, progress) {
  localStorage.setItem(storageKey, JSON.stringify(progress));
}

/** @param {string} storageKey */
export function rensaProgress(storageKey) {
  localStorage.removeItem(storageKey);
}

// ─── Weighted random subtopic selection ───────────────────────────────────────
// weight = 1 – (correct / max(attempts, 1))  →  weaker subtopics get higher weight
function väljSubtopicViktat(subtopics, tillgängliga) {
  const vikter = tillgängliga.map((s) => {
    const st = subtopics[s];
    return Math.max(0.1, 1 - st.correct / Math.max(st.attempts, 1));
  });
  const total = vikter.reduce((a, b) => a + b, 0);
  let slump = Math.random() * total;
  for (let i = 0; i < tillgängliga.length; i++) {
    slump -= vikter[i];
    if (slump <= 0) return tillgängliga[i];
  }
  return tillgängliga[tillgängliga.length - 1];
}

/**
 * Pick the next question from the hardcoded bank.
 * Returns null when the bank for the current level is exhausted (caller uses AI).
 *
 * @param {object}   progress – progress object from hämtaProgress
 * @param {object[]} bank     – the module's question bank array
 */
export function getNextQuestionFromBank(progress, bank) {
  const { currentLevel, seenIds, subtopics } = progress;

  // 1. Filter to current level, exclude already-seen ids
  const kandidater = bank.filter(
    (q) => q.level === currentLevel && !seenIds.includes(q.id)
  );
  if (kandidater.length === 0) return null;

  // 2. Group by subtopic
  const perSubtopic = {};
  for (const q of kandidater) {
    if (!perSubtopic[q.subtopic]) perSubtopic[q.subtopic] = [];
    perSubtopic[q.subtopic].push(q);
  }

  // 3. Weighted subtopic selection
  const valtSubtopic = väljSubtopicViktat(subtopics, Object.keys(perSubtopic));

  // 4. Random question within that subtopic
  const pool = perSubtopic[valtSubtopic];
  return pool[Math.floor(Math.random() * pool.length)];
}

// ─── recentResults helpers ────────────────────────────────────────────────────

/**
 * Append a result to recentResults (max 10, FIFO).
 * @param {object}  progress
 * @param {boolean} correct
 * @returns {boolean[]} updated recentResults array
 */
export function updateRecentResults(progress, correct) {
  const updated = [...(progress.recentResults ?? []), correct];
  return updated.length > 10 ? updated.slice(-10) : updated;
}

/**
 * Check whether a level change should be suggested.
 * Returns 'upgrade' | 'downgrade' | null — caller decides whether to act.
 *
 * Downgrade is checked first (takes priority).
 * Upgrade also requires ≥ 2 different subtopics in the recent window.
 *
 * @param {object}   progress
 * @param {object[]} bank – the module's question bank (used for subtopic diversity check)
 */
export function checkLevelChange(progress, bank) {
  const results = progress.recentResults ?? [];

  // Kontrollera nedgradering först (prioriteras)
  if (results.length >= DOWNGRADE_WINDOW) {
    const lastN = results.slice(-DOWNGRADE_WINDOW);
    const correctCount = lastN.filter(Boolean).length;
    if (correctCount <= DOWNGRADE_THRESHOLD) return 'downgrade';
  }

  // Kontrollera uppgradering
  if (results.length >= UPGRADE_WINDOW) {
    const lastN = results.slice(-UPGRADE_WINDOW);
    const correctCount = lastN.filter(Boolean).length;
    if (correctCount < UPGRADE_THRESHOLD) return null;

    // Kräv ≥ 2 olika subtopics i senaste fönstret
    const recentIds = (progress.seenIds ?? []).slice(-UPGRADE_WINDOW);
    const recentSubtopics = new Set(
      recentIds
        .map((id) => bank.find((q) => q.id === id)?.subtopic)
        .filter(Boolean)
    );
    if (recentSubtopics.size >= 2) return 'upgrade';
  }

  return null;
}

/**
 * Returns true if "Prova nästa nivå"-knappen ska vara klickbar.
 * Kräver ≥ 2 besvarade frågor och ≥ 50% rätt i recentResults.
 */
export function canManualUpgrade(progress) {
  const results = progress?.recentResults ?? [];
  if (results.length < 2) return false;
  const correctRatio = results.filter(Boolean).length / results.length;
  return correctRatio >= MANUAL_UPGRADE_MIN;
}

// ─── Update progress after answering ─────────────────────────────────────────
/**
 * Returns { progress }
 * Works for any module — no module-specific references.
 * NOTE: does NOT automatically change currentLevel.
 *       Call checkLevelChange(newProgress, bank) after this to get a suggestion.
 */
export function uppdateraEfterSvar(progress, question, correct, mistakeSummary = '') {
  const ny = structuredClone(progress);
  const { subtopic, id, level } = question;

  // 1. Mark seen
  if (!ny.seenIds.includes(id)) ny.seenIds.push(id);

  // 2. Subtopic accuracy (for weighted selection)
  ny.subtopics[subtopic].attempts  += 1;
  ny.subtopics[subtopic].lastSeen   = new Date().toISOString();
  if (correct) ny.subtopics[subtopic].correct += 1;

  // 3. Level score
  ny.levels[level].total += 1;
  if (correct) ny.levels[level].score += 1;

  // 4. Global consecutive counters (kept for backward compat, not used for level decisions)
  if (correct) {
    ny.consecutiveCorrect = (ny.consecutiveCorrect ?? 0) + 1;
    ny.consecutiveWrong   = 0;
  } else {
    ny.consecutiveWrong   = (ny.consecutiveWrong ?? 0) + 1;
    ny.consecutiveCorrect = 0;
  }

  // 5. Recent mistakes (max 5, FIFO)
  if (!correct && mistakeSummary) {
    ny.recentMistakes = [mistakeSummary, ...ny.recentMistakes].slice(0, 5);
  }

  // 6. recentResults (max 10, FIFO) — used by checkLevelChange / canManualUpgrade
  ny.recentResults = updateRecentResults(ny, correct);

  return { progress: ny };
}

// ─── UI helpers ───────────────────────────────────────────────────────────────
/** Returns 'green' | 'yellow' | 'red' | 'gray' based on accuracy ratio */
export function subtopicFärg(subtopic, subtopics) {
  const st = subtopics[subtopic];
  if (!st || st.attempts === 0) return 'gray';
  const pct = st.correct / st.attempts;
  if (pct >= 0.7) return 'green';
  if (pct >= 0.4) return 'yellow';
  return 'red';
}

// ─── Prompt-builder helper (shared utility, used by each module) ──────────────
/**
 * Build the dynamic user-prompt for Claude question generation.
 * @param {object} progress        – current module progress
 * @param {string[]} subtopicKeys  – ordered list of subtopic keys for this module
 */
export function byggFrågeprompt(progress, subtopicKeys) {
  const { currentLevel, subtopics, recentMistakes } = progress;

  // Find weakest subtopic (lowest correct/attempts ratio)
  const svagest = subtopicKeys
    .slice()
    .sort((a, b) => {
      const ra = subtopics[a].correct / Math.max(subtopics[a].attempts, 1);
      const rb = subtopics[b].correct / Math.max(subtopics[b].attempts, 1);
      return ra - rb;
    })[0];

  const profilRader = subtopicKeys
    .map((k) => `- ${k}: ${subtopics[k].correct}/${subtopics[k].attempts} rätt`)
    .join('\n');

  const mistakesText =
    recentMistakes.length > 0 ? recentMistakes.join('; ') : 'inga än';

  return (
    `Generera en uppgift med dessa krav:\n` +
    `Nivå: ${currentLevel}\n` +
    `Prioritera subtopic (svagaste): ${svagest}\n` +
    `Elevprofil:\n${profilRader}\n` +
    `Senaste misstag: ${mistakesText}`
  );
}
