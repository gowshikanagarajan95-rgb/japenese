import { useState, useRef, useEffect } from 'react';
import {
  Flame,
  CheckCircle2,
  Volume2,
  BookOpen,
  LogIn,
  LogOut,
  User,
  ChevronDown,
  Sparkles,
  Palette,
  Check,
} from 'lucide-react';
import { UserStats, UserProfile, ThemeColor } from '../types';
import { UserPrefs } from '../utils/storage';

interface HeaderProps {
  stats: UserStats;
  prefs: UserPrefs;
  onUpdatePrefs: (prefs: Partial<UserPrefs>) => void;
  totalKanaCount: number;
  currentUser: UserProfile | null;
  onOpenLoginPage: () => void;
  onLogout: () => void;
  onOpenWelcomeGuide?: () => void;
}

const THEME_OPTIONS: { id: ThemeColor; name: string; kanji: string; hex: string }[] = [
  { id: 'indigo', name: 'Indigo (Japan Blue)', kanji: '藍色', hex: '#2563eb' },
  { id: 'vermilion', name: 'Vermilion (Torii Red)', kanji: '朱色', hex: '#e11d48' },
  { id: 'matcha', name: 'Matcha (Zen Green)', kanji: '抹茶', hex: '#059669' },
  { id: 'sakura', name: 'Sakura (Blossom)', kanji: '桜色', hex: '#db2777' },
  { id: 'violet', name: 'Violet (Imperial)', kanji: '紫色', hex: '#7c3aed' },
  { id: 'amber', name: 'Amber (Lantern)', kanji: '琥珀', hex: '#d97706' },
];

