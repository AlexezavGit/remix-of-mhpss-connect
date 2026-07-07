
## Мета

Привести структуру сайту у відповідність до нового меню, прибрати стару навігацію «Стратегія / Pager / Report», і перебудувати навігаційне кільце у 3 ряди з тикером цифр у форматі як на скріні.

Примітка: підключений проєкт `gazelle-pathways` наразі порожній (лише плейсхолдер `routes/index.tsx`), тож імпортувати звідти нічого — я лише збережу назву як референс на майбутнє.

---

## 1. Нова інформаційна архітектура

Глобальне меню (5 пунктів, лишаємо ті самі ID):

| Пункт меню | Маршрут | Роль сторінки |
|---|---|---|
| Дані та Інсайти | зовнішній `dashboard.feelagain.me` | без змін |
| Рішення | `/solutions` (новий, замість `/digital`) | Хаб рішень + підсторінки Digital / Finance / Sustainability |
| Вхід | `/login` | Bloomberg BBA-style login (термінал-стиль) |
| Демо | `/demo` (замість `/pager`) | Bloomberg contact-menu-style: форма запиту демо/контакту |
| Консорціум | `/consortium` (виносимо з `/#consortium`) | Партнери, їхні інтереси, зони відповідальності, аргумент відкритого приєднання |

Прибираємо:
- Стару верхню панель у `PagerPage`/`ReportPage` («Стратегія · Pager · Report»).
- Маршрути `/pager` і `/report` → 301-подібні редіректи на нові адреси (`/demo`, `/solutions` відповідно) через `<Navigate>`.
- Внутрішню під-панель `NavigationBar.tsx` для home (заміниться локальним рядом у кільці).

---

## 2. Розподіл існуючого контенту

Йде за логікою «Проблема → Модель → Докази → Дія».

### `/` (Home — Overview)
Коротка вітальна сторінка-маніфест. Тримає:
- `HeroSection`, `WhyExists`, `NarrativePillars`, `ThreeDirections` (як тизери на `/solutions`), `ImpactChain`, `SiteFooter`.
Прибираємо звідси: `HowItWorks`, `ConnectionAxes`, `CostOfInaction`, `RoiModels`, `ProgramRollout`, `Consortium` — переносимо нижче.

### `/solutions` (Рішення — хаб + підсторінки)
Логіка: що будуємо → як працює → архітектура → три напрями.
Секції по порядку:
1. Інтро (з `DigitalPage` hero).
2. `HowItWorks` (перенесено з `/`).
3. `LayerArchitecture` + `ProjectMatrix` (вже в Digital).
4. `ThreeDirections` як розгортка на три підсторінки: `/solutions/digital`, `/solutions/finance`, `/solutions/sustainability` (перейменування існуючих сторінок).
5. `ConnectionAxes` (перенесено з `/`).

Підсторінки `finance` та `sustainability` лишаються з поточним вмістом + отримують `GoldenScenario`, `ScoringMatrix`, `FinancialModel`, `RoiModels`, `GazellesPipeline` там, де тематично підходить (Finance: Golden Scenario + ScoringMatrix + FinancialModel + RoiModels; Sustainability: GazellesPipeline + ProgramRollout + CostOfInaction).

### `/demo` (Демо, стиль `professional.bloomberg.com/contact-menu`)
Порядок:
1. Хедер: «Request a Feel Again demo».
2. Двоколонковий layout: ліворуч — «What you'll see» (стисло, 4 пункти, з іконками-інфографікою), праворуч — форма (роль, організація, країна, потреба, email, phone; згода на обробку). Форма поки що submit → toast + console (без бекенду).
3. Смуга «Хто вже підключений» — логотипи-плейсхолдери партнерів.
4. FAQ-акордеон (3–4 пункти з існуючого Pager one-pager: аудиторії, вартість для держави = 0, timeline).
Контент чіпляємо з поточного `PagerPage` (три аудиторії, статистика, THE ASK — переформатовуємо у «Що ви побачите на демо»).

### `/login` (Вхід, стиль `bba.bloomberg.net`)
Максимально стриманий термінал-екран:
1. Центрована картка на темному тлі: логотип, поле Email/Login ID, Password, «Sign in», лінк «Create Serial Number / Request access» → веде на `/demo`.
2. Права/ліва тонка колонка з системним «status»: uptime, версія, регіон (декоративно, статично).
3. Футер з юридичними лінками.
Без реальної авторизації (форма-заглушка, submit → toast). Backend не чіпаємо.

### `/consortium` (Консорціум)
Витягуємо `Consortium` з `/` і збагачуємо:
1. Маніфест-абзац: навіщо консорціум, принцип відкритого приєднання.
2. Сітка партнерів: назва / роль / зона відповідальності / інтерес — інфографіка як матриця (перебудова `Consortium.tsx`).
3. «Аргумент приєднання»: 3–4 карти вигоди (доступ до даних, платіжні рейки, co-branding, участь у Scoring Matrix).
4. CTA «Долучитися» → `/demo`.

