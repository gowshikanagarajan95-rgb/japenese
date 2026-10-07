import { useEffect, useState } from 'react';
import { X, ChevronLeft, ChevronRight, Volume2, Sparkles, Check } from 'lucide-react';
import { KanaCharacter } from '../../types';
import { KanaStrokeCanvas } from './KanaStrokeCanvas';
import { speakJapanese } from '../../utils/audio';

interface KanaDetailModalProps {
  kana: KanaCharacter | null;
  onClose: () => void;
  onNext?: () => void;
  onPrev?: () => void;
  onMasterToggle: (id: string) => void;
  isMastered: boolean;
  audioRate: number;
}

export function KanaDetailModal({
  kana,
  onClose,
  onNext,
  onPrev,
  onMasterToggle,
  isMastered,
  audioRate,
}: KanaDetailModalProps) {
  const [isPlayingWord, setIsPlayingWord] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight' && onNext) onNext();
      if (e.key === 'ArrowLeft' && onPrev) onPrev();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose, onNext, onPrev]);

  if (!kana) return null;

  const handlePlayWord = () => {
    setIsPlayingWord(true);
    speakJapanese(kana.exampleWord, audioRate, () => setIsPlayingWord(false));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-stone-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        id="kana-detail-modal"
        className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden border border-stone-200 flex flex-col max-h-[90vh]"
      >
        {/* Modal Top Bar */}
        <div className="px-5 py-3.5 bg-stone-50 border-b border-stone-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded badge-theme">
              {kana.type}
            </span>
            <span className="text-xs text-stone-500 capitalize">
              {kana.category} sound
            </span>
          </div>
          <div className="flex items-center gap-1">
            {onPrev && (
              <button
                onClick={onPrev}
                id="kana-prev-btn"
                className="p-1.5 rounded-lg text-stone-500 hover:text-stone-800 hover:bg-stone-200/70 transition-colors cursor-pointer"
                title="Previous character (←)"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
            )}
            {onNext && (
              <button
                onClick={onNext}
                id="kana-next-btn"
                className="p-1.5 rounded-lg text-stone-500 hover:text-stone-800 hover:bg-stone-200/70 transition-colors cursor-pointer"
                title="Next character (→)"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            )}
            <button
              onClick={onClose}
              id="kana-modal-close-btn"
              className="p-1.5 rounded-lg text-stone-400 hover:text-stone-700 hover:bg-stone-200/70 transition-colors cursor-pointer ml-1"
              title="Close modal (Esc)"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Content Body */}
        <div className="p-5 overflow-y-auto space-y-5">
          {/* Main Character Header */}
          <div className="flex items-center justify-between bg-stone-50/80 p-4 rounded-xl border border-stone-200/70">
            <div className="flex items-center gap-4">
              <span className="text-5xl font-extrabold text-stone-900 tracking-tight font-jp">
                {kana.char}
              </span>
              <div>
                <div className="text-2xl font-bold text-accent font-mono">
                  {kana.romaji}
                </div>
                <div className="text-xs text-stone-500">
                  Pronunciation sound
                </div>
              </div>
            </div>

            <button
              onClick={() => speakJapanese(kana.char, audioRate)}
              id="modal-pronounce-char-btn"
              className="p-3 rounded-full btn-theme-primary shadow-md transition-all hover:scale-105 active:scale-95 cursor-pointer"
              title="Listen to pronunciation"
            >
              <Volume2 className="w-5 h-5" />
            </button>
          </div>

          {/* Real-world Example Word Box */}
          <div className="p-3.5 rounded-xl bg-amber-50/60 border border-amber-200/60 flex items-center justify-between">
            <div>
              <div className="text-xs font-semibold text-amber-800 uppercase tracking-wider mb-0.5">
                Example Vocabulary
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-lg font-bold text-stone-900 font-jp">
                  {kana.exampleWord}
                </span>
                <span className="text-xs text-stone-500 font-mono">
                  ({kana.exampleRomaji})
                </span>
              </div>
              <div className="text-xs text-stone-600">
                Meaning: <span className="font-medium text-stone-800">{kana.exampleMeaning}</span>
              </div>
            </div>

            <button
              onClick={handlePlayWord}
              id="modal-play-word-btn"
              className={`p-2 rounded-lg text-xs font-medium flex items-center gap-1 transition-colors cursor-pointer ${
                isPlayingWord
                  ? 'bg-amber-200 text-amber-900'
                  : 'bg-amber-100/80 hover:bg-amber-200 text-amber-800'
              }`}
              title="Pronounce example word"
            >
              <Volume2 className="w-4 h-4" />
              <span>Hear Word</span>
            </button>
          </div>

          {/* Interactive Stroke Writing Canvas */}
          <div className="pt-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-stone-500 mb-3 text-center">
              Interactive Stroke Practice (Draw below)
            </h4>
            <KanaStrokeCanvas
              kana={kana}
              audioRate={audioRate}
              onMasterToggle={onMasterToggle}
              isMastered={isMastered}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
