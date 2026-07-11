import { motion } from "framer-motion";

const steps = [
  { id: "input", label: "Ресурси", detail: "Blended Finance, SIBs/DIBs, P2P, крипто, EBRD, бюджет", color: "primary" },
  { id: "platform", label: "Цифрова платформа", detail: "API-first координація, HL7 FHIR, інтеграція eHealth + DHIS2", color: "accent" },
  { id: "workforce", label: "Сертифіковані фахівці", detail: "50-60K у приватній практиці, franchise-модель, paid placements", color: "emerald" },
  { id: "treatment", label: "Курси реабілітації", detail: "EMDR (6-12 сеансів), VR Bravemind (6-12), ~90% завершуваність", color: "teal" },
  { id: "outcome", label: "Зниження PTSD", detail: "PCL-5 scores, PHQ-9, measurement-based care на кожному сеансі", color: "accent" },
  { id: "employment", label: "Повернення до зайнятості", detail: "Соціально-економічна реінтеграція, зниження DALY", color: "emerald" },
  { id: "impact", label: "Вплив на ВВП", detail: "$2.5-4.5B, 4-5% ВВП як у Європі, зростання народжуваності", color: "primary" },
];

const TheoryOfChange = () => {
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
          <span className="tag-digital mb-4">Теорія змін</span>
          <h2 className="text-3xl md:text-5xl font-display font-bold mt-4 mb-6 text-foreground">
            Ланцюг <span className="gold-gradient-text">трансформації</span>
          </h2>
          <p className="text-secondary-foreground max-w-2xl text-lg">
            Input → Activity → Output → Outcome → Impact. Чітка логіка для донорів USAID, GFF, World Bank.
          </p>
        </motion.div>

        <div className="relative">
          {/* Connection line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-border md:-translate-x-px" />

          <div className="space-y-8">
            {steps.map((step, i) => {
              const isLeft = i % 2 === 0;
              const colorMap: Record<string, string> = {
                primary: "border-primary/40 bg-primary/5",
                accent: "border-accent/40 bg-accent/5",
                emerald: "border-emerald/40 bg-emerald/5",
                teal: "border-teal/40 bg-teal/5",
              };
              const dotColor: Record<string, string> = {
                primary: "bg-primary",
                accent: "bg-accent",
                emerald: "bg-emerald",
                teal: "bg-teal",
              };

              return (
                <motion.div
                  key={step.id}
                  initial={{ opacity: 0, x: isLeft ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                  className={`relative flex items-center ${isLeft ? 'md:flex-row' : 'md:flex-row-reverse'} ml-16 md:ml-0`}
                >
                  {/* Dot on line */}
                  <div className={`absolute left-[-2.25rem] md:left-1/2 md:-translate-x-1/2 w-4 h-4 rounded-full ${dotColor[step.color]} ring-4 ring-background z-10`} />

                  <div className={`md:w-1/2 ${isLeft ? 'md:pr-12 md:text-right' : 'md:pl-12'}`}>
                    <div className={`inline-block border rounded-lg p-5 ${colorMap[step.color]}`}>
                      <div className="text-xs text-muted-foreground mb-1 font-mono">
                        {String(i + 1).padStart(2, '0')}
                      </div>
                      <h3 className="font-display text-xl font-semibold text-foreground mb-2">{step.label}</h3>
                      <p className="text-sm text-secondary-foreground">{step.detail}</p>
                    </div>
                  </div>

                  <div className="hidden md:block md:w-1/2" />
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TheoryOfChange;
