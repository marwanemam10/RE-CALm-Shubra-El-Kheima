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
  ArrowRight,
  ArrowLeft,
  Compass, 
  Sparkles, 
  Clock, 
  ShieldCheck,
  Check
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useAppThemeLanguage } from '../context/ThemeLanguageContext';
import { initialParkingSlots, siteImages } from '../data/siteData';
import { ParkingSlot, ParkingZone } from '../types';
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

  // Live Dashboard Counters
  const totalSlots = slots.length;
  const availableSlots = slots.filter((s) => !s.isOccupied).length;
  const userReservedSlotsList = slots.filter((s) => s.isReservedByUser);
  const userReservedCount = userReservedSlotsList.length;
  const evAvailableCount = slots.filter((s) => s.vehicleType === 'ev' && !s.isOccupied).length;
  const evTotalCount = slots.filter((s) => s.vehicleType === 'ev').length;
  const handicapAvailableCount = slots.filter((s) => s.vehicleType === 'disabled' && !s.isOccupied).length;
  const handicapTotalCount = slots.filter((s) => s.vehicleType === 'disabled').length;

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

    try {
      confetti({
        particleCount: 60,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch {
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

  const getZoneSlots = (zone: ParkingZone) => {
    return slots.filter((s) => s.zone === zone);
  };

  // Shared slot button renderer for horizontal & vertical bays
  const renderSlotButton = (slot: ParkingSlot, orientation: 'vertical' | 'horizontal' = 'vertical') => {
    const isAvailable = !slot.isOccupied;
    const isUserReserved = Boolean(slot.isReservedByUser);

    let stateClasses = '';
    if (isUserReserved) {
      stateClasses =
        'bg-amber-500 border-amber-300 text-black ring-2 ring-amber-400 shadow-[0_0_12px_rgba(245,158,11,0.65)] z-10';
    } else if (!isAvailable) {
      stateClasses =
        'bg-neutral-800/90 border-neutral-700/80 text-neutral-500 opacity-75 hover:opacity-95';
    } else if (slot.vehicleType === 'ev') {
      stateClasses =
        'bg-[#0284c7] hover:bg-[#0369a1] border-[#38bdf8]/80 text-white shadow-sm hover:shadow-[0_0_10px_rgba(56,189,248,0.5)]';
    } else if (slot.vehicleType === 'disabled') {
      stateClasses =
        'bg-[#be123c] hover:bg-[#9f1239] border-[#fb7185]/80 text-white shadow-sm hover:shadow-[0_0_10px_rgba(251,113,133,0.5)]';
    } else {
      stateClasses =
        'bg-emerald-600/85 hover:bg-emerald-500 border-emerald-400/75 text-white shadow-sm hover:shadow-[0_0_10px_rgba(52,211,153,0.45)]';
    }

    const sizeClasses =
      orientation === 'horizontal'
        ? 'w-full min-h-[26px] h-7 sm:h-8 flex-row gap-1 px-1'
        : 'flex-1 min-w-[26px] min-h-[38px] h-10 sm:h-11 flex-col px-0.5';

    const titleText = isUserReserved
      ? `${slot.id} | ${slot.licensePlate} (${formatCountdown(slot.reservedAt)})`
      : `${slot.id} — ${
          isAvailable
            ? slot.vehicleType === 'ev'
              ? t('evCharging')
              : slot.vehicleType === 'disabled'
              ? t('disabledAccess')
              : t('available')
            : t('occupied')
        }`;

    return (
      <motion.button
        key={slot.id}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.94 }}
        onClick={() => handleSlotClick(slot)}
        title={titleText}
        aria-label={titleText}
        className={`relative rounded-[5px] border flex items-center justify-center transition-colors duration-200 ${sizeClasses} ${stateClasses}`}
      >
        {isUserReserved ? (
          <Car className="w-3.5 h-3.5 text-black animate-pulse shrink-0" />
        ) : !isAvailable ? (
          <Car className="w-3 h-3 text-neutral-500 shrink-0" />
        ) : slot.vehicleType === 'ev' ? (
          <Zap className="w-3.5 h-3.5 text-white fill-white shrink-0" />
        ) : slot.vehicleType === 'disabled' ? (
          <Accessibility className="w-3.5 h-3.5 text-white shrink-0" />
        ) : (
          <span className="text-[9px] font-black tracking-tighter leading-none opacity-95">
            {slot.number}
          </span>
        )}
      </motion.button>
    );
  };

  // Shared Green Landscaped Median Strip between islands
  const renderMedianStrip = () => (
    <div className="w-full h-5 sm:h-6 rounded-md bg-emerald-950/70 border border-emerald-500/45 flex items-center justify-center px-3 my-1 shadow-inner">
      <div className="flex items-center gap-2 text-[10px] font-bold text-emerald-300 tracking-wide">
        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
        <span>{language === 'ar' ? 'متاح — مسطح أخضر' : 'Available — Landscaped Median'}</span>
      </div>
    </div>
  );

  // Shared Directional Driving Lane Arrow Strip
  const renderDrivingLane = (direction: 'right' | 'left') => {
    const ArrowIcon = direction === 'right' ? ArrowRight : ArrowLeft;
    return (
      <div className="w-full py-1 px-4 flex items-center justify-between text-neutral-500/60 select-none">
        {Array.from({ length: 6 }).map((_, i) => (
          <ArrowIcon key={i} className="w-3.5 h-3.5" />
        ))}
      </div>
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 sm:space-y-8 py-6 overflow-x-hidden">
      
      {/* Header Banner */}
      <div className="relative rounded-3xl overflow-hidden border border-[#e2dfd8] dark:border-[#33312b] shadow-xl">
        <div className="relative h-60 sm:h-72 w-full">
          <img
            src={siteImages.parking}
            alt="Smart Parking Shubra El-Kheima"
            className="w-full h-full object-cover object-center filter brightness-[0.85] dark:brightness-[0.4]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#12110f] via-[#12110f]/75 to-transparent" />
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-10 text-white space-y-2.5 sm:space-y-3">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#22c55e] text-white shadow-sm flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-white animate-ping" />
              {language === 'ar' ? 'حساسات IoT نشطة' : 'Active IoT Sensors'}
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-white/20 backdrop-blur-md text-white flex items-center gap-1.5">
              <Compass className="w-3.5 h-3.5 text-[#acbdad]" />
              {language === 'ar' ? 'المخطط المعماري المطور' : 'Architectural Zoning Blueprint'}
            </span>
          </div>

          <h1 className="text-2xl sm:text-5xl font-black tracking-tight drop-shadow-md">
            {t('smartParking')}
          </h1>

          <p className="max-w-3xl text-xs sm:text-sm text-neutral-300 font-normal leading-relaxed drop-shadow">
            {language === 'ar'
              ? 'مخطط هندسي ذكي مقسم إلى نطاق شحن السيارات الكهربائية المحيطي، وباكيات مخصصة لذوي الإعاقة، و4 جزر وسطية للسيارات القياسية مع الحجز الفوري برقم اللوحة.'
              : 'Engineered smart parking featuring perimeter EV charging bays, dedicated Handicap zones, 4 double-row standard islands, and instant license-plate booking.'}
          </p>
        </div>
      </div>

      {/* Prominent Active Reservation Banner */}
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
                          ({slot.vehicleType === 'ev' ? t('evCharging') : slot.vehicleType === 'disabled' ? t('disabledAccess') : t('regularParking')})
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

      {/* 5 Live Summary Dashboard Counters */}
      <div className="grid grid-cols-3 sm:grid-cols-5 gap-2 sm:gap-3">
        {/* 1. Total */}
        <div className="p-3 sm:p-4 rounded-2xl bg-white dark:bg-[#1b1a17] border border-[#e2dfd8] dark:border-[#33312b] shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between gap-1">
            <span className="text-[11px] sm:text-xs font-bold text-neutral-500 truncate">
              {language === 'ar' ? 'الإجمالي' : 'Total'}
            </span>
            <Car className="w-4 h-4 text-neutral-400 shrink-0" />
          </div>
          <span className="text-xl sm:text-2xl font-black text-[#12110f] dark:text-[#f6f6f4] mt-1">
            {totalSlots}
          </span>
        </div>

        {/* 2. Available */}
        <div className="p-3 sm:p-4 rounded-2xl bg-emerald-500/10 dark:bg-emerald-500/15 border border-emerald-500/30 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between gap-1">
            <span className="text-[11px] sm:text-xs font-bold text-emerald-800 dark:text-emerald-300 truncate">
              {language === 'ar' ? 'المتاح' : 'Available'}
            </span>
            <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
          </div>
          <span className="text-xl sm:text-2xl font-black text-emerald-600 dark:text-emerald-400 mt-1">
            {availableSlots}
          </span>
        </div>

        {/* 3. Reserved */}
        <div className="p-3 sm:p-4 rounded-2xl bg-amber-500/10 dark:bg-amber-500/15 border border-amber-500/30 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between gap-1">
            <span className="text-[11px] sm:text-xs font-bold text-amber-800 dark:text-amber-300 truncate">
              {language === 'ar' ? 'المحجوز' : 'Reserved'}
            </span>
            <Clock className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0" />
          </div>
          <span className="text-xl sm:text-2xl font-black text-amber-600 dark:text-amber-400 mt-1">
            {userReservedCount}
          </span>
        </div>

        {/* 4. EV Charging */}
        <div className="p-3 sm:p-4 rounded-2xl bg-[#0284c7]/10 dark:bg-[#0284c7]/20 border border-[#0284c7]/40 shadow-sm flex flex-col justify-between col-span-1 sm:col-span-1">
          <div className="flex items-center justify-between gap-1">
            <span className="text-[11px] sm:text-xs font-bold text-[#0369a1] dark:text-[#38bdf8] truncate">
              {language === 'ar' ? 'سيارات كهربائية' : 'EV Charging'}
            </span>
            <Zap className="w-4 h-4 text-[#0284c7] dark:text-[#38bdf8] shrink-0" />
          </div>
          <div className="flex items-baseline gap-1 mt-1">
            <span className="text-xl sm:text-2xl font-black text-[#0284c7] dark:text-[#38bdf8]">
              {evAvailableCount}
            </span>
            <span className="text-[10px] font-bold text-neutral-500">/ {evTotalCount}</span>
          </div>
        </div>

        {/* 5. Handicap */}
        <div className="p-3 sm:p-4 rounded-2xl bg-[#be123c]/10 dark:bg-[#be123c]/20 border border-[#be123c]/40 shadow-sm flex flex-col justify-between col-span-2 sm:col-span-1">
          <div className="flex items-center justify-between gap-1">
            <span className="text-[11px] sm:text-xs font-bold text-[#9f1239] dark:text-[#fb7185] truncate">
              {language === 'ar' ? 'ذوي الإعاقة' : 'Handicap'}
            </span>
            <Accessibility className="w-4 h-4 text-[#be123c] dark:text-[#fb7185] shrink-0" />
          </div>
          <div className="flex items-baseline gap-1 mt-1">
            <span className="text-xl sm:text-2xl font-black text-[#be123c] dark:text-[#fb7185]">
              {handicapAvailableCount}
            </span>
            <span className="text-[10px] font-bold text-neutral-500">/ {handicapTotalCount}</span>
          </div>
        </div>
      </div>

      {/* Color Legend & Reset Controls */}
      <div className="p-3.5 sm:p-4 rounded-2xl bg-white/80 dark:bg-[#1b1a17]/80 border border-[#e2dfd8] dark:border-[#33312b] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-semibold">
        <div className="flex flex-wrap items-center gap-2 sm:gap-4">
          <div className="flex items-center gap-1.5">
            <span className="w-3.5 h-3.5 rounded bg-emerald-600 inline-block shrink-0" />
            <span className="text-neutral-700 dark:text-neutral-300">
              {language === 'ar' ? 'عادي متاح' : 'Standard'}
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3.5 h-3.5 rounded bg-[#0284c7] flex items-center justify-center shrink-0">
              <Zap className="w-2.5 h-2.5 text-white fill-white" />
            </span>
            <span className="text-neutral-700 dark:text-neutral-300">
              {language === 'ar' ? 'شحن كهربائي' : 'EV Charging'}
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3.5 h-3.5 rounded bg-[#be123c] flex items-center justify-center shrink-0">
              <Accessibility className="w-2.5 h-2.5 text-white" />
            </span>
            <span className="text-neutral-700 dark:text-neutral-300">
              {language === 'ar' ? 'ذوي الإعاقة' : 'Handicap'}
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3.5 h-3.5 rounded bg-amber-500 ring-2 ring-amber-300 inline-block shrink-0" />
            <span className="text-neutral-700 dark:text-neutral-300">
              {language === 'ar' ? 'محجوز لك' : 'Reserved'}
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3.5 h-3.5 rounded bg-neutral-700 inline-block shrink-0" />
            <span className="text-neutral-700 dark:text-neutral-300">
              {t('occupied')}
            </span>
          </div>
        </div>

        <Button
          variant="outline"
          size="sm"
          onClick={handleResetSimulation}
          icon={<RotateCcw className="w-3.5 h-3.5" />}
          className="self-start sm:self-auto"
        >
          {t('resetSim')}
        </Button>
      </div>

      {/* Interactive Architectural Parking Blueprint Map */}
      <div className="rounded-3xl bg-[#161513] border-2 border-[#36342e] p-3.5 sm:p-6 shadow-2xl text-white space-y-4">
        
        {/* Mobile Swipe Hint Badge */}
        <div className="flex md:hidden items-center justify-between gap-2 px-3 py-2 rounded-xl bg-amber-500/15 border border-amber-500/30 text-amber-300 text-xs font-bold">
          <div className="flex items-center gap-1.5">
            <Compass className="w-4 h-4 shrink-0" />
            <span>{language === 'ar' ? 'اسحب يميناً ويساراً لاستعراض المخطط' : 'Swipe horizontally to explore map'}</span>
          </div>
          <span className="text-sm">⟷</span>
        </div>

        {/* Scrollable Architectural Blueprint Container (LTR preserves exact CAD geometry) */}
        <div className="w-full overflow-x-auto pb-3 scrollbar-thin scrollbar-thumb-neutral-700" dir="ltr">
          <div className="min-w-[740px] md:min-w-full bg-[#1d1c19] rounded-2xl border-2 border-[#3d3a33] p-3 sm:p-4 space-y-2">
            
            {/* TOP PERIMETER ROW: EV Charging (Left 16) + Top Entrance/Exit Gap + EV Charging (Right 4) */}
            <div className="flex items-stretch gap-2">
              {/* Corner spacer */}
              <div className="w-9 sm:w-10 shrink-0 rounded-md bg-[#0284c7]/20 border border-[#38bdf8]/30 flex items-center justify-center">
                <Zap className="w-3.5 h-3.5 text-[#38bdf8]" />
              </div>

              {/* Top Left EV Bays (16) */}
              <div className="flex-1 flex items-center gap-1">
                {getZoneSlots('perimeter-top-left').map((slot) => renderSlotButton(slot, 'vertical'))}
              </div>

              {/* Top Entrance/Exit Gap */}
              <div className="w-24 sm:w-28 shrink-0 rounded-lg border-2 border-dashed border-emerald-500/50 bg-emerald-500/10 flex flex-col items-center justify-center text-emerald-400 px-1">
                <div className="flex items-center gap-1">
                  <ArrowDown className="w-3.5 h-3.5 animate-bounce" />
                  <ArrowUp className="w-3.5 h-3.5" />
                </div>
                <span className="text-[9px] font-black uppercase tracking-wider text-center leading-tight">
                  {language === 'ar' ? 'مدخل / مخرج' : 'GATE IN/OUT'}
                </span>
              </div>

              {/* Top Right EV Bays (4) */}
              <div className="w-32 sm:w-36 shrink-0 flex items-center gap-1">
                {getZoneSlots('perimeter-top-right').map((slot) => renderSlotButton(slot, 'vertical'))}
              </div>

              {/* Corner spacer */}
              <div className="w-9 sm:w-10 shrink-0 rounded-md bg-[#0284c7]/20 border border-[#38bdf8]/30 flex items-center justify-center">
                <Zap className="w-3.5 h-3.5 text-[#38bdf8]" />
              </div>
            </div>

            {/* MIDDLE BODY: Left EV Column + 4 Central Double-Row Islands + Right EV Column */}
            <div className="flex items-stretch gap-2 sm:gap-3">
              
              {/* Left Vertical Perimeter Column (16 EV Slots) */}
              <div className="w-9 sm:w-10 shrink-0 flex flex-col justify-between gap-1 py-1">
                {getZoneSlots('perimeter-left').map((slot) => renderSlotButton(slot, 'horizontal'))}
              </div>

              {/* Center Area: 4 Double-Row Islands + Medians + Driving Lanes */}
              <div className="flex-1 flex flex-col justify-between py-1">
                
                {/* Driving Lane 1 (Top) */}
                {renderDrivingLane('right')}

                {/* ISLAND 1: Top Row = Handicap (Red ♿) | Bottom Row = Standard */}
                <div className="rounded-xl border border-neutral-700/80 bg-neutral-900/70 p-1.5 space-y-1">
                  <div className="flex items-center justify-between px-1 pb-0.5">
                    <span className="text-[10px] font-black text-[#fb7185] flex items-center gap-1">
                      <Accessibility className="w-3 h-3" />
                      {language === 'ar' ? 'ذوي الإعاقة / Handicap' : 'Handicap / ذوي الإعاقة'}
                    </span>
                    <span className="text-[10px] font-bold text-neutral-400">
                      {language === 'ar' ? 'الجزيرة 1' : 'Island 1'}
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    {getZoneSlots('island-1-top').map((slot) => renderSlotButton(slot, 'vertical'))}
                  </div>
                  <div className="h-[2px] bg-neutral-700/70 my-0.5" />
                  <div className="flex items-center gap-1">
                    {getZoneSlots('island-1-bottom').map((slot) => renderSlotButton(slot, 'vertical'))}
                  </div>
                </div>

                {renderMedianStrip()}
                {renderDrivingLane('left')}

                {/* ISLAND 2: Both Rows = Standard */}
                <div className="rounded-xl border border-neutral-700/80 bg-neutral-900/70 p-1.5 space-y-1">
                  <div className="flex items-center justify-between px-1 pb-0.5">
                    <span className="text-[10px] font-bold text-emerald-400">
                      {language === 'ar' ? 'سيارات قياسية' : 'Standard Parking'}
                    </span>
                    <span className="text-[10px] font-bold text-neutral-400">
                      {language === 'ar' ? 'الجزيرة 2' : 'Island 2'}
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    {getZoneSlots('island-2-top').map((slot) => renderSlotButton(slot, 'vertical'))}
                  </div>
                  <div className="h-[2px] bg-neutral-700/70 my-0.5" />
                  <div className="flex items-center gap-1">
                    {getZoneSlots('island-2-bottom').map((slot) => renderSlotButton(slot, 'vertical'))}
                  </div>
                </div>

                {renderMedianStrip()}
                {renderDrivingLane('right')}

                {/* ISLAND 3: Both Rows = Standard */}
                <div className="rounded-xl border border-neutral-700/80 bg-neutral-900/70 p-1.5 space-y-1">
                  <div className="flex items-center justify-between px-1 pb-0.5">
                    <span className="text-[10px] font-bold text-emerald-400">
                      {language === 'ar' ? 'سيارات قياسية' : 'Standard Parking'}
                    </span>
                    <span className="text-[10px] font-bold text-neutral-400">
                      {language === 'ar' ? 'الجزيرة 3' : 'Island 3'}
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    {getZoneSlots('island-3-top').map((slot) => renderSlotButton(slot, 'vertical'))}
                  </div>
                  <div className="h-[2px] bg-neutral-700/70 my-0.5" />
                  <div className="flex items-center gap-1">
                    {getZoneSlots('island-3-bottom').map((slot) => renderSlotButton(slot, 'vertical'))}
                  </div>
                </div>

                {renderMedianStrip()}
                {renderDrivingLane('left')}

                {/* ISLAND 4: Top Row = Standard | Bottom Row = Handicap (Red ♿) */}
                <div className="rounded-xl border border-neutral-700/80 bg-neutral-900/70 p-1.5 space-y-1">
                  <div className="flex items-center justify-between px-1 pb-0.5">
                    <span className="text-[10px] font-bold text-emerald-400">
                      {language === 'ar' ? 'سيارات قياسية' : 'Standard Parking'}
                    </span>
                    <span className="text-[10px] font-bold text-neutral-400">
                      {language === 'ar' ? 'الجزيرة 4' : 'Island 4'}
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    {getZoneSlots('island-4-top').map((slot) => renderSlotButton(slot, 'vertical'))}
                  </div>
                  <div className="h-[2px] bg-neutral-700/70 my-0.5" />
                  <div className="flex items-center gap-1">
                    {getZoneSlots('island-4-bottom').map((slot) => renderSlotButton(slot, 'vertical'))}
                  </div>
                  <div className="flex items-center justify-between px-1 pt-0.5">
                    <span className="text-[10px] font-black text-[#fb7185] flex items-center gap-1">
                      <Accessibility className="w-3 h-3" />
                      {language === 'ar' ? 'ذوي الإعاقة / Handicap' : 'Handicap / ذوي الإعاقة'}
                    </span>
                  </div>
                </div>

                {renderMedianStrip()}
                {renderDrivingLane('right')}
              </div>

              {/* Right Vertical Perimeter Column (16 EV Slots) */}
              <div className="w-9 sm:w-10 shrink-0 flex flex-col justify-between gap-1 py-1">
                {getZoneSlots('perimeter-right').map((slot) => renderSlotButton(slot, 'horizontal'))}
              </div>
            </div>

            {/* BOTTOM PERIMETER ROW: Bottom-Left Entry/Exit + EV Charging (14) + Bottom-Right Entry/Exit */}
            <div className="space-y-1.5">
              <div className="flex items-stretch gap-2">
                {/* Corner spacer */}
                <div className="w-9 sm:w-10 shrink-0 rounded-md bg-[#0284c7]/20 border border-[#38bdf8]/30 flex items-center justify-center">
                  <Zap className="w-3.5 h-3.5 text-[#38bdf8]" />
                </div>

                {/* Bottom Left Entry/Exit Gap */}
                <div className="w-20 sm:w-24 shrink-0 rounded-lg border-2 border-dashed border-rose-500/50 bg-rose-500/10 flex flex-col items-center justify-center text-rose-400 px-1">
                  <ArrowUp className="w-3.5 h-3.5" />
                  <span className="text-[8px] font-black uppercase tracking-wider text-center">
                    {language === 'ar' ? 'خروج / دخول' : 'EXIT / IN'}
                  </span>
                </div>

                {/* Bottom EV Charging Bays (14) */}
                <div className="flex-1 flex items-center gap-1">
                  {getZoneSlots('perimeter-bottom').map((slot) => renderSlotButton(slot, 'vertical'))}
                </div>

                {/* Bottom Right Entry/Exit Gap */}
                <div className="w-20 sm:w-24 shrink-0 rounded-lg border-2 border-dashed border-emerald-500/50 bg-emerald-500/10 flex flex-col items-center justify-center text-emerald-400 px-1">
                  <ArrowDown className="w-3.5 h-3.5" />
                  <span className="text-[8px] font-black uppercase tracking-wider text-center">
                    {language === 'ar' ? 'دخول / خروج' : 'IN / EXIT'}
                  </span>
                </div>

                {/* Corner spacer */}
                <div className="w-9 sm:w-10 shrink-0 rounded-md bg-[#0284c7]/20 border border-[#38bdf8]/30 flex items-center justify-center">
                  <Zap className="w-3.5 h-3.5 text-[#38bdf8]" />
                </div>
              </div>

              {/* Bottom EV Charging Label Banner */}
              <div className="flex items-center justify-center">
                <div className="px-4 py-1 rounded-full bg-[#0284c7]/25 border border-[#38bdf8]/50 text-[#38bdf8] text-[11px] font-black flex items-center gap-1.5 shadow-sm">
                  <Zap className="w-3.5 h-3.5 fill-[#38bdf8]" />
                  <span>{language === 'ar' ? 'شحن كهربائي / EV Charging' : 'EV Charging / شحن كهربائي'}</span>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Footer Info Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between border-t border-dashed border-neutral-700 pt-4 text-xs font-bold text-neutral-400 gap-2 text-center sm:text-left rtl:sm:text-right">
          <div className="flex items-center gap-2 text-emerald-400">
            <MapPin className="w-4 h-4 shrink-0" />
            <span>{t('directToMall')}</span>
          </div>
          <div className="text-[11px] text-neutral-400">
            {language === 'ar' ? 'سرعة السير القصوى داخل الحارات: 10 كم/س' : 'Max Lane Speed: 10 km/h'}
          </div>
          <div className="flex items-center gap-2 text-sky-400">
            <ShieldCheck className="w-4 h-4 shrink-0" />
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
              {selectedSlot.vehicleType === 'ev' ? (
                <Zap className="w-5 h-5 text-[#0284c7]" />
              ) : selectedSlot.vehicleType === 'disabled' ? (
                <Accessibility className="w-5 h-5 text-[#be123c]" />
              ) : (
                <Car className="w-5 h-5 text-[#8e8672]" />
              )}
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
                ? selectedSlot.vehicleType === 'ev'
                  ? 'bg-[#0284c7]/15 border border-[#0284c7]/30 text-[#0369a1] dark:text-[#38bdf8]'
                  : selectedSlot.vehicleType === 'disabled'
                  ? 'bg-[#be123c]/15 border border-[#be123c]/30 text-[#9f1239] dark:text-[#fb7185]'
                  : 'bg-emerald-500/15 border border-emerald-500/30 text-emerald-800 dark:text-emerald-300'
                : 'bg-rose-500/15 border border-rose-500/30 text-rose-800 dark:text-rose-300'
            }`}>
              {selectedSlot.isReservedByUser ? (
                <Sparkles className="w-6 h-6 text-amber-500 shrink-0" />
              ) : !selectedSlot.isOccupied ? (
                selectedSlot.vehicleType === 'ev' ? (
                  <Zap className="w-6 h-6 text-[#0284c7] shrink-0" />
                ) : selectedSlot.vehicleType === 'disabled' ? (
                  <Accessibility className="w-6 h-6 text-[#be123c] shrink-0" />
                ) : (
                  <CheckCircle2 className="w-6 h-6 text-emerald-500 shrink-0" />
                )
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
                  {selectedSlot.lane} — {selectedSlot.vehicleType === 'ev' ? t('evCharging') : selectedSlot.vehicleType === 'disabled' ? t('disabledAccess') : t('regularParking')}
                </div>
              </div>
            </div>

            {/* Available Slot: License Plate Input Form & 10-Minute Policy Alert */}
            {!selectedSlot.isOccupied && (
              <form onSubmit={handleConfirmReservation} className="space-y-4">
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

            {/* Already Reserved by User */}
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

            {/* Occupied Slot by Others */}
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
