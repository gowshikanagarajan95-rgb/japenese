import { BookOpen, Grid, Sparkles, BookMarked, PenTool, HelpCircle } from 'lucide-react';

export type TabId = 'kana' | 'kanji' | 'vocab' | 'grammar' | 'quiz';

interface NavigationProps {
  activeTab: TabId;
  onChangeTab: (tab: TabId) => void;
  masteredKanaCount: number;
  masteredKanjiCount: number;
  masteredVocabCount: number;
  onOpenWelcomeGuide?: () => void;
}

export function Navigation({
  activeTab,
  onChangeTab,
  masteredKanaCount,
  masteredKanjiCount,
  masteredVocabCount,
  onOpenWelcomeGuide,
}: NavigationProps) {
  const tabs = [
    {
      id: 'kana' as TabId,
      label: 'Kana Charts & Writing',
      japanese: 'かな',
      icon: Grid,
      badge: `${masteredKanaCount} / 92`,
    },
    {
      id: 'kanji' as TabId,
      label: '120 Core Kanji',
      japanese: '漢字',
      icon: PenTool,
      badge: `${masteredKanjiCount} / 120`,
    },
    {
      id: 'vocab' as TabId,
      label: 'Essential Vocabulary',
      japanese: '単語',
      icon: BookMarked,
      badge: `${masteredVocabCount} mastered`,
    },
    {
      id: 'grammar' as TabId,
      label: 'Grammar Foundations',
      japanese: '文法',
      icon: BookOpen,
      badge: '8 rules',
    },
    {
      id: 'quiz' as TabId,
      label: 'Practice & Quizzes',
      japanese: '練習',
      icon: Sparkles,
      badge: '4 Modes',
    },
  ];

  return (
    <nav className="flex items-center justify-between flex-wrap gap-2">
      <div className="bg-stone-200/90 p-1.5 rounded-2xl flex items-center gap-1 border border-stone-300/70 shadow-inner overflow-x-auto scrollbar-none w-full sm:w-auto">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onChangeTab(tab.id)}
              id={`nav-tab-${tab.id}`}
              className={`px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer flex items-center gap-2 whitespace-nowrap focus:outline-none focus:ring-2 focus:ring-accent/40 ${
                isActive
                  ? 'bg-white text-stone-900 shadow-sm font-bold scale-[1.01]'
                  : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100/70'
              }`}
            >
              <Icon className={`w-4 h-4 ${isActive ? 'text-accent' : 'text-stone-400'}`} />
              <span>{tab.label}</span>
              <span
                className={`text-[10px] px-1.5 py-0.5 rounded-full font-mono ${
                  isActive
                    ? 'badge-theme font-bold'
                    : 'bg-stone-300/70 text-stone-600'
                }`}
              >
                {tab.badge}
              </span>
            </button>
          );
        })}
      </div>

      {onOpenWelcomeGuide && (
        <button
          onClick={onOpenWelcomeGuide}
          id="nav-quick-welcome-guide-btn"
          className="hidden md:inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white hover:bg-stone-50 border border-stone-200 text-stone-700 hover:text-stone-900 text-xs font-semibold shadow-xs transition-all cursor-pointer hover:border-stone-300"
          title="Open interactive welcome guide & feature tour"
        >
          <Sparkles className="w-3.5 h-3.5 text-amber-500" />
          <span>Interactive Guide</span>
        </button>
      )}
    </nav>
  );
}
