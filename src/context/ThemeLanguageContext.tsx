import React, { createContext, useContext, useState, useEffect } from 'react';
import { Language, Theme, NavView } from '../types';

interface ThemeLanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
  activeView: NavView;
  setActiveView: (view: NavView) => void;
  t: (key: string) => string;
}

const translations: Record<string, { ar: string; en: string }> = {
  // Navigation & General
  hubTitle: { ar: 'مشروع RE-CALm (شبرا الخيمة)', en: 'RE-CALm - Shubra El-Kheima' },
  hubSubtitle: { ar: 'المركز الحضري الذكي المتكامل', en: 'Smart Urban Redevelopment Hub' },
  backToHub: { ar: 'العودة للرئيسية', en: 'Back to Hub' },
  exploreHub: { ar: 'استكشف الوجهات', en: 'Explore Destinations' },
  allRightsReserved: { ar: 'جميع الحقوق محفوظة © مشروع RE-CALm - شبرا الخيمة', en: 'All rights reserved © RE-CALm Project - Shubra El-Kheima' },
  engineeringSimulation: { ar: 'محاكاة هندسية تفاعلية', en: 'Interactive Engineering Simulation' },
  
  // Destination labels
  openAirMall: { ar: 'المول المفتوح', en: 'Open Air Mall' },
  cityMall: { ar: 'سيتي مول', en: 'City Mall' },
  doctorsTower: { ar: 'برج الأطباء', en: "Doctors' Tower" },
  publicTransport: { ar: 'النقل العام والمواقف', en: 'Public Transport Hub' },
  smartParking: { ar: 'الباركينج الذكي', en: 'Smart Parking' },
  heroPlaza: { ar: 'هيرو بلازا مول', en: 'Hero Plaza Mall' },
  underConstruction: { ar: 'تحت الإنشاء', en: 'Under Construction' },
  commercialAndAdmin: { ar: 'محلات تجارية ومكاتب إدارية', en: 'Commercial Shops & Administrative Offices' },

  // Mall & Doctor labels
  workingHours: { ar: 'مواعيد العمل', en: 'Working Hours' },
  location: { ar: 'الموقع الجغرافي', en: 'Location' },
  specialty: { ar: 'التخصص الطبي', en: 'Medical Specialty' },
  allSpecialties: { ar: 'جميع التخصصات', en: 'All Specialties' },
  searchPlaceholder: { ar: 'ابحث عن متجر، طبيب، أو وجهة...', en: 'Search for a store, doctor, or line...' },
  callDoctor: { ar: 'اتصال للحجز والاستفسار', en: 'Call for Appointment' },
  oldTower: { ar: 'برج الأطباء القديم', en: "Old Doctors' Tower" },
  newTower: { ar: 'برج الأطباء الجديد', en: "New Doctors' Tower" },
  oldTowerAddress: { ar: '1 شارع أحمد عرابي (أعلى النساجون الشرقيون)', en: '1 Ahmed Orabi St. (Above Oriental Weavers)' },
  newTowerAddress: { ar: 'ميدان عرابي (أعلى بي تك)', en: 'Orabi Square (Above B.TECH)' },

  // Transport
  firstBus: { ar: 'أول أتوبيس', en: 'First Bus' },
  lastBus: { ar: 'آخر أتوبيس', en: 'Last Bus' },
  frequency: { ar: 'معدل التقاطر', en: 'Frequency' },
  bahtimStation: { ar: 'موقف بهتيم (مساكن إسكو)', en: 'Bahtim Station (Esco)' },
  orabiStation: { ar: 'موقف عرابي (كوبري عرابي)', en: 'Orabi Station (Bridge)' },
  allStations: { ar: 'جميع المحطات والمواقف', en: 'All Stations' },
  searchBus: { ar: 'إلى أين تريد الذهاب؟ (مثلاً: رمسيس، التجمع، مدينة نصر، العباسية...)', en: 'Where to? (e.g., Ramses, Tagamoa, Nasr City, Abbassia...)' },
  routeDetails: { ar: 'خط السير والمحطات الرئيسية', en: 'Route Path & Key Stops' },

  // Parking
  totalSlots: { ar: 'إجمالي الباكيات', en: 'Total Slots' },
  availableSlots: { ar: 'الباكيات المتاحة', en: 'Available Slots' },
  occupiedSlots: { ar: 'الباكيات المشغولة', en: 'Occupied Slots' },
  myReservations: { ar: 'حجوزاتي الحالية', en: 'My Reservations' },
  resetSim: { ar: 'إعادة ضبط المحاكاة', en: 'Reset Simulation' },
  reserveSlot: { ar: 'حجز الباكية', en: 'Reserve Slot' },
  cancelReservation: { ar: 'إلغاء الحجز', en: 'Cancel Reservation' },
  slotReservedSuccess: { ar: 'تم حجز الباكية بنجاح!', en: 'Slot reserved successfully!' },
  slotFreedSuccess: { ar: 'تم إلغاء الحجز وإتاحة الباكية', en: 'Reservation cancelled, slot is now free.' },
  lane: { ar: 'حارة', en: 'Lane' },
  occupied: { ar: 'مشغول', en: 'Occupied' },
  available: { ar: 'متاح', en: 'Available' },
  reserved: { ar: 'محجوز لك', en: 'Reserved by you' },
  evCharging: { ar: 'شحن كهربائي', en: 'EV Charging' },
  disabledAccess: { ar: 'أصحاب الهمم', en: 'Accessible' },
  regularParking: { ar: 'ركن قياسي', en: 'Standard Bay' },
  entranceGate: { ar: 'بوابة الدخول الرئيسية (شارع عرابي)', en: 'Main Entrance (Orabi St.)' },
  exitGate: { ar: 'بوابة الخروج ومسار المول', en: 'Exit Gate & Mall Walkway' },
  directToMall: { ar: 'ممشى مباشر إلى المول المفتوح والباركينج', en: 'Direct Walkway to Open Air Mall' },
};

const ThemeLanguageContext = createContext<ThemeLanguageContextType | undefined>(undefined);

export const ThemeLanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('ar');
  const [theme, setTheme] = useState<Theme>('light');
  const [activeView, setActiveView] = useState<NavView>('hub');

  // Handle theme class on html element
  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [theme]);

  // Handle language dir and fonts on html & body
  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute('lang', language);
    root.setAttribute('dir', language === 'ar' ? 'rtl' : 'ltr');
    document.body.className = `${
      language === 'ar' ? 'font-arabic' : 'font-english'
    } bg-[#f6f6f4] text-[#12110f] dark:bg-[#12110f] dark:text-[#f6f6f4] antialiased transition-colors duration-300`;
  }, [language]);

  const toggleLanguage = () => {
    setLanguage(prev => (prev === 'ar' ? 'en' : 'ar'));
  };

  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  const t = (key: string): string => {
    if (translations[key]) {
      return translations[key][language] || key;
    }
    return key;
  };

  return (
    <ThemeLanguageContext.Provider
      value={{
        language,
        setLanguage,
        toggleLanguage,
        theme,
        setTheme,
        toggleTheme,
        activeView,
        setActiveView,
        t,
      }}
    >
      {children}
    </ThemeLanguageContext.Provider>
  );
};

export const useAppThemeLanguage = () => {
  const context = useContext(ThemeLanguageContext);
  if (!context) {
    throw new Error('useAppThemeLanguage must be used within a ThemeLanguageProvider');
  }
  return context;
};
