import { useEffect, useState } from 'react';
import {
  X,
  Volume2,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  BookOpen,
  Sparkles,
  PenTool,
} from 'lucide-react';
import { KanjiItem } from '../../types';
import { KanjiStrokeCanvas } from './KanjiStrokeCanvas';
import { speakJapanese } from '../../utils/audio';

interface KanjiDetailModalProps {
  kanji: KanjiItem;
  allKanji: KanjiItem[];
  onClose: () => void;
  onSelectKanji: (kanji: KanjiItem) => void;
  onMasterToggle: (id: string) => void;
  isMastered: boolean;
  audioRate: number;
}

export function KanjiDetailModal({
  kanji,
  allKanji,
  onClose,
  onSelectKanji,
  onMasterToggle,
  isMastered,
  audioRate,
}: KanjiDetailModalProps) {
  const [activeTab, setActiveTab] = useState<'practice' | 'compounds'>('practice');

  // Handle escape key and left/right arrows
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowLeft') {
        handlePrev();
      } else if (e.key === 'ArrowRight') {
        handleNext();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [kanji, allKanji]);

  const currentIndex = allKanji.findIndex((k) => k.id === kanji.id);

  const handlePrev = () => {
    if (currentIndex > 0) {
      onSelectKanji(allKanji[currentIndex - 1]);
    } else {
      onSelectKanji(allKanji[allKanji.length - 1]);
    }
  };

  const handleNext = () => {
    if (currentIndex < allKanji.length - 1) {
      onSelectKanji(allKanji[currentIndex + 1]);
    } else {
      onSelectKanji(allKanji[0]);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-xs animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-3xl max-w-xl w-full max-h-[92vh] overflow-y-auto shadow-2xl border border-stone-200/80 p-6 sm:p-7 relative space-y-6"
        onClick={(e) => e.stopPropagation()}
        id="kanji-detail-modal"
      >
        {/* Top bar with Navigation & Close */}
        <div className="flex items-center justify-between">
          {/* Quick Prev / Next Kanji buttons */}
          <div className="flex items-center gap-1.5 text-xs text-stone-500 font-medium">
            <button
              onClick={handlePrev}
              id="kanji-prev-btn"
              className="p-1.5 rounded-lg border border-stone-200 hover:bg-stone-100 text-stone-700 transition-colors cursor-pointer"
              title="Previous Kanji"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="font-mono px-1">
              {currentIndex + 1} of {allKanji.length}
            </span>
            <button
              onClick={handleNext}
              id="kanji-next-btn"
              className="p-1.5 rounded-lg border border-stone-200 hover:bg-stone-100 text-stone-700 transition-colors cursor-pointer"
              title="Next Kanji"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onMasterToggle(kanji.id)}
              id="kanji-modal-master-toggle-btn"
              className={`px-3 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer shadow-2xs border ${
                isMastered
                  ? 'bg-emerald-50 border-emerald-300 text-emerald-700'
                  : 'bg-stone-50 border-stone-200 text-stone-600 hover:text-accent hover:border-accent'
              }`}
            >
              <CheckCircle2
                className={`w-4 h-4 ${isMastered ? 'text-emerald-600' : 'text-stone-400'}`}
              />
              <span>{isMastered ? 'Mastered' : 'Mark Mastered'}</span>
            </button>

            <button
              onClick={onClose}
              id="close-kanji-modal-btn"
              className="p-1.5 rounded-full text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-colors cursor-pointer"
              title="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Hero Character Card */}
        <div className="bg-stone-50 rounded-2xl p-5 border border-stone-200/80 flex flex-col sm:flex-row items-center sm:items-start gap-5">
          {/* Big Kanji Display */}
          <div className="w-28 h-28 rounded-2xl bg-white border-2 border-stone-200 flex items-center justify-center text-6xl font-extrabold text-stone-900 font-jp shadow-sm shrink-0">
            {kanji.kanji}
          </div>

          {/* Core Info */}
          <div className="flex-1 text-center sm:text-left space-y-2">
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
              <span className="badge-theme text-xs font-semibold px-2.5 py-0.5 rounded-full">
                {kanji.categoryLabel}
              </span>
              <span className="bg-stone-200/80 text-stone-700 text-xs font-mono font-medium px-2 py-0.5 rounded-md">
                {kanji.grade}
              </span>
              <span className="bg-stone-200/80 text-stone-700 text-xs font-medium px-2 py-0.5 rounded-md">
                {kanji.strokeCount} strokes
              </span>
            </div>

            <h2 className="text-2xl font-black text-stone-900 tracking-tight">
              {kanji.meanings.join(', ')}
            </h2>

            <p className="text-xs text-stone-500">
              <span className="font-semibold text-stone-700">Radical: </span>
              <span className="font-jp font-bold text-stone-900">{kanji.radical}</span>
              <span> ({kanji.radicalMeaning})</span>
            </p>
          </div>
        </div>

        {/* Readings Breakdown: On'yomi vs Kun'yomi */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {/* On'yomi (Chinese-origin readings) */}
          <div className="p-4 rounded-xl bg-white border border-stone-200 shadow-2xs space-y-1.5">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-stone-500 uppercase tracking-wider text-[10px]">
                On'yomi (音読み)
              </span>
              <span className="text-[10px] text-stone-400">Chinese Reading</span>
            </div>
            <div className="flex flex-wrap items-center gap-1.5 pt-1">
              {kanji.onyomi.length > 0 ? (
                kanji.onyomi.map((on, idx) => (
                  <button
                    key={idx}
                    onClick={() => speakJapanese(on, audioRate)}
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-stone-100 hover:bg-accent-light text-stone-800 hover:text-accent font-jp font-bold text-sm transition-colors cursor-pointer border border-stone-200/60"
                    title={`Hear ${on}`}
                  >
                    <span>{on}</span>
                    <span className="text-[10px] font-mono text-stone-500 font-normal">
                      [{kanji.romajiOnyomi[idx]}]
                    </span>
                    <Volume2 className="w-3 h-3 text-stone-400" />
                  </button>
                ))
              ) : (
                <span className="text-xs text-stone-400 italic">None</span>
              )}
            </div>
          </div>

          {/* Kun'yomi (Native Japanese readings) */}
          <div className="p-4 rounded-xl bg-white border border-stone-200 shadow-2xs space-y-1.5">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-stone-500 uppercase tracking-wider text-[10px]">
                Kun'yomi (訓読み)
              </span>
              <span className="text-[10px] text-stone-400">Native Japanese</span>
            </div>
            <div className="flex flex-wrap items-center gap-1.5 pt-1">
              {kanji.kunyomi.length > 0 ? (
                kanji.kunyomi.map((kun, idx) => (
                  <button
                    key={idx}
                    onClick={() => speakJapanese(kun.replace(/[()]/g, ''), audioRate)}
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-stone-100 hover:bg-accent-light text-stone-800 hover:text-accent font-jp font-bold text-sm transition-colors cursor-pointer border border-stone-200/60"
                    title={`Hear ${kun}`}
                  >
                    <span>{kun}</span>
                    <span className="text-[10px] font-mono text-stone-500 font-normal">
                      [{kanji.romajiKunyomi[idx]}]
                    </span>
                    <Volume2 className="w-3 h-3 text-stone-400" />
                  </button>
                ))
              ) : (
                <span className="text-xs text-stone-400 italic">None</span>
              )}
            </div>
          </div>
        </div>

        {/* Visual Memory Mnemonic */}
        <div className="p-4 rounded-xl bg-amber-50/80 border border-amber-200/80 text-xs text-amber-900 space-y-1">
          <div className="flex items-center gap-1.5 font-bold text-amber-800 text-xs">
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            <span>Memory Mnemonic Story</span>
          </div>
          <p className="leading-relaxed text-amber-950/90">{kanji.mnemonic}</p>
        </div>

        {/* Tab switch between Practice Canvas & Compound Vocabulary */}
        <div className="space-y-4 pt-1">
          <div className="flex items-center gap-2 border-b border-stone-200 pb-2">
            <button
              onClick={() => setActiveTab('practice')}
              id="kanji-tab-practice"
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                activeTab === 'practice'
                  ? 'btn-theme-primary shadow-2xs'
                  : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
              }`}
            >
              <PenTool className="w-3.5 h-3.5" />
              <span>Stroke Order Practice</span>
            </button>
            <button
              onClick={() => setActiveTab('compounds')}
              id="kanji-tab-compounds"
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                activeTab === 'compounds'
                  ? 'btn-theme-primary shadow-2xs'
                  : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Compound Vocabulary ({kanji.examples.length})</span>
            </button>
          </div>

          {/* Active Tab Content */}
          {activeTab === 'practice' && (
            <div className="animate-in fade-in duration-150">
              <KanjiStrokeCanvas
                kanji={kanji}
                audioRate={audioRate}
                onMasterToggle={onMasterToggle}
                isMastered={isMastered}
              />
            </div>
          )}

          {activeTab === 'compounds' && (
            <div className="space-y-2.5 animate-in fade-in duration-150">
              <span className="text-[11px] font-semibold text-stone-400 uppercase tracking-wider block">
                Common Words Using {kanji.kanji}:
              </span>
              <div className="space-y-2">
                {kanji.examples.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-3 bg-stone-50 rounded-xl border border-stone-200/90 flex items-center justify-between gap-3 hover:bg-stone-100/70 transition-colors"
                  >
                    <div className="space-y-0.5">
                      <div className="flex items-baseline gap-2">
                        <span className="text-base font-extrabold font-jp text-stone-900">
                          {item.word}
                        </span>
                        <span className="text-xs font-mono text-stone-500 font-semibold">
                          ({item.furigana})
                        </span>
                        <span className="text-[11px] font-mono text-stone-400">
                          [{item.romaji}]
                        </span>
                      </div>
                      <p className="text-xs text-stone-600 font-medium">{item.meaning}</p>
                    </div>

                    <button
                      onClick={() => speakJapanese(item.word, audioRate)}
                      className="p-2 rounded-lg bg-white border border-stone-200 hover:bg-accent-light text-stone-600 hover:text-accent transition-colors cursor-pointer shadow-2xs shrink-0"
                      title={`Listen to ${item.word}`}
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
