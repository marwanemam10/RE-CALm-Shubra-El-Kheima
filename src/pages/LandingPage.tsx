import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Building2, 
  ArrowUpRight, 
  Compass, 
  Sparkles, 
  MapPin, 
  Layers, 
  Coffee, 
  ShoppingBag, 
  Stethoscope, 
  Bus, 
  Car, 
  CheckCircle2, 
  ChevronRight, 
  ChevronLeft,
  MessageSquarePlus,
  Megaphone,
  Send,
  Lightbulb,
  AlertTriangle,
  User,
  Phone,
  MessageSquare,
  Check
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useAppThemeLanguage } from '../context/ThemeLanguageContext';
import { hubDestinations, heroStats, siteImages } from '../data/siteData';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { NavView } from '../types';

export const LandingPage: React.FC = () => {
  const { language, setActiveView, t } = useAppThemeLanguage();

  // Feedback Form State
  const [feedbackType, setFeedbackType] = useState<'suggestion' | 'complaint'>('suggestion');
  const [fullName, setFullName] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [feedbackMessage, setFeedbackMessage] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formErrors, setFormErrors] = useState<{ name?: string; mobile?: string; message?: string }>({});
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const handleCardClick = (id: string) => {
    setActiveView(id as NavView);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const getDestinationIcon = (id: string) => {
    switch (id) {
      case 'open-air-mall':
        return <Coffee className="w-6 h-6" />;
      case 'city-mall':
        return <ShoppingBag className="w-6 h-6" />;
      case 'doctors-tower':
        return <Stethoscope className="w-6 h-6" />;
      case 'transport':
        return <Bus className="w-6 h-6" />;
      case 'parking':
        return <Car className="w-6 h-6" />;
      case 'hero-plaza':
        return <Building2 className="w-6 h-6 text-amber-500" />;
      default:
        return <Building2 className="w-6 h-6" />;
    }
  };

  const ArrowIcon = language === 'ar' ? ChevronLeft : ChevronRight;

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  const handleFeedbackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errors: { name?: string; mobile?: string; message?: string } = {};

    if (!fullName.trim()) {
      errors.name = language === 'ar' ? 'يرجى إدخال الاسم بالكامل' : 'Please enter your full name';
    }

    if (!mobileNumber.trim()) {
      errors.mobile = language === 'ar' ? 'يرجى إدخال رقم الموبايل' : 'Please enter your mobile number';
    } else if (mobileNumber.trim().length < 10) {
      errors.mobile = language === 'ar' ? 'يرجى إدخال رقم هاتف صحيح' : 'Please enter a valid phone number';
    }

    if (!feedbackMessage.trim()) {
      errors.message = language === 'ar' ? 'يرجى كتابة تفاصيل المقترح أو الشكوى' : 'Please enter the details';
    } else if (feedbackMessage.trim().length < 8) {
      errors.message = language === 'ar' ? 'يرجى كتابة تفاصيل كافية (8 أحرف على الأقل)' : 'Please provide at least 8 characters';
    }

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setFormErrors({});
    setIsSubmitted(true);

    try {
      confetti({
        particleCount: 55,
        spread: 65,
        origin: { y: 0.7 }
      });
    } catch (err) {
      // safe fallback
    }

    const successMsg = language === 'ar'
      ? 'تم استلام رسالتك بنجاح! شكراً لمساهمتك في تطوير شبرا الخيمة'
      : 'Your message has been received! Thank you for contributing to Shubra El-Kheima’s development';
    
    showToast(successMsg);
  };

  const handleResetForm = () => {
    setFullName('');
    setMobileNumber('');
    setFeedbackMessage('');
    setFeedbackType('suggestion');
    setIsSubmitted(false);
    setFormErrors({});
  };

  return (
    <div className="space-y-16 lg:space-y-24">
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-3xl mx-4 sm:mx-6 lg:mx-8 mt-4 border border-[#e2dfd8] dark:border-[#33312b] shadow-2xl">
        {/* Background Image with Architectural Overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src={siteImages.hero}
            alt="Shubra El-Kheima Redevelopment"
            className="w-full h-full object-cover object-center filter brightness-[0.88] dark:brightness-[0.45] scale-105 transform hover:scale-100 transition-transform duration-1000 ease-out"
          />
          {/* Gradients and Architectural Grid Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#12110f] via-[#12110f]/75 to-transparent dark:from-[#12110f] dark:via-[#12110f]/85" />
          <div className="absolute inset-0 architectural-grid opacity-30 mix-blend-overlay pointer-events-none" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-5xl mx-auto px-6 py-20 sm:py-28 lg:py-32 text-center text-white space-y-8">
          
          <motion.div
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 dark:bg-black/30 backdrop-blur-md border border-white/20 text-xs sm:text-sm font-semibold tracking-wide text-neutral-200"
          >
            <Sparkles className="w-4 h-4 text-[#acbdad]" />
            <span>
              {language === 'ar' 
                ? 'مشروع RE-CALm للتطوير العمراني الذكي | شبرا الخيمة' 
                : 'RE-CALm Smart Urban Hub | Shubra El-Kheima'}
            </span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="space-y-4"
          >
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight leading-tight sm:leading-none text-white drop-shadow-md">
              RE-CALm <span className="text-[#acbdad]">{language === 'ar' ? 'شبرا الخيمة' : 'Shubra El-Kheima'}</span>
            </h1>

            <p className="max-w-3xl mx-auto text-base sm:text-lg lg:text-xl text-neutral-300 font-normal leading-relaxed drop-shadow">
              {language === 'ar'
                ? 'إعادة صياغة المشهد الحضري لمنطقة شبرا الخيمة عبر نموذج متطور يدمج بين التسوق الفاخر، الكافيهات المفتوحة، الرعاية الطبية الفائقة، تنظيم خطوط المواصلات العامة، وتوفير باركينج ذكي بحساسات فورية.'
                : 'Redefining the urban landscape of Shubra El-Kheima through an integrated masterplan uniting modern retail, open-air promenade dining, state-of-the-art medical towers, streamlined public transit, and smart IoT parking.'}
            </p>
          </motion.div>

          {/* Quick Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="flex flex-wrap items-center justify-center gap-4 pt-2"
          >
            <Button
              size="lg"
              variant="accent"
              onClick={() => {
                const el = document.getElementById('destinations-section');
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
              icon={<Compass className="w-5 h-5" />}
            >
              {t('exploreHub')}
            </Button>

            <Button
              size="lg"
              variant="secondary"
              className="bg-white/20 hover:bg-white/30 text-white border-white/30"
              onClick={() => handleCardClick('parking')}
              icon={<Car className="w-5 h-5" />}
            >
              {t('engineeringSimulation')}
            </Button>

            <Button
              size="lg"
              variant="outline"
              className="bg-white/10 hover:bg-white/20 text-white border-white/30"
              onClick={() => {
                const el = document.getElementById('suggestions-section');
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
              icon={<MessageSquarePlus className="w-5 h-5" />}
            >
              {language === 'ar' ? 'المقترحات والشكاوى' : 'Suggestions & Complaints'}
            </Button>
          </motion.div>

          {/* Stats Badges Grid */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-8 border-t border-white/15"
          >
            {heroStats[language].map((stat, idx) => (
              <div 
                key={idx}
                className="p-4 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 hover:bg-white/10 transition-colors"
              >
                <div className="text-2xl sm:text-3xl font-extrabold text-[#acbdad] tracking-tight">
                  {stat.value}
                </div>
                <div className="text-xs sm:text-sm font-semibold text-white mt-1">
                  {stat.label}
                </div>
                <div className="text-[11px] text-neutral-400 mt-0.5 line-clamp-1">
                  {stat.desc}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Destinations Section Header */}
      <section id="destinations-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 sm:space-y-12">
        {/* Clickable Geographic Anchor Pill */}
        <div className="flex justify-center mb-2 sm:mb-4">
          <a
            href="https://maps.app.goo.gl/46KKQGAUUDYkhuxR6"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium border border-stone-200/80 dark:border-white/15 bg-white/80 dark:bg-white/5 hover:bg-stone-100 dark:hover:bg-white/10 text-neutral-800 dark:text-neutral-200 shadow-sm transition-all hover:scale-105 active:scale-95 group"
          >
            <MapPin className="w-4 h-4 text-emerald-600 dark:text-emerald-400 group-hover:scale-110 transition-transform shrink-0" />
            <span>{language === 'ar' ? 'الموقع • شبرا الخيمة' : 'Location • Shubra El-Kheima'}</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-neutral-400 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors shrink-0" />
          </a>
        </div>

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#e2dfd8] dark:border-[#33312b] pb-6">
          <div className="space-y-2 max-w-2xl">
            <div className="flex items-center gap-2">
              <Badge variant="accent">
                {language === 'ar' ? '6 وجهات استراتيجية ومشاريع واعدة' : '6 Strategic Hubs & Developments'}
              </Badge>
              <span className="text-xs font-semibold text-neutral-500">
                {language === 'ar' ? 'نظام متكامل' : 'Integrated Ecosystem'}
              </span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-[#12110f] dark:text-[#f6f6f4] tracking-tight">
              {language === 'ar' ? 'استكشف محاور التطوير الرئيسية' : 'Explore the Core Development Pillars'}
            </h2>
            <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
              {language === 'ar'
                ? 'اضغط على أي وجهة لاستعراض تفاصيلها، المتاجر والمطاعم، جداول الأطباء ومواعيد النقل، أو اختبار نظام حجز المواقف الذكي.'
                : 'Click any destination card to inspect its venues, medical rosters, transit routes, or interact with the smart parking simulation.'}
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs font-semibold text-[#8e8672] dark:text-[#a8a08d]">
            <MapPin className="w-4 h-4" />
            <span>
              {language === 'ar' ? 'نطاق ميدان وكوبري عرابي ومساكن إسكو' : 'Orabi Bridge & Esco Vicinity'}
            </span>
          </div>
        </div>

        {/* 5 Destination Interactive Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {hubDestinations.map((dest, idx) => {
            const isLarge = idx === 0 || idx === 1;
            return (
              <motion.div
                key={dest.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                whileHover={{ y: -8 }}
                onClick={() => handleCardClick(dest.id)}
                className={`group relative cursor-pointer rounded-3xl overflow-hidden bg-white dark:bg-[#1b1a17] border border-[#e2dfd8] dark:border-[#33312b] shadow-card-soft dark:shadow-card-dark transition-all duration-300 hover:shadow-xl hover:border-[#8e8672]/60 dark:hover:border-[#8e8672]/60 flex flex-col justify-between ${
                  isLarge && idx === 0 ? 'lg:col-span-1' : ''
                }`}
              >
                {/* Image Container with Hover Zoom */}
                <div className="relative h-56 sm:h-64 w-full overflow-hidden bg-neutral-200 dark:bg-neutral-800">
                  <img
                    src={dest.image}
                    alt={dest.title[language]}
                    onError={(e) => {
                      if (dest.id === 'hero-plaza') {
                        const target = e.currentTarget;
                        if (!target.src.includes('plaza%20mall.jpg') && !target.src.includes('plaza mall.jpg')) {
                          target.src = '/new image/plaza mall.jpg';
                        } else if (!target.src.includes('hero%20plaza%20mall.jpg')) {
                          target.src = '/new image/hero plaza mall.jpg';
                        }
                      }
                    }}
                    className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                  
                  {/* Top Badge */}
                  <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                    {dest.id === 'hero-plaza' ? (
                      <span className="px-3 py-1 rounded-full text-xs font-black bg-amber-500 text-black backdrop-blur-md shadow-md flex items-center gap-1.5 animate-pulse">
                        <span className="w-2 h-2 rounded-full bg-black animate-ping" />
                        {language === 'ar' ? 'تحت الإنشاء' : 'Under Construction'}
                      </span>
                    ) : (
                      <span className="px-3 py-1 rounded-full text-xs font-bold bg-white/90 dark:bg-black/80 text-[#12110f] dark:text-white backdrop-blur-md shadow-sm">
                        {dest.tag[language]}
                      </span>
                    )}
                    <div className="w-10 h-10 rounded-full bg-white/90 dark:bg-[#1b1a17]/90 text-[#8e8672] flex items-center justify-center shadow-md backdrop-blur-md group-hover:bg-[#8e8672] group-hover:text-white transition-colors duration-300">
                      {getDestinationIcon(dest.id)}
                    </div>
                  </div>

                  {/* Bottom Text Over Image */}
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <h3 className="text-xl sm:text-2xl font-bold tracking-tight drop-shadow-md">
                      {dest.title[language]}
                    </h3>
                    <p className="text-xs font-medium text-[#acbdad] mt-0.5 line-clamp-1">
                      {dest.subtitle[language]}
                    </p>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <p className="text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed line-clamp-3">
                    {dest.desc[language]}
                  </p>

                  <div className="pt-4 border-t border-[#f0ede6] dark:border-[#2b2a26] flex items-center justify-between">
                    <span className="text-xs font-bold text-[#8e8672] dark:text-[#a8a08d] group-hover:underline">
                      {language === 'ar' ? 'عرض التفاصيل والخدمات' : 'Explore Hub View'}
                    </span>
                    <div className="w-8 h-8 rounded-full bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center text-neutral-600 dark:text-neutral-300 group-hover:bg-[#8e8672] group-hover:text-white transition-all">
                      <ArrowIcon className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Engineering Vision & Urban Integration Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl p-8 sm:p-12 overflow-hidden bg-gradient-to-br from-[#8e8672]/15 via-[#acbdad]/20 to-[#90a69c]/15 border border-[#8e8672]/30 dark:border-[#8e8672]/20">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
            
            <div className="lg:col-span-2 space-y-4">
              <Badge variant="emerald">
                {language === 'ar' ? 'مبادرة هندسية معمارية شاملة' : 'Comprehensive Architectural Initiative'}
              </Badge>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-[#12110f] dark:text-[#f6f6f4] tracking-tight">
                {language === 'ar' 
                  ? 'منطقة حضرية ذكية متكاملة تصنع الفارق لشباب وأسر شبرا الخيمة'
                  : 'A Smart Urban Hub Delivering Concrete Value to Shubra El-Kheima'}
              </h3>
              <p className="text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed">
                {language === 'ar'
                  ? 'تم تصميم هذا المشروع ليقضي على التكدس المروري العشوائي، ويوفر مساحات ترفيهية عائلية لائقة، مع ربط مراكز التسوق بالمجمع الطبي ومواقف الأتوبيسات من خلال شبكة مواقف ذكية مؤتمتة.'
                  : 'Designed to eliminate disorganized street congestion, provide premium family recreation spaces, and bridge retail with medical facilities and transit stations via automated parking sensors.'}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div className="flex items-center gap-2.5 text-xs font-semibold text-neutral-800 dark:text-neutral-200">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                  <span>{language === 'ar' ? 'تنظيم حارات الركن والحد من الانتظار المزدوج' : 'Streamlined parking lanes & zero double parking'}</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs font-semibold text-neutral-800 dark:text-neutral-200">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                  <span>{language === 'ar' ? 'ممشى مشاة آمن بين المول والعيادات والمحطة' : 'Pedestrian walkways connecting all facilities'}</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs font-semibold text-neutral-800 dark:text-neutral-200">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                  <span>{language === 'ar' ? 'جداول انطلاق منتظمة للأتوبيسات كل 15 دقيقة' : 'Consistent 15-minute public bus departure cycles'}</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs font-semibold text-neutral-800 dark:text-neutral-200">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                  <span>{language === 'ar' ? 'خدمات طبية وتجارية متكاملة بضغطة زر' : 'Accessible medical rosters and store locators'}</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col items-center justify-center p-6 rounded-2xl bg-white/80 dark:bg-[#1b1a17]/90 backdrop-blur-md border border-[#e2dfd8] dark:border-[#383630] text-center space-y-4">
              <div className="w-16 h-16 rounded-2xl bg-[#8e8672]/20 flex items-center justify-center text-[#8e8672] dark:text-[#a8a08d]">
                <Layers className="w-8 h-8" />
              </div>
              <div>
                <div className="text-lg font-bold text-[#12110f] dark:text-white">
                  {language === 'ar' ? 'جرّب الباركينج الذكي الآن' : 'Test Smart Parking Now'}
                </div>
                <p className="text-xs text-neutral-500 mt-1">
                  {language === 'ar' ? 'اضغط لحجز باكتك واختبار المحاكاة اللحظية' : 'Reserve a slot & interact with the live layout'}
                </p>
              </div>
              <Button
                variant="primary"
                className="w-full"
                onClick={() => handleCardClick('parking')}
                icon={<ArrowUpRight className="w-4 h-4" />}
              >
                {t('reserveSlot')}
              </Button>
            </div>

          </div>
        </div>
      </section>

      {/* NEW FEATURE: Suggestions & Complaints Section (المقترحات والشكاوى) */}
      <section id="suggestions-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="rounded-3xl p-6 sm:p-10 lg:p-12 bg-white dark:bg-[#1b1a17] border-2 border-[#8e8672]/30 dark:border-[#8e8672]/20 shadow-xl overflow-hidden relative"
        >
          {/* Subtle architectural background decoration */}
          <div className="absolute -top-16 -right-16 w-64 h-64 bg-[#acbdad]/10 dark:bg-[#acbdad]/5 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-16 -left-16 w-64 h-64 bg-[#8e8672]/10 dark:bg-[#8e8672]/5 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start relative z-10">
            
            {/* Left Header / Overview */}
            <div className="lg:col-span-5 space-y-4">
              <div className="flex items-center gap-2">
                <Badge variant="accent">
                  {language === 'ar' ? 'صوت المواطن والمستفيد' : 'Citizen & Community Voice'}
                </Badge>
                <span className="text-xs font-semibold text-neutral-500">
                  {language === 'ar' ? 'تفاعل ومشاركة مستمرة' : 'Direct Engagement'}
                </span>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-[#8e8672]/20 text-[#8e8672] dark:text-[#a8a08d] flex items-center justify-center shrink-0 shadow-sm">
                  <MessageSquarePlus className="w-6 h-6" />
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-[#12110f] dark:text-[#f6f6f4] tracking-tight">
                  {language === 'ar' ? 'المقترحات والشكاوى' : 'Suggestions & Complaints'}
                </h2>
              </div>

              <p className="text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed">
                {language === 'ar'
                  ? 'رأيك يصنع الفرق! شاركنا أفكارك ومقترحاتك لتطوير مشروع RE-CALm بشبرا الخيمة، أو أبلغنا عن أي مشكلة أو ملاحظة لسرعة تداركها والارتقاء بجودة الخدمات في المرافق.'
                  : 'Your voice matters! Share your innovative suggestions or report any concerns regarding RE-CALm facilities and urban services to help us continuously elevate quality standards.'}
              </p>

              {/* Informative Highlights */}
              <div className="space-y-3 pt-2">
                <div className="p-3.5 rounded-2xl bg-neutral-50 dark:bg-neutral-800/60 border border-neutral-200/60 dark:border-neutral-700/60 flex items-center gap-3 text-xs">
                  <div className="w-8 h-8 rounded-xl bg-amber-500/20 text-amber-600 dark:text-amber-300 flex items-center justify-center shrink-0">
                    <Lightbulb className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-bold text-[#12110f] dark:text-white block">
                      {language === 'ar' ? 'تقديم فكرة أو مقترح' : 'Submit an Idea or Suggestion'}
                    </span>
                    <span className="text-neutral-500">
                      {language === 'ar' ? 'أفكار لمسارات الأتوبيسات، فعاليات المول، أو خدمات الباركينج.' : 'Ideas for transit lines, mall activities, or parking enhancements.'}
                    </span>
                  </div>
                </div>

                <div className="p-3.5 rounded-2xl bg-neutral-50 dark:bg-neutral-800/60 border border-neutral-200/60 dark:border-neutral-700/60 flex items-center gap-3 text-xs">
                  <div className="w-8 h-8 rounded-xl bg-rose-500/20 text-rose-600 dark:text-rose-300 flex items-center justify-center shrink-0">
                    <AlertTriangle className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-bold text-[#12110f] dark:text-white block">
                      {language === 'ar' ? 'تسجيل شكوى أو ملاحظة' : 'Report an Issue or Complaint'}
                    </span>
                    <span className="text-neutral-500">
                      {language === 'ar' ? 'ملاحظات النظافة، الانتظار، أو تنظيم حركة السير.' : 'Notes on cleanliness, lane queuing, or traffic movement.'}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Interactive Form / Submission Success View */}
            <div className="lg:col-span-7">
              <div className="p-6 sm:p-8 rounded-2xl bg-[#faf9f6] dark:bg-[#201f1b] border border-[#e2dfd8] dark:border-[#33312b] shadow-sm">
                
                <AnimatePresence mode="wait">
                  {isSubmitted ? (
                    <motion.div
                      key="success-message"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.35 }}
                      className="text-center py-8 space-y-4"
                    >
                      <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto shadow-sm">
                        <Check className="w-8 h-8 stroke-[3]" />
                      </div>

                      <div className="space-y-2">
                        <h3 className="text-xl font-extrabold text-[#12110f] dark:text-white">
                          {language === 'ar' ? 'تم استلام رسالتك بنجاح!' : 'Message Received Successfully!'}
                        </h3>
                        <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 max-w-md mx-auto leading-relaxed">
                          {language === 'ar'
                            ? 'شكراً جزيلاً لمساهمتك القيمة في تطوير وتحسين شبرا الخيمة. تم توجيه رسالتك إلى إدارة مشروع RE-CALm للمراجعة والمتابعة.'
                            : 'Thank you for your valuable contribution to developing and improving Shubra El-Kheima. Your message has been forwarded to the RE-CALm project team for review.'}
                        </p>
                      </div>

                      {/* Ticket Badge */}
                      <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-700 dark:text-emerald-300 text-xs font-bold">
                        <span>{language === 'ar' ? 'رقم المتابعة المرجعي:' : 'Reference Ticket:'}</span>
                        <span className="font-mono tracking-wider">#RC-{Math.floor(10000 + Math.random() * 90000)}</span>
                      </div>

                      <div className="pt-4">
                        <Button
                          variant="secondary"
                          size="md"
                          onClick={handleResetForm}
                        >
                          {language === 'ar' ? 'إرسال مقترح أو شكوى جديدة' : 'Submit Another Message'}
                        </Button>
                      </div>
                    </motion.div>
                  ) : (
                    <motion.form
                      key="active-form"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      onSubmit={handleFeedbackSubmit}
                      className="space-y-5"
                    >
                      {/* Step 1: Type Selection (Toggle) */}
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-neutral-600 dark:text-neutral-400 mb-2">
                          {language === 'ar' ? 'نوع الرسالة:' : 'Feedback Type:'}
                        </label>
                        <div className="grid grid-cols-2 gap-3">
                          <button
                            type="button"
                            onClick={() => setFeedbackType('suggestion')}
                            className={`flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs sm:text-sm font-bold border transition-all ${
                              feedbackType === 'suggestion'
                                ? 'bg-[#8e8672] text-white border-[#8e8672] shadow-sm'
                                : 'bg-white dark:bg-[#1b1a17] text-neutral-700 dark:text-neutral-300 border-[#dedbd3] dark:border-[#383630] hover:bg-neutral-100 dark:hover:bg-neutral-800'
                            }`}
                          >
                            <Lightbulb className="w-4 h-4" />
                            <span>{language === 'ar' ? 'مقترح تطوير' : 'Suggestion'}</span>
                          </button>

                          <button
                            type="button"
                            onClick={() => setFeedbackType('complaint')}
                            className={`flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs sm:text-sm font-bold border transition-all ${
                              feedbackType === 'complaint'
                                ? 'bg-rose-600 text-white border-rose-600 shadow-sm'
                                : 'bg-white dark:bg-[#1b1a17] text-neutral-700 dark:text-neutral-300 border-[#dedbd3] dark:border-[#383630] hover:bg-neutral-100 dark:hover:bg-neutral-800'
                            }`}
                          >
                            <AlertTriangle className="w-4 h-4" />
                            <span>{language === 'ar' ? 'شكوى أو ملاحظة' : 'Complaint'}</span>
                          </button>
                        </div>
                      </div>

                      {/* Inputs Grid: Name & Mobile */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {/* Full Name */}
                        <div>
                          <label className="block text-xs font-bold text-neutral-700 dark:text-neutral-300 mb-1.5">
                            {language === 'ar' ? 'الاسم بالكامل *' : 'Full Name *'}
                          </label>
                          <div className="relative">
                            <User className="w-4 h-4 absolute left-3 rtl:left-auto rtl:right-3 top-1/2 -translate-y-1/2 text-neutral-400" />
                            <input
                              type="text"
                              value={fullName}
                              onChange={(e) => {
                                setFullName(e.target.value);
                                if (formErrors.name) setFormErrors({ ...formErrors, name: undefined });
                              }}
                              placeholder={language === 'ar' ? 'اكتب اسمك الثلاثي...' : 'Your full name...'}
                              className={`w-full pl-9 rtl:pl-4 rtl:pr-9 pr-4 py-2.5 rounded-xl bg-white dark:bg-[#1b1a17] border text-sm focus:outline-none focus:ring-2 focus:ring-[#8e8672]/40 ${
                                formErrors.name
                                  ? 'border-rose-500 focus:ring-rose-400/40'
                                  : 'border-[#dedbd3] dark:border-[#383630]'
                              }`}
                            />
                          </div>
                          {formErrors.name && (
                            <span className="text-[11px] text-rose-500 mt-1 block">
                              {formErrors.name}
                            </span>
                          )}
                        </div>

                        {/* Mobile Number */}
                        <div>
                          <label className="block text-xs font-bold text-neutral-700 dark:text-neutral-300 mb-1.5">
                            {language === 'ar' ? 'رقم الموبايل *' : 'Mobile Number *'}
                          </label>
                          <div className="relative">
                            <Phone className="w-4 h-4 absolute left-3 rtl:left-auto rtl:right-3 top-1/2 -translate-y-1/2 text-neutral-400" />
                            <input
                              type="tel"
                              value={mobileNumber}
                              onChange={(e) => {
                                setMobileNumber(e.target.value);
                                if (formErrors.mobile) setFormErrors({ ...formErrors, mobile: undefined });
                              }}
                              placeholder={language === 'ar' ? '01xxxxxxxxx' : '01xxxxxxxxx'}
                              className={`w-full pl-9 rtl:pl-4 rtl:pr-9 pr-4 py-2.5 rounded-xl bg-white dark:bg-[#1b1a17] border text-sm focus:outline-none focus:ring-2 focus:ring-[#8e8672]/40 ${
                                formErrors.mobile
                                  ? 'border-rose-500 focus:ring-rose-400/40'
                                  : 'border-[#dedbd3] dark:border-[#383630]'
                              }`}
                            />
                          </div>
                          {formErrors.mobile && (
                            <span className="text-[11px] text-rose-500 mt-1 block">
                              {formErrors.mobile}
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Textarea: Message / Details */}
                      <div>
                        <label className="block text-xs font-bold text-neutral-700 dark:text-neutral-300 mb-1.5">
                          {language === 'ar'
                            ? feedbackType === 'suggestion' ? 'تفاصيل المقترح *' : 'تفاصيل الشكوى والملاحظة *'
                            : feedbackType === 'suggestion' ? 'Suggestion Details *' : 'Complaint Details *'}
                        </label>
                        <div className="relative">
                          <textarea
                            rows={4}
                            value={feedbackMessage}
                            onChange={(e) => {
                              setFeedbackMessage(e.target.value);
                              if (formErrors.message) setFormErrors({ ...formErrors, message: undefined });
                            }}
                            placeholder={
                              language === 'ar'
                                ? feedbackType === 'suggestion'
                                  ? 'اكتب مقترحك لتطوير الخدمات، الكافيهات، خطوط الأتوبيس، أو الباركينج بالتفصيل...'
                                  : 'وضح المشكلة بالتحديد والمكان أو المرفق المتعلق بها لسرعة اتخاذ الإجراء...'
                                : 'Describe your suggestion or complaint in detail...'
                            }
                            className={`w-full p-3.5 rounded-xl bg-white dark:bg-[#1b1a17] border text-sm focus:outline-none focus:ring-2 focus:ring-[#8e8672]/40 resize-none ${
                              formErrors.message
                                ? 'border-rose-500 focus:ring-rose-400/40'
                                : 'border-[#dedbd3] dark:border-[#383630]'
                            }`}
                          />
                        </div>
                        {formErrors.message && (
                          <span className="text-[11px] text-rose-500 mt-1 block">
                            {formErrors.message}
                          </span>
                        )}
                      </div>

                      {/* Submit Button */}
                      <div className="pt-2 flex items-center justify-between gap-4">
                        <span className="text-[11px] text-neutral-500">
                          {language === 'ar' ? '* جميع الحقول مطلوبة للمتابعة الدورية' : '* All fields are required for follow-up'}
                        </span>
                        <Button
                          type="submit"
                          variant="primary"
                          size="md"
                          className="min-w-[160px]"
                          icon={<Send className="w-4 h-4 rtl:rotate-180" />}
                        >
                          {language === 'ar' ? 'إرسال الرسالة' : 'Submit Feedback'}
                        </Button>
                      </div>

                    </motion.form>
                  )}
                </AnimatePresence>

              </div>
            </div>

          </div>
        </motion.div>
      </section>

      {/* Floating Interactive Toast Feedback */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 30, scale: 0.95 }}
            className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 px-5 py-3 rounded-2xl bg-[#1b1a17] text-white border border-[#8e8672]/60 shadow-2xl flex items-center gap-3 text-xs sm:text-sm font-bold"
          >
            <Sparkles className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
};
