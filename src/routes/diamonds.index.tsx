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







// 100000+ diamond code 


// import { createFileRoute, Link } from "@tanstack/react-router";
// import { useEffect, useState } from "react";
// import {
//   ChevronLeft,
//   ChevronRight,
//   LayoutGrid,
//   List,
//   SlidersHorizontal,
// } from "lucide-react";
// import { motion } from "motion/react";

// import { supabase } from "@/integrations/supabase/client";
// import { Reveal } from "@/components/site/Motion";

// /* ==========================================================================
//    TYPES
// ========================================================================== */

// type Diamond = {
//   id: string;
//   shape: string;
//   carat: number;
//   color: string;
//   clarity: string;
//   cut: string;
//   lab: string;
//   measurements: string;
//   price: number;
//   type: string;
//   view360: string;
// };

// /* ==========================================================================
//    FILTER DATA
// ========================================================================== */

// const SHAPES = [
//   "Round",
//   "Oval",
//   "Emerald",
//   "Cushion",
//   "Pear",
//   "Radiant",
//   "Princess",
//   "Marquise",
// ] as const;

// const COLORS = [
//   "J",
//   "I",
//   "H",
//   "G",
//   "F",
//   "E",
//   "D",
// ] as const;

// const CLARITIES = [
//   "SI2",
//   "SI1",
//   "VS2",
//   "VS1",
//   "VVS2",
//   "VVS1",
//   "IF",
//   "FL",
// ] as const;

// const CUTS = [
//   "Good",
//   "Very Good",
//   "Excellent",
//   "Ideal",
// ] as const;

// const SORTS = [
//   {
//     id: "price-asc",
//     label: "Price: Low to High",
//   },
//   {
//     id: "price-desc",
//     label: "Price: High to Low",
//   },
//   {
//     id: "carat-desc",
//     label: "Carat: High to Low",
//   },
//   {
//     id: "carat-asc",
//     label: "Carat: Low to High",
//   },
// ] as const;

// /* ==========================================================================
//    IMPORTANT

//    NEVER LOAD THE WHOLE INVENTORY INTO THE BROWSER.

//    Only PAGE_SIZE diamonds are loaded at one time.

//    Example:

//    Database: 100,000 diamonds
//    Browser: 24 diamonds
//    Next page: another 24 diamonds

// ========================================================================== */

// const PAGE_SIZE = 24;

// /* ==========================================================================
//    PRICE
// ========================================================================== */

// const formatPrice = (value: number) =>
//   Number(value || 0).toLocaleString("en-US", {
//     style: "currency",
//     currency: "USD",
//     maximumFractionDigits: 0,
//   });

// /* ==========================================================================
//    ROUTE
// ========================================================================== */

// export const Route = createFileRoute("/diamonds/")({
//   head: () => ({
//     meta: [
//       {
//         title:
//           "Lab-Grown Diamond Search | Certified CVD & HPHT Diamonds | Belliza",
//       },
//       {
//         name: "description",
//         content:
//           "Search Belliza's lab-grown diamond inventory by shape, carat, colour, clarity and cut. Explore certified CVD and HPHT diamonds with interactive 360° views.",
//       },
//       {
//         property: "og:title",
//         content:
//           "Lab-Grown Diamond Search | Certified Diamonds | Belliza",
//       },
//       {
//         property: "og:description",
//         content:
//           "Search certified lab-grown diamonds by shape, carat, colour, clarity and cut.",
//       },
//       {
//         property: "og:type",
//         content: "website",
//       },
//       {
//         name: "twitter:card",
//         content: "summary_large_image",
//       },
//     ],
//   }),

//   component: DiamondSearch,
// });

// /* ==========================================================================
//    RANGE ROW
// ========================================================================== */

// function RangeRow({
//   label,
//   options,
//   from,
//   to,
//   onChange,
// }: {
//   label: string;
//   options: readonly string[];
//   from: number;
//   to: number;
//   onChange: (from: number, to: number) => void;
// }) {
//   return (
//     <div>
//       <div className="mb-3 flex items-center justify-between">
//         <span className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
//           {label}
//         </span>

//         <span className="text-xs text-foreground/70">
//           {options[from]} – {options[to]}
//         </span>
//       </div>

//       <div className="flex flex-wrap gap-1.5">
//         {options.map((option, index) => {
//           const active = index >= from && index <= to;

