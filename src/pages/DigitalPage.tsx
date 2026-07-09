import DirectionPageLayout from "@/components/DirectionPageLayout";
import { motion } from "framer-motion";

const layers = [
  {
    n: "01",
    t: "Охоплення та діагностування",
    b: "Перший контакт бенефіціара. Скринінг, маршрутизація, anonymous entry.",
  },
  {
    n: "02",
    t: "Операції",
    b: "Провайдер, сесії, погодинний облік і білінг, оцінювання впливу на симптоми (PCL-5/PHQ-9/GAD-7).",
  },
  {
    n: "03",
    t: "Дистрибуція ресурсів",
    b: "Оплата за результат: прямі платежі, змішане де-ризиковане співфінансування, escrow-рахунки, фінансове відстеження транзакцій → автоматичне звітування про цільове використання, прямий зворотній звʼязок бенефіціар-донор, аудит, аналітика, вплив на ВВП.",
  },
  {
    n: "04",
    t: "Координація",
    b: "Гуманітарних, державних і приватних акторів — через цифрову шину Feel Again.",
  },
];

const DigitalPage = () => (
  <DirectionPageLayout
    tag="01 · Цифровізація"
    title="Цифрове технологічне плече для сектору"
    lead="Цифровізація відносин і потоків даних, з супроводом єдиного шляху бенефіціар → клієнт → пацієнт. Леджер та деперсоніфікований реєстр як фундамент."
  >
    <section className="py-16 bg-transparent">
      <div className="section-container">
        <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-8">
          Шари digital bus
        </h2>
        <div className="grid md:grid-cols-2 gap-4">
          {layers.map((l, i) => (
            <motion.div
              key={l.n}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="card-elevated p-6"
            >
              <div className="font-mono text-xs text-accent mb-2">{l.n}</div>
              <div className="font-display text-lg font-bold text-foreground mb-2">{l.t}</div>
              <p className="text-sm text-secondary-foreground leading-relaxed">{l.b}</p>
            </motion.div>
          ))}
        </div>

        <div className="mt-10 grid md:grid-cols-2 gap-4">
          <a
            href="#"
            className="card-elevated p-5 border border-accent/30 hover:border-accent transition-colors"
          >
            <div className="text-xs uppercase tracking-widest text-accent font-mono mb-2">Інтерфейс</div>
            <div className="font-display text-base font-bold text-foreground">Шлях бенефіціара →</div>
            <p className="text-xs text-secondary-foreground mt-1">
              Інтерфейс бенефіціара — окрема сторінка (плейсхолдер).
            </p>
          </a>
          <a
            href="#"
            className="card-elevated p-5 border border-primary/30 hover:border-primary transition-colors"
          >
            <div className="text-xs uppercase tracking-widest text-primary font-mono mb-2">Інтерфейс</div>
            <div className="font-display text-base font-bold text-foreground">Інтерфейси користувачів →</div>
            <p className="text-xs text-secondary-foreground mt-1">
              Бенефіціар · фахівець · донор · регулятор (плейсхолдер).
            </p>
          </a>
        </div>
      </div>
    </section>
  </DirectionPageLayout>
);

export default DigitalPage;
