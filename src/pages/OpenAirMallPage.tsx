import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Coffee, 
  Clock, 
  MapPin, 
  Sparkles, 
  Car, 
  Search, 
  Utensils, 
  Check, 
  ChevronRight,
  Flame,
  Salad,
  IceCream,
  Milk,
  CupSoda
} from 'lucide-react';
import { useAppThemeLanguage } from '../context/ThemeLanguageContext';
import { openAirVenues, siteImages } from '../data/siteData';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';

export const OpenAirMallPage: React.FC = () => {
  const { language, setActiveView, t } = useAppThemeLanguage();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredVenues = openAirVenues.filter((venue) => {
    const q = searchQuery.toLowerCase();
    return (
      venue.name[language].toLowerCase().includes(q) ||
      venue.category[language].toLowerCase().includes(q) ||
      venue.description[language].toLowerCase().includes(q)
    );
  });

  const getVenueIcon = (id: string) => {
    switch (id) {
      case 'brew-district':
        return <Coffee className="w-6 h-6 text-amber-700 dark:text-amber-400" />;
      case 'green-bowl':
        return <Salad className="w-6 h-6 text-emerald-700 dark:text-emerald-400" />;
      case 'sweet-avenue':
        return <IceCream className="w-6 h-6 text-rose-700 dark:text-rose-400" />;
      case 'urban-bites':
        return <Flame className="w-6 h-6 text-orange-700 dark:text-orange-400" />;
      case 'juice-lab':
        return <CupSoda className="w-6 h-6 text-teal-700 dark:text-teal-400" />;
      default:
        return <Utensils className="w-6 h-6 text-[#8e8672]" />;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 py-6">
      
      {/* Header Banner */}
      <div className="relative rounded-3xl overflow-hidden border border-[#e2dfd8] dark:border-[#33312b] shadow-xl">
        <div className="relative h-72 sm:h-96 w-full">
          <img
            src={siteImages.openAirMall}
            alt="Open Air Mall Shubra El-Kheima"
            className="w-full h-full object-cover object-center filter brightness-[0.85] dark:brightness-[0.4]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#12110f] via-[#12110f]/70 to-transparent" />
        </div>

        {/* Header Overlay Content */}
        <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-10 text-white space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#8e8672] text-white">
              {language === 'ar' ? 'جلسات ومطاعم في الهواء الطلق' : 'Open-Air Promenade'}
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-white/20 backdrop-blur-md text-neutral-100 flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-[#acbdad]" />
              {language === 'ar' ? 'ملاصق لمنطقة الباركينج الذكي' : 'Directly Adjacent to Smart Parking'}
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black tracking-tight drop-shadow-md">
            {language === 'ar' ? 'المول المفتوح (Open Air Mall)' : 'Open Air Mall'}
          </h1>

          <p className="max-w-3xl text-sm sm:text-base text-neutral-300 font-normal leading-relaxed drop-shadow">
            {language === 'ar'
              ? 'ممشى عصري مبهج في قلب شبرا الخيمة، يجمع بين المقاهي التخصصية والمطاعم الصحية ومحلات الحلويات الفاخرة في الهواء الطلق. استمتع بأجوائك المفضلة مباشرة بعد ركن سيارتك في الباركينج الذكي الملاصق.'
              : 'A vibrant open-air lifestyle destination in central Shubra El-Kheima, combining specialty cafés, artisan salad bistros, and sweet lounges under open skies with direct connectivity to the smart parking bays.'}
          </p>
        </div>
      </div>

      {/* Proximity Callout to Smart Parking */}
      <div className="p-4 sm:p-5 rounded-2xl bg-[#acbdad]/20 dark:bg-[#acbdad]/10 border border-[#acbdad]/40 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#8e8672] text-white flex items-center justify-center shrink-0">
            <Car className="w-5 h-5" />
          </div>
          <div>
            <div className="text-sm font-bold text-[#12110f] dark:text-[#f6f6f4]">
              {language === 'ar' ? 'هل تزور المول بسيارتك؟' : 'Visiting by Car?'}
            </div>
            <div className="text-xs text-neutral-600 dark:text-neutral-400">
              {language === 'ar' 
                ? 'يمكنك فحص وحجز باكتك مسبقاً في الباركينج الذكي المجاور للمول مباشرة لتجنب البحث عن مكان ركن.'
                : 'Reserve your parking slot in the smart facility right next to the promenade before arriving.'}
            </div>
          </div>
        </div>
        <Button
          variant="secondary"
          size="sm"
          onClick={() => setActiveView('parking')}
          icon={<Car className="w-4 h-4" />}
        >
          {t('reserveSlot')}
        </Button>
      </div>

      {/* Search & Filter Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-[#e2dfd8] dark:border-[#33312b] pb-4">
        <div className="flex items-center gap-2">
          <Utensils className="w-5 h-5 text-[#8e8672]" />
          <h2 className="text-xl font-bold text-[#12110f] dark:text-[#f6f6f4]">
            {language === 'ar' ? 'الكافيهات والمطاعم المتوفرة' : 'Available Cafés & Eateries'}
          </h2>
          <Badge variant="default" size="sm">
            {filteredVenues.length} {language === 'ar' ? 'أماكن مميزة' : 'Venues'}
          </Badge>
        </div>

        {/* Search Input */}
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 absolute left-3 rtl:left-auto rtl:right-3 top-1/2 -translate-y-1/2 text-neutral-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={language === 'ar' ? 'بحث عن كافيه أو مطعم...' : 'Search for café or eatery...'}
            className="w-full pl-9 rtl:pl-4 rtl:pr-9 pr-4 py-2 rounded-xl bg-white dark:bg-[#1b1a17] border border-[#dedbd3] dark:border-[#383630] text-xs font-medium focus:outline-none focus:ring-2 focus:ring-[#8e8672]/40"
          />
        </div>
      </div>

      {/* Venues Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredVenues.map((venue, idx) => (
          <motion.div
            key={venue.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: idx * 0.08 }}
            className="p-6 rounded-3xl bg-white dark:bg-[#1b1a17] border border-[#e2dfd8] dark:border-[#33312b] shadow-card-soft dark:shadow-card-dark hover:shadow-xl hover:border-[#8e8672]/60 transition-all duration-300 flex flex-col justify-between space-y-6"
          >
            <div className="space-y-4">
              {/* Header with icon and tags */}
              <div className="flex items-start justify-between gap-3">
                <div className="w-12 h-12 rounded-2xl bg-neutral-100 dark:bg-neutral-800/80 flex items-center justify-center shrink-0 shadow-sm">
                  {getVenueIcon(venue.id)}
                </div>
                <div className="flex flex-col items-end gap-1.5 text-right rtl:items-start rtl:text-left">
                  <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold ${venue.badgeColor}`}>
                    {venue.category[language]}
                  </span>
                  <span className="text-[11px] font-medium text-neutral-500">
                    #{venue.tag}
                  </span>
                </div>
              </div>

              {/* Title & Description */}
              <div>
                <h3 className="text-xl font-bold text-[#12110f] dark:text-[#f6f6f4] tracking-tight">
                  {venue.name[language]}
                </h3>
                <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 mt-2 leading-relaxed">
                  {venue.description[language]}
                </p>
              </div>
            </div>

            {/* Operating Hours Box */}
            <div className="pt-4 border-t border-[#f0ede6] dark:border-[#2b2a26] flex items-center justify-between text-xs">
              <div className="flex items-center gap-2 text-neutral-600 dark:text-neutral-400">
                <Clock className="w-4 h-4 text-[#8e8672] shrink-0" />
                <span className="font-semibold">{t('workingHours')}:</span>
              </div>
              <span className="font-bold text-[#12110f] dark:text-[#f6f6f4] bg-neutral-100 dark:bg-neutral-800 px-2.5 py-1 rounded-lg">
                {venue.hours[language]}
              </span>
            </div>
          </motion.div>
        ))}
      </div>

    </div>
  );
};
