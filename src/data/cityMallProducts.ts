import { CityMallProduct } from '../types';

function buildCandidates(folders: string[], fileVariants: string[]): string[] {
  const extensions = ['.jpg', '.jpeg', '.png', '.webp'];
  const candidates: string[] = [];

  for (const folder of folders) {
    for (const filename of fileVariants) {
      const cleanName = filename.replace(/\.(jpg|jpeg|png|webp)$/i, '');
      for (const ext of extensions) {
        candidates.push(`/new image/${folder}/${cleanName}${ext}`);
      }
    }
  }

  return candidates;
}

const elAbdFolders = ['منتجات العبد', 'حلواني العبد', 'El Abd'];
const carrefourFolders = ['منتجات كارفور', 'كارفور', 'Carrefour'];
const lcWaikikiFolders = ['lc waikiki', 'LC Waikiki'];

// Store 1: El Abd Patisserie (حلواني العبد) - 10 Products
export const elAbdProducts: CityMallProduct[] = [
  {
    id: 'elabd-01',
    name: {
      ar: 'جاتوه سويس رول شوكولاتة',
      en: 'Chocolate Swiss Roll Gateau'
    },
    originalPrice: 55,
    discountPercentage: 20,
    discountedPrice: 44,
    imageCandidates: buildCandidates(elAbdFolders, ['جاتوه سويس.jpg', 'جاتوه سويس رول شوكولاتة.jpg'])
  },
  {
    id: 'elabd-02',
    name: {
      ar: 'جاتوه ميلفيه شوكولاتة',
      en: 'Chocolate Mille-Feuille Gateau'
    },
    originalPrice: 55,
    discountPercentage: 20,
    discountedPrice: 44,
    imageCandidates: buildCandidates(elAbdFolders, ['جاتوه ميلفيه.jpg', 'جاتوه ميلفيه شوكولاتة.jpg'])
  },
  {
    id: 'elabd-03',
    name: {
      ar: 'جاتوه موس شوكولاتة',
      en: 'Chocolate Mousse Gateau'
    },
    originalPrice: 60,
    discountPercentage: 20,
    discountedPrice: 48,
    imageCandidates: buildCandidates(elAbdFolders, ['جاتوه موس.jpg', 'جاتوه موس شوكولاتة.jpg'])
  },
  {
    id: 'elabd-04',
    name: {
      ar: 'إكلير شوكولاتة',
      en: 'Chocolate Eclair'
    },
    originalPrice: 55,
    discountPercentage: 20,
    discountedPrice: 44,
    imageCandidates: buildCandidates(elAbdFolders, ['إكلير شوكولاتة.jpg', 'اكلير شوكولاتة.jpg'])
  },
  {
    id: 'elabd-05',
    name: {
      ar: 'جاتوه خوخ',
      en: 'Peach Gateau'
    },
    originalPrice: 55,
    discountPercentage: 20,
    discountedPrice: 44,
    imageCandidates: buildCandidates(elAbdFolders, ['جاتوه خوخ.jpg'])
  },
  {
    id: 'elabd-06',
    name: {
      ar: 'جاتوه فادج',
      en: 'Fudge Gateau'
    },
    originalPrice: 60,
    discountPercentage: 20,
    discountedPrice: 48,
    imageCandidates: buildCandidates(elAbdFolders, ['جاتوه فادج.jpg'])
  },
  {
    id: 'elabd-07',
    name: {
      ar: 'بسبوسة بندق',
      en: 'Hazelnut Basbousa'
    },
    originalPrice: 200,
    discountPercentage: 20,
    discountedPrice: 160,
    imageCandidates: buildCandidates(elAbdFolders, ['بسبوسة بندق.jpg', 'بسبوسه بندق.jpg'])
  },
  {
    id: 'elabd-08',
    name: {
      ar: 'كنافة كريمة',
      en: 'Cream Kunafa'
    },
    originalPrice: 235,
    discountPercentage: 20,
    discountedPrice: 188,
    imageCandidates: buildCandidates(elAbdFolders, ['كنافة كريمة.jpg', 'كنافه كريمه.jpg'])
  },
  {
    id: 'elabd-09',
    name: {
      ar: 'دونتس شوكولاتة بالسبرينكلز',
      en: 'Chocolate Donuts with Sprinkles'
    },
    originalPrice: 50,
    discountPercentage: 20,
    discountedPrice: 40,
    imageCandidates: buildCandidates(elAbdFolders, ['دونتس شوكولاتة بالسبرينكلز.jpg', 'دونتس شوكولاته بالسبرينكلز.jpg'])
  },
  {
    id: 'elabd-10',
    name: {
      ar: 'كرواسون شوكولاتة ميجا',
      en: 'Mega Chocolate Croissant'
    },
    originalPrice: 60,
    discountPercentage: 20,
    discountedPrice: 48,
    imageCandidates: buildCandidates(elAbdFolders, ['كرواسون شوكولاتة ميجا.jpg', 'كرواسون شوكولاته ميجا.jpg'])
  }
];

