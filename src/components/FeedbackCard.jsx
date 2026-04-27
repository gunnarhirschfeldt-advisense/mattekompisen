export default function FeedbackCard({ korrekt, feedback, hint, rättSvar, visar }) {
  if (!visar) return null;
  return (
    <div
      className={`rounded-2xl p-5 space-y-2 ${
        korrekt
          ? 'bg-green-50 border border-green-200'
          : 'bg-amber-50 border border-amber-200'
      }`}
    >
      <p className={`font-bold text-lg ${korrekt ? 'text-green-700' : 'text-amber-700'}`}>
        {korrekt ? '🎉 Rätt!' : '🤔 Inte riktigt'}
      </p>
      {feedback && (
        <p className={korrekt ? 'text-green-600' : 'text-amber-600'}>{feedback}</p>
      )}
      {!korrekt && rättSvar && (
        <p className="text-amber-600 text-sm">
          <strong>Rätt svar:</strong> {rättSvar}
        </p>
      )}
      {!korrekt && hint && (
        <p className="mt-2 text-sm text-blue-700 italic">
          💡 {hint}
        </p>
      )}
    </div>
  );
}
