Act as a Senior Frontend Architect and UI/UX Designer. Build a modern, high-end, responsive Smart Urban Hub web application (MVP) for an architectural/civil engineering urban redevelopment project titled **"Shubra El-Kheima - Vision of Development" (شبرا الخيمة - رؤية التطوير)**.

### 1. Tech Stack & Architecture
- **Framework:** React (Vite) with TypeScript/JavaScript.
- **Styling:** Tailwind CSS (configured with RTL/LTR support and Dark/Light mode).
- **UI Components:** Shadcn/UI (Radix UI) for sleek custom Dropdowns/Select menus, Tabs, Cards, Modals/Dialogs, and Badges.
- **Animations:** Framer Motion for smooth page transitions, scroll-triggered reveals, interactive card hover lifts, and layout animations.
- **Icons:** Lucide React.
- **Architecture & Media Assets (`data` folder):**
  - No backend required for this MVP. Store all structured text/content cleanly in a centralized data file (`src/data/siteData.ts` or `.js`) so it loads instantaneously.
  - **CRITICAL FOR IMAGES:** Inspect the existing **`data` folder** in the project workspace/directory. All project images (for Hero/Landing, Open Air Mall, City Mall, Old & New Doctors' Towers, Public Transport Stations, etc.) are located inside that `data` folder. Automatically detect, map, and import/link each image from the `data` folder to its corresponding section and card based on its filename and context. If any specific sub-item lacks a dedicated image in the `data` folder, gracefully fall back to its parent section's image or a clean architectural placeholder.

### 2. Design System, Colors & Localization
- **Bilingual Support (AR / EN):** Full support for Arabic (default, RTL layout with Cairo/Tajawal Google Font) and English (LTR layout with Inter/Plus Jakarta Sans). Include a smooth Language Switcher toggle in the sticky glassmorphic Navbar.
- **Theme Support (Light & Dark Mode):** Include a smooth Theme Toggle in the Navbar.
  - **Light Mode Palette:**
    - Background: `#f6f6f4`
    - Text: `#12110f`
    - Primary: `#8e8672`
    - Secondary: `#acbdad`
    - Accent: `#90a69c`
  - **Dark Mode Palette:** Adapt the above earthy/architectural palette harmoniously (e.g., deep charcoal/warm dark slate `#12110f` background, `#f6f6f4` text, keeping `#8e8672` primary and `#90a69c` accent for contrast).
- **Responsiveness:** Fully responsive across Mobile, Tablet, Laptop, and Desktop screens.

### 3. Pages & Navigation Flow
Use smooth client-side navigation (or view state with Framer Motion `AnimatePresence`) with a persistent top Navbar (Logo, Quick Navigation Dropdown/Links, Language Toggle, Dark/Light Mode Toggle, and a "Back to Hub" button when inside sub-pages).

#### A. Landing Page (Home / Hub)
- **Hero Section:** Modern architectural aesthetic using the corresponding hero/area image from the `data` folder, subtle geometric grid overlay, main title **"شبرا الخيمة - رؤية التطوير"** / **"Shubra El-Kheima - Vision of Development"**, an engaging welcome message introducing the smart urban redevelopment concept, and quick stats badges.
- **Interactive Destination Cards Grid:** 5 animated, interactive cards with hover scale/glow effects, custom icons, thumbnails mapped from the `data` folder, and brief descriptions that navigate to their respective dedicated views:
  1. **Open Air Mall** (المول المفتوح)
  2. **City Mall** (سيتي مول)
  3. **Doctors' Tower** (برج الأطباء)
  4. **Public Transport Hub** (النقل العام والمواقف)
  5. **Smart Parking** (الباركينج الذكي)

#### B. Open Air Mall View
- **Header:** Banner image mapped from the `data` folder, description highlighting its open-air café concept located right next to the Smart Parking area.
- **Content Grid:** Animated cards displaying each venue with category badges, descriptions, and operating hours:
  1. **Brew District:** Specialty hot/cold coffee, light desserts, and sandwiches. (Hours: 9:00 AM – 12:00 AM).
  2. **Green Bowl:** Healthy restaurant serving Salad Bowls, Fresh Juices, and healthy meals. (Hours: 10:00 AM – 11:00 PM).
  3. **Sweet Avenue:** Desserts shop serving waffles, crepes, pancakes, ice cream, and milkshakes. (Hours: 12:00 PM – 1:00 AM).
  4. **Urban Bites:** Fast food restaurant serving burgers, fried chicken, fries, and quick meals. (Hours: 11:00 AM – 1:00 AM).
  5. **The Juice Lab:** Natural juices, smoothies, milkshakes, and fruit drinks. (Hours: 10:00 AM – 12:00 AM).

#### C. City Mall View
- **Header:** Banner image mapped from the `data` folder, Location badge (**Bigam, First District of Shubra El-Kheima, Qalyubia - In front of Orabi Bridge / Next to Ferial Garden**), and Operating Hours (**Daily 10:00 AM – 12:00 AM, extending to 1:00 AM on Thursdays & Fridays**).
- **Interactive Category Filter (Shadcn Tabs + Search):** Filter stores smoothly by category:
  - **All**
  - **Supermarket & Groceries:**
    - *Carrefour (كارفور):* Ground floor supermarket for groceries and daily household essentials.
  - **Fashion, Shoes & Bags:**
    - *LC Waikiki:* Casual daily wear for men, women, and kids.
    - *DeFacto (ديفاكتو):* Trendy casual fashion for all ages.
    - *Men's Club (مينز كلوب):* Men's casual and classic menswear.
    - *Mini TownTeam (ميني تاون تيم):* Youth and kids casual fashion.
    - *Tomato Outlet (توماتو أوتليت):* 1st Floor, discounted outlet apparel.
    - *ACTIV (أكتيف):* Sportswear and athletic footwear.
    - *Livora Store (ليفورا ستور):* 3rd Floor, specialized in jeans and casual pants.
    - *Yusr Store (محل يسر):* 3rd Floor, women's shoes and handbags.
  - **Electronics & Home:**
    - *B.TECH (بي تك):* Home appliances, mobiles, and electronics.
    - *Mattresses & Furnishings Showrooms (معارض مراتب ومفروشات):* Home bedding and furnishings outlets.
  - **Jewelry, Accessories & Gifts:**
    - *G Stone (جي ستون):* Gold and fine jewelry.
    - *Gallery Dahab (جاليري دهب):* 3rd Floor, gifts, mugs, and diverse accessories.
  - **Cafes & Sweets:**
    - *El Abd Patisserie (حلواني العبد):* Oriental & Western sweets, cakes, and bakery.
    - *Presto Cafe (بريستو كافيه):* Hot and cold beverages and coffee.
    - *Anisifورس Cafe (انيسيفورس كافيه):* 2nd Floor next to the retail shops area.
  - **Entertainment & Services:**
    - *Play Time Park (بلاي تايم بارك):* Kids Area and Arcade games.
    - *Financial Services:* Multi-bank ATMs available inside the mall.

#### D. Doctors' Tower View (برج الأطباء)
- **Tower Selector:** Prominent interactive toggle/tabs to switch between the two buildings (displaying each tower's respective image from the `data` folder):
  1. **Old Doctors' Tower (برج الأطباء القديم)** – Address: *1 Ahmed Orabi St. (Above Oriental Weavers / النساجون الشرقيون)*.
     - Include a sleek **Shadcn Select Dropdown** to filter by Medical Specialty ("All Specialties", "Internal Medicine, Kidney & Endocrinology", "Obstetrics & Gynecology", "Surgery, Orthopedics & Urology", "Other Specialties & Clinics"):
     - *Internal Medicine, Kidney, Endocrinology & Hematology:*
       - **Dr. Ahmed Ismail Zidan** (General Internal Medicine, Hematology & Immunology, Diabetes & Endocrinology) – 2nd Floor (Al-Amir Clinics & Labs) – Phone: `01010734900` (with clickable Call button & note to call ahead for schedule).
       - **Dr. Ibrahim Farag Khater** (Internal Medicine, Kidney & Endocrinology) – Starts usually from `7:30 PM`.
       - **Dr. Islam Adel Awad** (Internal Medicine & Gastroenterology).
       - **Dr. Mohamed Shebl** (Hepatology & Endoscopy).
     - *Obstetrics, Gynecology & Infertility:*
       - **Dr. Mona Heikal** – 2nd Floor (Above Oriental Weavers) – Phone: `01116585054`.
       - **Dr. Hossam Ghoneim**.
     - *Surgery, Orthopedics & Urology:*
       - **Dr. Ahmed Salem** (General & Oncologic Surgery) – 5th Floor – Phones: `01142299774`, `01275175686`, `01116585054`.
       - **Dr. Ahmed El-Husseiny** (Orthopedics & Spine Surgery) – 5th Floor – Phones: `01142299774`, `01275175686`, `01116585054`.
       - **Dr. Ahmed Kishk** (Urology & Kidney).
     - *Other Specialties:*
       - **Dr. Hany Khattab** (ENT / الأنف والأذن والحنجرة).
       - **Dr. Mohamed Mostafa** (Dermatology & Cosmetology / الجلدية والتجميل).
       - **Al-Borg Physical Therapy Center** (مركز البرج للعلاج الطبيعي).
  2. **New Doctors' Tower (برج الأطباء الجديد)** – Address: *Orabi Square (Above B.TECH / أعلى بي تك)*.
     - Display modern specialty cards with icons for: Pediatrics & Neonatology (الأطفال وحديثي الولادة), Neurology & EEG services (المخ والأعصاب ورسم المخ), Internal Medicine, Diabetes & Endocrinology, Orthopedics & Osteoporosis Screening (العظام وقياس هشاشة العظام), OB/GYN, Dermatology, Dentistry, ENT, and Medical Labs.

#### E. Public Transport Hub View (The English Public Transport Company)
- **Header Info Banner:** Station image mapped from the `data` folder + Operating Schedule Badges: **First Bus: 6:00 AM** | **Last Bus: 10:00 PM** | **Frequency: Every 15–30 mins**.
- **Interactive Route Finder:** A smart Search Bar ("Where do you want to go? e.g., Ramses, Nasr City, Fifth Settlement...") + Station Tabs (**All Stations**, **Bahtim Station / موقف بهتيم - جراج مساكن إسكو**, **Orabi Station / موقف عرابي - ميدان وكوبري عرابي**).
- **Bus Lines Data:**
  - *Bahtim Station (موقف بهتيم):*
    - **Line 70:** Masaken Esco – Bahtim – El-Sharea El-Gadid – Mostorod – El-Sawah – El-Amiriya – Saray El-Qobba (extends to Downtown / Nasr City).
    - **Line 80:** Bahtim / Masaken Esco – El-Sharea El-Gadid – Mostorod – East Cairo & Downtown.
    - **Line 87:** Bahtim – El-Sharea El-Gadid – Ring Road / Nasr City – New Cairo (Tagamoa).
    - **Line 89:** Masaken Esco – Bahtim – El-Sharea El-Gadid – Mostorod – El-Sawah – Ghamra – Ramses – Tahrir – Sayeda Nafisa.
    - **Line 90:** Bahtim – El-Sharea El-Gadid – Abbassia / Nasr City.
    - **Line 18:** Bahtim & El-Sharea El-Gadid connecting to Metro stations & East Cairo squares.
    - **Line 155:** Masaken Esco – Bahtim – Abbassia.
    - **Line 800:** Bahtim – El-Sharea El-Gadid – Mostorod – Helmeyet El-Zaitoun – Heliopolis – Abbas El-Akkad – Fifth Settlement (AUC).
  - *Orabi Station (موقف عرابي):*
    - **Line 24:** Om Bayoumi – Orabi St. – El-Mezallat – Ramses – Ghamra – Abbassia – 7th District (Nasr City).
    - **Line 157:** El-Mezallat – Orabi Bridge – Ibrahim Bek.
    - **Line 800:** El-Moassasa – Orabi – El-Sharea El-Gadid – Mostorod – Nasr City – Fifth Settlement.
    - **Line 915:** Om Bayoumi – Orabi Bridge – Shubra St. – El-Mezallat – Ramses – Ghamra – Demerdash – Abbassia – El-Darrasa.
    - **Line 921:** Masaken El-Wehda – Ahmed Orabi Bridge – Shubra – Tahrir – Boulaq El-Dakrour.
    - **Line 2080:** Om Bayoumi – Orabi St. – El-Mezallat – Abbassia (Ain Shams University) & Heliopolis.
    - **Line Q2:** Shubra El-Kheima (Orabi / Ring Road) – Obour City.

#### F. Smart Parking View (Interactive Engineering Simulation)
- **Live Dashboard Bar:** Displays real-time counters at the top: **Total Spots**, **Available Spots (Green)**, and **Occupied Spots (Red)**, plus a filter or "Reset Simulation" button.
- **Interactive Architectural Parking Map:**
  - Design a top-down architectural parking lot layout divided into clear driving lanes (Lanes A, B, C, D) with directional road arrows and proximity labels (e.g., "Entrance Gate", "Direct Access to Open Air Mall").
  - Render individual parking slots with distinct visual styling:
    - **Available Slots:** Emerald Green (`#22c55e` / subtle glassmorphic green border & car outline) labeled "Available".
    - **Occupied Slots:** Coral/Crimson Red (`#ef4444` with a sleek top-down car icon) labeled "Occupied".
  - **Interactive Reservation:** When the user clicks any **Green (Available)** slot, open a sleek Shadcn Dialog/Toast confirmation ("Spot [Slot ID] Reserved Successfully!"), dynamically turn that slot from Green to Red (or Amber "Reserved"), and automatically update the top live counters! Clicking a Reserved slot allows canceling the reservation.

### 4. Code Quality & Execution Instructions
- First scan the `data` folder to map all available image files accurately so zero broken image links occur.
- Ensure zero broken imports, clean component modularity (`components/`, `data/`, `pages/`), smooth Framer Motion transitions, and immaculate spacing/typography in both Arabic (RTL) and English (LTR).
- Build the complete functional application right away.