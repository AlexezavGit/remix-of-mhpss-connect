import CabinetLayout from "@/components/users/CabinetLayout";

const ProviderPage = () => (
  <CabinetLayout
    tag="02 · Виконавець"
    tone="primary"
    title="Кабінет надавача допомоги"
    lead="Онбординг фахівця, верифікація ліцензії, потік клієнтів з циркуляційної папки та автоматичні звіти в ЄСОЗ через Трембіту."
    journey={[
      { n: "01", t: "Верифікація ліцензії", d: "W3C Verifiable Credential від МОЗ / НПА. Область практики: CBT, EMDR, VR." },
      { n: "02", t: "Створення профілю та проекту", d: "Проекти виконавця стають доступними у кабінеті інвестора / донора." },
      { n: "03", t: "Прийом кейсу з папки", d: "Матчинг за протоколом, навантаженням і геолокацією." },
      { n: "04", t: "Проведення сеансу", d: "Start/stop, GPS, опційний AI-ассистент у діагностиці, автозапис у FHIR Encounter." },
      { n: "05", t: "Тестування і супервізія", d: "PROM-опитувальники, чек супервізора для складних випадків." },
      { n: "06", t: "Автоматичний звіт", d: "FHIR Observation → Трембіта → ЄСОЗ. Non-billing shadow record." },
      { n: "07", t: "Ескроу-релейс і виплата", d: "Дегресивна ставка 7→3%. camt.054 сетлмент після Triple Verification." },
      { n: "08", t: "Історія і продовжене навчання", d: "Кваліфікаційні бали, доступ до супервізорських кейсів." },
    ]}
    fields={[
      { k: "email", label: "Робочий email", type: "email", required: true },
      { k: "license", label: "Номер ліцензії / VC ID", required: true, placeholder: "did:fa:prov:XXXXX" },
      { k: "scope", label: "Область практики", placeholder: "CBT, EMDR, VR (Bravemind)" },
      { k: "pw", label: "Пароль", type: "password", required: true },
    ]}
    submitLabel="Увійти як фахівець"
    note="Верифікація займає 24-72 години. Після підтвердження ліцензії ви отримаєте доступ до потоку клієнтів."
  />
);

export default ProviderPage;
