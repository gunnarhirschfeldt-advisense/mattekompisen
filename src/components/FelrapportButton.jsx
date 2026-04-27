import { useState } from 'react';
import { sparaFelrapport } from '../utils/felrapporter';

const KATEGORIER = [
  { värde: 'fel_svar',   label: 'Svaret stämmer inte' },
  { värde: 'oklar_fråga', label: 'Frågan är oklar' },
  { värde: 'fel_tips',   label: 'Tipset är fel eller förvirrande' },
  { värde: 'annat',      label: 'Annat' },
];

/**
 * Liten knapp som låter eleven rapportera fel i en fråga.
 * Visas efter att eleven har fått svar (kontrolleras av föräldrakomponent).
 *
 * @param {{ fråga: object }} props
 */
export default function FelrapportButton({ fråga }) {
  const [läge, setLäge]             = useState('stängd'); // 'stängd' | 'öppen' | 'skickad'
  const [kategori, setKategori]     = useState('fel_svar');
  const [beskrivning, setBeskrivning] = useState('');

  function skicka() {
    sparaFelrapport({
      frågaId:    fråga.id,
      frågaText:  fråga.question?.slice(0, 120) ?? '',
      nivå:       fråga.level,
      subtopic:   fråga.subtopic,
      kategori,
      beskrivning: beskrivning.trim(),
    });
    setLäge('skickad');
    // Återställ och stäng efter 3 s
    setTimeout(() => {
      setLäge('stängd');
      setBeskrivning('');
      setKategori('fel_svar');
    }, 3000);
  }

  if (läge === 'skickad') {
    return (
      <p className="text-sm text-green-600 font-medium">
        ✓ Tack! Rapporten är registrerad.
      </p>
    );
  }

  if (läge === 'öppen') {
    return (
      <div className="space-y-3 rounded-2xl border border-gray-200 bg-gray-50 p-4">
        <p className="text-sm font-semibold text-gray-700">Rapportera ett fel</p>

        {/* Kategori */}
        <select
          value={kategori}
          onChange={(e) => setKategori(e.target.value)}
          className="w-full rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm text-gray-700 focus:border-indigo-400 focus:outline-none"
        >
          {KATEGORIER.map((k) => (
            <option key={k.värde} value={k.värde}>
              {k.label}
            </option>
          ))}
        </select>

        {/* Valfri kommentar */}
        <textarea
          rows={2}
          value={beskrivning}
          onChange={(e) => setBeskrivning(e.target.value)}
          placeholder="Beskriv felet (valfritt)…"
          className="w-full resize-none rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm text-gray-700 focus:border-indigo-400 focus:outline-none"
        />

        <div className="flex gap-2">
          <button
            onClick={skicka}
            className="rounded-xl bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-700 transition-colors"
          >
            Skicka rapport
          </button>
          <button
            onClick={() => setLäge('stängd')}
            className="rounded-xl border border-gray-200 px-4 py-2 text-sm text-gray-500 hover:bg-gray-100 transition-colors"
          >
            Avbryt
          </button>
        </div>
      </div>
    );
  }

  // Stängd-läge
  return (
    <button
      onClick={() => setLäge('öppen')}
      className="text-xs text-gray-400 hover:text-gray-600 transition-colors"
    >
      🚩 Rapportera fel i frågan
    </button>
  );
}