### `/report` та `/pager`
Видаляємо. Ставимо `<Route path="/report" element={<Navigate to="/solutions" replace />} />` та `/pager` → `/demo`.

---

## 3. CopperRing — 3-рядне навігаційне кільце

Формат за скріншотом (не за дизайном — за композицією і пропорціями).

Ряд 1 — Глобальна навігація (як зараз):
- 5 пунктів меню + логотип + перемикачі мови/теми.
- Активний пункт підсвічений золотим.

Ряд 2 — Локальна навігація (нове):
- Динамічний список in-page якорів для поточної сторінки, наприклад для `/solutions`: `Огляд · Як працює · Архітектура · Напрями · Осі зв'язку`.
- Реалізація: у кожній сторінці експортуємо `sections: {id,label}[]`, кільце читає через контекст `PageNavContext` (провайдер у layout сторінки). Fallback — порожньо.
- Стиль: тонкі лінк-таби, компактні, під горизонтальною лінією.

Ряд 3 — Тикер цифр у форматі як на скріні:
- Кожна комірка: `[міні-барчарт SVG]  [ВЕЛИКЕ ЗНАЧЕННЯ]  [▲ або ▼ колір]` зверху, і `підпис маленькими CAPS + джерело` знизу.
- До 5 комірок, роздільники — вертикальні лінії між ними.
- Дані беремо з `dashboardFeed` за поточним маршрутом (логіка вже є в `contextNumbers`), додаємо поля `delta` (напрям стрілки) і `source` в `src/data/dashboard-feed.ts`.
- Мініграфік — інлайн SVG з 5–7 барів (детерміновано на основі значення, без реальних тайм-серій — це індикатор, не дані).
- Кольори: зелений/золотий/коралевий за тоном (використати існуючий `toneOf`), стрілки:
  - ▲ синій `--sky` коли `delta === "up"` і це «добре» (наприклад ROI),
  - ▼ червоний `--coral` для проблеми (Gap, потреба),
  - ▼ золотий для нейтрального прогресу.
  Мапу «метрика → good/bad» тримаємо в даних.

Автоприховування на скрол — лишаємо.

---

## 4. Технічні деталі

- Файли до створення:
  - `src/pages/SolutionsPage.tsx` (перейменування/обгортка над `DigitalPage`).
  - `src/pages/LoginPage.tsx`.
  - `src/pages/DemoPage.tsx`.
  - `src/pages/ConsortiumPage.tsx`.
  - `src/components/ring/RingTicker.tsx` (ряд 3 винесений).
  - `src/components/ring/PageNav.tsx` + `src/context/PageNavContext.tsx` (ряд 2).
  - `src/components/ring/MiniBars.tsx` (SVG-мініграфік).
- Файли до правки:
  - `src/App.tsx` — нові маршрути + `<Navigate>` для `/pager`, `/report`.
  - `src/components/ring/CopperRing.tsx` — розбити на 3 ряди, підключити `PageNav` і `RingTicker`.
  - `src/data/dashboard-feed.ts` — додати `delta: "up"|"down"`, `polarity: "good"|"bad"|"neutral"`, `source: string`.
  - `src/components/NavigationBar.tsx` — видалити (не використовується після переносу локальної навігації в кільце).
  - `src/pages/Index.tsx` — скоротити до нового складу секцій.
  - `src/components/Consortium.tsx` — переробити під `/consortium` (матриця партнерів + аргумент приєднання).
- Файли до видалення: `src/pages/PagerPage.tsx`, `src/pages/ReportPage.tsx` (після переносу вмісту).
- i18n: додати ключі для нових пунктів локальної навігації і сторінок Demo/Login/Consortium.
- Форми Login/Demo — без бекенду; сабміт показує toast (`useToast`). Реальну авторизацію лишаємо на окремий тікет.

---

## 5. Порядок робіт

1. Дані та кільце: розширити `dashboard-feed`, зробити `MiniBars`, `RingTicker`, `PageNav`, оновити `CopperRing`.
2. Маршрути та редіректи в `App.tsx`.
3. Створити `DemoPage`, `LoginPage`, `ConsortiumPage` з перенесеним контентом.
4. Переробити `SolutionsPage` (з `DigitalPage`) як хаб + підмаршрути.
5. Почистити `Index.tsx` і видалити `PagerPage`/`ReportPage`/`NavigationBar`.
6. Перевірити збірку і візуально пройти всі 5 маршрутів.

---

## Питання, які лишаю відкритими (можу вирішити на етапі імплементації, скажіть, якщо треба уточнити зараз)

- Чи має `/login` бути реальним (Lovable Cloud auth) чи візуальною заглушкою? У плані — заглушка.
- Підсторінки `/solutions/*` — залишаємо URL `/digital`, `/finance`, `/sustainability` як алiаси чи перейменовуємо повністю? У плані — перейменовуємо, старі → редірект.
