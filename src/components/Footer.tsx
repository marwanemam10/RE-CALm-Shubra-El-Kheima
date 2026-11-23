import React from 'react';
import { Building2, MapPin, Compass, ShieldCheck, Heart } from 'lucide-react';
import { useAppThemeLanguage } from '../context/ThemeLanguageContext';
import { NavView } from '../types';

export const Footer: React.FC = () => {
  const { language, setActiveView, t } = useAppThemeLanguage();

  const handleNav = (view: NavView) => {
    setActiveView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="mt-20 border-t border-[#e2dfd8] dark:border-[#2b2a26] bg-[#f0eee9] dark:bg-[#151412] text-neutral-600 dark:text-neutral-400 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          
          {/* Col 1: Identity & Description */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#8e8672] flex items-center justify-center text-white shadow-glow-primary">
                <Building2 className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-[#12110f] dark:text-[#f6f6f4]">
                  {language === 'ar' ? 'مشروع RE-CALm - شبرا الخيمة' : 'RE-CALm - Shubra El-Kheima'}
                </h3>
                <p className="text-xs text-[#8e8672] dark:text-[#a8a08d] font-semibold">
                  {language === 'ar' ? 'مشروع التحول الحضري والهندسي المستدام' : 'Sustainable Urban Transformation Project'}
                </p>
              </div>
            </div>
            
            <p className="text-sm leading-relaxed max-w-lg text-neutral-700 dark:text-neutral-300">
              {language === 'ar'
                ? 'رؤية معمارية وهندسية شاملة لإعادة تنظيم وتأهيل قلب شبرا الخيمة وتوفير بيئة متكاملة تجمع بين التجارة، الترفيه المفتوح، الرعاية الصحية المتقدمة، المواصلات المنظمة، وأنظمة الركن الذكي.'
                : 'A holistic architectural and civil engineering vision to redevelop and modernize central Shubra El-Kheima, integrating retail hubs, open-air promenade dining, healthcare towers, multimodal transit, and smart parking.'}
            </p>

            <div className="flex items-center gap-2 text-xs font-medium text-neutral-500">
              <MapPin className="w-4 h-4 text-[#8e8672]" />
              <span>
                {language === 'ar'
                  ? 'محافظة القليوبية، شبرا الخيمة - محيط ميدان وكوبري عرابي ومساكن إسكو'
                  : 'Qalyubia Governorate, Shubra El-Kheima - Orabi Bridge & Esco Area'}
              </span>
            </div>
          </div>

          {/* Col 2: Hub Destinations Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#12110f] dark:text-[#f6f6f4] flex items-center gap-2">
              <Compass className="w-4 h-4 text-[#8e8672]" />
              <span>{language === 'ar' ? 'الوجهات والمحاور' : 'Key Destinations'}</span>
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <button 
                  onClick={() => handleNav('open-air-mall')} 
                  className="hover:text-[#8e8672] dark:hover:text-[#a8a08d] transition-colors"
                >
                  {t('openAirMall')}
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNav('city-mall')} 
                  className="hover:text-[#8e8672] dark:hover:text-[#a8a08d] transition-colors"
                >
                  {t('cityMall')}
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNav('hero-plaza')} 
                  className="hover:text-[#8e8672] dark:hover:text-[#a8a08d] transition-colors inline-flex items-center gap-1.5"
                >
                  <span>{language === 'ar' ? 'مول هيرو بلازا' : 'Hero Plaza Mall'}</span>
                  <span className="px-1.5 py-0.5 rounded-full text-[9px] font-black bg-amber-500/20 text-amber-700 dark:text-amber-300">
                    {language === 'ar' ? 'قريباً' : 'Upcoming'}
                  </span>
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNav('doctors-tower')} 
                  className="hover:text-[#8e8672] dark:hover:text-[#a8a08d] transition-colors"
                >
                  {t('doctorsTower')}
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNav('transport')} 
                  className="hover:text-[#8e8672] dark:hover:text-[#a8a08d] transition-colors"
                >
                  {t('publicTransport')}
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNav('parking')} 
                  className="hover:text-[#8e8672] dark:hover:text-[#a8a08d] transition-colors"
                >
                  {t('smartParking')}
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Smart Infrastructure Stats */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#12110f] dark:text-[#f6f6f4] flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#8e8672]" />
              <span>{language === 'ar' ? 'المعايير الذكية' : 'Smart Standards'}</span>
            </h4>
            <div className="p-4 rounded-xl bg-white/60 dark:bg-[#1f1e1a]/60 border border-[#e2dfd8] dark:border-[#33312b] space-y-2">
              <div className="text-xs font-semibold text-[#12110f] dark:text-neutral-200">
                {language === 'ar' ? 'إدارة ذكية للحركة والازدحام' : 'Smart Traffic & Crowd Management'}
              </div>
              <p className="text-xs text-neutral-500 leading-normal">
                {language === 'ar' 
                  ? 'حساسات ركن فورية، شاشات استرشادية، ومسارات مشاة مخصصة خالية من العوائق.'
                  : 'Real-time parking sensors, guidance signages, and obstacle-free pedestrian walks.'}
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-[#e2dfd8]/80 dark:border-[#2b2a26]/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <div>
            {t('allRightsReserved')}
          </div>
          <div className="flex items-center gap-1.5 text-neutral-500">
            <span>{language === 'ar' ? 'تم التصميم والتنفيذ برؤية هندسية معمارية' : 'Crafted with Architectural & Urban Precision'}</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
          </div>
        </div>
      </div>
    </footer>
  );
};
