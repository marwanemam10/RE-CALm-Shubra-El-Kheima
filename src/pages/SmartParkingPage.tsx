import React, { useState } from 'react';
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
  Info
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
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Counters
  const totalSlots = slots.length;
  const occupiedSlots = slots.filter((s) => s.isOccupied).length;
  const availableSlots = slots.filter((s) => !s.isOccupied).length;
  const userReservedSlots = slots.filter((s) => s.isReservedByUser).length;

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  const handleSlotClick = (slot: ParkingSlot) => {
    setSelectedSlot(slot);
    setIsModalOpen(true);
  };

  const handleConfirmReservation = () => {
    if (!selectedSlot) return;

    if (selectedSlot.isReservedByUser) {
      // Cancel reservation
      setSlots((prev) =>
        prev.map((s) =>
          s.id === selectedSlot.id
            ? { ...s, isOccupied: false, isReservedByUser: false }
            : s
        )
      );
      showToast(
        language === 'ar'
          ? `تم إلغاء حجز الباكية رقم ${selectedSlot.id} وإتاحتها للجميع`
          : `Reservation for Spot ${selectedSlot.id} cancelled successfully.`
      );
    } else if (!selectedSlot.isOccupied) {
      // Reserve slot
      setSlots((prev) =>
        prev.map((s) =>
          s.id === selectedSlot.id
            ? { ...s, isOccupied: true, isReservedByUser: true }
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
          ? `تم حجز الباكية رقم ${selectedSlot.id} بنجاح!`
          : `Spot ${selectedSlot.id} Reserved Successfully!`
      );
    }

    setIsModalOpen(false);
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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 py-6">
      
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
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#22c55e] text-white shadow-sm">
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
              ? 'نظام هندسي ذكي لتنظيم حركة انتظار السيارات في شبرا الخيمة. يتيح فحص الحارات لحظياً وحجز الباكيات الشاغرة فورياً مع تقليل الانبعاثات والازدحام المروري.'
              : 'An automated civil engineering parking management system for Shubra El-Kheima. Features real-time lane occupancy, instant slot reservation, and seamless pedestrian access to the Open Air Mall.'}
          </p>
        </div>
      </div>

      {/* Live Dashboard Bar with Real-time Counters */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {/* Total Slots */}
        <div className="p-5 rounded-2xl bg-white dark:bg-[#1b1a17] border border-[#e2dfd8] dark:border-[#33312b] shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold text-neutral-500 block">
              {t('totalSlots')}
            </span>
            <span className="text-2xl sm:text-3xl font-black text-[#12110f] dark:text-[#f6f6f4] mt-1 block">
              {totalSlots}
            </span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center text-neutral-600 dark:text-neutral-400">
            <Car className="w-6 h-6" />
          </div>
        </div>

        {/* Available Slots (Emerald Green) */}
        <div className="p-5 rounded-2xl bg-emerald-500/10 dark:bg-emerald-500/15 border border-emerald-500/30 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold text-emerald-800 dark:text-emerald-300 block">
              {t('availableSlots')}
            </span>
            <span className="text-2xl sm:text-3xl font-black text-emerald-600 dark:text-emerald-400 mt-1 block">
              {availableSlots}
            </span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-emerald-500/20 text-emerald-600 dark:text-emerald-300 flex items-center justify-center">
            <CheckCircle2 className="w-6 h-6" />
          </div>
        </div>

        {/* Occupied Slots (Coral / Red) */}
        <div className="p-5 rounded-2xl bg-rose-500/10 dark:bg-rose-500/15 border border-rose-500/30 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold text-rose-800 dark:text-rose-300 block">
              {t('occupiedSlots')}
            </span>
            <span className="text-2xl sm:text-3xl font-black text-rose-600 dark:text-rose-400 mt-1 block">
              {occupiedSlots}
            </span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-rose-500/20 text-rose-600 dark:text-rose-300 flex items-center justify-center">
            <XCircle className="w-6 h-6" />
          </div>
        </div>

        {/* My Reservations & Reset */}
        <div className="p-5 rounded-2xl bg-amber-500/10 dark:bg-amber-500/15 border border-amber-500/30 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold text-amber-800 dark:text-amber-300 block">
              {t('myReservations')}
            </span>
            <span className="text-2xl sm:text-3xl font-black text-amber-600 dark:text-amber-400 mt-1 block">
              {userReservedSlots}
            </span>
          </div>
          <button
            onClick={handleResetSimulation}
            title={t('resetSim')}
            className="p-3 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 text-amber-700 dark:text-amber-300 transition-colors"
          >
            <RotateCcw className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Legend & Instructions */}
      <div className="p-4 rounded-2xl bg-white/70 dark:bg-[#1b1a17]/70 border border-[#e2dfd8] dark:border-[#33312b] flex flex-wrap items-center justify-between gap-4 text-xs font-medium">
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-md bg-emerald-500 shadow-sm" />
            <span className="text-neutral-700 dark:text-neutral-300">{t('available')} (اضغط للحجز)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-md bg-rose-500 shadow-sm" />
            <span className="text-neutral-700 dark:text-neutral-300">{t('occupied')}</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-md bg-amber-500 ring-2 ring-amber-300 shadow-sm animate-pulse" />
            <span className="text-neutral-700 dark:text-neutral-300">{t('reserved')}</span>
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
      <div className="relative rounded-3xl bg-[#161513] border-2 border-[#36342e] p-6 sm:p-10 shadow-2xl overflow-x-auto text-white">
        
        {/* Top Boundary: Entrance Gate from Orabi St. */}
        <div className="flex items-center justify-between border-b border-dashed border-neutral-700 pb-6 mb-8 text-xs font-bold uppercase tracking-wider text-neutral-400">
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

        {/* Lanes Layout Container */}
        <div className="space-y-8 min-w-[700px]">
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
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleSlotClick(slot)}
                        className={`relative group h-28 rounded-xl flex flex-col justify-between p-2.5 transition-all duration-300 border-2 text-left rtl:text-right ${
                          isUserReserved
                            ? 'bg-amber-500/20 border-amber-500 text-amber-300 shadow-[0_0_15px_rgba(245,158,11,0.4)] ring-2 ring-amber-400/50'
                            : isAvailable
                            ? 'bg-emerald-950/40 border-emerald-500 hover:bg-emerald-900/50 text-emerald-300 hover:shadow-[0_0_15px_rgba(34,197,94,0.3)]'
                            : 'bg-rose-950/30 border-rose-600/60 text-rose-300 opacity-90'
                        }`}
                      >
                        {/* Top info: Slot ID and Feature Icon */}
                        <div className="flex items-center justify-between w-full">
                          <span className="text-xs font-black tracking-wider">
                            {slot.id}
                          </span>
                          {slot.vehicleType === 'ev' && (
                            <Zap className="w-3.5 h-3.5 text-sky-400 shrink-0" />
                          )}
                          {slot.vehicleType === 'disabled' && (
                            <Accessibility className="w-3.5 h-3.5 text-purple-400 shrink-0" />
                          )}
                        </div>

                        {/* Center Icon: Car or Free bay mark */}
                        <div className="flex items-center justify-center my-auto">
                          {isUserReserved ? (
                            <Car className="w-8 h-8 text-amber-400 animate-pulse" />
                          ) : isAvailable ? (
                            <div className="w-8 h-8 rounded-full border border-dashed border-emerald-400/60 flex items-center justify-center text-emerald-400 group-hover:scale-110 transition-transform">
                              <span className="text-[10px] font-bold">P</span>
                            </div>
                          ) : (
                            <Car className="w-8 h-8 text-rose-500" />
                          )}
                        </div>

                        {/* Status Label */}
                        <div className="w-full text-center">
                          <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                            isUserReserved
                              ? 'bg-amber-500/30 text-amber-300'
                              : isAvailable
                              ? 'bg-emerald-500/30 text-emerald-300 group-hover:bg-emerald-500 group-hover:text-white transition-colors'
                              : 'bg-rose-500/20 text-rose-400'
                          }`}>
                            {isUserReserved ? t('reserved') : isAvailable ? t('available') : t('occupied')}
                          </span>
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

        {/* Bottom Boundary: Exit Gate & Pedestrian Mall Walkway */}
        <div className="flex items-center justify-between border-t border-dashed border-neutral-700 pt-6 mt-8 text-xs font-bold uppercase tracking-wider text-neutral-400">
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

      {/* Slot Reservation / Inspection Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={
          selectedSlot ? (
            <div className="flex items-center gap-2">
              <Car className="w-5 h-5 text-[#8e8672]" />
              <span>
                {language === 'ar' ? `تفاصيل الباكية ${selectedSlot.id}` : `Slot ${selectedSlot.id} Details`}
              </span>
            </div>
          ) : ''
        }
      >
        {selectedSlot && (
          <div className="space-y-6">
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
                    ? t('reserved')
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

            {/* Action buttons */}
            <div className="pt-2 flex items-center justify-end gap-3">
              <Button
                variant="ghost"
                onClick={() => setIsModalOpen(false)}
              >
                {language === 'ar' ? 'إغلاق' : 'Close'}
              </Button>

              {selectedSlot.isReservedByUser ? (
                <Button
                  variant="outline"
                  className="border-rose-500/40 text-rose-600 hover:bg-rose-500/10"
                  onClick={handleConfirmReservation}
                >
                  {t('cancelReservation')}
                </Button>
              ) : !selectedSlot.isOccupied ? (
                <Button
                  variant="emerald"
                  onClick={handleConfirmReservation}
                  icon={<Check className="w-4 h-4" />}
                >
                  {t('reserveSlot')}
                </Button>
              ) : (
                <Button
                  variant="secondary"
                  disabled
                >
                  {t('occupied')}
                </Button>
              )}
            </div>
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
