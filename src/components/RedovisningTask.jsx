import { useState } from 'react';
import { bedömSvar } from '../utils/claude';

export default function RedovisningTask({ uppgift, onSvar }) {
  const [text, setText] = useState('');
  const [laddar, setLaddar] = useState(false);
  const [resultat, setResultat] = useState(null);
  const [fel, setFel] = useState(null);

  async function skicka() {
    if (!text.trim()) return;
    setLaddar(true);
    setFel(null);
    try {
      const res = await bedömSvar({
        fråga: uppgift.fråga,
        elevensSvar: text,
        modelSvar: uppgift.modelSvar,
      });
      setResultat(res);
      onSvar(res.correct);
    } catch (err) {
      if (err.message === 'API_KEY_SAKNAS') {
        setFel('Proxy saknas. Kontrollera att VITE_PROXY_URL är satt.');
      } else {
        setFel('Något gick fel. Kontrollera att API-nyckeln är korrekt.');
      }
    } finally {
      setLaddar(false);
    }
  }

  function reset() {
    setText('');
    setResultat(null);
    setFel(null);
  }

  return (
    <div className="space-y-5">
      <p className="text-lg font-medium text-gray-800 leading-relaxed">{uppgift.fråga}</p>

      <div className="bg-blue-50 border border-blue-200 rounded-2xl p-3 text-sm text-blue-700">
        ✏️ <strong>Skriv din uträkning och förklara hur du tänkte.</strong> Det behöver inte vara perfekt — din lärare (Claude) vill förstå ditt resonemang!
      </div>

      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        disabled={!!resultat || laddar}
        rows={5}
        placeholder="Skriv din uträkning och ditt svar här…"
        className="w-full p-4 rounded-2xl border-2 border-gray-200 focus:border-indigo-400 focus:outline-none resize-none text-gray-800 text-base"
      />

      {fel && (
        <div className="bg-red-50 border border-red-200 rounded-2xl p-4 text-red-700 text-sm">
          ⚠️ {fel}
        </div>
      )}

      {resultat && (
        <div
          className={`rounded-2xl p-5 space-y-3 ${
            resultat.correct
              ? 'bg-green-50 border border-green-200'
              : 'bg-amber-50 border border-amber-200'
          }`}
        >
          <p
            className={`font-bold text-lg ${
              resultat.correct ? 'text-green-700' : 'text-amber-700'
            }`}
          >
            {resultat.correct ? '🎉 ' : '🤔 '}
            {resultat.correct ? 'Rätt resonemang!' : 'Inte riktigt rätt'}
          </p>
          <p className={resultat.correct ? 'text-green-600' : 'text-amber-600'}>
            {resultat.feedback}
          </p>
          {!resultat.correct && resultat.hint && (
            <p className="text-amber-500 text-sm">
              <strong>Tips:</strong> {resultat.hint}
            </p>
          )}
        </div>
      )}

      {!resultat ? (
        <button
          onClick={skicka}
          disabled={!text.trim() || laddar}
          className="w-full py-3 px-6 rounded-2xl bg-indigo-600 text-white font-bold text-lg hover:bg-indigo-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
        >
          {laddar ? (
            <>
              <span className="animate-spin inline-block w-5 h-5 border-2 border-white border-t-transparent rounded-full" />
              Läraren läser…
            </>
          ) : (
            'Lämna in svar'
          )}
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