//           return (
//             <button
//               key={option}
//               type="button"
//               onClick={() => {
//                 if (index < from) {
//                   onChange(index, to);
//                 } else if (index > to) {
//                   onChange(from, index);
//                 } else {
//                   onChange(index, index);
//                 }
//               }}
//               className={`min-w-11 rounded-lg border px-2.5 py-1.5 text-xs font-medium transition-colors ${
//                 active
//                   ? "border-primary bg-primary text-primary-foreground"
//                   : "border-border text-muted-foreground hover:text-foreground"
//               }`}
//             >
//               {option}
//             </button>
//           );
//         })}
//       </div>
//     </div>
//   );
// }

// /* ==========================================================================
//    LAZY 360 VIEWER

//    360 viewer is NOT loaded immediately for every diamond.

//    ========================================================================== */

// function Viewer360({
//   src,
//   title,
// }: {
//   src: string;
//   title: string;
// }) {
//   const [shouldLoad, setShouldLoad] = useState(false);
//   const [container, setContainer] =
//     useState<HTMLDivElement | null>(null);

//   useEffect(() => {
//     if (!src || !container) return;

//     const observer = new IntersectionObserver(
//       ([entry]) => {
//         if (entry?.isIntersecting) {
//           setShouldLoad(true);
//           observer.disconnect();
//         }
//       },
//       {
//         rootMargin: "500px",
//       },
//     );

//     observer.observe(container);

//     return () => observer.disconnect();
//   }, [src, container]);

//   if (!src) {
//     return (
//       <div className="relative aspect-square w-full overflow-hidden rounded-xl bg-secondary">
//         <div className="flex h-full items-center justify-center text-sm text-muted-foreground">
//           360° view unavailable
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div
//       ref={setContainer}
//       className="relative aspect-square w-full overflow-hidden rounded-xl bg-secondary"
//     >
//       {shouldLoad ? (
//         <iframe
//           src={src}
//           title={title}
//           loading="lazy"
//           className="h-full w-full border-0"
//           allowFullScreen
//         />
//       ) : (
//         <div className="flex h-full items-center justify-center">
//           <div className="text-center">
//             <div className="mx-auto h-7 w-7 animate-spin rounded-full border-2 border-border border-t-primary" />

//             <p className="mt-3 text-xs text-muted-foreground">
//               360° view loads when visible
//             </p>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// /* ==========================================================================
//    DIAMOND CARD
// ========================================================================== */

// function DiamondCard({
//   diamond,
// }: {
//   diamond: Diamond;
// }) {
//   return (
//     <motion.div
//       whileHover={{ y: -5 }}
//       transition={{
//         type: "spring",
//         stiffness: 260,
//         damping: 22,
//       }}
//       className="surface-panel flex flex-col overflow-hidden p-4"
//     >
//       <Viewer360
//         src={diamond.view360}
//         title={`${diamond.carat}ct ${diamond.shape} diamond 360 degree view`}
//       />

//       <div className="mt-4 flex-1">
//         <p className="text-[0.7rem] uppercase tracking-[0.18em] text-muted-foreground">
//           {diamond.type || "Lab-Grown"}{" "}
//           {diamond.lab ? `· ${diamond.lab} Certified` : ""}
//         </p>

//         <h3 className="mt-2 text-base font-semibold">
//            {Number(diamond.carat).toFixed(3)} Carat{" "}
//   {diamond.shape}{" "}
//   {diamond.type
//     ? diamond.type
//     : "Diamond"}
//         </h3>

//         <p className="mt-1 text-sm text-muted-foreground">
//           {diamond.color} Colour · {diamond.clarity} Clarity ·{" "}
//           {diamond.cut} Cut
//         </p>

//         {diamond.measurements && (
//           <p className="mt-1 text-xs text-muted-foreground">
//             {diamond.measurements}
//           </p>
//         )}
//       </div>

//       <div className="mt-4 flex items-center justify-between gap-3">
//         <span className="text-lg font-semibold">
//           {formatPrice(Number(diamond.price))}
//         </span>

//         <Link
//           to="/diamonds/$id"
//           params={{
//             id: diamond.id,
//           }}
//           className="rounded-full bg-primary px-4 py-2 text-xs font-medium text-primary-foreground transition-opacity hover:opacity-90"
//         >
//           View Details
//         </Link>
//       </div>
//     </motion.div>
//   );
// }

// /* ==========================================================================
//    MAIN SEARCH
// ========================================================================== */

// function DiamondSearch() {
//   /* ------------------------------------------------------------------------
//      DATA
//   ------------------------------------------------------------------------ */

//   const [diamonds, setDiamonds] = useState<Diamond[]>([]);

//   const [totalCount, setTotalCount] = useState(0);

//   const [loading, setLoading] = useState(true);

//   const [error, setError] = useState<string | null>(null);

//   /* ------------------------------------------------------------------------
//      PAGINATION
//   ------------------------------------------------------------------------ */

