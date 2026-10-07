import { useState, useEffect, useMemo } from 'react';
import { Header } from './components/Header';
import { Navigation, TabId } from './components/Navigation';
import { DailyCard } from './components/DailyCard';
import { WelcomeScreen } from './components/welcome/WelcomeScreen';
import { KanaSection } from './components/kana/KanaSection';
import { KanaDetailModal } from './components/kana/KanaDetailModal';
import { KanjiSection } from './components/kanji/KanjiSection';
import { VocabularySection } from './components/vocabulary/VocabularySection';
import { GrammarSection } from './components/grammar/GrammarSection';
import { QuizSection } from './components/quiz/QuizSection';
import { LoginPage } from './components/auth/LoginPage';
import { HIRAGANA_DATA } from './data/hiraganaData';
import { KATAKANA_DATA } from './data/katakanaData';
import { VOCABULARY_DATA } from './data/vocabularyData';
import { KanaCharacter, UserStats, UserProfile } from './types';
import {
  loadUserStats,
  saveUserStats,
  loadUserPrefs,
  saveUserPrefs,
  loadCurrentUser,
  saveCurrentUser,
  loadWelcomeDismissed,
  saveWelcomeDismissed,
  UserPrefs,
} from './utils/storage';

export default function App() {
  const [stats, setStats] = useState<UserStats>(loadUserStats);
  const [prefs, setPrefs] = useState<UserPrefs>(loadUserPrefs);
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(() => {
    const loaded = loadCurrentUser();
    if (loaded) return loaded;
    // Default friendly guest profile so learner isn't blocked by auth
    const defaultGuest: UserProfile = {
      id: 'guest-learner',
      name: 'Guest Learner',
      email: 'learner@japan.study',
      avatar: '🌸',
      level: 'beginner',
      joinedDate: new Date().toISOString().slice(0, 10),
      isGuest: true,
    };
    saveCurrentUser(defaultGuest);
    return defaultGuest;
  });
  const [isAuthView, setIsAuthView] = useState<boolean>(false);
  const [showWelcomeGuide, setShowWelcomeGuide] = useState<boolean>(() => !loadWelcomeDismissed());
  const [activeKanaModal, setActiveKanaModal] = useState<KanaCharacter | null>(null);
  const [quizInitialMode, setQuizInitialMode] = useState<'kana_drill' | 'kanji_quiz' | 'flashcards' | 'sentence_builder'>('flashcards');
  const [quizInitialUnit, setQuizInitialUnit] = useState<number | 'all'>(1);

  // Sync stats and prefs to localStorage
  useEffect(() => {
    saveUserStats(stats);
  }, [stats]);

  useEffect(() => {
    saveUserPrefs(prefs);
  }, [prefs]);

  const handleUpdatePrefs = (newPrefs: Partial<UserPrefs>) => {
    setPrefs((prev) => ({ ...prev, ...newPrefs }));
  };

  const handleLoginSuccess = (user: UserProfile) => {
    setCurrentUser(user);
    saveCurrentUser(user);
    setIsAuthView(false);
  };

  const handleGuestEntry = () => {
    const guestUser: UserProfile = {
      id: `guest-${Date.now()}`,
      name: 'Guest Learner',
      email: 'guest@japan.study',
      avatar: '⛩️',
      level: 'beginner',
      joinedDate: new Date().toISOString().slice(0, 10),
      isGuest: true,
    };
    setCurrentUser(guestUser);
    saveCurrentUser(guestUser);
    setIsAuthView(false);
  };

  const handleLogout = () => {
    setCurrentUser(null);
    saveCurrentUser(null);
    setIsAuthView(true);
  };

  const handleToggleMasterKana = (id: string) => {
    setStats((prev) => {
      const exists = prev.masteredKana.includes(id);
      const updated = exists
        ? prev.masteredKana.filter((kId) => kId !== id)
        : [...prev.masteredKana, id];
      return { ...prev, masteredKana: updated };
    });
  };

  const handleToggleMasterVocab = (id: string) => {
    setStats((prev) => {
      const exists = prev.masteredVocab.includes(id);
      const updated = exists
        ? prev.masteredVocab.filter((vId) => vId !== id)
        : [...prev.masteredVocab, id];
      return { ...prev, masteredVocab: updated };
    });
  };

  const handleToggleMasterKanji = (id: string) => {
    setStats((prev) => {
      const mastered = prev.masteredKanji || [];
      const exists = mastered.includes(id);
      const updated = exists
        ? mastered.filter((kId) => kId !== id)
        : [...mastered, id];
      return { ...prev, masteredKanji: updated };
    });
  };

  const handleQuizScore = (score: number) => {
    setStats((prev) => ({
      ...prev,
      totalQuizzesTaken: prev.totalQuizzesTaken + 1,
      quizHighScore: Math.max(prev.quizHighScore, score),
    }));
  };

  // Deterministic daily featured items based on date
  const { dailyKana, dailyVocab } = useMemo(() => {
    const today = new Date();
    const dayOfYear = Math.floor(
      (today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) / 1000 / 60 / 60 / 24
    );
    const kanaIndex = dayOfYear % HIRAGANA_DATA.length;
    const vocabIndex = dayOfYear % VOCABULARY_DATA.length;
    return {
      dailyKana: HIRAGANA_DATA[kanaIndex],
      dailyVocab: VOCABULARY_DATA[vocabIndex],
    };
  }, []);

  const totalKanaCount = HIRAGANA_DATA.length + KATAKANA_DATA.length;

  return (
    <div
      data-theme={prefs.themeColor || 'indigo'}
      className="min-h-screen bg-stone-100/70 text-stone-800 flex flex-col font-sans selection:bg-stone-300"
    >
      {/* Sticky Header with Stats & Global Toggles & Auth Profile */}
      <Header
        stats={stats}
        prefs={prefs}
        onUpdatePrefs={handleUpdatePrefs}
        totalKanaCount={totalKanaCount}
        currentUser={currentUser}
        onOpenLoginPage={() => setIsAuthView(true)}
        onLogout={handleLogout}
        onOpenWelcomeGuide={() => setShowWelcomeGuide(true)}
      />

      {/* Main Content Area */}
      <main className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 flex-1 space-y-6">
        {isAuthView ? (
          /* Dedicated Login / Sign Up Screen */
          <div className="animate-in fade-in duration-200">
            <LoginPage
              onLoginSuccess={handleLoginSuccess}
              onContinueAsGuest={handleGuestEntry}
              onBackToApp={currentUser ? () => setIsAuthView(false) : undefined}
            />
          </div>
        ) : (
          /* Core Japanese Learning Application Views */
          <div className="space-y-6 animate-in fade-in duration-200">
            {/* Interactive Welcome & Quick Feature Tour */}
            {showWelcomeGuide && (
              <div className="animate-in fade-in slide-in-from-top-4 duration-300">
                <WelcomeScreen
                  prefs={prefs}
                  onUpdatePrefs={handleUpdatePrefs}
                  onNavigateToTab={(tab: TabId) => handleUpdatePrefs({ activeSection: tab })}
                  onClose={() => {
                    setShowWelcomeGuide(false);
                    saveWelcomeDismissed(true);
                  }}
                  isModal={false}
                />
              </div>
            )}

            {/* Character & Phrase of the Day Widget */}
            <DailyCard
              kana={dailyKana}
              vocab={dailyVocab}
              audioRate={prefs.audioRate}
              showRomaji={prefs.showRomaji}
              onOpenKanaDetail={(k) => setActiveKanaModal(k)}
              onQuickQuiz={() => handleUpdatePrefs({ activeSection: 'quiz' })}
            />

            {/* Section Navigation Tabs */}
            <Navigation
              activeTab={prefs.activeSection}
              onChangeTab={(tab) => handleUpdatePrefs({ activeSection: tab })}
              masteredKanaCount={stats.masteredKana.length}
              masteredKanjiCount={(stats.masteredKanji || []).length}
              masteredVocabCount={stats.masteredVocab.length}
              onOpenWelcomeGuide={() => setShowWelcomeGuide(true)}
            />

            {/* Tab Views */}
            <div className="animate-in fade-in duration-150">
              {prefs.activeSection === 'kana' && (
                <KanaSection
                  showRomaji={prefs.showRomaji}
                  audioRate={prefs.audioRate}
                  masteredKana={stats.masteredKana}
                  onToggleMasterKana={handleToggleMasterKana}
                  onOpenQuickDrill={() => handleUpdatePrefs({ activeSection: 'quiz' })}
                />
              )}

              {prefs.activeSection === 'kanji' && (
                <KanjiSection
                  showRomaji={prefs.showRomaji}
                  audioRate={prefs.audioRate}
                  masteredKanji={stats.masteredKanji || []}
                  onToggleMasterKanji={handleToggleMasterKanji}
                  onOpenQuickQuiz={() => handleUpdatePrefs({ activeSection: 'quiz' })}
                />
              )}

              {prefs.activeSection === 'vocab' && (
                <VocabularySection
                  showRomaji={prefs.showRomaji}
                  audioRate={prefs.audioRate}
                  masteredVocab={stats.masteredVocab}
                  onToggleMasterVocab={handleToggleMasterVocab}
                  onOpenFlashcards={(unit) => {
                    setQuizInitialMode('flashcards');
                    setQuizInitialUnit(unit || 1);
                    handleUpdatePrefs({ activeSection: 'quiz' });
                  }}
                />
              )}

              {prefs.activeSection === 'grammar' && (
                <GrammarSection
                  showRomaji={prefs.showRomaji}
                  audioRate={prefs.audioRate}
                />
              )}

              {prefs.activeSection === 'quiz' && (
                <QuizSection
                  key={`${quizInitialMode}_${quizInitialUnit}`}
                  initialMode={quizInitialMode}
                  initialUnit={quizInitialUnit}
                  showRomaji={prefs.showRomaji}
                  audioRate={prefs.audioRate}
                  onUpdateStats={handleQuizScore}
                />
              )}
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-stone-200 mt-12 py-6 text-stone-500 text-xs text-center space-y-1">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="flex items-center gap-1.5 font-medium">
            <span className="font-jp text-rose-600 font-bold">日本語を楽しく学ぼう</span>
            <span>— Master the fundamentals of the Japanese language.</span>
          </p>
          <p className="text-stone-400">
            Native audio via Web Speech synthesis • Progress stored locally in browser
          </p>
        </div>
      </footer>

      {/* Global Kana Detail Modal if triggered from DailyCard */}
      {activeKanaModal && (
        <KanaDetailModal
          kana={activeKanaModal}
          onClose={() => setActiveKanaModal(null)}
          onMasterToggle={handleToggleMasterKana}
          isMastered={stats.masteredKana.includes(activeKanaModal.id)}
          audioRate={prefs.audioRate}
        />
      )}
    </div>
  );
}
