const STORAGE_KEY = 'felrapporter';

export function sparaFelrapport({ frågaId, frågaText, nivå, subtopic, kategori, beskrivning }) {
  const befintliga = hämtaFelrapporter();
  const ny = {
    id: Date.now(),
    timestamp: new Date().toISOString(),
    frågaId,
    frågaText,
    nivå,
    subtopic,
    kategori,
    beskrivning,
  };
  localStorage.setItem(STORAGE_KEY, JSON.stringify([...befintliga, ny]));
}

export function hämtaFelrapporter() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '[]');
  } catch {
    return [];
  }
}

export function rensaFelrapporter() {
  localStorage.removeItem(STORAGE_KEY);
}
