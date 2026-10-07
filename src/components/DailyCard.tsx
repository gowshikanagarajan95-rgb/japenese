import { useState, MouseEvent } from 'react';
import { Volume2, Sparkles, Flame, CheckCircle, ArrowRight } from 'lucide-react';
import { KanaCharacter, VocabItem } from '../types';
import { speakJapanese } from '../utils/audio';

interface DailyCardProps {
  kana: KanaCharacter;
  vocab: VocabItem;
  audioRate: number;
  showRomaji: boolean;
  onOpenKanaDetail: (kana: KanaCharacter) => void;
  onQuickQuiz: () => void;
}

export function DailyCard({
  kana,
  vocab,
  audioRate,
  showRomaji,
  onOpenKanaDetail,
  onQuickQuiz,
}: DailyCardProps) {
  const [isPlayingKana, setIsPlayingKana] = useState(false);
  const [isPlayingVocab, setIsPlayingVocab] = useState(false);

  const handlePlayKana = (e: MouseEvent) => {
    e.stopPropagation();
    setIsPlayingKana(true);
    speakJapanese(kana.char, audioRate, () => setIsPlayingKana(false));
  };

  const handlePlayVocab = (e: MouseEvent) => {
    e.stopPropagation();
    setIsPlayingVocab(true);
    speakJapanese(vocab.kanji, audioRate, () => setIsPlayingVocab(false));
  };

  return (
    <div className="bg-gradient-to-r from-stone-900 via-stone-850 to-stone-900 text-stone-100 rounded-3xl p-5 sm:p-6 border border-stone-800 shadow-lg relative overflow-hidden">
      {/* Subtle Japanese Mon / Crest Watermark background */}
      <div className="absolute -right-8 -bottom-8 font-jp text-9xl text-stone-800/40 font-black pointer-events-none select-none">
        和
      </div>

      <div className="relative z-10 grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
        {/* Left Column: Character of the Day */}
        <div className="md:col-span-5 flex items-center gap-4 bg-stone-800/60 p-4 rounded-2xl border border-stone-700/50">
          <div
            onClick={() => onOpenKanaDetail(kana)}
            className="w-20 h-20 rounded-2xl bg-theme-gradient flex flex-col items-center justify-center text-white cursor-pointer hover:scale-105 active:scale-95 transition-all shadow-md shrink-0"
            title="Click to practice writing this character"
          >
            <span className="font-jp text-3xl font-extrabold leading-none">{kana.char}</span>
            <span className="text-[10px] font-mono uppercase tracking-wider text-white/80 mt-1">
              {kana.romaji}
            </span>
          </div>

          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded badge-theme">
                Daily Kana
              </span>
              <button
                onClick={handlePlayKana}
                className={`p-1 rounded-md transition-colors cursor-pointer ${
                  isPlayingKana ? 'text-accent' : 'text-stone-400 hover:text-white'
                }`}
                title="Hear pronunciation"
              >
                <Volume2 className="w-3.5 h-3.5" />
              </button>
            </div>
            <div className="text-xs text-stone-300">
              Sound: <span className="font-mono font-bold text-white">/{kana.romaji}/</span> • {kana.strokeCount} strokes
            </div>
            <button
              onClick={() => onOpenKanaDetail(kana)}
              className="text-xs text-accent hover:underline font-semibold flex items-center gap-1 cursor-pointer pt-0.5"
            >
              <span>Practice Stroke Order</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        </div>

        {/* Middle Column: Daily Phrase */}
        <div className="md:col-span-4 space-y-1.5">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
              Phrase of the Day
            </span>
            <button
              onClick={handlePlayVocab}
              className={`p-1 rounded-md transition-colors cursor-pointer ${
                isPlayingVocab ? 'text-amber-400' : 'text-stone-400 hover:text-white'
              }`}
              title="Hear phrase pronunciation"
            >
              <Volume2 className="w-3.5 h-3.5" />
            </button>
          </div>
          <div>
            <div className="text-xl font-bold text-white font-jp tracking-tight">
              {vocab.kanji}
            </div>
            {showRomaji && (
              <div className="text-xs font-mono text-stone-400">
                {vocab.romaji}
              </div>
            )}
            <div className="text-xs font-medium text-stone-300">
              "{vocab.english}"
            </div>
          </div>
        </div>

        {/* Right Column: Quick Action */}
        <div className="md:col-span-3 flex md:flex-col justify-end gap-2.5">
          <button
            onClick={onQuickQuiz}
            id="daily-quick-quiz-btn"
            className="w-full py-2.5 px-4 rounded-xl btn-theme-primary font-semibold text-xs transition-all shadow-sm cursor-pointer flex items-center justify-center gap-2"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Daily 2-Min Quiz</span>
          </button>
        </div>
      </div>
    </div>
  );
}
