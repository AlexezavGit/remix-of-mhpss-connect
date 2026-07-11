import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { toast } from "@/hooks/use-toast";
import { usePageSections } from "@/context/PageNavContext";

const LoginPage = () => {
  usePageSections([
    { id: "login", label: "Вхід" },
    { id: "status", label: "Стан системи" },
  ]);

  const [id, setId] = useState("");
  const [pw, setPw] = useState("");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("[login:attempt]", { id });
    toast({
      title: "Доступ — за запрошенням",
      description: "Запросіть серійний номер через розділ «Демо», щоб отримати облікові дані.",
    });
  };

  return (
    <div className="min-h-screen flex items-stretch pt-32 pb-10" style={{ background: "var(--gradient-hero)" }}>
      <div className="section-container grid lg:grid-cols-[1fr_auto_1fr] gap-8 items-start">
        <aside id="status" className="hidden lg:block text-right space-y-6 pt-16 scroll-mt-32">
          <div>
            <div className="font-mono text-[9px] uppercase tracking-[0.22em] text-foreground/50">Система</div>
            <div className="font-display text-2xl text-foreground">Робоча</div>
            <div className="inline-flex items-center gap-1.5 mt-1">
              <span className="w-1.5 h-1.5 rounded-full bg-[hsl(var(--emerald,140_60%_45%))] animate-pulse" />
              <span className="font-mono text-[10px] uppercase tracking-widest text-foreground/60">Доступність 99,98%</span>
            </div>
          </div>
          <div>
            <div className="font-mono text-[9px] uppercase tracking-[0.22em] text-foreground/50">Регіон</div>
            <div className="font-display text-lg text-foreground">Центральна Європа · Північ України</div>
          </div>
          <div>
            <div className="font-mono text-[9px] uppercase tracking-[0.22em] text-foreground/50">Версія</div>
            <div className="font-mono text-sm text-foreground/80">v0.9.3 · збірка 20260707</div>
          </div>
        </aside>

        <motion.form
          id="login"
          onSubmit={submit}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="card-elevated w-full max-w-md p-8 border border-[hsl(var(--gold-bright)/0.3)] scroll-mt-32"
          style={{ minWidth: "min(24rem, 90vw)" }}
        >
          <div className="flex items-center gap-2 mb-6">
            <span className="w-2 h-2 rounded-full bg-[hsl(var(--emerald,140_60%_45%))] animate-pulse" />
            <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-foreground/60">Feel Again · Термінал</span>
          </div>
          <h1 className="font-display text-3xl font-bold text-foreground mb-1">Вхід у систему</h1>
          <p className="text-xs text-muted-foreground mb-6">Доступ — за запрошенням. Потрібен серійний номер.</p>

          <label className="block text-xs text-muted-foreground">
            <span className="font-mono uppercase tracking-[0.22em] text-[9px]">Логін або пошта</span>
            <input
              type="text"
              autoComplete="username"
              value={id}
              onChange={(e) => setId(e.target.value)}
              className="mt-1.5 w-full h-10 px-3 rounded-none border-b border-border bg-transparent text-sm text-foreground focus:outline-none focus:border-[hsl(var(--gold-bright))]"
              required
            />
          </label>
          <label className="block text-xs text-muted-foreground mt-5">
            <span className="font-mono uppercase tracking-[0.22em] text-[9px]">Пароль</span>
            <input
              type="password"
              autoComplete="current-password"
              value={pw}
              onChange={(e) => setPw(e.target.value)}
              className="mt-1.5 w-full h-10 px-3 rounded-none border-b border-border bg-transparent text-sm text-foreground focus:outline-none focus:border-[hsl(var(--gold-bright))]"
              required
            />
          </label>

          <button
            type="submit"
            className="mt-7 w-full h-11 bg-[hsl(var(--gold-bright))] text-background font-mono uppercase tracking-[0.22em] text-xs font-bold hover:opacity-90 transition-opacity"
          >
            Увійти
          </button>

          <div className="mt-6 pt-4 border-t border-border/50 flex items-center justify-between text-[10px] font-mono uppercase tracking-widest">
            <Link to="/demo" className="text-[hsl(var(--gold-bright))] hover:underline">
              Отримати серійний номер →
            </Link>
            <a
              href="https://dashboard.feelagain.me"
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground/50 hover:text-foreground"
            >
              Публічний дашборд ↗
            </a>
          </div>
        </motion.form>

        <aside className="hidden lg:block pt-16 space-y-6">
          <div>
            <div className="font-mono text-[9px] uppercase tracking-[0.22em] text-foreground/50">Сьогодні</div>
            <div className="font-display text-lg text-foreground">3,9 млн · 38% · 62%</div>
            <div className="font-mono text-[10px] text-foreground/50">потреба · покриття · розрив</div>
          </div>
          <div className="text-xs text-muted-foreground leading-relaxed max-w-[220px]">
            Термінал Feel Again відкриває доступ до ескроу-реєстрів, сигналів фахівців і
            оракулів результатів. Усі дії журналюються і атрибутуються.
          </div>
        </aside>
      </div>
    </div>
  );
};

export default LoginPage;
