import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppThemeLanguage } from './context/ThemeLanguageContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { LandingPage } from './pages/LandingPage';
import { OpenAirMallPage } from './pages/OpenAirMallPage';
import { CityMallPage } from './pages/CityMallPage';
import { DoctorsTowerPage } from './pages/DoctorsTowerPage';
import { PublicTransportPage } from './pages/PublicTransportPage';
import { SmartParkingPage } from './pages/SmartParkingPage';

export const App: React.FC = () => {
  const { activeView } = useAppThemeLanguage();

  const renderActiveView = () => {
    switch (activeView) {
      case 'open-air-mall':
        return <OpenAirMallPage key="open-air-mall" />;
      case 'city-mall':
        return <CityMallPage key="city-mall" />;
      case 'doctors-tower':
        return <DoctorsTowerPage key="doctors-tower" />;
      case 'transport':
        return <PublicTransportPage key="transport" />;
      case 'parking':
        return <SmartParkingPage key="parking" />;
      case 'hub':
      default:
        return <LandingPage key="hub" />;
    }
  };

  return (
    <div className="min-h-screen w-full max-w-full overflow-x-hidden flex flex-col justify-between selection:bg-[#8e8672]/30 selection:text-[#12110f] dark:selection:text-white">
      {/* Persistent Navbar */}
      <Navbar />

      {/* Main Dynamic View with Animated Transitions */}
      <main className="flex-1 w-full max-w-full overflow-x-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeView}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.35, ease: 'easeInOut' }}
          >
            {renderActiveView()}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Persistent Footer */}
      <Footer />
    </div>
  );
};

export default App;
