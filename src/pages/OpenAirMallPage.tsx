import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Coffee, 
  Clock, 
  MapPin, 
  Sparkles, 
  Car, 
  Search, 
  Utensils, 
  Check, 
  ChevronRight,
  Flame,
  Salad,
  IceCream,
  CupSoda,
  Star,
  Eye,
  MessageSquare
} from 'lucide-react';
import { useAppThemeLanguage } from '../context/ThemeLanguageContext';
import { openAirVenues, siteImages } from '../data/siteData';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { VenueImage } from '../components/VenueImage';
import { VenueDetailsModal } from '../components/VenueDetailsModal';
import { OpenAirVenue, VenueReview } from '../types';

export const OpenAirMallPage: React.FC = () => {
  const { language, setActiveView, t } = useAppThemeLanguage();
  const [searchQuery, setSearchQuery] = useState('');

  // Reviews dictionary keyed by venue id: { [venueId: string]: VenueReview[] }
  const [reviewsMap, setReviewsMap] = useState<{ [venueId: string]: VenueReview[] }>(() => {
    const initialMap: { [venueId: string]: VenueReview[] } = {};
    openAirVenues.forEach((venue) => {
      try {
        const stored = localStorage.getItem(`re_calm_venue_reviews_${venue.id}`);
        if (stored) {
          initialMap[venue.id] = JSON.parse(stored);
        } else {
          initialMap[venue.id] = venue.sampleReviews || [];
        }
      } catch (e) {
        initialMap[venue.id] = venue.sampleReviews || [];
      }
    });
    return initialMap;
  });

  // Modal State
  const [selectedVenue, setSelectedVenue] = useState<OpenAirVenue | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenVenueModal = (venue: OpenAirVenue) => {
    setSelectedVenue(venue);
    setIsModalOpen(true);
  };

  const handleAddReview = (venueId: string, newReview: VenueReview) => {
    setReviewsMap((prev) => {
      const currentList = prev[venueId] || [];
      const updatedList = [newReview, ...currentList];
      try {
        localStorage.setItem(`re_calm_venue_reviews_${venueId}`, JSON.stringify(updatedList));
      } catch (e) {
        // storage fallback
      }
      return {
        ...prev,
        [venueId]: updatedList
      };
    });
  };

  const getVenueRatingStats = (venue: OpenAirVenue) => {
    const venueReviews = reviewsMap[venue.id] || venue.sampleReviews || [];
    if (venueReviews.length === 0) {
      return {
        rating: (venue.rating || 4.8).toFixed(1),
        count: venue.reviewCount || 15
      };
    }
    const sum = venueReviews.reduce((acc, r) => acc + r.rating, 0);
    const avg = (sum / venueReviews.length).toFixed(1);
    return {
      rating: avg,
      count: venueReviews.length
    };
  };

  const filteredVenues = openAirVenues.filter((venue) => {
    const q = searchQuery.toLowerCase();
    return (
      venue.name[language].toLowerCase().includes(q) ||
      venue.category[language].toLowerCase().includes(q) ||
      venue.description[language].toLowerCase().includes(q)
    );
  });

  const getVenueIcon = (id: string) => {
    switch (id) {
      case 'brew-district':
        return <Coffee className="w-5 h-5 text-amber-700 dark:text-amber-400" />;
      case 'green-bowl':
        return <Salad className="w-5 h-5 text-emerald-700 dark:text-emerald-400" />;
      case 'sweet-avenue':
        return <IceCream className="w-5 h-5 text-rose-700 dark:text-rose-400" />;
      case 'urban-bites':
        return <Flame className="w-5 h-5 text-orange-700 dark:text-orange-400" />;
      case 'juice-lab':
        return <CupSoda className="w-5 h-5 text-teal-700 dark:text-teal-400" />;
      default:
        return <Utensils className="w-5 h-5 text-[#8e8672]" />;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 sm:space-y-12 py-6">
      
      {/* Header Banner */}
      <div className="relative rounded-3xl overflow-hidden border border-[#e2dfd8] dark:border-[#33312b] shadow-xl">
        <div className="relative h-64 sm:h-96 w-full">
          <img
            src={siteImages.openAirMall}
            alt="Open Air Mall Shubra El-Kheima"
            className="w-full h-full object-cover object-center filter brightness-[0.85] dark:brightness-[0.4]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#12110f] via-[#12110f]/75 to-transparent" />
        </div>

        {/* Header Overlay Content */}
        <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-10 text-white space-y-3 sm:space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#8e8672] text-white">
              {language === 'ar' ? 'جلسات ومطاعم في الهواء الطلق' : 'Open-Air Promenade'}
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-white/20 backdrop-blur-md text-neutral-100 flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-[#acbdad]" />
              {language === 'ar' ? 'ملاصق لمنطقة الباركينج الذكي' : 'Directly Adjacent to Smart Parking'}
            </span>
          </div>

          <h1 className="text-2xl sm:text-4xl md:text-5xl font-black tracking-tight drop-shadow-md">
            {language === 'ar' ? 'المول المفتوح (Open Air Mall)' : 'Open Air Mall'}
          </h1>

          <p className="max-w-3xl text-xs sm:text-base text-neutral-300 font-normal leading-relaxed drop-shadow line-clamp-3 sm:line-clamp-none">
            {language === 'ar'
              ? 'ممشى عصري مبهج في قلب شبرا الخيمة، يجمع بين المقاهي التخصصية والمطاعم الصحية ومحلات الحلويات الفاخرة في الهواء الطلق. استمتع بأجوائك المفضلة وتصفح صور الديكورات وقوائم الطعام مباشرة.'
              : 'A vibrant open-air lifestyle destination in central Shubra El-Kheima, combining specialty cafés, artisan salad bistros, and sweet lounges under open skies with direct connectivity to the smart parking bays.'}
          </p>
        </div>
      </div>

      {/* Proximity Callout to Smart Parking */}
      <div className="p-4 sm:p-5 rounded-2xl bg-[#acbdad]/20 dark:bg-[#acbdad]/10 border border-[#acbdad]/40 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#8e8672] text-white flex items-center justify-center shrink-0">
            <Car className="w-5 h-5" />
          </div>
          <div>
            <div className="text-sm font-bold text-[#12110f] dark:text-[#f6f6f4]">
              {language === 'ar' ? 'هل تزور المول بسيارتك؟' : 'Visiting by Car?'}
            </div>
            <div className="text-xs text-neutral-600 dark:text-neutral-400">
              {language === 'ar' 
                ? 'يمكنك فحص وحجز باكتك مسبقاً في الباركينج الذكي المجاور للمول مباشرة لتجنب البحث عن مكان ركن.'
                : 'Reserve your parking slot in the smart facility right next to the promenade before arriving.'}
            </div>
          </div>
        </div>
        <Button
          variant="secondary"
          size="sm"
          onClick={() => setActiveView('parking')}
          icon={<Car className="w-4 h-4" />}
          className="w-full sm:w-auto justify-center min-h-[44px]"
        >
          {t('reserveSlot')}
        </Button>
      </div>

      {/* Search & Filter Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-[#e2dfd8] dark:border-[#33312b] pb-4">
        <div className="flex items-center gap-2">
          <Utensils className="w-5 h-5 text-[#8e8672]" />
          <h2 className="text-lg sm:text-xl font-bold text-[#12110f] dark:text-[#f6f6f4]">
            {language === 'ar' ? 'الكافيهات والمطاعم المتوفرة' : 'Available Cafés & Eateries'}
          </h2>
          <Badge variant="default" size="sm">
            {filteredVenues.length} {language === 'ar' ? 'أماكن مميزة' : 'Venues'}
          </Badge>
        </div>

        {/* Search Input */}
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 absolute left-3 rtl:left-auto rtl:right-3 top-1/2 -translate-y-1/2 text-neutral-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={language === 'ar' ? 'بحث عن كافيه أو مطعم...' : 'Search for café or eatery...'}
            className="w-full pl-9 rtl:pl-4 rtl:pr-9 pr-4 py-2.5 rounded-xl bg-white dark:bg-[#1b1a17] border border-[#dedbd3] dark:border-[#383630] text-xs font-medium focus:outline-none focus:ring-2 focus:ring-[#8e8672]/40 min-h-[44px]"
          />
        </div>
      </div>

      {/* Venues Grid with Featured Exterior Photos & Review Modal Trigger */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredVenues.map((venue, idx) => {
          const stats = getVenueRatingStats(venue);
          return (
            <motion.div
              key={venue.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: idx * 0.06 }}
              onClick={() => handleOpenVenueModal(venue)}
              className="group cursor-pointer rounded-3xl bg-white dark:bg-[#1b1a17] border border-[#e2dfd8] dark:border-[#33312b] shadow-card-soft dark:shadow-card-dark hover:shadow-xl hover:border-[#8e8672]/60 transition-all duration-300 flex flex-col justify-between overflow-hidden"
            >
              <div>
                {/* 1. Exterior Photo (خارجي) with Hover Zoom & Floating Badges */}
                <div className="relative h-48 sm:h-52 w-full overflow-hidden bg-neutral-100 dark:bg-neutral-800">
                  <VenueImage
                    folderName={venue.folderName}
                    type="exterior"
                    alt={`واجهة ${venue.name[language]}`}
                    categoryIconId={venue.id}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  
                  {/* Subtle Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />

                  {/* Top Badges: Category & Tag */}
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2">
                    <span className={`px-2.5 py-1 rounded-full text-[11px] font-black backdrop-blur-md shadow-sm ${venue.badgeColor}`}>
                      {venue.category[language]}
                    </span>
                    <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-black/50 backdrop-blur-md text-white border border-white/20">
                      #{venue.tag}
                    </span>
                  </div>

                  {/* Bottom Bar: 5-Star Rating Badge */}
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white">
                    <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-black/60 backdrop-blur-md text-xs font-bold border border-white/10 shadow-sm">
                      <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      <span>{stats.rating}</span>
                      <span className="text-neutral-300 text-[10px]">
                        ({stats.count} {language === 'ar' ? 'تقييم' : 'reviews'})
                      </span>
                    </div>

                    <div className="flex items-center gap-1 text-[11px] font-semibold bg-white/25 backdrop-blur-md px-2 py-1 rounded-lg">
                      <Sparkles className="w-3 h-3 text-amber-300" />
                      <span>{language === 'ar' ? '7 صور' : '7 Photos'}</span>
                    </div>
                  </div>
                </div>

                {/* 2. Venue Content Details */}
                <div className="p-5 sm:p-6 space-y-3">
                  <div className="flex items-center gap-2.5">
                    <div className="w-10 h-10 rounded-xl bg-neutral-100 dark:bg-neutral-800/80 flex items-center justify-center shrink-0 shadow-xs">
                      {getVenueIcon(venue.id)}
                    </div>
                    <div>
                      <h3 className="text-lg sm:text-xl font-bold text-[#12110f] dark:text-[#f6f6f4] tracking-tight group-hover:text-[#8e8672] transition-colors">
                        {venue.name[language]}
                      </h3>
                      <p className="text-[11px] font-medium text-neutral-500 dark:text-neutral-400">
                        {venue.category[language]}
                      </p>
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 line-clamp-2 leading-relaxed">
                    {venue.description[language]}
                  </p>

                  {/* Operating Hours */}
                  <div className="pt-2 flex items-center justify-between text-xs text-neutral-500 dark:text-neutral-400">
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-[#8e8672] shrink-0" />
                      <span>{t('workingHours')}:</span>
                    </div>
                    <span className="font-semibold text-neutral-700 dark:text-neutral-200">
                      {venue.hours[language]}
                    </span>
                  </div>
                </div>
              </div>

              {/* 3. Explore & Reviews CTA Button */}
              <div className="px-5 pb-5 sm:px-6 sm:pb-6 pt-0">
                <Button
                  variant="primary"
                  size="sm"
                  className="w-full justify-center min-h-[44px] text-xs shadow-glow-primary"
                  icon={<Eye className="w-4 h-4" />}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleOpenVenueModal(venue);
                  }}
                >
                  {language === 'ar' ? 'التفاصيل ومعرض الصور والتقييمات' : 'Explore & Reviews'}
                </Button>
              </div>
            </motion.div>
          );
        })}
      </div>

      {filteredVenues.length === 0 && (
        <div className="text-center py-12 p-6 rounded-3xl bg-neutral-100 dark:bg-neutral-900/50 border border-[#e2dfd8] dark:border-[#33312b] space-y-2">
          <Utensils className="w-10 h-10 mx-auto text-neutral-400" />
          <h3 className="text-base font-bold text-neutral-700 dark:text-neutral-300">
            {language === 'ar' ? 'لم يتم العثور على أماكن مطابقة' : 'No matching venues found'}
          </h3>
          <p className="text-xs text-neutral-500">
            {language === 'ar' ? 'يرجى تجربة كلمات بحث أخرى للبحث في الكافيهات والمطاعم.' : 'Try different search keywords.'}
          </p>
        </div>
      )}

      {/* Interactive Venue Details Modal */}
      <VenueDetailsModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        venue={selectedVenue}
        reviews={selectedVenue ? reviewsMap[selectedVenue.id] || [] : []}
        onAddReview={handleAddReview}
      />

    </div>
  );
};
