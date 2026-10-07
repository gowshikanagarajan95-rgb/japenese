import { useState, useId } from 'react';
import {
  Sparkles,
  Volume2,
  BookOpen,
  ArrowRight,
  CheckCircle2,
  Flame,
  PenTool,
  Grid,
  BookMarked,
  Layers,
  Palette,
  Check,
  Compass,
  X,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { TabId } from '../Navigation';
import { speakJapanese } from '../../utils/audio';
import { UserPrefs } from '../../utils/storage';
import { ThemeColor } from '../../types';

interface WelcomeScreenProps {
  prefs: UserPrefs;
  onUpdatePrefs: (newPrefs: Partial<UserPrefs>) => void;
  onNavigateToTab: (tab: TabId) => void;
  onClose: () => void;
  isModal?: boolean;
}

const SAMPLE_PHRASES = [
  { kanji: 'こんにちは', romaji: 'Konnichiwa', english: 'Hello / Good afternoon' },
  { kanji: 'ありがとう', romaji: 'Arigatou', english: 'Thank you' },
  { kanji: 'さくら', romaji: 'Sakura', english: 'Cherry Blossom' },
  { kanji: '富士山', romaji: 'Fujisan', english: 'Mt. Fuji' },
  { kanji: '美味しい', romaji: 'Oishii', english: 'Delicious' },
  { kanji: '日本', romaji: 'Nihon', english: 'Japan' },
];

const THEME_OPTIONS: { id: ThemeColor; name: string; hex: string }[] = [
  { id: 'indigo', name: 'Indigo', hex: '#2563eb' },
  { id: 'vermilion', name: 'Vermilion', hex: '#e11d48' },
  { id: 'matcha', name: 'Matcha', hex: '#059669' },
  { id: 'sakura', name: 'Sakura', hex: '#db2777' },
  { id: 'violet', name: 'Violet', hex: '#7c3aed' },
  { id: 'amber', name: 'Amber', hex: '#d97706' },
];

export function WelcomeScreen({
  prefs,
  onUpdatePrefs,
  onNavigateToTab,
  onClose,
  isModal = false,
}: WelcomeScreenProps) {
  const [activePlaying, setActivePlaying] = useState<string | null>(null);
  const baseId = useId();

  const handlePlaySample = (text: string) => {
    setActivePlaying(text);
    speakJapanese(text, prefs.audioRate, () => {
      setActivePlaying(null);
    });
  };

  const handleStartExploring = () => {
    try {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.7 },
        colors: ['#e11d48', '#2563eb', '#059669', '#f59e0b'],
      });
    } catch {
      // Ignore confetti errors if environment restricts it
    }
    onClose();
  };

  const handleSelectFeature = (tab: TabId) => {
    onNavigateToTab(tab);
    onClose();
  };

  return (
    <div
      id={`${baseId}-welcome-container`}
      className={`relative w-full ${
        isModal
          ? 'bg-white rounded-3xl shadow-2xl border border-stone-200 overflow-hidden max-w-5xl mx-auto my-6 max-h-[90vh] overflow-y-auto'
          : 'bg-white rounded-3xl shadow-lg border border-stone-200/80 p-6 sm:p-8 overflow-hidden'
      }`}
    >
      {/* Top Banner with Japanese Motifs & Close Button */}
      <div className="relative bg-gradient-to-br from-stone-900 via-stone-850 to-stone-900 text-stone-100 p-6 sm:p-8 rounded-2xl overflow-hidden shadow-inner">
        {/* Decorative Torii / Kanji Background Watermark */}
        <div className="absolute right-4 -bottom-6 font-jp text-8xl sm:text-9xl text-stone-800/40 font-black pointer-events-none select-none">
          日本語
        </div>

        {isModal && (
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-xl bg-stone-800/80 hover:bg-stone-700 text-stone-300 hover:text-white transition-colors cursor-pointer"
            title="Close welcome guide"
          >
            <X className="w-5 h-5" />
          </button>
        )}

        <div className="relative z-10 max-w-2xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/30 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-rose-400" />
            <span className="font-jp font-bold">ようこそ！ Welcome to Nihongo Master</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
            Learn Japanese from Zero to Fluency
          </h2>

          <p className="text-stone-300 text-sm sm:text-base leading-relaxed">
            Your comprehensive, interactive companion for beginner Japanese. Explore Kana charts,
            120 foundational JLPT N5 Kanji with stroke animations, everyday vocabulary, essential
            grammar, and interactive quizzes with native audio synthesis.
          </p>

          {/* Quick Stats Pill Ribbon */}
          <div className="flex flex-wrap items-center gap-2 pt-2">
            <span className="px-3 py-1 rounded-lg bg-stone-800 text-stone-200 text-xs font-medium border border-stone-700 flex items-center gap-1.5">
              <Grid className="w-3.5 h-3.5 text-accent" />
              <span>92 Kana (46+46)</span>
            </span>
            <span className="px-3 py-1 rounded-lg bg-stone-800 text-stone-200 text-xs font-medium border border-stone-700 flex items-center gap-1.5">
              <PenTool className="w-3.5 h-3.5 text-accent" />
              <span>120 Core Kanji</span>
            </span>
            <span className="px-3 py-1 rounded-lg bg-stone-800 text-stone-200 text-xs font-medium border border-stone-700 flex items-center gap-1.5">
              <BookMarked className="w-3.5 h-3.5 text-accent" />
              <span>360+ Compounds</span>
            </span>
            <span className="px-3 py-1 rounded-lg bg-stone-800 text-stone-200 text-xs font-medium border border-stone-700 flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-accent" />
              <span>4 Interactive Quizzes</span>
            </span>
          </div>
        </div>
      </div>

      <div className="mt-6 space-y-6">
        {/* Interactive Audio Pronunciation Sampler */}
        <div className="bg-stone-50 border border-stone-200/80 rounded-2xl p-4 sm:p-5 space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-lg bg-stone-200 text-stone-800">
                <Volume2 className="w-4 h-4 text-accent" />
              </div>
              <h3 className="text-sm font-bold text-stone-900">
                Try Native Pronunciation Now (Click Any Word)
              </h3>
            </div>
            <span className="text-xs text-stone-500">
              Interactive Web Speech Synthesis
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2">
            {SAMPLE_PHRASES.map((item) => {
              const isPlaying = activePlaying === item.kanji;
              return (
                <button
                  key={item.kanji}
                  id={`sample-phrase-${item.romaji.toLowerCase()}`}
                  onClick={() => handlePlaySample(item.kanji)}
                  className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between group ${
                    isPlaying
                      ? 'bg-rose-50 border-rose-400 shadow-sm scale-98'
                      : 'bg-white border-stone-200 hover:border-stone-300 hover:bg-stone-100/60 shadow-xs'
                  }`}
                  title={`Click to listen to "${item.kanji}"`}
                >
                  <div className="flex items-center justify-between w-full">
                    <span className="font-jp text-base font-bold text-stone-900 group-hover:text-accent transition-colors">
                      {item.kanji}
                    </span>
                    <Volume2
                      className={`w-3.5 h-3.5 ${
                        isPlaying ? 'text-rose-600 animate-pulse' : 'text-stone-400'
                      }`}
                    />
                  </div>
                  <div className="mt-1">
                    <span className="text-[11px] font-mono text-stone-500 block">
                      {item.romaji}
                    </span>
                    <span className="text-[10px] text-stone-400 truncate block">
                      {item.english}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* 5 Core Feature Exploration Cards */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-bold uppercase tracking-wider text-stone-500 flex items-center gap-1.5">
              <Compass className="w-4 h-4 text-stone-600" />
              <span>Explore The 5 Modules</span>
            </h3>
            <span className="text-xs text-stone-400 hidden sm:inline">
              Click any card to jump straight into that module
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
            {/* 1. Kana Charts */}
            <div
              onClick={() => handleSelectFeature('kana')}
              className="p-4 rounded-2xl bg-white border border-stone-200 hover:border-accent/60 hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-base font-jp">
                    かな
                  </div>
                  <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-blue-100 text-blue-800">
                    92 Characters
                  </span>
                </div>
                <div>
                  <h4 className="font-bold text-stone-900 group-hover:text-accent transition-colors">
                    Kana Charts & Writing
                  </h4>
                  <p className="text-xs text-stone-500 mt-1 leading-relaxed">
                    Master all 46 Hiragana & 46 Katakana characters with native audio, diacritics, and interactive stroke order canvas.
                  </p>
                </div>
              </div>
              <div className="mt-3 pt-3 border-t border-stone-100 flex items-center justify-between text-xs font-semibold text-accent">
                <span>Open Kana Section</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>

            {/* 2. 120 Core Kanji */}
            <div
              onClick={() => handleSelectFeature('kanji')}
              className="p-4 rounded-2xl bg-white border-2 border-stone-300 hover:border-accent hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 bg-accent text-white text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-bl-lg">
                Expanded
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center font-bold text-base font-jp">
                    漢字
                  </div>
                  <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-rose-100 text-rose-800">
                    120 Kanji
                  </span>
                </div>
                <div>
                  <h4 className="font-bold text-stone-900 group-hover:text-accent transition-colors">
                    120 Core JLPT N5 Kanji
                  </h4>
                  <p className="text-xs text-stone-500 mt-1 leading-relaxed">
                    Complete JLPT N5 roster across 8 categories with On&apos;yomi, Kun&apos;yomi, Genkōyōshi writing grid, and 360+ compound words.
                  </p>
                </div>
              </div>
              <div className="mt-3 pt-3 border-t border-stone-100 flex items-center justify-between text-xs font-semibold text-accent">
                <span>Explore 120 Kanji</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>

            {/* 3. Essential Vocabulary */}
            <div
              onClick={() => handleSelectFeature('vocab')}
              className="p-4 rounded-2xl bg-white border border-stone-200 hover:border-accent/60 hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold text-base font-jp">
                    単語
                  </div>
                  <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                    60+ Words
                  </span>
                </div>
                <div>
                  <h4 className="font-bold text-stone-900 group-hover:text-accent transition-colors">
                    Essential Vocabulary
                  </h4>
                  <p className="text-xs text-stone-500 mt-1 leading-relaxed">
                    High-frequency everyday Japanese words organized by food, travel, greetings, and school with flashcard launcher.
                  </p>
                </div>
              </div>
              <div className="mt-3 pt-3 border-t border-stone-100 flex items-center justify-between text-xs font-semibold text-accent">
                <span>Browse Vocabulary</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>

            {/* 4. Grammar Foundations */}
            <div
              onClick={() => handleSelectFeature('grammar')}
              className="p-4 rounded-2xl bg-white border border-stone-200 hover:border-accent/60 hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold text-base font-jp">
                    文法
                  </div>
                  <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-800">
                    8 Foundations
                  </span>
                </div>
                <div>
                  <h4 className="font-bold text-stone-900 group-hover:text-accent transition-colors">
                    Grammar Foundations
                  </h4>
                  <p className="text-xs text-stone-500 mt-1 leading-relaxed">
                    Clear formulas for particles (は, を, に, で), SOV sentence order, question formation, and polite verb conjugations.
                  </p>
                </div>
              </div>
              <div className="mt-3 pt-3 border-t border-stone-100 flex items-center justify-between text-xs font-semibold text-accent">
                <span>Learn Grammar</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>

            {/* 5. Practice & Quizzes */}
            <div
              onClick={() => handleSelectFeature('quiz')}
              className="p-4 rounded-2xl bg-white border border-stone-200 hover:border-accent/60 hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between sm:col-span-2 lg:col-span-2"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center font-bold text-base font-jp">
                    練習
                  </div>
                  <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-purple-100 text-purple-800">
                    4 Quiz Arenas
                  </span>
                </div>
                <div>
                  <h4 className="font-bold text-stone-900 group-hover:text-accent transition-colors">
                    Practice & Interactive Quizzes
                  </h4>
                  <p className="text-xs text-stone-500 mt-1 leading-relaxed">
                    Test your skills with multiple-choice Kana drills, 120 Kanji identification, spaced-repetition flashcards, and interactive Japanese sentence building puzzles.
                  </p>
                </div>
              </div>
              <div className="mt-3 pt-3 border-t border-stone-100 flex items-center justify-between text-xs font-semibold text-accent">
                <span>Launch Quiz Arena</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </div>
        </div>

        {/* Quick Customization Toolbar */}
        <div className="bg-stone-50 border border-stone-200/80 rounded-2xl p-4 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Palette className="w-4 h-4 text-stone-600" />
            <span className="text-xs font-bold text-stone-700">Theme:</span>
            <div className="flex items-center gap-1.5">
              {THEME_OPTIONS.map((theme) => {
                const isSelected = (prefs.themeColor || 'indigo') === theme.id;
                return (
                  <button
                    key={theme.id}
                    onClick={() => onUpdatePrefs({ themeColor: theme.id })}
                    className={`w-6 h-6 rounded-full border transition-all cursor-pointer flex items-center justify-center ${
                      isSelected
                        ? 'border-stone-900 scale-110 shadow-xs'
                        : 'border-transparent hover:scale-105 opacity-70 hover:opacity-100'
                    }`}
                    style={{ backgroundColor: theme.hex }}
                    title={`Theme: ${theme.name}`}
                  >
                    {isSelected && <Check className="w-3 h-3 text-white" />}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Romaji Quick Toggle */}
            <button
              onClick={() => onUpdatePrefs({ showRomaji: !prefs.showRomaji })}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-colors cursor-pointer flex items-center gap-1.5 ${
                prefs.showRomaji
                  ? 'bg-stone-900 text-white border-stone-900'
                  : 'bg-white text-stone-600 border-stone-300 hover:bg-stone-100'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Romaji: {prefs.showRomaji ? 'ON' : 'OFF'}</span>
            </button>

            {/* Audio Speed Quick Toggle */}
            <button
              onClick={() => onUpdatePrefs({ audioRate: prefs.audioRate === 0.9 ? 0.75 : 0.9 })}
              className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-white border border-stone-300 text-stone-700 hover:bg-stone-100 transition-colors cursor-pointer flex items-center gap-1.5"
            >
              <Volume2 className="w-3.5 h-3.5 text-accent" />
              <span>Audio: {prefs.audioRate === 0.9 ? '1.0x (Normal)' : '0.75x (Slow)'}</span>
            </button>
          </div>
        </div>

        {/* Clear Action Buttons */}
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3">
          <button
            id="start-exploring-btn"
            onClick={handleStartExploring}
            className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-stone-900 hover:bg-black text-white font-bold text-sm shadow-md hover:shadow-lg transition-all cursor-pointer flex items-center justify-center gap-2 group"
          >
            <Sparkles className="w-4 h-4 text-amber-400 group-hover:rotate-12 transition-transform" />
            <span>Start Exploring Full App</span>
            <ArrowRight className="w-4 h-4 text-stone-300 group-hover:translate-x-1 transition-transform" />
          </button>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              onClick={() => handleSelectFeature('kanji')}
              className="flex-1 sm:flex-none px-4 py-3 rounded-2xl bg-rose-50 hover:bg-rose-100 border border-rose-200 text-rose-700 font-bold text-xs transition-colors cursor-pointer text-center"
            >
              Jump to 120 Kanji
            </button>
            <button
              onClick={() => handleSelectFeature('quiz')}
              className="flex-1 sm:flex-none px-4 py-3 rounded-2xl bg-purple-50 hover:bg-purple-100 border border-purple-200 text-purple-700 font-bold text-xs transition-colors cursor-pointer text-center"
            >
              Take a Quick Quiz
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
