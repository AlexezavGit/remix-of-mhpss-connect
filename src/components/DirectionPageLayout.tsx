import { ReactNode } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

import SiteFooter from "@/components/SiteFooter";
import { useT } from "@/i18n";

type Props = {
  tag: string;
  title: string;
  lead: string;
  children: ReactNode;
};

const DirectionPageLayout = ({ tag, title, lead, children }: Props) => {
  const { t } = useT();
  return (
    <div className="min-h-screen bg-background pt-32">
      <section
        className="pt-28 pb-12 relative overflow-hidden"
        style={{ background: "var(--gradient-hero)" }}
      >
        <div className="section-container relative z-10">
          <Link to="/" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
            ← {t("nav.directions")}
          </Link>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mt-4">
            <span className="tag-gold mb-3">{tag}</span>
            <h1 className="text-4xl md:text-6xl font-display font-bold mt-4 mb-5 text-foreground tracking-tight">
              {title}
            </h1>
            <p className="text-lg text-secondary-foreground max-w-3xl leading-relaxed">{lead}</p>
          </motion.div>
        </div>
      </section>
      {children}
      <SiteFooter />
    </div>
  );
};

export default DirectionPageLayout;
