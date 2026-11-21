import { 
  OpenAirVenue, 
  CityMallStore, 
  DoctorProfile, 
  BusRoute,
  ParkingSlot,
  PharmacyInfo 
} from '../types';

export const siteImages = {
  hero: '/data/opening-image.jpg',
  openAirMall: '/data/open-air-mall.jpg',
  cityMall: '/data/city-mall.jpeg',
  doctorsTower: '/data/doctors-tower.jpg',
  transport: '/data/transport.jpg',
  parking: '/data/parking.jpg',
  pharmacy: '/doctors/pharmacy-ezaby.jpg',
};

export const heroStats = {
  ar: [
    { label: 'المساحة المطورة', value: '+45,000 م²', desc: 'مساحات تجارية وخدمية متكاملة' },
    { label: 'سعة المواقف الذكية', value: '32+', desc: 'باكية ذكية مراقبة بالحساسات' },
    { label: 'الوجهات الحيوية', value: '5 محاور', desc: 'تسوق، صحة، كافيهات، ومواصلات' },
    { label: 'خطوط النقل المباشرة', value: '15 خط', desc: 'ربط مباشر بأنحاء القاهرة الكبرى' },
  ],
  en: [
    { label: 'Developed Area', value: '+45,000 m²', desc: 'Integrated commercial & service spaces' },
    { label: 'Smart Parking Capacity', value: '32+', desc: 'Sensor-monitored smart bays' },
    { label: 'Key Destinations', value: '5 Hubs', desc: 'Retail, healthcare, dining & transit' },
    { label: 'Direct Bus Routes', value: '15 Routes', desc: 'Seamless Greater Cairo connectivity' },
  ]
};

export const hubDestinations = [
  {
    id: 'open-air-mall',
    title: { ar: 'المول المفتوح', en: 'Open Air Mall' },
    subtitle: { ar: 'كافيهات ومطاعم في الهواء الطلق', en: 'Open-Air Dining & Cafés Hub' },
    desc: { 
      ar: 'واحة ترفيهية عصرية تضم باقة من أرقى الكافيهات والمطاعم الصحية والمشروبات المنعشة مباشرة بجوار الباركينج الذكي.',
      en: 'A vibrant open-air promenade featuring specialty coffee shops, healthy bowl bistros, and sweet lounges right next to the smart parking.'
    },
    image: siteImages.openAirMall,
    tag: { ar: 'طاقة ومرح', en: 'Dining & Vibe' },
    accent: '#90a69c',
  },
  {
    id: 'city-mall',
    title: { ar: 'سيتي مول', en: 'City Mall' },
    subtitle: { ar: 'وجهة التسوق والترفيه الأولى', en: 'Premier Retail & Lifestyle Mall' },
    desc: { 
      ar: 'مركز تجاري متكامل يضم كبرى العلامات التجارية العالمية، كارفور، بي تك، أرقى محلات الأزياء، ومنطقة ألعاب الأطفال.',
      en: 'An all-inclusive shopping center hosting global fashion brands, Carrefour hypermarket, B.TECH electronics, and family entertainment.'
    },
    image: siteImages.cityMall,
    tag: { ar: 'تسوق عائلي', en: 'Shopping' },
    accent: '#8e8672',
  },
  {
    id: 'doctors-tower',
    title: { ar: 'برج الأطباء', en: "Doctors' Tower" },
    subtitle: { ar: 'المجمع الطبي التخصصي المتكامل', en: 'Integrated Medical Specialists Hub' },
    desc: { 
      ar: 'يجمع نخبة استشاريي الطب في البرجين القديم والجديد (باطنة، كلى، جراحة، عظام، نساء وتوليد، ومختبرات معتمدة).',
      en: 'Hosting elite medical consultants across the Old & New Towers (internal medicine, surgery, orthopedics, OB/GYN, and accredited labs).'
    },
    image: siteImages.doctorsTower,
    tag: { ar: 'رعاية صحية', en: 'Healthcare' },
    accent: '#acbdad',
  },
  {
    id: 'transport',
    title: { ar: 'النقل العام والمواقف', en: 'Public Transport Hub' },
    subtitle: { ar: 'شركة النقل الإنجليزية ومحاور الربط', en: 'The English Public Transport Co.' },
    desc: { 
      ar: 'شبكة مواصلات حيوية بموقفي بهتيم وعرابي تربط شبرا الخيمة برمسيس، التجمع، ومدينة نصر بأتوبيسات منتظمة كل 15 دقيقة.',
      en: 'Vital bus transportation hubs at Bahtim & Orabi stations connecting Shubra El-Kheima to Ramses, New Cairo, and Nasr City every 15 mins.'
    },
    image: siteImages.transport,
    tag: { ar: 'تنقل ذكي', en: 'Mobility' },
    accent: '#736b59',
  },
  {
    id: 'parking',
    title: { ar: 'الباركينج الذكي', en: 'Smart Parking' },
    subtitle: { ar: 'نظام إدارة الركن وتجربة هندسية تفاعلية', en: 'Engineering Parking Simulation' },
    desc: { 
      ar: 'نظام مواقف سيارات مؤتمت ومقسم لحارات واضحة مع إمكانية التحقق وحجز الباكيات الشاغرة ومتابعة الإشغال لحظياً.',
      en: 'An automated lane-divided parking facility with real-time bay occupancy detection, live counters, and instant slot reservations.'
    },
    image: siteImages.parking,
    tag: { ar: 'محاكاة هندسية', en: 'Smart Tech' },
    accent: '#22c55e',
  },
];

