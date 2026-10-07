import { useState, useMemo } from 'react';
import {
  Search,
  CheckCircle2,
  Volume2,
  Sparkles,
  BookOpen,
  Filter,
  RotateCcw,
  Zap,
} from 'lucide-react';
import { KanjiCategory, KanjiItem } from '../../types';
import { KANJI_DATA } from '../../data/kanjiData';
import { KanjiDetailModal } from './KanjiDetailModal';
import { speakJapanese } from '../../utils/audio';

interface KanjiSectionProps {
  showRomaji: boolean;
  audioRate: number;
  masteredKanji: string[];
  onToggleMasterKanji: (id: string) => void;
  onOpenQuickQuiz?: () => void;
}

type FilterCategory = 'all' | KanjiCategory;
type StatusFilter = 'all' | 'mastered' | 'unlearned';

export function KanjiSection({
  showRomaji,
  audioRate,
  masteredKanji,
  onToggleMasterKanji,
  onOpenQuickQuiz,
}: KanjiSectionProps) {
  const [selectedCategory, setSelectedCategory] = useState<FilterCategory>('all');
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeModalKanji, setActiveModalKanji] = useState<KanjiItem | null>(null);

  const categories: { id: FilterCategory; label: string; kanjiLabel: string }[] = [
    { id: 'all', label: 'All Kanji (120)', kanjiLabel: '全て' },
    { id: 'numbers', label: 'Numbers & Currency', kanjiLabel: '数字・金額' },
    { id: 'nature', label: 'Nature & Colors', kanjiLabel: '自然・色' },
    { id: 'people', label: 'People & Family', kanjiLabel: '人・家族' },
    { id: 'directions', label: 'Sizes & Adjectives', kanjiLabel: '大小・形容' },
    { id: 'time', label: 'Time & Calendar', kanjiLabel: '時間・暦' },
    { id: 'school', label: 'School & Study', kanjiLabel: '学校・学習' },
    { id: 'actions', label: 'Verbs & Actions', kanjiLabel: '動作・動詞' },
    { id: 'places', label: 'Places & Society', kanjiLabel: '場所・社会' },
  ];

  const filteredKanji = useMemo(() => {
    return KANJI_DATA.filter((item) => {
      // Category filter
      if (selectedCategory !== 'all' && item.category !== selectedCategory) {
        return false;
      }

      // Status filter
      const isMastered = masteredKanji.includes(item.id);
      if (statusFilter === 'mastered' && !isMastered) return false;
      if (statusFilter === 'unlearned' && isMastered) return false;

      // Search query
      if (!searchQuery.trim()) return true;
      const q = searchQuery.toLowerCase().trim();

      const matchKanji = item.kanji.includes(q);
      const matchMeaning = item.meanings.some((m) => m.toLowerCase().includes(q));
      const matchOnyomi = item.onyomi.some((on) => on.includes(q));
      const matchKunyomi = item.kunyomi.some((kun) => kun.includes(q));
      const matchRomajiOn = item.romajiOnyomi.some((r) => r.toLowerCase().includes(q));
      const matchRomajiKun = item.romajiKunyomi.some((r) => r.toLowerCase().includes(q));
      const matchExamples = item.examples.some(
        (ex) =>
          ex.word.includes(q) ||
          ex.furigana.includes(q) ||
          ex.meaning.toLowerCase().includes(q)
      );

      return (
        matchKanji ||
        matchMeaning ||
        matchOnyomi ||
        matchKunyomi ||
        matchRomajiOn ||
        matchRomajiKun ||
        matchExamples
      );
    });
  }, [selectedCategory, statusFilter, searchQuery, masteredKanji]);

  const masteredCount = masteredKanji.length;
  const totalCount = KANJI_DATA.length;
  const masteryPercentage = Math.round((masteredCount / totalCount) * 100);

  return (
    <div className="space-y-6">
      {/* Top Banner / Progress Overview */}
      <div className="bg-white rounded-3xl p-6 sm:p-7 border border-stone-200/80 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-5">
        <div className="space-y-1.5 max-w-xl">
          <div className="flex items-center gap-2">
            <h2 className="text-xl sm:text-2xl font-black text-stone-900 tracking-tight flex items-center gap-2">
              <span>JLPT N5 Foundational Kanji</span>
              <span className="text-base font-bold font-jp text-stone-400">漢字学習</span>
            </h2>
            <span className="badge-theme text-xs font-bold px-2.5 py-0.5 rounded-full">
              120 Core Characters
            </span>
          </div>
          <p className="text-stone-600 text-xs sm:text-sm leading-relaxed">
            Comprehensive JLPT N5 curriculum covering 120 essential beginner characters across 8 categories.
            Learn both On'yomi (Chinese readings) and Kun'yomi (native Japanese readings) with
            stroke order practice and over 360 compound vocabulary words.
          </p>
        </div>

        {/* Progress & Quick Quiz Button */}
        <div className="flex flex-col sm:flex-row md:flex-col items-stretch sm:items-center md:items-end gap-3 w-full md:w-auto shrink-0">
          <div className="bg-stone-50 px-4 py-2.5 rounded-2xl border border-stone-200/80 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white border border-stone-200 flex items-center justify-center font-bold text-sm text-accent shadow-2xs">
              {masteryPercentage}%
            </div>
            <div className="text-xs">
              <span className="font-bold text-stone-900 block">
                {masteredCount} / {totalCount} Mastered
              </span>
              <span className="text-stone-400 text-[11px]">
                {totalCount - masteredCount} characters to go
              </span>
            </div>
          </div>

          {onOpenQuickQuiz && (
            <button
              onClick={onOpenQuickQuiz}
              id="kanji-quiz-launch-btn"
              className="btn-theme-primary px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 shadow-xs transition-colors cursor-pointer"
            >
              <Zap className="w-4 h-4" />
              <span>Practice Kanji Quiz</span>
            </button>
          )}
        </div>
      </div>

      {/* Category Pills & Search Controls */}
      <div className="space-y-3">
        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                id={`kanji-category-${cat.id}`}
                className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
                  isSelected
                    ? 'btn-theme-primary shadow-xs'
                    : 'bg-white border border-stone-200/80 text-stone-700 hover:bg-stone-50'
                }`}
              >
                <span>{cat.label}</span>
                <span className={`text-[10px] font-jp opacity-75`}>{cat.kanjiLabel}</span>
              </button>
            );
          })}
        </div>

        {/* Filter bar: Search + Status filter */}
        <div className="bg-white rounded-2xl p-3 border border-stone-200/80 shadow-xs flex flex-wrap items-center justify-between gap-3">
          {/* Search Input */}
          <div className="relative flex-1 min-w-[200px]">
            <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search Kanji, meaning, reading (e.g., 日, sun, にち)..."
              id="kanji-search-input"
              className="w-full pl-9 pr-8 py-1.5 bg-stone-50 border border-stone-200 rounded-xl text-xs sm:text-sm focus:outline-hidden focus:ring-2 focus:ring-accent focus:bg-white transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600 text-xs"
              >
                ✕
              </button>
            )}
          </div>

          {/* Status Filter buttons */}
          <div className="flex items-center gap-1 text-xs">
            <span className="text-stone-400 text-[11px] font-medium hidden sm:inline mr-1">
              Status:
            </span>
            <button
              onClick={() => setStatusFilter('all')}
              className={`px-2.5 py-1 rounded-lg font-medium transition-colors cursor-pointer ${
                statusFilter === 'all'
                  ? 'bg-stone-900 text-white'
                  : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
              }`}
            >
              All
            </button>
            <button
              onClick={() => setStatusFilter('mastered')}
              className={`px-2.5 py-1 rounded-lg font-medium transition-colors cursor-pointer ${
                statusFilter === 'mastered'
                  ? 'bg-emerald-600 text-white'
                  : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
              }`}
            >
              Mastered ({masteredKanji.length})
            </button>
            <button
              onClick={() => setStatusFilter('unlearned')}
              className={`px-2.5 py-1 rounded-lg font-medium transition-colors cursor-pointer ${
                statusFilter === 'unlearned'
                  ? 'bg-amber-600 text-white'
                  : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
              }`}
            >
              Unlearned
            </button>
          </div>
        </div>
      </div>

      {/* Kanji Cards Grid */}
      {filteredKanji.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4">
          {filteredKanji.map((item) => {
            const isMastered = masteredKanji.includes(item.id);

            return (
              <div
                key={item.id}
                onClick={() => setActiveModalKanji(item)}
                id={`kanji-card-${item.id}`}
                className={`group bg-white rounded-2xl p-4 border transition-all duration-200 cursor-pointer flex flex-col justify-between hover:shadow-md hover:border-accent hover:-translate-y-0.5 relative ${
                  isMastered ? 'border-emerald-200/90 bg-emerald-50/10' : 'border-stone-200/80 shadow-2xs'
                }`}
              >
                {/* Card Top: Radical / Stroke Count & Mastered Toggle */}
                <div className="flex items-center justify-between text-[11px] text-stone-400">
                  <span className="font-mono text-[10px] bg-stone-100 text-stone-600 px-1.5 py-0.5 rounded">
                    {item.strokeCount}画
                  </span>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleMasterKanji(item.id);
                    }}
                    id={`kanji-master-btn-${item.id}`}
                    className={`p-1 rounded-full transition-colors ${
                      isMastered
                        ? 'text-emerald-600 hover:text-emerald-700 bg-emerald-50'
                        : 'text-stone-300 hover:text-stone-500 hover:bg-stone-100'
                    }`}
                    title={isMastered ? 'Mastered (click to unmark)' : 'Mark as mastered'}
                  >
                    <CheckCircle2 className="w-4 h-4 fill-current" />
                  </button>
                </div>

                {/* Big Kanji Character */}
                <div className="py-2 text-center">
                  <span className="text-4xl sm:text-5xl font-extrabold font-jp text-stone-900 group-hover:text-accent transition-colors block">
                    {item.kanji}
                  </span>
                  <span className="text-xs font-bold text-stone-800 mt-1 block truncate">
                    {item.meanings[0]}
                  </span>
                </div>

                {/* Readings Pills (On'yomi & Kun'yomi) */}
                <div className="space-y-1 pt-2 border-t border-stone-100 text-[11px]">
                  {/* On'yomi */}
                  {item.onyomi.length > 0 && (
                    <div className="flex items-center justify-between text-stone-500 font-mono text-[10px]">
                      <span className="text-stone-400 font-sans">音:</span>
                      <span className="font-bold text-stone-700 truncate max-w-[85px]">
                        {item.onyomi.join(', ')}
                      </span>
                    </div>
                  )}

                  {/* Kun'yomi */}
                  {item.kunyomi.length > 0 && (
                    <div className="flex items-center justify-between text-stone-500 font-mono text-[10px]">
                      <span className="text-stone-400 font-sans">訓:</span>
                      <span className="font-bold text-stone-700 truncate max-w-[85px]">
                        {item.kunyomi.join(', ')}
                      </span>
                    </div>
                  )}
                </div>

                {/* Audio speaker trigger */}
                <div className="mt-2.5 pt-2 border-t border-stone-100 flex items-center justify-between text-[10px] text-stone-400">
                  <span className="truncate">{item.categoryLabel.split(' ')[0]}</span>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      const toSpeak =
                        item.kunyomi[0]?.replace(/[()]/g, '') || item.onyomi[0] || item.kanji;
                      speakJapanese(toSpeak, audioRate);
                    }}
                    className="p-1 rounded-md text-stone-400 hover:text-accent hover:bg-accent-light transition-colors"
                    title={`Pronounce ${item.kanji}`}
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* Empty State */
        <div className="bg-white rounded-3xl p-12 text-center border border-stone-200/80 space-y-3">
          <BookOpen className="w-10 h-10 text-stone-300 mx-auto" />
          <h3 className="text-base font-bold text-stone-800">No Kanji found</h3>
          <p className="text-xs text-stone-500 max-w-sm mx-auto">
            No characters matched your current filter criteria or search query.
          </p>
          <button
            onClick={() => {
              setSelectedCategory('all');
              setStatusFilter('all');
              setSearchQuery('');
            }}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-xs font-semibold text-stone-700 transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Filters</span>
          </button>
        </div>
      )}

      {/* Kanji Detail Modal */}
      {activeModalKanji && (
        <KanjiDetailModal
          kanji={activeModalKanji}
          allKanji={KANJI_DATA}
          onClose={() => setActiveModalKanji(null)}
          onSelectKanji={(k) => setActiveModalKanji(k)}
          onMasterToggle={onToggleMasterKanji}
          isMastered={masteredKanji.includes(activeModalKanji.id)}
          audioRate={audioRate}
        />
      )}
    </div>
  );
}
