import { subtopicFärg } from '../utils/adaptiveEngine';

const COLORS = {
  green:  'bg-green-100 text-green-700 border-green-200',
  yellow: 'bg-yellow-100 text-yellow-700 border-yellow-200',
  red:    'bg-red-100 text-red-700 border-red-200',
  gray:   'bg-gray-100 text-gray-400 border-gray-200',
};

/**
 * Generic subtopic strength grid.
 * @param {object} subtopics  – the subtopics object from progress
 * @param {object} namen      – { subtopicKey: 'Display Name' }
 */
export default function SubtopicStrengths({ subtopics, namen }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
      {Object.entries(subtopics).map(([key, st]) => {
        const färg = subtopicFärg(key, subtopics);
        const pct = st.attempts > 0 ? Math.round((st.correct / st.attempts) * 100) : null;
        return (
          <div
            key={key}
            className={`rounded-xl border px-3 py-2 text-xs font-medium text-center ${COLORS[färg]}`}
          >
            <div className="font-semibold">{namen[key] ?? key}</div>
            <div className="mt-0.5 opacity-80">
              {pct !== null ? `${pct}% (${st.correct}/${st.attempts})` : 'Ej tränat'}
            </div>
          </div>
        );
      })}
    </div>
  );
}