export const openAirVenues: OpenAirVenue[] = [
  {
    id: 'brew-district',
    name: { ar: 'Brew District', en: 'Brew District' },
    category: { ar: 'كافيه متخصص', en: 'Specialty Coffee' },
    hours: { ar: '9:00 ص – 12:00 منتصف الليل', en: '9:00 AM – 12:00 AM' },
    description: {
      ar: 'كافيه متخصص في تحضير القهوة المختصة الساخنة والباردة، تشكيلة حلويات غربية خفيفة، وسندوتشات طازجة.',
      en: 'Specialty coffee roastery serving artisan hot & cold brews, light desserts, and fresh handcrafted sandwiches.'
    },
    tag: 'Coffee & Bites',
    badgeColor: 'bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300',
    folderName: 'Brew District',
    rating: 4.9,
    reviewCount: 18,
    sampleReviews: [
      {
        id: 'bd-rev-1',
        userName: 'م. زياد الشافعي',
        rating: 5,
        comment: 'القهوة المختصة عندهم مضبوطة جداً خاصة الفلات وايت والـ V60 الإثيوبي، والأجواء المفتوحة في الشتاء تحفة وجلساتها رايقة.',
        date: '2026-11-19T14:30:00Z',
        dateFormatted: { ar: 'منذ يومين', en: '2 days ago' }
      },
      {
        id: 'bd-rev-2',
        userName: 'سارة عبد الرحمن',
        rating: 5,
        comment: 'مكان هادئ ومثالي للشغل والقراءة، كيك التيراميسو ممتاز والخدمة سريعة وبشوشة. إضافة ممتازة لمنطقة شبرا الخيمة.',
        date: '2026-11-14T11:20:00Z',
        dateFormatted: { ar: 'منذ أسبوع', en: '1 week ago' }
      },
      {
        id: 'bd-rev-3',
        userName: 'أحمد كمال',
        rating: 4,
        comment: 'الديكور راقي جداً والجلسات الخارجية مريحة، الأسعار مناسبة لجودة التحميص وحجم المشروبات.',
        date: '2026-11-07T18:00:00Z',
        dateFormatted: { ar: 'منذ أسبوعين', en: '2 weeks ago' }
      }
    ]
  },
  {
    id: 'green-bowl',
    name: { ar: 'Green Bowl', en: 'Green Bowl' },
    category: { ar: 'مطعم صحي', en: 'Healthy Dining' },
    hours: { ar: '10:00 ص – 11:00 م', en: '10:00 AM – 11:00 PM' },
    description: {
      ar: 'مطعم صحي متطور يقدم أطباق السلطات المتكاملة (Salad Bowls)، عصائر طازجة ديتوكس، ووجبات غذائية متوازنة.',
      en: 'Contemporary healthy eatery serving signature salad bowls, fresh cold-pressed detox juices, and calorie-conscious meals.'
    },
    tag: 'Healthy Bowls',
    badgeColor: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300',
    folderName: 'Green Bowl',
    rating: 4.8,
    reviewCount: 14,
    sampleReviews: [
      {
        id: 'gb-rev-1',
        userName: 'نورهان طارق',
        rating: 5,
        comment: 'أخيراً مطعم صحي بيعمل سالاد بولز مشبعة ولذيذة في شبرا الخيمة! صوص الهني ماسترد مع الدجاج المشوي خيالي.',
        date: '2026-11-20T12:00:00Z',
        dateFormatted: { ar: 'أمس', en: 'Yesterday' }
      },
      {
        id: 'gb-rev-2',
        userName: 'د. عمر مصطفى',
        rating: 5,
        comment: 'عصائر الديتوكس فريش ومن غير أي سكر مضاف، مكان نظيف ومثالي لكل شخص مهتم بلياقته وصحته.',
        date: '2026-11-17T16:15:00Z',
        dateFormatted: { ar: 'منذ 4 أيام', en: '4 days ago' }
      },
      {
        id: 'gb-rev-3',
        userName: 'ياسمين فؤاد',
        rating: 4,
        comment: 'خيارات البروتين ممتازة وسعرات الوجبات مكتوبة بدقة على البول، تجربة نظيفة وهكررها دايماً.',
        date: '2026-11-08T19:40:00Z',
        dateFormatted: { ar: 'منذ أسبوعين', en: '2 weeks ago' }
      }
    ]
  },
  {
    id: 'sweet-avenue',
    name: { ar: 'Sweet Avenue', en: 'Sweet Avenue' },
    category: { ar: 'حلويات وآيس كريم', en: 'Dessert Lounge' },
    hours: { ar: '12:00 ظهراً – 1:00 ص', en: '12:00 PM – 1:00 AM' },
    description: {
      ar: 'محل حلويات عصري يقدم ألذ أنواع الوافل، الكريب الفرنسي، البان كيك، الآيس كريم الفاخر ومشروبات الميلك شيك الغنية.',
      en: 'Indulgent dessert lounge offering crispy Belgian waffles, French crepes, fluffy pancakes, artisanal gelato, and thick milkshakes.'
    },
    tag: 'Waffles & Gelato',
    badgeColor: 'bg-rose-100 text-rose-800 dark:bg-rose-950/60 dark:text-rose-300',
    folderName: 'Sweet Avenue',
    rating: 4.9,
    reviewCount: 22,
    sampleReviews: [
      {
        id: 'sa-rev-1',
        userName: 'ريهام الشناوي',
        rating: 5,
        comment: 'الوافل البلجيكي المقرمش مع النوتيلا والفراولة طعمه حكاية، والجيلاتو إيطالي أصلي وقوامه كريمي ناعم.',
        date: '2026-11-19T20:10:00Z',
        dateFormatted: { ar: 'منذ يومين', en: '2 days ago' }
      },
      {
        id: 'sa-rev-2',
        userName: 'كريم عبد العزيز',
        rating: 5,
        comment: 'البان كيك هش جداً وطازج، والخدمة ممتازة ومبتسمة دائماً. مكان مبهج جداً للعائلات والأطفال.',
        date: '2026-11-16T17:30:00Z',
        dateFormatted: { ar: 'منذ 5 أيام', en: '5 days ago' }
      },
      {
        id: 'sa-rev-3',
        userName: 'مريم خالد',
        rating: 5,
        comment: 'الميلك شيك غني ولذيذ، طريقة التقديم احترافية جداً والمكان مريح نفسياً في الهواء الطلق.',
        date: '2026-11-13T21:00:00Z',
        dateFormatted: { ar: 'منذ أسبوع', en: '1 week ago' }
      }
    ]
  },
  {
    id: 'urban-bites',
    name: { ar: 'Urban Bites', en: 'Urban Bites' },
    category: { ar: 'وجبات سريعة', en: 'Gourmet Fast Food' },
    hours: { ar: '11:00 ص – 1:00 ص', en: '11:00 AM – 1:00 AM' },
    description: {
      ar: 'مطعم وجبات سريعة يقدم برجر لحم أنجوس مشوي على اللهب، دجاج مقرمش ذهبي، بطاطس متبلة، ووجبات عائلية سريعة.',
      en: 'Modern fast-casual joint crafting gourmet flame-grilled burgers, golden crispy fried chicken, seasoned fries, and combo meals.'
    },
    tag: 'Burgers & Fries',
    badgeColor: 'bg-orange-100 text-orange-800 dark:bg-orange-950/60 dark:text-orange-300',
    folderName: 'Urban Bites',
    rating: 4.7,
    reviewCount: 19,
    sampleReviews: [
      {
        id: 'ub-rev-1',
        userName: 'تامر عزت',
        rating: 5,
        comment: 'البرجر المشوي على الفحم نكهته مميزة جداً وجودة اللحم ممتازة ومطبوخ صح، عيش البريوش طازج ولذيذ.',
        date: '2026-11-18T15:45:00Z',
        dateFormatted: { ar: 'منذ 3 أيام', en: '3 days ago' }
      },
      {
        id: 'ub-rev-2',
        userName: 'هدى إبراهيم',
        rating: 4,
        comment: 'الدجاج كريسبي ومش مدهن خالص، البطاطس المتبلة سخنة ومقرمشة والكميات مشبعة جداً بالنسبة للسعر.',
        date: '2026-11-14T20:20:00Z',
        dateFormatted: { ar: 'منذ أسبوع', en: '1 week ago' }
      },
      {
        id: 'ub-rev-3',
        userName: 'محمود فوزي',
        rating: 5,
        comment: 'الصوصات عندهم سر الصنعة! داينامايت برجر كان تجربة خرافية وسرعة الطلب كانت ممتازة.',
        date: '2026-11-06T19:00:00Z',
        dateFormatted: { ar: 'منذ أسبوعين', en: '2 weeks ago' }
      }
    ]
  },
  {
    id: 'juice-lab',
    name: { ar: 'The Juice Lab', en: 'The Juice Lab' },
    category: { ar: 'عصائر طبيعية وموكتيلات', en: 'Fresh Juice Bar' },
    hours: { ar: '10:00 ص – 12:00 منتصف الليل', en: '10:00 AM – 12:00 AM' },
    description: {
      ar: 'معمل العصائر الطبيعية المبتكر؛ سموذي الفواكه الطازجة، ميلك شيك طبيعي، ومشروبات استوائية منعشة بدون إضافات صناعية.',
      en: 'Artisan juice lab mixing 100% natural fruit smoothies, fresh tropical mocktails, protein shakes, and vitamin refreshers.'
    },
    tag: 'Smoothies & Detox',
    badgeColor: 'bg-teal-100 text-teal-800 dark:bg-teal-950/60 dark:text-teal-300',
    folderName: 'The Juice Lab',
    rating: 4.8,
    reviewCount: 16,
    sampleReviews: [
      {
        id: 'jl-rev-1',
        userName: 'فريدة الجوهري',
        rating: 5,
        comment: 'السموذي طبيعي 100% ومنعش جداً بعد جولة المشي في المول، عصير الباشن فروت مع المانجو اختراع حقيقي!',
        date: '2026-11-19T17:00:00Z',
        dateFormatted: { ar: 'منذ يومين', en: '2 days ago' }
      },
      {
        id: 'jl-rev-2',
        userName: 'حسام الدين',
        rating: 5,
        comment: 'الفواكه بتتعصر قدامك فريش بدون مكسبات طعم أو ألوان، جودة فائقة وسرعة في التقديم ونظافة تشرف.',
        date: '2026-11-17T13:40:00Z',
        dateFormatted: { ar: 'منذ 4 أيام', en: '4 days ago' }
      },
      {
        id: 'jl-rev-3',
        userName: 'أميرة شريف',
        rating: 5,
        comment: 'كوكتيل البروتين بالموز والتمر مع المكسرات طاقة ونشاط، أفضل مكان عصائر في المنطقة بلا منازع.',
        date: '2026-11-11T19:10:00Z',
        dateFormatted: { ar: 'منذ 10 أيام', en: '10 days ago' }
      }
    ]
  }
];

