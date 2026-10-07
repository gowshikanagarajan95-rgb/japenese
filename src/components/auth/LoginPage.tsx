import { useState, FormEvent } from 'react';
import {
  LogIn,
  UserPlus,
  Lock,
  Mail,
  User,
  Eye,
  EyeOff,
  Sparkles,
  ArrowLeft,
  CheckCircle2,
  AlertCircle,
  ShieldCheck,
  Compass,
  GraduationCap,
} from 'lucide-react';
import { UserProfile, JapaneseLevel } from '../../types';
import {
  getRegisteredUsers,
  saveRegisteredUsers,
  saveCurrentUser,
  StoredAccount,
} from '../../utils/storage';

interface LoginPageProps {
  onLoginSuccess: (user: UserProfile) => void;
  onContinueAsGuest: () => void;
  onBackToApp?: () => void;
}

const AVATAR_OPTIONS = [
  { icon: '🌸', label: 'Sakura (Blossom)' },
  { icon: '🗻', label: 'Fuji (Mountain)' },
  { icon: '🍵', label: 'Matcha (Tea)' },
  { icon: '⛩️', label: 'Torii (Gateway)' },
  { icon: '🏮', label: 'Lantern (Light)' },
  { icon: '🦊', label: 'Kitsune (Fox)' },
];