//   const [page, setPage] = useState(1);

//   /* ------------------------------------------------------------------------
//      FILTERS
//   ------------------------------------------------------------------------ */

//   const [shapes, setShapes] = useState<string[]>([]);

//   const [diamondType, setDiamondType] = useState<
//   "all" | "lab-grown" | "real"
// >("all");

//   const MAX_DIAMOND_PRICE = 100_000_000;

// const [priceMax, setPriceMax] =
//   useState(MAX_DIAMOND_PRICE);

//   const [caratMin, setCaratMin] =
//     useState(0.001);

//   const [color, setColor] =
//     useState<[number, number]>([
//       0,
//       COLORS.length - 1,
//     ]);

//   const [clarity, setClarity] =
//     useState<[number, number]>([
//       0,
//       CLARITIES.length - 1,
//     ]);

//   const [cut, setCut] =
//     useState<[number, number]>([
//       0,
//       CUTS.length - 1,
//     ]);

//   const [sort, setSort] =
//     useState<(typeof SORTS)[number]["id"]>(
//       "price-asc",
//     );

//   const [view, setView] =
//     useState<"grid" | "list">("grid");

//   const [filtersOpen, setFiltersOpen] =
//     useState(false);

//   /* ==========================================================================
//      LOAD ONLY ONE PAGE

//      THIS IS THE IMPORTANT PART FOR 100,000+ DIAMONDS.

//      Supabase database:
//         100,000+ rows

//      Browser:
//         only 24 rows

//   ========================================================================== */

// useEffect(() => {
//   let mounted = true;

//   const loadDiamonds = async () => {
//     setLoading(true);
//     setError(null);

//     try {
//       /*
//        * ================================================================
//        * BELLIZA DYNAMIC DIAMOND SEARCH
//        *
//        * SUPABASE
//        * 100,000+ diamonds
//        *        ↓
//        * DATABASE FILTERING
//        *        ↓
//        * MATCHING DIAMONDS
//        *        ↓
//        * COUNT
//        *        ↓
//        * ONLY 24 DIAMONDS TO BROWSER
//        *
//        * IMPORTANT:
//        * Filters are case-insensitive because CSV/database values may be:
//        *
//        * CUSHION
//        * Cushion
//        * cushion
//        *
//        * EXCELLENT
//        * Excellent
//        * excellent
//        *
//        * ================================================================
//        */

//       let query = supabase
//         .from("Diamond")
//         .select(
//           `
//             id,
//             shape,
//             carat,
//             color,
//             clarity,
//             cut,
//             lab,
//             measurements,
//             price,
//             type,
//             view360
//           `,
//           {
//             count: "exact",
//           },
//         );

//       /* ================================================================
//          FILTERS

//          IMPORTANT:
//          Each selected filter is combined with AND.
//          Multiple values inside the same filter use IN.

//          The old version used query.or() repeatedly. In Supabase/PostgREST,
//          repeated OR filters do not behave like independent AND groups,
//          which caused shape/colour/clarity/cut/type filters to overwrite
//          each other.
//       ================================================================= */

//       // SHAPE: selected shapes are OR within the shape filter.
//       // Database CSV values are uppercase, so normalize the UI values.
//       if (shapes.length > 0) {
//         query = query.in(
//           "shape",
//           shapes.map((value) => value.trim().toUpperCase()),
//         );
//       }

//       // PRICE
//       query = query
//         .gte("price", 0)
//         .lte("price", priceMax);

//       // MIN CARAT
//       query = query.gte("carat", caratMin);

//       // COLOUR
//       const selectedColors = COLORS.slice(
//         color[0],
//         color[1] + 1,
//       );

//       if (selectedColors.length < COLORS.length) {
//         query = query.in(
//           "color",
//           selectedColors.map((value) => value.toUpperCase()),
//         );
//       }

//       // CLARITY
//       const selectedClarities = CLARITIES.slice(
//         clarity[0],
//         clarity[1] + 1,
//       );

//       if (selectedClarities.length < CLARITIES.length) {
//         query = query.in(
//           "clarity",
//           selectedClarities.map((value) => value.toUpperCase()),
//         );
//       }

//       // CUT
//       const selectedCuts = CUTS.slice(
//         cut[0],
//         cut[1] + 1,
//       );

//       if (selectedCuts.length < CUTS.length) {
//         query = query.in(
//           "cut",
//           selectedCuts.map((value) => value.toUpperCase()),
//         );
//       }

