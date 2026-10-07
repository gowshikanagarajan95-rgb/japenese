import { useRef, useState, useEffect, MouseEvent, TouchEvent } from 'react';
import { RotateCcw, Undo2, Eye, EyeOff, Volume2, Check } from 'lucide-react';
import { KanaCharacter } from '../../types';
import { speakJapanese } from '../../utils/audio';

interface KanaStrokeCanvasProps {
  kana: KanaCharacter;
  audioRate: number;
  onMasterToggle?: (id: string) => void;
  isMastered?: boolean;
}

export function KanaStrokeCanvas({
  kana,
  audioRate,
  onMasterToggle,
  isMastered,
}: KanaStrokeCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [showGuide, setShowGuide] = useState(true);
  const [strokes, setStrokes] = useState<{ x: number; y: number }[][]>([]);
  const [currentStroke, setCurrentStroke] = useState<{ x: number; y: number }[]>([]);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  // Redraw canvas whenever strokes or showGuide changes
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;

    // Clear background
    ctx.clearRect(0, 0, width, height);

    // Draw Japanese Genkouyoushi practice grid (dotted center cross)
    ctx.strokeStyle = '#e7e5e4'; // stone-200
    ctx.lineWidth = 1;
    ctx.setLineDash([4, 4]);

    // Horizontal center line
    ctx.beginPath();
    ctx.moveTo(0, height / 2);
    ctx.lineTo(width, height / 2);
    ctx.stroke();

    // Vertical center line
    ctx.beginPath();
    ctx.moveTo(width / 2, 0);
    ctx.lineTo(width / 2, height);
    ctx.stroke();

    ctx.setLineDash([]); // Reset dash

    // Draw Guide Character in faint watermarked gray if showGuide is true
    if (showGuide) {
      ctx.fillStyle = 'rgba(214, 211, 209, 0.55)'; // stone-300 transparent
      ctx.font = 'bold 150px "Noto Sans JP", sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(kana.char, width / 2, height / 2 + 8);
    }

    // Draw all user strokes
    ctx.strokeStyle = '#1c1917'; // stone-900 sumi ink
    ctx.lineWidth = 10;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    const allStrokes = [...strokes, currentStroke];
    allStrokes.forEach((stroke) => {
      if (stroke.length < 1) return;
      ctx.beginPath();
      ctx.moveTo(stroke[0].x, stroke[0].y);
      for (let i = 1; i < stroke.length; i++) {
        ctx.lineTo(stroke[i].x, stroke[i].y);
      }
      ctx.stroke();
    });
  }, [strokes, currentStroke, showGuide, kana]);

  const getCanvasCoords = (e: MouseEvent<HTMLCanvasElement> | TouchEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    return {
      x: (clientX - rect.left) * scaleX,
      y: (clientY - rect.top) * scaleY,
    };
  };

  const handleStart = (e: MouseEvent<HTMLCanvasElement> | TouchEvent<HTMLCanvasElement>) => {
    e.preventDefault();
    setIsDrawing(true);
    const coords = getCanvasCoords(e);
    setCurrentStroke([coords]);
  };

  const handleMove = (e: MouseEvent<HTMLCanvasElement> | TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    e.preventDefault();
    const coords = getCanvasCoords(e);
    setCurrentStroke((prev) => [...prev, coords]);
  };

  const handleEnd = (e: MouseEvent<HTMLCanvasElement> | TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    e.preventDefault();
    setIsDrawing(false);
    if (currentStroke.length > 0) {
      setStrokes((prev) => [...prev, currentStroke]);
      setCurrentStroke([]);
    }
  };

  const handleClear = () => {
    setStrokes([]);
    setCurrentStroke([]);
  };

  const handleUndo = () => {
    setStrokes((prev) => prev.slice(0, -1));
  };

  const handlePlayAudio = () => {
    setIsPlayingAudio(true);
    speakJapanese(kana.char, audioRate, () => setIsPlayingAudio(false));
  };

  return (
    <div className="flex flex-col items-center gap-4 w-full">
      {/* Stroke count & mnemonic header */}
      <div className="w-full flex items-center justify-between text-xs text-stone-500 pb-1 border-b border-stone-100">
        <span className="font-semibold text-stone-700">
          Stroke count: {kana.strokeCount} {kana.strokeCount === 1 ? 'stroke' : 'strokes'}
        </span>
        <button
          onClick={handlePlayAudio}
          className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-semibold cursor-pointer transition-colors ${
            isPlayingAudio
              ? 'bg-rose-100 text-rose-700'
              : 'bg-stone-100 hover:bg-rose-50 text-stone-700 hover:text-rose-600'
          }`}
        >
          <Volume2 className="w-3.5 h-3.5" />
          <span>Listen ({kana.romaji})</span>
        </button>
      </div>

      {/* Drawing Board Container */}
      <div className="relative p-2 rounded-2xl bg-stone-50 border-2 border-stone-200/80 shadow-inner">
        <canvas
          ref={canvasRef}
          width={280}
          height={280}
          onMouseDown={handleStart}
          onMouseMove={handleMove}
          onMouseUp={handleEnd}
          onMouseLeave={handleEnd}
          onTouchStart={handleStart}
          onTouchMove={handleMove}
          onTouchEnd={handleEnd}
          className="bg-white rounded-xl touch-none cursor-crosshair shadow-sm border border-stone-200"
          style={{ width: '280px', height: '280px' }}
        />

        {/* User stroke count indicator */}
        <div className="absolute top-4 left-4 bg-stone-900/75 text-white text-[11px] font-mono px-2 py-0.5 rounded backdrop-blur-sm pointer-events-none">
          Strokes drawn: {strokes.length}
        </div>
      </div>

      {/* Control Buttons Toolbar */}
      <div className="flex items-center justify-between w-full max-w-[280px] gap-2">
        <button
          onClick={() => setShowGuide(!showGuide)}
          id="toggle-guide-btn"
          className="flex-1 flex items-center justify-center gap-1.5 py-2 px-2.5 rounded-lg text-xs font-medium border border-stone-200 bg-white hover:bg-stone-50 text-stone-700 transition-colors shadow-xs cursor-pointer"
          title="Toggle character outline guide"
        >
          {showGuide ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
          <span>{showGuide ? 'Hide Guide' : 'Show Guide'}</span>
        </button>

        <button
          onClick={handleUndo}
          disabled={strokes.length === 0}
          id="undo-stroke-btn"
          className="p-2 rounded-lg border border-stone-200 bg-white hover:bg-stone-50 text-stone-700 disabled:opacity-40 disabled:pointer-events-none transition-colors shadow-xs cursor-pointer"
          title="Undo last stroke"
        >
          <Undo2 className="w-4 h-4" />
        </button>

        <button
          onClick={handleClear}
          disabled={strokes.length === 0}
          id="clear-canvas-btn"
          className="p-2 rounded-lg border border-stone-200 bg-white hover:bg-stone-50 text-stone-700 disabled:opacity-40 disabled:pointer-events-none transition-colors shadow-xs cursor-pointer"
          title="Clear canvas"
        >
          <RotateCcw className="w-4 h-4" />
        </button>
      </div>

      {/* Mnemonic helper hint */}
      {kana.mnemonic && (
        <div className="w-full bg-amber-50/80 border border-amber-200/80 rounded-xl p-3 text-xs text-amber-900 text-left">
          <span className="font-semibold block text-amber-950 mb-0.5">Mnemonic Memory Hint:</span>
          {kana.mnemonic}
        </div>
      )}

      {/* Mark as Mastered button */}
      {onMasterToggle && (
        <button
          onClick={() => onMasterToggle(kana.id)}
          id="master-toggle-btn"
          className={`w-full max-w-[280px] py-2.5 px-4 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer shadow-xs ${
            isMastered
              ? 'bg-emerald-600 text-white hover:bg-emerald-700'
              : 'bg-stone-100 hover:bg-stone-200 text-stone-800 border border-stone-200'
          }`}
        >
          <Check className={`w-4 h-4 ${isMastered ? 'stroke-[3]' : ''}`} />
          <span>{isMastered ? 'Mastered Character ✓' : 'Mark as Mastered'}</span>
        </button>
      )}
    </div>
  );
}