// Store 2: Carrefour (كارفور) - 20 Products
export const carrefourProducts: CityMallProduct[] = [
  {
    id: 'crf-01',
    name: {
      ar: 'أرز فاخر',
      en: 'Premium Rice'
    },
    originalPrice: 27,
    discountPercentage: 20,
    discountedPrice: 21.60,
    imageCandidates: buildCandidates(carrefourFolders, ['ارز.jpg', 'أرز.jpg'])
  },
  {
    id: 'crf-02',
    name: {
      ar: 'نودلز إندومي',
      en: 'Indomie Instant Noodles'
    },
    originalPrice: 10,
    discountPercentage: 20,
    discountedPrice: 8,
    imageCandidates: buildCandidates(carrefourFolders, ['اندومي.jpg', 'إندومي.jpg'])
  },
  {
    id: 'crf-03',
    name: {
      ar: 'بسكويت أوريو',
      en: 'Oreo Cookies'
    },
    originalPrice: 35,
    discountPercentage: 20,
    discountedPrice: 28,
    imageCandidates: buildCandidates(carrefourFolders, ['اوريو.jpg', 'أوريو.jpg'])
  },
  {
    id: 'crf-04',
    name: {
      ar: 'شيبس برينجلز',
      en: 'Pringles Potato Crisps'
    },
    originalPrice: 135,
    discountPercentage: 20,
    discountedPrice: 108,
    imageCandidates: buildCandidates(carrefourFolders, ['برينجلز.jpg'])
  },
  {
    id: 'crf-05',
    name: {
      ar: 'بسكويت توك المالح',
      en: 'TUC Salted Crackers'
    },
    originalPrice: 25,
    discountPercentage: 20,
    discountedPrice: 20,
    imageCandidates: buildCandidates(carrefourFolders, ['توك.jpg', 'TUC.jpg'])
  },
  {
    id: 'crf-06',
    name: {
      ar: 'تونة قطع فاخرة',
      en: 'Premium Chunk Tuna'
    },
    originalPrice: 71,
    discountPercentage: 20,
    discountedPrice: 56.80,
    imageCandidates: buildCandidates(carrefourFolders, ['تونه.jpg', 'تونة.jpg'])
  },
  {
    id: 'crf-07',
    name: {
      ar: 'عصير جهينة طبيعي',
      en: 'Juhayna Natural Juice'
    },
    originalPrice: 10,
    discountPercentage: 20,
    discountedPrice: 8,
    imageCandidates: buildCandidates(carrefourFolders, ['جهينه عصير.jpg', 'جهينة عصير.jpg'])
  },
  {
    id: 'crf-08',
    name: {
      ar: 'دقيق فاخر لجميع الأغراض',
      en: 'All-Purpose Flour'
    },
    originalPrice: 26,
    discountPercentage: 20,
    discountedPrice: 20.80,
    imageCandidates: buildCandidates(carrefourFolders, ['دقيق.jpg'])
  },
  {
    id: 'crf-09',
    name: {
      ar: 'زيت طهي نقي',
      en: 'Pure Cooking Oil'
    },
    originalPrice: 74,
    discountPercentage: 20,
    discountedPrice: 59.20,
    imageCandidates: buildCandidates(carrefourFolders, ['زيت.jpg'])
  },
  {
    id: 'crf-10',
    name: {
      ar: 'زيتون مخلل فاخر',
      en: 'Pickled Premium Olives'
    },
    originalPrice: 90,
    discountPercentage: 20,
    discountedPrice: 72,
    imageCandidates: buildCandidates(carrefourFolders, ['زيتون.jpg'])
  },
  {
    id: 'crf-11',
    name: {
      ar: 'سائل غسيل الأطباق',
      en: 'Dishwashing Liquid'
    },
    originalPrice: 100,
    discountPercentage: 20,
    discountedPrice: 80,
    imageCandidates: buildCandidates(carrefourFolders, ['سائل مواعين.jpg'])
  },
  {
    id: 'crf-12',
    name: {
      ar: 'شامبو للعناية بالشعر',
      en: 'Hair Care Shampoo'
    },
    originalPrice: 100,
    discountPercentage: 20,
    discountedPrice: 80,
    imageCandidates: buildCandidates(carrefourFolders, ['شامبو.jpg'])
  },
  {
    id: 'crf-13',
    name: {
      ar: 'شيبسي بطاطس مقرمشة',
      en: 'Chipsy Potato Chips'
    },
    originalPrice: 10,
    discountPercentage: 20,
    discountedPrice: 8,
    imageCandidates: buildCandidates(carrefourFolders, ['شيبسي.jpg'])
  },
  {
    id: 'crf-14',
    name: {
      ar: 'معجون صلصة طماطم',
      en: 'Tomato Paste'
    },
    originalPrice: 20,
    discountPercentage: 20,
    discountedPrice: 16,
    imageCandidates: buildCandidates(carrefourFolders, ['طماطم.jpg', 'صلصة طماطم.jpg'])
  },
  {
    id: 'crf-15',
    name: {
      ar: 'عسل نحل نقي',
      en: 'Pure Natural Honey'
    },
    originalPrice: 120,
    discountPercentage: 20,
    discountedPrice: 96,
    imageCandidates: buildCandidates(carrefourFolders, ['عسل.jpg'])
  },
  {
    id: 'crf-16',
    name: {
      ar: 'شوكولاتة كيت كات',
      en: 'KitKat Chocolate Bar'
    },
    originalPrice: 25,
    discountPercentage: 20,
    discountedPrice: 20,
    imageCandidates: buildCandidates(carrefourFolders, ['كيت كات.jpg', 'كيت_كات.jpg'])
  },
  {
    id: 'crf-17',
    name: {
      ar: 'مكرونة فاخرة متنوعة',
      en: 'Premium Pasta'
    },
    originalPrice: 24,
    discountPercentage: 20,
    discountedPrice: 19.20,
    imageCandidates: buildCandidates(carrefourFolders, ['مكرونه.jpg', 'مكرونة.jpg'])
  },
  {
    id: 'crf-18',
    name: {
      ar: 'مياه معدنية طبيعية',
      en: 'Natural Mineral Water'
    },
    originalPrice: 6,
    discountPercentage: 20,
    discountedPrice: 4.80,
    imageCandidates: buildCandidates(carrefourFolders, ['مياه.jpg'])
  },
  {
    id: 'crf-19',
    name: {
      ar: 'قهوة نسكافيه كلاسيك',
      en: 'Nescafé Classic Coffee'
    },
    originalPrice: 499,
    discountPercentage: 20,
    discountedPrice: 399.20,
    imageCandidates: buildCandidates(carrefourFolders, ['نسكافيه.jpg'])
  },
  {
    id: 'crf-20',
    name: {
      ar: 'شوكولاتة نوتيلا قابلة للدهن',
      en: 'Nutella Hazelnut Spread'
    },
    originalPrice: 150,
    discountPercentage: 20,
    discountedPrice: 120,
    imageCandidates: buildCandidates(carrefourFolders, ['نوتيلا.jpg'])
  }
];

