import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ShoppingBag, 
  MapPin, 
  Clock, 
  Search, 
  Tag, 
  Layers, 
  Sparkles, 
  Store,
  Compass,
  CreditCard,
  Gamepad2,
  Coffee,
  Gem,
  Tv,
  Shirt,
  ShoppingCart
} from 'lucide-react';
import { useAppThemeLanguage } from '../context/ThemeLanguageContext';
import { cityMallCategories, cityMallStores, siteImages } from '../data/siteData';
import { Tabs } from '../components/ui/Tabs';
import { Badge } from '../components/ui/Badge';
import { CityMallStore } from '../types';

export const CityMallPage: React.FC = () => {
  const { language, t } = useAppThemeLanguage();
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredStores = cityMallStores.filter((store) => {
    const matchesCategory = activeCategory === 'all' || store.category === activeCategory;
    const q = searchQuery.toLowerCase();
    const matchesSearch =
      store.name[language].toLowerCase().includes(q) ||
      store.floor[language].toLowerCase().includes(q) ||
      store.description[language].toLowerCase().includes(q);
    return matchesCategory && matchesSearch;
  });

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'supermarket':
        return <ShoppingCart className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />;
      case 'fashion':
        return <Shirt className="w-5 h-5 text-blue-600 dark:text-blue-400" />;
      case 'electronics':
        return <Tv className="w-5 h-5 text-purple-600 dark:text-purple-400" />;
      case 'jewelry':
        return <Gem className="w-5 h-5 text-amber-600 dark:text-amber-400" />;
      case 'cafes':
        return <Coffee className="w-5 h-5 text-rose-600 dark:text-rose-400" />;
      case 'entertainment':
        return <Gamepad2 className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />;
      default:
        return <Store className="w-5 h-5 text-[#8e8672]" />;
    }
  };

  const tabsData = cityMallCategories.map((cat) => ({
    id: cat.id,
    label: cat.label[language],
  }));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 py-6">
      
      {/* Header Banner */}
      <div className="relative rounded-3xl overflow-hidden border border-[#e2dfd8] dark:border-[#33312b] shadow-xl">
        <div className="relative h-72 sm:h-96 w-full">
          <img
            src={siteImages.cityMall}
            alt="City Mall Shubra El-Kheima"
            className="w-full h-full object-cover object-center filter brightness-[0.85] dark:brightness-[0.4]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#12110f] via-[#12110f]/75 to-transparent" />
        </div>

        {/* Banner Details */}
        <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-10 text-white space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#8e8672] text-white">
              {language === 'ar' ? 'المركز التجاري الأكبر' : 'Flagship Shopping Mall'}
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-white/20 backdrop-blur-md text-white flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-[#acbdad]" />
              {language === 'ar' ? 'يومياً 10:00 ص – 12:00 منتصف الليل' : 'Daily 10:00 AM – 12:00 AM'}
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black tracking-tight drop-shadow-md">
            {language === 'ar' ? 'سيتي مول (City Mall)' : 'City Mall'}
          </h1>

          {/* Location & Schedule Badges Bar */}
          <div className="flex flex-wrap gap-3 pt-1 text-xs">
            <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/10 backdrop-blur-md border border-white/20">
              <MapPin className="w-4 h-4 text-[#acbdad] shrink-0" />
              <span>
                {language === 'ar'
                  ? 'بيجام، قسم أول شبرا الخيمة، محافظة القليوبية (أمام كوبري عرابي / بجوار حديقة فريال)'
                  : 'Bigam, First District of Shubra El-Kheima, Qalyubia (In front of Orabi Bridge / Next to Ferial Garden)'}
              </span>
            </div>

            <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/10 backdrop-blur-md border border-white/20">
              <Clock className="w-4 h-4 text-amber-300 shrink-0" />
              <span>
                {language === 'ar'
                  ? 'يمتد العمل حتى 1:00 صباحاً في أيام الخميس والجمعة والعطلات'
                  : 'Extended hours until 1:00 AM on Thursdays, Fridays & Holidays'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Filter Tabs & Search Controls */}
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#e2dfd8] dark:border-[#33312b] pb-6">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-[#12110f] dark:text-[#f6f6f4] flex items-center gap-2">
              <ShoppingBag className="w-6 h-6 text-[#8e8672]" />
              <span>{language === 'ar' ? 'دليل المحلات والخدمات' : 'Store Directory & Services'}</span>
            </h2>
            <p className="text-xs sm:text-sm text-neutral-500 mt-1">
              {language === 'ar'
                ? 'استعرض الأقسام وتعرف على موقع كل علامة تجارية والدور الخاص بها'
                : 'Browse departments and discover the exact floor location of each store'}
            </p>
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 absolute left-3 rtl:left-auto rtl:right-3 top-1/2 -translate-y-1/2 text-neutral-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={language === 'ar' ? 'بحث عن متجر أو علامة تجارية...' : 'Search stores or brands...'}
              className="w-full pl-9 rtl:pl-4 rtl:pr-9 pr-4 py-2.5 rounded-xl bg-white dark:bg-[#1b1a17] border border-[#dedbd3] dark:border-[#383630] text-sm focus:outline-none focus:ring-2 focus:ring-[#8e8672]/40"
            />
          </div>
        </div>

        {/* Category Tabs */}
        <Tabs
          tabs={tabsData}
          activeTab={activeCategory}
          onChange={setActiveCategory}
        />
      </div>

      {/* Stores Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence>
          {filteredStores.map((store, idx) => (
            <motion.div
              key={store.id}
              layout
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.3, delay: idx * 0.04 }}
              className="p-6 rounded-3xl bg-white dark:bg-[#1b1a17] border border-[#e2dfd8] dark:border-[#33312b] shadow-card-soft dark:shadow-card-dark hover:shadow-xl hover:border-[#8e8672]/60 transition-all duration-300 flex flex-col justify-between space-y-5"
            >
              <div className="space-y-4">
                {/* Header info */}
                <div className="flex items-start justify-between gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center shrink-0 shadow-sm">
                    {getCategoryIcon(store.category)}
                  </div>
                  <div className="flex flex-col items-end gap-1.5 text-right rtl:items-start rtl:text-left">
                    <span className="px-2.5 py-1 rounded-lg text-xs font-bold bg-[#8e8672]/15 text-[#6c6554] dark:bg-[#8e8672]/25 dark:text-[#d0c8bd] flex items-center gap-1">
                      <Layers className="w-3.5 h-3.5" />
                      {store.floor[language]}
                    </span>
                    {store.badge && (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300">
                        {store.badge[language]}
                      </span>
                    )}
                  </div>
                </div>

                {/* Name & Desc */}
                <div>
                  <h3 className="text-xl font-bold text-[#12110f] dark:text-[#f6f6f4] tracking-tight">
                    {store.name[language]}
                  </h3>
                  <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 mt-2 leading-relaxed">
                    {store.description[language]}
                  </p>
                </div>
              </div>

              {/* Footer info */}
              <div className="pt-4 border-t border-[#f0ede6] dark:border-[#2b2a26] flex items-center justify-between text-xs text-neutral-500">
                <span className="font-semibold text-[#8e8672] dark:text-[#a8a08d]">
                  {language === 'ar' ? 'سيتي مول - شبرا الخيمة' : 'City Mall - Shubra El-Kheima'}
                </span>
                <span className="font-medium">
                  {store.floor[language]}
                </span>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {filteredStores.length === 0 && (
        <div className="text-center py-16 p-8 rounded-3xl bg-neutral-100 dark:bg-neutral-900/50 border border-[#e2dfd8] dark:border-[#33312b] space-y-3">
          <Store className="w-12 h-12 mx-auto text-neutral-400" />
          <h3 className="text-lg font-bold text-neutral-700 dark:text-neutral-300">
            {language === 'ar' ? 'لم يتم العثور على نتائج' : 'No matching stores found'}
          </h3>
          <p className="text-xs text-neutral-500">
            {language === 'ar' ? 'يرجى تجربة كلمات بحث أخرى أو تغيير القسم المحدد.' : 'Try a different search term or select another category.'}
          </p>
        </div>
      )}

    </div>
  );
};
