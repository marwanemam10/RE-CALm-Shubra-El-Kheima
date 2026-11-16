import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Stethoscope, 
  MapPin, 
  Phone, 
  Clock, 
  Search, 
  Building, 
  Baby, 
  Brain, 
  Activity, 
  Bone, 
  HeartPulse, 
  Sparkles, 
  FlaskConical, 
  CheckCircle2, 
  Layers, 
  AlertCircle,
  UserPlus,
  Send,
  User,
  Calendar,
  Check
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useAppThemeLanguage } from '../context/ThemeLanguageContext';
import { doctorsOldTower, newTowerSpecialties, siteImages } from '../data/siteData';
import { Tabs } from '../components/ui/Tabs';
import { Select, SelectOption } from '../components/ui/Select';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { Modal } from '../components/ui/Modal';

export const DoctorsTowerPage: React.FC = () => {
  const { language, t } = useAppThemeLanguage();
  const [selectedTower, setSelectedTower] = useState<'old' | 'new'>('old');

  // Old Tower filter states
  const [oldSpecialtyFilter, setOldSpecialtyFilter] = useState<string>('all');
  const [oldSearchQuery, setOldSearchQuery] = useState('');

  // New Tower filter states (kept to maintain identical UI layout)
  const [newSpecialtyFilter, setNewSpecialtyFilter] = useState<string>('all');
  const [newSearchQuery, setNewSearchQuery] = useState('');

  // Doctor Registration Modal state
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [doctorName, setDoctorName] = useState('');
  const [doctorSpecialty, setDoctorSpecialty] = useState('');
  const [doctorMobile, setDoctorMobile] = useState('');
  const [doctorHours, setDoctorHours] = useState('');
  const [registerErrors, setRegisterErrors] = useState<{
    name?: string;
    specialty?: string;
    mobile?: string;
    hours?: string;
  }>({});
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Tower tabs
  const towerTabs = [
    {
      id: 'old',
      label: t('oldTower'),
      badge: <Badge variant="primary" size="sm">1 ش أحمد عرابي</Badge>
    },
    {
      id: 'new',
      label: t('newTower'),
      badge: <Badge variant="accent" size="sm">ميدان عرابي</Badge>
    }
  ];

  // Specialty options for Old Tower
  const oldSpecialtyOptions: SelectOption[] = [
    { value: 'all', label: language === 'ar' ? 'جميع التخصصات الطبية' : 'All Medical Specialties' },
    { value: 'internal', label: language === 'ar' ? 'الباطنة والكلى والغدد الصماء والدم' : 'Internal Medicine, Kidney & Endocrinology' },
    { value: 'obgyn', label: language === 'ar' ? 'النساء والتوليد والعقم' : 'Obstetrics & Gynecology' },
    { value: 'surgery', label: language === 'ar' ? 'الجراحة العامة والعظام والمسالك' : 'Surgery, Orthopedics & Urology' },
    { value: 'other', label: language === 'ar' ? 'الأنف والأذن، الجلدية، والعلاج الطبيعي' : 'ENT, Dermatology & Physical Therapy' },
  ];

  // Specialty options for New Tower
  const newSpecialtyOptions: SelectOption[] = [
    { value: 'all', label: language === 'ar' ? 'جميع التخصصات والأقسام' : 'All Departments & Specialties' },
    ...newTowerSpecialties.map((spec) => ({
      value: spec.id,
      label: spec.title[language]
    }))
  ];

  // Specialty options for registration modal
  const registrationSpecialtyOptions: SelectOption[] = [
    { value: '', label: language === 'ar' ? 'اختر التخصص الطبي...' : 'Select specialty...' },
    { value: 'pediatrics', label: language === 'ar' ? 'الأطفال وحديثي الولادة' : 'Pediatrics & Neonatology' },
    { value: 'neurology', label: language === 'ar' ? 'المخ والأعصاب ورسم المخ (EEG)' : 'Neurology & EEG' },
    { value: 'internal', label: language === 'ar' ? 'الباطنة والسكر والغدد الصماء' : 'Internal Medicine & Diabetes' },
    { value: 'orthopedics', label: language === 'ar' ? 'العظام والمفاصل وهشاشة العظام (DEXA)' : 'Orthopedics & DEXA Screening' },
    { value: 'obgyn', label: language === 'ar' ? 'النساء والتوليد وعلاج العقم' : 'Obstetrics & Gynecology' },
    { value: 'dermatology', label: language === 'ar' ? 'الجلدية والتجميل والليزر' : 'Dermatology & Cosmetology' },
    { value: 'dental', label: language === 'ar' ? 'طب وجراحة الأسنان' : 'Dentistry & Oral Surgery' },
    { value: 'ent', label: language === 'ar' ? 'الأنف والأذن والحنجرة' : 'ENT (Otolaryngology)' },
    { value: 'labs', label: language === 'ar' ? 'معامل التحاليل الطبية' : 'Medical Laboratories' },
    { value: 'other', label: language === 'ar' ? 'تخصص طبي آخر' : 'Other Specialty' },
  ];

  // Filter Old Tower doctors
  const filteredOldTowerDoctors = doctorsOldTower.filter((doc) => {
    const matchesSpecialty = oldSpecialtyFilter === 'all' || doc.specialtyKey === oldSpecialtyFilter;
    const q = oldSearchQuery.toLowerCase();
    const matchesSearch =
      doc.name[language].toLowerCase().includes(q) ||
      doc.specialtyName[language].toLowerCase().includes(q) ||
      doc.subSpecialty[language].toLowerCase().includes(q);
    return matchesSpecialty && matchesSearch;
  });

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 4500);
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errors: { name?: string; specialty?: string; mobile?: string; hours?: string } = {};

    if (!doctorName.trim()) {
      errors.name = language === 'ar' ? 'يرجى إدخال اسم الطبيب بالكامل' : 'Please enter doctor full name';
    }

    if (!doctorSpecialty.trim()) {
      errors.specialty = language === 'ar' ? 'يرجى اختيار التخصص الطبي' : 'Please select medical specialty';
    }

    if (!doctorMobile.trim()) {
      errors.mobile = language === 'ar' ? 'يرجى إدخال رقم الموبايل أو الحجز' : 'Please enter booking phone number';
    } else if (doctorMobile.trim().length < 10) {
      errors.mobile = language === 'ar' ? 'يرجى إدخال رقم هاتف صحيح' : 'Please enter a valid phone number';
    }

    if (!doctorHours.trim()) {
      errors.hours = language === 'ar' ? 'يرجى تحديد مواعيد وأيام العمل بالعيادة' : 'Please specify clinic days and hours';
    }

    if (Object.keys(errors).length > 0) {
      setRegisterErrors(errors);
      return;
    }

    setRegisterErrors({});
    setIsRegisterModalOpen(false);

    try {
      confetti({
        particleCount: 65,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch (err) {
      // safe fallback
    }

    const successMsg = language === 'ar'
      ? 'تم إرسال طلب انضمامك بنجاح! سيتم مراجعة البيانات وإضافة عيادتك في دليل البرج قريباً.'
      : 'Your registration request has been submitted! Your clinic details will be reviewed and added to the tower directory soon.';
    
    showToast(successMsg);

    // Reset fields
    setDoctorName('');
    setDoctorSpecialty('');
    setDoctorMobile('');
    setDoctorHours('');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 py-6">
      
      {/* Header Banner */}
      <div className="relative rounded-3xl overflow-hidden border border-[#e2dfd8] dark:border-[#33312b] shadow-xl">
        <div className="relative h-72 sm:h-96 w-full">
          <img
            src={siteImages.doctorsTower}
            alt="Doctors Tower Shubra El-Kheima"
            className="w-full h-full object-cover object-center filter brightness-[0.85] dark:brightness-[0.4]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#12110f] via-[#12110f]/75 to-transparent" />
        </div>

        {/* Content Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-10 text-white space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#8e8672] text-white">
              {language === 'ar' ? 'المجمع الطبي التخصصي' : 'Specialized Healthcare Hub'}
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-white/20 backdrop-blur-md text-white flex items-center gap-1.5">
              <Building className="w-3.5 h-3.5 text-[#acbdad]" />
              {language === 'ar' ? 'برجان طبيان متكاملان' : 'Dual Medical Towers'}
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black tracking-tight drop-shadow-md">
            {t('doctorsTower')}
          </h1>

          <p className="max-w-3xl text-sm sm:text-base text-neutral-300 font-normal leading-relaxed drop-shadow">
            {language === 'ar'
              ? 'صرح الرعاية الطبية الأول في شبرا الخيمة، يضم نخبة كبار أساتذة واستشاريي الطب في مختلف التخصصات، العيادات الخارجية المجهزة، ومراكز الفحوصات والتحاليل والعلاج الطبيعي.'
              : 'The benchmark medical destination in Shubra El-Kheima, housing elite professors and consultant specialists across internal medicine, surgery, pediatrics, diagnostics, and modern rehabilitation.'}
          </p>
        </div>
      </div>

      {/* Prominent Tower Switcher */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-[#12110f] dark:text-[#f6f6f4] flex items-center gap-2">
              <Building className="w-6 h-6 text-[#8e8672]" />
              <span>{language === 'ar' ? 'اختر المبنى الطبي' : 'Select Medical Tower'}</span>
            </h2>
            <p className="text-xs sm:text-sm text-neutral-500 mt-1">
              {language === 'ar'
                ? 'تنقل بسهولة بين برج الأطباء القديم وبرج الأطباء الجديد لاستعراض الأطباء والتخصصات'
                : 'Toggle seamlessly between the Old and New Doctors Towers to view consultants & clinics'}
            </p>
          </div>

          {/* Tower Selector Buttons */}
          <Tabs
            tabs={towerTabs}
            activeTab={selectedTower}
            onChange={(id) => setSelectedTower(id as 'old' | 'new')}
          />
        </div>
      </div>

      {/* VIEW 1: OLD DOCTORS' TOWER */}
      {selectedTower === 'old' && (
        <motion.div
          key="old-tower-view"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 15 }}
          className="space-y-8"
        >
          {/* Address & Building Badge */}
          <div className="p-4 rounded-2xl bg-white dark:bg-[#1b1a17] border border-[#e2dfd8] dark:border-[#383630] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#8e8672]/20 text-[#8e8672] dark:text-[#a8a08d] flex items-center justify-center shrink-0">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <div className="text-sm font-bold text-[#12110f] dark:text-white">
                  {t('oldTowerAddress')}
                </div>
                <div className="text-xs text-neutral-500">
                  {language === 'ar' 
                    ? 'يضم عيادات ومعامل الأمير ونخبة أطباء الباطنة والجراحة والنساء والأنف والأذن والعلاج الطبيعي'
                    : 'Features Al-Amir clinics & labs, general surgery, OB/GYN, and physiotherapy center'}
                </div>
              </div>
            </div>

            <Badge variant="emerald" size="md">
              {filteredOldTowerDoctors.length} {language === 'ar' ? 'أطباء واستشاريين' : 'Consultants'}
            </Badge>
          </div>

          {/* Filters: Specialty Dropdown + Search Box */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Select
              label={language === 'ar' ? 'تصفية حسب التخصص الطبي:' : 'Filter by Medical Specialty:'}
              options={oldSpecialtyOptions}
              value={oldSpecialtyFilter}
              onChange={setOldSpecialtyFilter}
            />

            <div>
              <label className="block text-xs font-semibold mb-1.5 text-neutral-600 dark:text-neutral-400">
                {language === 'ar' ? 'بحث عن اسم الطبيب أو العيادة:' : 'Search Doctor Name or Clinic:'}
              </label>
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 rtl:left-auto rtl:right-3 top-1/2 -translate-y-1/2 text-neutral-400" />
                <input
                  type="text"
                  value={oldSearchQuery}
                  onChange={(e) => setOldSearchQuery(e.target.value)}
                  placeholder={language === 'ar' ? 'مثال: د. أحمد زيدان، د. منى هيكل...' : 'e.g., Dr. Ahmed Zidan, Dr. Mona Heikal...'}
                  className="w-full pl-9 rtl:pl-4 rtl:pr-9 pr-4 py-2.5 rounded-xl bg-white dark:bg-[#1b1a17] border border-[#dedbd3] dark:border-[#383630] text-sm focus:outline-none focus:ring-2 focus:ring-[#8e8672]/40"
                />
              </div>
            </div>
          </div>

          {/* Doctors Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredOldTowerDoctors.map((doc, idx) => (
              <motion.div
                key={doc.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: idx * 0.05 }}
                className="p-6 rounded-3xl bg-white dark:bg-[#1b1a17] border border-[#e2dfd8] dark:border-[#33312b] shadow-card-soft dark:shadow-card-dark hover:shadow-xl hover:border-[#8e8672]/60 transition-all duration-300 flex flex-col justify-between space-y-5"
              >
                <div className="space-y-4">
                  {/* Doctor Card Top */}
                  <div className="flex items-start justify-between gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-[#8e8672]/15 text-[#8e8672] dark:text-[#d0c8bd] flex items-center justify-center shrink-0">
                      <Stethoscope className="w-6 h-6" />
                    </div>
                    <span className="px-2.5 py-1 rounded-lg text-xs font-bold bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 flex items-center gap-1">
                      <Layers className="w-3.5 h-3.5" />
                      {doc.floor[language]}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-[#12110f] dark:text-[#f6f6f4] tracking-tight">
                      {doc.name[language]}
                    </h3>
                    <p className="text-xs font-semibold text-[#8e8672] dark:text-[#a8a08d] mt-1">
                      {doc.specialtyName[language]}
                    </p>
                    <p className="text-xs text-neutral-600 dark:text-neutral-400 mt-2 leading-relaxed">
                      {doc.subSpecialty[language]}
                    </p>
                  </div>

                  {/* Schedule info if available */}
                  {doc.schedule && (
                    <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-800 dark:text-amber-300 flex items-center gap-2">
                      <Clock className="w-4 h-4 shrink-0" />
                      <span>{doc.schedule[language]}</span>
                    </div>
                  )}

                  {/* Note info if available */}
                  {doc.note && (
                    <div className="p-3 rounded-xl bg-neutral-100 dark:bg-neutral-800/60 text-xs text-neutral-600 dark:text-neutral-300 flex items-start gap-2">
                      <AlertCircle className="w-4 h-4 text-[#8e8672] shrink-0 mt-0.5" />
                      <span>{doc.note[language]}</span>
                    </div>
                  )}
                </div>

                {/* Contact Phone & Call Action */}
                <div className="pt-4 border-t border-[#f0ede6] dark:border-[#2b2a26] space-y-2">
                  {doc.phones && doc.phones.length > 0 ? (
                    <div className="flex flex-wrap gap-2">
                      {doc.phones.map((phone, pIdx) => (
                        <a
                          key={pIdx}
                          href={`tel:${phone}`}
                          className="flex-1 min-w-[130px] flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-[#8e8672] hover:bg-[#7a7260] text-white text-xs font-bold transition-all shadow-sm active:scale-95"
                        >
                          <Phone className="w-3.5 h-3.5" />
                          <span>{phone}</span>
                        </a>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-2 text-xs text-neutral-400 font-medium">
                      {language === 'ar' ? 'الحجز والاستعلام بالعيادة مباشرة' : 'Appointment at clinic reception'}
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>

          {filteredOldTowerDoctors.length === 0 && (
            <div className="text-center py-12 p-6 rounded-3xl bg-neutral-100 dark:bg-neutral-900/50 border border-[#e2dfd8] dark:border-[#33312b] space-y-2">
              <Stethoscope className="w-10 h-10 mx-auto text-neutral-400" />
              <h3 className="text-base font-bold text-neutral-700 dark:text-neutral-300">
                {language === 'ar' ? 'لم يتم العثور على أطباء مطابقين' : 'No matching doctors found'}
              </h3>
              <p className="text-xs text-neutral-500">
                {language === 'ar' ? 'يرجى تجربة كلمات بحث أخرى أو تغيير التخصص المحدد.' : 'Try a different search term or select another specialty.'}
              </p>
            </div>
          )}
        </motion.div>
      )}

      {/* VIEW 2: NEW DOCTORS' TOWER (Unified Structure with Empty State & Doctor Registration CTA) */}
      {selectedTower === 'new' && (
        <motion.div
          key="new-tower-view"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 15 }}
          className="space-y-8"
        >
          {/* Address & Building Badge */}
          <div className="p-4 rounded-2xl bg-white dark:bg-[#1b1a17] border border-[#e2dfd8] dark:border-[#383630] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#90a69c]/20 text-[#90a69c] flex items-center justify-center shrink-0">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <div className="text-sm font-bold text-[#12110f] dark:text-white">
                  {t('newTowerAddress')}
                </div>
                <div className="text-xs text-neutral-500">
                  {language === 'ar' 
                    ? 'صرح طبي حديث بميدان عرابي مجهز بأحدث وحدات رسم المخ ورنين العظام ومختبرات التحاليل'
                    : 'Modern healthcare tower at Orabi Square with high-spec digital diagnostic and screening units'}
                </div>
              </div>
            </div>

            <Badge variant="amber" size="md">
              {language === 'ar' ? '0 أطباء مسجلين حالياً' : '0 Registered Doctors'}
            </Badge>
          </div>

          {/* Filters: Specialty Dropdown + Search Box (EXACT SAME AS OLD TOWER) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Select
              label={language === 'ar' ? 'تصفية حسب التخصص الطبي:' : 'Filter by Medical Specialty:'}
              options={newSpecialtyOptions}
              value={newSpecialtyFilter}
              onChange={setNewSpecialtyFilter}
            />

            <div>
              <label className="block text-xs font-semibold mb-1.5 text-neutral-600 dark:text-neutral-400">
                {language === 'ar' ? 'بحث عن اسم الطبيب أو العيادة:' : 'Search Doctor Name or Clinic:'}
              </label>
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 rtl:left-auto rtl:right-3 top-1/2 -translate-y-1/2 text-neutral-400" />
                <input
                  type="text"
                  value={newSearchQuery}
                  onChange={(e) => setNewSearchQuery(e.target.value)}
                  placeholder={language === 'ar' ? 'مثال: د. محمد، أطفال، عظام، جلدية...' : 'e.g., Dr. Mohamed, Pediatrics, Ortho...'}
                  className="w-full pl-9 rtl:pl-4 rtl:pr-9 pr-4 py-2.5 rounded-xl bg-white dark:bg-[#1b1a17] border border-[#dedbd3] dark:border-[#383630] text-sm focus:outline-none focus:ring-2 focus:ring-[#8e8672]/40"
                />
              </div>
            </div>
          </div>

          {/* Sleek Centered Empty State & Doctor Registration CTA */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="p-8 sm:p-12 lg:p-16 rounded-3xl bg-white dark:bg-[#1b1a17] border-2 border-dashed border-[#dedbd3] dark:border-[#383630] text-center space-y-6 shadow-card-soft dark:shadow-card-dark"
          >
            {/* Center Icon */}
            <div className="w-20 h-20 rounded-3xl bg-[#8e8672]/15 text-[#8e8672] dark:text-[#a8a08d] flex items-center justify-center mx-auto shadow-sm">
              <Building className="w-10 h-10" />
            </div>

            <div className="space-y-3 max-w-xl mx-auto">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 text-amber-700 dark:text-amber-300 border border-amber-500/25 text-xs font-bold">
                <Sparkles className="w-3.5 h-3.5" />
                <span>{language === 'ar' ? 'مرحلة التجهيز والتسكين الطبي' : 'Clinic Onboarding & Preparation Phase'}</span>
              </div>

              <h3 className="text-xl sm:text-2xl font-black text-[#12110f] dark:text-white tracking-tight">
                {language === 'ar'
                  ? 'لا يوجد أطباء مسجلين في برج الأطباء الجديد حالياً - جاري تجهيز وتسكين العيادات'
                  : 'No doctors are currently registered in the New Doctors’ Tower – Clinics are currently being onboarded'}
              </h3>

              <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                {language === 'ar'
                  ? 'يتم حالياً استقبال طلبات نخبة الأطباء والاستشاريين للانضمام وتسكين العيادات والمراكز التخصصية في برج الأطباء الجديد (ميدان عرابي - أعلى بي تك).'
                  : 'We are currently accepting registration requests from specialized medical consultants to onboard their clinics at the New Doctors Tower (Orabi Square - above B.TECH).'}
              </p>
            </div>

            {/* Prominent CTA Button */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
              <Button
                variant="primary"
                size="lg"
                onClick={() => setIsRegisterModalOpen(true)}
                icon={<UserPlus className="w-5 h-5" />}
                className="shadow-glow-primary px-8"
              >
                {language === 'ar'
                  ? 'هل أنت طبيب؟ سجل عيادتك في البرج الجديد'
                  : 'Are you a Doctor? Register your clinic in the New Tower'}
              </Button>
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* Doctor Registration Modal */}
      <Modal
        isOpen={isRegisterModalOpen}
        onClose={() => setIsRegisterModalOpen(false)}
        title={
          <div className="flex items-center gap-2 text-base sm:text-lg">
            <UserPlus className="w-5 h-5 text-[#8e8672]" />
            <span>
              {language === 'ar'
                ? 'طلب تسجيل عيادة في برج الأطباء الجديد'
                : 'Register Clinic in New Doctors’ Tower'}
            </span>
          </div>
        }
      >
        <form onSubmit={handleRegisterSubmit} className="space-y-4">
          <p className="text-xs text-neutral-500 leading-relaxed">
            {language === 'ar'
              ? 'سجل بياناتك وسيتم التواصل معك من قِبل إدارة المشروع لاعتماد العيادة وإدراجها بدليل البرج.'
              : 'Submit your clinic info and the project administration will contact you to onboard your clinic.'}
          </p>

          {/* 1. Doctor's Full Name */}
          <div>
            <label className="block text-xs font-bold text-neutral-700 dark:text-neutral-300 mb-1.5">
              {language === 'ar' ? 'اسم الطبيب بالكامل *' : 'Doctor’s Full Name *'}
            </label>
            <div className="relative">
              <User className="w-4 h-4 absolute left-3 rtl:left-auto rtl:right-3 top-1/2 -translate-y-1/2 text-neutral-400" />
              <input
                type="text"
                value={doctorName}
                onChange={(e) => {
                  setDoctorName(e.target.value);
                  if (registerErrors.name) setRegisterErrors({ ...registerErrors, name: undefined });
                }}
                placeholder={language === 'ar' ? 'مثال: د. حسام فتحي النجار' : 'e.g., Dr. Hossam Fathy'}
                className={`w-full pl-9 rtl:pl-4 rtl:pr-9 pr-4 py-2.5 rounded-xl bg-white dark:bg-[#201f1b] border text-sm focus:outline-none focus:ring-2 focus:ring-[#8e8672]/40 ${
                  registerErrors.name ? 'border-rose-500' : 'border-[#dedbd3] dark:border-[#383630]'
                }`}
              />
            </div>
            {registerErrors.name && (
              <span className="text-[11px] text-rose-500 mt-1 block">
                {registerErrors.name}
              </span>
            )}
          </div>

          {/* 2. Medical Specialty */}
          <div>
            <label className="block text-xs font-bold text-neutral-700 dark:text-neutral-300 mb-1.5">
              {language === 'ar' ? 'التخصص الطبي *' : 'Medical Specialty *'}
            </label>
            <div className="relative">
              <Stethoscope className="w-4 h-4 absolute left-3 rtl:left-auto rtl:right-3 top-1/2 -translate-y-1/2 text-neutral-400 pointer-events-none" />
              <select
                value={doctorSpecialty}
                onChange={(e) => {
                  setDoctorSpecialty(e.target.value);
                  if (registerErrors.specialty) setRegisterErrors({ ...registerErrors, specialty: undefined });
                }}
                className={`w-full pl-9 rtl:pl-4 rtl:pr-9 pr-4 py-2.5 rounded-xl bg-white dark:bg-[#201f1b] border text-sm focus:outline-none focus:ring-2 focus:ring-[#8e8672]/40 text-[#12110f] dark:text-[#f6f6f4] ${
                  registerErrors.specialty ? 'border-rose-500' : 'border-[#dedbd3] dark:border-[#383630]'
                }`}
              >
                {registrationSpecialtyOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>
            {registerErrors.specialty && (
              <span className="text-[11px] text-rose-500 mt-1 block">
                {registerErrors.specialty}
              </span>
            )}
          </div>

          {/* 3. Mobile / Booking Number */}
          <div>
            <label className="block text-xs font-bold text-neutral-700 dark:text-neutral-300 mb-1.5">
              {language === 'ar' ? 'رقم الموبايل / الحجز *' : 'Mobile / Booking Number *'}
            </label>
            <div className="relative">
              <Phone className="w-4 h-4 absolute left-3 rtl:left-auto rtl:right-3 top-1/2 -translate-y-1/2 text-neutral-400" />
              <input
                type="tel"
                value={doctorMobile}
                onChange={(e) => {
                  setDoctorMobile(e.target.value);
                  if (registerErrors.mobile) setRegisterErrors({ ...registerErrors, mobile: undefined });
                }}
                placeholder={language === 'ar' ? '01xxxxxxxxx' : '01xxxxxxxxx'}
                className={`w-full pl-9 rtl:pl-4 rtl:pr-9 pr-4 py-2.5 rounded-xl bg-white dark:bg-[#201f1b] border text-sm focus:outline-none focus:ring-2 focus:ring-[#8e8672]/40 ${
                  registerErrors.mobile ? 'border-rose-500' : 'border-[#dedbd3] dark:border-[#383630]'
                }`}
              />
            </div>
            {registerErrors.mobile && (
              <span className="text-[11px] text-rose-500 mt-1 block">
                {registerErrors.mobile}
              </span>
            )}
          </div>

          {/* 4. Working Hours & Days */}
          <div>
            <label className="block text-xs font-bold text-neutral-700 dark:text-neutral-300 mb-1.5">
              {language === 'ar' ? 'مواعيد وأيام العمل بالعيادة *' : 'Clinic Working Hours & Days *'}
            </label>
            <div className="relative">
              <Calendar className="w-4 h-4 absolute left-3 rtl:left-auto rtl:right-3 top-1/2 -translate-y-1/2 text-neutral-400" />
              <input
                type="text"
                value={doctorHours}
                onChange={(e) => {
                  setDoctorHours(e.target.value);
                  if (registerErrors.hours) setRegisterErrors({ ...registerErrors, hours: undefined });
                }}
                placeholder={language === 'ar' ? 'مثال: السبت والاثنين والأربعاء من 6 م إلى 10 م' : 'e.g., Sat, Mon, Wed from 6 PM to 10 PM'}
                className={`w-full pl-9 rtl:pl-4 rtl:pr-9 pr-4 py-2.5 rounded-xl bg-white dark:bg-[#201f1b] border text-sm focus:outline-none focus:ring-2 focus:ring-[#8e8672]/40 ${
                  registerErrors.hours ? 'border-rose-500' : 'border-[#dedbd3] dark:border-[#383630]'
                }`}
              />
            </div>
            {registerErrors.hours && (
              <span className="text-[11px] text-rose-500 mt-1 block">
                {registerErrors.hours}
              </span>
            )}
          </div>

          {/* Actions */}
          <div className="pt-3 flex items-center justify-end gap-3 border-t border-[#f0ede6] dark:border-[#2b2a26]">
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => setIsRegisterModalOpen(false)}
            >
              {language === 'ar' ? 'إلغاء' : 'Cancel'}
            </Button>
            <Button
              type="submit"
              variant="primary"
              size="md"
              icon={<Send className="w-4 h-4 rtl:rotate-180" />}
            >
              {language === 'ar' ? 'إرسال طلب الانضمام' : 'Submit Registration'}
            </Button>
          </div>
        </form>
      </Modal>

      {/* Floating Interactive Toast Feedback */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 30, scale: 0.95 }}
            className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 px-5 py-3 rounded-2xl bg-[#1b1a17] text-white border border-[#8e8672]/60 shadow-2xl flex items-center gap-3 text-xs sm:text-sm font-bold max-w-md text-center"
          >
            <Sparkles className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
};
