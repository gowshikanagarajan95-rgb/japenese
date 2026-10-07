import { useState, useEffect, useMemo } from 'react';
import confetti from 'canvas-confetti';
import {
  Sparkles,
  RotateCcw,
  Volume2,
  CheckCircle,
  XCircle,
  Trophy,
  ArrowRight,
  Layers,
  Zap,
  PenTool,
} from 'lucide-react';
import type { KanaCharacter } from '../../types';
import { HIRAGANA_DATA } from '../../data/hiraganaData';
import { KATAKANA_DATA } from '../../data/katakanaData';
import { KANJI_DATA } from '../../data/kanjiData';
import { VOCABULARY_DATA } from '../../data/vocabularyData';
import { STUDY_UNITS } from '../../data/unitsData';
import { SENTENCE_PUZZLES } from '../../data/grammarData';
import { speakJapanese } from '../../utils/audio';

type QuizMode = 'kana_drill' | 'kanji_quiz' | 'flashcards' | 'sentence_builder';
type KanaType = 'hiragana' | 'katakana' | 'mixed';

interface QuizSectionProps {
  showRomaji: boolean;
  audioRate: number;
  onUpdateStats: (score: number) => void;
  initialMode?: QuizMode;
  initialKanaType?: 'hiragana' | 'katakana';
  initialUnit?: number | 'all';
}

interface Question {
  prompt: string;
  subPrompt?: string;
  correctAnswer: string;
  options: string[];
  audioText?: string;
  charRef?: string;
}

// ---------- helpers ----------

// Proper shuffle (Array.sort(() => Math.random() - 0.5) is biased)
function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// Builds 4 options with NO duplicates (duplicate text made two "correct" buttons)
function buildOptions(correct: string, candidates: string[]): string[] {
  const unique = Array.from(new Set(candidates.filter((c) => c && c !== correct)));
  return shuffle([...shuffle(unique).slice(0, 3), correct]);
}

const cleanReading = (s?: string) => (s ? s.replace(/[()]/g, '') : '');

const MODE_TABS: { id: QuizMode; label: string; domId: string; Icon: typeof Zap }[] = [
  { id: 'kana_drill', label: 'Kana Speed Quiz', domId: 'quiz-tab-kana', Icon: Zap },
  { id: 'kanji_quiz', label: 'Kanji Mastery Quiz', domId: 'quiz-tab-kanji', Icon: PenTool },
  { id: 'flashcards', label: 'Vocab Flashcards', domId: 'quiz-tab-flashcards', Icon: Layers },
  { id: 'sentence_builder', label: 'Sentence Builder (SOV)', domId: 'quiz-tab-sentence', Icon: Sparkles },
];

const KANA_TYPES: { id: KanaType; label: string }[] = [
  { id: 'hiragana', label: 'Hiragana' },
  { id: 'katakana', label: 'Katakana' },
  { id: 'mixed', label: 'Mixed' },
];

