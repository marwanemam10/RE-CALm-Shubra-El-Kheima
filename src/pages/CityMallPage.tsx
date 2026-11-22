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
  ShoppingCart,
  ExternalLink,
  Info,
  Phone,
  MessageCircle,
  Building2,
  CheckCircle2,
  AlertCircle,
  Percent,
  X
} from 'lucide-react';
import { useAppThemeLanguage } from '../context/ThemeLanguageContext';
import { cityMallCategories, cityMallStores, siteImages } from '../data/siteData';
import { Tabs } from '../components/ui/Tabs';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { Modal } from '../components/ui/Modal';
import { CityMallStore, CityMallProduct } from '../types';

// Robust, multi-extension & multi-folder image component with graceful fallback
const SmartCatalogImage: React.FC<{
  candidates: string[];
  alt: string;
  className?: string;
}> = ({ candidates, alt, className }) => {
  const [candidateIndex, setCandidateIndex] = useState(0);
  const [hasError, setHasError] = useState(false);

  const handleError = () => {
    if (candidateIndex + 1 < candidates.length) {
      setCandidateIndex((prev) => prev + 1);
    } else {
      setHasError(true);
    }
  };

  if (hasError || candidates.length === 0) {
    return (
      <div className={`w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-neutral-100 to-neutral-200 dark:from-neutral-800 dark:to-neutral-900 text-neutral-400 p-3 text-center ${className}`}>
        <ShoppingBag className="w-8 h-8 opacity-40 mb-1" />
        <span className="text-[10px] font-bold opacity-70 line-clamp-2">{alt}</span>
      </div>
    );
  }

  return (
    <img
      src={encodeURI(candidates[candidateIndex])}
      alt={alt}
      loading="lazy"
      onError={handleError}
      className={className}
    />
  );
};

