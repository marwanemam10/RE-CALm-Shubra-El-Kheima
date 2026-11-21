import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  Star, 
  Clock, 
  MapPin, 
  Sparkles, 
  CheckCircle2, 
  MessageSquare, 
  Send, 
  Maximize2, 
  Camera, 
  Utensils, 
  Coffee, 
  Salad, 
  IceCream, 
  Flame, 
  CupSoda,
  User,
  HeartHandshake
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useAppThemeLanguage } from '../context/ThemeLanguageContext';
import { OpenAirVenue, VenueReview } from '../types';
import { Modal } from './ui/Modal';
import { Button } from './ui/Button';
import { Badge } from './ui/Badge';
import { VenueImage } from './VenueImage';

interface VenueDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  venue: OpenAirVenue | null;
  reviews: VenueReview[];
  onAddReview: (venueId: string, newReview: VenueReview) => void;
}

type GalleryTab = 'exterior' | 'interior' | 'products' | 'reviews';

export const VenueDetailsModal: React.FC<VenueDetailsModalProps> = ({
  isOpen,
  onClose,
  venue,
  reviews,
  onAddReview,
}) => {
  const { language } = useAppThemeLanguage();

  const [activeTab, setActiveTab] = useState<GalleryTab>('exterior');
  
  // Lightbox Preview State
  const [lightboxImage, setLightboxImage] = useState<{
    type: 'exterior' | 'interior' | 'product';
    index?: number;
    title: string;
  } | null>(null);

  // Review Form State
  const [selectedRating, setSelectedRating] = useState<number>(5);
  const [hoverRating, setHoverRating] = useState<number>(0);
  const [reviewerName, setReviewerName] = useState('');
  const [reviewComment, setReviewComment] = useState('');
  const [formErrors, setFormErrors] = useState<{ name?: string; comment?: string }>({});
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Reset tab and form when modal opens with a new venue
  useEffect(() => {
    if (isOpen) {
      setActiveTab('exterior');
      setLightboxImage(null);
      setFormErrors({});
      setReviewerName('');
      setReviewComment('');
      setSelectedRating(5);
    }
  }, [isOpen, venue?.id]);

  if (!venue) return null;

  // Calculate dynamic average rating
  const averageRating = reviews.length > 0
    ? (reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length).toFixed(1)
    : (venue.rating || 4.8).toFixed(1);

  const getVenueIcon = (id: string) => {
    switch (id) {
      case 'brew-district':
        return <Coffee className="w-5 h-5 text-amber-600 dark:text-amber-400" />;
      case 'green-bowl':
        return <Salad className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />;
      case 'sweet-avenue':
        return <IceCream className="w-5 h-5 text-rose-600 dark:text-rose-400" />;
      case 'urban-bites':
        return <Flame className="w-5 h-5 text-orange-600 dark:text-orange-400" />;
      case 'juice-lab':
        return <CupSoda className="w-5 h-5 text-teal-600 dark:text-teal-400" />;
      default:
        return <Utensils className="w-5 h-5 text-[#8e8672]" />;
    }
  };

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errors: { name?: string; comment?: string } = {};

    if (!reviewerName.trim()) {
      errors.name = language === 'ar' ? 'يرجى كتابة اسمك الكريم' : 'Please enter your name';
    }

    if (!reviewComment.trim()) {
      errors.comment = language === 'ar' ? 'يرجى كتابة تعليقك أو تقييمك للمكان' : 'Please write your review comment';
    } else if (reviewComment.trim().length < 5) {
      errors.comment = language === 'ar' ? 'التعليق قصير جداً (5 أحرف كحد أدنى)' : 'Review too short (min 5 characters)';
    }

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setFormErrors({});

    const newReview: VenueReview = {
      id: `rev_${Date.now()}`,
      userName: reviewerName.trim(),
      rating: selectedRating,
      comment: reviewComment.trim(),
      date: new Date().toISOString(),
      dateFormatted: {
        ar: 'الآن',
        en: 'Just now'
      }
    };

    onAddReview(venue.id, newReview);

    // Trigger celebration confetti
    try {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.6 }
      });
    } catch (e) {
      // safe fallback
    }

    // Reset form and show toast
    setReviewerName('');
    setReviewComment('');
    setSelectedRating(5);
    setToastMessage(language === 'ar' ? 'شكراً لتقييمك! تم نشر رأيك وتحديث تقييم المكان.' : 'Thank you! Your review has been published.');

    setTimeout(() => {
      setToastMessage(null);
    }, 4500);
  };

  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        title={
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center shrink-0">
              {getVenueIcon(venue.id)}
            </div>
            <div className="min-w-0">
              <h2 className="text-base sm:text-lg font-black text-[#12110f] dark:text-[#f6f6f4] truncate">
                {venue.name[language]}
              </h2>
              <div className="flex items-center gap-2 text-xs text-neutral-500">
                <span className="truncate">{venue.category[language]}</span>
                <span>•</span>
                <span className="flex items-center gap-1 font-bold text-amber-600 dark:text-amber-400">
                  <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                  {averageRating}
                </span>
              </div>
            </div>
          </div>
        }
        className="w-[95vw] sm:max-w-3xl max-h-[90vh] overflow-y-auto p-4 sm:p-6"
      >
        {/* Toast Alert */}
        <AnimatePresence>
          {toastMessage && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mb-4 p-3 rounded-xl bg-emerald-600 text-white text-xs font-bold flex items-center gap-2 shadow-lg"
            >
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>{toastMessage}</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Venue Quick Summary Banner */}
        <div className="mb-6 p-4 rounded-2xl bg-neutral-50 dark:bg-[#201f1b] border border-[#e8e6e1] dark:border-[#33312b] space-y-3">
          <p className="text-xs sm:text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed">
            {venue.description[language]}
          </p>

          <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-neutral-200/60 dark:border-neutral-700/60 text-xs">
            <div className="flex items-center gap-1.5 text-neutral-600 dark:text-neutral-400">
              <Clock className="w-4 h-4 text-[#8e8672] shrink-0" />
              <span>{language === 'ar' ? 'ساعات العمل:' : 'Hours:'}</span>
              <span className="font-bold text-[#12110f] dark:text-white">
                {venue.hours[language]}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold ${venue.badgeColor}`}>
                #{venue.tag}
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-[#8e8672]/15 text-[#8e8672] dark:text-[#d0c8bd] flex items-center gap-1">
                <MapPin className="w-3 h-3" />
                {language === 'ar' ? 'المول المفتوح' : 'Open Air Mall'}
              </span>
            </div>
          </div>
        </div>

        {/* Categorized Photo Gallery Tabs */}
        <div className="space-y-5">
          <div className="flex items-center gap-1.5 p-1 rounded-xl bg-neutral-100 dark:bg-neutral-800/80 overflow-x-auto text-xs font-bold scrollbar-none">
            <button
              onClick={() => setActiveTab('exterior')}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-lg transition-all shrink-0 min-h-[38px] ${
                activeTab === 'exterior'
                  ? 'bg-white dark:bg-[#1b1a17] text-[#12110f] dark:text-white shadow-sm'
                  : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'
              }`}
            >
              <Camera className="w-3.5 h-3.5 text-[#8e8672]" />
              <span>{language === 'ar' ? 'الواجهة الخارجية' : 'Exterior View'}</span>
            </button>

            <button
              onClick={() => setActiveTab('interior')}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-lg transition-all shrink-0 min-h-[38px] ${
                activeTab === 'interior'
                  ? 'bg-white dark:bg-[#1b1a17] text-[#12110f] dark:text-white shadow-sm'
                  : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
              <span>{language === 'ar' ? 'الجلسات والديكور (3)' : 'Interior (3)'}</span>
            </button>

            <button
              onClick={() => setActiveTab('products')}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-lg transition-all shrink-0 min-h-[38px] ${
                activeTab === 'products'
                  ? 'bg-white dark:bg-[#1b1a17] text-[#12110f] dark:text-white shadow-sm'
                  : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'
              }`}
            >
              <Utensils className="w-3.5 h-3.5 text-rose-600 dark:text-rose-400" />
              <span>{language === 'ar' ? 'أبرز المنتجات (3)' : 'Menu Items (3)'}</span>
            </button>

            <button
              onClick={() => setActiveTab('reviews')}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-lg transition-all shrink-0 min-h-[38px] ${
                activeTab === 'reviews'
                  ? 'bg-white dark:bg-[#1b1a17] text-[#12110f] dark:text-white shadow-sm'
                  : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'
              }`}
            >
              <MessageSquare className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              <span>{language === 'ar' ? `التقييمات (${reviews.length})` : `Reviews (${reviews.length})`}</span>
            </button>
          </div>

          {/* TAB 1: EXTERIOR VIEW */}
          {activeTab === 'exterior' && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25 }}
              className="space-y-3"
            >
              <div 
                onClick={() => setLightboxImage({
                  type: 'exterior',
                  title: language === 'ar' ? `واجهة ${venue.name[language]}` : `${venue.name[language]} Exterior`
                })}
                className="group relative h-64 sm:h-80 w-full rounded-2xl overflow-hidden border border-[#dedbd3] dark:border-[#33312b] cursor-pointer shadow-md"
              >
                <VenueImage
                  folderName={venue.folderName}
                  type="exterior"
                  alt={`واجهة ${venue.name[language]}`}
                  categoryIconId={venue.id}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex items-end justify-between p-4 text-white">
                  <div>
                    <span className="text-xs font-bold bg-[#8e8672] px-2.5 py-1 rounded-lg">
                      {language === 'ar' ? 'الواجهة الرئيسية للمكان' : 'Main Entrance & Facade'}
                    </span>
                    <p className="text-xs text-neutral-300 mt-1">
                      {language === 'ar' ? 'جلسات عصرية في ممشى المول المفتوح' : 'Modern open-air promenade seating'}
                    </p>
                  </div>
                  <div className="p-2 rounded-xl bg-black/50 backdrop-blur-md text-white group-hover:scale-110 transition-transform">
                    <Maximize2 className="w-4 h-4" />
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* TAB 2: INTERIOR AMBIANCE (3 Photos) */}
          {activeTab === 'interior' && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25 }}
              className="grid grid-cols-1 sm:grid-cols-3 gap-3.5"
            >
              {[1, 2, 3].map((num) => (
                <div
                  key={num}
                  onClick={() => setLightboxImage({
                    type: 'interior',
                    index: num,
                    title: language === 'ar' ? `${venue.name[language]} - صورة داخلية (${num})` : `${venue.name[language]} - Interior View (${num})`
                  })}
                  className="group relative h-48 sm:h-56 rounded-2xl overflow-hidden border border-[#dedbd3] dark:border-[#33312b] cursor-pointer shadow-sm hover:shadow-md transition-all"
                >
                  <VenueImage
                    folderName={venue.folderName}
                    type="interior"
                    index={num}
                    alt={`صورة داخلية ${num} - ${venue.name[language]}`}
                    categoryIconId={venue.id}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end justify-between p-3 text-white">
                    <span className="text-xs font-bold">
                      {language === 'ar' ? `جلسة داخلية ${num}` : `Interior View ${num}`}
                    </span>
                    <div className="p-1.5 rounded-lg bg-black/40 backdrop-blur-sm group-hover:scale-110 transition-transform">
                      <Maximize2 className="w-3.5 h-3.5" />
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          )}

          {/* TAB 3: FEATURED PRODUCTS (3 Photos) */}
          {activeTab === 'products' && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25 }}
              className="grid grid-cols-1 sm:grid-cols-3 gap-3.5"
            >
              {[1, 2, 3].map((num) => (
                <div
                  key={num}
                  onClick={() => setLightboxImage({
                    type: 'product',
                    index: num,
                    title: language === 'ar' ? `${venue.name[language]} - منتج مميز (${num})` : `${venue.name[language]} - Featured Product (${num})`
                  })}
                  className="group relative h-48 sm:h-56 rounded-2xl overflow-hidden border border-[#dedbd3] dark:border-[#33312b] cursor-pointer shadow-sm hover:shadow-md transition-all"
                >
                  <VenueImage
                    folderName={venue.folderName}
                    type="product"
                    index={num}
                    alt={`منتج ${num} - ${venue.name[language]}`}
                    categoryIconId={venue.id}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end justify-between p-3 text-white">
                    <span className="text-xs font-bold">
                      {language === 'ar' ? `منتج مميز ${num}` : `Signature Item ${num}`}
                    </span>
                    <div className="p-1.5 rounded-lg bg-black/40 backdrop-blur-sm group-hover:scale-110 transition-transform">
                      <Maximize2 className="w-3.5 h-3.5" />
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          )}

          {/* TAB 4: REVIEWS & INTERACTIVE RATINGS */}
          {activeTab === 'reviews' && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25 }}
              className="space-y-6"
            >
              {/* Rating Summary Card */}
              <div className="p-4 sm:p-5 rounded-2xl bg-amber-500/10 border border-amber-500/25 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-start rtl:sm:text-right">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-2xl bg-amber-500 text-white flex flex-col items-center justify-center font-black shadow-md shrink-0">
                    <span className="text-2xl leading-none">{averageRating}</span>
                    <span className="text-[10px] uppercase font-bold mt-0.5">من 5.0</span>
                  </div>
                  <div>
                    <div className="flex items-center justify-center sm:justify-start gap-1 text-amber-500">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={`w-4 h-4 ${
                            star <= Math.round(Number(averageRating))
                              ? 'fill-amber-400 text-amber-400'
                              : 'text-neutral-300 dark:text-neutral-600'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-xs font-bold text-neutral-800 dark:text-neutral-200 mt-1 block">
                      {language === 'ar' 
                        ? `بناءً على ${reviews.length} تقييم من زوار شبرا الخيمة`
                        : `Based on ${reviews.length} reviews from local visitors`}
                    </span>
                  </div>
                </div>

                <div className="text-xs text-neutral-500 dark:text-neutral-400 max-w-xs">
                  {language === 'ar'
                    ? 'تقييمات موثقة ومحدثة لحظياً تعكس تجربة رواد المول المفتوح'
                    : 'Real-time verified community ratings for open-air mall visitors'}
                </div>
              </div>

              {/* Add a Review Form */}
              <form onSubmit={handleReviewSubmit} className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-[#201f1b] border border-[#e2dfd8] dark:border-[#383630] space-y-4 shadow-sm">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-bold text-[#12110f] dark:text-white flex items-center gap-2">
                    <MessageSquare className="w-4 h-4 text-[#8e8672]" />
                    <span>{language === 'ar' ? 'أضف تقييمك ورأيك في المكان' : 'Leave Your Review & Rating'}</span>
                  </h4>
                  <span className="text-[11px] text-neutral-400">
                    {language === 'ar' ? 'تجربة حية' : 'Live Feedback'}
                  </span>
                </div>

                {/* Star Selector */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold text-neutral-600 dark:text-neutral-400">
                    {language === 'ar' ? 'حدد التقييم (من 1 إلى 5 نجوم):' : 'Select Rating (1 to 5 Stars):'}
                  </label>
                  <div className="flex items-center gap-1.5">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setSelectedRating(star)}
                        onMouseEnter={() => setHoverRating(star)}
                        onMouseLeave={() => setHoverRating(0)}
                        className="p-1 rounded-lg hover:scale-110 transition-transform focus:outline-none"
                        aria-label={`${star} Stars`}
                      >
                        <Star
                          className={`w-6 h-6 transition-colors ${
                            star <= (hoverRating || selectedRating)
                              ? 'fill-amber-400 text-amber-400 drop-shadow'
                              : 'text-neutral-300 dark:text-neutral-600'
                          }`}
                        />
                      </button>
                    ))}
                    <span className="text-xs font-bold text-amber-600 dark:text-amber-400 ml-2 rtl:ml-0 rtl:mr-2">
                      {hoverRating || selectedRating} / 5
                    </span>
                  </div>
                </div>

                {/* Name Input */}
                <div className="space-y-1">
                  <label className="block text-xs font-semibold text-neutral-600 dark:text-neutral-400">
                    {language === 'ar' ? 'الاسم الكريم:' : 'Your Name:'}
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 absolute left-3 rtl:left-auto rtl:right-3 top-1/2 -translate-y-1/2 text-neutral-400" />
                    <input
                      type="text"
                      value={reviewerName}
                      onChange={(e) => setReviewerName(e.target.value)}
                      placeholder={language === 'ar' ? 'مثال: أحمد عبد الله' : 'e.g., Ahmed Abdallah'}
                      className={`w-full pl-9 rtl:pl-3 rtl:pr-9 pr-3 py-2.5 rounded-xl bg-neutral-50 dark:bg-[#161513] border text-xs focus:outline-none focus:ring-2 focus:ring-[#8e8672]/40 min-h-[44px] ${
                        formErrors.name ? 'border-red-500' : 'border-[#dedbd3] dark:border-[#383630]'
                      }`}
                    />
                  </div>
                  {formErrors.name && (
                    <p className="text-[11px] text-red-500 mt-1">{formErrors.name}</p>
                  )}
                </div>

                {/* Comment Textarea */}
                <div className="space-y-1">
                  <label className="block text-xs font-semibold text-neutral-600 dark:text-neutral-400">
                    {language === 'ar' ? 'اكتب تعليقك وتجربتك هنا:' : 'Write your review & experience here:'}
                  </label>
                  <textarea
                    rows={3}
                    value={reviewComment}
                    onChange={(e) => setReviewComment(e.target.value)}
                    placeholder={language === 'ar' ? 'صف جودة المأكولات/المشروبات، الخدمة، ونظافة المكان...' : 'Describe the food/coffee quality, service, and ambiance...'}
                    className={`w-full p-3 rounded-xl bg-neutral-50 dark:bg-[#161513] border text-xs focus:outline-none focus:ring-2 focus:ring-[#8e8672]/40 resize-none ${
                      formErrors.comment ? 'border-red-500' : 'border-[#dedbd3] dark:border-[#383630]'
                    }`}
                  />
                  {formErrors.comment && (
                    <p className="text-[11px] text-red-500 mt-1">{formErrors.comment}</p>
                  )}
                </div>

                {/* Submit Review Button */}
                <Button
                  type="submit"
                  variant="primary"
                  size="md"
                  className="w-full min-h-[44px] shadow-glow-primary text-xs"
                  icon={<Send className="w-3.5 h-3.5" />}
                >
                  {language === 'ar' ? 'إضافة التقييم ونشره' : 'Post Review'}
                </Button>
              </form>

              {/* Existing Reviews List */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-500">
                  {language === 'ar' ? 'تعليقات الزوار السابقة:' : 'Visitor Reviews:'}
                </h4>

                {reviews.map((rev) => (
                  <div
                    key={rev.id}
                    className="p-3.5 rounded-2xl bg-white dark:bg-[#1c1b18] border border-[#e2dfd8] dark:border-[#33312b] space-y-2 shadow-xs"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-[#8e8672]/20 text-[#8e8672] flex items-center justify-center font-black text-xs">
                          {rev.userName.charAt(0)}
                        </div>
                        <div>
                          <span className="text-xs font-bold text-[#12110f] dark:text-white block">
                            {rev.userName}
                          </span>
                          <span className="text-[10px] text-neutral-400">
                            {rev.dateFormatted ? rev.dateFormatted[language] : new Date(rev.date).toLocaleDateString()}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-0.5 text-amber-500">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            className={`w-3 h-3 ${
                              star <= rev.rating
                                ? 'fill-amber-400 text-amber-400'
                                : 'text-neutral-300 dark:text-neutral-700'
                            }`}
                          />
                        ))}
                      </div>
                    </div>

                    <p className="text-xs text-neutral-700 dark:text-neutral-300 leading-relaxed pl-10 rtl:pl-0 rtl:pr-10">
                      {rev.comment}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </div>

        {/* Modal Bottom Footer Actions */}
        <div className="mt-6 pt-4 border-t border-[#e2dfd8] dark:border-[#33312b] flex items-center justify-between">
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="text-xs"
          >
            {language === 'ar' ? 'إغلاق' : 'Close'}
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={() => setActiveTab('reviews')}
            className="text-xs"
            icon={<MessageSquare className="w-3.5 h-3.5" />}
          >
            {language === 'ar' ? 'اكتب تقييمك' : 'Write Review'}
          </Button>
        </div>
      </Modal>

      {/* Lightbox Enlarged Image Viewer */}
      <AnimatePresence>
        {lightboxImage && (
          <div className="fixed inset-0 z-60 flex items-center justify-center p-3 sm:p-6 bg-black/90 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="relative max-w-4xl w-full max-h-[92vh] flex flex-col items-center justify-center"
            >
              {/* Close Lightbox Button */}
              <button
                onClick={() => setLightboxImage(null)}
                className="absolute top-2 right-2 sm:-top-12 sm:right-0 p-2.5 rounded-full bg-black/60 sm:bg-white/10 hover:bg-white/20 text-white transition-colors z-20"
                aria-label="Close Preview"
              >
                <X className="w-6 h-6" />
              </button>

              {/* Title Header */}
              <div className="w-full text-center mb-3 text-white text-sm font-bold">
                {lightboxImage.title}
              </div>

              {/* Main Image */}
              <div className="relative w-full max-h-[78vh] rounded-2xl overflow-hidden border border-white/20 shadow-2xl bg-black flex items-center justify-center">
                <VenueImage
                  folderName={venue.folderName}
                  type={lightboxImage.type}
                  index={lightboxImage.index}
                  alt={lightboxImage.title}
                  categoryIconId={venue.id}
                  className="w-full max-h-[78vh] object-contain"
                />
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};