//       // DIAMOND TYPE
//       // This is the ONLY OR expression in the query. It is then combined
//       // with the other filters above using AND.
//       if (diamondType === "lab-grown") {
//         query = query.or(
//           [
//             "type.ilike.*CVD*",
//             "type.ilike.*HPHT*",
//             "type.ilike.*LAB-GROWN*",
//             "type.ilike.*LAB GROWN*",
//             "type.ilike.*LABGROWN*",
//             "type.ilike.*LGD*",
//           ].join(","),
//         );
//       } else if (diamondType === "real") {
//         query = query.or(
//           [
//             "type.ilike.*NATURAL*",
//             "type.ilike.*REAL*",
//             "type.ilike.*NATURAL DIAMOND*",
//           ].join(","),
//         );
//       }

//      /* ================================================================
//          SORT
//       ================================================================= */

//       switch (sort) {
//         case "price-desc":
//           query = query.order(
//             "price",
//             {
//               ascending: false,
//               nullsFirst: false,
//             },
//           );
//           break;

//         case "carat-desc":
//           query = query.order(
//             "carat",
//             {
//               ascending: false,
//               nullsFirst: false,
//             },
//           );
//           break;

//         case "carat-asc":
//           query = query.order(
//             "carat",
//             {
//               ascending: true,
//               nullsFirst: false,
//             },
//           );
//           break;

//         case "price-asc":
//         default:
//           query = query.order(
//             "price",
//             {
//               ascending: true,
//               nullsFirst: false,
//             },
//           );
//           break;
//       }

//       /* ================================================================
//          PAGINATION
         
//          IMPORTANT:
//          range() is applied AFTER every filter.
//       ================================================================= */

//       const from =
//         (page - 1) *
//         PAGE_SIZE;

//       const to =
//         from +
//         PAGE_SIZE -
//         1;

//       const {
//         data,
//         error: supabaseError,
//         count,
//       } =
//         await query.range(
//           from,
//           to,
//         );

//       if (!mounted) return;

//       if (supabaseError) {
//         console.error(
//           "Supabase Diamond Error:",
//           supabaseError,
//         );

//         setError(
//           supabaseError.message,
//         );

//         setDiamonds([]);
//         setTotalCount(0);
//         setLoading(false);

//         return;
//       }

//       const results =
//         (data ?? []) as Diamond[];

//       setDiamonds(results);

//       setTotalCount(
//         count ?? 0,
//       );

//       setLoading(false);

//       /* ================================================================
//          DEBUG
//       ================================================================= */

//       console.log(
//         "====================================",
//       );

//       console.log(
//         "💎 BELLIZA DIAMOND SEARCH",
//       );

//       console.log(
//         "Page:",
//         page,
//       );

//       console.log(
//         "Page size:",
//         PAGE_SIZE,
//       );

//       console.log(
//         "Results on page:",
//         results.length,
//       );

//       console.log(
//         "Total matching diamonds:",
//         count ?? 0,
//       );

//       console.log(
//         "Filters:",
//         {
//           diamondType,
//           shapes,
//           priceMax,
//           caratMin,
//           colors: selectedColors,
//           clarities:
//             selectedClarities,
//           cuts: selectedCuts,
//           sort,
//         },
//       );

//       console.log(
//         "====================================",
//       );
//     } catch (err) {
//       if (!mounted) return;

//       console.error(
//         "Diamond loading error:",
//         err,
//       );

//       setError(
//         "Unable to load diamonds.",
//       );

//       setDiamonds([]);
//       setTotalCount(0);
//       setLoading(false);
//     }
//   };

//   loadDiamonds();

//   return () => {
//     mounted = false;
//   };
// }, [
//   page,
//   diamondType,
//   shapes,
//   priceMax,
//   caratMin,
//   color,
//   clarity,
//   cut,
//   sort,
// ]);
//   /* ==========================================================================
//      PAGINATION CALCULATIONS
//   ========================================================================== */

//   const totalPages = Math.max(
//     1,
//     Math.ceil(
//       totalCount /
//         PAGE_SIZE,
//     ),
//   );

//   const pageStart =
//     totalCount === 0
//       ? 0
//       : (page - 1) *
//           PAGE_SIZE +
//         1;

//   const pageEnd = Math.min(
//     page * PAGE_SIZE,
//     totalCount,
//   );

//   /* ==========================================================================
//      RESET
//   ========================================================================== */

// const reset = () => {
//   setDiamondType("all");

//   setShapes([]);

// setPriceMax(MAX_DIAMOND_PRICE);

//   setCaratMin(0.001);

//   setColor([
//     0,
//     COLORS.length - 1,
//   ]);

//   setClarity([
//     0,
//     CLARITIES.length - 1,
//   ]);

//   setCut([
//     0,
//     CUTS.length - 1,
//   ]);

//   setSort("price-asc");

