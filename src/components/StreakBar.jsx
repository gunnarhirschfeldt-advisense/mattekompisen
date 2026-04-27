import { canManualUpgrade, UPGRADE_WINDOW } from '../utils/adaptiveEngine';

/**
 * Visar senaste svar som en mini-bar + manuella nivåknappar.
 *
 * Props:
 *   progress:          object  – full progress-objekt (innehåller recentResults)
 *   currentLevel:      string  – 'E' | 'C' | 'A'
 *   onManualUpgrade:   () => void
 *   onManualDowngrade: () => void
 */
export default function StreakBar({ progress, currentLevel, onManualUpgrade, onManualDowngrade }) {
  const results          = progress?.recentResults ?? [];
  const upgradeEnabled   = canManualUpgrade(progress) && currentLevel !== 'A';
  const downgradeEnabled = currentLevel !== 'E';

  // Visa de senaste UPGRADE_WINDOW svaren som färgade rutor
  const visibleResults = results.slice(-UPGRADE_WINDOW);

  return (
    <div className="space-y-2">
      {/* Mini-bar med senaste svar */}
      {visibleResults.length > 0 && (
        <div className="space-y-1">
          <div className="flex justify-between text-xs text-gray-500">
            <span>Senaste svar</span>
            <span className="font-medium">
              {results.filter(Boolean).length}/{results.length} rätt totalt
            </span>
          </div>
          <div className="flex gap-1">
            {visibleResults.map((r, i) => (
              <div
                key={i}
                className={`flex-1 h-2 rounded-full transition-colors ${
                  r ? 'bg-green-400' : 'bg-red-400'
                }`}
              />
            ))}
            {/* Tomma platser om färre än UPGRADE_WINDOW svar */}
            {Array.from({ length: Math.max(0, UPGRADE_WINDOW - visibleResults.length) }).map((_, i) => (
              <div key={`empty-${i}`} className="flex-1 h-2 rounded-full bg-gray-100" />
            ))}
          </div>
        </div>
      )}

      {/* Manuella nivåknappar — alltid synliga */}
      <div className="flex flex-wrap gap-x-4 gap-y-1 mt-1">
        {downgradeEnabled && (
          <button
            onClick={onManualDowngrade}
            className="text-sm text-gray-500 underline hover:text-gray-700 transition-colors"
          >
            För svårt — gå ned en nivå
          </button>
        )}
        {currentLevel !== 'A' && (
          <button
            onClick={onManualUpgrade}
            disabled={!upgradeEnabled}
            className={`text-sm underline transition-colors ${
              upgradeEnabled
                ? 'text-blue-600 hover:text-blue-800'
                : 'text-gray-300 cursor-not-allowed'
            }`}
          >
            Prova nästa nivå
          </button>
        )}
      </div>
    </div>
  );
}
