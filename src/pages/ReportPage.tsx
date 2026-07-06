import { useEffect } from "react";
import { Link } from "react-router-dom";

// Evidence Base / Report переїхав на дашборд.
// Залишаємо легкий редірект із посиланням.
const ReportPage = () => {
  useEffect(() => {
    const id = setTimeout(() => {
      window.location.href = "https://dashboard.feelagain.me";
    }, 1500);
    return () => clearTimeout(id);
  }, []);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-6">
      <div className="text-center max-w-md">
        <span className="w-2 h-2 rounded-full bg-primary inline-block mr-2 animate-pulse" />
        <span className="font-display font-bold text-sm text-foreground">FEEL AGAIN</span>
        <h1 className="font-display text-3xl text-foreground mt-6 mb-3">
          Evidence Report переїхав
        </h1>
        <p className="text-sm text-secondary-foreground mb-6">
          Повний звіт, цифри й гепи тепер живуть на{" "}
          <a
            href="https://dashboard.feelagain.me"
            className="text-accent hover:underline"
          >
            dashboard.feelagain.me
          </a>
          . Вас перенаправлено автоматично.
        </p>
        <Link
          to="/"
          className="text-xs text-muted-foreground hover:text-foreground"
        >
          ← На головну
        </Link>
      </div>
    </div>
  );
};

export default ReportPage;
