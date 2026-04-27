import { MODULER } from '../data/moduler';
import { modulKortStatus, hämtaModulStatus } from '../utils/progress';
import { UPGRADE_THRESHOLD } from '../utils/adaptiveEngine';

// Ring + badge background for implemented modules
const STATUSFÄRG = {
  grön: { ring: 'ring-2 ring-green-400', badge: 'bg-green-100 text-green-700' },
  gul:  { ring: 'ring-2 ring-yellow-400', badge: 'bg-yellow-100 text-yellow-700' },
  grå:  { ring: '', badge: 'bg-gray-100 text-gray-500' },
};

const NIVÅ_NAMN = { E: 'E — Grund', C: 'C — Mellan', A: 'A — Avancerad' };

// Highest completed level label, e.g. "A-nivå klar ✓"
function högtaBadgeText(framsteg, modulId, status) {
  for (const lvl of ['A', 'C', 'E']) {
    if (framsteg?.[modulId]?.[lvl]?.klar) return `${lvl}-nivå klar ✓`;
  }
  return status === 'gul' ? 'Påbörjad' : 'Ej påbörjad';
}

const GRADFÄRGER = [
  'from-orange-400 to-orange-500',
  'from-blue-400 to-blue-500',
  'from-green-400 to-green-500',
  'from-purple-400 to-purple-500',
  'from-red-400 to-red-500',
];

export default function Startsida({ framsteg, onVäljModul }) {
  const nyckelSaknas = !import.meta.env.VITE_PROXY_URL;

  return (
    <div className="max-w-4xl mx-auto px-4 py-10 space-y-10">
      {/* Hero */}
      <div className="text-center space-y-3">
        <div className="text-6xl">🧮</div>
        <h1 className="text-4xl font-extrabold text-gray-900">Mattekompisen</h1>
        <p className="text-gray-500 text-lg max-w-lg mx-auto">
          Öva inför nationella matematikprovet i åk 6. Välj ett ämne och börja träna!
        </p>
      </div>

      {/* API-nyckel-varning */}
      {nyckelSaknas && (
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 flex gap-3 items-start">
          <span className="text-2xl">⚠️</span>
          <div className="text-sm text-amber-700">
            <strong>Proxy saknas.</strong> Redovisningsuppgifter kräver en proxy-URL.
            Sätt <code className="bg-amber-100 px-1 rounded">VITE_PROXY_URL</code> i miljövariablerna.
            Snabbsvaruppgifter fungerar utan proxy.
          </div>
        </div>
      )}

      {/* Modulkort */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {MODULER.map((modul, i) => {
          const ejImplementerad = !modul.implementerad;

          // ── Oimplementerad modul ──────────────────────────────────────────
          if (ejImplementerad) {
            return (
              <div
                key={modul.id}
                className="text-left bg-white rounded-3xl border border-gray-100 overflow-hidden opacity-50 cursor-not-allowed select-none"
              >
                <div className={`h-2 w-full bg-gradient-to-r ${GRADFÄRGER[i]} opacity-30`} />
                <div className="p-5 space-y-3">
                  <div className="flex items-start justify-between">
                    <div className="w-12 h-12 rounded-2xl bg-gray-100 flex items-center justify-center text-2xl grayscale">
                      {modul.ikon}
                    </div>
                    <span className="text-xs font-semibold px-2 py-1 rounded-full bg-gray-100 text-gray-400">
                      Kommer snart
                    </span>
                  </div>
                  <div>
                    <h2 className="font-bold text-gray-400 text-lg leading-tight">
                      {modul.namn}
                    </h2>
                    <p className="text-gray-400 text-sm mt-1">{modul.beskrivning}</p>
                  </div>
                </div>
              </div>
            );
          }

          // ── Implementerad modul ───────────────────────────────────────────
          const status      = modulKortStatus(framsteg, modul.id);
          const sf          = STATUSFÄRG[status];
          const badgeText   = högtaBadgeText(framsteg, modul.id, status);
          const activeLvl   = framsteg?.[modul.id]?._currentLevel ?? 'E';
          const activeStatus = hämtaModulStatus(framsteg, modul.id, activeLvl);

          return (
            <button
              key={modul.id}
              onClick={() => onVäljModul(modul.id)}
              className={`group text-left bg-white rounded-3xl border border-gray-200 shadow-sm hover:shadow-md transition-all overflow-hidden ${sf.ring}`}
            >
              <div className={`h-2 w-full bg-gradient-to-r ${GRADFÄRGER[i]}`} />

              <div className="p-5 space-y-3">
                <div className="flex items-start justify-between">
                  <div className={`w-12 h-12 rounded-2xl ${modul.ikonBg} flex items-center justify-center text-2xl`}>
                    {modul.ikon}
                  </div>
                  <span className={`text-xs font-semibold px-2 py-1 rounded-full ${sf.badge}`}>
                    {badgeText}
                  </span>
                </div>

                <div>
                  <h2 className="font-bold text-gray-900 text-lg leading-tight group-hover:text-indigo-600 transition-colors">
                    {modul.namn}
                  </h2>
                  <p className="text-gray-500 text-sm mt-1">{modul.beskrivning}</p>
                </div>

                {/* Mini-framsteg — visar aktuell nivå */}
                {(activeStatus.rätt > 0 || activeStatus.fel > 0) && (
                  <div className="pt-1">
                    <div className="flex justify-between text-xs text-gray-400 mb-1">
                      <span>{NIVÅ_NAMN[activeLvl]}</span>
                      <span>{activeStatus.rätt}✓ {activeStatus.fel}✗</span>
                    </div>
                    <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-indigo-400 rounded-full"
                        style={{
                          width: `${Math.min(100, (activeStatus.rätt_i_rad / UPGRADE_THRESHOLD) * 100)}%`,
                        }}
                      />
                    </div>
                  </div>
                )}
              </div>
            </button>
          );
        })}
      </div>

      {/* Info */}
      <div className="bg-indigo-50 border border-indigo-100 rounded-2xl p-5 grid sm:grid-cols-3 gap-4 text-center text-sm">
        <div>
          <div className="text-2xl mb-1">⚡</div>
          <strong className="text-gray-800">Snabbsvar</strong>
          <p className="text-gray-500">Flerval och sifferuppgifter som rättas direkt</p>
        </div>
        <div>
          <div className="text-2xl mb-1">✏️</div>
          <strong className="text-gray-800">Redovisning</strong>
          <p className="text-gray-500">Visa din uträkning — en AI-lärare ger feedback</p>
        </div>
        <div>
          <div className="text-2xl mb-1">📈</div>
          <strong className="text-gray-800">Adaptiv svårighet</strong>
          <p className="text-gray-500">{UPGRADE_THRESHOLD} rätt i rad → nästa nivå (E → C → A)</p>
        </div>
      </div>
    </div>
  );
}
