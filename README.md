# RE-CALm - شبرا الخيمة (Shubra El-Kheima Smart Urban Hub)

> المنصة الرقمية الذكية لمشروع التحول والتطوير العمراني والهندسي لمنطقة شبرا الخيمة - محافظة القليوبية.  
> An integrated Smart Urban Hub MVP for the sustainable redevelopment of Shubra El-Kheima, Egypt.

---

## 🌟 مميزات المشروع (Key Features)

1. **الرئيسية (Hub Overview):**
   - واجهة معمارية حديثة مع خلفية وتراكب هندسي (`architectural-grid`).
   - بطاقات تفاعلية للوجهات الخمس الرئيسية مع تأثيرات حركية متقدمة (`Framer Motion`).
   - شريط إحصائيات سريعة للمشروع.
   - **قسم المقترحات والشكاوى (Suggestions & Complaints):** نموذج تفاعلي ذكي يتيح للمواطنين والزوار تقديم أفكارهم أو بلاغاتهم بسهولة مع فحص فوري للحقول وإصدار رقم تذكرة مرجعي.

2. **المول المفتوح (Open Air Mall):**
   - استعراض كافيهات ومطاعم الهواء الطلق ومواعيد عملها (Brew District, Green Bowl, Sweet Avenue, Urban Bites, The Juice Lab).
   - إبراز الممشى المباشر الملاصق للباركينج الذكي.

3. **سيتي مول (City Mall):**
   - دليل المتاجر والماركات العالمية (كارفور، بي تك، LC Waikiki، DeFacto، حلواني العبد، بلاي تايم بارك، وغيرها).
   - نظام فلترة متقدم حسب الأقسام (Tabs) مع شريط بحث فوري.

4. **برج الأطباء (Doctors' Tower):**
   - محول تفاعلي بين البرجين الطبيين:
     - **برج الأطباء القديم:** تصفية حسب التخصص الطبي، البحث باسم الطبيب أو العيادة، أرقام هواتف الحجز، والأدوار.
     - **برج الأطباء الجديد:** تصميم موحد مع شريط فلترة وبحث، وبطاقة حالة التسكين الحالية، وميزة **"هل أنت طبيب؟ سجل عيادتك في البرج الجديد"** عبر نافذة منبثقة تفاعلية (Modal).

5. **النقل العام والمواقف (The English Public Transport Co.):**
   - مكتشف المسارات الذكي (Route Finder) للبحث بالوجهة أو رقم الخط.
   - جداول ومسارات خطوط موقفي بهتيم وعرابي (15 خط أتوبيس يربط شبرا الخيمة بجميع أنحاء القاهرة الكبرى).

6. **الباركينج الذكي (Smart Parking - Engineering Simulation):**
   - محاكاة هندسية تفاعلية لمواقف السيارات مقسمة إلى 4 حارات (A, B, C, D).
   - عدادات لحظية للمواقف الشاغرة والمشغولة وحجوزات المستخدم.
   - إمكانية حجز الباكية بنقرة واحدة مع نافذة تأكيد Shadcn واحتفال بصري بـ Confetti وإلغاء الحجز ديناميكياً.

---

## 🎨 نظام التصميم والتقنيات (Tech Stack & Design System)

- **Framework:** React 19 + Vite 6 + TypeScript
- **Styling:** Tailwind CSS 3.4 (RTL/LTR Support + Dark/Light Mode)
- **Palette:**
  - Background: `#f6f6f4` (Light) / `#12110f` (Dark)
  - Text: `#12110f` (Light) / `#f6f6f4` (Dark)
  - Primary: `#8e8672`
  - Secondary: `#acbdad`
  - Accent: `#90a69c`
- **Typography:** Cairo & Tajawal (العربية) | Plus Jakarta Sans & Inter (English)
- **Animations:** Framer Motion
- **Icons:** Lucide React

---

## 🚀 طريقة التثبيت والتشغيل محلياً (Getting Started)

```bash
# 1. استنساخ المستودع (Clone the repo)
git clone https://github.com/marwanemam10/RE-CALm-Shubra-El-Kheima.git

# 2. الدخول للمجلد
cd RE-CALm-Shubra-El-Kheima

# 3. تثبيت الاعتماديات (Install dependencies)
npm install

# 4. تشغيل خادم التطوير (Start development server)
npm run dev

# 5. بناء نسخة الإنتاج (Build for production)
npm run build
```

---

## 📄 الترخيص (License)
مشروع RE-CALm - شبرا الخيمة | رؤية التطوير الحضري المستدام.
جميع الحقوق محفوظة © 2026.
