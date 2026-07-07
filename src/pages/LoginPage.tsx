import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { toast } from "@/hooks/use-toast";
import { usePageSections } from "@/context/PageNavContext";

const LoginPage = () => {
  usePageSections([
    { id: "login", label: "Sign in" },
    { id: "status", label: "System status" },
  ]);

  const [id, setId] = useState("");
  const [pw, setPw] = useState("");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("[login:attempt]", { id });
    toast({
      title: "Access is invitation-only",
      description: "Request a serial number via Demo to receive credentials.",
    });
  };

  return (
    <div className="min-h-screen flex items-stretch pt-32 pb-10" style={{ background: "var(--gradient-hero)" }}>
      <div className="section-container grid lg:grid-cols-[1fr_auto_1fr] gap-8 items-start">
        {/* Left: status column */}
        <aside id="status" className="hidden lg:block text-right space-y-6 pt-16 scroll-mt-32">
          <div>
            <div className="font-mono text-[9px] uppercase tracking-[0.22em] text-foreground/50">SYSTEM</div>
            <div className="font-display text-2xl text-foreground">Operational</div>
            <div className="inline-flex items-center gap-1.5 mt-1">
              <span className="w-1.5 h-1.5 rounded-full bg-[hsl(var(--emerald,140_60%_45%))] animate-pulse" />
              <span className="font-mono text-[10px] uppercase tracking-widest text-foreground/60">uptime 99.98%</span>
            </div>
          </div>
          <div>
            <div className="font-mono text-[9px] uppercase tracking-[0.22em] text-foreground/50">REGION</div>
            <div className="font-display text-lg text-foreground">EU-CENTRAL · UA-NORTH</div>
          </div>
          <div>
            <div className="font-mono text-[9px] uppercase tracking-[0.22em] text-foreground/50">VERSION</div>
            <div className="font-mono text-sm text-foreground/80">v0.9.3 · build 20260707</div>
          </div>
        </aside>

        {/* Center: terminal-style login card */}
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
            <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-foreground/60">Feel Again · Terminal</span>
          </div>
          <h1 className="font-display text-3xl font-bold text-foreground mb-1">Sign in</h1>
          <p className="text-xs text-muted-foreground mb-6">Access is invitation-only. Serial number required.</p>

          <label className="block text-xs text-muted-foreground">
            <span className="font-mono uppercase tracking-[0.22em] text-[9px]">Login ID / Email</span>
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
            <span className="font-mono uppercase tracking-[0.22em] text-[9px]">Password</span>
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
            {"<Go>"}
          </button>

          <div className="mt-6 pt-4 border-t border-border/50 flex items-center justify-between text-[10px] font-mono uppercase tracking-widest">
            <Link to="/demo" className="text-[hsl(var(--gold-bright))] hover:underline">
              Create Serial Number →
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

        <aside className="hidden lg:block pt-16 space-y-6">
          <div>
            <div className="font-mono text-[9px] uppercase tracking-[0.22em] text-foreground/50">TODAY</div>
            <div className="font-display text-lg text-foreground">3.9M · 38% · 62%</div>
            <div className="font-mono text-[10px] text-foreground/50">need · coverage · gap</div>
          </div>
          <div className="text-xs text-muted-foreground leading-relaxed max-w-[220px]">
            The Feel Again terminal exposes escrow ledgers, provider signals and outcome
            oracles. All actions are audit-logged and attributable.
          </div>
        </aside>
      </div>
    </div>
  );
};

export default LoginPage;
