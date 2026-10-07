export type KanaType = 'hiragana' | 'katakana';
export type KanaCategory = 'gojuon' | 'dakuon' | 'yoon';

export interface KanaCharacter {
  id: string;
  char: string;
  romaji: string;
  type: KanaType;
  category: KanaCategory;
  row?: string; // e.g., 'a', 'k', 's', 't', 'n', 'h', 'm', 'y', 'r', 'w'
  exampleWord: string;
  exampleFurigana: string;
  exampleRomaji: string;
  exampleMeaning: string;
  mnemonic?: string;
  strokeCount: number;
}

export type VocabCategory =
  | 'unit1'
  | 'greetings'
  | 'people'
  | 'occupations'
  | 'numbers'
  | 'food'
  | 'daily'
  | 'questions'
  | 'travel'
  | string;

export interface VocabItem {
  id: string;
  kanji: string;
  furigana: string;
  romaji: string;
  english: string;
  category: VocabCategory;
  categoryLabel: string;
  unit?: number;
  unitTitle?: string;
  subCategory?: string;
  exampleJp: string;
  exampleRomaji: string;
  exampleEn: string;
}

export type KanjiCategory =
  | 'numbers'
  | 'nature'
  | 'people'
  | 'time'
  | 'directions'
  | 'school'
  | 'actions'
  | 'places';

export interface KanjiExample {
  word: string;
  furigana: string;
  romaji: string;
  meaning: string;
}

export interface KanjiItem {
  id: string;
  kanji: string;
  meanings: string[];
  onyomi: string[]; // Katakana readings
  kunyomi: string[]; // Hiragana readings
  romajiOnyomi: string[];
  romajiKunyomi: string[];
  strokeCount: number;
  grade: string;
  category: KanjiCategory;
  categoryLabel: string;
  radical: string;
  radicalMeaning: string;
  mnemonic: string;
  examples: KanjiExample[];
}

export interface GrammarLesson {
  id: string;
  unit?: number;
  title: string;
  japaneseTitle: string;
  level: string;
  summary: string;
  keyRule: string;
  formula: { label: string; role: 'subject' | 'topic' | 'object' | 'particle' | 'verb' | 'predicate' }[];
  explanation: string[];
  examples: {
    sentenceJp: string;
    sentenceRomaji: string;
    sentenceEn: string;
    breakdown: { text: string; role: string; highlight?: boolean }[];
  }[];
  tip: string;
}

export interface SentencePuzzle {
  id: string;
  englishPrompt: string;
  japaneseFull: string;
  romajiFull: string;
  tokens: { id: string; text: string; furigana?: string }[];
  correctOrder: string[]; // token ids
  hint: string;
}

export interface UserStats {
  masteredKana: string[]; // IDs
  masteredKanji: string[]; // IDs
  masteredVocab: string[]; // IDs
  streakDays: number;
  lastStudyDate: string;
  quizHighScore: number;
  totalQuizzesTaken: number;
}

export type JapaneseLevel = 'beginner' | 'elementary' | 'intermediate';

export type ThemeColor = 'indigo' | 'vermilion' | 'matcha' | 'sakura' | 'violet' | 'amber';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatar: string; // e.g., '🌸', '🗻', '🍵', '⛩️', '🏮', '🦊'
  level: JapaneseLevel;
  joinedDate: string;
  isGuest?: boolean;
}