export const cityMallCategories = [
  { id: 'all', label: { ar: 'جميع الأقسام', en: 'All Departments' } },
  { id: 'supermarket', label: { ar: 'السوبر ماركت', en: 'Supermarket' } },
  { id: 'fashion', label: { ar: 'الملابس والأحذية', en: 'Fashion & Apparel' } },
  { id: 'electronics', label: { ar: 'الإلكترونيات والمفروشات', en: 'Electronics & Home' } },
  { id: 'jewelry', label: { ar: 'المجوهرات والهدايا', en: 'Jewelry & Gifts' } },
  { id: 'cafes', label: { ar: 'الكافيهات والحلويات', en: 'Cafés & Sweets' } },
  { id: 'entertainment', label: { ar: 'الترفيه والخدمات', en: 'Entertainment & Services' } },
];

export const cityMallStores: CityMallStore[] = [
  // Supermarket
  {
    id: 'carrefour',
    name: { ar: 'كارفور (Carrefour)', en: 'Carrefour Supermarket' },
    category: 'supermarket',
    floor: { ar: 'الدور الأرضي', en: 'Ground Floor' },
    description: {
      ar: 'سوبر ماركت عملاق في الدور الأرضي يوفر كافة المنتجات الغذائية، الأجبان، الخضروات، والسلع والمستلزمات المنزلية اليومية بأسعار تنافسية.',
      en: 'Comprehensive hypermarket on the ground floor providing fresh produce, groceries, dairy, household essentials, and daily family necessities.'
    },
    badge: { ar: 'هايبر ماركت رئيسي', en: 'Anchor Store' }
  },
  // Fashion
  {
    id: 'lc-waikiki',
    name: { ar: 'LC Waikiki', en: 'LC Waikiki' },
    category: 'fashion',
    floor: { ar: 'الدور الأول', en: '1st Floor' },
    description: {
      ar: 'العلامة التجارية العالمية الشهيرة لبيع الملابس الكاجوال واليومية العصرية للرجال، النساء، والأطفال بأسعار مناسبة.',
      en: 'Renowned international fashion brand offering casual daily wear, workwear, and modern apparel for men, women, and kids.'
    },
    badge: { ar: 'علامة دولية', en: 'Global Brand' }
  },
  {
    id: 'defacto',
    name: { ar: 'ديفاكتو (DeFacto)', en: 'DeFacto' },
    category: 'fashion',
    floor: { ar: 'الدور الأول', en: '1st Floor' },
    description: {
      ar: 'متجر تركي متألق للملابس العصرية والكاجوال لمختلف الأعمار والشباب بأحدث صيحات الموضة العالمية.',
      en: 'Trendy Turkish fashion chain offering youthful, comfortable, and contemporary apparel collections.'
    },
  },
  {
    id: 'mens-club',
    name: { ar: "مينز كلوب (Men's Club)", en: "Men's Club" },
    category: 'fashion',
    floor: { ar: 'الدور الثاني', en: '2nd Floor' },
    description: {
      ar: 'متجر متخصص في أرقى الأزياء الرجالية الكاجوال والكلاسيك والبدل الرسمية والقمصان الأنيقة.',
      en: 'Specialized store in refined menswear, smart casual clothing, formal suits, and tailored shirts.'
    },
  },
  {
    id: 'mini-townteam',
    name: { ar: 'ميني تاون تيم (Mini TownTeam)', en: 'Mini TownTeam' },
    category: 'fashion',
    floor: { ar: 'الدور الأول', en: '1st Floor' },
    description: {
      ar: 'فرع مخصص لملابس الشباب والأولاد والأطفال الكاجوال ذات الطابع الرياضي والأنيق.',
      en: 'Dedicated boutique for energetic youth, boys, and children casual wear.'
    },
  },
  {
    id: 'tomato-outlet',
    name: { ar: 'توماتو أوتليت (Tomato Outlet)', en: 'Tomato Outlet' },
    category: 'fashion',
    floor: { ar: 'الدور الأول', en: '1st Floor' },
    description: {
      ar: 'فرع يقدم تشكيلة ضخمة من الملابس العصرية لجميع أفراد الأسرة بأسعار مخفضة وتصفيات مميزة.',
      en: 'Value-oriented outlet store providing substantial discounts on branded apparel and casual essentials.'
    },
    badge: { ar: 'عروض وتخفيضات', en: 'Outlet Discounts' }
  },
  {
    id: 'activ',
    name: { ar: 'أكتيف (ACTIV)', en: 'ACTIV Sports' },
    category: 'fashion',
    floor: { ar: 'الدور الثاني', en: '2nd Floor' },
    description: {
      ar: 'متجر رائد متخصص في الملابس والأحذية الرياضية الأصلية ومستلزمات التدريب واللياقة البدنية.',
      en: 'Leading activewear store featuring authentic sportswear, running shoes, training gear, and fitness accessories.'
    },
  },
  {
    id: 'livora-store',
    name: { ar: 'ليفورا ستور (Livora Store)', en: 'Livora Store' },
    category: 'fashion',
    floor: { ar: 'الدور الثالث', en: '3rd Floor' },
    description: {
      ar: 'محل في الدور الثالث متخصص في أرقى تشكيلات البنطلونات الجينز والكاجوال لمختلف المقاسات والموديلات.',
      en: 'Specialized boutique on the 3rd floor focusing on premium denim, jeans, and casual pants.'
    },
  },
  {
    id: 'yusr-store',
    name: { ar: 'محل يسر (Yusr Store)', en: 'Yusr Store' },
    category: 'fashion',
    floor: { ar: 'الدور الثالث', en: '3rd Floor' },
    description: {
      ar: 'متجر أنيق في الدور الثالث مخصص لبيع أرقى الأحذية والحقائب النسائية المصممة بعناية.',
      en: 'Elegant 3rd floor boutique offering luxury women footwear, leather goods, and fashion handbags.'
    },
  },
  // Electronics
  {
    id: 'b-tech',
    name: { ar: 'بي تك (B.TECH)', en: 'B.TECH Megastore' },
    category: 'electronics',
    floor: { ar: 'الدور الأرضي والميزانين', en: 'Ground & Mezzanine' },
    description: {
      ar: 'معرض شامل لبيع أحدث الأجهزة الكهربائية والمنزلية، شاشات التلفزيون، الموبايلات، اللابتوبات، مع خطط تقسيط ميسرة.',
      en: 'Prime electronics megastore displaying the latest home appliances, smart TVs, mobile phones, laptops, and flexible financing.'
    },
    badge: { ar: 'أجهزة وإلكترونيات', en: 'Tech Leader' }
  },
  {
    id: 'mattresses-furnishings',
    name: { ar: 'معارض مراتب ومفروشات', en: 'Mattresses & Bedding Showrooms' },
    category: 'electronics',
    floor: { ar: 'الدور الثاني', en: '2nd Floor' },
    description: {
      ar: 'منافذ متخصصة لعرض أجود أنواع المراتب الطبية والاسفنجية والمفروشات المنزلية واللحاف والوسائد المريحة.',
      en: 'Dedicated showrooms for medical & orthopedic mattresses, luxury bedding sets, pillows, and home linens.'
    },
  },
  // Jewelry
  {
    id: 'g-stone',
    name: { ar: 'جي ستون (G Stone)', en: 'G Stone Fine Jewelry' },
    category: 'jewelry',
    floor: { ar: 'الدور الأرضي', en: 'Ground Floor' },
    description: {
      ar: 'متجر راقٍ متخصص في المشغولات الذهبية عيار 18 و 21، الألماس، والمجوهرات الفاخرة ذات التصاميم الراقية.',
      en: 'Prestigious jeweler offering certified gold craftsmanship, diamond sets, and elegant modern jewelry.'
    },
  },
  {
    id: 'gallery-dahab',
    name: { ar: 'جاليري دهب (Gallery Dahab)', en: 'Gallery Dahab' },
    category: 'jewelry',
    floor: { ar: 'الدور الثالث', en: '3rd Floor' },
    description: {
      ar: 'محل في الدور الثالث لبيع أرقى الهدايا التذكارية، المجات المخصصة، الفضيات، والإكسسوارات المتنوعة لجميع المناسبات.',
      en: 'Charming 3rd-floor gallery featuring thoughtful gifts, personalized mugs, silver ornaments, and lifestyle accessories.'
    },
  },
  // Cafes & Sweets
  {
    id: 'el-abd',
    name: { ar: 'حلواني العبد (El Abd Patisserie)', en: 'El Abd Patisserie' },
    category: 'cafes',
    floor: { ar: 'الدور الأرضي', en: 'Ground Floor' },
    description: {
      ar: 'فرع عريق لبيع أشهر وأشهى الحلويات الشرقية والغربية، التورتات الفاخرة، كعك العيد، والمخبوزات الطازجة.',
      en: 'Historic Egyptian patisserie renowned for traditional oriental sweets, custom celebration cakes, and fresh baked delicacies.'
    },
    badge: { ar: 'حلويات عريقة', en: 'Heritage Sweets' }
  },
  {
    id: 'presto-cafe',
    name: { ar: 'بريستو كافيه (Presto Cafe)', en: 'Presto Cafe' },
    category: 'cafes',
    floor: { ar: 'الدور الثاني', en: '2nd Floor' },
    description: {
      ar: 'كافيه هادئ يوفر جلسات مريحة ومجموعة واسعة من المشروبات الساخنة والباردة والإسبريسو والحلويات الخفيفة.',
      en: 'Cozy café offering relaxed seating and a curated selection of gourmet espresso, cold beverages, and pastries.'
    },
  },
  {
    id: 'anisifors-cafe',
    name: { ar: 'انيسيفورس كافيه (Anisifors Cafe)', en: 'Anisifors Cafe' },
    category: 'cafes',
    floor: { ar: 'الدور الثاني', en: '2nd Floor' },
    description: {
      ar: 'كافيه مميز في الدور الثاني بجوار منطقة المحلات، المكان الأمثل للراحة أثناء جولات التسوق والاستمتاع بالمشروبات.',
      en: 'Popular 2nd-floor café situated adjacent to retail shops, perfect for taking a shopping break with signature refreshments.'
    },
  },
  // Entertainment & Services
  {
    id: 'play-time-park',
    name: { ar: 'بلاي تايم بارك (Play Time Park)', en: 'Play Time Park' },
    category: 'entertainment',
    floor: { ar: 'الدور الرابع', en: '4th Floor' },
    description: {
      ar: 'منطقة ألعاب متطورة وآمنة للأطفال (Kids Area) تضم ألعاب المتاهات والمطاطية بالإضافة لمنطقة ألعاب فيديو وأركيد ممتعة للشباب.',
      en: 'State-of-the-art family entertainment center featuring safe soft-play mazes for kids and an interactive arcade zone.'
    },
    badge: { ar: 'ألعاب وترفيه', en: 'Kids & Family' }
  },
  {
    id: 'financial-services',
    name: { ar: 'خدمات مصرفية وماكينات ATM', en: 'Banking & Multi-Bank ATMs' },
    category: 'entertainment',
    floor: { ar: 'الدور الأرضي', en: 'Ground Floor' },
    description: {
      ar: 'تتوفر داخل المول ماكينات صراف آلي (ATM) تابعة لأكبر البنوك المصرية (البنك الأهلي، بنك مصر، CIB) لإجراء المعاملات السريعة.',
      en: 'On-site multi-bank ATMs (NBE, Banque Misr, CIB) facilitating easy cash withdrawals, deposits, and banking transactions.'
    },
    badge: { ar: 'خدمات 24/7', en: '24/7 ATMs' }
  },
];

