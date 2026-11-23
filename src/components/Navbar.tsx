import React, { useState } from 'react';
import { 
  Building2, 
  Sun, 
  Moon, 
  Languages, 
  ArrowLeft, 
  ArrowRight,
  Menu, 
  X, 
  Coffee, 
  ShoppingBag, 
  Stethoscope, 
  Bus, 
  Car,
  ChevronDown
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppThemeLanguage } from '../context/ThemeLanguageContext';
import { NavView } from '../types';

export const Navbar: React.FC = () => {
  const { 
    language, 
    toggleLanguage, 
    theme, 
    toggleTheme, 
    activeView, 
    setActiveView, 
    t 
  } = useAppThemeLanguage();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [navDropdownOpen, setNavDropdownOpen] = useState(false);

  const navItems: { id: NavView; label: string; icon: React.ReactNode; badge?: string }[] = [
    { id: 'open-air-mall', label: t('openAirMall'), icon: <Coffee className="w-3.5 h-3.5 shrink-0" /> },
    { id: 'city-mall', label: t('cityMall'), icon: <ShoppingBag className="w-3.5 h-3.5 shrink-0" /> },
    { 
      id: 'hero-plaza', 
      label: language === 'ar' ? 'مول هيرو بلازا' : 'Hero Plaza Mall', 
      icon: <Building2 className="w-3.5 h-3.5 text-amber-500 shrink-0" />,
      badge: language === 'ar' ? 'قريباً' : 'Upcoming'
    },
    { id: 'doctors-tower', label: t('doctorsTower'), icon: <Stethoscope className="w-3.5 h-3.5 shrink-0" /> },
    { id: 'transport', label: t('publicTransport'), icon: <Bus className="w-3.5 h-3.5 shrink-0" /> },
    { id: 'parking', label: t('smartParking'), icon: <Car className="w-3.5 h-3.5 shrink-0" /> },
  ];

  const handleNavClick = (view: NavView) => {
    setActiveView(view);
    setMobileMenuOpen(false);
    setNavDropdownOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const BackIcon = language === 'ar' ? ArrowRight : ArrowLeft;

  return (
    <header className="sticky top-0 z-40 w-full glass-panel border-b border-[#e2dfd8]/70 dark:border-[#33312b]/80 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-[68px] gap-3 sm:gap-4">
          
          {/* Logo & Back to Hub Button Group */}
          <div className="flex items-center gap-2.5 sm:gap-3 shrink-0">
            <button 
              onClick={() => handleNavClick('hub')}
              className="flex items-center gap-2.5 sm:gap-3 text-left group transition-transform active:scale-95"
            >
              <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-gradient-to-br from-[#8e8672] to-[#736b59] flex items-center justify-center text-white shadow-glow-primary transition-all duration-300 group-hover:scale-105 shrink-0">
                <Building2 className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <div className="flex flex-col">
                <span className="text-sm sm:text-base font-black tracking-tight text-[#12110f] dark:text-[#f6f6f4] group-hover:text-[#8e8672] transition-colors leading-tight whitespace-nowrap">
                  RE-CALm
                </span>
                <span className="text-[10px] sm:text-xs font-semibold text-[#8e8672] dark:text-[#a8a08d] tracking-wide truncate max-w-[125px] sm:max-w-none whitespace-nowrap">
                  {language === 'ar' ? 'شبرا الخيمة - رؤية التطوير' : 'Shubra El-Kheima Urban Hub'}
                </span>
              </div>
            </button>

            {/* Back to Hub Button (visible when in subpages) */}
            {activeView !== 'hub' && (
              <motion.button
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                onClick={() => handleNavClick('hub')}
                className="hidden md:inline-flex items-center gap-1.5 px-3 h-10 rounded-xl bg-[#8e8672]/15 hover:bg-[#8e8672]/25 text-xs font-bold text-[#8e8672] dark:text-[#d0c8bd] transition-all whitespace-nowrap shrink-0 border border-[#8e8672]/20"
              >
                <BackIcon className="w-3.5 h-3.5 shrink-0" />
                <span className="whitespace-nowrap">{t('backToHub')}</span>
              </motion.button>
            )}
          </div>

          {/* Desktop Navigation Links — Sleek Slim Pill Design */}
          <nav className="hidden lg:flex items-center gap-1 bg-neutral-200/60 dark:bg-neutral-800/60 p-1 rounded-2xl border border-neutral-300/40 dark:border-neutral-700/40 h-11 max-w-full overflow-x-auto no-scrollbar shrink">
            <button
              onClick={() => handleNavClick('hub')}
              className={`px-3 h-9 rounded-xl text-xs font-bold transition-all whitespace-nowrap shrink-0 flex items-center justify-center ${
                activeView === 'hub'
                  ? 'bg-white dark:bg-[#23221e] text-[#12110f] dark:text-white shadow-sm'
                  : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:bg-white/40 dark:hover:bg-neutral-700/40'
              }`}
            >
              <span className="whitespace-nowrap">{language === 'ar' ? 'الرئيسية' : 'Hub Overview'}</span>
            </button>
            {navItems.map((item) => {
              const isActive = activeView === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`flex items-center gap-1.5 px-2.5 xl:px-3 h-9 rounded-xl text-xs font-bold transition-all whitespace-nowrap shrink-0 ${
                    isActive
                      ? 'bg-white dark:bg-[#23221e] text-[#12110f] dark:text-white shadow-sm'
                      : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:bg-white/40 dark:hover:bg-neutral-700/40'
                  }`}
                >
                  {item.icon}
                  <span className="whitespace-nowrap">{item.label}</span>
                  {item.badge && (
                    <span className="px-1.5 py-0.5 rounded-full text-[9px] font-black bg-amber-500/20 text-amber-700 dark:text-amber-300 leading-none whitespace-nowrap shrink-0">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Quick Hub Dropdown for Medium screens */}
          <div className="hidden md:flex lg:hidden relative">
            <button
              onClick={() => setNavDropdownOpen(!navDropdownOpen)}
              className="flex items-center gap-2 px-3.5 h-10 rounded-xl bg-white dark:bg-[#1b1a17] border border-[#e2dfd8] dark:border-[#383630] text-xs font-bold shadow-sm whitespace-nowrap"
            >
              <span>{t('exploreHub')}</span>
              <ChevronDown className={`w-3.5 h-3.5 transition-transform ${navDropdownOpen ? 'rotate-180' : ''}`} />
            </button>
            <AnimatePresence>
              {navDropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  className="absolute right-0 rtl:right-auto rtl:left-0 top-full mt-2 w-56 rounded-2xl bg-white dark:bg-[#1b1a17] border border-[#e2dfd8] dark:border-[#383630] shadow-xl p-1.5 z-50"
                >
                  <button
                    onClick={() => handleNavClick('hub')}
                    className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-semibold rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 whitespace-nowrap"
                  >
                    <span>{language === 'ar' ? 'الرئيسية' : 'Hub Overview'}</span>
                  </button>
                  {navItems.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => handleNavClick(item.id)}
                      className="w-full flex items-center justify-between px-3 py-2 text-xs font-semibold rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 whitespace-nowrap"
                    >
                      <div className="flex items-center gap-2">
                        {item.icon}
                        <span>{item.label}</span>
                      </div>
                      {item.badge && (
                        <span className="px-1.5 py-0.5 rounded-full text-[9px] font-black bg-amber-500/20 text-amber-700 dark:text-amber-300">
                          {item.badge}
                        </span>
                      )}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Controls: Language Switcher, Theme Switcher, Mobile Toggle with Proper Spacing */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {/* Language Switcher */}
            <button
              onClick={toggleLanguage}
              aria-label="Switch Language"
              className="flex items-center gap-1.5 px-3 h-10 rounded-xl bg-white/80 dark:bg-[#1b1a17]/80 hover:bg-white dark:hover:bg-[#1b1a17] border border-[#e2dfd8] dark:border-[#383630] text-xs font-bold transition-all shadow-sm active:scale-95 text-[#12110f] dark:text-[#f6f6f4] whitespace-nowrap shrink-0"
            >
              <Languages className="w-4 h-4 text-[#8e8672] shrink-0" />
              <span className="uppercase">{language === 'ar' ? 'English' : 'عربي'}</span>
            </button>

            {/* Dark/Light Mode Switcher */}
            <button
              onClick={toggleTheme}
              aria-label="Toggle Theme"
              className="w-10 h-10 rounded-xl bg-white/80 dark:bg-[#1b1a17]/80 hover:bg-white dark:hover:bg-[#1b1a17] border border-[#e2dfd8] dark:border-[#383630] text-neutral-700 dark:text-neutral-300 transition-all shadow-sm active:scale-95 shrink-0 flex items-center justify-center"
            >
              {theme === 'light' ? (
                <Moon className="w-4 h-4 text-neutral-700" />
              ) : (
                <Sun className="w-4 h-4 text-amber-400" />
              )}
            </button>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Open Menu"
              className="lg:hidden w-10 h-10 rounded-xl bg-white/80 dark:bg-[#1b1a17]/80 border border-[#e2dfd8] dark:border-[#383630] text-neutral-700 dark:text-neutral-300 transition-all shadow-sm shrink-0 flex items-center justify-center"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden border-t border-[#e2dfd8] dark:border-[#33312b] bg-white/95 dark:bg-[#12110f]/95 backdrop-blur-xl px-4 py-4 space-y-2 overflow-hidden"
          >
            <button
              onClick={() => handleNavClick('hub')}
              className={`w-full flex items-center justify-between p-3 rounded-xl text-sm font-bold transition-all whitespace-nowrap ${
                activeView === 'hub'
                  ? 'bg-[#8e8672] text-white shadow-sm'
                  : 'hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-800 dark:text-neutral-200'
              }`}
            >
              <span>{language === 'ar' ? 'الرئيسية (لوحة التحكم)' : 'Hub Overview'}</span>
            </button>

            {navItems.map((item) => {
              const isActive = activeView === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`w-full flex items-center justify-between p-3 rounded-xl text-sm font-semibold transition-all whitespace-nowrap ${
                    isActive
                      ? 'bg-[#8e8672] text-white shadow-sm'
                      : 'hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-800 dark:text-neutral-200'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    {item.icon}
                    <span className="whitespace-nowrap">{item.label}</span>
                  </div>
                  {item.badge && (
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-black whitespace-nowrap ${
                      isActive
                        ? 'bg-white/20 text-white'
                        : 'bg-amber-500/15 text-amber-700 dark:text-amber-300'
                    }`}>
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
