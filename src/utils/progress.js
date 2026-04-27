const STORAGE_KEY = 'mattekompisen_progress';

// Modules that use adaptiveEngine — maps modulId → storageKey
const NY_MODUL_NYCKLAR = {
  'brak-procent':     'progress_bråk_procent',
  'geometri-matning': 'progress_geometri',
};

export function hämtaFramsteg() {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : {};
  } catch {
    return {};
  }
}

export function sparaFramsteg(framsteg) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(framsteg));
}

// Returnerar { rätt, fel, nivå, rätt_i_rad } för en given modul+nivå
export function hämtaModulStatus(framsteg, modulId, nivå) {
  return framsteg?.[modulId]?.[nivå] ?? { rätt: 0, fel: 0, rätt_i_rad: 0, klar: false };
}

export function uppdateraModulStatus(framsteg, modulId, nivå, korrekt) {
  const ny = { ...framsteg };
  if (!ny[modulId]) ny[modulId] = {};
  const prev = ny[modulId][nivå] ?? { rätt: 0, fel: 0, rätt_i_rad: 0, klar: false };

  const rätt_i_rad = korrekt ? prev.rätt_i_rad + 1 : 0;
  ny[modulId][nivå] = {
    rätt: prev.rätt + (korrekt ? 1 : 0),
    fel: prev.fel + (korrekt ? 0 : 1),
    rätt_i_rad,
    klar: rätt_i_rad >= 3,
  };
  return ny;
}

// Reads one new-format (adaptiveEngine) storage key and converts to the
// { E: {...}, C: {...}, A: {...}, _currentLevel: 'X' } shape used by Startsida.
function hämtaNyModulData(storageKey) {
  try {
    const raw = localStorage.getItem(storageKey);
    if (!raw) return null;
    const prog = JSON.parse(raw);
    const currentLevel = prog.currentLevel ?? 'E';

    const result = { _currentLevel: currentLevel };
    let anyData = false;

    for (const lvl of ['E', 'C', 'A']) {
      const l = prog.levels?.[lvl];
      if (!l || (l.total ?? 0) === 0) continue;
      anyData = true;
      const rätt  = l.score ?? 0;
      const total = l.total ?? 0;
      const klar  = l.completed ?? false;
      // Live streak counter only applies to the level currently being practiced.
      const rätt_i_rad = currentLevel === lvl
        ? (prog.consecutiveCorrect ?? 0)
        : (klar ? 5 : 0);   // 5 = UPGRADE_THRESHOLD
      result[lvl] = { rätt, fel: total - rätt, rätt_i_rad, klar };
    }

    return anyData ? result : null;
  } catch {
    return null;
  }
}

// Returns the same shape as hämtaFramsteg() but also merges in data from
// modules that use adaptiveEngine (which write to their own localStorage keys).
export function hämtaKombineratFramsteg() {
  const base = hämtaFramsteg();
  for (const [modulId, nyckel] of Object.entries(NY_MODUL_NYCKLAR)) {
    const nyData = hämtaNyModulData(nyckel);
    if (nyData) base[modulId] = nyData;
  }
  return base;
}

// Returnerar 'grön' | 'gul' | 'grå' för ett modulkort
export function modulKortStatus(framsteg, modulId) {
  const modulData = framsteg?.[modulId];
  if (!modulData) return 'grå';
  const eStatus = modulData['E'];
  if (eStatus?.klar) return 'grön';
  if (eStatus?.rätt > 0 || eStatus?.fel > 0) return 'gul';
  return 'grå';
}
