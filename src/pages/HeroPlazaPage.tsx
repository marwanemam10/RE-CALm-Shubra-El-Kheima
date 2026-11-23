import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Building2, 
  MapPin, 
  Clock, 
  Phone, 
  MessageCircle, 
  Copy, 
  Check, 
  Sparkles, 
  Layers, 
  Compass, 
  ShieldCheck, 
  TrendingUp, 
  Briefcase, 
  Store, 
  CheckCircle2, 
  Maximize2, 
  HardHat, 
  Car, 
  Zap, 
  ArrowUpRight
} from 'lucide-react';
import { useAppThemeLanguage } from '../context/ThemeLanguageContext';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';

export const HeroPlazaPage: React.FC = () => {
  const { language, t } = useAppThemeLanguage();
  const [copiedNumber, setCopiedNumber] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [imgSrcIndex, setImgSrcIndex] = useState(0);

  // Multi-extension & candidate filenames for Hero Plaza Mall image
  const imageCandidates = [
    '/new image/plaza mall.jpg',
    '/new image/hero plaza mall.jpg',
    '/new image/Hero Plaza Mall.png',
    '/new image/هيرو بلازا مول.jpg',
    '/new image/بلازا مول.jpg'
  ];

  const handleImageError = () => {
    if (imgSrcIndex + 1 < imageCandidates.length) {
      setImgSrcIndex((prev) => prev + 1);
    }
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  const handleCopyNumber = (num: string) => {
    navigator.clipboard.writeText(num);
    setCopiedNumber(num);
    showToast(
      language === 'ar'
        ? `تم نسخ الرقم (${num}) بنجاح`
        : `Phone number (${num}) copied successfully`
    );
    setTimeout(() => setCopiedNumber(null), 2500);
  };

  const getWhatsappUrl = (phone: string) => {
    const text = encodeURIComponent(
      language === 'ar'
        ? 'مرحباً، أود الاستفسار عن تفاصيل وحجز الوحدات التجارية/الإدارية بمشروع هيرو بلازا مول شبرا الخيمة.'
        : 'Hello, I would like to inquire about reserving commercial/administrative units at Hero Plaza Mall Shubra El-Kheima.'
    );
    return `https://wa.me/2${phone}?text=${text}`;
  };

  const salesContacts = [
    { number: '01208777754', label: { ar: 'مبيعات وحجز الوحدات (خط 1)', en: 'Sales & Leasing Line 1' } },
    { number: '01288288863', label: { ar: 'مبيعات وحجز الوحدات (خط 2)', en: 'Sales & Leasing Line 2' } }
  ];

  const features = [
    {
      icon: <MapPin className="w-6 h-6 text-amber-500" />,
      title: { ar: 'موقع استراتيجي واعد', en: 'Prime Strategic Location' },
      desc: { 
        ar: 'واجهة رئيسية بموقع حيوي في شبرا الخيمة يتمتع بأعلى كثافة سكانية وحركة مرورية على مدار اليوم.', 
        en: 'High-density commercial artery in Shubra El-Kheima ensuring continuous footfall and visibility.' 
      }
    },
    {
      icon: <Maximize2 className="w-6 h-6 text-emerald-500" />,
      title: { ar: 'مساحات تبدأ من 50 م²', en: 'Spaces from 50 m²' },
      desc: { 
        ar: 'تقسيمات داخلية هندسية مرنة تناسب مختلف الأنشطة التجارية والشركات بمساحات تبدأ من 50 م².', 
        en: 'Flexible modular layouts tailored for various retail brands and offices starting from 50 m².' 
      }
    },
    {
      icon: <TrendingUp className="w-6 h-6 text-sky-500" />,
      title: { ar: 'عائد استثماري مستدام', en: 'High Investment Yield' },
      desc: { 
        ar: 'فرصة اقتناص وحدة في مرحلة الإنشاء الأولى لضمان أعلى عائد رأسمالي وقيمة إيجارية مستقبلية.', 
        en: 'Early phase-1 acquisition guaranteeing superior capital appreciation and premium rental yield.' 
      }
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-purple-500" />,
      title: { ar: 'إدارة مرافق ذكية وأمن 24/7', en: '24/7 Smart Facility & Security' },
      desc: { 
        ar: 'منظومة مراقبة حديثة، مصاعد وسلالم كهربائية مركزية، وأنظمة إطفاء وإنذار متطورة.', 
        en: 'Central elevators, escalators, CCTV surveillance, automated firefighting and maintenance.' 
      }
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 sm:space-y-12 py-6 overflow-x-hidden">
      
      {/* 1. Header Banner & Status Badge */}
      <div className="relative rounded-3xl overflow-hidden border border-[#e2dfd8] dark:border-[#33312b] shadow-2xl bg-neutral-900">
        <div className="relative w-full aspect-video sm:aspect-[21/9] min-h-[300px]">
          <img
            src={encodeURI(imageCandidates[imgSrcIndex])}
            alt="Hero Plaza Mall — هيرو بلازا مول"
            onError={handleImageError}
            className="w-full h-full object-cover object-center filter brightness-[0.85] dark:brightness-[0.45] transition-all duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#12110f] via-[#12110f]/75 to-transparent" />
        </div>

        {/* Banner Details Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-10 text-white space-y-3 sm:space-y-4">
          <div className="flex flex-wrap items-center gap-2.5">
            {/* Status Badge: Under Construction */}
            <span className="px-3.5 py-1.5 rounded-full text-xs font-black bg-amber-500 text-black shadow-lg flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-black animate-ping" />
              <HardHat className="w-4 h-4 text-black" />
              <span>{language === 'ar' ? 'المشروع تحت الإنشاء' : 'Under Construction'}</span>
            </span>

            <span className="px-3 py-1.5 rounded-full text-xs font-bold bg-white/20 backdrop-blur-md text-white border border-white/20 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>{language === 'ar' ? 'فتح باب الحجز للمرحلة الأولى' : 'Phase 1 Bookings Open'}</span>
            </span>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-4">
            <h1 className="text-2xl sm:text-4xl md:text-5xl font-black tracking-tight drop-shadow-md">
              {language === 'ar' ? 'هيرو بلازا مول' : 'Hero Plaza Mall'}
            </h1>
            <span className="text-sm sm:text-xl font-bold text-[#acbdad] tracking-wide">
              {language === 'ar' ? 'Hero Plaza Mall' : 'هيرو بلازا مول'}
            </span>
          </div>

          <p className="max-w-3xl text-xs sm:text-base text-neutral-300 font-normal leading-relaxed drop-shadow">
            {language === 'ar'
              ? 'صرح تجاري وإداري متكامل قيد الإنشاء في شبرا الخيمة، يقدم أرقى المساحات الاستثمارية للمحلات التجارية والمكاتب الإدارية مع مرونة كاملة في التصميم والمساحات.'
              : 'A premier upcoming commercial & administrative development in Shubra El-Kheima, offering modern retail shops and executive office units with modular spaces and flexible plans.'}
          </p>

          {/* Location details */}
          <div className="flex flex-wrap items-center gap-3 pt-1 text-xs">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/10 backdrop-blur-md border border-white/15">
              <MapPin className="w-4 h-4 text-amber-400 shrink-0" />
              <span>{language === 'ar' ? 'شبرا الخيمة — موقع حيوي متميز' : 'Shubra El-Kheima — Prime Strategic Sector'}</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/10 backdrop-blur-md border border-white/15">
              <Clock className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>{language === 'ar' ? 'أعمال البناء والتشييد جارية الآن' : 'Construction Actively Underway'}</span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. PROMINENT STARTING AREA HIGHLIGHT (المساحات تبدأ من 50 متر مربع) */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-amber-500/15 via-[#8e8672]/15 to-emerald-500/10 border-2 border-amber-500/40 dark:border-amber-500/30 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2 max-w-2xl">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-black bg-amber-500 text-black shadow-xs">
              {language === 'ar' ? 'ميزة تنافسية كبرى' : 'Prime Offering'}
            </span>
            <span className="text-xs font-bold text-amber-700 dark:text-amber-300">
              {language === 'ar' ? 'مرونة هندسية كاملة' : 'Modular Spatial Design'}
            </span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-black text-[#12110f] dark:text-[#f6f6f4] tracking-tight">
            {language === 'ar' ? 'المساحات تبدأ من 50 متر مربع' : 'Spaces Starting from 50 m²'}
          </h2>

          <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed">
            {language === 'ar'
              ? 'سواء كنت تبحث عن مقر لشركتك، عيادة خاصة، أو متجر تجاري لعلامتك، يوفر هيرو بلازا مول باقات متنوعة من المساحات تبدأ من 50 م² وقابلة للدمج لتلبية كافة متطلبات رواد الأعمال والمستثمرين.'
              : 'Whether expanding your retail brand or establishing corporate offices, Hero Plaza Mall provides versatile unit layouts starting from 50 m² with customizable combining options.'}
          </p>
        </div>

        {/* Big Area Card */}
        <div className="w-full md:w-auto p-5 sm:p-6 rounded-2xl bg-white/90 dark:bg-[#1b1a17]/90 border border-amber-500/30 text-center shadow-md shrink-0 flex flex-col items-center justify-center">
          <span className="text-xs font-bold text-neutral-500 uppercase tracking-wider block">
            {language === 'ar' ? 'الحد الأدنى للمساحة' : 'Minimum Unit Size'}
          </span>
          <div className="text-4xl sm:text-5xl font-black text-amber-600 dark:text-amber-400 mt-1">
            50 <span className="text-xl sm:text-2xl font-bold">{language === 'ar' ? 'م²' : 'm²'}</span>
          </div>
          <span className="text-[11px] font-semibold text-emerald-600 dark:text-emerald-400 mt-1 block">
            {language === 'ar' ? 'محلات تجارية ومكاتب إدارية' : 'Retail Shops & Executive Offices'}
          </span>
        </div>
      </div>

      {/* 3. UNITS & SPACES OVERVIEW: Commercial vs Administrative */}
      <div className="space-y-6">
        <div className="border-b border-[#e2dfd8] dark:border-[#33312b] pb-4">
          <h2 className="text-xl sm:text-3xl font-bold text-[#12110f] dark:text-[#f6f6f4] flex items-center gap-2.5">
            <Layers className="w-6 h-6 text-[#8e8672]" />
            <span>{language === 'ar' ? 'الوحدات المتاحة للحجز والتعاقد' : 'Units Available for Lease & Ownership'}</span>
          </h2>
          <p className="text-xs sm:text-sm text-neutral-500 mt-1">
            {language === 'ar'
              ? 'اختر نوع وحدتك الاستثمارية واستفد من عروض الأسعار التمهيدية في مرحلة ما قبل الافتتاح'
              : 'Select your investment unit type and benefit from introductory pre-opening pricing'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Card 1: Commercial Shops */}
          <div className="p-6 sm:p-7 rounded-3xl bg-white dark:bg-[#1b1a17] border border-[#e2dfd8] dark:border-[#33312b] shadow-card-soft dark:shadow-card-dark hover:border-[#8e8672]/60 transition-all flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-2xl bg-amber-500/15 text-amber-600 dark:text-amber-400 flex items-center justify-center shadow-xs">
                  <Store className="w-6 h-6" />
                </div>
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-500/20 text-amber-800 dark:text-amber-300">
                  {language === 'ar' ? 'القطاع التجاري' : 'Retail Sector'}
                </span>
              </div>

              <div>
                <h3 className="text-xl sm:text-2xl font-black text-[#12110f] dark:text-[#f6f6f4]">
                  {language === 'ar' ? 'محلات تجارية (Commercial Shops)' : 'Commercial Retail Shops'}
                </h3>
                <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 mt-2 leading-relaxed">
                  {language === 'ar'
                    ? 'وحدات تجارية بمواقع استراتيجية في الأدوار الأرضية والأولى، مجهزة بواجهات زجاجية واسعة وارتفاعات مناسبة لأكبر العلامات التجارية والمطاعم والكافيهات.'
                    : 'Prime retail units positioned on ground and first levels, equipped with expansive glass frontages, optimal ceiling heights for fashion, dining, and retail.'}
                </p>
              </div>

              <div className="space-y-2 pt-2 border-t border-neutral-100 dark:border-neutral-800 text-xs">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>{language === 'ar' ? 'مساحات تبدأ من 50 م² حتى 400 م²' : 'Spaces starting from 50 m² up to 400 m²'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>{language === 'ar' ? 'مناسبة للبراندات، الكافيهات، الصيدليات، والهايبر ماركت' : 'Ideal for brands, cafés, pharmacies & supermarkets'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>{language === 'ar' ? 'واجهات زجاجية عصرية ومسارات مشاة حيوية' : 'Modern glass facades with high pedestrian visibility'}</span>
                </div>
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-neutral-100 dark:bg-neutral-800/80 text-xs font-semibold text-neutral-600 dark:text-neutral-300 flex items-center justify-between">
              <span>{language === 'ar' ? 'حالة الحجز:' : 'Status:'}</span>
              <span className="text-emerald-600 dark:text-emerald-400 font-bold">
                {language === 'ar' ? 'متاح للحجز الفوري' : 'Open for Immediate Booking'}
              </span>
            </div>
          </div>

          {/* Card 2: Administrative Offices */}
          <div className="p-6 sm:p-7 rounded-3xl bg-white dark:bg-[#1b1a17] border border-[#e2dfd8] dark:border-[#33312b] shadow-card-soft dark:shadow-card-dark hover:border-[#8e8672]/60 transition-all flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-2xl bg-sky-500/15 text-sky-600 dark:text-sky-400 flex items-center justify-center shadow-xs">
                  <Briefcase className="w-6 h-6" />
                </div>
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-sky-500/20 text-sky-800 dark:text-sky-300">
                  {language === 'ar' ? 'القطاع الإداري' : 'Administrative Sector'}
                </span>
              </div>

              <div>
                <h3 className="text-xl sm:text-2xl font-black text-[#12110f] dark:text-[#f6f6f4]">
                  {language === 'ar' ? 'مكاتب إدارية (Administrative Offices)' : 'Executive Administrative Offices'}
                </h3>
                <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 mt-2 leading-relaxed">
                  {language === 'ar'
                    ? 'بيئة عمل راقية تلبي متطلبات الشركات، العيادات والمكاتب الاستشارية مع مدخل خاص ومصاعد سريعة وخدمات أمنية وتكنولوجية متكاملة.'
                    : 'A sophisticated work environment catering to corporations, clinics, and consultancies with executive entrance, high-speed elevators, and smart IT infrastructure.'}
                </p>
              </div>

              <div className="space-y-2 pt-2 border-t border-neutral-100 dark:border-neutral-800 text-xs">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>{language === 'ar' ? 'مساحات تبدأ من 50 م² وقابلة للتوسيع' : 'Spaces starting from 50 m² with expansion flexibility'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>{language === 'ar' ? 'مناسبة لمقرات الشركات، المكاتب الهندسية، والعيادات' : 'Ideal for headquarters, consultancies & private clinics'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>{language === 'ar' ? 'زجاج عازل للصوت وشبكات اتصالات وإنترنت فايبر' : 'Soundproof double-glazing with high-speed fiber internet'}</span>
                </div>
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-neutral-100 dark:bg-neutral-800/80 text-xs font-semibold text-neutral-600 dark:text-neutral-300 flex items-center justify-between">
              <span>{language === 'ar' ? 'حالة الحجز:' : 'Status:'}</span>
              <span className="text-emerald-600 dark:text-emerald-400 font-bold">
                {language === 'ar' ? 'متاح للحجز الفوري' : 'Open for Immediate Booking'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 4. KEY PROJECT ADVANTAGES & FACILITIES */}
      <div className="space-y-6">
        <div className="border-b border-[#e2dfd8] dark:border-[#33312b] pb-4">
          <h2 className="text-xl sm:text-2xl font-bold text-[#12110f] dark:text-[#f6f6f4] flex items-center gap-2.5">
            <Sparkles className="w-5 h-5 text-amber-500" />
            <span>{language === 'ar' ? 'مزايا وخدمات هيرو بلازا مول' : 'Key Advantages & Amenities'}</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {features.map((feat, idx) => (
            <div
              key={idx}
              className="p-5 rounded-2xl bg-white dark:bg-[#1b1a17] border border-[#e2dfd8] dark:border-[#33312b] space-y-3 hover:border-[#8e8672]/60 transition-all shadow-xs"
            >
              <div className="w-10 h-10 rounded-xl bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center">
                {feat.icon}
              </div>
              <h4 className="font-bold text-sm text-[#12110f] dark:text-[#f6f6f4]">
                {feat.title[language]}
              </h4>
              <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                {feat.desc[language]}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* 5. DIRECT SALES & BOOKING CONTACT CARD (احجز وحدتك الآن) */}
      <div className="p-6 sm:p-10 rounded-3xl bg-gradient-to-br from-[#1b1a17] via-[#23221e] to-[#12110f] text-white border-2 border-amber-500/50 shadow-2xl space-y-6">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="px-3.5 py-1.5 rounded-full text-xs font-black bg-amber-500 text-black shadow-md inline-block">
            {language === 'ar' ? 'فريق المبيعات والتعاقدات' : 'Official Sales & Booking Department'}
          </span>
          <h2 className="text-2xl sm:text-4xl font-black tracking-tight">
            {language === 'ar' ? 'احجز وحدتك الآن في هيرو بلازا مول' : 'Reserve Your Unit in Hero Plaza Mall Today'}
          </h2>
          <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
            {language === 'ar'
              ? 'للحجز والاستفسار عن المحلات التجارية والمكاتب الإدارية، تواصل معنا مباشرة على الأرقام التالية:'
              : 'To reserve commercial shops or administrative offices, contact our sales team directly on the numbers below:'}
          </p>
        </div>

        {/* Sales Numbers Contact Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-3xl mx-auto pt-2">
          {salesContacts.map((contact, idx) => {
            const isCopied = copiedNumber === contact.number;
            return (
              <div
                key={idx}
                className="p-5 sm:p-6 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 hover:border-amber-400/60 transition-all flex flex-col justify-between space-y-4"
              >
                <div>
                  <span className="text-xs font-semibold text-amber-300 block">
                    {contact.label[language]}
                  </span>
                  <div className="flex items-center justify-between mt-1">
                    <span className="font-mono text-xl sm:text-2xl font-black tracking-wider text-white">
                      {contact.number}
                    </span>
                    <button
                      onClick={() => handleCopyNumber(contact.number)}
                      title={language === 'ar' ? 'نسخ الرقم' : 'Copy Number'}
                      className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-neutral-200 transition-colors"
                    >
                      {isCopied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* Call and WhatsApp Action Buttons */}
                <div className="grid grid-cols-2 gap-2 pt-2 border-t border-white/15">
                  <a
                    href={`tel:${contact.number}`}
                    className="inline-flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-black font-bold text-xs sm:text-sm shadow-sm transition-all active:scale-95 min-h-[48px]"
                  >
                    <Phone className="w-4 h-4" />
                    <span>{language === 'ar' ? 'اتصال هاتفياً' : 'Call Now'}</span>
                  </a>

                  <a
                    href={getWhatsappUrl(contact.number)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm shadow-sm transition-all active:scale-95 min-h-[48px]"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>{language === 'ar' ? 'واتساب' : 'WhatsApp'}</span>
                  </a>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Note */}
        <div className="text-center text-[11px] text-neutral-400 pt-2 border-t border-white/10">
          <span>
            {language === 'ar'
              ? 'متاح الرد على جميع الاستفسارات وتقديم خطط السداد والدفع على مدار اليوم.'
              : 'Our sales representatives are available daily to assist with inquiries and tailored payment schedules.'}
          </span>
        </div>
      </div>

      {/* Floating Interactive Toast Feedback */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.95 }}
            className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 px-5 py-3 rounded-2xl bg-[#1b1a17] text-white border border-amber-500/60 shadow-2xl flex items-center gap-3 text-xs sm:text-sm font-bold max-w-[90vw]"
          >
            <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
};