export const elEzabyPharmacy: PharmacyInfo = {
  id: 'el-ezaby-pharmacy',
  name: { ar: 'صيدلية العزبي', en: 'El-Ezaby Pharmacy' },
  image: '/doctors/pharmacy-ezaby.jpg',
  floor: { ar: 'الدور الأول - برج الأطباء القديم', en: '1st Floor - Old Doctors\' Tower' },
  hotline: '19600',
  promoCode: 'SHUBRA10',
  discountPercentage: 10,
  offerText: {
    ar: 'احصل على خصم 10% عند حجز موعدك الطبي من خلال الموقع',
    en: 'Get a 10% discount when booking your appointment through the website'
  },
  description: {
    ar: 'صرح صيدلي متكامل في الدور الأول بالبرج يوفر كافة الأدوية المحلية والمستوردة، صرف الروشتات والتأمين الصحي، مستحضرات العناية الطبية، وخدمات قياس الضغط والسكر على مدار الساعة.',
    en: 'Integrated 1st-floor pharmacy providing domestic & international pharmaceuticals, prescription & insurance fulfillment, skin care, and 24/7 vitals checkups.'
  },
  features: {
    ar: ['صرف الروشتات الطبية والتأمين', 'توصيل مجاني وسريع في شبرا الخيمة', 'قياس الضغط وسكر الدم فورياً', 'خصم حصري 10% لرواد المنصة'],
    en: ['Prescription & Insurance Dispensing', 'Fast Free Delivery in Shubra El-Kheima', 'Instant Blood Pressure & Glucose Checks', 'Exclusive 10% Discount for Hub Users']
  }
};

