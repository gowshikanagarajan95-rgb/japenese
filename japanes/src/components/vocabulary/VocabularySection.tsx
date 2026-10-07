import { useState, useMemo } from 'react';
import {
  Volume2,
  Bookmark,
  BookmarkCheck,
  Search,
  Sparkles,
  BookOpen,
  GraduationCap,
  Users,
  CheckCircle2,
  Filter,
} from 'lucide-react';
import { VocabItem } from '../../types';
import { VOCABULARY_DATA, UNIT_1_VOCABULARY } from '../../data/vocabularyData';
import { STUDY_UNITS, StudyUnit } from '../../data/unitsData';
import { speakJapanese } from '../../utils/audio';

interface VocabularySectionProps {
  showRomaji: boolean;
  audioRate: number;
  masteredVocab: string[];
  onToggleMasterVocab: (id: string) => void;
  onOpenFlashcards?: (unit?: number) => void;
}

const UNIT_1_SUBCATEGORIES = [
  { id: 'all', label: 'All Unit 1', icon: '🌸' },
  { id: 'Pronouns & People', label: 'Pronouns & People (代名詞・人)', icon: '👥' },
  { id: 'Honorific Suffixes', label: 'Honorific Suffixes (～さん・～人)', icon: '🏷️' },
  { id: 'Occupations & Roles', label: 'Occupations (職業)', icon: '💼' },
  { id: 'Institutions & Places', label: 'Institutions (大学・病院)', icon: '🏫' },
  { id: 'Meeting & Greetings', label: 'Introductions & Meeting (出会い)', icon: '🤝' },
  { id: 'Questions & Age', label: 'Questions & Age (だれ・何歳)', icon: '❓' },
  { id: 'Countries & Nationalities', label: 'Countries (国・国籍)', icon: '🌏' },
];

