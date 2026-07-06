import { motion } from "framer-motion";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, PieChart, Pie } from "recharts";

const resourceData = [
  { name: "Спільнокошт\n(P2P)", value: 200, fill: "hsl(42, 85%, 55%)" },
  { name: "Корпоративна\nфілантропія", value: 350, fill: "hsl(42, 70%, 45%)" },
  { name: "Обласні\nбюджети", value: 400, fill: "hsl(200, 60%, 45%)" },
  { name: "Кредити на\nвідновлення", value: 500, fill: "hsl(175, 50%, 40%)" },
  { name: "Бюджетне\nспівфінансування", value: 600, fill: "hsl(155, 55%, 40%)" },
  { name: "Системний\nфонд EBRD", value: 800, fill: "hsl(42, 85%, 55%)" },
  { name: "Донорські\nресурси", value: 700, fill: "hsl(200, 60%, 45%)" },
  { name: "SIBs/DIBs", value: 450, fill: "hsl(175, 50%, 40%)" },
];

const allocationData = [
  { name: "Диспансери (поточно)", value: 89, fill: "hsl(0, 50%, 40%)" },
  { name: "Приватна практика", value: 5, fill: "hsl(42, 85%, 55%)" },
  { name: "Мобільні бригади", value: 4, fill: "hsl(200, 60%, 45%)" },
  { name: "Інше", value: 2, fill: "hsl(220, 10%, 35%)" },
];

const targetData = [
  { name: "Приватна практика", value: 40, fill: "hsl(42, 85%, 55%)" },
  { name: "Клінічні центри", value: 25, fill: "hsl(155, 55%, 40%)" },
  { name: "Мобільні бригади", value: 15, fill: "hsl(200, 60%, 45%)" },
  { name: "Цифрова інфра", value: 10, fill: "hsl(175, 50%, 40%)" },
  { name: "Диспансери", value: 10, fill: "hsl(220, 15%, 30%)" },
];

const benchmarks = [
  { model: "USAID/PACT", cost: "$36-60/бенеф.", source: "Gold standard" },
  { model: "Міжнародні орг.", cost: "$117+/бенеф.", source: "30% overhead" },
  { model: "FEEL Again", cost: "7→3% fee", source: "vs 30%+ overhead" },
];

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload?.[0]) {
    return (
      <div className="card-elevated px-3 py-2 text-xs">
        <span className="text-foreground">{payload[0].payload.name}: </span>
        <span className="stat-number">${payload[0].value}M</span>
      </div>
    );
  }
  return null;
};

const FinancialModel = () => {
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
          <span className="tag-fintech mb-4">Фінансова модель</span>
          <h2 className="text-3xl md:text-5xl font-display font-bold mt-4 mb-6 text-foreground">
            Ресурсний <span className="gold-gradient-text">потік</span>
          </h2>
          <p className="text-secondary-foreground max-w-2xl text-lg">
            $2.5-4.5B необхідно для 50M годин терапії. WHO ROI: <span className="text-primary font-medium">$4 на кожен $1</span> інвестицій в MH.
          </p>
        </motion.div>

        {/* Key formula */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="card-elevated p-8 mb-12 text-center"
        >
          <div className="font-mono text-sm text-muted-foreground mb-3">Базова формула</div>
          <div className="text-2xl md:text-3xl font-mono">
            <span className="text-primary">3.9M</span>
            <span className="text-muted-foreground"> осіб × </span>
            <span className="text-accent">12-20</span>
            <span className="text-muted-foreground"> сеансів × </span>
            <span className="text-emerald">$70</span>
            <span className="text-muted-foreground"> = </span>
            <span className="gold-gradient-text font-bold">$2.5-4.5B</span>
          </div>
          <div className="text-sm text-muted-foreground mt-3">
            $70/год — стратегічна ціна (70% від EU-чека). Pull price для рекрутингу з тіні та репатріації діаспори.
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Resource mobilization chart */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="card-elevated p-6"
          >
            <h3 className="font-display text-lg font-semibold text-foreground mb-1">Мобілізація ресурсів</h3>
            <p className="text-xs text-muted-foreground mb-6">Диверсифіковані джерела, $M</p>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={resourceData} layout="vertical" margin={{ left: 10, right: 20 }}>
                  <XAxis type="number" tick={{ fill: 'hsl(220, 10%, 55%)', fontSize: 11 }} axisLine={false} tickLine={false} />
                  <YAxis type="category" dataKey="name" tick={{ fill: 'hsl(40, 20%, 92%)', fontSize: 10 }} axisLine={false} tickLine={false} width={85} />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar dataKey="value" radius={[0, 4, 4, 0]}>
                    {resourceData.map((entry, index) => (
                      <Cell key={index} fill={entry.fill} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* Allocation shift */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="card-elevated p-6"
          >
            <h3 className="font-display text-lg font-semibold text-foreground mb-1">Зсув алокації ресурсів</h3>
            <p className="text-xs text-muted-foreground mb-6">Поточний стан → Цільова модель</p>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-center text-muted-foreground mb-2">Зараз</p>
                <div className="h-[220px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie data={allocationData} cx="50%" cy="50%" innerRadius={40} outerRadius={80} dataKey="value" strokeWidth={0}>
                        {allocationData.map((entry, i) => <Cell key={i} fill={entry.fill} />)}
                      </Pie>
                      <Tooltip formatter={(v: number) => `${v}%`} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="space-y-1 mt-2">
                  {allocationData.map((d, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs">
                      <span className="w-2 h-2 rounded-full shrink-0" style={{ background: d.fill }} />
                      <span className="text-secondary-foreground">{d.name} {d.value}%</span>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-xs text-center text-primary mb-2">Ціль</p>
                <div className="h-[220px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie data={targetData} cx="50%" cy="50%" innerRadius={40} outerRadius={80} dataKey="value" strokeWidth={0}>
                        {targetData.map((entry, i) => <Cell key={i} fill={entry.fill} />)}
                      </Pie>
                      <Tooltip formatter={(v: number) => `${v}%`} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="space-y-1 mt-2">
                  {targetData.map((d, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs">
                      <span className="w-2 h-2 rounded-full shrink-0" style={{ background: d.fill }} />
                      <span className="text-secondary-foreground">{d.name} {d.value}%</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Cost-effectiveness benchmarks + comparisons */}
        <div className="grid md:grid-cols-3 gap-4 mt-8">
          {benchmarks.map((b, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="card-elevated p-5 text-center"
            >
              <div className="stat-number text-2xl mb-1">{b.cost}</div>
              <div className="text-sm font-semibold text-foreground mb-1">{b.model}</div>
              <div className="text-xs text-muted-foreground">{b.source}</div>
            </motion.div>
          ))}
        </div>

        <div className="grid md:grid-cols-3 gap-4 mt-4">
          {[
            { label: "NHS England IAPT", value: "£2.4B/рік", sub: "1.2M пацієнтів/рік, конверсія 60-70%" },
            { label: "ВВП внесок (Європа)", value: "4-5%", sub: "$8B у бюджеті України 2021" },
            { label: "WHO ROI", value: "$4:$1", sub: "на кожен $1 інвестицій в MH" },
          ].map((c, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="card-elevated p-5 text-center"
            >
              <div className="stat-number text-2xl mb-1">{c.value}</div>
              <div className="text-sm font-semibold text-foreground mb-1">{c.label}</div>
              <div className="text-xs text-muted-foreground">{c.sub}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FinancialModel;
