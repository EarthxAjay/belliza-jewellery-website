import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { LayoutGrid, List, SlidersHorizontal } from "lucide-react";
import { motion } from "motion/react";
import {
  CLARITIES,
  COLORS,
  CUTS,
  DIAMONDS,
  SHAPES,
  formatPrice,
  type Diamond,
} from "@/lib/diamonds";
import { Reveal } from "@/components/site/Motion";

export const Route = createFileRoute("/diamonds/")({
  head: () => ({
    meta: [
      {
        title: "Lab-Grown Diamond Search | 360° Certified Stones | Navkar Gems",
      },
      {
        name: "description",
        content:
          "Search certified CVD & HPHT lab-grown diamonds by shape, carat, colour, clarity and cut. Inspect every stone in interactive 360° video before you buy.",
      },
      { property: "og:title", content: "Lab-Grown Diamond Search | Navkar Gems" },
      {
        property: "og:description",
        content:
          "Filter certified lab-grown diamonds and view each stone in true 360° detail.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: DiamondSearch,
});

const SORTS = [
  { id: "price-asc", label: "Price: Low to High" },
  { id: "price-desc", label: "Price: High to Low" },
  { id: "carat-desc", label: "Carat: High to Low" },
  { id: "carat-asc", label: "Carat: Low to High" },
] as const;

function RangeRow({
  label,
  options,
  from,
  to,
  onChange,
}: {
  label: string;
  options: readonly string[];
  from: number;
  to: number;
  onChange: (from: number, to: number) => void;
}) {
  return (
    <div>
      <div className="mb-3 flex items-center justify-between">
        <span className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
          {label}
        </span>
        <span className="text-xs text-foreground/70">
          {options[from]} – {options[to]}
        </span>
      </div>
      <div className="flex flex-wrap gap-1.5">
        {options.map((o, i) => {
          const active = i >= from && i <= to;
          return (
            <button
              key={o}
              type="button"
              onClick={() => {
                if (i < from) onChange(i, to);
                else if (i > to) onChange(from, i);
                else onChange(i, i);
              }}
              className={`min-w-11 rounded-lg border px-2.5 py-1.5 text-xs font-medium transition-colors ${
                active
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border text-muted-foreground hover:text-foreground"
              }`}
            >
              {o}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function Viewer360({ src, title }: { src: string; title: string }) {
  return (
    <div className="relative aspect-square w-full overflow-hidden rounded-xl bg-secondary">
      <iframe
        src={src}
        title={title}
        loading="lazy"
        className="h-full w-full border-0"
        allowFullScreen
      />
    </div>
  );
}

function DiamondCard({ d }: { d: Diamond }) {
  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ type: "spring", stiffness: 260, damping: 22 }}
      className="surface-panel flex flex-col overflow-hidden p-4"
    >
      <Viewer360 src={d.view360} title={`${d.carat}ct ${d.shape} 360 view`} />
      <div className="mt-4 flex-1">
        <p className="text-[0.7rem] uppercase tracking-[0.18em] text-muted-foreground">
          {d.type} · {d.lab} Certified
        </p>
        <h3 className="mt-2 text-base font-semibold">
          {d.carat.toFixed(2)} Carat {d.shape} Lab Diamond
        </h3>
        <p className="mt-1 text-sm text-muted-foreground">
          {d.color} Colour · {d.clarity} Clarity · {d.cut} Cut
        </p>
      </div>
      <div className="mt-4 flex items-center justify-between">
        <span className="text-lg font-semibold">{formatPrice(d.price)}</span>
        <Link
          to="/diamonds/$id"
          params={{ id: d.id }}
          className="rounded-full bg-primary px-4 py-2 text-xs font-medium text-primary-foreground transition-opacity hover:opacity-90"
        >
          View Details
        </Link>
      </div>
    </motion.div>
  );
}

function DiamondSearch() {
  const [shapes, setShapes] = useState<string[]>([]);
  const [priceMax, setPriceMax] = useState(10000);
  const [caratMin, setCaratMin] = useState(0.3);
  const [color, setColor] = useState<[number, number]>([0, COLORS.length - 1]);
  const [clarity, setClarity] = useState<[number, number]>([
    0,
    CLARITIES.length - 1,
  ]);
  const [cut, setCut] = useState<[number, number]>([0, CUTS.length - 1]);
  const [sort, setSort] = useState<(typeof SORTS)[number]["id"]>("price-asc");
  const [view, setView] = useState<"grid" | "list">("grid");
  const [filtersOpen, setFiltersOpen] = useState(false);

  const results = useMemo(() => {
    const list = DIAMONDS.filter((d) => {
      if (shapes.length && !shapes.includes(d.shape)) return false;
      if (d.price > priceMax) return false;
      if (d.carat < caratMin) return false;
      const ci = COLORS.indexOf(d.color as (typeof COLORS)[number]);
      if (ci >= 0 && (ci < color[0] || ci > color[1])) return false;
      const cl = CLARITIES.indexOf(d.clarity as (typeof CLARITIES)[number]);
      if (cl >= 0 && (cl < clarity[0] || cl > clarity[1])) return false;
      const cu = CUTS.indexOf(d.cut as (typeof CUTS)[number]);
      if (cu >= 0 && (cu < cut[0] || cu > cut[1])) return false;
      return true;
    });
    return list.sort((a, b) => {
      switch (sort) {
        case "price-desc":
          return b.price - a.price;
        case "carat-desc":
          return b.carat - a.carat;
        case "carat-asc":
          return a.carat - b.carat;
        default:
          return a.price - b.price;
      }
    });
  }, [shapes, priceMax, caratMin, color, clarity, cut, sort]);

  const reset = () => {
    setShapes([]);
    setPriceMax(10000);
    setCaratMin(0.3);
    setColor([0, COLORS.length - 1]);
    setClarity([0, CLARITIES.length - 1]);
    setCut([0, CUTS.length - 1]);
  };

  return (
    <>
      <section className="border-b border-border px-6 pb-10 pt-36 text-center">
        <p className="eyebrow">Diamond Search</p>
        <h1 className="heading-xl mx-auto mt-4 max-w-3xl text-3xl sm:text-5xl">
          Find Your Perfect Lab-Grown Diamond
        </h1>
        <p className="mx-auto mt-5 max-w-2xl text-sm leading-relaxed text-muted-foreground">
          Every stone is manufactured in-house, independently certified, and
          presented in true interactive 360° so you can inspect it from every
          angle before you commit.
        </p>
      </section>

      <section className="px-6 py-10">
        <div className="mx-auto max-w-[1300px]">
          {/* Shape row */}
          <div className="flex flex-wrap justify-center gap-2">
            {SHAPES.map((s) => {
              const active = shapes.includes(s);
              return (
                <button
                  key={s}
                  type="button"
                  onClick={() =>
                    setShapes((prev) =>
                      prev.includes(s)
                        ? prev.filter((x) => x !== s)
                        : [...prev, s],
                    )
                  }
                  className={`rounded-full border px-4 py-2 text-xs font-medium uppercase tracking-[0.1em] transition-colors ${
                    active
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-border text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {s}
                </button>
              );
            })}
          </div>

          <div className="mt-8 grid gap-8 lg:grid-cols-[280px_1fr]">
            {/* Filters */}
            <aside
              className={`surface-panel h-max space-y-7 p-6 ${filtersOpen ? "" : "hidden lg:block"}`}
            >
              <div className="flex items-center justify-between">
                <h2 className="text-sm font-semibold uppercase tracking-[0.16em]">
                  Filters
                </h2>
                <button
                  type="button"
                  onClick={reset}
                  className="text-xs text-muted-foreground underline underline-offset-4 hover:text-foreground"
                >
                  Reset
                </button>
              </div>

              <div>
                <div className="mb-3 flex items-center justify-between">
                  <span className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                    Max Price
                  </span>
                  <span className="text-xs">{formatPrice(priceMax)}</span>
                </div>
                <input
                  type="range"
                  min={500}
                  max={20000}
                  step={100}
                  value={priceMax}
                  onChange={(e) => setPriceMax(Number(e.target.value))}
                  className="w-full accent-[var(--color-primary)]"
                  aria-label="Maximum price"
                />
              </div>

              <div>
                <div className="mb-3 flex items-center justify-between">
                  <span className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                    Min Carat
                  </span>
                  <span className="text-xs">{caratMin.toFixed(2)} ct</span>
                </div>
                <input
                  type="range"
                  min={0.3}
                  max={10}
                  step={0.01}
                  value={caratMin}
                  onChange={(e) => setCaratMin(Number(e.target.value))}
                  className="w-full accent-[var(--color-primary)]"
                  aria-label="Minimum carat"
                />
              </div>

              <RangeRow
                label="Colour"
                options={COLORS}
                from={color[0]}
                to={color[1]}
                onChange={(a, b) => setColor([a, b])}
              />
              <RangeRow
                label="Clarity"
                options={CLARITIES}
                from={clarity[0]}
                to={clarity[1]}
                onChange={(a, b) => setClarity([a, b])}
              />
              <RangeRow
                label="Cut"
                options={CUTS}
                from={cut[0]}
                to={cut[1]}
                onChange={(a, b) => setCut([a, b])}
              />
            </aside>

            {/* Results */}
            <div>
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border pb-4">
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setFiltersOpen((v) => !v)}
                    className="flex items-center gap-2 rounded-full border border-border px-4 py-2 text-xs font-medium lg:hidden"
                  >
                    <SlidersHorizontal className="h-4 w-4" /> Filters
                  </button>
                  <p className="text-sm text-muted-foreground">
                    {results.length} diamond{results.length === 1 ? "" : "s"}{" "}
                    found
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <select
                    value={sort}
                    onChange={(e) => setSort(e.target.value as typeof sort)}
                    aria-label="Sort diamonds"
                    className="rounded-full border border-border bg-transparent px-4 py-2 text-xs text-foreground"
                  >
                    {SORTS.map((s) => (
                      <option key={s.id} value={s.id}>
                        {s.label}
                      </option>
                    ))}
                  </select>
                  <div className="flex items-center gap-1 rounded-full border border-border p-1">
                    <button
                      type="button"
                      aria-label="Grid view"
                      onClick={() => setView("grid")}
                      className={`grid h-8 w-8 place-items-center rounded-full ${view === "grid" ? "bg-secondary text-foreground" : "text-muted-foreground"}`}
                    >
                      <LayoutGrid className="h-4 w-4" />
                    </button>
                    <button
                      type="button"
                      aria-label="List view"
                      onClick={() => setView("list")}
                      className={`grid h-8 w-8 place-items-center rounded-full ${view === "list" ? "bg-secondary text-foreground" : "text-muted-foreground"}`}
                    >
                      <List className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>

              {results.length === 0 ? (
                <p className="py-20 text-center text-sm text-muted-foreground">
                  No diamonds match your filters. Try widening your selection.
                </p>
              ) : view === "grid" ? (
                <div className="mt-6 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
                  {results.map((d) => (
                    <DiamondCard key={d.id} d={d} />
                  ))}
                </div>
              ) : (
                <div className="mt-6 overflow-x-auto">
                  <table className="w-full min-w-[720px] text-left text-sm">
                    <thead>
                      <tr className="text-[0.7rem] uppercase tracking-[0.14em] text-muted-foreground">
                        <th className="py-3">Shape</th>
                        <th className="py-3">Carat</th>
                        <th className="py-3">Colour</th>
                        <th className="py-3">Clarity</th>
                        <th className="py-3">Cut</th>
                        <th className="py-3">Lab</th>
                        <th className="py-3">Price</th>
                        <th className="py-3" />
                      </tr>
                    </thead>
                    <tbody>
                      {results.map((d) => (
                        <tr key={d.id} className="border-t border-border">
                          <td className="py-4">{d.shape}</td>
                          <td className="py-4">{d.carat.toFixed(2)}</td>
                          <td className="py-4">{d.color}</td>
                          <td className="py-4">{d.clarity}</td>
                          <td className="py-4">{d.cut}</td>
                          <td className="py-4">{d.lab}</td>
                          <td className="py-4 font-semibold">
                            {formatPrice(d.price)}
                          </td>
                          <td className="py-4 text-right">
                            <Link
                              to="/diamonds/$id"
                              params={{ id: d.id }}
                              className="rounded-full border border-border px-4 py-2 text-xs hover:bg-secondary"
                            >
                              View
                            </Link>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>

          <Reveal className="mt-20 text-center">
            <h2 className="heading-xl text-2xl sm:text-3xl">
              Need Something You Don&rsquo;t See Here?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-sm text-muted-foreground">
              As a direct manufacturer we grow to order — from calibrated melee
              to 50ct+ certified centre stones.
            </p>
            <Link
              to="/contact"
              className="mt-7 inline-block rounded-full bg-primary px-7 py-3 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
            >
              Request a Stone
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
