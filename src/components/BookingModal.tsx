import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  AlertTriangle, 
  Calendar, 
  Clock, 
  CreditCard, 
  DollarSign, 
  UploadCloud, 
  CheckCircle2, 
  Gift, 
  Copy, 
  ExternalLink, 
  User, 
  Phone, 
  Sparkles, 
  FileText, 
  X, 
  Check, 
  Image as ImageIcon,
  Building,
  Layers,
  Percent
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useAppThemeLanguage } from '../context/ThemeLanguageContext';
import { DoctorProfile } from '../types';
import { Modal } from './ui/Modal';
import { Button } from './ui/Button';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  doctor: DoctorProfile | null;
}

type AppointmentType = 'consultation' | 'regular' | 'urgent';
type PaymentMethod = 'card' | 'instapay';

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  doctor,
}) => {
  const { language } = useAppThemeLanguage();

  const [appointmentType, setAppointmentType] = useState<AppointmentType>('regular');
  const [patientName, setPatientName] = useState('');
  const [patientMobile, setPatientMobile] = useState('');
  const [bookingDate, setBookingDate] = useState(() => {
    const today = new Date();
    today.setDate(today.getDate() + 1);
    return today.toISOString().split('T')[0];
  });
  const [timeSlot, setTimeSlot] = useState('07:30 PM');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('card');

  // Card fields
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvv, setCardCvv] = useState('');

  // InstaPay fields
  const [instapayReceipt, setInstapayReceipt] = useState<File | null>(null);
  const [instapayReceiptPreview, setInstapayReceiptPreview] = useState<string | null>(null);
  const [copiedInstaHandle, setCopiedInstaHandle] = useState(false);
  const [copiedPromoCode, setCopiedPromoCode] = useState(false);

  // Status
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSuccess, setIsSuccess] = useState(false);
  const [bookingRef, setBookingRef] = useState('');

  if (!doctor) return null;

  const instaHandle = (doctor.phones && doctor.phones[0]) ? `${doctor.phones[0]}@instapay` : 'shubra.clinics@instapay';

  const prices = {
    consultation: doctor.examinationFee?.consultation || 150,
    regular: doctor.examinationFee?.regular || 300,
    urgent: doctor.examinationFee?.urgent || 450,
  };

  const selectedPrice = prices[appointmentType];

  const handleReceiptUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setInstapayReceipt(file);
      const reader = new FileReader();
      reader.onload = (event) => {
        setInstapayReceiptPreview(event.target?.result as string);
      };
      reader.readAsDataURL(file);
      if (errors.receipt) {
        setErrors((prev) => ({ ...prev, receipt: '' }));
      }
    }
  };

  const handleCopyInstaHandle = () => {
    navigator.clipboard.writeText(instaHandle);
    setCopiedInstaHandle(true);
    setTimeout(() => setCopiedInstaHandle(false), 2500);
  };

  const handleCopyPromo = () => {
    navigator.clipboard.writeText('SHUBRA10');
    setCopiedPromoCode(true);
    setTimeout(() => setCopiedPromoCode(false), 2500);
  };

  const handleSubmitBooking = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: { [key: string]: string } = {};

    if (!patientName.trim()) {
      newErrors.name = language === 'ar' ? 'يرجى إدخال اسم المريض' : 'Please enter patient name';
    }

    if (!patientMobile.trim() || patientMobile.trim().length < 10) {
      newErrors.mobile = language === 'ar' ? 'يرجى إدخال رقم موبايل صحيح' : 'Please enter a valid phone number';
    }

    if (paymentMethod === 'card') {
      if (!cardNumber.trim() || cardNumber.replace(/\s/g, '').length < 16) {
        newErrors.card = language === 'ar' ? 'يرجى إدخال رقم بطاقة صحيح مكون من 16 رقماً' : 'Please enter a 16-digit card number';
      }
      if (!cardExpiry.trim()) {
        newErrors.expiry = language === 'ar' ? 'تاريخ الانتهاء مطلوب' : 'Expiry required';
      }
      if (!cardCvv.trim() || cardCvv.length < 3) {
        newErrors.cvv = language === 'ar' ? 'رمز CVV مطلوب' : 'CVV required';
      }
    } else if (paymentMethod === 'instapay') {
      if (!instapayReceipt) {
        newErrors.receipt = language === 'ar' 
          ? 'إرفاق صورة إيصال التحويل إجباري لتأكيد الحجز عبر إنستاباي' 
          : 'Transfer receipt screenshot is mandatory for InstaPay';
      }
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    const ref = `#MED-${Math.floor(10000 + Math.random() * 90000)}`;
    setBookingRef(ref);
    setIsSuccess(true);

    try {
      confetti({
        particleCount: 80,
        spread: 80,
        origin: { y: 0.55 },
      });
    } catch (e) {
      // safe fallback
    }
  };

  const resetModalState = () => {
    setIsSuccess(false);
    setInstapayReceipt(null);
    setInstapayReceiptPreview(null);
    setCardNumber('');
    setCardExpiry('');
    setCardCvv('');
    setPatientName('');
    setPatientMobile('');
    setErrors({});
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={resetModalState}
      className="max-w-2xl max-h-[92vh] overflow-y-auto"
      title={
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#8e8672]/20 text-[#8e8672] flex items-center justify-center shrink-0">
            <Calendar className="w-5 h-5" />
          </div>
          <div>
            <div className="text-base font-bold text-[#12110f] dark:text-white">
              {language === 'ar' ? `حجز موعد كشف - ${doctor.name.ar}` : `Book Appointment - ${doctor.name.en}`}
            </div>
            <div className="text-xs text-neutral-500 font-normal">
              {doctor.specialtyName[language]} • {doctor.floor[language]}
            </div>
          </div>
        </div>
      }
    >
      <AnimatePresence mode="wait">
        {isSuccess ? (
          /* SUCCESS SCREEN */
          <motion.div
            key="success-screen"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="text-center py-6 space-y-6"
          >
            <div className="w-20 h-20 rounded-full bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto shadow-sm">
              <CheckCircle2 className="w-12 h-12 stroke-[2.5]" />
            </div>

            <div className="space-y-2">
              <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border border-emerald-500/25 text-xs font-bold inline-block">
                {language === 'ar' ? 'تم تأكيد الحجز بنجاح' : 'Booking Confirmed Successfully'}
              </span>
              <h3 className="text-2xl font-black text-[#12110f] dark:text-white">
                {language === 'ar' ? 'شكراً لك! تم تسجيل موعدك الطبي' : 'Thank You! Your Appointment is Booked'}
              </h3>
              <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 max-w-md mx-auto">
                {language === 'ar'
                  ? `تم إرسال تفاصيل الموعد إلى رقم ${patientMobile}. يرجى الحضور قبل الموعد بـ 15 دقيقة بالدور المحدد.`
                  : `Booking confirmation sent to ${patientMobile}. Please arrive 15 minutes early.`}
              </p>
            </div>

            {/* Booking Details Ticket */}
            <div className="p-4 rounded-2xl bg-neutral-100 dark:bg-neutral-800/70 border border-neutral-200 dark:border-neutral-700 text-xs text-start space-y-2 max-w-md mx-auto">
              <div className="flex justify-between border-b border-neutral-200 dark:border-neutral-700 pb-2 font-bold">
                <span className="text-neutral-500">{language === 'ar' ? 'رقم الحجز المرجعي:' : 'Reference Code:'}</span>
                <span className="font-mono text-emerald-600 dark:text-emerald-400 text-sm">{bookingRef}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-500">{language === 'ar' ? 'الطبيب:' : 'Doctor:'}</span>
                <span className="font-bold text-[#12110f] dark:text-white">{doctor.name[language]}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-500">{language === 'ar' ? 'نوع الحجز والمبلغ:' : 'Type & Fee:'}</span>
                <span className="font-bold text-[#12110f] dark:text-white">
                  {appointmentType === 'consultation' ? (language === 'ar' ? 'استشارة' : 'Consultation') : appointmentType === 'regular' ? (language === 'ar' ? 'كشف عادي' : 'Regular Exam') : (language === 'ar' ? 'كشف مستعجل' : 'Urgent Exam')} • {selectedPrice} ج.م
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-500">{language === 'ar' ? 'الموعد:' : 'Date & Time:'}</span>
                <span className="font-bold text-[#12110f] dark:text-white">{bookingDate} • {timeSlot}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-500">{language === 'ar' ? 'طريقة السداد:' : 'Payment:'}</span>
                <span className="font-bold text-[#12110f] dark:text-white">{paymentMethod === 'card' ? (language === 'ar' ? 'بطاقة بنكية' : 'Bank Card') : 'InstaPay'}</span>
              </div>
            </div>

            {/* 10% Pharmacy Discount Banner */}
            <div className="p-5 rounded-2xl bg-gradient-to-r from-emerald-500/15 via-amber-500/15 to-emerald-500/15 border-2 border-emerald-500/30 text-start space-y-3 max-w-md mx-auto shadow-sm">
              <div className="flex items-center gap-2 text-emerald-800 dark:text-emerald-300 font-black text-sm">
                <Gift className="w-5 h-5 text-emerald-600 dark:text-emerald-400 animate-bounce" />
                <span>{language === 'ar' ? 'هدية حجزك الطبي: كود خصم 10% بصيدلية العزبي!' : 'Booking Gift: 10% Off at El-Ezaby Pharmacy!'}</span>
              </div>
              <p className="text-xs text-neutral-600 dark:text-neutral-300 leading-relaxed">
                {language === 'ar'
                  ? 'تم تفعيل خصم 10% فوري على كافة الأدوية والمستلزمات الطبية في صيدلية العزبي (الدور الأول بالبرج).'
                  : 'Enjoy 10% instant discount on medications & healthcare supplies at El-Ezaby Pharmacy (1st Floor).'}
              </p>
              <div className="flex items-center justify-between bg-white dark:bg-black/50 p-2.5 rounded-xl border border-emerald-500/40">
                <div>
                  <span className="text-[10px] text-neutral-400 block font-bold uppercase">{language === 'ar' ? 'كود الخصم الحصري:' : 'Promo Code:'}</span>
                  <span className="font-mono font-black text-base tracking-wider text-emerald-700 dark:text-emerald-300">SHUBRA10</span>
                </div>
                <button
                  type="button"
                  onClick={handleCopyPromo}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-all"
                >
                  {copiedPromoCode ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedPromoCode ? (language === 'ar' ? 'تم النسخ!' : 'Copied!') : (language === 'ar' ? 'نسخ الكود' : 'Copy')}</span>
                </button>
              </div>
            </div>

            <Button
              variant="primary"
              size="md"
              className="w-full max-w-md"
              onClick={resetModalState}
            >
              {language === 'ar' ? 'تم، إغلاق النافذة' : 'Done, Close'}
            </Button>
          </motion.div>
        ) : (
          /* FORM WORKFLOW */
          <form onSubmit={handleSubmitBooking} className="space-y-6">
            
            {/* 1. Cancellation Policy Notice (Mandatory Warning Banner) */}
            <div className="p-3.5 rounded-2xl bg-amber-500/10 dark:bg-amber-500/15 border-2 border-amber-500/30 text-amber-900 dark:text-amber-200 flex items-start gap-3 text-xs leading-relaxed">
              <AlertTriangle className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold block mb-0.5">
                  {language === 'ar' ? 'سياسة إلغاء وتعديل المواعيد:' : 'Cancellation & Modification Policy:'}
                </span>
                <span>
                  {language === 'ar'
                    ? 'تنويه هام: لا يمكن إلغاء أو تعديل الحجز قبل الموعد بـ 6 ساعات حرصاً على جدول المواعيد وتواجد الطبيب بالعيادة.'
                    : 'Important Notice: Bookings cannot be canceled or modified within 6 hours of the scheduled appointment.'}
                </span>
              </div>
            </div>

            {/* 2. Appointment Type Selection (Radio cards with pricing) */}
            <div className="space-y-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-neutral-600 dark:text-neutral-400">
                {language === 'ar' ? 'نوع الكشف والموعد:' : 'Appointment Type & Fee:'}
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {/* Consultation */}
                <button
                  type="button"
                  onClick={() => setAppointmentType('consultation')}
                  className={`p-3.5 rounded-2xl border text-start transition-all ${
                    appointmentType === 'consultation'
                      ? 'border-[#8e8672] bg-[#8e8672]/15 ring-2 ring-[#8e8672]/40 shadow-sm'
                      : 'border-[#dedbd3] dark:border-[#383630] bg-white dark:bg-[#201f1b] hover:bg-neutral-50 dark:hover:bg-neutral-800'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-bold text-[#12110f] dark:text-white">
                      {language === 'ar' ? 'استشارة' : 'Consultation'}
                    </span>
                    <span className="text-xs font-black text-[#8e8672] dark:text-[#a8a08d]">
                      {prices.consultation} ج.م
                    </span>
                  </div>
                  <span className="text-[11px] text-neutral-500 block leading-tight">
                    {language === 'ar' ? 'متابعة نتائج التحاليل والفحوصات' : 'Follow-up on lab & test results'}
                  </span>
                </button>

                {/* Regular Examination */}
                <button
                  type="button"
                  onClick={() => setAppointmentType('regular')}
                  className={`p-3.5 rounded-2xl border text-start transition-all ${
                    appointmentType === 'regular'
                      ? 'border-[#8e8672] bg-[#8e8672]/15 ring-2 ring-[#8e8672]/40 shadow-sm'
                      : 'border-[#dedbd3] dark:border-[#383630] bg-white dark:bg-[#201f1b] hover:bg-neutral-50 dark:hover:bg-neutral-800'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-bold text-[#12110f] dark:text-white">
                      {language === 'ar' ? 'كشف عادي' : 'Regular Exam'}
                    </span>
                    <span className="text-xs font-black text-[#8e8672] dark:text-[#a8a08d]">
                      {prices.regular} ج.م
                    </span>
                  </div>
                  <span className="text-[11px] text-neutral-500 block leading-tight">
                    {language === 'ar' ? 'فحص سريري كامل وتشخيص دقيق' : 'Full clinical checkup & prescription'}
                  </span>
                </button>

                {/* Urgent Examination */}
                <button
                  type="button"
                  onClick={() => setAppointmentType('urgent')}
                  className={`p-3.5 rounded-2xl border text-start transition-all ${
                    appointmentType === 'urgent'
                      ? 'border-rose-500 bg-rose-500/10 ring-2 ring-rose-500/30 shadow-sm'
                      : 'border-[#dedbd3] dark:border-[#383630] bg-white dark:bg-[#201f1b] hover:bg-neutral-50 dark:hover:bg-neutral-800'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-bold text-rose-600 dark:text-rose-400">
                      {language === 'ar' ? 'كشف مستعجل' : 'Urgent Exam'}
                    </span>
                    <span className="text-xs font-black text-rose-600 dark:text-rose-400">
                      {prices.urgent} ج.م
                    </span>
                  </div>
                  <span className="text-[11px] text-neutral-500 block leading-tight">
                    {language === 'ar' ? 'أولوية قصوى ودخول فوري' : 'Priority express slot with zero waiting'}
                  </span>
                </button>
              </div>
            </div>

            {/* 3. Patient Details (Name, Mobile, Date, Time Slot) */}
            <div className="space-y-3">
              <label className="block text-xs font-bold uppercase tracking-wider text-neutral-600 dark:text-neutral-400">
                {language === 'ar' ? 'بيانات المريض وموعد الحضور:' : 'Patient Details & Schedule:'}
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* Patient Name */}
                <div>
                  <div className="relative">
                    <User className="w-4 h-4 absolute left-3 rtl:left-auto rtl:right-3 top-1/2 -translate-y-1/2 text-neutral-400" />
                    <input
                      type="text"
                      value={patientName}
                      onChange={(e) => {
                        setPatientName(e.target.value);
                        if (errors.name) setErrors((prev) => ({ ...prev, name: '' }));
                      }}
                      placeholder={language === 'ar' ? 'اسم المريض بالكامل *' : 'Patient Full Name *'}
                      className={`w-full pl-9 rtl:pl-4 rtl:pr-9 pr-4 py-2.5 rounded-xl bg-white dark:bg-[#201f1b] border text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#8e8672]/40 ${
                        errors.name ? 'border-rose-500' : 'border-[#dedbd3] dark:border-[#383630]'
                      }`}
                    />
                  </div>
                  {errors.name && <span className="text-[11px] text-rose-500 mt-1 block">{errors.name}</span>}
                </div>

                {/* Mobile Number */}
                <div>
                  <div className="relative">
                    <Phone className="w-4 h-4 absolute left-3 rtl:left-auto rtl:right-3 top-1/2 -translate-y-1/2 text-neutral-400" />
                    <input
                      type="tel"
                      value={patientMobile}
                      onChange={(e) => {
                        setPatientMobile(e.target.value);
                        if (errors.mobile) setErrors((prev) => ({ ...prev, mobile: '' }));
                      }}
                      placeholder={language === 'ar' ? 'رقم الموبايل للتواصل *' : 'Mobile Number *'}
                      className={`w-full pl-9 rtl:pl-4 rtl:pr-9 pr-4 py-2.5 rounded-xl bg-white dark:bg-[#201f1b] border text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#8e8672]/40 ${
                        errors.mobile ? 'border-rose-500' : 'border-[#dedbd3] dark:border-[#383630]'
                      }`}
                    />
                  </div>
                  {errors.mobile && <span className="text-[11px] text-rose-500 mt-1 block">{errors.mobile}</span>}
                </div>

                {/* Preferred Date */}
                <div>
                  <label className="block text-[11px] text-neutral-500 mb-1">
                    {language === 'ar' ? 'تاريخ الحجز:' : 'Booking Date:'}
                  </label>
                  <div className="relative">
                    <Calendar className="w-4 h-4 absolute left-3 rtl:left-auto rtl:right-3 top-1/2 -translate-y-1/2 text-neutral-400" />
                    <input
                      type="date"
                      value={bookingDate}
                      onChange={(e) => setBookingDate(e.target.value)}
                      className="w-full pl-9 rtl:pl-4 rtl:pr-9 pr-4 py-2 rounded-xl bg-white dark:bg-[#201f1b] border border-[#dedbd3] dark:border-[#383630] text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#8e8672]/40"
                    />
                  </div>
                </div>

                {/* Time Slot Selection */}
                <div>
                  <label className="block text-[11px] text-neutral-500 mb-1">
                    {language === 'ar' ? 'الموعد المتاح بالعيادة:' : 'Available Time Slot:'}
                  </label>
                  <div className="relative">
                    <Clock className="w-4 h-4 absolute left-3 rtl:left-auto rtl:right-3 top-1/2 -translate-y-1/2 text-neutral-400 pointer-events-none" />
                    <select
                      value={timeSlot}
                      onChange={(e) => setTimeSlot(e.target.value)}
                      className="w-full pl-9 rtl:pl-4 rtl:pr-9 pr-4 py-2 rounded-xl bg-white dark:bg-[#201f1b] border border-[#dedbd3] dark:border-[#383630] text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#8e8672]/40 text-[#12110f] dark:text-white"
                    >
                      <option value="06:30 PM">06:30 PM</option>
                      <option value="07:00 PM">07:00 PM</option>
                      <option value="07:30 PM">07:30 PM (موصى به)</option>
                      <option value="08:00 PM">08:00 PM</option>
                      <option value="08:30 PM">08:30 PM</option>
                      <option value="09:00 PM">09:00 PM</option>
                      <option value="09:30 PM">09:30 PM</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* 4. Payment Method Selection (Card vs InstaPay) */}
            <div className="space-y-3 pt-2 border-t border-[#f0ede6] dark:border-[#2b2a26]">
              <div className="flex items-center justify-between">
                <label className="block text-xs font-bold uppercase tracking-wider text-neutral-600 dark:text-neutral-400">
                  {language === 'ar' ? 'طريقة السداد وتأكيد الحجز:' : 'Payment Method:'}
                </label>
                <div className="text-xs font-black text-[#8e8672] dark:text-[#a8a08d]">
                  {language === 'ar' ? 'المبلغ المستحق: ' : 'Total Amount: '}{selectedPrice} ج.م
                </div>
              </div>

              {/* Payment Method Tabs */}
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('card')}
                  className={`py-2.5 px-3 rounded-xl border flex items-center justify-center gap-2 text-xs font-bold transition-all ${
                    paymentMethod === 'card'
                      ? 'bg-[#8e8672] text-white border-[#8e8672] shadow-sm'
                      : 'bg-white dark:bg-[#201f1b] text-neutral-700 dark:text-neutral-300 border-[#dedbd3] dark:border-[#383630]'
                  }`}
                >
                  <CreditCard className="w-4 h-4" />
                  <span>{language === 'ar' ? 'البطاقة البنكية (Visa / Master)' : 'Credit / Debit Card'}</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('instapay')}
                  className={`py-2.5 px-3 rounded-xl border flex items-center justify-center gap-2 text-xs font-bold transition-all ${
                    paymentMethod === 'instapay'
                      ? 'bg-purple-700 text-white border-purple-700 shadow-sm'
                      : 'bg-white dark:bg-[#201f1b] text-neutral-700 dark:text-neutral-300 border-[#dedbd3] dark:border-[#383630]'
                  }`}
                >
                  <span className="font-mono font-black text-sm">IP</span>
                  <span>{language === 'ar' ? 'إنستاباي (InstaPay)' : 'InstaPay'}</span>
                </button>
              </div>

              {/* PAYMENT OPTION A: BANK CARD */}
              {paymentMethod === 'card' && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="p-4 rounded-2xl bg-neutral-50 dark:bg-neutral-800/60 border border-neutral-200 dark:border-neutral-700 space-y-3"
                >
                  <div>
                    <label className="block text-[11px] font-bold text-neutral-600 dark:text-neutral-400 mb-1">
                      {language === 'ar' ? 'رقم البطاقة (16 رقم):' : 'Card Number:'}
                    </label>
                    <input
                      type="text"
                      maxLength={19}
                      value={cardNumber}
                      onChange={(e) => {
                        setCardNumber(e.target.value);
                        if (errors.card) setErrors((prev) => ({ ...prev, card: '' }));
                      }}
                      placeholder="XXXX XXXX XXXX XXXX"
                      className="w-full p-2.5 rounded-xl bg-white dark:bg-[#1b1a17] border border-[#dedbd3] dark:border-[#383630] font-mono text-xs sm:text-sm tracking-wider"
                    />
                    {errors.card && <span className="text-[11px] text-rose-500 mt-1 block">{errors.card}</span>}
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-bold text-neutral-600 dark:text-neutral-400 mb-1">
                        {language === 'ar' ? 'تاريخ الانتهاء:' : 'Expiry Date:'}
                      </label>
                      <input
                        type="text"
                        maxLength={5}
                        value={cardExpiry}
                        onChange={(e) => {
                          setCardExpiry(e.target.value);
                          if (errors.expiry) setErrors((prev) => ({ ...prev, expiry: '' }));
                        }}
                        placeholder="MM/YY"
                        className="w-full p-2.5 rounded-xl bg-white dark:bg-[#1b1a17] border border-[#dedbd3] dark:border-[#383630] font-mono text-xs sm:text-sm"
                      />
                      {errors.expiry && <span className="text-[11px] text-rose-500 mt-1 block">{errors.expiry}</span>}
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-neutral-600 dark:text-neutral-400 mb-1">
                        {language === 'ar' ? 'رمز الأمان (CVV):' : 'CVV:'}
                      </label>
                      <input
                        type="password"
                        maxLength={3}
                        value={cardCvv}
                        onChange={(e) => {
                          setCardCvv(e.target.value);
                          if (errors.cvv) setErrors((prev) => ({ ...prev, cvv: '' }));
                        }}
                        placeholder="•••"
                        className="w-full p-2.5 rounded-xl bg-white dark:bg-[#1b1a17] border border-[#dedbd3] dark:border-[#383630] font-mono text-xs sm:text-sm text-center"
                      />
                      {errors.cvv && <span className="text-[11px] text-rose-500 mt-1 block">{errors.cvv}</span>}
                    </div>
                  </div>
                </motion.div>
              )}

              {/* PAYMENT OPTION B: INSTAPAY */}
              {paymentMethod === 'instapay' && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="p-4 rounded-2xl bg-purple-500/10 dark:bg-purple-950/30 border border-purple-500/30 space-y-4"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-purple-500/20 pb-3">
                    <div>
                      <span className="text-[11px] font-bold text-purple-900 dark:text-purple-300 block">
                        {language === 'ar' ? 'عنوان الدفع الخاص بالعيادة (InstaPay Handle):' : 'Clinic InstaPay Address:'}
                      </span>
                      <span className="font-mono font-black text-sm text-[#12110f] dark:text-white">
                        {instaHandle}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={handleCopyInstaHandle}
                        className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-white dark:bg-[#201f1b] border border-purple-500/30 text-purple-700 dark:text-purple-300 text-xs font-bold hover:bg-purple-50"
                      >
                        {copiedInstaHandle ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                        <span>{copiedInstaHandle ? (language === 'ar' ? 'تم النسخ' : 'Copied') : (language === 'ar' ? 'نسخ' : 'Copy')}</span>
                      </button>

                      <a
                        href="https://instapay.eg"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-purple-700 hover:bg-purple-800 text-white text-xs font-bold shadow-sm"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                        <span>{language === 'ar' ? 'افتح تطبيق إنستاباي' : 'Open InstaPay'}</span>
                      </a>
                    </div>
                  </div>

                  {/* MANDATORY SCREENSHOT UPLOAD */}
                  <div className="space-y-2">
                    <label className="block text-xs font-bold text-purple-900 dark:text-purple-300">
                      {language === 'ar' ? 'ارفق صورة إيصال التحويل (إجباري لتأكيد الحجز) *' : 'Upload Transfer Receipt Screenshot (Required) *'}
                    </label>

                    {instapayReceiptPreview ? (
                      <div className="relative rounded-2xl overflow-hidden border-2 border-purple-500 max-h-48 flex items-center justify-center bg-black/5">
                        <img
                          src={instapayReceiptPreview}
                          alt="Receipt Preview"
                          className="max-h-48 object-contain"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            setInstapayReceipt(null);
                            setInstapayReceiptPreview(null);
                          }}
                          className="absolute top-2 right-2 p-1.5 rounded-full bg-rose-600 text-white shadow-md hover:bg-rose-700 transition-colors"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ) : (
                      <label className="flex flex-col items-center justify-center p-5 rounded-2xl border-2 border-dashed border-purple-400/60 dark:border-purple-500/40 hover:bg-purple-500/15 cursor-pointer transition-colors text-center">
                        <UploadCloud className="w-8 h-8 text-purple-600 dark:text-purple-400 mb-1" />
                        <span className="text-xs font-bold text-purple-900 dark:text-purple-200">
                          {language === 'ar' ? 'اضغط هنا لرفع صورة سكرين شوت التحويل' : 'Click to upload payment receipt screenshot'}
                        </span>
                        <span className="text-[10px] text-neutral-500 mt-0.5">
                          PNG, JPG, JPEG (حد أقصى 5 ميجابايت)
                        </span>
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={handleReceiptUpload}
                        />
                      </label>
                    )}

                    {errors.receipt && (
                      <span className="text-[11px] text-rose-500 font-bold block">
                        {errors.receipt}
                      </span>
                    )}
                  </div>
                </motion.div>
              )}
            </div>

            {/* Actions Bar */}
            <div className="pt-3 flex items-center justify-between gap-3 border-t border-[#f0ede6] dark:border-[#2b2a26]">
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={resetModalState}
              >
                {language === 'ar' ? 'إلغاء' : 'Cancel'}
              </Button>

              <Button
                type="submit"
                variant="primary"
                size="md"
                className="px-8 shadow-glow-primary"
                disabled={paymentMethod === 'instapay' && !instapayReceipt}
                icon={<CheckCircle2 className="w-4 h-4" />}
              >
                {language === 'ar' 
                  ? `تأكيد الحجز وسداد ${selectedPrice} ج.م`
                  : `Confirm & Pay ${selectedPrice} EGP`}
              </Button>
            </div>

          </form>
        )}
      </AnimatePresence>
    </Modal>
  );
};
