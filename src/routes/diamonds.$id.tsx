import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import {
  ArrowLeft,
  ArrowUpRight,
  BadgeCheck,
  Gem,
  Maximize2,
  Ruler,
  ShieldCheck,
  Sparkles,
  Truck,
} from "lucide-react";
import { motion } from "motion/react";
import { DIAMONDS, formatPrice, getDiamond } from "@/lib/diamonds";
import { Reveal } from "@/components/site/Motion";

export const Route = createFileRoute("/diamonds/$id")({
  loader: ({ params }) => {
    const diamond = getDiamond(params.id);
    if (!diamond) throw notFound();
    return { diamond };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [
          { title: "Diamond Not Found | Navkar Gems" },
          { name: "robots", content: "noindex" },
        ],
      };
    }
    const d = loaderData.diamond;
    const title = `${d.carat.toFixed(2)}ct ${d.shape} ${d.color} ${d.clarity} Lab Diamond | Navkar Gems`;
    const description = `${d.lab} certified ${d.type} lab-grown ${d.shape.toLowerCase()} diamond, ${d.carat.toFixed(2)} carat, ${d.color} colour, ${d.clarity} clarity. View in interactive 360°.`;
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "product" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  notFoundComponent: DiamondNotFound,
  component: DiamondDetail,
});

function DiamondNotFound() {
  return (
    <div className="px-6 py-40 text-center">
      <h1 className="heading-xl text-3xl">Diamond Unavailable</h1>
      <p className="mt-4 text-sm text-muted-foreground">
        This stone may have been sold. Browse our current inventory.
      </p>
      <Link
        to="/diamonds"
        className="mt-8 inline-block rounded-full bg-primary px-7 py-3 text-sm font-medium text-primary-foreground"
      >
        Back to Diamond Search
      </Link>
    </div>
  );
}

const ease = [0.22, 1, 0.36, 1] as const;

