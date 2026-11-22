import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Car, 
  RotateCcw, 
  CheckCircle2, 
  XCircle, 
  AlertCircle, 
  Zap, 
  Accessibility, 
  MapPin, 
  ArrowDown, 
  ArrowUp, 
  Compass, 
  Sparkles, 
  Clock, 
  ShieldCheck,
  Check,
  Info,
  ChevronLeft,
  ChevronRight,
  Timer
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useAppThemeLanguage } from '../context/ThemeLanguageContext';
import { initialParkingSlots, siteImages } from '../data/siteData';
import { ParkingSlot } from '../types';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { Modal } from '../components/ui/Modal';

export const SmartParkingPage: React.FC = () => {
  const { language, t } = useAppThemeLanguage();
  const [slots, setSlots] = useState<ParkingSlot[]>(initialParkingSlots);
  const [selectedSlot, setSelectedSlot] = useState<ParkingSlot | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [licensePlateInput, setLicensePlateInput] = useState('');
  const [plateError, setPlateError] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [now, setNow] = useState<number>(Date.now());

  // Real-time ticker and 10-minute auto-cancellation logic
  useEffect(() => {
    const interval = setInterval(() => {
      const currentTimestamp = Date.now();
      setNow(currentTimestamp);

      setSlots((prevSlots) => {
        let anyExpired = false;
        const nextSlots = prevSlots.map((slot) => {
          if (slot.isReservedByUser && slot.reservedAt) {
            const elapsedSeconds = Math.floor((currentTimestamp - slot.reservedAt) / 1000);
            if (elapsedSeconds >= 600) {
              anyExpired = true;
              return {
                ...slot,
                isOccupied: false,
                isReservedByUser: false,
                licensePlate: undefined,
                reservedAt: undefined,
              };
            }
          }
          return slot;
        });

        if (anyExpired) {
          showToast(
            language === 'ar'
              ? 'انتهت مهلة الـ 10 دقائق وتم إلغاء الحجز تلقائياً'
              : 'The 10-minute window expired and the reservation was automatically canceled.'
          );
        }

        return nextSlots;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [language]);

  // Counters
  const totalSlots = slots.length;
  const occupiedSlots = slots.filter((s) => s.isOccupied && !s.isReservedByUser).length;
  const availableSlots = slots.filter((s) => !s.isOccupied).length;
  const userReservedSlotsList = slots.filter((s) => s.isReservedByUser);
  const userReservedCount = userReservedSlotsList.length;

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  const formatCountdown = (reservedAt?: number) => {
    if (!reservedAt) return '10:00';
    const elapsedSeconds = Math.floor((now - reservedAt) / 1000);
    const remainingSeconds = Math.max(0, 600 - elapsedSeconds);
    const mins = Math.floor(remainingSeconds / 60);
    const secs = remainingSeconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleSlotClick = (slot: ParkingSlot) => {
    setSelectedSlot(slot);
    setLicensePlateInput(slot.licensePlate || '');
    setPlateError(null);
    setIsModalOpen(true);
  };

  const handleConfirmReservation = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!selectedSlot) return;

    if (!licensePlateInput.trim()) {
      setPlateError(
        language === 'ar'
          ? 'يرجى إدخال رقم لوحة السيارة لتأكيد الحجز'
          : 'Please enter the vehicle license plate number to confirm.'
      );
      return;
    }

    const cleanedPlate = licensePlateInput.trim().toUpperCase();

    // Reserve slot with license plate and timestamp
    setSlots((prev) =>
      prev.map((s) =>
        s.id === selectedSlot.id
          ? {
              ...s,
              isOccupied: true,
              isReservedByUser: true,
              licensePlate: cleanedPlate,
              reservedAt: Date.now(),
            }
          : s
      )
    );

    // Trigger celebration confetti
    try {
      confetti({
        particleCount: 60,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch (e) {
      // Safe fallback
    }

    showToast(
      language === 'ar'
        ? `تم حجز الباكية ${selectedSlot.id} بنجاح للسيارة رقم (${cleanedPlate})!`
        : `Spot ${selectedSlot.id} successfully reserved for vehicle (${cleanedPlate})!`
    );

    setIsModalOpen(false);
  };

  const handleCancelSlotReservation = (slotId: string) => {
    setSlots((prev) =>
      prev.map((s) =>
        s.id === slotId
          ? {
              ...s,
              isOccupied: false,
              isReservedByUser: false,
              licensePlate: undefined,
              reservedAt: undefined,
            }
          : s
      )
    );

    showToast(
      language === 'ar'
        ? `تم إلغاء حجز الباكية رقم ${slotId} وإتاحتها للجميع`
        : `Reservation for Spot ${slotId} cancelled successfully.`
    );

    if (selectedSlot?.id === slotId) {
      setIsModalOpen(false);
    }
  };

  const handleResetSimulation = () => {
    setSlots(initialParkingSlots);
    showToast(
      language === 'ar'
        ? 'تمت إعادة ضبط محاكاة المواقف الذكية للحالة الأصلية'
        : 'Smart parking simulation reset to default state.'
    );
  };

  const getLaneSlots = (lane: 'A' | 'B' | 'C' | 'D') => {
    return slots.filter((s) => s.lane === lane);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 sm:space-y-10 py-6 overflow-x-hidden">
      
      {/* Header Banner */}
      <div className="relative rounded-3xl overflow-hidden border border-[#e2dfd8] dark:border-[#33312b] shadow-xl">
        <div className="relative h-64 sm:h-80 w-full">
          <img
            src={siteImages.parking}
            alt="Smart Parking Shubra El-Kheima"
            className="w-full h-full object-cover object-center filter brightness-[0.85] dark:brightness-[0.4]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#12110f] via-[#12110f]/75 to-transparent" />
        </div>

        {/* Content Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-10 text-white space-y-3">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#22c55e] text-white shadow-sm flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-white animate-ping" />
              {language === 'ar' ? 'حساسات IoT نشطة' : 'Active IoT Sensors'}
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-white/20 backdrop-blur-md text-white flex items-center gap-1.5">
              <Compass className="w-3.5 h-3.5 text-[#acbdad]" />
              {language === 'ar' ? 'محاكاة هندسية تفاعلية' : 'Interactive Engineering Simulation'}
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black tracking-tight drop-shadow-md">
            {t('smartParking')}
          </h1>

          <p className="max-w-3xl text-sm text-neutral-300 font-normal leading-relaxed drop-shadow">
            {language === 'ar'
              ? 'نظام هندسي ذكي لتنظيم حركة انتظار السيارات في شبرا الخيمة. يتيح فحص الحارات لحظياً وحجز الباكيات الشاغرة برقم لوحة السيارة مع عداد تنازلي ذكي 10 دقائق لتأكيد الوصول.'
              : 'An automated civil engineering parking management system for Shubra El-Kheima. Real-time lane occupancy, license plate booking, and a 10-minute arrival countdown.'}
          </p>
        </div>
      </div>

      {/* Prominent Active Reservation Banner (Shown when user has reserved slots) */}
      <AnimatePresence>
        {userReservedCount > 0 && (
          <div className="space-y-3">
            {userReservedSlotsList.map((slot) => {
              const remainingTime = formatCountdown(slot.reservedAt);
              return (
                <motion.div
                  key={slot.id}
                  initial={{ opacity: 0, y: -15, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -15, scale: 0.98 }}
                  className="p-4 sm:p-5 rounded-2xl sm:rounded-3xl bg-amber-500/15 dark:bg-amber-500/20 border-2 border-amber-500/50 shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                >
                  <div className="flex items-start sm:items-center gap-3.5 w-full sm:w-auto">
                    <div className="w-12 h-12 rounded-2xl bg-amber-500 text-black flex items-center justify-center shrink-0 shadow-md">
                      <Car className="w-6 h-6 animate-pulse" />
                    </div>
                    <div className="space-y-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="px-2.5 py-0.5 rounded-full text-xs font-black bg-amber-500 text-black shadow-sm">
                          {language === 'ar' ? 'حجز نشط مؤقت' : 'Active Reservation'}
                        </span>
                        <span className="text-base font-black text-[#12110f] dark:text-[#f6f6f4]">
                          {language === 'ar' ? `الباكية ${slot.id}` : `Slot ${slot.id}`}
                        </span>
                        <span className="text-xs text-neutral-500 font-semibold">
                          ({language === 'ar' ? `حارة ${slot.lane}` : `Lane ${slot.lane}`})
                        </span>
                      </div>
                      <div className="text-xs sm:text-sm text-neutral-700 dark:text-neutral-300 font-medium flex flex-wrap items-center gap-2">
                        <span>{language === 'ar' ? 'رقم اللوحة المسجلة:' : 'Registered Plate:'}</span>
                        <span className="px-2.5 py-0.5 rounded-lg bg-neutral-900 text-amber-300 font-mono font-bold text-xs sm:text-sm tracking-wider border border-amber-500/40">
                          {slot.licensePlate}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Countdown Timer & Cancel Action */}
                  <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end border-t sm:border-t-0 pt-3 sm:pt-0 border-amber-500/20">
                    <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-amber-500/20 border border-amber-500/40 text-amber-800 dark:text-amber-200">
                      <Clock className="w-4 h-4 text-amber-600 dark:text-amber-400 animate-spin-slow shrink-0" />
                      <div className="text-right rtl:text-right ltr:text-left">
                        <span className="block text-[10px] uppercase font-bold text-amber-700 dark:text-amber-300">
                          {language === 'ar' ? 'مهلة الوصول:' : 'Arrival Window:'}
                        </span>
                        <span className="font-mono font-black text-sm sm:text-base text-amber-900 dark:text-amber-200">
                          {remainingTime}
                        </span>
                      </div>
                    </div>

                    <Button
                      variant="outline"
                      size="sm"
                      className="border-rose-500/40 text-rose-600 hover:bg-rose-500/10 min-h-[42px] px-3.5 text-xs font-bold"
                      onClick={() => handleCancelSlotReservation(slot.id)}
                    >
                      {t('cancelReservation')}
                    </Button>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </AnimatePresence>

      {/* Live Dashboard Bar with Real-time Counters */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
        {/* Total Slots */}
        <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-[#1b1a17] border border-[#e2dfd8] dark:border-[#33312b] shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold text-neutral-500 block">
              {t('totalSlots')}
            </span>
            <span className="text-2xl sm:text-3xl font-black text-[#12110f] dark:text-[#f6f6f4] mt-1 block">
              {totalSlots}
            </span>
          </div>
          <div className="w-10 sm:w-12 h-10 sm:h-12 rounded-xl bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center text-neutral-600 dark:text-neutral-400 shrink-0">
            <Car className="w-5 sm:w-6 h-5 sm:w-6" />
          </div>
        </div>

        {/* Available Slots (Emerald Green) */}
        <div className="p-4 sm:p-5 rounded-2xl bg-emerald-500/10 dark:bg-emerald-500/15 border border-emerald-500/30 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold text-emerald-800 dark:text-emerald-300 block">
              {t('availableSlots')}
            </span>
            <span className="text-2xl sm:text-3xl font-black text-emerald-600 dark:text-emerald-400 mt-1 block">
              {availableSlots}
            </span>
          </div>
          <div className="w-10 sm:w-12 h-10 sm:h-12 rounded-xl bg-emerald-500/20 text-emerald-600 dark:text-emerald-300 flex items-center justify-center shrink-0">
            <CheckCircle2 className="w-5 sm:w-6 h-5 sm:w-6" />
          </div>
        </div>

        {/* Occupied Slots (Coral / Red) */}
        <div className="p-4 sm:p-5 rounded-2xl bg-rose-500/10 dark:bg-rose-500/15 border border-rose-500/30 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold text-rose-800 dark:text-rose-300 block">
              {t('occupiedSlots')}
            </span>
            <span className="text-2xl sm:text-3xl font-black text-rose-600 dark:text-rose-400 mt-1 block">
              {occupiedSlots}
            </span>
          </div>
          <div className="w-10 sm:w-12 h-10 sm:h-12 rounded-xl bg-rose-500/20 text-rose-600 dark:text-rose-300 flex items-center justify-center shrink-0">
            <XCircle className="w-5 sm:w-6 h-5 sm:w-6" />
          </div>
        </div>

        {/* My Reservations & Reset */}
        <div className="p-4 sm:p-5 rounded-2xl bg-amber-500/10 dark:bg-amber-500/15 border border-amber-500/30 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold text-amber-800 dark:text-amber-300 block">
              {t('myReservations')}
            </span>
            <span className="text-2xl sm:text-3xl font-black text-amber-600 dark:text-amber-400 mt-1 block">
              {userReservedCount}
            </span>
          </div>
          <button
            onClick={handleResetSimulation}
            title={t('resetSim')}
            className="p-2.5 sm:p-3 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 text-amber-700 dark:text-amber-300 transition-colors shrink-0"
          >
            <RotateCcw className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Legend & Instructions */}
      <div className="p-4 rounded-2xl bg-white/70 dark:bg-[#1b1a17]/70 border border-[#e2dfd8] dark:border-[#33312b] flex flex-wrap items-center justify-between gap-4 text-xs font-medium">
        <div className="flex flex-wrap items-center gap-3 sm:gap-4">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-md bg-emerald-500 shadow-sm" />
            <span className="text-neutral-700 dark:text-neutral-300">
              {t('available')} ({language === 'ar' ? 'اضغط للحجز' : 'Click to Book'})
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-md bg-rose-500 shadow-sm" />
            <span className="text-neutral-700 dark:text-neutral-300">{t('occupied')}</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-md bg-amber-500 ring-2 ring-amber-300 shadow-sm animate-pulse" />
            <span className="text-neutral-700 dark:text-neutral-300">
              {t('reserved')} ({language === 'ar' ? 'مؤقت 10 دقائق' : '10m Temporary'})
            </span>
          </div>
          <div className="flex items-center gap-1.5 text-neutral-500 border-l rtl:border-l-0 rtl:border-r border-neutral-300 dark:border-neutral-700 pl-3 rtl:pl-0 rtl:pr-3">
            <Zap className="w-3.5 h-3.5 text-sky-500" />
            <span>{t('evCharging')}</span>
          </div>
          <div className="flex items-center gap-1.5 text-neutral-500">
            <Accessibility className="w-3.5 h-3.5 text-purple-500" />
            <span>{t('disabledAccess')}</span>
          </div>
        </div>

        <Button
          variant="outline"
          size="sm"
          onClick={handleResetSimulation}
          icon={<RotateCcw className="w-3.5 h-3.5" />}
        >
          {t('resetSim')}
        </Button>
      </div>

      {/* Interactive Architectural Parking Map Layout */}
      <div className="relative rounded-3xl bg-[#161513] border-2 border-[#36342e] p-4 sm:p-8 shadow-2xl text-white">
        
        {/* Mobile Swipe Hint */}
        <div className="flex sm:hidden items-center justify-between pb-3 text-xs text-neutral-400 border-b border-neutral-800 mb-4">
          <div className="flex items-center gap-1.5">
            <Compass className="w-3.5 h-3.5 text-[#8e8672]" />
            <span>{language === 'ar' ? 'مخطط الركن المعماري' : 'Parking Blueprint'}</span>
          </div>
          <div className="flex items-center gap-1 text-amber-400 text-[11px] font-bold">
            <span>{language === 'ar' ? 'اسحب أفقياً لاستعراض الحارات ⟷' : 'Swipe horizontally ⟷'}</span>
          </div>
        </div>

        {/* Top Boundary: Entrance Gate from Orabi St. */}
        <div className="hidden sm:flex items-center justify-between border-b border-dashed border-neutral-700 pb-6 mb-8 text-xs font-bold uppercase tracking-wider text-neutral-400">
          <div className="flex items-center gap-2 text-emerald-400">
            <ArrowDown className="w-4 h-4 animate-bounce" />
            <span>{t('entranceGate')}</span>
          </div>
          <div className="flex items-center gap-2 text-[#8e8672]">
            <Compass className="w-4 h-4" />
            <span>{language === 'ar' ? 'مخطط الركن المعماري الهندسي - المستوى الأول' : 'Architectural Parking Blueprint - Level 1'}</span>
          </div>
          <div className="flex items-center gap-2 text-amber-400">
            <MapPin className="w-4 h-4" />
            <span>{t('directToMall')}</span>
          </div>
        </div>

        {/* Scrollable Lanes Container */}
        <div className="overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-neutral-700">
          <div className="space-y-8 min-w-[780px]">
            {(['A', 'B', 'C', 'D'] as const).map((laneLetter) => {
              const laneSlots = getLaneSlots(laneLetter);
              return (
                <div key={laneLetter} className="space-y-2">
                  {/* Lane Header */}
                  <div className="flex items-center justify-between text-xs font-bold text-neutral-400 px-2">
                    <div className="flex items-center gap-2">
                      <span className="w-6 h-6 rounded-lg bg-[#8e8672]/30 text-[#8e8672] flex items-center justify-center font-bold">
                        {laneLetter}
                      </span>
                      <span>{t('lane')} {laneLetter}</span>
                    </div>
                    <span className="text-[11px] text-neutral-500">
                      {laneLetter === 'A' ? (language === 'ar' ? 'الأقرب للمول المفتوح' : 'Closest to Open Air Mall') : ''}
                      {laneLetter === 'D' ? (language === 'ar' ? 'الأقرب لممر سيتي مول' : 'Closest to City Mall Walkway') : ''}
                    </span>
                  </div>

                  {/* Slots Grid for this Lane */}
                  <div className="grid grid-cols-8 gap-3 bg-neutral-900/80 p-4 rounded-2xl border border-neutral-800">
                    {laneSlots.map((slot) => {
                      const isAvailable = !slot.isOccupied;
                      const isUserReserved = slot.isReservedByUser;

                      return (
                        <motion.button
                          key={slot.id}
                          whileHover={{ scale: 1.04 }}
                          whileTap={{ scale: 0.96 }}
                          onClick={() => handleSlotClick(slot)}
                          className={`relative group min-h-[135px] rounded-xl flex flex-col justify-between p-2 sm:p-2.5 transition-all duration-300 border-2 text-left rtl:text-right ${
                            isUserReserved
                              ? 'bg-amber-500/20 border-amber-500 text-amber-300 shadow-[0_0_15px_rgba(245,158,11,0.4)] ring-2 ring-amber-400/50'
                              : isAvailable
                              ? 'bg-emerald-950/40 border-emerald-500 hover:bg-emerald-900/50 text-emerald-300 hover:shadow-[0_0_15px_rgba(34,197,94,0.3)]'
                              : 'bg-rose-950/30 border-rose-600/60 text-rose-300 opacity-90'
                          }`}
                        >
                          {/* Top row: Slot ID & Feature Icon */}
                          <div className="flex items-center justify-between w-full">
                            <span className="text-xs font-black tracking-wider">
                              {slot.id}
                            </span>
                            {slot.vehicleType === 'ev' && (
                              <span title={t('evCharging')}>
                                <Zap className="w-3.5 h-3.5 text-sky-400 shrink-0" />
                              </span>
                            )}
                            {slot.vehicleType === 'disabled' && (
                              <span title={t('disabledAccess')}>
                                <Accessibility className="w-3.5 h-3.5 text-purple-400 shrink-0" />
                              </span>
                            )}
                          </div>

                          {/* Center Content: Car or Free P mark + License Plate if reserved */}
                          <div className="flex flex-col items-center justify-center my-auto w-full gap-1">
                            {isUserReserved ? (
                              <>
                                <Car className="w-7 h-7 text-amber-400 animate-pulse" />
                                <div className="w-full text-center px-1 py-0.5 rounded bg-black/70 border border-amber-400/50 text-amber-200 font-mono font-bold text-[10px] truncate" title={slot.licensePlate}>
                                  {slot.licensePlate}
                                </div>
                              </>
                            ) : isAvailable ? (
                              <div className="w-8 h-8 rounded-full border border-dashed border-emerald-400/60 flex items-center justify-center text-emerald-400 group-hover:scale-110 transition-transform">
                                <span className="text-[10px] font-bold">P</span>
                              </div>
                            ) : (
                              <Car className="w-7 h-7 text-rose-500" />
                            )}
                          </div>

                          {/* Bottom Row: Status Badge or Live Timer */}
                          <div className="w-full text-center">
                            {isUserReserved ? (
                              <div className="flex items-center justify-center gap-1 text-[10px] font-mono font-black text-amber-300 bg-amber-500/30 px-1 py-0.5 rounded border border-amber-500/30">
                                <Clock className="w-2.5 h-2.5 animate-spin-slow shrink-0" />
                                <span>{formatCountdown(slot.reservedAt)}</span>
                              </div>
                            ) : (
                              <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded block ${
                                isAvailable
                                  ? 'bg-emerald-500/30 text-emerald-300 group-hover:bg-emerald-500 group-hover:text-white transition-colors'
                                  : 'bg-rose-500/20 text-rose-400'
                              }`}>
                                {isAvailable ? t('available') : t('occupied')}
                              </span>
                            )}
                          </div>
                        </motion.button>
                      );
                    })}
                  </div>

                  {/* Driving Lane Line Overlay */}
                  <div className="flex items-center justify-center py-1 opacity-20">
                    <div className="w-full border-t border-dashed border-white" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom Boundary: Exit Gate & Pedestrian Mall Walkway */}
        <div className="flex flex-col sm:flex-row items-center justify-between border-t border-dashed border-neutral-700 pt-6 mt-8 text-xs font-bold uppercase tracking-wider text-neutral-400 gap-3 text-center sm:text-left rtl:sm:text-right">
          <div className="flex items-center gap-2 text-rose-400">
            <ArrowUp className="w-4 h-4" />
            <span>{t('exitGate')}</span>
          </div>
          <div className="text-[11px] text-neutral-400">
            {language === 'ar' ? 'سرعة السير القصوى داخل الحارات: 10 كم/س' : 'Max Lane Speed: 10 km/h'}
          </div>
          <div className="flex items-center gap-2 text-sky-400">
            <ShieldCheck className="w-4 h-4" />
            <span>{language === 'ar' ? 'كاميرات مراقبة وحماية أمنية 24/7' : '24/7 Monitored & Secured'}</span>
          </div>
        </div>

      </div>

      {/* Interactive Slot Booking & Inspection Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={
          selectedSlot ? (
            <div className="flex items-center gap-2">
              <Car className="w-5 h-5 text-[#8e8672]" />
              <span>
                {selectedSlot.isReservedByUser
                  ? (language === 'ar' ? `تفاصيل حجز الباكية ${selectedSlot.id}` : `Slot ${selectedSlot.id} Reservation`)
                  : !selectedSlot.isOccupied
                  ? (language === 'ar' ? `حجز الباكية الذكية ${selectedSlot.id}` : `Reserve Smart Slot ${selectedSlot.id}`)
                  : (language === 'ar' ? `الباكية ${selectedSlot.id}` : `Slot ${selectedSlot.id}`)}
              </span>
            </div>
          ) : ''
        }
      >
        {selectedSlot && (
          <div className="space-y-5">
            {/* Status indicator banner */}
            <div className={`p-4 rounded-2xl flex items-center gap-3 ${
              selectedSlot.isReservedByUser
                ? 'bg-amber-500/15 border border-amber-500/30 text-amber-800 dark:text-amber-300'
                : !selectedSlot.isOccupied
                ? 'bg-emerald-500/15 border border-emerald-500/30 text-emerald-800 dark:text-emerald-300'
                : 'bg-rose-500/15 border border-rose-500/30 text-rose-800 dark:text-rose-300'
            }`}>
              {selectedSlot.isReservedByUser ? (
                <Sparkles className="w-6 h-6 text-amber-500 shrink-0" />
              ) : !selectedSlot.isOccupied ? (
                <CheckCircle2 className="w-6 h-6 text-emerald-500 shrink-0" />
              ) : (
                <XCircle className="w-6 h-6 text-rose-500 shrink-0" />
              )}
              <div>
                <div className="font-bold text-sm">
                  {selectedSlot.isReservedByUser
                    ? (language === 'ar' ? 'الباكية محجوزة لك حالياً' : 'Slot is currently reserved by you')
                    : !selectedSlot.isOccupied
                    ? (language === 'ar' ? 'الباكية شاغرة ومتاحة للحجز الفوري' : 'Slot is currently vacant and open for booking')
                    : (language === 'ar' ? 'الباكية مشغولة حالياً بسيارة أخرى' : 'Slot is currently occupied by another vehicle')}
                </div>
                <div className="text-xs opacity-90 mt-0.5">
                  {t('lane')} {selectedSlot.lane} - {selectedSlot.vehicleType === 'ev' ? t('evCharging') : selectedSlot.vehicleType === 'disabled' ? t('disabledAccess') : t('regularParking')}
                </div>
              </div>
            </div>

            {/* Quick walk details */}
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-neutral-100 dark:bg-neutral-800/60 border border-neutral-200/50 dark:border-neutral-700/50">
                <span className="text-neutral-500 block">{language === 'ar' ? 'المسافة للمول المفتوح:' : 'Walk to Open Air Mall:'}</span>
                <span className="font-bold text-[#12110f] dark:text-white mt-1 block">
                  {selectedSlot.lane === 'A' ? (language === 'ar' ? '1 دقيقة (مباشر)' : '1 min (Direct)') : '2-3 دقائق'}
                </span>
              </div>
              <div className="p-3 rounded-xl bg-neutral-100 dark:bg-neutral-800/60 border border-neutral-200/50 dark:border-neutral-700/50">
                <span className="text-neutral-500 block">{language === 'ar' ? 'المسافة لسيتي مول:' : 'Walk to City Mall:'}</span>
                <span className="font-bold text-[#12110f] dark:text-white mt-1 block">
                  {selectedSlot.lane === 'D' ? (language === 'ar' ? '2 دقيقة (مباشر)' : '2 mins (Direct)') : '3-4 دقائق'}
                </span>
              </div>
            </div>

            {/* Available Slot: License Plate Input Form & 10-Minute Policy Alert */}
            {!selectedSlot.isOccupied && (
              <form onSubmit={handleConfirmReservation} className="space-y-4">
                {/* License Plate Input Field */}
                <div className="space-y-1.5">
                  <label className="block text-xs sm:text-sm font-bold text-neutral-800 dark:text-neutral-200">
                    {language === 'ar' ? 'رقم لوحة السيارة' : 'Car License Plate Number'}{' '}
                    <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={licensePlateInput}
                      onChange={(e) => {
                        setLicensePlateInput(e.target.value);
                        if (plateError) setPlateError(null);
                      }}
                      placeholder={language === 'ar' ? 'مثال: أ ب ج 1234' : 'e.g. ABC 1234'}
                      className={`w-full min-h-[46px] px-4 py-2.5 rounded-xl border bg-white dark:bg-[#12110f] text-neutral-900 dark:text-neutral-100 placeholder:text-neutral-400 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#8e8672] transition-colors ${
                        plateError
                          ? 'border-rose-500 focus:ring-rose-500'
                          : 'border-[#e2dfd8] dark:border-[#33312b]'
                      }`}
                      autoFocus
                    />
                    <Car className="w-5 h-5 text-neutral-400 absolute top-1/2 -translate-y-1/2 ltr:right-3.5 rtl:left-3.5 pointer-events-none" />
                  </div>
                  {plateError && (
                    <p className="text-xs text-rose-500 font-semibold flex items-center gap-1 mt-1">
                      <AlertCircle className="w-3.5 h-3.5" />
                      <span>{plateError}</span>
                    </p>
                  )}
                </div>

                {/* 10-Minute Auto-Cancellation Notice Banner */}
                <div className="p-3.5 rounded-2xl bg-amber-500/15 border border-amber-500/30 flex items-start gap-3">
                  <Clock className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
                  <div className="text-xs text-amber-900 dark:text-amber-200 leading-relaxed">
                    <span className="font-bold block mb-0.5">
                      {language === 'ar' ? 'تنويه هام:' : 'Important Notice:'}
                    </span>
                    {language === 'ar'
                      ? 'سيتم إلغاء الحجز تلقائياً بعد 10 دقائق في حال عدم الوصول ودخول السيارة للباركينج.'
                      : 'Your reservation will be automatically canceled after 10 minutes if the vehicle does not arrive.'}
                  </div>
                </div>

                {/* Modal Actions */}
                <div className="pt-2 flex flex-col sm:flex-row items-center justify-end gap-2.5">
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={() => setIsModalOpen(false)}
                    className="w-full sm:w-auto min-h-[44px]"
                  >
                    {language === 'ar' ? 'إلغاء' : 'Cancel'}
                  </Button>

                  <Button
                    type="submit"
                    variant="emerald"
                    disabled={!licensePlateInput.trim()}
                    icon={<Check className="w-4 h-4" />}
                    className="w-full sm:w-auto min-h-[44px] px-6 font-bold"
                  >
                    {language === 'ar' ? 'تأكيد الحجز' : 'Confirm Reservation'}
                  </Button>
                </div>
              </form>
            )}

            {/* Already Reserved by User: Show Plate, Remaining Timer & Cancel Button */}
            {selectedSlot.isReservedByUser && (
              <div className="space-y-4">
                <div className="p-4 rounded-2xl bg-neutral-100 dark:bg-neutral-800/80 border border-neutral-200 dark:border-neutral-700 space-y-3">
                  <div className="flex items-center justify-between text-xs sm:text-sm">
                    <span className="text-neutral-500">{language === 'ar' ? 'رقم اللوحة المسجلة:' : 'Registered Plate:'}</span>
                    <span className="font-mono font-bold text-sm sm:text-base text-neutral-900 dark:text-neutral-100 bg-amber-500/20 px-2.5 py-1 rounded-lg border border-amber-500/30">
                      {selectedSlot.licensePlate}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-xs sm:text-sm pt-2 border-t border-neutral-200 dark:border-neutral-700">
                    <span className="text-neutral-500 flex items-center gap-1.5">
                      <Clock className="w-4 h-4 text-amber-500" />
                      {language === 'ar' ? 'الوقت المتبقي لدخول الباركينج:' : 'Remaining Arrival Window:'}
                    </span>
                    <span className="font-mono font-black text-sm sm:text-base text-amber-600 dark:text-amber-400">
                      {formatCountdown(selectedSlot.reservedAt)}
                    </span>
                  </div>
                </div>

                {/* 10-Minute Policy Reminder */}
                <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-800 dark:text-amber-300">
                  {language === 'ar'
                    ? 'يرجى التوجه لبوابة الدخول قبل انتهاء العداد لتجنب إلغاء الحجز تلقائياً.'
                    : 'Please proceed to the entrance before the timer expires to prevent automatic cancellation.'}
                </div>

                <div className="pt-2 flex flex-col sm:flex-row items-center justify-end gap-2.5">
                  <Button
                    variant="ghost"
                    onClick={() => setIsModalOpen(false)}
                    className="w-full sm:w-auto min-h-[44px]"
                  >
                    {language === 'ar' ? 'إغلاق' : 'Close'}
                  </Button>

                  <Button
                    variant="outline"
                    className="border-rose-500/40 text-rose-600 hover:bg-rose-500/10 w-full sm:w-auto min-h-[44px] font-bold"
                    onClick={() => handleCancelSlotReservation(selectedSlot.id)}
                  >
                    {t('cancelReservation')}
                  </Button>
                </div>
              </div>
            )}

            {/* Occupied Slot by Others: View Only */}
            {selectedSlot.isOccupied && !selectedSlot.isReservedByUser && (
              <div className="space-y-4">
                <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400">
                  {language === 'ar'
                    ? 'هذه الباكية مشغولة حالياً بمركبة أخرى ولا يمكن حجزها حتى يغادر السائق.'
                    : 'This slot is currently occupied by another vehicle and cannot be reserved until it is vacated.'}
                </p>

                <div className="pt-2 flex justify-end">
                  <Button
                    variant="ghost"
                    onClick={() => setIsModalOpen(false)}
                    className="w-full sm:w-auto min-h-[44px]"
                  >
                    {language === 'ar' ? 'إغلاق' : 'Close'}
                  </Button>
                </div>
              </div>
            )}
          </div>
        )}
      </Modal>

      {/* Floating Interactive Toast Feedback */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.95 }}
            className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 px-5 py-3 rounded-2xl bg-[#1b1a17] text-white border border-[#8e8672]/60 shadow-2xl flex items-center gap-3 text-xs sm:text-sm font-bold max-w-[90vw]"
          >
            <Sparkles className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
};
