## Що будуємо

Єдину навігацію-кільце, яка живе крізь усі цифрові ресурси екосистеми (feelagain.me, /pager, /report, dashboard.feelagain.me у майбутньому), плюс «Ring Hub» — повноцінну презентаційну секцію перед Hero на головній, де те саме кільце розкривається у вигляді трьох пайплайнів (Donor / Provider / Beneficiary).

## 1. Global Copper Ring (новий компонент `<CopperRing/>`)

Постійна нижня панель навігації, видима на всіх сторінках поточного сайту.

**Фізика і вигляд**
- Перпендикулярне до екрана кільце; видно лише торець — горизонтальна смуга внизу екрана, ширина ≈ `min(100vw - 16px, 1400px)`, висота ≈ `clamp(96px, 14vh, 132px)`.
- Поверхня: глибокий мідно-зеленуватий градієнт з ледь помітним digital moiré-патерном (SVG `<pattern>` з `feTurbulence` + накладені тонкі лінії), кінці затухають у фон.
- 3 горизонтальні ряди (3 співвісні кільця, що можуть незалежно зсуватись):
  1. **Breadcrumb**: `Ресурс / Розділ / Сторінка` зліва + статус «призначення/функція/аватар» справа.
  2. **Data projection** з дашборду (3-4 живі метрики), клік → перехід на dashboard.
  3. **Markers row**: фірмові засічки сторінок (борозни, втиснуті в мідь) + помаранчеві «масляні» мітки переходу між ресурсами.

**Взаємодія**
- Свайп/drag по горизонталі обертає кільце (зсуває маркери); звичайний скрол сторінки НЕ обертає.
- Активний маркер під фіксованим центральним «прицілом» (тонка вертикальна риска з вирізом).
- Клік на маркер = навігація. Між-ресурсний клік або проходження маркера через приціл показує overlay «Ви залишаєте FEEL AGAIN · Перехід на Dashboard» з підтвердженням (Esc/click outside — скасування).
- Keyboard: ←/→ зсувають на одну позицію, Enter — активувати, Tab — пройти за маркерами як по списку.

**Доступність (для дальтонізму та інших вад)**
- Кожен маркер: іконка + текст + форма (square = сторінка, diamond = ресурс), не лише колір.
- `prefers-reduced-motion`: вимикає обертання та moiré-анімацію.
- Контраст ≥ AA на мідній поверхні; orange-маркери дублюються підкресленням.
- `role="navigation"` + `aria-label`, кожен маркер — `<a>` з `aria-current` і видимим focus ring.
- Hit-area маркерів ≥ 44×44.

## 2. Ring Hub Section (нова секція на `/`, ПЕРЕД Hero)

Окрема секція `<RingHub/>`, висота ≈ `min(100vh, 820px)`, повноекранний presentation-режим того ж кільця.

- Велике мідне кільце по центру, видно майже повне коло (плаский вигляд зверху, у проекції 30°).
- Поділене на 3 сектори: **Donor**, **Provider**, **Beneficiary**. У центрі — `Outcome Verification` (мета-кільце, ЄСОЗ-сумісні шкали — placeholder «To be defined»).
- Hover/клік на сектор: підсвічує його шлях (4 вузли) і показує бічну панель з кроками + технічними мета-даними (FHIR R4 Resource, VC type, ISO 20022 message).
- Toggle **Donor View ↔ Architect View** угорі: у Donor сховані технічні лейбли, показані confidence-метрики; у Architect — навпаки.
- Animated flow: тонкі помаранчеві лінії від периметра до центру з підписом «Outcome verified → Payment released».
- Інтеграційні порти: маленькі quoins на зовнішньому радіусі — ЄСОЗ, Трембіта, W3C VC Registry, Donor Reports — клік відкриває tooltip-картку.
- Дані: `src/data/ring-hub.ts` — типізовані mock-структури FHIR/VC/ISO 20022, які виступатимуть fallback при майбутньому API; адаптер `useRingData()` ховає джерело.

## 3. Інтеграція з існуючим сайтом

- `src/pages/Index.tsx`: `<RingHub/>` ПЕРЕД `<HeroSection/>`.
- `src/App.tsx`: `<CopperRing/>` рендериться поза `<Routes/>` (видно завжди). На `/` бере конфіг breadcrumb’ів секцій, на `/digital|/finance|/sustainability|/pager|/report` — конфіг сторінок.
- `NavigationBar`: top-nav залишається, але посилання `Dashboard` синхронізується з міжресурсним маркером кільця (одна правда — `src/config/ecosystem.ts`).
- i18n: усі лейбли через `useT()`, ключі в `src/i18n/index.tsx` (UA + EN).

## 4. Технічні деталі

- React + Framer Motion для обертання (`motion.div` + `useMotionValue` + `useDrag` через `@use-gesture/react` — додати залежність).
- SVG для копра/мітки; CSS-only moiré (`background: repeating-conic-gradient` + `mix-blend-mode: overlay`).
- Дизайн-токени в `src/index.css`: `--copper-deep`, `--copper-patina`, `--copper-orange`, `--moire-opacity` (HSL).
- Файлова структура:
  ```
  src/components/ring/CopperRing.tsx
  src/components/ring/RingHub.tsx
  src/components/ring/RingMarker.tsx
  src/components/ring/CrossResourceOverlay.tsx
  src/components/ring/PathwayPanel.tsx
  src/config/ecosystem.ts        // ресурси, сторінки, переходи
  src/data/ring-hub.ts            // mock FHIR/VC/ISO 20022
  src/hooks/useRingData.ts
  ```
- Тести (vitest + RTL): рендер CopperRing, перемикання View toggle, побудова breadcrumb для маршруту, A11y-снапшот (всі маркери мають accessible name).

## 5. Що НЕ робимо у цій ітерації

- Не підключаємо реальні ЄСОЗ/Трембіта/Dashboard API (тільки структури-fallback).
- Не фіксуємо клінічні шкали — лишаємо placeholder «To be defined».
- Не вбудовуємо AI-функціонал у Pager/Report (раніше домовлено пізніше).

## Після підтвердження

Реалізую у такому порядку: токени + ecosystem config → CopperRing (із drag-rotation і a11y) → CrossResourceOverlay → RingHub секція + Donor/Architect toggle → mock-дані + адаптер → інтеграція в `Index` і `App` → тести.