export function Header({
  stats,
  prefs,
  onUpdatePrefs,
  totalKanaCount,
  currentUser,
  onOpenLoginPage,
  onLogout,
  onOpenWelcomeGuide,
}: HeaderProps) {
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showThemeMenu, setShowThemeMenu] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const themeRef = useRef<HTMLDivElement | null>(null);

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setShowProfileMenu(false);
      }
      if (themeRef.current && !themeRef.current.contains(e.target as Node)) {
        setShowThemeMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const activeTheme = THEME_OPTIONS.find((t) => t.id === prefs.themeColor) || THEME_OPTIONS[0];

  return (
    <header className="sticky top-0 z-30 bg-stone-900/95 backdrop-blur-md text-stone-100 border-b border-stone-800 shadow-sm transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex flex-wrap items-center justify-between gap-3">
        {/* Brand & Identity */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-theme-gradient flex items-center justify-center text-white font-bold text-xl shadow-md shrink-0 transition-all duration-300">
            日
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg sm:text-xl font-bold tracking-tight text-white flex items-center gap-1.5">
                Learn Japanese Basics
              </h1>
              <span className="text-xs px-2 py-0.5 rounded-full bg-stone-800 text-stone-300 font-medium border border-stone-700 flex items-center gap-1">
                <span
                  className="w-1.5 h-1.5 rounded-full"
                  style={{ backgroundColor: activeTheme.hex }}
                />
                <span className="font-jp">{activeTheme.kanji}</span>
              </span>
            </div>
            <p className="text-xs text-stone-400 hidden sm:block">
              Hiragana • Katakana • Kanji • Vocabulary • Grammar
            </p>
          </div>
        </div>

        {/* Stats & Quick Controls */}
        <div className="flex items-center flex-wrap gap-2 sm:gap-2.5">
          {/* Interactive Welcome Guide Button */}
          {onOpenWelcomeGuide && (
            <button
              id="header-welcome-guide-btn"
              onClick={onOpenWelcomeGuide}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-stone-800/90 hover:bg-stone-750 border border-stone-700/80 text-xs font-semibold text-amber-300 transition-colors cursor-pointer"
              title="Interactive Welcome Guide & Feature Tour"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Guide</span>
            </button>
          )}

          {/* Daily Streak */}
          <div
            id="streak-badge"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-stone-800/80 border border-stone-700/60 text-xs font-medium text-amber-300"
            title="Your daily learning streak"
          >
            <Flame className="w-4 h-4 text-amber-400 fill-amber-400/30" />
            <span>{stats.streakDays}d Streak</span>
          </div>

          {/* Mastered Progress Pill */}
          <div
            id="mastery-badge"
            className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-stone-800/80 border border-stone-700/60 text-xs font-medium text-emerald-300"
            title="Kana & Kanji characters mastered"
          >
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>
              {stats.masteredKana.length} Kana
              {(stats.masteredKanji || []).length > 0 && ` • ${(stats.masteredKanji || []).length} Kanji`}
            </span>
          </div>

          {/* Interactive Theme Color Picker Dropdown */}
          <div className="relative" ref={themeRef}>
            <button
              id="theme-color-picker-btn"
              onClick={() => setShowThemeMenu(!showThemeMenu)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-stone-800 border border-stone-700/80 hover:bg-stone-750 text-xs font-medium text-stone-200 transition-colors cursor-pointer"
              title="Change interactive color theme"
            >
              <span
                className="w-3 h-3 rounded-full border border-white/40 shadow-xs"
                style={{ backgroundColor: activeTheme.hex }}
              />
              <span className="hidden sm:inline">{activeTheme.name.split(' ')[0]}</span>
              <ChevronDown className="w-3 h-3 text-stone-400" />
            </button>

            {/* Theme Dropdown */}
            {showThemeMenu && (
              <div className="absolute right-0 mt-2 w-56 bg-white text-stone-800 rounded-2xl shadow-xl border border-stone-200 p-2 z-50 animate-in fade-in">
                <div className="px-2.5 py-1.5 text-[11px] font-bold text-stone-400 uppercase tracking-wider border-b border-stone-100 flex items-center gap-1.5">
                  <Palette className="w-3.5 h-3.5 text-stone-500" />
                  <span>Interactive Color Theme</span>
                </div>
                <div className="mt-1 space-y-0.5">
                  {THEME_OPTIONS.map((theme) => {
                    const isSelected = (prefs.themeColor || 'indigo') === theme.id;
                    return (
                      <button
                        key={theme.id}
                        id={`theme-opt-${theme.id}`}
                        onClick={() => {
                          onUpdatePrefs({ themeColor: theme.id });
                          setShowThemeMenu(false);
                        }}
                        className={`w-full px-2.5 py-2 rounded-xl text-xs font-medium transition-colors flex items-center justify-between cursor-pointer ${
                          isSelected
                            ? 'bg-stone-100 font-bold text-stone-900'
                            : 'text-stone-700 hover:bg-stone-50'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <span
                            className="w-3.5 h-3.5 rounded-full shadow-2xs shrink-0"
                            style={{ backgroundColor: theme.hex }}
                          />
                          <span>{theme.name}</span>
                        </div>
                        {isSelected && <Check className="w-3.5 h-3.5 text-stone-900" />}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Romaji Visibility Toggle */}
          <button
            id="toggle-romaji-btn"
            onClick={() => onUpdatePrefs({ showRomaji: !prefs.showRomaji })}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors cursor-pointer ${
              prefs.showRomaji
                ? 'bg-stone-800 text-stone-200 border-stone-700'
                : 'bg-stone-850 border-stone-800 text-stone-500 hover:text-stone-400'
            }`}
            title="Toggle Romaji (English reading assistance)"
          >
            <BookOpen className="w-3.5 h-3.5 text-accent" />
            <span className="hidden sm:inline">Romaji:</span>
            <span>{prefs.showRomaji ? 'ON' : 'OFF'}</span>
          </button>

          {/* Audio Speed Toggle */}
          <button
            id="toggle-audio-speed-btn"
            onClick={() => onUpdatePrefs({ audioRate: prefs.audioRate === 0.9 ? 0.75 : 0.9 })}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-stone-800 border border-stone-700/60 text-xs font-medium text-stone-300 hover:bg-stone-700/60 hover:text-white transition-colors cursor-pointer"
            title="Speech speed: 0.75x is great for beginners!"
          >
            <Volume2 className="w-3.5 h-3.5 text-accent" />
            <span>{prefs.audioRate === 0.9 ? '1.0x' : '0.75x'}</span>
          </button>

          {/* User Profile / Login Button */}
          {currentUser ? (
            <div className="relative" ref={menuRef}>
              <button
                onClick={() => setShowProfileMenu(!showProfileMenu)}
                id="user-profile-menu-btn"
                className="flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-xl bg-stone-800 hover:bg-stone-750 border border-stone-700 text-xs font-semibold text-white transition-all cursor-pointer"
              >
                <span className="text-base leading-none">{currentUser.avatar}</span>
                <span className="max-w-[90px] truncate">{currentUser.name}</span>
                <ChevronDown className="w-3.5 h-3.5 text-stone-400" />
              </button>

              {/* Profile Dropdown */}
              {showProfileMenu && (
                <div className="absolute right-0 mt-2 w-64 bg-white text-stone-800 rounded-2xl shadow-xl border border-stone-200 p-3 z-50 animate-in fade-in">
                  <div className="flex items-center gap-3 p-2 border-b border-stone-100 pb-3 mb-2">
                    <div className="w-10 h-10 rounded-xl bg-accent-light text-2xl flex items-center justify-center border border-accent-light">
                      {currentUser.avatar}
                    </div>
                    <div className="overflow-hidden">
                      <div className="font-bold text-sm text-stone-900 truncate">
                        {currentUser.name}
                      </div>
                      <div className="text-[11px] text-stone-500 truncate">
                        {currentUser.email}
                      </div>
                      <div className="inline-block mt-0.5 text-[10px] uppercase font-bold px-1.5 py-0.2 rounded badge-theme">
                        {currentUser.isGuest ? 'Guest Learner' : `${currentUser.level} Level`}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-1 text-xs">
                    {currentUser.isGuest ? (
                      <button
                        onClick={() => {
                          setShowProfileMenu(false);
                          onOpenLoginPage();
                        }}
                        className="w-full text-left px-3 py-2 rounded-xl text-accent hover:bg-stone-50 font-bold transition-colors cursor-pointer flex items-center gap-2"
                      >
                        <Sparkles className="w-4 h-4 text-accent" />
                        <span>Sign In / Save Progress</span>
                      </button>
                    ) : (
                      <button
                        onClick={() => {
                          setShowProfileMenu(false);
                          onOpenLoginPage();
                        }}
                        className="w-full text-left px-3 py-2 rounded-xl text-stone-700 hover:bg-stone-50 transition-colors cursor-pointer flex items-center gap-2"
                      >
                        <User className="w-4 h-4 text-stone-400" />
                        <span>Switch Account / Manage</span>
                      </button>
                    )}

                    <button
                      onClick={() => {
                        setShowProfileMenu(false);
                        onLogout();
                      }}
                      id="logout-btn"
                      className="w-full text-left px-3 py-2 rounded-xl text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer flex items-center gap-2"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Log Out</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={onOpenLoginPage}
              id="header-login-btn"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl btn-theme-primary text-xs font-bold transition-all shadow-xs cursor-pointer"
            >
              <LogIn className="w-3.5 h-3.5" />
              <span>Log In</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