export function QuizSection({
  showRomaji,
  audioRate,
  onUpdateStats,
  initialMode = 'kana_drill',
  initialKanaType = 'hiragana',
  initialUnit = 1,
}: QuizSectionProps) {
  const [activeMode, setActiveMode] = useState<QuizMode>(initialMode);

  useEffect(() => {
    setActiveMode(initialMode);
  }, [initialMode]);

  // --- KANA / KANJI QUIZ STATE ---
  const [kanaDrillType, setKanaDrillType] = useState<KanaType>(initialKanaType);

  useEffect(() => {
    setKanaDrillType(initialKanaType);
  }, [initialKanaType]);

  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);

  // --- FLASHCARD STATE ---
  const [selectedDeckId, setSelectedDeckId] = useState<number | 'all'>(
    initialUnit === 'all' ? 'all' : initialUnit || 1
  );
  const [flashcardIndex, setFlashcardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  const flashcardDeck = useMemo(() => {
    if (selectedDeckId === 'all') return VOCABULARY_DATA;
    const filtered = VOCABULARY_DATA.filter((item) =>
      selectedDeckId === 1
        ? item.unit === 1 || item.id.startsWith('u1_')
        : item.unit === selectedDeckId
    );
    return filtered.length > 0 ? filtered : VOCABULARY_DATA;
  }, [selectedDeckId]);

  const handleChangeDeck = (deckId: number | 'all') => {
    setSelectedDeckId(deckId);
    setFlashcardIndex(0);
    setIsFlipped(false);
  };

  // --- SENTENCE BUILDER STATE ---
  const [puzzleIndex, setPuzzleIndex] = useState(0);
  const [selectedTokens, setSelectedTokens] = useState<string[]>([]);
  const [puzzleResult, setPuzzleResult] = useState<'idle' | 'correct' | 'incorrect'>('idle');

  const resetQuizState = (qs: Question[]) => {
    setQuestions(qs);
    setCurrentQIndex(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setScore(0);
    setQuizFinished(false);
  };

  // 10 random questions for Kana drill
  const generateKanaQuestions = () => {
    let pool: KanaCharacter[] = [];
    if (kanaDrillType === 'hiragana') {
      pool = HIRAGANA_DATA.filter((k) => k.category === 'gojuon');
    } else if (kanaDrillType === 'katakana') {
      pool = KATAKANA_DATA.filter((k) => k.category === 'gojuon');
    } else {
      pool = [...HIRAGANA_DATA.slice(0, 30), ...KATAKANA_DATA.slice(0, 30)];
    }

    const selected = shuffle(pool).slice(0, 10);

    const qs: Question[] = selected.map((item) => {
      const isCharToRomaji = Math.random() > 0.4;
      const correctAnswer = isCharToRomaji ? item.romaji : item.char;
      const prompt = isCharToRomaji ? item.char : `What kana represents "${item.romaji}"?`;

      // Compare by reference: hiragana & katakana can share the same id
      const others = pool.filter((p) => p !== item);
      const candidates = others.map((w) => (isCharToRomaji ? w.romaji : w.char));

      return {
        prompt,
        subPrompt: isCharToRomaji ? 'Select the correct Romaji sound' : 'Select the matching character',
        correctAnswer,
        options: buildOptions(correctAnswer, candidates),
        audioText: item.char,
        charRef: item.char,
      };
    });

    resetQuizState(qs);
  };

  // 10 random questions for Kanji quiz
  const generateKanjiQuestions = () => {
    const selected = shuffle(KANJI_DATA).slice(0, 10);

    const readingOf = (k: (typeof KANJI_DATA)[number]) => {
      const reading = cleanReading(k.kunyomi?.[0]) || k.onyomi?.[0] || '';
      const romaji = k.romajiKunyomi?.[0] || k.romajiOnyomi?.[0] || '';
      return `${reading} [${romaji}]`;
    };

    const qs: Question[] = selected.map((item) => {
      const rand = Math.random();
      const others = KANJI_DATA.filter((k) => k.id !== item.id);

      let prompt = '';
      let subPrompt = '';
      let correctAnswer = '';
      let candidates: string[] = [];

      if (rand < 0.45) {
        // Kanji -> English meaning
        prompt = item.kanji;
        subPrompt = 'What is the English meaning of this Kanji?';
        correctAnswer = item.meanings[0];
        candidates = others.map((w) => w.meanings[0]);
      } else if (rand < 0.75) {
        // English meaning -> Kanji
        prompt = item.meanings[0];
        subPrompt = 'Which Kanji represents this meaning?';
        correctAnswer = item.kanji;
        candidates = others.map((w) => w.kanji);
      } else {
        // Kanji -> reading
        prompt = item.kanji;
        subPrompt = `What is a primary reading for this Kanji? (${item.meanings[0]})`;
        correctAnswer = readingOf(item);
        candidates = others.map(readingOf);
      }

      return {
        prompt,
        subPrompt,
        correctAnswer,
        options: buildOptions(correctAnswer, candidates),
        audioText: cleanReading(item.kunyomi?.[0]) || item.onyomi?.[0] || item.kanji,
        charRef: item.kanji,
      };
    });

    resetQuizState(qs);
  };

  useEffect(() => {
    if (activeMode === 'kana_drill') generateKanaQuestions();
    else if (activeMode === 'kanji_quiz') generateKanjiQuestions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeMode, kanaDrillType]);

  const handleSelectOption = (opt: string) => {
    if (isAnswered) return;
    const currentQ = questions[currentQIndex];
    if (!currentQ) return;

    setSelectedOption(opt);
    setIsAnswered(true);

    if (opt === currentQ.correctAnswer) {
      setScore((prev) => prev + 1);
      if (currentQ.audioText) speakJapanese(currentQ.audioText, audioRate);
    }
  };

  const handleNextQuestion = () => {
    if (currentQIndex < questions.length - 1) {
      setCurrentQIndex((prev) => prev + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      setQuizFinished(true);
      onUpdateStats(score);
      if (score >= 7) {
        try {
          confetti({ particleCount: 80, spread: 60, origin: { y: 0.6 } });
        } catch {
          /* ignore */
        }
      }
    }
  };

  // --- FLASHCARDS LOGIC ---
  const currentCard = flashcardDeck[flashcardIndex] ?? flashcardDeck[0];

  const handleNextCard = () => {
    setIsFlipped(false);
    setFlashcardIndex((prev) => (prev + 1) % flashcardDeck.length);
  };

  const handlePrevCard = () => {
    setIsFlipped(false);
    setFlashcardIndex((prev) => (prev - 1 + flashcardDeck.length) % flashcardDeck.length);
  };

  // --- SENTENCE PUZZLE LOGIC ---
  const currentPuzzle = SENTENCE_PUZZLES[puzzleIndex];

  const handleToggleToken = (tokenId: string) => {
    if (puzzleResult !== 'idle') return;
    setSelectedTokens((prev) =>
      prev.includes(tokenId) ? prev.filter((id) => id !== tokenId) : [...prev, tokenId]
    );
  };

  const handleCheckSentence = () => {
    if (!currentPuzzle) return;
    const isCorrect =
      selectedTokens.length === currentPuzzle.correctOrder.length &&
      selectedTokens.every((id, idx) => id === currentPuzzle.correctOrder[idx]);

    if (isCorrect) {
      setPuzzleResult('correct');
      speakJapanese(currentPuzzle.japaneseFull, audioRate);
      try {
        confetti({ particleCount: 50, spread: 50 });
      } catch {
        /* ignore */
      }
    } else {
      setPuzzleResult('incorrect');
    }
  };

  const handleNextPuzzle = () => {
    setSelectedTokens([]);
    setPuzzleResult('idle');
    setPuzzleIndex((prev) => (prev + 1) % SENTENCE_PUZZLES.length);
  };

  const handleResetPuzzle = () => {
    setSelectedTokens([]);
    setPuzzleResult('idle');
  };

  const currentQ = questions[currentQIndex];

  return (
    <div className="space-y-6">
      {/* Quiz Mode Switcher */}
      <div className="bg-white rounded-2xl p-4 border border-stone-200/80 shadow-xs flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2">
          {MODE_TABS.map(({ id, label, domId, Icon }) => (
            <button
              key={id}
              type="button"
              onClick={() => setActiveMode(id)}
              id={domId}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer flex items-center gap-2 ${
                activeMode === id
                  ? 'btn-theme-primary shadow-xs'
                  : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{label}</span>
            </button>
          ))}
        </div>

        {activeMode === 'kana_drill' && !quizFinished && (
          <div className="flex items-center gap-1.5 text-xs">
            {KANA_TYPES.map(({ id, label }) => (
              <button
                key={id}
                type="button"
                onClick={() => setKanaDrillType(id)}
                className={`px-2.5 py-1 rounded-lg font-medium transition-colors cursor-pointer ${
                  kanaDrillType === id
                    ? 'bg-stone-900 text-white'
                    : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* --- KANA DRILL & KANJI QUIZ --- */}
      {(activeMode === 'kana_drill' || activeMode === 'kanji_quiz') && (
        <div className="bg-white rounded-2xl border border-stone-200/80 shadow-xs p-6 sm:p-8 max-w-xl mx-auto">
          {!quizFinished ? (
            currentQ && (
              <div className="space-y-6">
                <div className="flex items-center justify-between text-xs font-semibold text-stone-400">
                  <span>
                    Question {currentQIndex + 1} of {questions.length}
                  </span>
                  <span>Score: {score}</span>
                </div>
                <div className="w-full bg-stone-100 h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-accent h-full transition-all duration-300 rounded-full"
                    style={{ width: `${((currentQIndex + 1) / questions.length) * 100}%` }}
                  />
                </div>

                <div className="bg-stone-50 rounded-2xl p-6 text-center border border-stone-200/70 space-y-2">
                  <span className="text-xs font-medium text-stone-500">{currentQ.subPrompt}</span>
                  <div className="text-5xl sm:text-6xl font-extrabold text-stone-900 font-jp tracking-tight py-2">
                    {currentQ.prompt}
                  </div>
                  {currentQ.audioText && (
                    <button
                      type="button"
                      onClick={() => speakJapanese(currentQ.audioText!, audioRate)}
                      id="listen-question-audio-btn"
                      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-stone-200 text-xs font-medium text-stone-600 hover:text-accent hover:border-accent transition-colors cursor-pointer shadow-2xs"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                      <span>Hear Sound</span>
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-3">
                  {currentQ.options.map((opt, idx) => {
                    const isCorrect = opt === currentQ.correctAnswer;
                    const isSelected = selectedOption === opt;

                    let btnStyle =
                      'bg-white border-stone-200 text-stone-800 hover:border-stone-300 hover:bg-stone-50';

                    if (isAnswered) {
                      if (isCorrect) {
                        btnStyle = 'bg-emerald-50 border-emerald-500 text-emerald-900 font-bold';
                      } else if (isSelected) {
                        btnStyle = 'bg-rose-50 border-rose-500 text-rose-900 font-bold';
                      } else {
                        btnStyle = 'bg-stone-50 border-stone-200 text-stone-400 opacity-60';
                      }
                    }

                    return (
                      <button
                        key={`${currentQIndex}-${idx}`}
                        type="button"
                        onClick={() => handleSelectOption(opt)}
                        disabled={isAnswered}
                        id={`drill-opt-${idx}`}
                        className={`p-4 rounded-xl border text-xl font-bold font-jp transition-all cursor-pointer flex items-center justify-center gap-2 shadow-2xs ${btnStyle}`}
                      >
                        <span>{opt}</span>
                        {isAnswered && isCorrect && (
                          <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0" />
                        )}
                        {isAnswered && isSelected && !isCorrect && (
                          <XCircle className="w-5 h-5 text-rose-600 shrink-0" />
                        )}
                      </button>
                    );
                  })}
                </div>

                {isAnswered && (
                  <button
                    type="button"
                    onClick={handleNextQuestion}
                    id="drill-next-btn"
                    className="w-full py-3 px-4 rounded-xl bg-stone-900 hover:bg-stone-800 text-white font-semibold text-sm transition-colors shadow-xs cursor-pointer flex items-center justify-center gap-2 animate-in fade-in"
                  >
                    <span>{currentQIndex < questions.length - 1 ? 'Next Question' : 'View Results'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                )}
              </div>
            )
          ) : (
            <div className="text-center space-y-5 py-4">
              <div className="w-16 h-16 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center mx-auto shadow-inner">
                <Trophy className="w-8 h-8" />
              </div>
              <div>
                <h3 className="text-2xl font-extrabold text-stone-900">Quiz Completed!</h3>
                <p className="text-stone-500 text-sm mt-1">
                  You scored <span className="font-bold text-accent">{score}</span> out of{' '}
                  {questions.length} ({Math.round((score / Math.max(questions.length, 1)) * 100)}%)
                </p>
              </div>

              <div className="p-4 bg-stone-50 rounded-xl border border-stone-200 text-xs text-stone-600 text-left">
                {score === questions.length ? (
                  <span className="font-semibold text-emerald-700">
                    🎉 Outstanding! Perfect score! Your recognition is solid.
                  </span>
                ) : score >= 7 ? (
                  <span className="font-semibold text-amber-800">
                    👏 Great job! Keep practicing to reach 100%!
                  </span>
                ) : (
                  <span className="font-semibold text-stone-700">
                    🌱 Good practice effort. Review the chart and stroke canvas, then try again!
                  </span>
                )}
              </div>

              <button
                type="button"
                onClick={activeMode === 'kanji_quiz' ? generateKanjiQuestions : generateKanaQuestions}
                id="drill-retry-btn"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl btn-theme-primary font-semibold text-sm transition-colors shadow-xs cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Take Another Quiz</span>
              </button>
            </div>
          )}
        </div>
      )}

      {/* --- VOCABULARY FLASHCARDS --- */}
      {activeMode === 'flashcards' && currentCard && (
        <div className="max-w-lg mx-auto space-y-4">
          <div className="bg-stone-50 rounded-2xl p-3 border border-stone-200/80 space-y-2">
            <div className="flex items-center justify-between text-xs font-semibold text-stone-600 px-1">
              <span>Choose Vocabulary Deck:</span>
              <span className="text-stone-400 font-normal">{flashcardDeck.length} cards in deck</span>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
              <select
                id="flashcard-deck-select"
                value={selectedDeckId}
                onChange={(e) => {
                  const val = e.target.value;
                  handleChangeDeck(val === 'all' ? 'all' : Number(val));
                }}
                className="w-full bg-white border border-stone-200 rounded-xl px-3 py-2 text-xs font-medium text-stone-800 focus:outline-hidden focus:ring-2 focus:ring-rose-500/30 cursor-pointer shadow-2xs"
              >
                <option value="all">🌟 All Units ({VOCABULARY_DATA.length} words)</option>
                {STUDY_UNITS.map((unit) => {
                  const count = VOCABULARY_DATA.filter((v) =>
                    unit.id === 1 ? v.unit === 1 || v.id.startsWith('u1_') : v.unit === unit.id
                  ).length;
                  return (
                    <option key={unit.id} value={unit.id}>
                      Unit {unit.id}: {unit.title} ({count} words)
                    </option>
                  );
                })}
              </select>

              <div className="flex items-center gap-1.5 shrink-0">
                {([1, 'all'] as const).map((deck) => (
                  <button
                    key={deck}
                    type="button"
                    onClick={() => handleChangeDeck(deck)}
                    className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                      selectedDeckId === deck
                        ? 'bg-stone-900 text-white shadow-2xs'
                        : 'bg-white text-stone-600 border border-stone-200 hover:bg-stone-100'
                    }`}
                  >
                    {deck === 'all' ? 'All' : 'Unit 1'}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="text-center text-xs text-stone-400 font-medium">
            Card {flashcardIndex + 1} of {flashcardDeck.length} • Click card to flip
          </div>

          <div
            onClick={() => setIsFlipped((f) => !f)}
            id="flashcard-card"
            className="cursor-pointer select-none min-h-[300px] flex items-center justify-center"
          >
            <div
              className={`w-full h-full min-h-[300px] bg-white rounded-3xl p-8 border-2 border-stone-200/90 shadow-md flex flex-col items-center justify-between text-center transition-all duration-300 hover:border-accent ${
                isFlipped ? 'bg-amber-50/20' : ''
              }`}
            >
              <div className="w-full flex items-center justify-between text-xs text-stone-400">
                <span className="font-medium uppercase tracking-wider">{currentCard.categoryLabel}</span>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    speakJapanese(currentCard.kanji, audioRate);
                  }}
                  id="flashcard-audio-btn"
                  className="p-1.5 rounded-lg text-stone-400 hover:text-accent hover:bg-accent-light transition-colors"
                  title="Pronounce word"
                >
                  <Volume2 className="w-4 h-4" />
                </button>
              </div>

              {!isFlipped ? (
                <div className="space-y-3 py-6">
                  <div className="text-xs font-mono text-stone-400">{currentCard.furigana}</div>
                  <div className="text-4xl sm:text-5xl font-extrabold text-stone-900 font-jp tracking-tight">
                    {currentCard.kanji}
                  </div>
                  {showRomaji && (
                    <div className="text-sm font-mono text-stone-500 font-semibold">
                      [{currentCard.romaji}]
                    </div>
                  )}
                  <div className="text-xs text-stone-400 pt-3">(Tap to reveal English meaning)</div>
                </div>
              ) : (
                <div className="space-y-4 py-4 animate-in fade-in">
                  <div className="text-2xl font-bold text-stone-900">{currentCard.english}</div>
                  <div className="text-xs font-mono text-accent font-semibold">{currentCard.romaji}</div>
                  <div className="p-3 bg-stone-50 rounded-xl border border-stone-200 text-left text-xs space-y-1">
                    <span className="font-semibold text-stone-500 block text-[10px] uppercase">
                      Example:
                    </span>
                    <p className="font-jp font-medium text-stone-800">{currentCard.exampleJp}</p>
                    <p className="text-stone-500 italic">"{currentCard.exampleEn}"</p>
                  </div>
                </div>
              )}

              <div className="text-[11px] text-stone-400">
                {isFlipped ? 'Click to flip back' : 'Click to flip'}
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between gap-3 pt-2">
            <button
              type="button"
              onClick={handlePrevCard}
              id="flashcard-prev-btn"
              className="flex-1 py-2.5 px-4 rounded-xl border border-stone-200 bg-white hover:bg-stone-50 text-stone-700 font-medium text-xs shadow-2xs transition-colors cursor-pointer"
            >
              Previous Card
            </button>
            <button
              type="button"
              onClick={() => speakJapanese(currentCard.kanji, audioRate)}
              id="flashcard-speak-btn"
              className="p-2.5 rounded-xl border border-stone-200 bg-white hover:bg-accent-light hover:text-accent text-stone-700 shadow-2xs transition-colors cursor-pointer"
              title="Pronounce word"
            >
              <Volume2 className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={handleNextCard}
              id="flashcard-next-btn"
              className="flex-1 py-2.5 px-4 rounded-xl bg-stone-900 hover:bg-stone-800 text-white font-medium text-xs shadow-2xs transition-colors cursor-pointer"
            >
              Next Card
            </button>
          </div>
        </div>
      )}

      {/* --- SENTENCE BUILDER (SOV) --- */}
      {activeMode === 'sentence_builder' && !currentPuzzle && (
        <p className="text-center text-sm text-stone-500">No sentence puzzles available yet.</p>
      )}

      {activeMode === 'sentence_builder' && currentPuzzle && (
        <div className="bg-white rounded-2xl border border-stone-200/80 shadow-xs p-6 sm:p-8 max-w-xl mx-auto space-y-6">
          <div className="flex items-center justify-between text-xs font-semibold text-stone-400">
            <span>
              Sentence Puzzle {puzzleIndex + 1} of {SENTENCE_PUZZLES.length}
            </span>
            <span className="text-accent font-bold">SOV Word Order Practice</span>
          </div>

          <div className="bg-stone-50 rounded-2xl p-5 border border-stone-200 text-center space-y-1">
            <span className="text-xs font-medium text-stone-400 uppercase tracking-wider">
              Translate into Japanese:
            </span>
            <h3 className="text-xl font-extrabold text-stone-900">"{currentPuzzle.englishPrompt}"</h3>
          </div>

          <div className="min-h-[70px] p-3 rounded-xl border-2 border-dashed border-stone-300 bg-stone-50/50 flex flex-wrap items-center gap-2">
            {selectedTokens.length === 0 ? (
              <span className="text-xs text-stone-400 italic mx-auto">
                Click the word blocks below in order to assemble the sentence.
              </span>
            ) : (
              selectedTokens.map((tokenId) => {
                const token = currentPuzzle.tokens.find((t) => t.id === tokenId);
                if (!token) return null;
                return (
                  <button
                    key={tokenId}
                    type="button"
                    onClick={() => handleToggleToken(tokenId)}
                    className="px-3 py-1.5 rounded-lg btn-theme-primary font-jp font-bold text-sm shadow-xs transition-colors cursor-pointer flex items-center gap-1"
                  >
                    <span>{token.text}</span>
                    <span className="text-[10px] opacity-75">✕</span>
                  </button>
                );
              })
            )}
          </div>

          <div className="space-y-2">
            <span className="text-xs font-semibold text-stone-500 uppercase tracking-wider block">
              Word Bank:
            </span>
            <div className="flex flex-wrap gap-2">
              {currentPuzzle.tokens.map((token) => {
                const isUsed = selectedTokens.includes(token.id);
                return (
                  <button
                    key={token.id}
                    type="button"
                    onClick={() => handleToggleToken(token.id)}
                    disabled={isUsed || puzzleResult !== 'idle'}
                    className={`px-3.5 py-2 rounded-xl border text-sm font-jp font-bold transition-all cursor-pointer shadow-2xs ${
                      isUsed
                        ? 'bg-stone-100 border-stone-200 text-stone-300 opacity-40 cursor-default'
                        : 'bg-white border-stone-200 text-stone-800 hover:border-accent hover:bg-accent-light/40'
                    }`}
                  >
                    {token.text}
                  </button>
                );
              })}
            </div>
          </div>

          {puzzleResult === 'correct' && (
            <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs space-y-1 animate-in fade-in">
              <div className="font-bold flex items-center gap-1.5 text-sm">
                <CheckCircle className="w-4 h-4 text-emerald-600" />
                <span>正解！ (Correct!)</span>
              </div>
              <p className="font-jp font-semibold text-stone-800">{currentPuzzle.japaneseFull}</p>
              <p className="font-mono text-stone-600">{currentPuzzle.romajiFull}</p>
            </div>
          )}

          {puzzleResult === 'incorrect' && (
            <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-900 text-xs space-y-2 animate-in fade-in">
              <div className="font-bold flex items-center gap-1.5 text-sm">
                <XCircle className="w-4 h-4 text-rose-600" />
                <span>Not quite!</span>
              </div>
              <p className="text-stone-700">{currentPuzzle.hint}</p>
              {/* Previously the word bank stayed locked after a wrong answer — now you can retry */}
              <button
                type="button"
                onClick={handleResetPuzzle}
                className="px-3 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-700 text-white font-semibold cursor-pointer"
              >
                Try again
              </button>
            </div>
          )}

          <div className="flex items-center justify-between gap-3 pt-2">
            <button
              type="button"
              onClick={handleResetPuzzle}
              id="puzzle-reset-btn"
              disabled={selectedTokens.length === 0}
              className="p-2.5 rounded-xl border border-stone-200 bg-white hover:bg-stone-50 text-stone-600 disabled:opacity-40 transition-colors shadow-2xs cursor-pointer"
              title="Clear tokens"
            >
              <RotateCcw className="w-4 h-4" />
            </button>

            {puzzleResult === 'correct' ? (
              <button
                type="button"
                onClick={handleNextPuzzle}
                id="puzzle-next-btn"
                className="flex-1 py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs shadow-xs transition-colors cursor-pointer flex items-center justify-center gap-1.5"
              >
                <span>Next Puzzle</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                type="button"
                onClick={handleCheckSentence}
                id="puzzle-check-btn"
                disabled={selectedTokens.length === 0 || puzzleResult !== 'idle'}
                className="flex-1 py-2.5 px-4 rounded-xl bg-stone-900 hover:bg-stone-800 text-white font-semibold text-xs disabled:opacity-50 shadow-xs transition-colors cursor-pointer"
              >
                Check Word Order
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
