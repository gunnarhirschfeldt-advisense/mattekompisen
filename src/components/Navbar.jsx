export default function Navbar({ modulNamn, onHem }) {
  return (
    <nav className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-4xl mx-auto px-4 h-14 flex items-center gap-3">
        <button
          onClick={onHem}
          className="flex items-center gap-2 text-indigo-600 hover:text-indigo-800 font-semibold transition-colors"
        >
          <span className="text-xl">🏠</span>
          <span className="hidden sm:inline">Hem</span>
        </button>

        {modulNamn && (
          <>
            <span className="text-gray-300">/</span>
            <span className="text-gray-700 font-medium truncate">{modulNamn}</span>
          </>
        )}

        <div className="ml-auto text-2xl font-bold text-indigo-600 tracking-tight">
          Mattekompisen
        </div>
      </div>
    </nav>
  );
}