export const doctorsOldTower: DoctorProfile[] = [
  // Internal medicine
  {
    id: 'dr-ahmed-ismail-zidan',
    name: { ar: 'د. أحمد إسماعيل زيدان', en: 'Dr. Ahmed Ismail Zidan' },
    specialtyKey: 'internal',
    specialtyName: { ar: 'باطنة عامة وأمراض دم ومناعة وسكر وغدد صماء', en: 'Internal Medicine, Hematology, Immunology & Diabetes' },
    subSpecialty: { ar: 'استشاري أمراض الباطنة العامة وأمراض الدم والغدد الصماء', en: 'Consultant of General Internal Medicine & Endocrinology' },
    floor: { ar: 'الدور الثاني (ضمن عيادات ومعامل الأمير)', en: '2nd Floor (Al-Amir Clinics & Labs)' },
    schedule: { ar: 'يتوفر مواعيد محددة أسبوعياً', en: 'Specific weekly clinic sessions' },
    phones: ['01010734900'],
    image: '/doctors/dr-ahmed-ismail-zidan.jpg',
    rating: 4.9,
    reviewCount: 142,
    reviewSnippet: {
      ar: 'دكتور متميز جداً وشرحه وافي لحالة السكر والمناعة، ومواعيده دقيقة.',
      en: 'Outstanding physician, clear explanation of diabetic care, and very punctual.'
    },
    isSponsored: true,
    examinationFee: { consultation: 150, regular: 300, urgent: 450 },
    note: { 
      ar: 'يفضل الاتصال المسبق على الرقم لتأكيد يوم وتوقيت تواجده في فرع عرابي.',
      en: 'Please call ahead to confirm daily attendance and appointment schedule.'
    }
  },
  {
    id: 'dr-ibrahim-farag-khater',
    name: { ar: 'د. إبراهيم فرج خاطر', en: 'Dr. Ibrahim Farag Khater' },
    specialtyKey: 'internal',
    specialtyName: { ar: 'باطنة وكلى وغدد صماء', en: 'Internal Medicine, Nephrology & Endocrinology' },
    subSpecialty: { ar: 'استشاري أمراض الكلى والباطنة السكرية', en: 'Nephrology & Diabetic Care Consultant' },
    floor: { ar: 'الدور الثالث', en: '3rd Floor' },
    schedule: { ar: 'تبدأ العيادة عادةً من الساعة 7:30 مساءً', en: 'Clinic usually commences at 7:30 PM' },
    phones: ['01010734900'],
    image: '/doctors/dr-ibrahim-farag-khater.jpg',
    rating: 4.8,
    reviewCount: 98,
    reviewSnippet: {
      ar: 'من أفضل أطباء الكلى والباطنة في شبرا الخيمة، قمة في الأخلاق والمهنية.',
      en: 'One of the best nephrologists in Shubra El-Kheima, highly ethical and competent.'
    },
    isSponsored: false,
    examinationFee: { consultation: 150, regular: 280, urgent: 420 }
  },
  {
    id: 'dr-islam-adel-awad',
    name: { ar: 'د. إسلام عادل عواد', en: 'Dr. Islam Adel Awad' },
    specialtyKey: 'internal',
    specialtyName: { ar: 'باطنة وجهاز هضمي', en: 'Internal Medicine & Gastroenterology' },
    subSpecialty: { ar: 'أخصائي أمراض الجهاز الهضمي والقولون العصبي', en: 'Gastroenterology & Digestive Health Specialist' },
    floor: { ar: 'الدور الثاني', en: '2nd Floor' },
    schedule: { ar: 'يومياً بالفترة المسائية', en: 'Daily evening sessions' },
    image: '/doctors/dr-islam-adel-awad.jpg',
    rating: 4.8,
    reviewCount: 84,
    reviewSnippet: {
      ar: 'تشخيص دقيق جداً لمشاكل القولون والجهاز الهضمي، وعلاج فعال.',
      en: 'Very accurate diagnosis for gastrointestinal issues with effective treatment.'
    },
    isSponsored: false,
    examinationFee: { consultation: 140, regular: 260, urgent: 400 }
  },
  {
    id: 'dr-mohamed-shebl',
    name: { ar: 'د. محمد شبل', en: 'Dr. Mohamed Shebl' },
    specialtyKey: 'internal',
    specialtyName: { ar: 'كبد ومناظير جهاز هضمي', en: 'Hepatology & Endoscopy' },
    subSpecialty: { ar: 'استشاري أمراض الكبد ومناظير الجهاز الهضمي المتقدمة', en: 'Consultant of Hepatology & Diagnostic Endoscopy' },
    floor: { ar: 'الدور الثالث', en: '3rd Floor' },
    image: '/doctors/dr-mohamed-shebl.jpg',
    rating: 4.9,
    reviewCount: 115,
    reviewSnippet: {
      ar: 'استشاري خبير في مناظير الكبد والجهاز الهضمي، والعيادة مجهزة بأحدث التقنيات.',
      en: 'Expert endoscopy and hepatology consultant with a modern clinic setup.'
    },
    isSponsored: false,
    examinationFee: { consultation: 160, regular: 320, urgent: 480 }
  },
  // OBGYN
  {
    id: 'dr-mona-heikal',
    name: { ar: 'د. منى هيكل', en: 'Dr. Mona Heikal' },
    specialtyKey: 'obgyn',
    specialtyName: { ar: 'نساء وتوليد وعقم', en: 'Obstetrics, Gynecology & Infertility' },
    subSpecialty: { ar: 'استشارية أمراض النساء والتوليد والحقن المجهري', en: 'Consultant of OB/GYN & IVF Treatments' },
    floor: { ar: 'الدور الثاني (أعلى النساجون الشرقيون)', en: '2nd Floor (Above Oriental Weavers)' },
    phones: ['01116585054'],
    image: '/doctors/dr-mona-heikal.jpg',
    rating: 5.0,
    reviewCount: 189,
    reviewSnippet: {
      ar: 'دكتورة ممتازة جداً ومريحة نفسياً ومتابعتها للحمل دقيقة وحريصة على المريضة.',
      en: 'Exceptional gynecologist, very attentive with pregnancy follow-ups and care.'
    },
    isSponsored: true,
    examinationFee: { consultation: 180, regular: 350, urgent: 500 },
    note: { ar: 'الحجز المسبق مطلوب هاتفياً أو عبر الموقع', en: 'Advance booking recommended' }
  },
  {
    id: 'dr-hossam-ghoneim',
    name: { ar: 'د. حسام غنيم', en: 'Dr. Hossam Ghoneim' },
    specialtyKey: 'obgyn',
    specialtyName: { ar: 'نساء وتوليد وجراحة مناظير', en: 'Obstetrics & Gynecologic Surgery' },
    subSpecialty: { ar: 'متابعة الحمل الحرج وجراحات الولادة بدون ألم', en: 'High-Risk Pregnancy & Modern Painless Delivery' },
    floor: { ar: 'الدور الرابع', en: '4th Floor' },
    image: '/doctors/dr-hossam-ghoneim.jpg',
    rating: 4.8,
    reviewCount: 76,
    reviewSnippet: {
      ar: 'طبيب محترف في الولادة بدون ألم ومناظير النساء، تعامل راقٍ ومهني.',
      en: 'Highly skilled in painless delivery and laparoscopy, very professional.'
    },
    isSponsored: false,
    examinationFee: { consultation: 160, regular: 320, urgent: 470 }
  },
  // Surgery & Ortho
  {
    id: 'dr-ahmed-salem',
    name: { ar: 'د. أحمد سالم', en: 'Dr. Ahmed Salem' },
    specialtyKey: 'surgery',
    specialtyName: { ar: 'جراحة عامة وأورام', en: 'General & Oncologic Surgery' },
    subSpecialty: { ar: 'استشاري الجراحة العامة وجراحات المناظير والأورام', en: 'Consultant of General, Laparoscopic & Surgical Oncology' },
    floor: { ar: 'الدور الخامس (1 شارع أحمد عرابي)', en: '5th Floor (1 Ahmed Orabi St.)' },
    phones: ['01142299774', '01275175686', '01116585054'],
    image: '/doctors/dr-ahmed-salem.jpg',
    rating: 4.9,
    reviewCount: 163,
    reviewSnippet: {
      ar: 'جراح قدير ومتمكن، أجرى العملية بنجاح تام والمتابعة بعد الجراحة ممتازة.',
      en: 'Skilled surgeon, the procedure was a complete success with great post-op care.'
    },
    isSponsored: true,
    examinationFee: { consultation: 180, regular: 350, urgent: 500 }
  },
  {
    id: 'dr-ahmed-el-husseiny',
    name: { ar: 'د. أحمد الحسيني', en: 'Dr. Ahmed El-Husseiny' },
    specialtyKey: 'surgery',
    specialtyName: { ar: 'جراحة عظام وعمود فقري ومفاصل', en: 'Orthopedics & Spine Surgery' },
    subSpecialty: { ar: 'استشاري جراحة العظام وعلاج الانزلاق الغضروفي والمفاصل الصناعية', en: 'Consultant of Orthopedic Trauma, Spine & Joint Replacement' },
    floor: { ar: 'الدور الخامس (1 شارع أحمد عرابي)', en: '5th Floor (1 Ahmed Orabi St.)' },
    phones: ['01142299774', '01275175686', '01116585054'],
    image: '/doctors/dr-ahmed-el-husseiny.jpg',
    rating: 4.9,
    reviewCount: 154,
    reviewSnippet: {
      ar: 'أفضل استشاري عظام وعمود فقري، التشخيص دقيق والنتيجة سريعة بفضل الله.',
      en: 'Top orthopedic and spine consultant, accurate diagnosis and great recovery.'
    },
    isSponsored: true,
    examinationFee: { consultation: 170, regular: 340, urgent: 490 }
  },
  {
    id: 'dr-ahmed-kishk',
    name: { ar: 'د. أحمد كشك', en: 'Dr. Ahmed Kishk' },
    specialtyKey: 'surgery',
    specialtyName: { ar: 'مسالك بولية وتفتيت حصوات وكلى', en: 'Urology & Kidney Care' },
    subSpecialty: { ar: 'استشاري جراحة المسالك البولية والذكورة والعقم', en: 'Urological Surgery & Lithotripsy Specialist' },
    floor: { ar: 'الدور الرابع', en: '4th Floor' },
    image: '/doctors/dr-ahmed-kishk.jpg',
    rating: 4.8,
    reviewCount: 91,
    reviewSnippet: {
      ar: 'علاج حصوات المسالك والكلى بأحدث الطرق وبدون جراحة معقدة، أنصح به بشدة.',
      en: 'State-of-the-art urinary lithotripsy care, highly recommended.'
    },
    isSponsored: false,
    examinationFee: { consultation: 150, regular: 300, urgent: 450 }
  },
  // Other
  {
    id: 'dr-hany-khattab',
    name: { ar: 'د. هاني خطاب', en: 'Dr. Hany Khattab' },
    specialtyKey: 'other',
    specialtyName: { ar: 'أنف وأذن وحنجرة', en: 'ENT (Otolaryngology)' },
    subSpecialty: { ar: 'استشاري جراحات الأنف والأذن والحنجرة ومشاكل السمع والاتزان', en: 'ENT Surgery, Hearing & Balance Disorders' },
    floor: { ar: 'الدور الثالث', en: '3rd Floor' },
    image: '/doctors/dr-hany-khattab.jpg',
    rating: 4.8,
    reviewCount: 110,
    reviewSnippet: {
      ar: 'دكتور هاني قمة في الذوق والخبرة في علاج حساسية الأنف ومشاكل الأذن.',
      en: 'Extremely polite and experienced in sinus, allergy, and ear conditions.'
    },
    isSponsored: false,
    examinationFee: { consultation: 140, regular: 280, urgent: 420 }
  },
  {
    id: 'dr-mohamed-mostafa',
    name: { ar: 'د. محمد مصطفى', en: 'Dr. Mohamed Mostafa' },
    specialtyKey: 'other',
    specialtyName: { ar: 'الجلدية والتجميل والليزر', en: 'Dermatology, Cosmetology & Laser' },
    subSpecialty: { ar: 'أخصائي الأمراض الجلدية والعلاج بالليزر والعناية بالبشرة والشعر', en: 'Dermatology & Aesthetic Laser Therapy' },
    floor: { ar: 'الدور الثاني', en: '2nd Floor' },
    image: '/doctors/dr-mohamed-mostafa.jpg',
    rating: 4.9,
    reviewCount: 148,
    reviewSnippet: {
      ar: 'عيادة مجهزة بأحدث أجهزة الليزر لعلاج البشرة والشعر، نتائج ملحوظة من أول جلسة.',
      en: 'Clinic equipped with modern aesthetic lasers, noticeable results from first session.'
    },
    isSponsored: true,
    examinationFee: { consultation: 150, regular: 300, urgent: 450 }
  },
  {
    id: 'al-borg-pt-center',
    name: { ar: 'مركز البرج للعلاج الطبيعي والتأهيل', en: 'Al-Borg Physical Therapy & Rehab' },
    specialtyKey: 'other',
    specialtyName: { ar: 'علاج طبيعي وتأهيل حركي', en: 'Physical Therapy & Rehabilitation' },
    subSpecialty: { ar: 'أحدث أجهزة العلاج الطبيعي وتأهيل العمود الفقري وما بعد الكسور والجلطات', en: 'Advanced Physiotherapy, Spine Rehab & Post-Operative Recovery' },
    floor: { ar: 'الدور الثالث', en: '3rd Floor' },
    phones: ['01010734900'],
    rating: 4.8,
    reviewCount: 88,
    reviewSnippet: {
      ar: 'مركز مجهز بأحدث أجهزة العلاج الطبيعي والتأهيل الحركي مع طاقم متخصص.',
      en: 'Well-equipped physiotherapy and movement rehabilitation center with expert staff.'
    },
    isSponsored: false,
    examinationFee: { consultation: 120, regular: 250, urgent: 380 }
  },
];