//   setPage(1);
// };

//   /* ==========================================================================
//      SHAPE FILTER
//   ========================================================================== */

//   const toggleShape = (
//     shape: string,
//   ) => {
//     setPage(1);

//     setShapes(
//       (previous) =>
//         previous.includes(shape)
//           ? previous.filter(
//               (item) =>
//                 item !== shape,
//             )
//           : [
//               ...previous,
//               shape,
//             ],
//     );
//   };

//   /* ==========================================================================
//      RENDER
//   ========================================================================== */

//   return (
//     <>
//       {/* =====================================================================
//           HERO
//       ===================================================================== */}

//       <section className="border-b border-border px-6 pb-10 pt-36 text-center">
//         <p className="eyebrow">
//           Diamond Search
//         </p>

//         <h1 className="heading-xl mx-auto mt-4 max-w-3xl text-3xl sm:text-5xl">
//           Find Your Perfect
//           Lab-Grown Diamond
//         </h1>

//         <p className="mx-auto mt-5 max-w-2xl text-sm leading-relaxed text-muted-foreground">
//           Explore Belliza's certified
//           CVD and HPHT lab-grown
//           diamond inventory by shape,
//           carat, colour, clarity and
//           cut.
//         </p>

//         {/* ================================================================
//             INVENTORY COUNT
//         ================================================================= */}

//         {!loading &&
//           totalCount > 0 && (
//             <div className="mx-auto mt-5 flex flex-wrap items-center justify-center gap-2">
//               <p className="text-xs uppercase tracking-[0.16em] text-muted-foreground">
//                 {totalCount >=
//                 100000
//                   ? "100,000+ diamonds"
//                   : `${totalCount.toLocaleString()} diamonds`}{" "}
//                 available in this
//                 selection
//               </p>

//               <span className="rounded-full border border-border px-3 py-1 text-[0.65rem] font-medium uppercase tracking-[0.12em] text-muted-foreground">
//                 Live Inventory
//               </span>
//             </div>
//           )}
//       </section>

//       {/* =====================================================================
//           SEARCH
//       ===================================================================== */}

//       <section className="px-6 py-10">
//         <div className="mx-auto max-w-[1300px]">

//           {/* ================================================================
//               SHAPES
//           ================================================================= */}

//           <div className="flex flex-wrap justify-center gap-2">
//             {SHAPES.map(
//               (shape) => {
//                 const active =
//                   shapes.includes(
//                     shape,
//                   );

//                 return (
//                   <button
//                     key={shape}
//                     type="button"
//                     onClick={() =>
//                       toggleShape(
//                         shape,
//                       )
//                     }
//                     className={`rounded-full border px-4 py-2 text-xs font-medium uppercase tracking-[0.1em] transition-colors ${
//                       active
//                         ? "border-primary bg-primary text-primary-foreground"
//                         : "border-border text-muted-foreground hover:text-foreground"
//                     }`}
//                   >
//                     {shape}
//                   </button>
//                 );
//               },
//             )}
//           </div>

//           <div className="mt-8 grid gap-8 lg:grid-cols-[280px_1fr]">

//             {/* ==============================================================
//                 FILTER SIDEBAR
//             ============================================================== */}

//             <aside
//               className={`surface-panel h-max space-y-7 p-6 ${
//                 filtersOpen
//                   ? ""
//                   : "hidden lg:block"
//               }`}
//             >
//               <div className="flex items-center justify-between">
//                 <h2 className="text-sm font-semibold uppercase tracking-[0.16em]">
//                   Filters
//                 </h2>

//                 <button
//                   type="button"
//                   onClick={reset}
//                   className="text-xs text-muted-foreground underline underline-offset-4 hover:text-foreground"
//                 >
//                   Reset
//                 </button>
//               </div>
// {/* ==========================================================================
//     DIAMOND TYPE
// ========================================================================== */}

// <div>
//   <div className="mb-3 flex items-center justify-between">
//     <span className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
//       Diamond Type
//     </span>
//   </div>

//   <div className="grid grid-cols-3 gap-2">
//     {[
//       {
//         id: "all" as const,
//         label: "All",
//       },
//       {
//         id: "lab-grown" as const,
//         label: "Lab-Grown",
//       },
//       {
//         id: "real" as const,
//         label: "Real",
//       },
//     ].map((item) => {
//       const active = diamondType === item.id;

