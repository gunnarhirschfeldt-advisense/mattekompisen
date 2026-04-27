import { useRef, useEffect, useState } from 'react';

export default function HandwritingCanvas({ onSkicka, laddar, visaResultat }) {
  const canvasRef = useRef(null);
  const drawing = useRef(false);
  const lastPos = useRef({ x: 0, y: 0 });
  const [harRitat, setHarRitat] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = '#1e293b';
    ctx.lineWidth = 3;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
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

  function startDraw(e) {
    e.preventDefault();
    drawing.current = true;
    lastPos.current = getPos(e);
  }

  function draw(e) {
    e.preventDefault();
    if (!drawing.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const pos = getPos(e);
    ctx.beginPath();
    ctx.moveTo(lastPos.current.x, lastPos.current.y);
    ctx.lineTo(pos.x, pos.y);
    ctx.stroke();
    lastPos.current = pos;
    if (!harRitat) setHarRitat(true);
  }

  function stopDraw(e) {
    e.preventDefault();
    drawing.current = false;
  }

  function rensa() {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    setHarRitat(false);
  }

  function skicka() {
    const canvas = canvasRef.current;
    const base64 = canvas.toDataURL('image/jpeg', 0.85).replace(/^data:image\/jpeg;base64,/, '');
    onSkicka(base64);
  }

  return (
    <div className="space-y-3">
      <canvas
        ref={canvasRef}
        width={600}
        height={180}
        className="w-full rounded-2xl border-2 border-dashed border-indigo-300 touch-none bg-white cursor-crosshair"
        onMouseDown={startDraw}
        onMouseMove={draw}
        onMouseUp={stopDraw}
        onMouseLeave={stopDraw}
        onTouchStart={startDraw}
        onTouchMove={draw}
        onTouchEnd={stopDraw}
      />
      <div className="flex gap-3">
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