export const newTowerSpecialties = [
  {
    id: 'pediatrics',
    title: { ar: 'الأطفال وحديثي الولادة', en: 'Pediatrics & Neonatology' },
    desc: { 
      ar: 'متابعة نمو الرضع، الحضانات، التطعيمات، وعلاج حساسية الصدر والأمراض المعدية عند الأطفال.',
      en: 'Infant growth tracking, vaccinations, pediatric pulmonology, and acute pediatric care.'
    },
    icon: 'Baby'
  },
  {
    id: 'neurology',
    title: { ar: 'المخ والأعصاب ورسم المخ (EEG)', en: 'Neurology & EEG Diagnostics' },
    desc: { 
      ar: 'تشخيص أمراض الجهاز العصبي، الصرع، الشلل الرعاش، مع توفر وحدة رسم المخ الكهربائي الحديثة.',
      en: 'Neurological assessments, stroke management, migraines, and high-precision digital EEG services.'
    },
    icon: 'Brain'
  },
  {
    id: 'internal-diabetes',
    title: { ar: 'الباطنة والسكر والغدد الصماء', en: 'Internal Medicine, Diabetes & Endocrinology' },
    desc: { 
      ar: 'ضبط سكر الدم والضغط، متابعة أمراض الغدة الدرقية، واضطرابات التمثيل الغذائي والسمنة.',
      en: 'Comprehensive diabetes management, hypertension, thyroid disorders, and metabolic health.'
    },
    icon: 'Activity'
  },
  {
    id: 'ortho-bone',
    title: { ar: 'العظام وقياس هشاشة العظام (DEXA)', en: 'Orthopedics & Osteoporosis Screening' },
    desc: { 
      ar: 'جراحات العظام والمفاصل، علاج خشونة الركبة، وجهاز قياس كثافة العظام والكشف المبكر عن الهشاشة.',
      en: 'Joint therapy, orthopedic consultations, and advanced DEXA bone mineral density scanning.'
    },
    icon: 'Bone'
  },
  {
    id: 'obgyn-care',
    title: { ar: 'النساء والتوليد والسونار الرباعي', en: 'OB/GYN & 4D Ultrasound' },
    desc: { 
      ar: 'رعاية الحمل والولادة، السونار رباعي الأبعاد (4D/HD)، وعلاج تكيس المبايض وتأخر الإنجاب.',
      en: 'Prenatal care, HD 4D fetal ultrasound scans, PCOS treatments, and fertility support.'
    },
    icon: 'HeartPulse'
  },
  {
    id: 'dermatology-laser',
    title: { ar: 'الجلدية والأسنان والأنف والأذن', en: 'Dermatology, Dental & ENT Clinics' },
    desc: { 
      ar: 'عيادات تجميل الجلد بالليزر، عيادات الأسنان المجهزة بأحدث أجهزة التعقيم، ومناظير الأنف والأذن.',
      en: 'Aesthetic laser cosmetology, high-tech dental restoration units, and specialized ENT clinics.'
    },
    icon: 'Sparkles'
  },
  {
    id: 'medical-labs',
    title: { ar: 'معامل التحاليل الطبية الشاملة', en: 'Comprehensive Medical Laboratories' },
    desc: { 
      ar: 'سحب العينات وإجراء كافة التحاليل الهرمونية والفيروسية والجينية مع تسليم النتائج أونلاين فورياً.',
      en: 'Full-spectrum laboratory diagnostic testing, hormone analysis, and instant online test reporting.'
    },
    icon: 'FlaskConical'
  }
];