//       return (
//         <button
//           key={item.id}
//           type="button"
//           onClick={() => {
//             setDiamondType(item.id);
//             setPage(1);
//           }}
//           className={`rounded-xl border px-3 py-2.5 text-[0.68rem] font-medium uppercase tracking-[0.08em] transition-all ${
//             active
//               ? "border-primary bg-primary text-primary-foreground shadow-sm"
//               : "border-border text-muted-foreground hover:border-primary/40 hover:text-foreground"
//           }`}
//         >
//           {item.label}
//         </button>
//       );
//     })}
//   </div>
// </div>
//               {/* PRICE */}

//               <div>
//                 <div className="mb-3 flex items-center justify-between">
//                   <span className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
//                     Max Price
//                   </span>

//                   <span className="text-xs">
//                     {formatPrice(
//                       priceMax,
//                     )}
//                   </span>
//                 </div>

//                 <input
//                   type="range"
//                   min={0}
//                   max={MAX_DIAMOND_PRICE}
//                   step={1000}
//                   value={Math.min(priceMax, MAX_DIAMOND_PRICE)}
//                   onChange={(event) => {
//                     setPriceMax(Number(event.target.value));
//                     setPage(1);
//                   }}
//                   className="w-full accent-[var(--color-primary)]"
//                   aria-label="Maximum price"
//                 />
//               </div>

//               {/* CARAT */}

//               <div>
//                 <div className="mb-3 flex items-center justify-between">
//                   <span className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
//                     Min Carat
//                   </span>

//                   <span className="text-xs">
//                     {caratMin.toFixed(
//                       2,
//                     )}{" "}
//                     ct
//                   </span>
//                 </div>

//                 <input
//                   type="range"
//                   min={0.001}
//                   max={50}
//                   step={0.01}
//                   value={caratMin}
//                   onChange={(event) => {
//                     setCaratMin(
//                       Number(
//                         event.target.value,
//                       ),
//                     );

//                     setPage(1);
//                   }}
//                   className="w-full accent-[var(--color-primary)]"
//                   aria-label="Minimum carat"
//                 />
//               </div>

//               {/* COLOUR */}

//               <RangeRow
//                 label="Colour"
//                 options={COLORS}
//                 from={color[0]}
//                 to={color[1]}
//                 onChange={(
//                   from,
//                   to,
//                 ) => {
//                   setColor([
//                     from,
//                     to,
//                   ]);

//                   setPage(1);
//                 }}
//               />

//               {/* CLARITY */}

//               <RangeRow
//                 label="Clarity"
//                 options={
//                   CLARITIES
//                 }
//                 from={
//                   clarity[0]
//                 }
//                 to={
//                   clarity[1]
//                 }
//                 onChange={(
//                   from,
//                   to,
//                 ) => {
//                   setClarity([
//                     from,
//                     to,
//                   ]);

//                   setPage(1);
//                 }}
//               />

//               {/* CUT */}

//               <RangeRow
//                 label="Cut"
//                 options={CUTS}
//                 from={cut[0]}
//                 to={cut[1]}
//                 onChange={(
//                   from,
//                   to,
//                 ) => {
//                   setCut([
//                     from,
//                     to,
//                   ]);

//                   setPage(1);
//                 }}
//               />
//             </aside>

//             {/* ==============================================================
//                 RESULTS
//             ============================================================== */}

//             <div>

//               {/* TOP BAR */}

//               <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border pb-4">

//                 <div className="flex items-center gap-3">

//                   <button
//                     type="button"
//                     onClick={() =>
//                       setFiltersOpen(
//                         (value) =>
//                           !value,
//                       )
//                     }
//                     className="flex items-center gap-2 rounded-full border border-border px-4 py-2 text-xs font-medium lg:hidden"
//                   >
//                     <SlidersHorizontal className="h-4 w-4" />
//                     Filters
//                   </button>

//                   <p className="text-sm text-muted-foreground">
//                     {loading
//                       ? "Loading diamonds..."
//                       : totalCount >
//                           0
//                         ? `${pageStart.toLocaleString()}–${pageEnd.toLocaleString()} of ${
//                             totalCount >=
//                             100000
//                               ? "100,000+"
//                               : totalCount.toLocaleString()
//                           } diamonds`
//                         : "0 diamonds found"}
//                   </p>
//                 </div>

//                 <div className="flex items-center gap-3">

//                   {/* SORT */}

//                   <select
//                     value={sort}
//                     onChange={(
//                       event,
//                     ) => {
//                       setSort(
//                         event.target
//                           .value as typeof sort,
//                       );

//                       setPage(1);
//                     }}
//                     aria-label="Sort diamonds"
//                     className="rounded-full border border-border bg-transparent px-4 py-2 text-xs text-foreground"
//                   >
//                     {SORTS.map(
//                       (item) => (
//                         <option
//                           key={
//                             item.id
//                           }
//                           value={
//                             item.id
//                           }
//                         >
//                           {
//                             item.label
//                           }
//                         </option>
//                       ),
//                     )}
//                   </select>

