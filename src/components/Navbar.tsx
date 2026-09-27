import React, { useState, useEffect } from 'react';
import { 
  HeartPulse, 
  Download, 
  BookOpen, 
  HelpCircle, 
  ShieldCheck, 
  WifiOff, 
  Sparkles,
  ShieldAlert
} from 'lucide-react';
import { Language, DEFAULT_LANGUAGE } from '../types';
import { LanguageSelector } from './LanguageSelector';
import { getTranslation } from '../i18n/translations';

interface NavbarProps {
  onOpenSources: () => void;
  onOpenJargon: () => void;
  onOpenChat: () => void;
  onReset: () => void;
  hasActiveReport: boolean;
  activeMainTab?: 'report' | 'myths';
  onSelectMainTab?: (tab: 'report' | 'myths') => void;
  currentLanguage?: Language;
  onSelectLanguage?: (language: Language) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenSources,
  onOpenJargon,
  onOpenChat,
  onReset,
  hasActiveReport,
  activeMainTab = 'report',
  onSelectMainTab,
  currentLanguage = DEFAULT_LANGUAGE,
  onSelectLanguage,
}) => {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isInstallable, setIsInstallable] = useState(false);
  const [isOffline, setIsOffline] = useState(!navigator.onLine);
  const t = getTranslation(currentLanguage?.code || 'en');

  useEffect(() => {
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setIsInstallable(true);
    };

    const handleOnline = () => setIsOffline(false);
    const handleOffline = () => setIsOffline(true);

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Register service worker if supported
    if ('serviceWorker' in navigator && process.env.NODE_ENV === 'production') {
      navigator.serviceWorker.register('/sw.js').catch((err) => {
        console.log('SW registration error:', err);
      });
    }

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === 'accepted') {
      setIsInstallable(false);
    }
    setDeferredPrompt(null);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Brand Logo & Tagline */}
        <div 
          onClick={onReset}
          className="flex items-center gap-3 cursor-pointer group select-none"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-teal-700 to-emerald-600 flex items-center justify-center text-white shadow-md shadow-teal-700/20 group-hover:scale-105 transition-transform duration-200">
            <HeartPulse className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xl font-bold tracking-tight text-slate-900 font-['Outfit']">
                Medi<span className="text-teal-600">Lens</span>
              </span>
              <span className="text-[10px] font-semibold tracking-wider uppercase px-2 py-0.5 rounded-full bg-teal-50 text-teal-700 border border-teal-200/60">
                MBBS Grounded
              </span>
            </div>
            <p className="text-xs text-slate-500 hidden sm:block">
              Textbook Knowledge → Simple Human Explanation
            </p>
          </div>
        </div>

        {/* Right Action Buttons */}
        <div className="flex items-center gap-2 sm:gap-3">
          {isOffline && (
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-50 text-amber-700 border border-amber-200 text-xs font-medium">
              <WifiOff className="w-3.5 h-3.5 text-amber-600" />
              <span className="hidden sm:inline">Offline Mode</span>
            </div>
          )}

          {/* Ask MediLens AI */}
          <button
            onClick={onOpenChat}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-teal-600 hover:bg-teal-700 text-white text-xs sm:text-sm font-semibold shadow-xs shadow-teal-600/20 transition-all cursor-pointer"
            title="Ask MediLens AI questions about your lab test"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>{t.nav.askAi}</span>
          </button>

          {/* Myth Busters Tab Button */}
          {onSelectMainTab && (
            <button
              onClick={() => onSelectMainTab(activeMainTab === 'myths' ? 'report' : 'myths')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-colors cursor-pointer ${
                activeMainTab === 'myths'
                  ? 'bg-amber-100 text-amber-900 border border-amber-300 font-bold'
                  : 'text-slate-600 hover:text-amber-800 hover:bg-amber-50 border border-transparent hover:border-amber-200/60'
              }`}
              title="Common medical lab misconceptions explained with authorized MBBS textbooks"
            >
              <ShieldAlert className={`w-4 h-4 ${activeMainTab === 'myths' ? 'text-amber-700' : 'text-slate-400'}`} />
              <span className="hidden sm:inline">{t.nav.mythBusters}</span>
            </button>
          )}

          {/* Jargon Buster */}
          <button
            onClick={onOpenJargon}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-slate-600 hover:text-teal-700 hover:bg-teal-50 border border-transparent hover:border-teal-200/60 text-xs sm:text-sm font-medium transition-colors"
            title="Dictionary of common lab terms explained simply"
          >
            <HelpCircle className="w-4 h-4 text-slate-400" />
            <span className="hidden md:inline">{t.nav.medicalTerms}</span>
          </button>

          {/* Textbook Sources */}
          <button
            onClick={onOpenSources}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-slate-600 hover:text-teal-700 hover:bg-teal-50 border border-transparent hover:border-teal-200/60 text-xs sm:text-sm font-medium transition-colors"
            title="View authorized MBBS textbooks backing our guidance"
          >
            <BookOpen className="w-4 h-4 text-slate-400" />
            <span className="hidden md:inline">{t.nav.mbbsSources}</span>
          </button>

          {/* Install PWA Button (if available) */}
          {isInstallable && (
            <button
              onClick={handleInstallClick}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-teal-50 text-teal-700 hover:bg-teal-100 border border-teal-200 text-xs sm:text-sm font-medium transition-all shadow-xs"
            >
              <Download className="w-3.5 h-3.5" />
              <span>{t.nav.installApp}</span>
            </button>
          )}

          {/* Language Selector */}
          {onSelectLanguage && (
            <LanguageSelector
              currentLanguage={currentLanguage}
              onSelectLanguage={onSelectLanguage}
            />
          )}

          {/* New / Reset Report Button */}
          {hasActiveReport && (
            <button
              onClick={onReset}
              className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs sm:text-sm font-medium transition-colors"
            >
              <span>{t.nav.newReport}</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