export function VocabularySection({
  showRomaji,
  audioRate,
  masteredVocab,
  onToggleMasterVocab,
  onOpenFlashcards,
}: VocabularySectionProps) {
  // Default to Unit 1 so users immediately see Unit 1 vocabulary
  const [selectedUnit, setSelectedUnit] = useState<number | 'all'>(1);
  const [selectedSubCategory, setSelectedSubCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'mastered' | 'unlearned'>('all');
  const [playingId, setPlayingId] = useState<string | null>(null);

  // Filtered vocabulary list
  const filteredVocab = useMemo(() => {
    return VOCABULARY_DATA.filter((item) => {
      // Unit filter
      const matchUnit =
        selectedUnit === 'all'
          ? true
          : selectedUnit === 1
          ? item.unit === 1 || item.id.startsWith('u1_')
          : item.unit === selectedUnit;

      // Subcategory filter (only applies if in Unit 1)
      const matchSub =
        selectedUnit === 1 && selectedSubCategory !== 'all'
          ? item.subCategory === selectedSubCategory
          : true;

      // Mastery status filter
      const isMastered = masteredVocab.includes(item.id);
      const matchStatus =
        statusFilter === 'all'
          ? true
          : statusFilter === 'mastered'
          ? isMastered
          : !isMastered;

      // Search query
      const q = searchQuery.toLowerCase().trim();
      const matchSearch =
        !q ||
        item.kanji.toLowerCase().includes(q) ||
        item.furigana.toLowerCase().includes(q) ||
        item.romaji.toLowerCase().includes(q) ||
        item.english.toLowerCase().includes(q) ||
        item.exampleJp.toLowerCase().includes(q) ||
        item.exampleEn.toLowerCase().includes(q);

      return matchUnit && matchSub && matchStatus && matchSearch;
    });
  }, [selectedUnit, selectedSubCategory, statusFilter, searchQuery, masteredVocab]);

  // Current selected unit stats
  const currentUnitStats = useMemo(() => {
    let items: VocabItem[] = [];
    if (selectedUnit === 'all') {
      items = VOCABULARY_DATA;
    } else if (selectedUnit === 1) {
      items = VOCABULARY_DATA.filter((item) => item.unit === 1 || item.id.startsWith('u1_'));
    } else {
      items = VOCABULARY_DATA.filter((item) => item.unit === selectedUnit);
    }
    const total = items.length;
    const mastered = items.filter((item) => masteredVocab.includes(item.id)).length;
    const percent = total > 0 ? Math.round((mastered / total) * 100) : 0;
    return { total, mastered, percent };
  }, [selectedUnit, masteredVocab]);

  const handlePlayAudio = (id: string, text: string) => {
    setPlayingId(id);
    speakJapanese(text, audioRate, () => setPlayingId(null));
  };

  const activeUnitInfo = useMemo(() => {
    if (selectedUnit === 'all') return null;
    return STUDY_UNITS.find((u) => u.id === selectedUnit);
  }, [selectedUnit]);

  return (
    <div className="space-y-6">
      {/* Unit Selector Header Tabs */}
      <div className="bg-white rounded-2xl p-4 sm:p-5 border border-stone-200/80 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold tracking-wide uppercase bg-rose-100 text-rose-700 border border-rose-200">
                Core Curriculum • 25 Units
              </span>
              <h2 className="text-base font-bold text-stone-900 flex items-center gap-2">
                <span>Japanese Vocabulary by Unit</span>
              </h2>
            </div>
            <p className="text-xs text-stone-500 mt-1">
              Complete JLPT N5 vocabulary covering everyday situations, verbs, particles, adjectives, and grammar-aligned wordlists.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="text-xs text-stone-500 font-medium">
              Saved / Mastered:{' '}
              <span className="font-bold text-accent">{masteredVocab.length} words</span>
            </div>
            {onOpenFlashcards && (
              <button
                onClick={() => onOpenFlashcards(selectedUnit === 'all' ? undefined : (selectedUnit as number))}
                id="launch-flashcards-btn"
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-stone-900 hover:bg-stone-800 text-white text-xs font-semibold shadow-xs transition-colors cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5 text-accent" />
                <span>
                  {selectedUnit === 'all'
                    ? 'Practice All Flashcards'
                    : `Practice Unit ${selectedUnit} Flashcards`}
                </span>
              </button>
            )}
          </div>
        </div>

        {/* Quick Dropdown & Stage Jump */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5 pt-2 border-t border-stone-100">
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-stone-600 whitespace-nowrap">Jump to Unit:</span>
            <select
              id="vocab-unit-jump-select"
              value={selectedUnit === 'all' ? 'all' : selectedUnit}
              onChange={(e) => {
                const val = e.target.value;
                setSelectedUnit(val === 'all' ? 'all' : Number(val));
                setSelectedSubCategory('all');
              }}
              className="bg-stone-50 border border-stone-200 rounded-xl px-3 py-1.5 text-xs font-medium text-stone-800 focus:outline-hidden focus:ring-2 focus:ring-rose-500/30 cursor-pointer"
            >
              <option value="all">🌟 All Units ({VOCABULARY_DATA.length} total words)</option>
              {STUDY_UNITS.map((u) => {
                const count = VOCABULARY_DATA.filter((v) =>
                  u.id === 1 ? v.unit === 1 || v.id.startsWith('u1_') : v.unit === u.id
                ).length;
                return (
                  <option key={u.id} value={u.id}>
                    Unit {u.id}: {u.title} ({count} words)
                  </option>
                );
              })}
            </select>
          </div>

          <div className="text-xs text-stone-400 font-medium">
            Showing {filteredVocab.length} words
          </div>
        </div>

        {/* Units Tab Row (Horizontal Scroll) */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-thin">
          {/* Unit 1 Button */}
          <button
            onClick={() => {
              setSelectedUnit(1);
              setSelectedSubCategory('all');
            }}
            id="unit-tab-1"
            className={`px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer flex items-center gap-2 shrink-0 ${
              selectedUnit === 1
                ? 'btn-theme-primary shadow-sm ring-2 ring-stone-900/10 font-bold'
                : 'bg-stone-100 text-stone-700 hover:bg-stone-200/80'
            }`}
          >
            <GraduationCap className="w-4 h-4" />
            <span>Unit 1: Introductions (第1課)</span>
            <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-black/10 font-mono">
              42 words
            </span>
          </button>

          {/* Other Units 2 to 25 */}
          {STUDY_UNITS.filter((u) => u.id !== 1).map((u) => {
            const count = VOCABULARY_DATA.filter((v) => v.unit === u.id).length;
            const isSelected = selectedUnit === u.id;
            return (
              <button
                key={u.id}
                onClick={() => {
                  setSelectedUnit(u.id);
                  setSelectedSubCategory('all');
                }}
                id={`unit-tab-${u.id}`}
                className={`px-3 py-2 rounded-xl text-xs font-medium whitespace-nowrap transition-all cursor-pointer flex items-center gap-1.5 shrink-0 ${
                  isSelected
                    ? 'btn-theme-primary font-bold shadow-xs'
                    : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                }`}
              >
                <span>{u.title}</span>
                {count > 0 && (
                  <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                    isSelected ? 'bg-white/20 text-white' : 'bg-stone-200/70 text-stone-600'
                  }`}>
                    {count}
                  </span>
                )}
              </button>
            );
          })}

          {/* All Vocabulary Option */}
          <button
            onClick={() => {
              setSelectedUnit('all');
              setSelectedSubCategory('all');
            }}
            id="unit-tab-all"
            className={`px-3 py-2 rounded-xl text-xs font-medium whitespace-nowrap transition-all cursor-pointer flex items-center gap-1.5 shrink-0 ${
              selectedUnit === 'all'
                ? 'btn-theme-primary font-bold shadow-xs'
                : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>All Vocabulary ({VOCABULARY_DATA.length})</span>
          </button>
        </div>
      </div>

      {/* Unit Spotlight Banner for Selected Unit */}
      {selectedUnit !== 'all' && activeUnitInfo && (
        <div
          id={`unit-${selectedUnit}-spotlight-card`}
          className="bg-gradient-to-r from-stone-900 via-stone-850 to-stone-800 rounded-3xl p-5 sm:p-6 text-white border border-stone-800 shadow-md space-y-4"
        >
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="space-y-1.5">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-md bg-amber-400/20 text-amber-300 text-[11px] font-bold tracking-wider uppercase border border-amber-400/30">
                  {activeUnitInfo.badge}
                </span>
                <span className="text-xs text-stone-300 font-jp">
                  {activeUnitInfo.japaneseTitle}
                </span>
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-white font-jp tracking-tight">
                {activeUnitInfo.title}
              </h3>
              <p className="text-xs sm:text-sm text-stone-300 max-w-2xl leading-relaxed">
                {activeUnitInfo.description}
              </p>
            </div>

            {/* Unit Progress Pill */}
            <div className="bg-stone-800/90 rounded-2xl p-4 border border-stone-700/80 min-w-[200px] flex flex-col justify-center space-y-2">
              <div className="flex items-center justify-between text-xs font-medium">
                <span className="text-stone-300">Unit {selectedUnit} Mastery</span>
                <span className="text-emerald-400 font-bold font-mono">
                  {currentUnitStats.mastered} / {currentUnitStats.total} ({currentUnitStats.percent}%)
                </span>
              </div>
              <div className="w-full h-2 rounded-full bg-stone-700 overflow-hidden">
                <div
                  className="h-full bg-emerald-400 rounded-full transition-all duration-300"
                  style={{ width: `${currentUnitStats.percent}%` }}
                />
              </div>
              <div className="text-[11px] text-stone-400 text-center">
                {currentUnitStats.total > 0 && currentUnitStats.mastered === currentUnitStats.total
                  ? `🎉 All Unit ${selectedUnit} vocabulary mastered!`
                  : `${currentUnitStats.total - currentUnitStats.mastered} words left to learn`}
              </div>
            </div>
          </div>

          {/* Unit 1 Subcategory Chips */}
          {selectedUnit === 1 && (
            <div className="pt-3 border-t border-stone-750">
              <div className="flex items-center gap-2 mb-2 text-xs text-stone-300 font-medium">
                <Filter className="w-3.5 h-3.5 text-stone-400" />
                <span>Unit 1 Topics:</span>
              </div>
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
                {UNIT_1_SUBCATEGORIES.map((sub) => {
                  const isSelected = selectedSubCategory === sub.id;
                  return (
                    <button
                      key={sub.id}
                      onClick={() => setSelectedSubCategory(sub.id)}
                      id={`u1-subcat-${sub.id.replace(/\s+/g, '-').toLowerCase()}`}
                      className={`px-3 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition-all cursor-pointer flex items-center gap-1.5 ${
                        isSelected
                          ? 'bg-white text-stone-900 font-bold shadow-xs'
                          : 'bg-stone-800/80 text-stone-300 hover:bg-stone-700/80 hover:text-white border border-stone-700/60'
                      }`}
                    >
                      <span>{sub.icon}</span>
                      <span>{sub.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Toolbar: Search, Status Filter & Count */}
      <div className="bg-white rounded-2xl p-4 border border-stone-200/80 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        {/* Search Field */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3 top-3 text-stone-400" />
          <input
            type="text"
            id="vocab-search-input"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search words by English, Kanji, Furigana, or Romaji (e.g. sensei, teacher, 先生)..."
            className="w-full pl-9 pr-3 py-2 rounded-xl bg-stone-50 border border-stone-200 text-xs text-stone-800 placeholder-stone-400 focus:outline-hidden focus:ring-2 focus:ring-rose-500/30 focus:border-rose-500 transition-all"
          />
        </div>

        {/* Status Filter Buttons */}
        <div className="flex items-center gap-1.5 self-end sm:self-auto">
          <button
            onClick={() => setStatusFilter('all')}
            id="vocab-status-all"
            className={`px-3 py-1.5 rounded-xl text-xs font-medium cursor-pointer transition-colors ${
              statusFilter === 'all'
                ? 'bg-stone-900 text-white font-semibold'
                : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
            }`}
          >
            All ({filteredVocab.length})
          </button>
          <button
            onClick={() => setStatusFilter('mastered')}
            id="vocab-status-mastered"
            className={`px-3 py-1.5 rounded-xl text-xs font-medium cursor-pointer transition-colors flex items-center gap-1 ${
              statusFilter === 'mastered'
                ? 'bg-emerald-600 text-white font-semibold'
                : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
            }`}
          >
            <BookmarkCheck className="w-3.5 h-3.5" />
            <span>Mastered</span>
          </button>
          <button
            onClick={() => setStatusFilter('unlearned')}
            id="vocab-status-unlearned"
            className={`px-3 py-1.5 rounded-xl text-xs font-medium cursor-pointer transition-colors ${
              statusFilter === 'unlearned'
                ? 'bg-amber-600 text-white font-semibold'
                : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
            }`}
          >
            To Learn
          </button>
        </div>
      </div>

      {/* Vocabulary Cards Grid */}
      {filteredVocab.length === 0 ? (
        <div className="bg-white rounded-2xl p-12 text-center border border-stone-200 text-stone-500 space-y-2">
          <p className="text-base font-semibold text-stone-800">
            No vocabulary items match your filters.
          </p>
          <p className="text-xs text-stone-500">
            Try adjusting your search query or selecting "All Unit 1" to view all words.
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedSubCategory('all');
              setStatusFilter('all');
            }}
            className="mt-2 inline-block text-xs text-accent font-semibold underline cursor-pointer"
          >
            Reset filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredVocab.map((vocab) => {
            const isMastered = masteredVocab.includes(vocab.id);
            const isPlaying = playingId === vocab.id;

            return (
              <div
                key={vocab.id}
                id={`vocab-card-${vocab.id}`}
                className={`bg-white rounded-2xl p-5 border transition-all duration-200 hover:shadow-md flex flex-col justify-between space-y-4 ${
                  isMastered
                    ? 'border-accent-light/80 bg-accent-light/5 shadow-xs'
                    : 'border-stone-200/90'
                }`}
              >
                {/* Card Top: Japanese text, Badges & Audio */}
                <div>
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      {/* Furigana Reading */}
                      <span className="text-xs font-mono text-stone-400 block mb-0.5">
                        {vocab.furigana}
                      </span>
                      {/* Main Kanji / Word */}
                      <h3 className="text-2xl font-black text-stone-900 font-jp tracking-tight">
                        {vocab.kanji}
                      </h3>
                    </div>

                    {/* Bookmark & Audio Controls */}
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => onToggleMasterVocab(vocab.id)}
                        id={`bookmark-btn-${vocab.id}`}
                        className={`p-2 rounded-xl transition-colors cursor-pointer ${
                          isMastered
                            ? 'text-accent bg-accent-light hover:bg-accent-light/80'
                            : 'text-stone-300 hover:text-stone-600 hover:bg-stone-100'
                        }`}
                        title={isMastered ? 'Marked as mastered (click to unmark)' : 'Mark as mastered'}
                      >
                        {isMastered ? (
                          <BookmarkCheck className="w-4 h-4 fill-current text-accent" />
                        ) : (
                          <Bookmark className="w-4 h-4" />
                        )}
                      </button>

                      <button
                        onClick={() => handlePlayAudio(vocab.id, vocab.kanji)}
                        id={`play-vocab-audio-${vocab.id}`}
                        className={`p-2 rounded-xl transition-all cursor-pointer ${
                          isPlaying
                            ? 'btn-theme-primary scale-105 shadow-sm'
                            : 'bg-stone-100 hover:bg-accent-light text-stone-700 hover:text-accent'
                        }`}
                        title="Listen to Japanese pronunciation"
                      >
                        <Volume2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Romaji & English meaning */}
                  <div className="mt-2.5 space-y-1">
                    {showRomaji && (
                      <div className="text-xs font-mono font-semibold text-stone-500">
                        [{vocab.romaji}]
                      </div>
                    )}
                    <div className="text-sm font-bold text-stone-900 leading-snug">
                      {vocab.english}
                    </div>
                  </div>

                  {/* Badges: Unit & Subcategory */}
                  <div className="mt-3 flex items-center flex-wrap gap-1.5">
                    {vocab.unit && (
                      <span className="text-[10px] px-2 py-0.5 rounded-md font-semibold bg-stone-100 text-stone-600 border border-stone-200">
                        Unit {vocab.unit}
                      </span>
                    )}
                    {vocab.subCategory && (
                      <span className="text-[10px] px-2 py-0.5 rounded-md font-semibold bg-stone-100 text-stone-600 border border-stone-200">
                        {vocab.subCategory}
                      </span>
                    )}
                  </div>
                </div>

                {/* Example sentence box */}
                <div className="pt-3 border-t border-stone-100 bg-stone-50/80 -mx-5 -mb-5 px-5 py-3 rounded-b-2xl">
                  <div className="flex items-center justify-between text-[11px] font-semibold text-stone-400 uppercase tracking-wider mb-1">
                    <span>Example Sentence</span>
                    <button
                      onClick={() => handlePlayAudio(`${vocab.id}_ex`, vocab.exampleJp)}
                      className="text-stone-400 hover:text-accent flex items-center gap-1 cursor-pointer transition-colors"
                      title="Hear example sentence pronunciation"
                    >
                      <Volume2 className="w-3 h-3" />
                      <span className="text-[10px] lowercase">hear</span>
                    </button>
                  </div>
                  <p className="text-xs font-medium text-stone-800 font-jp leading-relaxed">
                    {vocab.exampleJp}
                  </p>
                  {showRomaji && (
                    <p className="text-[11px] text-stone-400 font-mono mt-0.5">
                      {vocab.exampleRomaji}
                    </p>
                  )}
                  <p className="text-[11px] text-stone-600 mt-0.5 italic">
                    "{vocab.exampleEn}"
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