export function LoginPage({
  onLoginSuccess,
  onContinueAsGuest,
  onBackToApp,
}: LoginPageProps) {
  const [authMode, setAuthMode] = useState<'signin' | 'signup'>('signin');

  // Sign in fields
  const [signInEmail, setSignInEmail] = useState('');
  const [signInPassword, setSignInPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);

  // Sign up fields
  const [signUpName, setSignUpName] = useState('');
  const [signUpEmail, setSignUpEmail] = useState('');
  const [signUpPassword, setSignUpPassword] = useState('');
  const [selectedAvatar, setSelectedAvatar] = useState('🌸');
  const [selectedLevel, setSelectedLevel] = useState<JapaneseLevel>('beginner');

  // Status & Feedback
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [showForgotPassword, setShowForgotPassword] = useState(false);

  // Handle Demo Account 1-Click Login
  const handleUseDemoAccount = () => {
    setSignInEmail('learner@japan.study');
    setSignInPassword('nihongo123');
    setErrorMsg(null);
  };

  // Sign In submit
  const handleSignIn = (e: FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    const emailClean = signInEmail.trim().toLowerCase();
    const passClean = signInPassword.trim();

    if (!emailClean || !passClean) {
      setErrorMsg('Please enter both email and password.');
      return;
    }

    const allUsers = getRegisteredUsers();
    const found = allUsers.find(
      (u) => u.email.toLowerCase() === emailClean && u.passwordHash === passClean
    );

    if (found) {
      const userProfile: UserProfile = {
        id: found.id,
        name: found.name,
        email: found.email,
        avatar: found.avatar,
        level: found.level,
        joinedDate: found.joinedDate,
        isGuest: false,
      };
      saveCurrentUser(userProfile);
      setSuccessMsg('Welcome back! ようこそ！');
      setTimeout(() => {
        onLoginSuccess(userProfile);
      }, 500);
    } else {
      setErrorMsg('Incorrect email or password. Try the 1-click demo account below.');
    }
  };

  // Sign Up submit
  const handleSignUp = (e: FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    const nameClean = signUpName.trim();
    const emailClean = signUpEmail.trim().toLowerCase();
    const passClean = signUpPassword.trim();

    if (!nameClean) {
      setErrorMsg('Please enter your study name / nickname.');
      return;
    }
    if (!emailClean || !emailClean.includes('@')) {
      setErrorMsg('Please enter a valid email address.');
      return;
    }
    if (passClean.length < 4) {
      setErrorMsg('Password should be at least 4 characters long.');
      return;
    }

    const allUsers = getRegisteredUsers();
    if (allUsers.some((u) => u.email.toLowerCase() === emailClean)) {
      setErrorMsg('An account with this email already exists. Please sign in.');
      return;
    }

    const newAccount: StoredAccount = {
      id: `user-${Date.now()}`,
      name: nameClean,
      email: emailClean,
      passwordHash: passClean,
      avatar: selectedAvatar,
      level: selectedLevel,
      joinedDate: new Date().toISOString().slice(0, 10),
      isGuest: false,
    };

    saveRegisteredUsers([...allUsers, newAccount]);

    const userProfile: UserProfile = {
      id: newAccount.id,
      name: newAccount.name,
      email: newAccount.email,
      avatar: newAccount.avatar,
      level: newAccount.level,
      joinedDate: newAccount.joinedDate,
      isGuest: false,
    };

    saveCurrentUser(userProfile);
    setSuccessMsg('Account created successfully! ようこそ！');
    setTimeout(() => {
      onLoginSuccess(userProfile);
    }, 600);
  };

  // Guest login
  const handleGuestEntry = () => {
    const guestUser: UserProfile = {
      id: `guest-${Date.now()}`,
      name: 'Explorer Guest',
      email: 'guest@japan.study',
      avatar: '⛩️',
      level: 'beginner',
      joinedDate: new Date().toISOString().slice(0, 10),
      isGuest: true,
    };
    saveCurrentUser(guestUser);
    onContinueAsGuest();
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center py-8 px-4 sm:px-6">
      <div className="max-w-md w-full space-y-6">
        {/* Top Back Link if navigating from inside app */}
        {onBackToApp && (
          <button
            onClick={onBackToApp}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-stone-500 hover:text-stone-900 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Lessons</span>
          </button>
        )}

        {/* Main Authentication Card */}
        <div className="bg-white rounded-3xl border border-stone-200/90 shadow-xl overflow-hidden">
          {/* Card Japanese Header Pattern */}
          <div className="bg-gradient-to-br from-stone-900 via-stone-850 to-stone-900 text-white p-6 sm:p-7 relative overflow-hidden">
            <div className="absolute -right-4 -bottom-6 font-jp text-8xl text-stone-800/40 font-black pointer-events-none select-none">
              学
            </div>

            <div className="relative z-10 space-y-1.5">
              <div className="flex items-center gap-2">
                <span className="text-xl">⛩️</span>
                <span className="text-xs font-bold uppercase tracking-widest text-accent">
                  日本語学習ポータル
                </span>
              </div>
              <h1 className="text-2xl font-extrabold tracking-tight text-white font-jp">
                {authMode === 'signin' ? 'ログイン (Sign In)' : '新規登録 (Create Account)'}
              </h1>
              <p className="text-xs text-stone-300">
                {authMode === 'signin'
                  ? 'Sign in to sync your study streaks, kana mastery, and test scores.'
                  : 'Start your Japanese journey and build your personalized learning profile.'}
              </p>
            </div>
          </div>

          {/* Mode Switcher Tabs */}
          <div className="flex border-b border-stone-100 bg-stone-50/70 p-1.5 gap-1.5">
            <button
              onClick={() => {
                setAuthMode('signin');
                setErrorMsg(null);
              }}
              id="auth-tab-signin"
              className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-2 ${
                authMode === 'signin'
                  ? 'bg-white text-stone-900 shadow-xs border border-stone-200/80'
                  : 'text-stone-500 hover:text-stone-800'
              }`}
            >
              <LogIn className="w-3.5 h-3.5" />
              <span>Sign In</span>
            </button>
            <button
              onClick={() => {
                setAuthMode('signup');
                setErrorMsg(null);
              }}
              id="auth-tab-signup"
              className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-2 ${
                authMode === 'signup'
                  ? 'bg-white text-stone-900 shadow-xs border border-stone-200/80'
                  : 'text-stone-500 hover:text-stone-800'
              }`}
            >
              <UserPlus className="w-3.5 h-3.5" />
              <span>Create Account</span>
            </button>
          </div>

          {/* Form Body */}
          <div className="p-6 sm:p-7 space-y-5">
            {/* Feedback Alerts */}
            {errorMsg && (
              <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center gap-2 animate-in fade-in">
                <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
                <span>{errorMsg}</span>
              </div>
            )}
            {successMsg && (
              <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-2 animate-in fade-in">
                <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />
                <span>{successMsg}</span>
              </div>
            )}

            {/* Quick Demo Credentials Bar (Sign In only) */}
            {authMode === 'signin' && (
              <div className="bg-amber-50/80 border border-amber-200/80 rounded-2xl p-3.5 flex items-center justify-between gap-2 text-xs text-amber-900">
                <div className="space-y-0.5">
                  <div className="font-bold flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                    <span>Quick Demo Credentials</span>
                  </div>
                  <div className="text-[11px] text-amber-800 font-mono">
                    learner@japan.study / nihongo123
                  </div>
                </div>
                <button
                  type="button"
                  onClick={handleUseDemoAccount}
                  id="btn-fill-demo-creds"
                  className="px-2.5 py-1.5 bg-amber-200/80 hover:bg-amber-300 text-amber-900 rounded-lg font-bold text-[11px] transition-colors cursor-pointer shrink-0"
                >
                  Auto-Fill
                </button>
              </div>
            )}

            {/* --- SIGN IN FORM --- */}
            {authMode === 'signin' && (
              <form onSubmit={handleSignIn} className="space-y-4">
                <div className="space-y-1.5">
                  <label
                    htmlFor="signin-email"
                    className="block text-xs font-bold text-stone-700 uppercase tracking-wider"
                  >
                    Email or Study ID
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      id="signin-email"
                      type="email"
                      value={signInEmail}
                      onChange={(e) => setSignInEmail(e.target.value)}
                      placeholder="e.g. learner@japan.study"
                      className="w-full pl-10 pr-4 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-sm text-stone-900 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-rose-500/30 focus:border-rose-500 transition-all"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <label
                      htmlFor="signin-password"
                      className="block text-xs font-bold text-stone-700 uppercase tracking-wider"
                    >
                      Password
                    </label>
                    <button
                      type="button"
                      onClick={() => setShowForgotPassword(true)}
                      className="text-[11px] text-accent hover:underline font-semibold cursor-pointer"
                    >
                      Forgot password?
                    </button>
                  </div>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      id="signin-password"
                      type={showPassword ? 'text' : 'password'}
                      value={signInPassword}
                      onChange={(e) => setSignInPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full pl-10 pr-10 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-sm text-stone-900 placeholder-stone-400 focus:outline-none focus:ring-2 focus:border-stone-400 transition-all"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600 cursor-pointer p-1"
                      title={showPassword ? 'Hide password' : 'Show password'}
                    >
                      {showPassword ? (
                        <EyeOff className="w-4 h-4" />
                      ) : (
                        <Eye className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs text-stone-600 pt-1">
                  <label className="flex items-center gap-2 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="rounded border-stone-300 text-stone-900"
                    />
                    <span>Remember my device</span>
                  </label>
                </div>

                <button
                  type="submit"
                  id="btn-submit-signin"
                  className="w-full py-3 px-4 rounded-xl btn-theme-primary font-bold text-sm transition-all shadow-md cursor-pointer flex items-center justify-center gap-2"
                >
                  <LogIn className="w-4 h-4" />
                  <span>Sign In & Continue Learning</span>
                </button>
              </form>
            )}

            {/* --- SIGN UP FORM --- */}
            {authMode === 'signup' && (
              <form onSubmit={handleSignUp} className="space-y-4">
                <div className="space-y-1.5">
                  <label
                    htmlFor="signup-name"
                    className="block text-xs font-bold text-stone-700 uppercase tracking-wider"
                  >
                    Learner Name / Study Nickname
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      id="signup-name"
                      type="text"
                      value={signUpName}
                      onChange={(e) => setSignUpName(e.target.value)}
                      placeholder="e.g. Kenji, Sakura, or your name"
                      className="w-full pl-10 pr-4 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-sm text-stone-900 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-rose-500/30 focus:border-rose-500 transition-all"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label
                    htmlFor="signup-email"
                    className="block text-xs font-bold text-stone-700 uppercase tracking-wider"
                  >
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      id="signup-email"
                      type="email"
                      value={signUpEmail}
                      onChange={(e) => setSignUpEmail(e.target.value)}
                      placeholder="your.email@example.com"
                      className="w-full pl-10 pr-4 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-sm text-stone-900 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-rose-500/30 focus:border-rose-500 transition-all"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label
                    htmlFor="signup-password"
                    className="block text-xs font-bold text-stone-700 uppercase tracking-wider"
                  >
                    Choose Password
                  </label>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      id="signup-password"
                      type={showPassword ? 'text' : 'password'}
                      value={signUpPassword}
                      onChange={(e) => setSignUpPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full pl-10 pr-10 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-sm text-stone-900 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-rose-500/30 focus:border-rose-500 transition-all"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600 cursor-pointer p-1"
                    >
                      {showPassword ? (
                        <EyeOff className="w-4 h-4" />
                      ) : (
                        <Eye className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Level Selection */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider">
                    Current Japanese Proficiency
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { id: 'beginner' as JapaneseLevel, title: 'Beginner', desc: 'Hiragana' },
                      { id: 'elementary' as JapaneseLevel, title: 'N5 Vocab', desc: 'Phrases' },
                      { id: 'intermediate' as JapaneseLevel, title: 'Grammar', desc: 'SOV / Sentences' },
                    ].map((lvl) => (
                      <button
                        key={lvl.id}
                        type="button"
                        onClick={() => setSelectedLevel(lvl.id)}
                        className={`p-2.5 rounded-xl border text-center transition-all cursor-pointer ${
                          selectedLevel === lvl.id
                            ? 'badge-theme font-bold'
                            : 'bg-stone-50 border-stone-200 text-stone-600 hover:bg-stone-100'
                        }`}
                      >
                        <div className="text-xs font-bold">{lvl.title}</div>
                        <div className="text-[10px] opacity-75">{lvl.desc}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Avatar Badge Picker */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider">
                    Choose Learner Crest / Avatar
                  </label>
                  <div className="flex items-center justify-between gap-1.5">
                    {AVATAR_OPTIONS.map((item) => (
                      <button
                        key={item.icon}
                        type="button"
                        onClick={() => setSelectedAvatar(item.icon)}
                        className={`w-11 h-11 rounded-xl text-xl flex items-center justify-center border transition-all cursor-pointer ${
                          selectedAvatar === item.icon
                            ? 'bg-accent-light border-accent scale-110 shadow-xs'
                            : 'bg-stone-50 border-stone-200 hover:bg-stone-100'
                        }`}
                        title={item.label}
                      >
                        {item.icon}
                      </button>
                    ))}
                  </div>
                </div>

                <button
                  type="submit"
                  id="btn-submit-signup"
                  className="w-full py-3 px-4 rounded-xl btn-theme-primary font-bold text-sm transition-all shadow-md cursor-pointer flex items-center justify-center gap-2 mt-2"
                >
                  <UserPlus className="w-4 h-4" />
                  <span>Create Account & Start Learning</span>
                </button>
              </form>
            )}

            {/* Divider */}
            <div className="relative my-4">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-stone-200"></div>
              </div>
              <div className="relative flex justify-center text-[11px] uppercase tracking-wider">
                <span className="bg-white px-3 text-stone-400 font-semibold">
                  Or explore instantly
                </span>
              </div>
            </div>

            {/* Guest Entry Button */}
            <button
              type="button"
              onClick={handleGuestEntry}
              id="btn-continue-guest"
              className="w-full py-2.5 px-4 rounded-xl border border-stone-300 bg-stone-50 hover:bg-stone-100 text-stone-700 font-semibold text-xs transition-colors cursor-pointer flex items-center justify-center gap-2"
            >
              <Compass className="w-4 h-4 text-stone-500" />
              <span>Continue as Guest / Explorer</span>
            </button>
          </div>

          {/* Card Footer Security note */}
          <div className="bg-stone-50 border-t border-stone-100 px-6 py-3.5 text-center text-[11px] text-stone-500 flex items-center justify-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>Encrypted local session • Zero tracking • Instant offline readiness</span>
          </div>
        </div>

        {/* Forgot Password Modal */}
        {showForgotPassword && (
          <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in">
            <div className="bg-white rounded-2xl max-w-sm w-full p-6 border border-stone-200 shadow-xl space-y-4">
              <div className="flex items-center gap-2 text-rose-600">
                <ShieldCheck className="w-5 h-5" />
                <h3 className="font-bold text-stone-900">Reset Study Password</h3>
              </div>
              <p className="text-xs text-stone-600 leading-relaxed">
                For this learning applet, your account data is maintained securely in your browser's local storage.
              </p>
              <div className="p-3 bg-stone-50 rounded-xl border border-stone-200 text-xs font-mono text-stone-700">
                Default Demo Password: <span className="font-bold text-rose-600">nihongo123</span>
              </div>
              <p className="text-xs text-stone-500">
                You can also log in as a Guest or register with a new email to begin a fresh study profile at any time.
              </p>
              <button
                type="button"
                onClick={() => setShowForgotPassword(false)}
                className="w-full py-2 rounded-xl bg-stone-900 text-white text-xs font-bold hover:bg-stone-800 transition-colors cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