//                   {/* VIEW */}

//                   <div className="flex items-center gap-1 rounded-full border border-border p-1">

//                     <button
//                       type="button"
//                       aria-label="Grid view"
//                       onClick={() =>
//                         setView(
//                           "grid",
//                         )
//                       }
//                       className={`grid h-8 w-8 place-items-center rounded-full ${
//                         view ===
//                         "grid"
//                           ? "bg-secondary text-foreground"
//                           : "text-muted-foreground"
//                       }`}
//                     >
//                       <LayoutGrid className="h-4 w-4" />
//                     </button>

//                     <button
//                       type="button"
//                       aria-label="List view"
//                       onClick={() =>
//                         setView(
//                           "list",
//                         )
//                       }
//                       className={`grid h-8 w-8 place-items-center rounded-full ${
//                         view ===
//                         "list"
//                           ? "bg-secondary text-foreground"
//                           : "text-muted-foreground"
//                       }`}
//                     >
//                       <List className="h-4 w-4" />
//                     </button>

//                   </div>
//                 </div>
//               </div>

//               {/* ============================================================
//                   LOADING
//               ============================================================ */}

//               {loading ? (
//                 <div className="py-24 text-center">

//                   <div className="mx-auto h-9 w-9 animate-spin rounded-full border-2 border-border border-t-primary" />

//                   <p className="mt-4 text-sm text-muted-foreground">
//                     Searching diamond
//                     inventory...
//                   </p>

//                 </div>
//               ) : error ? (

//                 /* ============================================================
//                    ERROR
//                 ============================================================ */

//                 <div className="py-24 text-center">

//                   <p className="text-sm font-medium text-destructive">
//                     Unable to load
//                     diamonds
//                   </p>

//                   <p className="mx-auto mt-2 max-w-lg text-xs text-muted-foreground">
//                     {error}
//                   </p>

//                   <button
//                     type="button"
//                     onClick={() =>
//                       window.location.reload()
//                     }
//                     className="mt-5 rounded-full bg-primary px-5 py-2 text-xs font-medium text-primary-foreground"
//                   >
//                     Try Again
//                   </button>

//                 </div>
//               ) : diamonds.length ===
//                 0 ? (

//                 /* ============================================================
//                    NO RESULTS
//                 ============================================================ */

//                 <div className="py-24 text-center">

//                   <p className="text-sm text-muted-foreground">
//                     No diamonds
//                     match your
//                     filters.
//                   </p>

//                   <button
//                     type="button"
//                     onClick={reset}
//                     className="mt-5 rounded-full bg-primary px-5 py-2 text-xs font-medium text-primary-foreground"
//                   >
//                     Clear Filters
//                   </button>

//                 </div>
//               ) : view ===
//                 "grid" ? (

//                 /* ============================================================
//                    GRID
//                 ============================================================ */

//                 <>
//                   {/* <p className="mt-5 text-xs text-muted-foreground">
//                     Showing{" "}
//                     {diamonds.length.toLocaleString()}{" "}
//                     diamonds on
//                     this page.
//                     Full inventory
//                     remains in
//                     Supabase and
//                     loads
//                     page-by-page.
//                   </p> */}

//                   <div className="mt-6 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
//                     {diamonds.map(
//                       (diamond) => (
//                         <DiamondCard
//                           key={
//                             diamond.id
//                           }
//                           diamond={
//                             diamond
//                           }
//                         />
//                       ),
//                     )}
//                   </div>
//                 </>

//               ) : (

//                 /* ============================================================
//                    LIST
//                 ============================================================ */

//                 <div className="mt-6 overflow-x-auto">
//                   <table className="w-full min-w-[900px] text-left text-sm">

//                     <thead>
//                       <tr className="text-[0.7rem] uppercase tracking-[0.14em] text-muted-foreground">

//                         <th className="py-3">
//                           ID
//                         </th>

//                         <th className="py-3">
//                           Shape
//                         </th>

//                         <th className="py-3">
//                           Carat
//                         </th>

//                         <th className="py-3">
//                           Colour
//                         </th>

//                         <th className="py-3">
//                           Clarity
//                         </th>

//                         <th className="py-3">
//                           Cut
//                         </th>

//                         <th className="py-3">
//                           Lab
//                         </th>

//                         <th className="py-3">
//                           Price
//                         </th>

//                         <th className="py-3">
//                           Type
//                         </th>

//                         <th className="py-3" />

//                       </tr>
//                     </thead>