export const busRoutes: BusRoute[] = [
  // Bahtim Station
  {
    id: 'line-70',
    lineNumber: '70',
    stationKey: 'bahtim',
    origin: { ar: 'مساكن إسكو / بهتيم', en: 'Masaken Esco / Bahtim' },
    destination: { ar: 'وسط البلد / سراي القبة / مدينة نصر', en: 'Downtown / Saray El-Qobba / Nasr City' },
    keyStops: {
      ar: ['الشارع الجديد', 'مسطرد', 'السواح', 'الأميرية', 'سراي القبة', 'مدينة نصر'],
      en: ['El-Sharea El-Gadid', 'Mostorod', 'El-Sawah', 'El-Amiriya', 'Saray El-Qobba', 'Nasr City']
    },
    fullRoute: {
      ar: 'مساكن إسكو – بهتيم – الشارع الجديد – مسطرد – السواح – الأميرية – سراي القبة (ويمتد لوسط البلد / مدينة نصر)',
      en: 'Masaken Esco – Bahtim – El-Sharea El-Gadid – Mostorod – El-Sawah – El-Amiriya – Saray El-Qobba (Extends to Downtown / Nasr City)'
    }
  },
  {
    id: 'line-80',
    lineNumber: '80',
    stationKey: 'bahtim',
    origin: { ar: 'بهتيم / مساكن إسكو', en: 'Bahtim / Masaken Esco' },
    destination: { ar: 'شرق القاهرة ووسط البلد', en: 'East Cairo & Downtown' },
    keyStops: {
      ar: ['الشارع الجديد', 'مسطرد', 'شرق القاهرة', 'ميدان العتبة / وسط البلد'],
      en: ['El-Sharea El-Gadid', 'Mostorod', 'East Cairo', 'Attaba / Downtown']
    },
    fullRoute: {
      ar: 'بهتيم / مساكن إسكو – الشارع الجديد – مسطرد – متجه إلى مناطق شرق القاهرة ووسط البلد',
      en: 'Bahtim / Masaken Esco – El-Sharea El-Gadid – Mostorod – Towards East Cairo & Downtown'
    }
  },
  {
    id: 'line-87',
    lineNumber: '87',
    stationKey: 'bahtim',
    origin: { ar: 'بهتيم', en: 'Bahtim' },
    destination: { ar: 'القاهرة الجديدة (التجمع الخامس)', en: 'New Cairo (5th Settlement)' },
    keyStops: {
      ar: ['الشارع الجديد', 'الطريق الدائري', 'مدينة نصر', 'التجمع'],
      en: ['El-Sharea El-Gadid', 'Ring Road', 'Nasr City', 'Tagamoa']
    },
    fullRoute: {
      ar: 'بهتيم – الشارع الجديد – الدائري / مدينة نصر – متجه نحو التجمع بالقاهرة الجديدة',
      en: 'Bahtim – El-Sharea El-Gadid – Ring Road / Nasr City – Direct towards Tagamoa'
    }
  },
  {
    id: 'line-89',
    lineNumber: '89',
    stationKey: 'bahtim',
    origin: { ar: 'مساكن إسكو / بهتيم', en: 'Masaken Esco / Bahtim' },
    destination: { ar: 'ميدان التحرير / السيدة نفيسة', en: 'Tahrir Sq. / Sayeda Nafisa' },
    keyStops: {
      ar: ['الشارع الجديد', 'مسطرد', 'السواح', 'غمرة', 'رمسيس', 'التحرير', 'السيدة نفيسة'],
      en: ['El-Sharea El-Gadid', 'Mostorod', 'El-Sawah', 'Ghamra', 'Ramses', 'Tahrir', 'Sayeda Nafisa']
    },
    fullRoute: {
      ar: 'مساكن إسكو – بهتيم – الشارع الجديد – مسطرد – السواح – غمرة – رمسيس – التحرير – السيدة نفيسة',
      en: 'Masaken Esco – Bahtim – El-Sharea El-Gadid – Mostorod – El-Sawah – Ghamra – Ramses – Tahrir – Sayeda Nafisa'
    }
  },
  {
    id: 'line-90',
    lineNumber: '90',
    stationKey: 'bahtim',
    origin: { ar: 'بهتيم', en: 'Bahtim' },
    destination: { ar: 'العباسية / مدينة نصر', en: 'Abbassia / Nasr City' },
    keyStops: {
      ar: ['الشارع الجديد', 'ميدان العباسية', 'طريق النصر', 'مدينة نصر'],
      en: ['El-Sharea El-Gadid', 'Abbassia Square', 'Nasr Rd', 'Nasr City']
    },
    fullRoute: {
      ar: 'بهتيم – الشارع الجديد – متجه نحو مناطق العباسية / مدينة نصر',
      en: 'Bahtim – El-Sharea El-Gadid – Direct towards Abbassia / Nasr City'
    }
  },
  {
    id: 'line-18',
    lineNumber: '18',
    stationKey: 'bahtim',
    origin: { ar: 'بهتيم والشارع الجديد', en: 'Bahtim & El-Sharea El-Gadid' },
    destination: { ar: 'محطات المترو وميادين شرق القاهرة', en: 'Metro Stations & East Cairo Hubs' },
    keyStops: {
      ar: ['محطة مترو شبرا الخيمة', 'محطة مترو كلية الزراعة', 'ميادين شرق القاهرة'],
      en: ['Shubra El-Kheima Metro', 'Koleyet El-Zeraa Metro', 'East Cairo Hubs']
    },
    fullRoute: {
      ar: 'من الخطوط الحيوية بنطاق بهتيم والشارع الجديد لربطها بمحطات المترو وميادين شرق القاهرة الرئيسية',
      en: 'Connecting Bahtim and El-Sharea El-Gadid seamlessly to Cairo Metro lines and East Cairo centers'
    }
  },
  {
    id: 'line-155',
    lineNumber: '155',
    stationKey: 'bahtim',
    origin: { ar: 'مساكن إسكو / بهتيم', en: 'Masaken Esco / Bahtim' },
    destination: { ar: 'ميدان العباسية', en: 'Abbassia Square' },
    keyStops: {
      ar: ['بهتيم', 'الشارع الجديد', 'مسطرد', 'العباسية'],
      en: ['Bahtim', 'El-Sharea El-Gadid', 'Mostorod', 'Abbassia']
    },
    fullRoute: {
      ar: 'مساكن إسكو – بهتيم – مسطرد – متجه إلى ميدان العباسية وجامعة عين شمس',
      en: 'Masaken Esco – Bahtim – Mostorod – Direct to Abbassia Square & Ain Shams University'
    }
  },
  {
    id: 'line-800-bahtim',
    lineNumber: '800 (بهتيم)',
    stationKey: 'bahtim',
    origin: { ar: 'بهتيم والشارع الجديد', en: 'Bahtim & El-Sharea El-Gadid' },
    destination: { ar: 'التجمع الخامس (الجامعة الأمريكية AUC)', en: '5th Settlement (AUC Campus)' },
    keyStops: {
      ar: ['مسطرد', 'حلمية الزيتون', 'مصر الجديدة', 'عباس العقاد', 'التجمع الخامس (AUC)'],
      en: ['Mostorod', 'Helmeyet El-Zaitoun', 'Heliopolis', 'Abbas El-Akkad', '5th Settlement (AUC)']
    },
    fullRoute: {
      ar: 'بهتيم – الشارع الجديد – مسطرد – حلمية الزيتون – مصر الجديدة – عباس العقاد – التجمع الخامس (الجامعة الأمريكية)',
      en: 'Bahtim – El-Sharea El-Gadid – Mostorod – Helmeyet El-Zaitoun – Heliopolis – Abbas El-Akkad – 5th Settlement (AUC)'
    }
  },

  // Orabi Station
  {
    id: 'line-24',
    lineNumber: '24',
    stationKey: 'orabi',
    origin: { ar: 'أم بيومي / شارع عرابي', en: 'Om Bayoumi / Orabi St.' },
    destination: { ar: 'الحي السابع (مدينة نصر)', en: '7th District (Nasr City)' },
    keyStops: {
      ar: ['المظلات', 'رمسيس', 'غمرة', 'العباسية', 'الحي السابع بمدينة نصر'],
      en: ['El-Mezallat', 'Ramses', 'Ghamra', 'Abbassia', '7th District Nasr City']
    },
    fullRoute: {
      ar: 'أم بيومي – شارع عرابي – المظلات – رمسيس – غمرة – العباسية – الحي السابع (مدينة نصر)',
      en: 'Om Bayoumi – Orabi St. – El-Mezallat – Ramses – Ghamra – Abbassia – 7th District (Nasr City)'
    }
  },
  {
    id: 'line-157',
    lineNumber: '157',
    stationKey: 'orabi',
    origin: { ar: 'المظلات وكوبري عرابي', en: 'El-Mezallat & Orabi Bridge' },
    destination: { ar: 'إبراهيم بك', en: 'Ibrahim Bek' },
    keyStops: {
      ar: ['المظلات', 'كوبري عرابي', 'إبراهيم بك'],
      en: ['El-Mezallat', 'Orabi Bridge', 'Ibrahim Bek']
    },
    fullRoute: {
      ar: 'المظلات – كوبري عرابي – إبراهيم بك خط رابط داخلي سريع وسلس',
      en: 'El-Mezallat – Orabi Bridge – Ibrahim Bek quick urban shuttle connection'
    }
  },
  {
    id: 'line-800-orabi',
    lineNumber: '800 (المؤسسة وعرابي)',
    stationKey: 'orabi',
    origin: { ar: 'المؤسسة / عرابي', en: 'El-Moassasa / Orabi' },
    destination: { ar: 'التجمع الخامس ومدينة نصر', en: '5th Settlement & Nasr City' },
    keyStops: {
      ar: ['المؤسسة', 'عرابي', 'الشارع الجديد', 'مسطرد', 'مدينة نصر', 'التجمع الخامس'],
      en: ['El-Moassasa', 'Orabi', 'El-Sharea El-Gadid', 'Mostorod', 'Nasr City', '5th Settlement']
    },
    fullRoute: {
      ar: 'يبدأ من المؤسسة ويمر بـ عرابي والشارع الجديد ومسطرد وصولاً إلى مدينة نصر والتجمع الخامس',
      en: 'From El-Moassasa via Orabi, El-Sharea El-Gadid, and Mostorod to Nasr City & 5th Settlement'
    }
  },
  {
    id: 'line-915',
    lineNumber: '915',
    stationKey: 'orabi',
    origin: { ar: 'أم بيومي / كوبري عرابي', en: 'Om Bayoumi / Orabi Bridge' },
    destination: { ar: 'ميدان الدراسة والعباسية', en: 'El-Darrasa & Abbassia' },
    keyStops: {
      ar: ['شارع شبرا', 'المظلات', 'رمسيس', 'غمرة', 'الدمرداش', 'العباسية', 'الدراسة'],
      en: ['Shubra St.', 'El-Mezallat', 'Ramses', 'Ghamra', 'Demerdash', 'Abbassia', 'El-Darrasa']
    },
    fullRoute: {
      ar: 'أم بيومي – كوبري عرابي – شارع شبرا – المظلات – رمسيس – غمرة – الدمرداش – العباسية – الدراسة',
      en: 'Om Bayoumi – Orabi Bridge – Shubra St. – El-Mezallat – Ramses – Ghamra – Demerdash – Abbassia – El-Darrasa'
    }
  },
  {
    id: 'line-921',
    lineNumber: '921',
    stationKey: 'orabi',
    origin: { ar: 'مساكن الوحدة / كوبري عرابي', en: 'Masaken El-Wehda / Orabi' },
    destination: { ar: 'بولاق الدكرور وميدان التحرير', en: 'Boulaq El-Dakrour & Tahrir' },
    keyStops: {
      ar: ['كوبري أحمد عرابي', 'شارع شبرا', 'التحرير', 'بولاق الدكرور'],
      en: ['Ahmed Orabi Bridge', 'Shubra', 'Tahrir', 'Boulaq El-Dakrour']
    },
    fullRoute: {
      ar: 'مساكن الوحدة – كوبري أحمد عرابي – شبرا – التحرير – بولاق الدكرور',
      en: 'Masaken El-Wehda – Ahmed Orabi Bridge – Shubra – Tahrir – Boulaq El-Dakrour'
    }
  },
  {
    id: 'line-2080',
    lineNumber: '2080',
    stationKey: 'orabi',
    origin: { ar: 'أم بيومي / شارع عرابي', en: 'Om Bayoumi / Orabi St.' },
    destination: { ar: 'العباسية (جامعة عين شمس) ومصر الجديدة', en: 'Abbassia (Ain Shams Univ.) & Heliopolis' },
    keyStops: {
      ar: ['المظلات', 'العباسية', 'جامعة عين شمس', 'مصر الجديدة'],
      en: ['El-Mezallat', 'Abbassia', 'Ain Shams University', 'Heliopolis']
    },
    fullRoute: {
      ar: 'أم بيومي – شارع عرابي – المظلات – متجه نحو العباسية (جامعة عين شمس) ومصر الجديدة',
      en: 'Om Bayoumi – Orabi St. – El-Mezallat – Towards Abbassia (Ain Shams Univ.) & Heliopolis'
    }
  },
  {
    id: 'line-q2',
    lineNumber: 'Q2',
    stationKey: 'orabi',
    origin: { ar: 'شبرا الخيمة (عرابي / الدائري)', en: 'Shubra El-Kheima (Orabi / Ring)' },
    destination: { ar: 'مدينة العبور', en: 'Obour City' },
    keyStops: {
      ar: ['كوبري عرابي', 'الطريق الدائري', 'محور العبور', 'أحياء مدينة العبور'],
      en: ['Orabi Bridge', 'Ring Road', 'Obour Axis', 'Obour City Districts']
    },
    fullRoute: {
      ar: 'يربط شبرا الخيمة (عرابي / الدائري) بمدينة العبور مباشرة عبر مسار سريع ومختصر',
      en: 'Direct express route connecting Shubra El-Kheima (Orabi / Ring Road) to Obour City'
    }
  }
];

