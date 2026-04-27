import { useState, useEffect } from 'react';
import SnabbsvarTask from '../components/SnabbsvarTask';
import RedovisningTask from '../components/RedovisningTask';
import { hämtaModulStatus, uppdateraModulStatus } from '../utils/progress';

const NIVÅ_LABEL = {
  E: { label: 'E — Grundnivå', färg: 'bg-green-100 text-green-700 border-green-300' },
  C: { label: 'C — Mellannivå', färg: 'bg-yellow-100 text-yellow-700 border-yellow-300' },
  A: { label: 'A — Generalisering', färg: 'bg-purple-100 text-purple-700 border-purple-300' },
};

// Blanda array
function blanda(arr) {
  return [...arr].sort(() => Math.random() - 0.5);
}

export default function ModulSida({ modul, uppgifter, framsteg, onFramstegUppdatera }) {
  const [nivå, setNivå] = useState('E');
  const [kö, setKö] = useState([]);
  const [index, setIndex] = useState(0);
  const [klart, setKlart] = useState(false);
  const [rätt_i_rad, setRätt_i_rad] = useState(0);

  useEffect(() => {
    const status = hämtaModulStatus(framsteg, modul.id, nivå);
    setRätt_i_rad(status.rätt_i_rad);
    const lista = uppgifter[nivå] ?? [];
    setKö(lista.length ? blanda(lista) : []);
    setIndex(0);
    setKlart(false);
  }, [nivå, modul.id]);

  function handleSvar(korrekt) {
    const nyFramsteg = uppdateraModulStatus(framsteg, modul.id, nivå, korrekt);
    onFramstegUppdatera(nyFramsteg);

    const nyRätt = korrekt ? rätt_i_rad + 1 : 0;
    setRätt_i_rad(nyRätt);

    // Nästa nivå om 3 rätt i rad
    if (nyRätt >= 3) {
      if (nivå === 'E') {
        setTimeout(() => setNivå('C'), 1200);
      } else if (nivå === 'C') {
        setTimeout(() => setNivå('A'), 1200);
      } else {
        setKlart(true);
      }
    }
  }

  function nästaUppgift() {
    setIndex((i) => (i + 1) % kö.length);
  }

  const uppgift = kö[index];
  const status = hämtaModulStatus(framsteg, modul.id, nivå);

  if (!uppgifter[nivå] || uppgifter[nivå].length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-12 text-center text-gray-500">
        Inga uppgifter finns för den här nivån ännu. Kom tillbaka snart!
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-8 space-y-6">
      {/* Rubrik */}
      <div className="flex items-center gap-3">
        <div className={`w-12 h-12 rounded-2xl ${modul.ikonBg} flex items-center justify-center text-2xl`}>
          {modul.ikon}
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{modul.namn}</h1>
          <p className="text-gray-500 text-sm">{modul.beskrivning}</p>
        </div>
      </div>

      {/* Nivåväljare */}
      <div className="flex gap-2 flex-wrap">
        {['E', 'C', 'A'].map((n) => {
          const ns = hämtaModulStatus(framsteg, modul.id, n);
          const aktiv = n === nivå;
          return (
            <button
              key={n}
              onClick={() => setNivå(n)}
              className={`px-4 py-2 rounded-xl border-2 font-semibold text-sm transition-all ${
                aktiv
                  ? NIVÅ_LABEL[n].färg + ' border-current shadow-sm'
                  : 'border-gray-200 bg-white text-gray-500 hover:border-gray-300'
              }`}
            >
              {NIVÅ_LABEL[n].label}
              {ns.klar && ' ✓'}
            </button>
          );
        })}
      </div>

      {/* Framstegsrad */}
      <div className="bg-white rounded-2xl border border-gray-200 p-4 flex items-center gap-4">
        <div className="flex-1">
          <div className="flex justify-between text-sm text-gray-500 mb-1">
            <span>Rätt i rad</span>
            <span>{rätt_i_rad} / 3</span>
          </div>
          <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-indigo-500 rounded-full transition-all duration-500"
              style={{ width: `${(rätt_i_rad / 3) * 100}%` }}
            />
          </div>
        </div>
        <div className="text-sm text-gray-500">
          <span className="text-green-600 font-bold">{status.rätt}✓</span>
          {' / '}
          <span className="text-red-500 font-bold">{status.fel}✗</span>
        </div>
      </div>

      {/* Klar-meddelande */}
      {klart ? (
        <div className="bg-gradient-to-br from-indigo-50 to-purple-50 border border-indigo-200 rounded-3xl p-8 text-center space-y-3">
          <div className="text-6xl">🏆</div>
          <h2 className="text-2xl font-bold text-indigo-700">Modul klar!</h2>
          <p className="text-gray-600">Du har klarat alla nivåer i {modul.namn}. Fantastiskt!</p>
        </div>
      ) : uppgift ? (
        /* Uppgiftskort */
        <div className="bg-white rounded-3xl border border-gray-200 shadow-sm p-6">
          <div className="flex items-center justify-between mb-5">
            <span className={`text-xs font-bold px-3 py-1 rounded-full border ${NIVÅ_LABEL[nivå].färg}`}>
              {NIVÅ_LABEL[nivå].label}
            </span>
            <span className="text-xs text-gray-400">
              {uppgift.typ === 1 ? '⚡ Snabbsvar' : '✏️ Redovisning'}
            </span>
          </div>

          {uppgift.typ === 1 ? (
            <SnabbsvarTask
              key={uppgift.id + index}
              uppgift={uppgift}
              onSvar={(korrekt) => {
                handleSvar(korrekt);
              }}
            />
          ) : (
            <RedovisningTask
              key={uppgift.id + index}
              uppgift={uppgift}
              onSvar={(korrekt) => {
                handleSvar(korrekt);
              }}
            />
          )}
        </div>
      ) : null}
    </div>
  );
}