//                     <tbody>
//                       {diamonds.map(
//                         (diamond) => (
//                           <tr
//                             key={
//                               diamond.id
//                             }
//                             className="border-t border-border"
//                           >

//                             <td className="py-4 text-xs">
//                               {
//                                 diamond.id
//                               }
//                             </td>

//                             <td className="py-4">
//                               {
//                                 diamond.shape
//                               }
//                             </td>

//                             <td className="py-4">
//                               {Number(
//                                 diamond.carat,
//                               ).toFixed(
//                                 2,
//                               )}
//                             </td>

//                             <td className="py-4">
//                               {
//                                 diamond.color
//                               }
//                             </td>

//                             <td className="py-4">
//                               {
//                                 diamond.clarity
//                               }
//                             </td>

//                             <td className="py-4">
//                               {
//                                 diamond.cut
//                               }
//                             </td>

//                             <td className="py-4">
//                               {
//                                 diamond.lab
//                               }
//                             </td>

//                             <td className="py-4 font-semibold">
//                               {formatPrice(
//                                 Number(
//                                   diamond.price,
//                                 ),
//                               )}
//                             </td>

//                             <td className="py-4">
//                               {
//                                 diamond.type
//                               }
//                             </td>

//                             <td className="py-4 text-right">

//                               <Link
//                                 to="/diamonds/$id"
//                                 params={{
//                                   id: diamond.id,
//                                 }}
//                                 className="rounded-full border border-border px-4 py-2 text-xs hover:bg-secondary"
//                               >
//                                 View
//                               </Link>

//                             </td>

//                           </tr>
//                         ),
//                       )}
//                     </tbody>

//                   </table>
//                 </div>
//               )}

//               {/* ==============================================================
//                   PAGINATION
//               ============================================================== */}

//               {!loading &&
//                 !error &&
//                 totalCount >
//                   PAGE_SIZE && (
//                   <div className="mt-8 flex flex-col items-center justify-between gap-4 border-t border-border pt-6 sm:flex-row">

//                     <p className="text-xs text-muted-foreground">
//                       Page{" "}
//                       {page.toLocaleString()}{" "}
//                       of{" "}
//                       {totalPages.toLocaleString()}
//                     </p>

//                     <div className="flex items-center gap-2">

//                       <button
//                         type="button"
//                         disabled={
//                           page <=
//                           1
//                         }
//                         onClick={() => {
//                           setPage(
//                             (
//                               current,
//                             ) =>
//                               Math.max(
//                                 1,
//                                 current -
//                                   1,
//                               ),
//                           );

//                           window.scrollTo(
//                             {
//                               top: 0,
//                               behavior:
//                                 "smooth",
//                             },
//                           );
//                         }}
//                         className="flex items-center gap-2 rounded-full border border-border px-4 py-2 text-xs font-medium transition-opacity disabled:cursor-not-allowed disabled:opacity-40"
//                       >
//                         <ChevronLeft className="h-4 w-4" />
//                         Previous
//                       </button>

//                       <span className="rounded-full bg-secondary px-4 py-2 text-xs font-medium">
//                         {page}
//                       </span>

//                       <button
//                         type="button"
//                         disabled={
//                           page >=
//                           totalPages
//                         }
//                         onClick={() => {
//                           setPage(
//                             (
//                               current,
//                             ) =>
//                               Math.min(
//                                 totalPages,
//                                 current +
//                                   1,
//                               ),
//                           );

//                           window.scrollTo(
//                             {
//                               top: 0,
//                               behavior:
//                                 "smooth",
//                             },
//                           );
//                         }}
//                         className="flex items-center gap-2 rounded-full border border-border px-4 py-2 text-xs font-medium transition-opacity disabled:cursor-not-allowed disabled:opacity-40"
//                       >
//                         Next
//                         <ChevronRight className="h-4 w-4" />
//                       </button>

//                     </div>
//                   </div>
//                 )}
//             </div>
//           </div>

//           {/* ================================================================
//               CUSTOM STONE
//           ================================================================= */}

//           <Reveal className="mt-20 text-center">

//             <h2 className="heading-xl text-2xl sm:text-3xl">
//               Need Something You
//               Don&rsquo;t See Here?
//             </h2>

//             <p className="mx-auto mt-4 max-w-xl text-sm text-muted-foreground">
//               As a direct manufacturer,
//               Belliza can source and
//               produce stones to your
//               required specifications,
//               from calibrated melee to
//               large certified centre
//               stones.
//             </p>

//             <Link
//               to="/contact"
//               className="mt-7 inline-block rounded-full bg-primary px-7 py-3 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
//             >
//               Request a Stone
//             </Link>

//           </Reveal>

//         </div>
//       </section>
//     </>
//   );
// }