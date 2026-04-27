/**
 * Modal som visas när systemet föreslår ett nivåbyte.
 * Eleven väljer att acceptera eller stanna kvar.
 *
 * Props:
 *   suggestion:   'upgrade' | 'downgrade'
 *   currentLevel: 'E' | 'C' | 'A'
 *   onAccept:     () => void  — anropas om eleven accepterar
 *   onDismiss:    () => void  — anropas om eleven stannar kvar
 */
export default function LevelSuggestionModal({ suggestion, currentLevel, onAccept, onDismiss }) {
  const nextLevel = suggestion === 'upgrade'
    ? { E: 'C', C: 'A' }[currentLevel]
    : { C: 'E', A: 'C' }[currentLevel];

  // Inget att göra om nivåbytet inte är möjligt (redan på topp/botten)
  if (!nextLevel) return null;

  const title = suggestion === 'upgrade'
    ? `Du verkar redo för ${nextLevel}-nivå! 🎉`
    : `Vill du prova ${nextLevel}-nivå istället?`;

  const body = suggestion === 'upgrade'
    ? `Du har klarat de flesta uppgifterna på ${currentLevel}-nivå. Vill du utmana dig med svårare uppgifter?`
    : `Det verkar som att ${currentLevel}-nivå är lite knepig just nu. Det är helt okej att öva mer på ${nextLevel}-nivå.`;

  const acceptLabel  = suggestion === 'upgrade'
    ? `Ja, prova ${nextLevel}!`
    : `Ja, gå till ${nextLevel}`;

  const dismissLabel = suggestion === 'upgrade'
    ? `Nej, fortsätt på ${currentLevel}`
    : 'Nej, jag fortsätter';

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-6 max-w-sm mx-4 shadow-xl">
        <h2 className="text-xl font-bold mb-3">{title}</h2>
        <p className="text-gray-600 mb-6">{body}</p>
        <div className="flex flex-col gap-2">
          <button
            onClick={onAccept}
            className="bg-blue-600 text-white rounded-xl py-3 font-semibold hover:bg-blue-700 transition-colors"
          >
            {acceptLabel}
          </button>
          <button
            onClick={onDismiss}
            className="bg-gray-100 text-gray-700 rounded-xl py-3 font-semibold hover:bg-gray-200 transition-colors"
          >
            {dismissLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