// Initial parking spots state (Lane A, B, C, D)
export const initialParkingSlots: ParkingSlot[] = [
  // Lane A (Near Open Air Mall entrance)
  { id: 'A-01', lane: 'A', number: 1, isOccupied: false, vehicleType: 'ev' },
  { id: 'A-02', lane: 'A', number: 2, isOccupied: true, vehicleType: 'car' },
  { id: 'A-03', lane: 'A', number: 3, isOccupied: false, vehicleType: 'car' },
  { id: 'A-04', lane: 'A', number: 4, isOccupied: false, vehicleType: 'disabled' },
  { id: 'A-05', lane: 'A', number: 5, isOccupied: true, vehicleType: 'car' },
  { id: 'A-06', lane: 'A', number: 6, isOccupied: false, vehicleType: 'car' },
  { id: 'A-07', lane: 'A', number: 7, isOccupied: true, vehicleType: 'car' },
  { id: 'A-08', lane: 'A', number: 8, isOccupied: false, vehicleType: 'car' },

  // Lane B
  { id: 'B-01', lane: 'B', number: 1, isOccupied: true, vehicleType: 'car' },
  { id: 'B-02', lane: 'B', number: 2, isOccupied: false, vehicleType: 'car' },
  { id: 'B-03', lane: 'B', number: 3, isOccupied: true, vehicleType: 'car' },
  { id: 'B-04', lane: 'B', number: 4, isOccupied: false, vehicleType: 'ev' },
  { id: 'B-05', lane: 'B', number: 5, isOccupied: false, vehicleType: 'car' },
  { id: 'B-06', lane: 'B', number: 6, isOccupied: true, vehicleType: 'car' },
  { id: 'B-07', lane: 'B', number: 7, isOccupied: false, vehicleType: 'car' },
  { id: 'B-08', lane: 'B', number: 8, isOccupied: true, vehicleType: 'car' },

  // Lane C
  { id: 'C-01', lane: 'C', number: 1, isOccupied: false, vehicleType: 'car' },
  { id: 'C-02', lane: 'C', number: 2, isOccupied: true, vehicleType: 'car' },
  { id: 'C-03', lane: 'C', number: 3, isOccupied: false, vehicleType: 'car' },
  { id: 'C-04', lane: 'C', number: 4, isOccupied: false, vehicleType: 'disabled' },
  { id: 'C-05', lane: 'C', number: 5, isOccupied: true, vehicleType: 'car' },
  { id: 'C-06', lane: 'C', number: 6, isOccupied: false, vehicleType: 'car' },
  { id: 'C-07', lane: 'C', number: 7, isOccupied: false, vehicleType: 'ev' },
  { id: 'C-08', lane: 'C', number: 8, isOccupied: true, vehicleType: 'car' },

  // Lane D (Near Gate Out & City Mall Walkway)
  { id: 'D-01', lane: 'D', number: 1, isOccupied: true, vehicleType: 'car' },
  { id: 'D-02', lane: 'D', number: 2, isOccupied: false, vehicleType: 'car' },
  { id: 'D-03', lane: 'D', number: 3, isOccupied: false, vehicleType: 'car' },
  { id: 'D-04', lane: 'D', number: 4, isOccupied: true, vehicleType: 'car' },
  { id: 'D-05', lane: 'D', number: 5, isOccupied: false, vehicleType: 'car' },
  { id: 'D-06', lane: 'D', number: 6, isOccupied: false, vehicleType: 'car' },
  { id: 'D-07', lane: 'D', number: 7, isOccupied: true, vehicleType: 'car' },
  { id: 'D-08', lane: 'D', number: 8, isOccupied: false, vehicleType: 'car' },
];