function DiamondDetail() {
  const { diamond: d } = Route.useLoaderData();

  const headline: [string, string][] = [
    ["Carat", d.carat.toFixed(2)],
    ["Colour", d.color],
    ["Clarity", d.clarity],
    ["Cut", d.cut],
  ];

  const finish: [string, string][] = [
    ["Polish", d.polish],
    ["Symmetry", d.symmetry],
    ["Fluorescence", d.fluorescence],
    ["Table", `${d.table}%`],
    ["Depth", `${d.depth}%`],
    ["Shape", d.shape],
  ];

  const others = DIAMONDS.filter((x) => x.id !== d.id);

  return (
    <div className="relative overflow-hidden pb-28 pt-28">
      {/* ambient light */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-[620px] opacity-70"
        style={{
          background:
            "radial-gradient(60% 70% at 50% 0%, color-mix(in oklab, var(--gold) 14%, transparent), transparent 70%)",
        }}
      />

      <div className="relative mx-auto max-w-[1320px] px-6">
        <Link
          to="/diamonds"
          className="group inline-flex items-center gap-2 text-[0.68rem] uppercase tracking-[0.22em] text-muted-foreground transition-colors hover:text-gold"
        >
          <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-1" />
          Back to Diamond Search
        </Link>

        <div className="mt-10 grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:gap-16">
          {/* Viewer — sticky */}
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease }}
            className="lg:sticky lg:top-28 lg:self-start"
          >
            <div className="lux-panel lux-shadow p-3 sm:p-4">
              <div className="relative aspect-square w-full overflow-hidden rounded-[calc(var(--radius)+4px)] bg-secondary">
                <iframe
                  src={d.view360}
                  title={`${d.carat.toFixed(2)}ct ${d.shape} interactive 360 view`}
                  className="h-full w-full border-0"
                  allowFullScreen
                />
                <span className="pointer-events-none absolute left-4 top-4 rounded-full border border-gold/30 bg-background/70 px-3 py-1 text-[0.6rem] uppercase tracking-[0.2em] text-gold backdrop-blur">
                  Live 360°
                </span>
                <a
                  href={d.view360}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Open full-screen 360 viewer"
                  className="absolute right-4 top-4 rounded-full border border-border bg-background/70 p-2 text-foreground/80 backdrop-blur transition-colors hover:border-gold/50 hover:text-gold"
                >
                  <Maximize2 className="h-4 w-4" />
                </a>
              </div>

              <div className="mt-4 flex items-center justify-between gap-4 px-1 pb-1">
                <p className="text-[0.68rem] uppercase tracking-[0.18em] text-muted-foreground">
                  Drag to rotate · this exact stone
                </p>
                <p className="text-[0.68rem] uppercase tracking-[0.18em] text-gold">
                  {d.lab} {d.report}
                </p>
              </div>
            </div>

            <div className="mt-4 grid grid-cols-3 gap-3">
              {[
                { icon: Gem, label: "Grown in Surat" },
                { icon: ShieldCheck, label: "Fully certified" },
                { icon: Truck, label: "Insured shipping" },
              ].map(({ icon: Icon, label }) => (
                <div
                  key={label}
                  className="spec-tile flex flex-col items-center gap-2 px-2 py-4 text-center hover:-translate-y-0.5 hover:border-gold/35"
                >
                  <Icon className="h-4 w-4 text-gold" />
                  <span className="text-[0.66rem] uppercase tracking-[0.14em] text-muted-foreground">
                    {label}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Details */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease, delay: 0.1 }}
            >
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-gold/30 px-3 py-1 text-[0.6rem] uppercase tracking-[0.2em] text-gold">
                  <Sparkles className="h-3 w-3" /> {d.type} Grown
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-full border border-border px-3 py-1 text-[0.6rem] uppercase tracking-[0.2em] text-muted-foreground">
                  <BadgeCheck className="h-3 w-3" /> {d.lab} Certified
                </span>
              </div>

              <h1 className="heading-xl mt-6 text-[2.1rem] leading-[1.03] sm:text-[2.9rem]">
                {d.carat.toFixed(2)} Carat{" "}
                <span className="text-gradient-gold">{d.shape}</span>
                <br />
                Lab-Grown Diamond
              </h1>

              <div className="gold-rule mt-6 w-40" />

              <div className="mt-6 flex flex-wrap items-end gap-x-6 gap-y-2">
                <p className="text-4xl font-semibold tracking-tight">
                  {formatPrice(d.price)}
                </p>
                <p className="pb-1 text-xs uppercase tracking-[0.16em] text-muted-foreground">
                  Trade pricing · duties excluded
                </p>
              </div>
            </motion.div>

            {/* Headline specs as tiles */}
            <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {headline.map(([k, v], i) => (
                <motion.div
                  key={k}
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, ease, delay: 0.2 + i * 0.07 }}
                  className="spec-tile px-4 py-5 hover:-translate-y-0.5 hover:border-gold/35"
                >
                  <p className="text-[0.6rem] uppercase tracking-[0.2em] text-muted-foreground">
                    {k}
                  </p>
                  <p className="mt-2 text-xl font-semibold">{v}</p>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease, delay: 0.45 }}
              className="mt-8 flex flex-wrap gap-3"
            >
              <Link
                to="/contact"
                className="group inline-flex items-center gap-2 rounded-full px-8 py-3.5 text-sm font-semibold text-background transition-transform hover:-translate-y-0.5"
                style={{ backgroundImage: "var(--gradient-gold)" }}
              >
                Enquire About This Diamond
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
              <a
                href={d.view360}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-border px-8 py-3.5 text-sm font-medium transition-colors hover:border-gold/45 hover:text-gold"
              >
                <Maximize2 className="h-4 w-4" /> Full-Screen 360°
              </a>
            </motion.div>

            {/* Finish & proportions */}
            <Reveal className="mt-12">
              <h2 className="text-[0.68rem] uppercase tracking-[0.24em] text-muted-foreground">
                Finish & Proportions
              </h2>
              <dl className="mt-5 grid grid-cols-2 gap-x-10 gap-y-0 sm:grid-cols-3">
                {finish.map(([k, v]) => (
                  <div
                    key={k}
                    className="flex items-baseline justify-between gap-4 border-b border-border py-3.5"
                  >
                    <dt className="text-xs uppercase tracking-[0.12em] text-muted-foreground">
                      {k}
                    </dt>
                    <dd className="text-sm font-semibold">{v}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>

            <Reveal className="mt-10">
              <div className="lux-panel grid gap-6 p-6 sm:grid-cols-2">
                <div className="flex gap-3">
                  <Ruler className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                  <div>
                    <p className="text-[0.62rem] uppercase tracking-[0.2em] text-muted-foreground">
                      Measurements
                    </p>
                    <p className="mt-1.5 text-sm font-semibold">
                      {d.measurements}
                    </p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <BadgeCheck className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                  <div>
                    <p className="text-[0.62rem] uppercase tracking-[0.2em] text-muted-foreground">
                      Certificate
                    </p>
                    <p className="mt-1.5 text-sm font-semibold">
                      {d.lab} · {d.report}
                    </p>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>

        {/* Similar diamonds */}
        <Reveal className="mt-28">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="eyebrow">More from the vault</p>
              <h2 className="heading-xl mt-3 text-2xl sm:text-3xl">
                Similar Diamonds
              </h2>
            </div>
            <Link
              to="/diamonds"
              className="inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.18em] text-muted-foreground transition-colors hover:text-gold"
            >
              View all inventory <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {others.map((o) => (
              <Link
                key={o.id}
                to="/diamonds/$id"
                params={{ id: o.id }}
                className="spec-tile group block overflow-hidden p-3 hover:-translate-y-1 hover:border-gold/40"
              >
                <div className="aspect-square w-full overflow-hidden rounded-lg bg-secondary">
                  <iframe
                    src={o.view360}
                    title={`${o.carat.toFixed(2)}ct ${o.shape} 360 view`}
                    loading="lazy"
                    className="pointer-events-none h-full w-full border-0 transition-transform duration-700 group-hover:scale-[1.04]"
                  />
                </div>
                <div className="flex items-end justify-between gap-3 px-2 py-4">
                  <div>
                    <h3 className="text-sm font-semibold">
                      {o.carat.toFixed(2)}ct {o.shape}
                    </h3>
                    <p className="mt-1 text-[0.68rem] uppercase tracking-[0.16em] text-muted-foreground">
                      {o.color} · {o.clarity} · {o.cut}
                    </p>
                  </div>
                  <p className="text-sm font-semibold text-gold">
                    {formatPrice(o.price)}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </Reveal>
      </div>
    </div>
  );
}
