const CONFIG = {
  E: { label: 'E — Grund',     ring: 'ring-green-400',  bg: 'bg-green-100',  text: 'text-green-700' },
  C: { label: 'C — Mellan',    ring: 'ring-yellow-400', bg: 'bg-yellow-100', text: 'text-yellow-700' },
  A: { label: 'A — Avancerad', ring: 'ring-purple-400', bg: 'bg-purple-100', text: 'text-purple-700' },
};

export default function LevelIndicator({ current, levels }) {
  return (
    <div className="flex gap-2 items-center flex-wrap">
      {['E', 'C', 'A'].map((l) => {
        const c = CONFIG[l];
        const active = l === current;
        const done = levels[l]?.completed;
        return (
          <div
            key={l}
            className={`px-3 py-1.5 rounded-xl text-sm font-semibold border-2 transition-all ${
              active
                ? `${c.bg} ${c.text} ring-2 ${c.ring} border-transparent shadow-sm`
                : done
                ? 'bg-gray-100 text-gray-400 border-gray-200 line-through'
                : 'bg-white text-gray-400 border-gray-200'
            }`}
          >
            {c.label} {done && '✓'}
          </div>
        );
      })}
    </div>
  );
}
