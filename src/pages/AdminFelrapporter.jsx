import { useState } from 'react';
import { hämtaFelrapporter, rensaFelrapporter } from '../utils/felrapporter';

const KATEGORI_LABEL = {
  fel_svar:    'Svaret stämmer inte',
  oklar_fråga: 'Frågan är oklar',
  fel_tips:    'Tipset är fel eller förvirrande',
  annat:       'Annat',
};

function formateraTimestamp(iso) {
  return new Date(iso).toLocaleString('sv-SE', {
    dateStyle: 'short',
    timeStyle: 'short',
  });
}

export default function AdminFelrapporter() {
  const [rapporter, setRapporter] = useState(() =>
    [...hämtaFelrapporter()].reverse()
  );
  const [kopierat, setKopierat] = useState(false);

  function kopieraJSON() {
    navigator.clipboard.writeText(JSON.stringify(rapporter, null, 2)).then(() => {
      setKopierat(true);
      setTimeout(() => setKopierat(false), 2000);
    });
  }

  function rensa() {
    if (!window.confirm('Rensa alla rapporter? Detta går inte att ångra.')) return;
    rensaFelrapporter();
    setRapporter([]);
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="mx-auto max-w-3xl space-y-6">
        {/* Rubrik */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Felrapporter</h1>
            <p className="text-sm text-gray-500">
              {rapporter.length} rapport{rapporter.length !== 1 ? 'er' : ''} registrerad{rapporter.length !== 1 ? 'e' : ''}
            </p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={kopieraJSON}
              className="rounded-xl border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 transition-colors"
            >
              {kopierat ? '✓ Kopierat!' : 'Kopiera som JSON'}
            </button>
            {rapporter.length > 0 && (
              <button
                onClick={rensa}
                className="rounded-xl bg-red-100 px-4 py-2 text-sm font-medium text-red-700 hover:bg-red-200 transition-colors"
              >
                Rensa alla
              </button>
            )}
          </div>
        </div>

        {/* Tom state */}
        {rapporter.length === 0 && (
          <div className="rounded-2xl border border-gray-200 bg-white p-10 text-center text-gray-400">
            Inga rapporter registrerade ännu.
          </div>
        )}

        {/* Rapportlista */}
        <div className="space-y-3">
          {rapporter.map((r) => (
            <div
              key={r.id}
              className="rounded-2xl border border-gray-200 bg-white p-5 space-y-2"
            >
              {/* Header-rad */}
              <div className="flex items-center justify-between flex-wrap gap-2">
                <div className="flex items-center gap-2">
                  <span className="rounded-lg bg-indigo-100 px-2 py-0.5 text-xs font-bold text-indigo-700">
                    {r.frågaId ?? '—'}
                  </span>
                  <span className="rounded-lg bg-gray-100 px-2 py-0.5 text-xs text-gray-600">
                    Nivå {r.nivå}
                  </span>
                  <span className="rounded-lg bg-gray-100 px-2 py-0.5 text-xs text-gray-600">
                    {r.subtopic}
                  </span>
                </div>
                <span className="text-xs text-gray-400">{formateraTimestamp(r.timestamp)}</span>
              </div>

              {/* Kategori */}
              <p className="text-sm font-semibold text-gray-700">
                {KATEGORI_LABEL[r.kategori] ?? r.kategori}
              </p>

              {/* Frågetext */}
              {r.frågaText && (
                <p className="text-xs text-gray-500 italic line-clamp-2">
                  &ldquo;{r.frågaText}&rdquo;
                </p>
              )}

              {/* Elevens beskrivning */}
              {r.beskrivning && (
                <p className="text-sm text-gray-700 rounded-lg bg-gray-50 px-3 py-2">
                  {r.beskrivning}
                </p>
              )}
            </div>
          ))}
        </div>

        {/* Tillbaka-länk */}
        <p className="text-center text-xs text-gray-400">
          <a href="/" className="underline hover:text-gray-600">
            ← Tillbaka till appen
          </a>
        </p>
      </div>
    </div>
  );
}
