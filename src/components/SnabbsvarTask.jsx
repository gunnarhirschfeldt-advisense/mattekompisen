import { useState } from 'react';

export default function SnabbsvarTask({ uppgift, onSvar }) {
  const [vald, setVald] = useState(null);
  const [inmatning, setInmatning] = useState('');
  const [visar, setVisar] = useState(false); // visar resultat

  function kontrollera() {
    let korrekt = false;
    if (uppgift.variant === 'flerval') {
      korrekt = vald === uppgift.svar;
    } else {
      korrekt = parseFloat(inmatning.replace(',', '.')) === uppgift.svar;
    }
    setVisar(true);
    onSvar(korrekt);
  }

  function reset() {
    setVald(null);
    setInmatning('');
    setVisar(false);
  }

  const kanSkicka =
    uppgift.variant === 'flerval' ? vald !== null : inmatning.trim() !== '';

  return (
    <div className="space-y-5">
      <p className="text-lg font-medium text-gray-800 leading-relaxed">{uppgift.fråga}</p>

      {uppgift.variant === 'flerval' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {uppgift.alternativ.map((alt) => {
            let stil =
              'w-full py-3 px-4 rounded-2xl border-2 text-left font-medium transition-all cursor-pointer ';
            if (!visar) {
              stil +=
                vald === alt
                  ? 'border-indigo-500 bg-indigo-50 text-indigo-700'
                  : 'border-gray-200 bg-white hover:border-indigo-300 hover:bg-indigo-50 text-gray-700';
            } else {
              if (alt === uppgift.svar) {
                stil += 'border-green-500 bg-green-50 text-green-700';
              } else if (alt === vald && alt !== uppgift.svar) {
                stil += 'border-red-400 bg-red-50 text-red-700';
              } else {
                stil += 'border-gray-200 bg-white text-gray-400';
              }
            }
            return (
              <button
                key={alt}
                className={stil}
                onClick={() => !visar && setVald(alt)}
                disabled={visar}
              >
                {alt}
              </button>
            );
          })}
        </div>
      )}

      {uppgift.variant === 'numerisk' && (
        <div className="flex items-center gap-3">
          <input
            type="number"
            value={inmatning}
            onChange={(e) => setInmatning(e.target.value)}
            disabled={visar}
            placeholder="Skriv ditt svar…"
            className="flex-1 max-w-48 py-3 px-4 rounded-2xl border-2 border-gray-200 focus:border-indigo-400 focus:outline-none text-xl font-bold text-center"
          />
          {uppgift.enhet && (
            <span className="text-gray-500 font-medium text-lg">{uppgift.enhet}</span>
          )}
        </div>
      )}

      {visar && (
        <div
          className={`rounded-2xl p-4 ${
            (uppgift.variant === 'flerval' ? vald === uppgift.svar : parseFloat(inmatning.replace(',', '.')) === uppgift.svar)
              ? 'bg-green-50 border border-green-200'
              : 'bg-amber-50 border border-amber-200'
          }`}
        >
          {(uppgift.variant === 'flerval' ? vald === uppgift.svar : parseFloat(inmatning.replace(',', '.')) === uppgift.svar) ? (
            <p className="text-green-700 font-semibold">🎉 Rätt! Bra jobbat!</p>
          ) : (
            <div className="space-y-2">
              <p className="text-amber-700 font-semibold">
                Inte helt rätt den här gången.
              </p>
              <p className="text-amber-600 text-sm">
                <strong>Rätt svar:</strong>{' '}
                {uppgift.svar}
                {uppgift.enhet ? ` ${uppgift.enhet}` : ''}
              </p>
              <p className="text-amber-600 text-sm">
                <strong>Tips:</strong> {uppgift.tips}
              </p>
            </div>
          )}
        </div>
      )}

      {!visar ? (
        <button
          onClick={kontrollera}
          disabled={!kanSkicka}
          className="w-full py-3 px-6 rounded-2xl bg-indigo-600 text-white font-bold text-lg hover:bg-indigo-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
        >
          Kontrollera svar
        </button>
      ) : (
        <button
          onClick={reset}
          className="w-full py-3 px-6 rounded-2xl bg-gray-100 text-gray-700 font-bold text-lg hover:bg-gray-200 transition-colors"
        >
          Nästa uppgift →
        </button>
      )}
    </div>
  );
}
