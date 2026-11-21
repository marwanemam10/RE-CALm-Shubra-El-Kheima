import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Sparkles, 
  ChevronRight, 
  ChevronLeft, 
  Star, 
  Calendar, 
  Phone, 
  MapPin, 
  ShieldCheck, 
  Tag, 
  Percent, 
  Clock, 
  Layers,
  ArrowRight,
  ArrowLeft
} from 'lucide-react';
import { useAppThemeLanguage } from '../context/ThemeLanguageContext';
import { DoctorProfile, PharmacyInfo } from '../types';
import { Badge } from './ui/Badge';
import { Button } from './ui/Button';

interface SponsoredCarouselProps {
  sponsoredDoctors: DoctorProfile[];
  pharmacy: PharmacyInfo;
  onBookDoctor: (doctor: DoctorProfile) => void;
}

export const SponsoredCarousel: React.FC<SponsoredCarouselProps> = ({
  sponsoredDoctors,
  pharmacy,
  onBookDoctor,
}) => {
  const { language } = useAppThemeLanguage();

  // Combine 5 sponsored doctors + 1 pharmacy slide = 6 slides total
  const slides: Array<
    | { type: 'doctor'; data: DoctorProfile }
    | { type: 'pharmacy'; data: PharmacyInfo }
  > = [
    ...sponsoredDoctors.slice(0, 5).map((doc) => ({ type: 'doctor' as const, data: doc })),
    { type: 'pharmacy' as const, data: pharmacy },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const autoPlayRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
  };

  useEffect(() => {
    if (!isPaused) {
      autoPlayRef.current = setInterval(() => {
        nextSlide();
      }, 3800);
    }
    return () => {
      if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    };
  }, [isPaused, currentIndex]);

  const currentSlide = slides[currentIndex];
  const isDoctor = currentSlide.type === 'doctor';
  const doctor = isDoctor ? (currentSlide.data as DoctorProfile) : null;
  const pharm = !isDoctor ? (currentSlide.data as PharmacyInfo) : null;

  const PrevIcon = language === 'ar' ? ChevronRight : ChevronLeft;
  const NextIcon = language === 'ar' ? ChevronLeft : ChevronRight;

  return (
    <div 
      className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-[#8e8672]/15 via-white dark:via-[#1c1b18] to-[#90a69c]/15 border-2 border-[#8e8672]/30 dark:border-[#8e8672]/25 shadow-lg group"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={() => setIsPaused(true)}
      onTouchEnd={() => setIsPaused(false)}
    >
      {/* Top Banner Tag */}
      <div className="flex items-center justify-between px-4 sm:px-6 pt-4 pb-2 text-xs font-bold text-neutral-500">
        <div className="flex items-center gap-2">
          <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#8e8672] text-white shadow-sm font-bold text-[11px]">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{language === 'ar' ? 'إعلان ممول / مميز' : 'Sponsored / Featured'}</span>
          </span>
          <span className="text-[11px] text-neutral-500 hidden sm:inline-block">
            {language === 'ar' ? 'نخبة الرعاية الطبية في شبرا الخيمة' : 'Premier Healthcare in Shubra El-Kheima'}
          </span>
        </div>

        {/* Counter Indicators */}
        <div className="flex items-center gap-1 text-[11px] font-mono text-neutral-400">
          <span>{currentIndex + 1}</span>
          <span>/</span>
          <span>{slides.length}</span>
        </div>
      </div>

      {/* Main Slide Content with Animated Transitions */}
      <div className="p-4 sm:p-6 md:p-8 min-h-[240px] flex items-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: language === 'ar' ? -30 : 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: language === 'ar' ? 30 : -30 }}
            transition={{ duration: 0.35, ease: 'easeInOut' }}
            className="w-full"
          >
            {isDoctor && doctor && (
              <div className="grid grid-cols-1 md:grid-cols-12 gap-4 sm:gap-6 items-center">
                
                {/* Doctor Photo */}
                <div className="md:col-span-4 flex items-center justify-center">
                  <div className="relative">
                    <div className="w-24 h-24 sm:w-36 sm:h-36 rounded-2xl overflow-hidden border-2 border-[#8e8672]/40 shadow-md bg-neutral-100 dark:bg-neutral-800">
                      <img
                        src={doctor.image || '/doctors/dr-ahmed-ismail-zidan.jpg'}
                        alt={doctor.name[language]}
                        className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-500"
                        onError={(e) => {
                          // graceful fallback avatar
                          (e.currentTarget as HTMLImageElement).src = '/data/doctors-tower.jpg';
                        }}
                      />
                    </div>
                    {/* Badge over photo */}
                    <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 px-2.5 py-0.5 rounded-full bg-emerald-600 text-white text-[10px] font-bold shadow-sm flex items-center gap-1 whitespace-nowrap">
                      <Star className="w-3 h-3 fill-amber-300 text-amber-300" />
                      <span>{doctor.rating || 4.9} ★</span>
                    </div>
                  </div>
                </div>

                {/* Doctor Details */}
                <div className="md:col-span-8 space-y-3 text-center md:text-start rtl:md:text-right">
                  <div className="flex flex-wrap items-center justify-center md:justify-start rtl:md:justify-start gap-2">
                    <span className="px-2.5 py-0.5 rounded-lg text-xs font-bold bg-[#8e8672]/15 text-[#6c6554] dark:bg-[#8e8672]/25 dark:text-[#d0c8bd] flex items-center gap-1">
                      <Layers className="w-3.5 h-3.5" />
                      {doctor.floor[language]}
                    </span>
                    <span className="px-2 py-0.5 rounded-md text-[11px] font-medium bg-amber-500/10 text-amber-700 dark:text-amber-300 border border-amber-500/20">
                      {language === 'ar' ? 'طبيب معتمد وموصى به' : 'Verified Consultant'}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-xl sm:text-2xl font-black text-[#12110f] dark:text-[#f6f6f4] tracking-tight">
                      {doctor.name[language]}
                    </h3>
                    <p className="text-xs sm:text-sm font-bold text-[#8e8672] dark:text-[#a8a08d] mt-0.5">
                      {doctor.specialtyName[language]}
                    </p>
                    <p className="text-xs text-neutral-600 dark:text-neutral-300 mt-1 line-clamp-2 leading-relaxed">
                      {doctor.subSpecialty[language]}
                    </p>
                  </div>

                  {/* Patient Review Snippet */}
                  {doctor.reviewSnippet && (
                    <div className="p-2.5 rounded-xl bg-white/70 dark:bg-[#23221e]/70 border border-[#e2dfd8] dark:border-[#383630] text-xs text-neutral-600 dark:text-neutral-300 italic flex items-center justify-center md:justify-start gap-2">
                      <span className="text-[#8e8672] font-serif text-base">“</span>
                      <span className="line-clamp-1">{doctor.reviewSnippet[language]}</span>
                      <span className="text-[#8e8672] font-serif text-base">”</span>
                    </div>
                  )}

                  {/* Actions Bar */}
                  <div className="pt-2 flex flex-col sm:flex-row items-center justify-center md:justify-start rtl:md:justify-start gap-2.5 sm:gap-3 w-full">
                    <Button
                      variant="primary"
                      size="sm"
                      onClick={() => onBookDoctor(doctor)}
                      icon={<Calendar className="w-4 h-4" />}
                      className="shadow-glow-primary px-5 w-full sm:w-auto justify-center min-h-[44px]"
                    >
                      {language === 'ar' ? 'احجز الآن أونلاين' : 'Book Now Online'}
                    </Button>

                    {doctor.phones && doctor.phones[0] && (
                      <a
                        href={`tel:${doctor.phones[0]}`}
                        className="w-full sm:w-auto justify-center min-h-[44px] inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-800 dark:hover:bg-neutral-700 text-xs font-semibold text-neutral-700 dark:text-neutral-200 transition-colors"
                      >
                        <Phone className="w-3.5 h-3.5 text-[#8e8672]" />
                        <span>{doctor.phones[0]}</span>
                      </a>
                    )}
                  </div>
                </div>

              </div>
            )}

            {!isDoctor && pharm && (
              <div className="grid grid-cols-1 md:grid-cols-12 gap-4 sm:gap-6 items-center">
                
                {/* Pharmacy Photo */}
                <div className="md:col-span-4 flex items-center justify-center">
                  <div className="relative">
                    <div className="w-24 h-24 sm:w-36 sm:h-36 rounded-2xl overflow-hidden border-2 border-emerald-500/40 shadow-md bg-white">
                      <img
                        src={pharm.image}
                        alt={pharm.name[language]}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                        onError={(e) => {
                          (e.currentTarget as HTMLImageElement).src = '/data/doctors-tower.jpg';
                        }}
                      />
                    </div>
                    {/* Discount badge */}
                    <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 px-2.5 py-0.5 rounded-full bg-rose-600 text-white text-[10px] font-black shadow-sm flex items-center gap-1 whitespace-nowrap">
                      <Percent className="w-3 h-3" />
                      <span>{pharm.discountPercentage}% {language === 'ar' ? 'خصم خاص' : 'OFF'}</span>
                    </div>
                  </div>
                </div>

                {/* Pharmacy Details */}
                <div className="md:col-span-8 space-y-3 text-center md:text-start rtl:md:text-right">
                  <div className="flex flex-wrap items-center justify-center md:justify-start rtl:md:justify-start gap-2">
                    <span className="px-2.5 py-0.5 rounded-lg text-xs font-bold bg-emerald-500/15 text-emerald-800 dark:text-emerald-300 flex items-center gap-1 border border-emerald-500/30">
                      <MapPin className="w-3.5 h-3.5" />
                      {pharm.floor[language]}
                    </span>
                    <span className="px-2 py-0.5 rounded-md text-[11px] font-bold bg-rose-500/15 text-rose-700 dark:text-rose-300 border border-rose-500/25">
                      {language === 'ar' ? 'عرض حصري للمرضى' : 'Exclusive Patient Offer'}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-xl sm:text-2xl font-black text-[#12110f] dark:text-[#f6f6f4] tracking-tight">
                      {pharm.name[language]}
                    </h3>
                    <p className="text-xs sm:text-sm font-bold text-emerald-700 dark:text-emerald-400 mt-0.5">
                      {pharm.offerText[language]}
                    </p>
                    <p className="text-xs text-neutral-600 dark:text-neutral-300 mt-1 line-clamp-2 leading-relaxed">
                      {pharm.description[language]}
                    </p>
                  </div>

                  {/* Promo Code Box */}
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-xs font-bold text-amber-800 dark:text-amber-300 max-w-full flex-wrap">
                    <Tag className="w-3.5 h-3.5" />
                    <span>{language === 'ar' ? 'كود الخصم في الصيدلية:' : 'Pharmacy Promo Code:'}</span>
                    <span className="font-mono bg-white dark:bg-black/40 px-2 py-0.5 rounded font-black tracking-wider text-[#12110f] dark:text-white">
                      {pharm.promoCode}
                    </span>
                  </div>

                  {/* Actions Bar */}
                  <div className="pt-2 flex flex-col sm:flex-row items-center justify-center md:justify-start rtl:md:justify-start gap-2.5 sm:gap-3 w-full">
                    <a
                      href={`tel:${pharm.hotline}`}
                      className="w-full sm:w-auto justify-center min-h-[44px] inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-sm transition-all active:scale-95"
                    >
                      <Phone className="w-4 h-4" />
                      <span>{language === 'ar' ? 'اتصل بالخط الساخن: ' : 'Call Hotline: '}{pharm.hotline}</span>
                    </a>
                  </div>
                </div>

              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation Controls: Left/Right Arrows & Pagination Dots */}
      <div className="flex items-center justify-between px-4 sm:px-6 pb-3 pt-2 border-t border-[#e2dfd8]/70 dark:border-[#33312b]/70">
        {/* Pagination Dots */}
        <div className="flex items-center gap-1.5">
          {slides.map((_, dotIdx) => (
            <button
              key={dotIdx}
              onClick={() => setCurrentIndex(dotIdx)}
              className={`h-2 rounded-full transition-all duration-300 ${
                dotIdx === currentIndex
                  ? 'w-6 bg-[#8e8672] dark:bg-[#a8a08d]'
                  : 'w-2 bg-neutral-300 dark:bg-neutral-700 hover:bg-neutral-400'
              }`}
              aria-label={`Slide ${dotIdx + 1}`}
            />
          ))}
        </div>

        {/* Arrow Buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={prevSlide}
            aria-label="Previous Slide"
            className="p-1.5 rounded-lg bg-white/80 dark:bg-[#23221e]/80 border border-[#dedbd3] dark:border-[#383630] text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
          >
            <PrevIcon className="w-4 h-4" />
          </button>
          <button
            onClick={nextSlide}
            aria-label="Next Slide"
            className="p-1.5 rounded-lg bg-white/80 dark:bg-[#23221e]/80 border border-[#dedbd3] dark:border-[#383630] text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
          >
            <NextIcon className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
