import { useRef, useEffect, useState } from 'react';

export default function HandwritingCanvas({ onSkicka, laddar, visaResultat }) {
  const canvasRef      = useRef(null);
  const drawing        = useRef(false);
  const currentStroke  = useRef([]);
  const strokeHistory  = useRef([]);
  const [harRitat, setHarRitat] = useState(false);

  useEffect(() => {
    const ctx = canvasRef.current.getContext('2d');
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvasRef.current.width, canvasRef.current.height);
  }, []);

  function getPos(e) {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const source = e.touches ? e.touches[0] : e;
    return {
      x: (source.clientX - rect.left) * (canvas.width / rect.width),
      y: (source.clientY - rect.top) * (canvas.height / rect.height),
    };
  }

  function ritaStroke(ctx, stroke) {
    if (stroke.length < 2) return;
    ctx.beginPath();
    ctx.moveTo(stroke[0].x, stroke[0].y);
    for (let i = 1; i < stroke.length; i++) {
      ctx.lineTo(stroke[i].x, stroke[i].y);
    }
    ctx.stroke();
  }

  function ritaOm() {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = '#1e293b';
    ctx.lineWidth = 3;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    for (const stroke of strokeHistory.current) {
      ritaStroke(ctx, stroke);
    }
  }

  function startDraw(e) {
    e.preventDefault();
    drawing.current = true;
    const pos = getPos(e);
    currentStroke.current = [pos];
    const ctx = canvasRef.current.getContext('2d');
    ctx.strokeStyle = '#1e293b';
    ctx.lineWidth = 3;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
  }

  function draw(e) {
    e.preventDefault();
    if (!drawing.current) return;
    const pos = getPos(e);
    const stroke = currentStroke.current;
    const ctx = canvasRef.current.getContext('2d');
    if (stroke.length > 0) {
      ctx.beginPath();
      ctx.moveTo(stroke[stroke.length - 1].x, stroke[stroke.length - 1].y);
      ctx.lineTo(pos.x, pos.y);
      ctx.stroke();
    }
    stroke.push(pos);
    if (!harRitat) setHarRitat(true);
  }

  function stopDraw(e) {
    e.preventDefault();
    if (!drawing.current) return;
    drawing.current = false;
    if (currentStroke.current.length > 1) {
      strokeHistory.current = [...strokeHistory.current, currentStroke.current];
    }
    currentStroke.current = [];
  }

  function ångra() {
    strokeHistory.current = strokeHistory.current.slice(0, -1);
    ritaOm();
    if (strokeHistory.current.length === 0) setHarRitat(false);
  }

  function rensa() {
    strokeHistory.current = [];
    currentStroke.current = [];
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    setHarRitat(false);
  }

  function skicka() {
    const base64 = canvasRef.current
      .toDataURL('image/jpeg', 0.85)
      .replace(/^data:image\/jpeg;base64,/, '');
    onSkicka(base64);
  }

  return (
    <div className="space-y-3">
      <canvas
        ref={canvasRef}
        width={600}
        height={260}
        className="w-full rounded-2xl border-2 border-dashed border-indigo-300 touch-none bg-white cursor-crosshair"
        onMouseDown={startDraw}
        onMouseMove={draw}
        onMouseUp={stopDraw}
        onMouseLeave={stopDraw}
        onTouchStart={startDraw}
        onTouchMove={draw}
        onTouchEnd={stopDraw}
      />
      <div className="flex gap-2">
        <button
          onClick={ångra}
          disabled={!harRitat || laddar || visaResultat}
          className="flex-1 py-3 rounded-2xl border-2 border-gray-200 text-gray-600 font-medium hover:bg-gray-50 disabled:opacity-40 transition-colors"
        >
          Ångra
        </button>
        <button
          onClick={rensa}
          disabled={!harRitat || laddar || visaResultat}
          className="flex-1 py-3 rounded-2xl border-2 border-gray-200 text-gray-600 font-medium hover:bg-gray-50 disabled:opacity-40 transition-colors"
        >
          Rensa
        </button>
        <button
          onClick={skicka}
          disabled={!harRitat || laddar || visaResultat}
          className="flex-[2] py-3 px-6 rounded-2xl bg-indigo-600 text-white font-bold hover:bg-indigo-700 disabled:opacity-40 transition-colors flex items-center justify-center gap-2"
        >
          {laddar ? (
            <>
              <span className="animate-spin inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full" />
              Läser…
            </>
          ) : (
            'Skicka svar'
          )}
        </button>
      </div>
    </div>
  );
}