export const CityMallPage: React.FC = () => {
  const { language, t } = useAppThemeLanguage();
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCatalogStore, setSelectedCatalogStore] = useState<CityMallStore | null>(null);
  const [productSearchQuery, setProductSearchQuery] = useState('');

  const filteredStores = cityMallStores.filter((store) => {
    const matchesCategory = activeCategory === 'all' || store.category === activeCategory;
    const q = searchQuery.toLowerCase();
    return (
      matchesCategory &&
      (store.name[language].toLowerCase().includes(q) ||
        store.floor[language].toLowerCase().includes(q) ||
        store.description[language].toLowerCase().includes(q))
    );
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

  const whatsappLeasingUrl = `https://wa.me/201005558920?text=${encodeURIComponent(
    language === 'ar'
      ? 'مرحباً، أود الاستفسار عن تفاصيل وإيجار المحلات التجارية المتاحة في سيتي مول شبرا الخيمة.'
      : 'Hello, I would like to inquire about commercial shops available for rent in City Mall Shubra El-Kheima.'
  )}`;

  const formatPrice = (price: number, lang: 'ar' | 'en') => {
    const formatted = price % 1 === 0 ? price.toLocaleString() : price.toFixed(2);
    return lang === 'ar' ? `${formatted} ج.م` : `${formatted} EGP`;
  };

  // Filter products inside modal
  const modalProducts: CityMallProduct[] = (selectedCatalogStore?.products || []).filter((p) => {
    if (!productSearchQuery.trim()) return true;
    const q = productSearchQuery.toLowerCase();
    return (
      p.name[language].toLowerCase().includes(q) ||
      p.name.ar.toLowerCase().includes(q) ||
      p.name.en.toLowerCase().includes(q)
    );
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 sm:space-y-12 py-6 overflow-x-hidden">
      
      {/* 1. Header Banner */}
      <div className="relative rounded-3xl overflow-hidden border border-[#e2dfd8] dark:border-[#33312b] shadow-xl">
        <div className="relative h-64 sm:h-96 w-full">
          <img
            src={siteImages.cityMall}
            alt="City Mall Shubra El-Kheima"
            className="w-full h-full object-cover object-center filter brightness-[0.85] dark:brightness-[0.4]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#12110f] via-[#12110f]/75 to-transparent" />
        </div>

        {/* Banner Details */}
        <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-10 text-white space-y-3 sm:space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#8e8672] text-white">
              {language === 'ar' ? 'المركز التجاري الأكبر' : 'Flagship Shopping Mall'}
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-white/20 backdrop-blur-md text-white flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-[#acbdad]" />
              {language === 'ar' ? 'يومياً 10:00 ص – 12:00 منتصف الليل' : 'Daily 10:00 AM – 12:00 AM'}
            </span>
          </div>

          <h1 className="text-2xl sm:text-4xl md:text-5xl font-black tracking-tight drop-shadow-md">
            {language === 'ar' ? 'سيتي مول (City Mall)' : 'City Mall'}
          </h1>

          {/* Location & Schedule Badges Bar */}
          <div className="flex flex-wrap gap-2.5 pt-1 text-xs">
            <div className="flex items-center gap-2 px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-xl bg-white/10 backdrop-blur-md border border-white/20">
              <MapPin className="w-4 h-4 text-[#acbdad] shrink-0" />
              <span className="text-[11px] sm:text-xs">
                {language === 'ar'
                  ? 'بيجام، قسم أول شبرا الخيمة (أمام كوبري عرابي / بجوار حديقة فريال)'
                  : 'Bigam, First District of Shubra El-Kheima (In front of Orabi Bridge / Next to Ferial Garden)'}
              </span>
            </div>

            <div className="flex items-center gap-2 px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-xl bg-white/10 backdrop-blur-md border border-white/20">
              <Clock className="w-4 h-4 text-amber-300 shrink-0" />
              <span className="text-[11px] sm:text-xs">
                {language === 'ar'
                  ? 'يمتد العمل حتى 1:00 ص في عطلات نهاية الأسبوع'
                  : 'Open until 1:00 AM on weekends and holidays'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. PROMOTIONAL CARD: SHOPS AVAILABLE FOR RENT (فرصة استثمارية: محلات للإيجار) */}
      <div className="p-5 sm:p-7 rounded-3xl bg-gradient-to-br from-[#8e8672]/15 via-white dark:via-[#1c1b18] to-amber-500/10 border-2 border-[#8e8672]/30 dark:border-[#8e8672]/35 shadow-lg space-y-5">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#8e8672] text-white flex items-center gap-1.5 shadow-xs">
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                <span>{language === 'ar' ? 'فرصة استثمارية مميزة' : 'Prime Investment Opportunity'}</span>
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-500/15 text-emerald-800 dark:text-emerald-300 border border-emerald-500/25">
                {language === 'ar' ? 'متاح للحجز الفوري' : 'Available for Immediate Lease'}
              </span>
            </div>

            <h3 className="text-xl sm:text-2xl font-black text-[#12110f] dark:text-[#f6f6f4] tracking-tight">
              {language === 'ar'
                ? 'محلات تجارية ومساحات حيوية متاحة للإيجار داخل سيتي مول'
                : 'Commercial Shops & Premium Spaces Available for Rent in City Mall'}
            </h3>

            <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed max-w-3xl">
              {language === 'ar'
                ? 'اغتنم فرصة التواجد في قلب المركز التجاري الأول بشبرا الخيمة بمساحات متميزة بالدورين الثاني والثالث، مناسبة لكبرى براندات الأزياء، الكافيهات، والتوكيلات الخدمية بأعلى كثافة إقبال جماهيري أمام كوبري عرابي مباشرة مع منظومة أمنية متكاملة.'
                : 'Seize the opportunity to locate your brand in central Shubra El-Kheima with premier retail units on the 2nd & 3rd floors, ideal for fashion brands, specialty cafés, and services with peak footfall facing Orabi Bridge.'}
            </p>
          </div>

          {/* Quick Feature Badges */}
          <div className="grid grid-cols-2 gap-2 text-xs shrink-0">
            <div className="p-2.5 rounded-xl bg-white/70 dark:bg-[#23221e]/80 border border-[#dedbd3] dark:border-[#383630] flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span className="font-semibold">{language === 'ar' ? 'الدور الثاني والثالث' : '2nd & 3rd Floors'}</span>
            </div>
            <div className="p-2.5 rounded-xl bg-white/70 dark:bg-[#23221e]/80 border border-[#dedbd3] dark:border-[#383630] flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span className="font-semibold">{language === 'ar' ? 'أمن وحراسة 24/7' : '24/7 Security'}</span>
            </div>
          </div>
        </div>

        {/* Contact Action Buttons */}
        <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 border-t border-[#e2dfd8]/80 dark:border-[#33312b]/80">
          <div className="flex items-center gap-2 text-xs text-neutral-600 dark:text-neutral-400">
            <Building2 className="w-4 h-4 text-[#8e8672] shrink-0" />
            <span className="font-bold">{language === 'ar' ? 'خط التأجير وإدارة المول:' : 'Leasing Management Hotline:'}</span>
            <span className="font-mono font-black text-[#12110f] dark:text-white text-sm">0100-555-8920</span>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5">
            <a
              href="tel:01005558920"
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[#8e8672] hover:bg-[#7a7360] text-white text-xs font-bold shadow-glow-primary transition-all active:scale-95 min-h-[44px]"
            >
              <Phone className="w-4 h-4" />
              <span>{language === 'ar' ? 'اتصل للإيجار: 0100-555-8920' : 'Call Leasing: 0100-555-8920'}</span>
            </a>

            <a
              href={whatsappLeasingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-sm transition-all active:scale-95 min-h-[44px]"
            >
              <MessageCircle className="w-4 h-4" />
              <span>{language === 'ar' ? 'تواصل عبر واتساب' : 'Chat on WhatsApp'}</span>
            </a>
          </div>
        </div>
      </div>

      {/* 3. Filter Tabs & Search Controls */}
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#e2dfd8] dark:border-[#33312b] pb-6">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-[#12110f] dark:text-[#f6f6f4] flex items-center gap-2">
              <ShoppingBag className="w-6 h-6 text-[#8e8672]" />
              <span>{language === 'ar' ? 'دليل المحلات والخدمات' : 'Store Directory & Services'}</span>
            </h2>
            <p className="text-xs sm:text-sm text-neutral-500 mt-1">
              {language === 'ar'
                ? 'استعرض الأقسام وتعرف على موقع كل متجر مع عروض الخصم 20% الحصرية لفرع المول'
                : 'Browse departments and explore store locations with exclusive 20% City Mall branch offers'}
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
              className="w-full pl-9 rtl:pl-4 rtl:pr-9 pr-4 py-2.5 rounded-xl bg-white dark:bg-[#1b1a17] border border-[#dedbd3] dark:border-[#383630] text-sm focus:outline-none focus:ring-2 focus:ring-[#8e8672]/40 min-h-[44px]"
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

      {/* 4. PRICE VERIFICATION DISCLAIMER BANNER (تنويه مراجعة الأسعار والعروض) */}
      <div className="p-3.5 sm:p-4 rounded-2xl bg-amber-500/10 dark:bg-amber-500/15 border-2 border-amber-500/30 text-amber-900 dark:text-amber-200 flex items-start gap-3 text-xs sm:text-sm leading-relaxed shadow-xs">
        <AlertCircle className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
        <div>
          <span className="font-bold block mb-0.5">
            {language === 'ar' ? 'تنويه بشأن الأسعار والعروض الحالية:' : 'Price & Offers Verification Notice:'}
          </span>
          <span>
            {language === 'ar'
              ? 'تنويه: لمراجعة أسعار المنتجات والعروض الحالية، يُرجى زيارة الموقع الرسمي للمحل أو التوجه للفرع مباشرة داخل سيتي مول.'
              : 'Disclaimer: To check current product prices and offers, please visit the store\'s official website or visit the branch directly.'}
          </span>
        </div>
      </div>

      {/* 5. Stores Grid */}
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
              className="p-4 sm:p-6 rounded-2xl sm:rounded-3xl bg-white dark:bg-[#1b1a17] border border-[#e2dfd8] dark:border-[#33312b] shadow-card-soft dark:shadow-card-dark hover:shadow-xl hover:border-[#8e8672]/60 transition-all duration-300 flex flex-col justify-between space-y-5"
            >
              <div className="space-y-4">
                {/* Header info */}
                <div className="flex items-start justify-between gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center shrink-0 shadow-sm">
                    {getCategoryIcon(store.category)}
                  </div>
                  <div className="flex flex-col items-end gap-1.5 text-right rtl:items-start rtl:text-left">
                    <span className="px-2.5 py-1 rounded-lg text-xs font-bold bg-[#8e8672]/15 text-[#6c6554] dark:bg-[#8e8672]/25 dark:text-[#d0c8bd] flex items-center gap-1 shrink-0 whitespace-nowrap">
                      <Layers className="w-3.5 h-3.5" />
                      {store.floor[language]}
                    </span>
                    {store.badge && (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300 whitespace-nowrap">
                        {store.badge[language]}
                      </span>
                    )}
                  </div>
                </div>

                {/* 20% Mall Branch Discount Highlight Badge */}
                {store.hasOffer20 && (
                  <div className="pt-1">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 text-white shadow-xs">
                      <Sparkles className="w-3.5 h-3.5 text-amber-300 shrink-0" />
                      <span>{language === 'ar' ? 'خصم 20% داخل فرع المول' : '20% Mall Branch Discount'}</span>
                    </span>
                  </div>
                )}

                {/* Name & Desc */}
                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-[#12110f] dark:text-[#f6f6f4] tracking-tight">
                    {store.name[language]}
                  </h3>
                  <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 mt-2 leading-relaxed">
                    {store.description[language]}
                  </p>
                </div>
              </div>

              {/* Action Bar: View Products Button + Official Website Button */}
              <div className="pt-4 border-t border-[#f0ede6] dark:border-[#2b2a26] space-y-2.5">
                {/* 20% Offer Product Catalog Modal Button */}
                {store.hasOffer20 && store.products && store.products.length > 0 && (
                  <button
                    onClick={() => {
                      setSelectedCatalogStore(store);
                      setProductSearchQuery('');
                    }}
                    className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-700 hover:to-teal-800 text-white text-xs font-black shadow-sm transition-all active:scale-95 min-h-[44px]"
                  >
                    <Sparkles className="w-4 h-4 text-amber-300 shrink-0" />
                    <span>{language === 'ar' ? 'عرض المنتجات وخصم 20%' : 'View Products & 20% Offer'}</span>
                  </button>
                )}

                {/* Official Website Button OR Visit Branch Notice */}
                {store.websiteUrl ? (
                  <a
                    href={store.websiteUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#8e8672] hover:bg-[#7a7360] text-white text-xs font-bold shadow-glow-primary transition-all active:scale-95 min-h-[44px]"
                  >
                    <span>{language === 'ar' ? 'الموقع الرسمي' : 'Official Website'}</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                ) : (
                  <div className="w-full inline-flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl bg-neutral-100 dark:bg-neutral-800/80 border border-neutral-200/60 dark:border-neutral-700/60 text-neutral-600 dark:text-neutral-400 text-xs font-medium text-center min-h-[44px]">
                    <Store className="w-3.5 h-3.5 text-[#8e8672] shrink-0" />
                    <span>
                      {language === 'ar'
                        ? 'الموقع غير متاح - برجاء زيارة الفرع'
                        : 'Website Unavailable – Please Visit the Branch'}
                    </span>
                  </div>
                )}

                {/* Floor Info Footer */}
                <div className="flex items-center justify-between text-[11px] text-neutral-400 pt-1">
                  <span className="font-medium">
                    {language === 'ar' ? 'سيتي مول شبرا الخيمة' : 'City Mall Shubra'}
                  </span>
                  <span className="font-semibold text-neutral-600 dark:text-neutral-300">
                    {store.floor[language]}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Empty State */}
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

      {/* 6. Sleek Product Catalog Modal with 20% Discount */}
      <Modal
        isOpen={!!selectedCatalogStore}
        onClose={() => setSelectedCatalogStore(null)}
        className="w-[95vw] sm:max-w-4xl max-h-[90vh] p-3.5 sm:p-6"
        title={
          selectedCatalogStore ? (
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-[#8e8672]/20 text-[#8e8672] flex items-center justify-center shrink-0">
                <ShoppingBag className="w-4 h-4" />
              </div>
              <div>
                <span className="text-sm sm:text-base font-black block">
                  {selectedCatalogStore.name[language]}
                </span>
                <span className="text-[11px] text-neutral-500 font-normal block">
                  {language === 'ar' ? 'فرع سيتي مول شبرا الخيمة' : 'City Mall Shubra El-Kheima Branch'}
                </span>
              </div>
            </div>
          ) : ''
        }
      >
        {selectedCatalogStore && (
          <div className="space-y-4 sm:space-y-5">
            {/* 20% Offer Banner inside Modal */}
            <div className="p-3.5 sm:p-4 rounded-2xl bg-gradient-to-r from-emerald-500/15 via-amber-500/15 to-emerald-500/15 border-2 border-emerald-500/30 flex items-start sm:items-center justify-between gap-3 text-emerald-950 dark:text-emerald-100 shadow-xs">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-sm">
                  <Percent className="w-5 h-5" />
                </div>
                <div>
                  <span className="font-black text-xs sm:text-sm block">
                    {language === 'ar'
                      ? 'خصم خاص 20% على جميع هذه المنتجات عند الشراء من فرع سيتي مول'
                      : 'Exclusive 20% discount on all listed products when purchased at the City Mall branch'}
                  </span>
                  <span className="text-[11px] text-neutral-600 dark:text-neutral-300 mt-0.5 block">
                    {language === 'ar'
                      ? 'يسري هذا الخصم الحصري عند الشراء من الكاشير داخل فرع المول مباشرة'
                      : 'This exclusive discount is applied at checkout when shopping at the mall branch'}
                  </span>
                </div>
              </div>
              <div className="hidden sm:flex px-3 py-1.5 rounded-xl bg-rose-600 text-white text-xs font-black shrink-0 shadow-sm animate-pulse">
                -20% OFF
              </div>
            </div>

            {/* Product Search & Counter */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
              <div className="relative w-full sm:w-72">
                <Search className="w-4 h-4 absolute left-3 rtl:left-auto rtl:right-3 top-1/2 -translate-y-1/2 text-neutral-400" />
                <input
                  type="text"
                  value={productSearchQuery}
                  onChange={(e) => setProductSearchQuery(e.target.value)}
                  placeholder={language === 'ar' ? 'بحث في منتجات المتجر...' : 'Search products in this store...'}
                  className="w-full pl-9 rtl:pl-4 rtl:pr-9 pr-4 py-2 rounded-xl bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#8e8672]/40 min-h-[40px]"
                />
              </div>

              <div className="text-xs font-semibold text-neutral-500">
                {language === 'ar'
                  ? `عرض ${modalProducts.length} منتج متاح بالخصم`
                  : `Showing ${modalProducts.length} discounted products`}
              </div>
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2.5 sm:gap-4 max-h-[55vh] overflow-y-auto pr-1 rtl:pr-0 rtl:pl-1 scrollbar-thin">
              {modalProducts.map((product) => (
                <div
                  key={product.id}
                  className="rounded-2xl bg-white dark:bg-[#1f1e1a] border border-[#e6e4df] dark:border-[#36342e] p-2.5 sm:p-3 shadow-xs hover:shadow-md hover:border-[#8e8672]/60 transition-all duration-200 flex flex-col justify-between"
                >
                  <div>
                    {/* Image Container with -20% Pill Badge */}
                    <div className="relative aspect-square rounded-xl overflow-hidden bg-neutral-100 dark:bg-neutral-800">
                      <SmartCatalogImage
                        candidates={product.imageCandidates}
                        alt={product.name[language]}
                        className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
                      />
                      <span className="absolute top-2 left-2 rtl:left-auto rtl:right-2 z-10 px-2 py-0.5 rounded-full text-[10px] sm:text-xs font-black bg-rose-600 text-white shadow-md">
                        -20%
                      </span>
                    </div>

                    {/* Product Name */}
                    <h4 className="font-bold text-xs sm:text-sm text-[#12110f] dark:text-[#f6f6f4] leading-snug mt-2.5 line-clamp-2 min-h-[2.4rem]">
                      {product.name[language]}
                    </h4>
                  </div>

                  {/* Pricing Details */}
                  <div className="pt-2 mt-2 border-t border-neutral-100 dark:border-neutral-800/80 space-y-0.5">
                    <div className="flex items-center justify-between text-[11px] text-neutral-400">
                      <span>{language === 'ar' ? 'السعر الأصلي:' : 'Original:'}</span>
                      <span className="line-through font-semibold">
                        {formatPrice(product.originalPrice, language)}
                      </span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold text-emerald-700 dark:text-emerald-400">
                        {language === 'ar' ? 'بعد خصم 20%:' : 'After 20% Off:'}
                      </span>
                      <span className="text-xs sm:text-sm font-black text-emerald-600 dark:text-emerald-400 font-mono">
                        {formatPrice(product.discountedPrice, language)}
                      </span>
                    </div>

                    <div className="pt-1 text-[9px] text-center font-bold text-amber-700 dark:text-amber-300 bg-amber-500/10 rounded-md py-0.5">
                      {language === 'ar' ? 'حصرياً بفرع سيتي مول' : 'City Mall Exclusive'}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Empty Search inside Modal */}
            {modalProducts.length === 0 && (
              <div className="text-center py-10 text-neutral-400 space-y-2">
                <ShoppingBag className="w-10 h-10 mx-auto opacity-40" />
                <p className="text-xs font-medium">
                  {language === 'ar'
                    ? 'لم يتم العثور على منتجات مطابقة للبحث'
                    : 'No products matched your search in this store'}
                </p>
              </div>
            )}
          </div>
        )}
      </Modal>

    </div>
  );
};