// Store 3: LC Waikiki - 10 Products
export const lcWaikikiProducts: CityMallProduct[] = [
  {
    id: 'lcw-01',
    name: {
      ar: 'تونيك تريكو أوفر سايز',
      en: 'Oversized Knit Tunic'
    },
    originalPrice: 799,
    discountPercentage: 20,
    discountedPrice: 639.20,
    imageCandidates: buildCandidates(lcWaikikiFolders, ['تونيك تريكو أوفر سايز.jpg', 'تونيك تريكو اوفر سايز.jpg'])
  },
  {
    id: 'lcw-02',
    name: {
      ar: 'تونيك تريكو برقبة دائرية',
      en: 'Crew Neck Knit Tunic'
    },
    originalPrice: 999,
    discountPercentage: 20,
    discountedPrice: 799.20,
    imageCandidates: buildCandidates(lcWaikikiFolders, ['تونيك تريكو برقبة دائرية.jpg', 'تونيك تريكو برقبه دائريه.jpg'])
  },
  {
    id: 'lcw-03',
    name: {
      ar: 'كارديجان تريكو دانتيل',
      en: 'Lace Knit Cardigan'
    },
    originalPrice: 1299,
    discountPercentage: 20,
    discountedPrice: 1039.20,
    imageCandidates: buildCandidates(lcWaikikiFolders, ['كارديجان تريكو دانتيل.jpg'])
  },
  {
    id: 'lcw-04',
    name: {
      ar: 'بليزر واسع أنيق',
      en: 'Loose Fit Elegant Blazer'
    },
    originalPrice: 2999,
    discountPercentage: 20,
    discountedPrice: 2399.20,
    imageCandidates: buildCandidates(lcWaikikiFolders, ['بليزر واسع.jpg'])
  },
  {
    id: 'lcw-05',
    name: {
      ar: 'جاكيت جلد عصري',
      en: 'Trendy Leather Jacket'
    },
    originalPrice: 2999,
    discountPercentage: 20,
    discountedPrice: 2399.20,
    imageCandidates: buildCandidates(lcWaikikiFolders, ['جاكيت جلد.jpg'])
  },
  {
    id: 'lcw-06',
    name: {
      ar: 'كارديجان مطرز فاخر',
      en: 'Embroidered Premium Cardigan'
    },
    originalPrice: 1299,
    discountPercentage: 20,
    discountedPrice: 1039.20,
    imageCandidates: buildCandidates(lcWaikikiFolders, ['كارديجان مطرز.jpg'])
  },
  {
    id: 'lcw-07',
    name: {
      ar: 'جاكيت بافر شتوي',
      en: 'Winter Puffer Jacket'
    },
    originalPrice: 1699,
    discountPercentage: 20,
    discountedPrice: 1359.20,
    imageCandidates: buildCandidates(lcWaikikiFolders, ['جاكيت بافر.jpg'])
  },
  {
    id: 'lcw-08',
    name: {
      ar: 'جيبة بليسيه بخصر حزام',
      en: 'Belted Pleated Skirt'
    },
    originalPrice: 1999,
    discountPercentage: 20,
    discountedPrice: 1599.20,
    imageCandidates: buildCandidates(lcWaikikiFolders, ['جيبة بليسيه بخصر.jpg', 'جيبه بليسيه بخصر.jpg'])
  },
  {
    id: 'lcw-09',
    name: {
      ar: 'جاكيت جينز كلاسيك',
      en: 'Classic Denim Jacket'
    },
    originalPrice: 1999,
    discountPercentage: 20,
    discountedPrice: 1599.20,
    imageCandidates: buildCandidates(lcWaikikiFolders, ['جاكيت جينز.jpg'])
  },
  {
    id: 'lcw-10',
    name: {
      ar: 'بلوفر تريكو بنقشة هندسية',
      en: 'Patterned Knit Pullover'
    },
    originalPrice: 999,
    discountPercentage: 20,
    discountedPrice: 799.20,
    imageCandidates: buildCandidates(lcWaikikiFolders, ['بلوفر تريكو بنقشة.jpg', 'بلوفر تريكو بنقشه.jpg'])
  }
];

export const cityMallStoreProductsMap: Record<string, CityMallProduct[]> = {
  'el-abd': elAbdProducts,
  'carrefour': carrefourProducts,
  'lc-waikiki': lcWaikikiProducts
};
