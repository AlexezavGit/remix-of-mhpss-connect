import CabinetLayout from "@/components/users/CabinetLayout";

const DonorPage = () => (
  <CabinetLayout
    tag="03 · Донор / інвестор"
    tone="gold"
    title="Кабінет джерела фінансування"
    lead="Створення програм фінансування з тригерами за KPI, ескроу за протоколом, real-time impact dashboard і ESG/CSR звітність під ваш бренд."
    journey={[
      { n: "01", t: "Створення програми фінансування", d: "Задаєте протокол, регіон, когорту та KPI. Смарт-контракт публікується у мережі." },
      { n: "02", t: "Резервування ескроу", d: "ISO 20022 pain.001, зʼязка з конкретним протоколом та когортою." },
      { n: "03", t: "Матчинг з виконавцями", d: "Ваша програма стає доступною фахівцям і бенефіціарам відповідного профілю." },
      { n: "04", t: "Тригер за критерієм", d: "Напр. «30% оплати для ветеранів». Умови працюють, поки виконуються KPI." },
      { n: "05", t: "Підтверджений outcome", d: "FHIR Observation → escrow release → camt.054 сетлмент з on-chain receipt." },
      { n: "06", t: "Real-time impact dashboard", d: "Кожна сесія тегована «Funded by [Donor]». White-label ESG-панель." },
      { n: "07", t: "ESG / CSR звіт", d: "Workforce Resilience, Reputation, Turnkey Infrastructure — готовий пакет." },
      { n: "08", t: "Дофінансування наступних когорт", d: "Reverse Waterfall: попередні внески як валідація потреби для нових раундів." },
    ]}
    fields={[
      { k: "org", label: "Організація", required: true, placeholder: "e.g. USAID / ЕБРД / Метінвест Foundation" },
      { k: "email", label: "Робочий email", type: "email", required: true },
      { k: "amount", label: "Плановий обсяг, USD", type: "text", placeholder: "e.g. 500000" },
      { k: "focus", label: "Пріоритет когорти", placeholder: "ветерани · медики · діти ВПО · frontline" },
      { k: "pw", label: "Пароль", type: "password", required: true },
    ]}
    submitLabel="Увійти як донор"
    note="Ми підключимо ваш ескроу до сендбоксу НБУ, налаштуємо KPI та передамо real-time дашборд під ваш бренд."
  />
);

export default DonorPage;
