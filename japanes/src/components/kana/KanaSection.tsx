import { useState, useMemo, MouseEvent } from 'react';
import { Volume2, CheckCircle2, Search, Sparkles, Filter, Pencil } from 'lucide-react';
import { KanaCharacter, KanaType, KanaCategory } from '../../types';
import { HIRAGANA_DATA } from '../../data/hiraganaData';
import { KATAKANA_DATA } from '../../data/katakanaData';
import { KanaDetailModal } from './KanaDetailModal';
import { speakJapanese } from '../../utils/audio';

interface KanaSectionProps {
  showRomaji: boolean;
  audioRate: number;
  masteredKana: string[];
  onToggleMasterKana: (id: string) => void;
  onOpenQuickDrill?: (type: KanaType) => void;
}

export function KanaSection({
  showRomaji,
  audioRate,
  masteredKana,
  onToggleMasterKana,
  onOpenQuickDrill,
}: KanaSectionProps) {
  const [selectedType, setSelectedType] = useState<KanaType>('hiragana');
  const [selectedCategory, setSelectedCategory] = useState<KanaCategory | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeKana, setActiveKana] = useState<KanaCharacter | null>(null);

  const dataset = selectedType === 'hiragana' ? HIRAGANA_DATA : KATAKANA_DATA;

  // Filter dataset based on category and search
  const filteredList = useMemo(() => {
    return dataset.filter((k) => {
      const matchesCategory = selectedCategory === 'all' || k.category === selectedCategory;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        k.char.includes(q) ||
        k.romaji.toLowerCase().includes(q) ||
        k.exampleWord.includes(q) ||
        k.exampleMeaning.toLowerCase().includes(q);
      return matchesCategory && matchesSearch;
    });
  }, [dataset, selectedCategory, searchQuery]);

  // Mastered stats for current set
  const masteredInCurrentType = useMemo(() => {
    const idsInCurrent = new Set(dataset.map((k) => k.id));
    return masteredKana.filter((id) => idsInCurrent.has(id)).length;
  }, [dataset, masteredKana]);

  const handleCardClick = (kana: KanaCharacter) => {
    setActiveKana(kana);
  };

  const handleAudioQuickPlay = (e: MouseEvent, char: string) => {
    e.stopPropagation();
    speakJapanese(char, audioRate);
  };

  const handleNextKana = () => {
    if (!activeKana) return;
    const currentIndex = filteredList.findIndex((k) => k.id === activeKana.id);
    if (currentIndex !== -1 && currentIndex < filteredList.length - 1) {
      setActiveKana(filteredList[currentIndex + 1]);
    } else if (filteredList.length > 0) {
      setActiveKana(filteredList[0]);
    }
  };

  const handlePrevKana = () => {
    if (!activeKana) return;
    const currentIndex = filteredList.findIndex((k) => k.id === activeKana.id);
    if (currentIndex > 0) {
      setActiveKana(filteredList[currentIndex - 1]);
    } else if (filteredList.length > 0) {
      setActiveKana(filteredList[filteredList.length - 1]);
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Controls: Hiragana vs Katakana Switcher & Category Pills */}
      <div className="bg-white rounded-2xl p-4 sm:p-5 border border-stone-200/80 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          {/* Main Hiragana vs Katakana Switcher */}
          <div className="inline-flex p-1 rounded-xl bg-stone-100 border border-stone-200 self-start">
            <button
              onClick={() => {
                setSelectedType('hiragana');
                setActiveKana(null);
              }}
              id="tab-hiragana"
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all cursor-pointer flex items-center gap-2 ${
                selectedType === 'hiragana'
                  ? 'bg-white text-accent shadow-xs font-bold'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              <span>Hiragana</span>
              <span className="text-xs px-1.5 py-0.5 rounded badge-theme font-jp">
                ひらがな
              </span>
            </button>
            <button
              onClick={() => {
                setSelectedType('katakana');
                setActiveKana(null);
              }}
              id="tab-katakana"
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all cursor-pointer flex items-center gap-2 ${
                selectedType === 'katakana'
                  ? 'bg-white text-accent shadow-xs font-bold'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              <span>Katakana</span>
              <span className="text-xs px-1.5 py-0.5 rounded badge-theme font-jp">
                カタカナ
              </span>
            </button>
          </div>

          {/* Quick Stats & Drill Launch */}
          <div className="flex items-center gap-3">
            <div className="text-xs text-stone-500 font-medium">
              Mastered: <span className="font-bold text-emerald-600">{masteredInCurrentType}</span> / {dataset.length}
            </div>
            {onOpenQuickDrill && (
              <button
                onClick={() => onOpenQuickDrill(selectedType)}
                id="drill-kana-btn"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg btn-theme-primary text-xs font-semibold shadow-xs transition-colors cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Practice {selectedType === 'hiragana' ? 'Hiragana' : 'Katakana'}</span>
              </button>
            )}
          </div>
        </div>

        {/* Filter bar: Search & Sound Category (Gojūon, Dakuon, Yōon) */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2 border-t border-stone-100">
          <div className="flex items-center gap-1.5 flex-wrap w-full sm:w-auto">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                selectedCategory === 'all'
                  ? 'bg-stone-900 text-white font-semibold'
                  : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
              }`}
            >
              All Sounds ({dataset.length})
            </button>
            <button
              onClick={() => setSelectedCategory('gojuon')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                selectedCategory === 'gojuon'
                  ? 'bg-stone-900 text-white font-semibold'
                  : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
              }`}
            >
              Basic Gojūon (46)
            </button>
            <button
              onClick={() => setSelectedCategory('dakuon')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                selectedCategory === 'dakuon'
                  ? 'bg-stone-900 text-white font-semibold'
                  : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
              }`}
            >
              Voiced Dakuon (が, ざ, だ, etc.)
            </button>
            <button
              onClick={() => setSelectedCategory('yoon')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                selectedCategory === 'yoon'
                  ? 'bg-stone-900 text-white font-semibold'
                  : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
              }`}
            >
              Combinations Yōon (きゃ, しゃ, etc.)
            </button>
          </div>

          {/* Search Input */}
          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
            <input
              type="text"
              id="kana-search-input"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by romaji or char (e.g. ka, あ)..."
              className="w-full pl-9 pr-3 py-1.5 rounded-lg bg-stone-50 border border-stone-200 text-xs text-stone-800 placeholder-stone-400 focus:outline-hidden focus:ring-2 focus:ring-rose-500/30 focus:border-rose-500 transition-all"
            />
          </div>
        </div>
      </div>

      {/* Kana Grid Display */}
      {filteredList.length === 0 ? (
        <div className="bg-white rounded-2xl p-12 text-center border border-stone-200 text-stone-500">
          <p className="text-base font-medium">No characters match your search filter.</p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('all');
            }}
            className="mt-2 text-xs text-accent font-semibold underline cursor-pointer"
          >
            Clear filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-8 gap-3">
          {filteredList.map((kana) => {
            const isMastered = masteredKana.includes(kana.id);
            return (
              <div
                key={kana.id}
                id={`kana-card-${kana.id}`}
                onClick={() => handleCardClick(kana)}
                className={`group relative p-3 sm:p-4 rounded-xl border bg-white transition-all cursor-pointer hover:shadow-md hover:-translate-y-0.5 flex flex-col items-center justify-between text-center min-h-[110px] ${
                  isMastered
                    ? 'border-emerald-200 bg-emerald-50/20'
                    : 'border-stone-200/90 hover:border-accent'
                }`}
              >
                {/* Mastered checkmark top-right */}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onToggleMasterKana(kana.id);
                  }}
                  id={`master-icon-${kana.id}`}
                  className="absolute top-2 right-2 text-stone-300 hover:text-emerald-500 transition-colors"
                  title={isMastered ? 'Marked as mastered' : 'Mark as mastered'}
                >
                  <CheckCircle2
                    className={`w-4 h-4 ${
                      isMastered ? 'text-emerald-500 fill-emerald-100' : ''
                    }`}
                  />
                </button>

                {/* Character Glyph */}
                <div className="mt-1 font-jp text-3xl sm:text-4xl font-extrabold text-stone-900 group-hover:text-accent transition-colors">
                  {kana.char}
                </div>

                {/* Romaji Reading */}
                <div className="my-1">
                  {showRomaji ? (
                    <span className="text-xs font-mono font-bold text-stone-500 group-hover:text-stone-800">
                      {kana.romaji}
                    </span>
                  ) : (
                    <span className="text-[10px] text-stone-300 font-mono tracking-widest group-hover:text-stone-500">
                      •••
                    </span>
                  )}
                </div>

                {/* Action footer: stroke count and quick audio */}
                <div className="w-full flex items-center justify-between pt-1 border-t border-stone-100 text-[10px] text-stone-400">
                  <span className="flex items-center gap-0.5" title="Practice stroke order">
                    <Pencil className="w-2.5 h-2.5" />
                    {kana.strokeCount}
                  </span>
                  <button
                    type="button"
                    onClick={(e) => handleAudioQuickPlay(e, kana.char)}
                    className="p-1 rounded text-stone-400 hover:text-accent hover:bg-accent-light transition-colors"
                    title={`Pronounce ${kana.romaji}`}
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Character Detail & Writing Modal */}
      {activeKana && (
        <KanaDetailModal
          kana={activeKana}
          onClose={() => setActiveKana(null)}
          onNext={handleNextKana}
          onPrev={handlePrevKana}
          onMasterToggle={onToggleMasterKana}
          isMastered={masteredKana.includes(activeKana.id)}
          audioRate={audioRate}
        />
      )}
    </div>
  );
}
