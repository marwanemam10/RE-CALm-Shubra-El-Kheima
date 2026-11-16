import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Bus, 
  Clock, 
  MapPin, 
  Search, 
  Navigation, 
  ArrowRight, 
  ArrowLeft,
  ChevronRight, 
  Sparkles, 
  Share2,
  Calendar,
  Layers,
  Repeat
} from 'lucide-react';
import { useAppThemeLanguage } from '../context/ThemeLanguageContext';
import { busRoutes, siteImages } from '../data/siteData';
import { Tabs } from '../components/ui/Tabs';
import { Badge } from '../components/ui/Badge';

export const PublicTransportPage: React.FC = () => {
  const { language, t } = useAppThemeLanguage();
  const [stationFilter, setStationFilter] = useState<'all' | 'bahtim' | 'orabi'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const stationTabs = [
    { id: 'all', label: t('allStations') },
    { id: 'bahtim', label: t('bahtimStation') },
    { id: 'orabi', label: t('orabiStation') },
  ];

  const filteredRoutes = busRoutes.filter((route) => {
    const matchesStation = stationFilter === 'all' || route.stationKey === stationFilter;
    const q = searchQuery.toLowerCase();
    const matchesSearch =
      route.lineNumber.toLowerCase().includes(q) ||
      route.origin[language].toLowerCase().includes(q) ||
      route.destination[language].toLowerCase().includes(q) ||
      route.fullRoute[language].toLowerCase().includes(q) ||
      route.keyStops[language].some((stop) => stop.toLowerCase().includes(q));
    return matchesStation && matchesSearch;
  });

  const ArrowIcon = language === 'ar' ? ArrowLeft : ArrowRight;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 py-6">
      
      {/* Header Banner */}
      <div className="relative rounded-3xl overflow-hidden border border-[#e2dfd8] dark:border-[#33312b] shadow-xl">
        <div className="relative h-72 sm:h-96 w-full">
          <img
            src={siteImages.transport}
            alt="The English Public Transport Company - Shubra El-Kheima"
            className="w-full h-full object-cover object-center filter brightness-[0.85] dark:brightness-[0.4]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#12110f] via-[#12110f]/75 to-transparent" />
        </div>

        {/* Content Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-10 text-white space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#8e8672] text-white">
              {language === 'ar' ? 'شركة النقل الإنجليزية' : 'The English Public Transport Co.'}
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-white/20 backdrop-blur-md text-white flex items-center gap-1.5">
              <Bus className="w-3.5 h-3.5 text-[#acbdad]" />
              {language === 'ar' ? 'موقفا بهتيم وكوبري عرابي' : 'Bahtim & Orabi Bus Terminals'}
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black tracking-tight drop-shadow-md">
            {t('publicTransport')}
          </h1>

          <p className="max-w-3xl text-sm sm:text-base text-neutral-300 font-normal leading-relaxed drop-shadow">
            {language === 'ar'
              ? 'شبكة أسطول النقل الجماعي المنظم لخدمة أهالي شبra الخيمة، تربط المحطة بميادين القاهرة الكبرى، التجمع الخامس، رمسيس، العباسية، ومصر الجديدة عبر خطوط مباشرة.'
              : 'The primary public bus transit network serving Shubra El-Kheima, directly connecting local stations to Greater Cairo squares, New Cairo (AUC), Ramses, and Heliopolis with consistent dispatch cycles.'}
          </p>

          {/* Operating Schedule Badges Bar */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 max-w-2xl text-xs font-bold">
            <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/10 backdrop-blur-md border border-white/20">
              <Clock className="w-4 h-4 text-emerald-400 shrink-0" />
              <div>
                <span className="text-neutral-300 block text-[10px]">{t('firstBus')}</span>
                <span>6:00 {language === 'ar' ? 'صباحاً' : 'AM'}</span>
              </div>
            </div>

            <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/10 backdrop-blur-md border border-white/20">
              <Clock className="w-4 h-4 text-amber-400 shrink-0" />
              <div>
                <span className="text-neutral-300 block text-[10px]">{t('lastBus')}</span>
                <span>10:00 {language === 'ar' ? 'مساءً' : 'PM'}</span>
              </div>
            </div>

            <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/10 backdrop-blur-md border border-white/20">
              <Repeat className="w-4 h-4 text-sky-400 shrink-0" />
              <div>
                <span className="text-neutral-300 block text-[10px]">{t('frequency')}</span>
                <span>{language === 'ar' ? 'كل 15 – 30 دقيقة' : 'Every 15–30 mins'}</span>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Interactive Route Finder Controls */}
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#e2dfd8] dark:border-[#33312b] pb-6">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-[#12110f] dark:text-[#f6f6f4] flex items-center gap-2">
              <Navigation className="w-6 h-6 text-[#8e8672]" />
              <span>{language === 'ar' ? 'مكتشف الخطوط والمسارات الذكي' : 'Interactive Bus Route Finder'}</span>
            </h2>
            <p className="text-xs sm:text-sm text-neutral-500 mt-1">
              {language === 'ar'
                ? 'ابحث باسم وجهتك أو رقم الخط لاستعراض المسار الكامل ومحطات التوقف'
                : 'Search by destination or line number to view the complete travel path & stops'}
            </p>
          </div>

          {/* Search Bar */}
          <div className="relative w-full md:w-96">
            <Search className="w-4 h-4 absolute left-3 rtl:left-auto rtl:right-3 top-1/2 -translate-y-1/2 text-neutral-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t('searchBus')}
              className="w-full pl-9 rtl:pl-4 rtl:pr-9 pr-4 py-2.5 rounded-xl bg-white dark:bg-[#1b1a17] border border-[#dedbd3] dark:border-[#383630] text-sm focus:outline-none focus:ring-2 focus:ring-[#8e8672]/40"
            />
          </div>
        </div>

        {/* Station Filter Tabs */}
        <Tabs
          tabs={stationTabs}
          activeTab={stationFilter}
          onChange={(id) => setStationFilter(id as 'all' | 'bahtim' | 'orabi')}
        />
      </div>

      {/* Bus Lines Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <AnimatePresence>
          {filteredRoutes.map((route, idx) => (
            <motion.div
              key={route.id}
              layout
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 15 }}
              transition={{ duration: 0.3, delay: idx * 0.04 }}
              className="p-6 rounded-3xl bg-white dark:bg-[#1b1a17] border border-[#e2dfd8] dark:border-[#33312b] shadow-card-soft dark:shadow-card-dark hover:shadow-xl hover:border-[#8e8672]/60 transition-all duration-300 flex flex-col justify-between space-y-5"
            >
              <div className="space-y-4">
                {/* Header: Line Number & Station Badge */}
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-[#8e8672] text-white flex items-center justify-center font-black text-lg shadow-glow-primary">
                      {route.lineNumber.split(' ')[0]}
                    </div>
                    <div>
                      <span className="text-xs font-semibold text-neutral-500">
                        {language === 'ar' ? 'خط سير رقم' : 'Route No.'}
                      </span>
                      <h3 className="text-lg font-bold text-[#12110f] dark:text-[#f6f6f4]">
                        {route.lineNumber}
                      </h3>
                    </div>
                  </div>

                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                    route.stationKey === 'bahtim'
                      ? 'bg-amber-500/15 text-amber-700 dark:text-amber-300 border border-amber-500/30'
                      : 'bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border border-emerald-500/30'
                  }`}>
                    {route.stationKey === 'bahtim' ? t('bahtimStation') : t('orabiStation')}
                  </span>
                </div>

                {/* Origin to Destination */}
                <div className="p-3.5 rounded-2xl bg-neutral-50 dark:bg-neutral-800/50 border border-neutral-200/60 dark:border-neutral-700/60 flex items-center justify-between gap-3 text-xs sm:text-sm font-semibold">
                  <div className="flex items-center gap-2 truncate">
                    <MapPin className="w-4 h-4 text-[#8e8672] shrink-0" />
                    <span className="truncate">{route.origin[language]}</span>
                  </div>
                  <ArrowIcon className="w-4 h-4 text-neutral-400 shrink-0" />
                  <div className="flex items-center gap-2 text-right rtl:text-left truncate text-[#8e8672] dark:text-[#a8a08d]">
                    <span className="truncate">{route.destination[language]}</span>
                  </div>
                </div>

                {/* Full Route Details */}
                <div className="space-y-2">
                  <span className="text-xs font-bold text-neutral-500">
                    {t('routeDetails')}:
                  </span>
                  <p className="text-xs sm:text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed bg-neutral-100/60 dark:bg-neutral-900/40 p-3 rounded-xl border border-neutral-200/40 dark:border-neutral-800/40">
                    {route.fullRoute[language]}
                  </p>
                </div>

                {/* Key Stop Pills */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {route.keyStops[language].map((stop, sIdx) => (
                    <span
                      key={sIdx}
                      className="px-2.5 py-0.5 rounded-lg text-[11px] font-medium bg-neutral-200/60 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300"
                    >
                      {stop}
                    </span>
                  ))}
                </div>
              </div>

              {/* Card Footer */}
              <div className="pt-3 border-t border-[#f0ede6] dark:border-[#2b2a26] flex items-center justify-between text-xs text-neutral-500">
                <span className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-[#8e8672]" />
                  <span>{language === 'ar' ? 'انطلاق مستمر حتى 10:00 م' : 'Runs until 10:00 PM'}</span>
                </span>
                <span className="font-semibold text-emerald-600 dark:text-emerald-400">
                  {language === 'ar' ? 'خدمة منتظمة' : 'Regular Service'}
                </span>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

    </div>
  );
};
