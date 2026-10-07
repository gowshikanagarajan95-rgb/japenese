import { useState, useMemo } from 'react';
import { Volume2, BookOpen, ChevronRight, CheckCircle, Info, Sparkles, Lightbulb, Search, Filter } from 'lucide-react';
import { GrammarLesson } from '../../types';
import { GRAMMAR_LESSONS } from '../../data/grammarData';
import { speakJapanese } from '../../utils/audio';

interface GrammarSectionProps {
  showRomaji: boolean;
  audioRate: number;
}

const STAGE_FILTERS = [
  { id: 'all', label: 'All Units (1–25)', range: [1, 25] },
  { id: 'stage1', label: 'Units 1–5', range: [1, 5], sub: 'Foundations' },
  { id: 'stage2', label: 'Units 6–10', range: [6, 10], sub: 'Actions & Places' },
  { id: 'stage3', label: 'Units 11–15', range: [11, 15], sub: 'Te-Form & Requests' },
  { id: 'stage4', label: 'Units 16–20', range: [16, 20], sub: 'Nai, Plain & Quotes' },
  { id: 'stage5', label: 'Units 21–25', range: [21, 25], sub: 'Modals & Conditionals' },
];

export function GrammarSection({ showRomaji, audioRate }: GrammarSectionProps) {
  const [selectedLesson, setSelectedLesson] = useState<GrammarLesson>(GRAMMAR_LESSONS[0]);
  const [selectedStage, setSelectedStage] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [playingSentence, setPlayingSentence] = useState<string | null>(null);

  const filteredLessons = useMemo(() => {
    return GRAMMAR_LESSONS.filter((lesson) => {
      // Stage range filter
      if (selectedStage !== 'all') {
        const stage = STAGE_FILTERS.find((s) => s.id === selectedStage);
        if (stage && lesson.unit) {
          if (lesson.unit < stage.range[0] || lesson.unit > stage.range[1]) {
            return false;
          }
        }
      }

      // Search query filter
      if (!searchQuery.trim()) return true;
      const q = searchQuery.toLowerCase().trim();
      return (
        lesson.title.toLowerCase().includes(q) ||
        lesson.japaneseTitle.toLowerCase().includes(q) ||
        lesson.summary.toLowerCase().includes(q) ||
        lesson.keyRule.toLowerCase().includes(q)
      );
    });
  }, [selectedStage, searchQuery]);

  const handlePlayAudio = (id: string, text: string) => {
    setPlayingSentence(id);
    speakJapanese(text, audioRate, () => setPlayingSentence(null));
  };

  const getRoleBadgeStyle = (role: string) => {
    switch (role) {
      case 'subject':
      case 'topic':
        return 'bg-sky-100 text-sky-800 border-sky-200';
      case 'particle':
        return 'bg-rose-100 text-rose-800 border-rose-200 font-bold';
      case 'object':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'verb':
        return 'bg-emerald-100 text-emerald-800 border-emerald-200 font-bold';
      default:
        return 'bg-amber-100 text-amber-800 border-amber-200';
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      {/* Lesson Selector Sidebar (Desktop 4 cols, mobile full) */}
      <div className="lg:col-span-4 space-y-3">
        <div className="bg-white rounded-2xl p-4 border border-stone-200/80 shadow-xs space-y-3">
          <div>
            <h2 className="text-sm font-bold text-stone-900 flex items-center gap-2 mb-1">
              <BookOpen className="w-4 h-4 text-accent" />
              <span>Grammar Curriculum (文法)</span>
            </h2>
            <p className="text-xs text-stone-500">
              Complete 25-unit JLPT N5 syllabus with formulas, rules, and audio.
            </p>
          </div>

          {/* Search input */}
          <div className="relative">
            <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-stone-400" />
            <input
              type="text"
              id="grammar-search-input"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search rules (e.g. て form, は, から, ない)..."
              className="w-full pl-8.5 pr-3 py-1.5 rounded-xl bg-stone-50 border border-stone-200 text-xs text-stone-800 placeholder-stone-400 focus:outline-hidden focus:ring-2 focus:ring-rose-500/30 transition-all"
            />
          </div>

          {/* Stage pills */}
          <div className="flex flex-wrap gap-1 pt-1 border-t border-stone-100">
            {STAGE_FILTERS.map((stage) => {
              const isSelected = selectedStage === stage.id;
              return (
                <button
                  key={stage.id}
                  onClick={() => setSelectedStage(stage.id)}
                  className={`px-2 py-1 rounded-lg text-[11px] font-medium transition-colors cursor-pointer ${
                    isSelected
                      ? 'bg-stone-900 text-white font-semibold shadow-2xs'
                      : 'bg-stone-100 text-stone-600 hover:bg-stone-200/80'
                  }`}
                >
                  {stage.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Lessons List */}
        <div className="space-y-2 max-h-[620px] overflow-y-auto pr-1 scrollbar-thin">
          {filteredLessons.length === 0 ? (
            <div className="text-center py-8 text-xs text-stone-400 bg-white rounded-xl border border-dashed border-stone-200 p-4">
              No grammar rules match "{searchQuery}".
            </div>
          ) : (
            filteredLessons.map((lesson) => {
              const isSelected = selectedLesson.id === lesson.id;
              return (
                <button
                  key={lesson.id}
                  onClick={() => setSelectedLesson(lesson)}
                  id={`lesson-tab-${lesson.id}`}
                  className={`w-full text-left p-3 rounded-xl border transition-all cursor-pointer flex items-center justify-between gap-3 ${
                    isSelected
                      ? 'bg-accent-light/40 border-accent text-stone-900 shadow-xs'
                      : 'bg-white border-stone-200/80 hover:border-stone-300 text-stone-700 hover:bg-stone-50/80'
                  }`}
                >
                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5 mb-0.5">
                      <span className="text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.2 rounded bg-stone-200/70 text-stone-700 shrink-0">
                        Unit {lesson.unit || lesson.level}
                      </span>
                      <span className="text-xs font-bold font-jp text-accent truncate">
                        {lesson.japaneseTitle}
                      </span>
                    </div>
                    <div className="text-xs font-semibold text-stone-900 truncate">
                      {lesson.title}
                    </div>
                  </div>

                  <ChevronRight
                    className={`w-4 h-4 transition-transform shrink-0 ${
                      isSelected ? 'text-accent translate-x-0.5' : 'text-stone-300'
                    }`}
                  />
                </button>
              );
            })
          )}
        </div>
      </div>

      {/* Lesson Detailed Content View (Desktop 8 cols) */}
      <div className="lg:col-span-8">
        <div className="bg-white rounded-2xl border border-stone-200/80 shadow-xs p-5 sm:p-7 space-y-6">
          {/* Lesson Header */}
          <div className="border-b border-stone-100 pb-5">
            <div className="flex items-center gap-2 text-xs font-bold text-accent uppercase tracking-wider mb-1">
              <span>{selectedLesson.level}</span>
              <span>•</span>
              <span className="font-jp">{selectedLesson.japaneseTitle}</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-extrabold text-stone-900 tracking-tight">
              {selectedLesson.title}
            </h1>
            <p className="text-sm text-stone-600 mt-2 leading-relaxed">
              {selectedLesson.summary}
            </p>
          </div>

          {/* Formula Rule Visualizer */}
          <div className="bg-stone-50 rounded-xl p-4 sm:p-5 border border-stone-200/70 space-y-3">
            <div className="text-xs font-bold text-stone-500 uppercase tracking-wider">
              Grammar Pattern Formula
            </div>
            <div className="flex flex-wrap items-center gap-2">
              {selectedLesson.formula.map((item, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <div
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold border ${getRoleBadgeStyle(
                      item.role
                    )}`}
                  >
                    {item.label}
                  </div>
                  {idx < selectedLesson.formula.length - 1 && (
                    <span className="text-stone-400 font-bold">+</span>
                  )}
                </div>
              ))}
            </div>
            <div className="text-xs text-stone-600 font-mono bg-white p-2.5 rounded-lg border border-stone-200">
              💡 {selectedLesson.keyRule}
            </div>
          </div>

          {/* Explanation Points */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold text-stone-500 uppercase tracking-wider">
              How It Works
            </h3>
            <ul className="space-y-2 text-sm text-stone-700">
              {selectedLesson.explanation.map((point, idx) => (
                <li key={idx} className="flex items-start gap-2.5 leading-relaxed">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2 shrink-0" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Practical Examples with Word-by-Word Breakdown & Audio */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold text-stone-500 uppercase tracking-wider">
              Real Sentence Examples
            </h3>
            <div className="space-y-3">
              {selectedLesson.examples.map((ex, idx) => {
                const isPlaying = playingSentence === `${selectedLesson.id}_${idx}`;
                return (
                  <div
                    key={idx}
                    className="p-4 rounded-xl border border-stone-200/90 bg-stone-50/50 hover:bg-stone-50 transition-colors space-y-3"
                  >
                    {/* Japanese text & Speaker */}
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="text-lg font-bold text-stone-900 font-jp tracking-tight">
                          {ex.sentenceJp}
                        </p>
                        {showRomaji && (
                          <p className="text-xs font-mono text-stone-500 mt-0.5">
                            {ex.sentenceRomaji}
                          </p>
                        )}
                        <p className="text-xs font-medium text-stone-700 mt-1">
                          "{ex.sentenceEn}"
                        </p>
                      </div>

                      <button
                        onClick={() =>
                          handlePlayAudio(`${selectedLesson.id}_${idx}`, ex.sentenceJp)
                        }
                        id={`play-grammar-audio-${selectedLesson.id}-${idx}`}
                        className={`p-2 rounded-lg transition-all cursor-pointer shrink-0 ${
                          isPlaying
                            ? 'btn-theme-primary scale-105'
                            : 'bg-white border border-stone-200 text-stone-700 hover:text-accent hover:border-accent shadow-2xs'
                        }`}
                        title="Listen to full sentence pronunciation"
                      >
                        <Volume2 className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Word-by-word structural breakdown */}
                    <div className="pt-2 border-t border-stone-200/60 flex flex-wrap gap-1.5 text-xs">
                      {ex.breakdown.map((item, bIdx) => (
                        <div
                          key={bIdx}
                          className={`px-2 py-1 rounded-md border text-[11px] ${
                            item.highlight
                              ? 'badge-theme font-bold'
                              : 'bg-white border-stone-200 text-stone-700'
                          }`}
                        >
                          <span className="font-jp font-bold mr-1">{item.text}</span>
                          <span className="text-stone-500 font-normal">[{item.role}]</span>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Pro-Tip Box */}
          <div className="p-4 rounded-xl bg-amber-50 border border-amber-200/80 flex items-start gap-3 text-xs text-amber-900">
            <Lightbulb className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold block text-amber-950 mb-0.5">Pro-Tip for Beginners:</span>
              <span>{selectedLesson.tip}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
