import { ReactNode, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { toast } from "@/hooks/use-toast";
import SiteFooter from "@/components/SiteFooter";

export type CabinetField = {
  k: string;
  label: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
  helper?: string;
};

type Props = {
  tag: string;
  title: string;
  lead: string;
  tone: "accent" | "primary" | "gold";
  /** Ordered journey steps that will happen after sign-in. */
  journey: { n: string; t: string; d: string }[];
  fields: CabinetField[];
  submitLabel: string;
  /** Optional footnote below form. */
  note?: ReactNode;
};

const toneMap = {
  accent: { border: "border-accent/40", text: "text-accent", dot: "bg-accent", ring: "focus:border-accent" },
  primary: { border: "border-primary/40", text: "text-primary", dot: "bg-primary", ring: "focus:border-primary" },
  gold: {
    border: "border-[hsl(var(--gold)/0.45)]",
    text: "text-[hsl(var(--gold-bright))]",
    dot: "bg-[hsl(var(--gold-bright))]",
    ring: "focus:border-[hsl(var(--gold-bright))]",
  },
};

const CabinetLayout = ({ tag, title, lead, tone, journey, fields, submitLabel, note }: Props) => {
  const t = toneMap[tone];
  const [values, setValues] = useState<Record<string, string>>({});

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("[cabinet:submit]", { title, values });
    toast({
      title: "Доступ у розробці",
      description: "Кабінети зʼявляться після MVP. Ми записали ваш запит і повернемось.",
    });
  };

  return (
    <div className="min-h-screen">
      <section className="pt-16 pb-8">
        <div className="section-container">
          <Link to="/users" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
            ← До квест-мапи
          </Link>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mt-4 max-w-3xl">
            <span className={`inline-flex items-center px-3 py-1 rounded-full text-[11px] font-mono uppercase tracking-widest border ${t.border} ${t.text}`}>
              {tag}
            </span>
            <h1 className="text-3xl md:text-5xl font-display font-bold mt-4 mb-4 tracking-tight text-foreground">
              {title}
            </h1>
            <p className="text-base md:text-lg text-secondary-foreground leading-relaxed">{lead}</p>
          </motion.div>
        </div>
      </section>

      <section className="py-6">
        <div className="section-container grid lg:grid-cols-[1.15fr_1fr] gap-8">
          {/* Journey */}
          <div>
            <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-foreground/55 mb-3">
              Що буде відбуватись покроково
            </div>
            <ol className="relative pl-6">
              <span aria-hidden className={`absolute left-2 top-2 bottom-2 w-px ${t.dot} opacity-40`} />
              {journey.map((s, i) => (
                <motion.li
                  key={s.n}
                  initial={{ opacity: 0, y: 8 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.04 }}
                  className="relative mb-3"
                >
                  <span aria-hidden className={`absolute -left-[18px] top-2.5 w-2.5 h-2.5 rounded-full ${t.dot} ring-2 ring-background`} />
                  <div className="card-elevated p-4">
                    <div className="flex items-baseline gap-3 mb-1">
                      <span className={`font-mono text-xs ${t.text}`}>{s.n}</span>
                      <span className="font-display text-sm font-bold text-foreground">{s.t}</span>
                    </div>
                    <p className="text-xs text-secondary-foreground leading-relaxed">{s.d}</p>
                  </div>
                </motion.li>
              ))}
            </ol>
          </div>

          {/* Sign in form */}
          <motion.form
            onSubmit={submit}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`card-elevated p-6 md:p-7 h-fit border ${t.border} lg:sticky lg:top-56`}
          >
            <div className="flex items-center gap-2 mb-4">
              <span className={`w-2 h-2 rounded-full ${t.dot} animate-pulse`} />
              <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-foreground/60">
                Feel Again · Terminal
              </span>
            </div>
            <h2 className="font-display text-2xl font-bold text-foreground mb-1">Sign in</h2>
            <p className="text-xs text-muted-foreground mb-5">
              Доступ — за запрошенням. Заповніть форму — ми відкриємо кабінет після MVP.
            </p>

            <div className="space-y-4">
              {fields.map((f) => (
                <label key={f.k} className="block text-xs text-muted-foreground">
                  <span className="font-mono uppercase tracking-[0.22em] text-[9px]">{f.label}</span>
                  <input
                    type={f.type || "text"}
                    placeholder={f.placeholder}
                    required={f.required}
                    value={values[f.k] || ""}
                    onChange={(e) => setValues({ ...values, [f.k]: e.target.value })}
                    className={`mt-1.5 w-full h-10 px-3 rounded-md bg-background border border-border text-sm text-foreground focus:outline-none ${t.ring}`}
                  />
                  {f.helper && <span className="block mt-1 text-[10px] text-foreground/45">{f.helper}</span>}
                </label>
              ))}
            </div>

            <button
              type="submit"
              className={`mt-6 w-full h-11 rounded-md ${tone === "gold" ? "bg-[hsl(var(--gold-bright))]" : tone === "primary" ? "bg-primary" : "bg-accent"} text-background font-mono uppercase tracking-[0.22em] text-xs font-bold hover:opacity-90 transition-opacity`}
            >
              {submitLabel}
            </button>

            {note && <div className="mt-4 text-[11px] text-muted-foreground leading-relaxed">{note}</div>}

            <div className="mt-5 pt-4 border-t border-border/50 flex items-center justify-between text-[10px] font-mono uppercase tracking-widest">
              <Link to="/demo" className={t.text + " hover:underline"}>
                Замовити демо →
              </Link>
              <a
                href="https://dashboard.feelagain.me"
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground/50 hover:text-foreground"
              >
                Public dashboard ↗
              </a>
            </div>
          </motion.form>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
};

export default CabinetLayout;
