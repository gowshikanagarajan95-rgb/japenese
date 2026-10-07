import { UserStats, UserProfile, JapaneseLevel, ThemeColor } from '../types';

const STATS_KEY = 'nihongo_user_stats';
const PREFS_KEY = 'nihongo_user_prefs';
const CURRENT_USER_KEY = 'nihongo_current_user';
const USERS_DB_KEY = 'nihongo_registered_users';
const WELCOME_DISMISSED_KEY = 'nihongo_welcome_dismissed';

export interface StoredAccount extends UserProfile {
  passwordHash: string;
}

export function loadWelcomeDismissed(): boolean {
  try {
    return localStorage.getItem(WELCOME_DISMISSED_KEY) === 'true';
  } catch {
    return false;
  }
}

export function saveWelcomeDismissed(dismissed: boolean) {
  try {
    localStorage.setItem(WELCOME_DISMISSED_KEY, dismissed ? 'true' : 'false');
  } catch (e) {
    console.warn('Failed to save welcome dismissed state:', e);
  }
}

export interface UserPrefs {
  showRomaji: boolean;
  audioRate: number; // 0.8 or 1.0
  activeSection: 'kana' | 'kanji' | 'vocab' | 'grammar' | 'quiz';
  themeColor: ThemeColor;
}

const DEFAULT_DEMO_ACCOUNT: StoredAccount = {
  id: 'demo-user-1',
  name: 'Sakura Learner',
  email: 'learner@japan.study',
  passwordHash: 'nihongo123',
  avatar: '🌸',
  level: 'beginner',
  joinedDate: '2026-01-15',
  isGuest: false,
};

export function getRegisteredUsers(): StoredAccount[] {
  try {
    const raw = localStorage.getItem(USERS_DB_KEY);
    if (!raw) {
      const initial = [DEFAULT_DEMO_ACCOUNT];
      localStorage.setItem(USERS_DB_KEY, JSON.stringify(initial));
      return initial;
    }
    return JSON.parse(raw);
  } catch {
    return [DEFAULT_DEMO_ACCOUNT];
  }
}

export function saveRegisteredUsers(users: StoredAccount[]) {
  try {
    localStorage.setItem(USERS_DB_KEY, JSON.stringify(users));
  } catch (e) {
    console.warn('Failed to save registered users:', e);
  }
}

export function loadCurrentUser(): UserProfile | null {
  try {
    const raw = localStorage.getItem(CURRENT_USER_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

export function saveCurrentUser(user: UserProfile | null) {
  try {
    if (!user) {
      localStorage.removeItem(CURRENT_USER_KEY);
    } else {
      localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
    }
  } catch (e) {
    console.warn('Failed to save current user:', e);
  }
}


const DEFAULT_STATS: UserStats = {
  masteredKana: [],
  masteredKanji: [],
  masteredVocab: [],
  streakDays: 1,
  lastStudyDate: new Date().toISOString().slice(0, 10),
  quizHighScore: 0,
  totalQuizzesTaken: 0,
};

const DEFAULT_PREFS: UserPrefs = {
  showRomaji: true,
  audioRate: 0.9,
  activeSection: 'kana',
  themeColor: 'indigo',
};

export function loadUserStats(): UserStats {
  try {
    const raw = localStorage.getItem(STATS_KEY);
    if (!raw) {
      saveUserStats(DEFAULT_STATS);
      return DEFAULT_STATS;
    }
    const parsed = JSON.parse(raw);
    // Update daily streak
    const today = new Date().toISOString().slice(0, 10);
    if (parsed.lastStudyDate !== today) {
      const yesterday = new Date(Date.now() - 86400000).toISOString().slice(0, 10);
      if (parsed.lastStudyDate === yesterday) {
        parsed.streakDays = (parsed.streakDays || 0) + 1;
      } else {
        // missed a day
        parsed.streakDays = 1;
      }
      parsed.lastStudyDate = today;
      saveUserStats(parsed);
    }
    return { ...DEFAULT_STATS, ...parsed };
  } catch {
    return DEFAULT_STATS;
  }
}

export function saveUserStats(stats: UserStats) {
  try {
    localStorage.setItem(STATS_KEY, JSON.stringify(stats));
  } catch (e) {
    console.warn('Failed to save user stats:', e);
  }
}

export function loadUserPrefs(): UserPrefs {
  try {
    const raw = localStorage.getItem(PREFS_KEY);
    if (!raw) return DEFAULT_PREFS;
    return { ...DEFAULT_PREFS, ...JSON.parse(raw) };
  } catch {
    return DEFAULT_PREFS;
  }
}

export function saveUserPrefs(prefs: UserPrefs) {
  try {
    localStorage.setItem(PREFS_KEY, JSON.stringify(prefs));
  } catch (e) {
    console.warn('Failed to save user prefs:', e);
  }
}
