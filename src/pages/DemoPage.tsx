import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { toast } from "@/hooks/use-toast";
import SiteFooter from "@/components/SiteFooter";
import { usePageSections } from "@/context/PageNavContext";

const faqs = [
  { q: "Скільки коштує державі?", a: "Нуль. Програма фінансується через дегресивну комісію 7→3% з обороту, який проходить через рейки." },
  { q: "Хто вже підписаний?", a: "НБУ Regulatory Sandbox, 38 банків через Хартію інклюзії, консорціум USC Viterbi · Clalit · KNU · Open Society · Enkidu · Quoroom." },
  { q: "Які терміни?", a: "Пілот Q2 2026 у пісочниці НБУ · ~200 тис. співробітників банків. Рік 3 — ціль 50–60 тис. практикуючих фахівців." },
  { q: "Що я побачу на демо?", a: "Живий Scoring Matrix на реальних анонімізованих даних, Golden Scenario, і як ваша роль вписується у три-квадрантну модель." },
];

const DemoPage = () => {
  usePageSections([
    { id: "request", label: "Запит демо" },
    { id: "see", label: "Що ви побачите" },
    { id: "faq", label: "FAQ" },
  ]);

  const [form, setForm] = useState({
    name: "",
    email: "",
    org: "",
    role: "",
    country: "Україна",
    interest: "Платіжна інфраструктура",
    notes: "",
    consent: false,
  });
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.consent) {
      toast({ title: "Потрібна згода на обробку даних", variant: "destructive" });
      return;
    }
    console.log("[demo:request]", form);
    toast({ title: "Запит надіслано", description: "Ми звʼяжемось із вами найближчим часом." });
    setForm({ ...form, name: "", email: "", org: "", role: "", notes: "", consent: false });
  };

  return (
    <div className="min-h-screen">
      <section id="request" className="pt-16 pb-14">
        <div className="section-container">
          <div className="grid lg:grid-cols-2 gap-10">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <span className="tag-fintech mb-3">Демо · Запит доступу</span>
              <h1 className="text-4xl md:text-5xl font-display font-bold mt-4 mb-4 tracking-tight text-foreground">
                Запросити демо Feel Again
              </h1>
              <p className="text-base text-secondary-foreground mb-8 max-w-lg">
                Живий обхід платформи для банкірів, донорів і клініцистів. 30 хвилин, під ваш сценарій,
                з реальними даними MHPSS-сектору України.
              </p>
              <div id="see" className="space-y-3 scroll-mt-32">
                <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-foreground/55">Що ви побачите</div>
                {[
                  { n: "01", t: "Платіжні рейки у дії", d: "Ескроу, потрійна верифікація, дегресивна ставка на живих транзакціях." },
                  { n: "02", t: "Scoring Matrix", d: "40% процес · 45% клінічне покращення · 15% повернення до функціонування." },
                  { n: "03", t: "Зворотний водоспад", d: "Від громади до глобального донора — з прозорістю на кожному рівні." },
                  { n: "04", t: "Ваша роль", d: "Як конкретна організація вписується у три-квадрантну модель." },
                ].map((x) => (
                  <div key={x.n} className="flex gap-3 p-3 rounded-lg border border-border/60 bg-card/40">
                    <div className="font-mono text-xs text-[hsl(var(--gold-bright))] shrink-0">{x.n}</div>
                    <div>
                      <div className="font-display text-sm font-bold text-foreground">{x.t}</div>
                      <div className="text-xs text-secondary-foreground">{x.d}</div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.form
              onSubmit={submit}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="card-elevated p-6 md:p-8 h-fit lg:sticky lg:top-56"
            >
              <div className="grid grid-cols-2 gap-3">
                {[
                  { k: "name", label: "Імʼя та прізвище*", type: "text" },
                  { k: "email", label: "Робоча пошта*", type: "email" },
                  { k: "org", label: "Організація*", type: "text" },
                  { k: "role", label: "Посада", type: "text" },
                  { k: "country", label: "Країна", type: "text" },
                ].map((f) => (
                  <label key={f.k} className={`text-xs text-muted-foreground ${f.k === "email" || f.k === "name" ? "col-span-2" : ""}`}>
                    <span className="font-mono uppercase tracking-widest text-[9px]">{f.label}</span>
                    <input
                      required={f.label.endsWith("*")}
                      type={f.type}
                      value={(form as Record<string, string | boolean>)[f.k] as string}
                      onChange={(e) => setForm({ ...form, [f.k]: e.target.value })}
                      className="mt-1 w-full h-9 px-3 rounded-md bg-background border border-border text-sm text-foreground focus:outline-none focus:border-[hsl(var(--gold-bright))]"
                    />
                  </label>
                ))}
                <label className="col-span-2 text-xs text-muted-foreground">
                  <span className="font-mono uppercase tracking-widest text-[9px]">Інтерес</span>
                  <select
                    value={form.interest}
                    onChange={(e) => setForm({ ...form, interest: e.target.value })}
                    className="mt-1 w-full h-9 px-3 rounded-md bg-background border border-border text-sm text-foreground focus:outline-none focus:border-[hsl(var(--gold-bright))]"
                  >
                    <option>Платіжна інфраструктура</option>
                    <option>Цифрова підзвітність</option>
                    <option>Цифрова практика</option>
                    <option>Партнерство у консорціумі</option>
                  </select>
                </label>
                <label className="col-span-2 text-xs text-muted-foreground">
                  <span className="font-mono uppercase tracking-widest text-[9px]">Коментар</span>
                  <textarea
                    value={form.notes}
                    onChange={(e) => setForm({ ...form, notes: e.target.value })}
                    rows={3}
                    className="mt-1 w-full px-3 py-2 rounded-md bg-background border border-border text-sm text-foreground focus:outline-none focus:border-[hsl(var(--gold-bright))]"
                  />
                </label>
                <label className="col-span-2 flex gap-2 items-start text-xs text-muted-foreground mt-1">
                  <input
                    type="checkbox"
                    checked={form.consent}
                    onChange={(e) => setForm({ ...form, consent: e.target.checked })}
                    className="mt-0.5"
                  />
                  <span>Я погоджуюсь на обробку моїх даних Feel Again для цілей комунікації щодо демо.</span>
                </label>
              </div>
              <button
                type="submit"
                className="mt-5 w-full h-11 rounded-md bg-[hsl(var(--gold-bright))] text-background font-mono uppercase tracking-[0.22em] text-xs font-bold hover:opacity-90 transition-opacity"
              >
                Надіслати запит →
              </button>
              <p className="mt-3 text-[10px] text-muted-foreground text-center">
                Вже маєте доступ? <Link to="/users" className="text-[hsl(var(--gold-bright))] hover:underline">Кабінети користувачів →</Link>
              </p>
            </motion.form>
          </div>
        </div>
      </section>

      <section id="faq" className="py-16 bg-transparent scroll-mt-32">
        <div className="section-container max-w-3xl">
          <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-6">Часті питання</h2>
          <div className="space-y-2">
            {faqs.map((f, i) => (
              <div key={i} className="card-elevated overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between p-5 text-left"
                >
                  <span className="font-display text-base font-bold text-foreground">{f.q}</span>
                  <span className="text-[hsl(var(--gold-bright))] font-mono">{openFaq === i ? "−" : "+"}</span>
                </button>
                {openFaq === i && (
                  <div className="px-5 pb-5 text-sm text-secondary-foreground border-t border-border/40 pt-3">
                    {f.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="offer-link" className="py-12">
        <div className="section-container text-center">
          <p className="text-secondary-foreground mb-4">Готові працювати разом, а не лише подивитися?</p>
          <Link to="/offer" className="tag-gold hover:bg-[hsl(var(--gold)/0.2)] transition-colors">
            Відкрита оферта імплементаційного партнера →
          </Link>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
};

export default DemoPage;
