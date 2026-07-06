import { useT } from "@/i18n";
import { useTheme } from "@/theme/ThemeProvider";

export const LanguageToggle = () => {
  const { lang, setLang } = useT();
  return (
    <button
      onClick={() => setLang(lang === "ua" ? "en" : "ua")}
      className="px-2.5 py-1 text-[10px] font-mono font-bold rounded border border-border text-muted-foreground hover:text-foreground hover:border-foreground/40 transition-colors uppercase"
      aria-label="Toggle language"
    >
      {lang === "ua" ? "EN" : "UA"}
    </button>
  );
};

export const ThemeToggle = () => {
  const { theme, toggle } = useTheme();
  return (
    <button
      onClick={toggle}
      className="px-2.5 py-1 text-[11px] rounded border border-border text-muted-foreground hover:text-foreground hover:border-foreground/40 transition-colors"
      aria-label="Toggle theme"
    >
      {theme === "dark" ? "☀" : "☾"}
    </button>
  );
};
