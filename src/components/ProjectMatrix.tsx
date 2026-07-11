import { motion } from "framer-motion";
import { useState } from "react";

type Priority = "quick-win" | "strategic" | "foundation";

interface Project {
  name: string;
  layer: string;
  tag: string;
  impact: number;
  feasibility: number;
  priority: Priority;
  timeline: string;
  description: string;
}

const projects: Project[] = [
  { name: "Проєкт з банківським сектором", layer: "FinTech", tag: "tag-fintech", impact: 9, feasibility: 8, priority: "quick-win", timeline: "Q1-Q2", description: "EBRD-НБУ-38 банків, Хартія підписана, CSR розвинений, VR кімнати відпочинку" },
  { name: "P2P платежі + крипто-кампейн", layer: "FinTech", tag: "tag-fintech", impact: 7, feasibility: 7, priority: "quick-win", timeline: "Q1-Q3", description: "Партнерство з ЮНІСЕФ, Monobank інфраструктура" },
  { name: "Перший dataset 10 років", layer: "Дані", tag: "tag-digital", impact: 8, feasibility: 6, priority: "quick-win", timeline: "Q1-Q2", description: "Регресний аналіз приватної практики, база для evidence-based рішень" },
  { name: "Адаптація EMDR (Geha)", layer: "Клінічний", tag: "tag-clinical", impact: 9, feasibility: 7, priority: "quick-win", timeline: "Q1-Q3", description: "Ізраїльський протокол 8-12 сеансів, низька рецидивність" },
  { name: "VR Bravemind (Skip Rizzo)", layer: "Клінічний", tag: "tag-clinical", impact: 9, feasibility: 6, priority: "quick-win", timeline: "Q2-Q4", description: "USC ICT, 6-12 сеансів, ~90% завершуваність" },
  { name: "Центр of Excellence КНУ", layer: "Клінічний", tag: "tag-clinical", impact: 10, feasibility: 5, priority: "strategic", timeline: "Q2-Q4+", description: "Методологія оцінки впливу на ВВП, аналіз dataset, дистанційне підвищення кваліфікації" },
  { name: "Цифрова координація", layer: "Цифровий", tag: "tag-digital", impact: 10, feasibility: 4, priority: "strategic", timeline: "Q3-Q4+", description: "API-first, HL7 FHIR, інтеграція eHealth + гуманітарних систем" },
  { name: "Regulatory sandbox", layer: "Регуляторний", tag: "tag-regulatory", impact: 8, feasibility: 4, priority: "strategic", timeline: "Q3+", description: "Поетапна ліцензія, податкові преференції 5 років" },
  { name: "Системний фонд EBRD", layer: "FinTech", tag: "tag-fintech", impact: 10, feasibility: 5, priority: "strategic", timeline: "Q2-Q4", description: "Фондування EBRD-НБУ-38 банків, де-ризикування для бюджету" },
  { name: "Franchise-модель практики", layer: "Сталий розвиток", tag: "tag-fintech", impact: 9, feasibility: 4, priority: "foundation", timeline: "Q4+", description: "Як IAPT providers у UK, quality assurance framework" },
  { name: "SIBs/DIBs інструменти", layer: "FinTech", tag: "tag-fintech", impact: 8, feasibility: 3, priority: "foundation", timeline: "Рік 2+", description: "Social/Development Impact Bonds, повернення при досягненні KPI" },
  { name: "Наскрізні показники → ВВП", layer: "Дані", tag: "tag-digital", impact: 10, feasibility: 3, priority: "foundation", timeline: "Рік 2+", description: "DALY averted, повернення до зайнятості, народжуваність" },
];

const priorityLabels: Record<Priority, { label: string; color: string }> = {
  "quick-win": { label: "Quick Win (Рік 1)", color: "bg-primary/20 text-primary border-primary/30" },
  "strategic": { label: "Стратегічний (Рік 1-2)", color: "bg-accent/20 text-accent border-accent/30" },
  "foundation": { label: "Фундаментальний (Рік 2+)", color: "bg-emerald/20 text-emerald border-emerald/30" },
};

const ProjectMatrix = () => {
  const [filter, setFilter] = useState<Priority | "all">("all");

  const filtered = filter === "all" ? projects : projects.filter(p => p.priority === filter);

  return (
    <section className="py-24 bg-transparent">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <span className="tag-clinical mb-4">Матриця пріоритизації</span>
          <h2 className="text-3xl md:text-5xl font-display font-bold mt-4 mb-6 text-foreground">
            Проєкти: <span className="gold-gradient-text">вплив × здійсненність</span>
          </h2>
        </motion.div>

        {/* Filters */}
        <div className="flex flex-wrap gap-3 mb-8">
          <button
            onClick={() => setFilter("all")}
            className={`px-4 py-2 rounded-full text-sm border transition-colors ${filter === "all" ? "bg-primary/10 text-primary border-primary/30" : "text-muted-foreground border-border hover:border-primary/20"}`}
          >
            Всі ({projects.length})
          </button>
          {(Object.keys(priorityLabels) as Priority[]).map(p => (
            <button
              key={p}
              onClick={() => setFilter(p)}
              className={`px-4 py-2 rounded-full text-sm border transition-colors ${filter === p ? priorityLabels[p].color : "text-muted-foreground border-border hover:border-primary/20"}`}
            >
              {priorityLabels[p].label} ({projects.filter(pr => pr.priority === p).length})
            </button>
          ))}
        </div>

        {/* Project cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((proj, i) => (
            <motion.div
              key={proj.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="card-elevated p-5 hover:border-primary/20 transition-colors"
            >
              <div className="flex items-start justify-between mb-3">
                <span className={proj.tag}>{proj.layer}</span>
                <span className="font-mono text-xs text-muted-foreground">{proj.timeline}</span>
              </div>
              <h3 className="font-display text-base font-semibold text-foreground mb-2">{proj.name}</h3>
              <p className="text-xs text-secondary-foreground mb-4 leading-relaxed">{proj.description}</p>
              <div className="flex items-center gap-4">
                <div className="flex-1">
                  <div className="text-[10px] text-muted-foreground uppercase tracking-wider mb-1">Вплив</div>
                  <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                    <div className="h-full bg-primary rounded-full" style={{ width: `${proj.impact * 10}%` }} />
                  </div>
                </div>
                <div className="flex-1">
                  <div className="text-[10px] text-muted-foreground uppercase tracking-wider mb-1">Здійсненність</div>
                  <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                    <div className="h-full bg-accent rounded-full" style={{ width: `${proj.feasibility * 10}%` }} />
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

export default ProjectMatrix;
