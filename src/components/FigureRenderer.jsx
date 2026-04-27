/**
 * FigureRenderer — renders a pre-validated SVG string.
 * Props: { figure_svg: string | null }
 *
 * Security: validates the SVG string before inserting it into the DOM.
 * Forbidden elements/attributes: circle, ellipse, clipPath,
 * linearGradient, radialGradient, transform=, filter
 */

const FORBIDDEN = [
  'circle',
  'ellipse',
  'clippath',
  'lineargradient',
  'radialgradient',
  'transform=',
  'filter',
];

function valideraSVG(svg) {
  if (!svg.trimStart().startsWith('<svg')) return false;
  const lower = svg.toLowerCase();
  for (const term of FORBIDDEN) {
    if (lower.includes(term)) return false;
  }
  return true;
}

function inkrFallbackCount() {
  try {
    const n = parseInt(localStorage.getItem('svg_fallback_count') ?? '0', 10);
    localStorage.setItem('svg_fallback_count', String(n + 1));
  } catch {
    // ignore localStorage errors
  }
}

export default function FigureRenderer({ figure_svg, questionId }) {
  if (!figure_svg) return null;

  if (!valideraSVG(figure_svg)) {
    console.warn('FigureRenderer: Ogiltig SVG från API:', questionId ?? '(okänt id)');
    inkrFallbackCount();
    return (
      <div
        style={{ maxWidth: '300px', margin: '0 auto' }}
        className="bg-gray-100 rounded-xl p-4 text-sm text-gray-500 text-center"
      >
        Figuren kunde inte visas — läs beskrivningen i uppgiften
      </div>
    );
  }

  return (
    <div
      style={{ maxWidth: '300px', margin: '0 auto' }}
      dangerouslySetInnerHTML={{ __html: figure_svg }}
    />
  );
}
