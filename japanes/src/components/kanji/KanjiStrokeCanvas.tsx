import { useRef, useState, useEffect, MouseEvent, TouchEvent } from 'react';
import { RotateCcw, Undo2, Eye, EyeOff, Volume2, Check } from 'lucide-react';
import { KanjiItem } from '../../types';
import { speakJapanese } from '../../utils/audio';

interface KanjiStrokeCanvasProps {
  kanji: KanjiItem;
  audioRate: number;
  onMasterToggle?: (id: string) => void;
  isMastered?: boolean;
}

export function KanjiStrokeCanvas({
  kanji,
  audioRate,
  onMasterToggle,
  isMastered,
}: KanjiStrokeCanvasProps) {
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

    // Clear canvas
    ctx.clearRect(0, 0, width, height);

    // Draw traditional Japanese Genkōyōshi grid (dotted center cross + subtle outer boundary)
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

    // Draw Guide Character in faint watermarked gray if showGuide is enabled
    if (showGuide) {
      ctx.fillStyle = 'rgba(214, 211, 209, 0.55)';
      ctx.font = 'bold 150px "Noto Sans JP", sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(kanji.kanji, width / 2, height / 2 + 8);
    }

    // Draw all user strokes with brush ink look
    ctx.strokeStyle = '#1c1917'; // stone-900 sumi ink
    ctx.lineWidth = 9;
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
  }, [strokes, currentStroke, showGuide, kanji]);

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
    // Speak primary reading (kunyomi or onyomi or kanji)
    const textToSpeak = kanji.kunyomi[0]?.replace(/[()]/g, '') || kanji.onyomi[0] || kanji.kanji;
    speakJapanese(textToSpeak, audioRate, () => setIsPlayingAudio(false));
  };

  const strokeMatches = strokes.length === kanji.strokeCount;

  return (
    <div className="flex flex-col items-center gap-3.5 w-full">
      {/* Stroke count & audio header */}
      <div className="w-full flex items-center justify-between text-xs text-stone-500 pb-1 border-b border-stone-100">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-stone-700">
            Target: {kanji.strokeCount} {kanji.strokeCount === 1 ? 'stroke' : 'strokes'}
          </span>
          <span className="text-stone-300">•</span>
          <span className="text-stone-500">Radical: {kanji.radical} ({kanji.radicalMeaning})</span>
        </div>
        <button
          onClick={handlePlayAudio}
          className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold cursor-pointer transition-colors ${
            isPlayingAudio
              ? 'badge-theme'
              : 'bg-stone-100 hover:bg-accent-light text-stone-700 hover:text-accent'
          }`}
          title="Pronounce this Kanji"
        >
          <Volume2 className="w-3.5 h-3.5" />
          <span>Pronounce</span>
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
        <div className="absolute top-4 left-4 bg-stone-900/80 text-white text-[11px] font-mono px-2 py-0.5 rounded backdrop-blur-sm pointer-events-none flex items-center gap-1.5">
          <span>Strokes: {strokes.length} / {kanji.strokeCount}</span>
          {strokeMatches && (
            <span className="text-emerald-400 font-bold">✓</span>
          )}
        </div>
      </div>

      {/* Control Buttons Toolbar */}
      <div className="flex items-center justify-between w-full max-w-[280px] gap-2">
        <button
          onClick={() => setShowGuide(!showGuide)}
          id="kanji-toggle-guide-btn"
          className="flex-1 flex items-center justify-center gap-1.5 py-2 px-2.5 rounded-lg text-xs font-medium border border-stone-200 bg-white hover:bg-stone-50 text-stone-700 transition-colors shadow-2xs cursor-pointer"
          title="Toggle character outline guide"
        >
          {showGuide ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
          <span>{showGuide ? 'Hide Guide' : 'Show Guide'}</span>
        </button>

        <button
          onClick={handleUndo}
          disabled={strokes.length === 0}
          id="kanji-undo-stroke-btn"
          className="p-2 rounded-lg border border-stone-200 bg-white hover:bg-stone-50 text-stone-700 disabled:opacity-40 disabled:pointer-events-none transition-colors shadow-2xs cursor-pointer"
          title="Undo last stroke"
        >
          <Undo2 className="w-4 h-4" />
        </button>

        <button
          onClick={handleClear}
          disabled={strokes.length === 0}
          id="kanji-clear-canvas-btn"
          className="p-2 rounded-lg border border-stone-200 bg-white hover:bg-stone-50 text-stone-700 disabled:opacity-40 disabled:pointer-events-none transition-colors shadow-2xs cursor-pointer"
          title="Clear canvas"
        >
          <RotateCcw className="w-4 h-4" />
        </button>
      </div>

      {/* Mark Mastered Quick Action */}
      {onMasterToggle && (
        <button
          onClick={() => onMasterToggle(kanji.id)}
          id="kanji-canvas-master-btn"
          className={`w-full max-w-[280px] py-2 px-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-2xs border ${
            isMastered
              ? 'bg-emerald-50 border-emerald-300 text-emerald-700 hover:bg-emerald-100'
              : 'bg-white border-stone-200 text-stone-700 hover:border-accent hover:text-accent'
          }`}
        >
          <Check className={`w-3.5 h-3.5 ${isMastered ? 'text-emerald-600' : 'text-stone-400'}`} />
          <span>{isMastered ? 'Mastered in Collection' : 'Mark as Mastered'}</span>
        </button>
      )}
    </div>
  );
}
