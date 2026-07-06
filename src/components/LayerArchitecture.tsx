import { motion } from "framer-motion";

const layers = [
  {
    tag: "tag-fintech",
    tagLabel: "FinTech / Blended Finance",
    title: "Фінансовий шар",
    current: "Blended finance, P2P, крипто, спільнокошт (100 000 рахунків у Monobank 2025)",
    enhanced: "SIBs/DIBs, Results-Based Financing (GFF), EBRD mental health facility, корпоративна філантропія",
    projects: [
      "Проєкт з банківським сектором (EBRD-НБУ-38 банків, Хартія людського капіталу)",
      "Запуск P2P платежів + крипто-кампейн з ЮНІСЕФ",
      "Диверсифікація: соціальний договір → громадські + корпоративні + донорські + бюджетні ресурси",
      "Системний фонд: EBRD-НБУ-38 банків, юридичний базис створено",
    ],
  },
  {
    tag: "tag-digital",
    tagLabel: "Цифровізація",
    title: "Цифровий шар",
    current: "8-24 системи гуманітарного реагування, eHealth, дублювання",
    enhanced: "HL7 FHIR interoperability, API-first архітектура, DHIS2 для агрегованих даних, цифрова координація замість ручної WHO",
    projects: [
      "МІС + Хелсі інтеграція — опитування — чат-бот",
      "Цифрова координація програм фінансування від донорів",
      "Моніторінг даних та інтеграція з інформаційними системами",
      "Наскрізні показники до ВВП замість процесних KPI",
    ],
  },
  {
    tag: "tag-clinical",
    tagLabel: "Клінічний",
    title: "Шар психологічної допомоги",
    current: "EMDR (Geha), VR Bravemind (Skip Rizzo, USC ICT), mhGAP",
    enhanced: "Stepped care model, measurement-based care (PHQ-9, PCL-5), ізраїльський протокол 8-12 сеансів",
    projects: [
      "Тренінг Geha: адаптація EMDR з клінічним протоколом",
      "Адаптація Bravemind + тренінг Skip Rizzo",
      "Центр of Excellence в КНУ ім. Шевченка",
      "Перший регресний dataset за 10 років практики",
    ],
  },
  {
    tag: "tag-fintech",
    tagLabel: "Сталий розвиток",
    title: "Шар приватної практики",
    current: "~8 000 ФОП у тіні, 4 000 в UPRA, 120 мобільних бригад (12K осіб)",
    enhanced: "Franchise/network practice (як IAPT UK), quality assurance framework, paid clinical placements",
    projects: [
      "4 напрями: гуманітарний сектор, формалізована практика через API, діаспора, перекваліфікація психіатрів",
      "Тренінги для персоналу шпиталів та побратимів",
      "Regulatory sandbox + поетапна ліцензія (provisional → full)",
      "Податкові преференції на 5 років + приміщення для практики",
    ],
  },
  {
    tag: "tag-digital",
    tagLabel: "Дані та координація",
    title: "Шар даних",
    current: "Жодна система не зчеплює глобальний і локальний рівні, відсутнє фінансове відстеження",
    enhanced: "WHO HESPER methodology, DALY-based impact measurement, відкриті дані для координації",
    projects: [
      "Перший dataset наданих послуг (регресний, 10 років)",
      "Поточний dataset відкритих даних для координації",
      "Інтеграція з фінансовими системами акторів",
      "Наскрізні показники впливу на ВВП + народжуваність",
    ],
  },
  {
    tag: "tag-regulatory",
    tagLabel: "Регуляторний",
    title: "Шар регулювання",
    current: "Стик МОЗ × МінЕконом, відсутній мандат, фіскалізація",
    enhanced: "Regulatory sandbox (як у fintech), поетапна ліцензія, політики залучення фахівців",
    projects: [
      "Проєкт: податки — преференції на 5 років",
      "Проєкт: кредити на відновлення + ментальний добробут",
      "Проєкт: сертифікація фахівців",
      "Проєкт: співфінансування громадський + корпоративний + донорський + державний",
    ],
  },
];

const LayerArchitecture = () => {
  return (
    <section className="py-24 bg-transparent">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-16"
        >
          <span className="tag-fintech mb-4">Архітектура</span>
          <h2 className="text-3xl md:text-5xl font-display font-bold mt-4 mb-6 text-foreground">
            Шість шарів <span className="gold-gradient-text">стратегії</span>
          </h2>
          <p className="text-secondary-foreground max-w-2xl text-lg">
            Посилена архітектура з конкретними проєктами на кожному рівні.
          </p>
        </motion.div>

        <div className="space-y-6">
          {layers.map((layer, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="card-elevated p-6 md:p-8"
            >
              <div className="flex flex-col md:flex-row md:items-start gap-6">
                <div className="md:w-1/3">
                  <span className={layer.tag}>{layer.tagLabel}</span>
                  <h3 className="font-display text-xl font-semibold text-foreground mt-3 mb-2">{layer.title}</h3>
                  <div className="space-y-2">
                    <div>
                      <span className="text-xs text-muted-foreground uppercase tracking-wider">Поточний стан</span>
                      <p className="text-sm text-secondary-foreground mt-1">{layer.current}</p>
                    </div>
                    <div>
                      <span className="text-xs text-primary uppercase tracking-wider">Посилення</span>
                      <p className="text-sm text-foreground mt-1">{layer.enhanced}</p>
                    </div>
                  </div>
                </div>
                <div className="md:w-2/3 md:border-l md:border-border md:pl-6">
                  <span className="text-xs text-muted-foreground uppercase tracking-wider mb-3 block">Проєкти</span>
                  <div className="grid sm:grid-cols-2 gap-3">
                    {layer.projects.map((proj, j) => (
                      <div key={j} className="flex items-start gap-2 text-sm text-secondary-foreground">
                        <span className="text-primary mt-0.5 shrink-0">→</span>
                        <span>{proj}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LayerArchitecture;
