

// import { createFileRoute, Link } from "@tanstack/react-router";
// import { useEffect, useState, type ReactNode } from "react";
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
//   "Belliza Crafted",
// ] as const;

// const COLORS = [
//   "D",
//   "E",
//   "F",
//   "G",
//   "H",
//   "I",
//   "J",
//   "K",
//   "L",
// ] as const;

// const CLARITIES = [
//   "FL",
//   "VVS1",
//   "VVS2",
//   "VS1",
//   "VS2",    
//   "SI1",
//   "SI2",
//   "I1",
//   "I2",
//   "I3",
//   ] as const;

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
//    RANGE ROW — UI ONLY
//    ========================================================================== */

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
//     <div className="border-t border-[#ECE5DA] pt-5 first:border-t-0 first:pt-0">
//       <div className="mb-3 flex items-center justify-between gap-3">
//         <span className="text-[9px] font-semibold uppercase tracking-[0.2em] text-[#766F65]">{label}</span>
//         <span className="text-[10px] text-[#766F65]">{options[from]} — {options[to]}</span>
//       </div>
//       <div className="flex flex-wrap gap-x-4 gap-y-2">
//         {options.map((option, index) => {
//           const active = index >= from && index <= to;
//           return (
//             <button
//               key={option}
//               type="button"
//               onClick={() => {
//                 if (index < from) onChange(index, to);
//                 else if (index > to) onChange(from, index);
//                 else onChange(index, index);
//               }}
//               className={`relative py-1 text-[10px] transition-colors ${
//                 active ? "font-semibold text-[#B08D57]" : "text-[#8A8379] hover:text-foreground"
//               }`}
//             >
//               {option}
//               {active && <span className="absolute -bottom-0.5 left-0 right-0 h-px bg-[#D8C08A]" />}
//             </button>
//           );
//         })}
//       </div>
//     </div>
//   );
// }


// /* ========================================================================== 
//    SHAPE VISUALS — UI ONLY
//    ========================================================================== */
// // function ShapeVisual({ shape, active }: { shape: string; active: boolean }) {
// //   const stroke = active ? "#B08D57" : "#9B9387";
// //   const fill = active ? "#F4E9CC" : "#F8F5EF";
// //   const common = { fill, stroke, strokeWidth: 1.5, vectorEffect: "non-scaling-stroke" as const };
// //   const visuals: Record<string, ReactNode> = {
// //     Round: <circle cx="50" cy="50" r="31" {...common} />,
// //     Oval: <ellipse cx="50" cy="50" rx="24" ry="33" {...common} />,
// //     Emerald: <polygon points="27,34 73,34 82,43 82,57 73,66 27,66 18,57 18,43" {...common} />,
// //     Cushion: <rect x="20" y="20" width="60" height="60" rx="17" {...common} />,
// //     Pear: <path d="M50 17 C45 29 27 40 27 57 C27 72 37 82 50 82 C63 82 73 72 73 57 C73 40 55 29 50 17Z" {...common} />,
// //     Radiant: <polygon points="27,20 73,20 80,27 80,73 73,80 27,80 20,73 20,27" {...common} />,
// //     Princess: <rect x="21" y="21" width="58" height="58" {...common} />,
// //     Marquise: <path d="M50 15 C60 26 76 37 76 50 C76 63 60 74 50 85 C40 74 24 63 24 50 C24 37 40 26 50 15Z" {...common} />,
// //   };
// //   return (
// //     <svg viewBox="0 0 100 100" aria-hidden="true" className="h-12 w-12 sm:h-14 sm:w-14">
// //       {visuals[shape] ?? <circle cx="50" cy="50" r="30" {...common} />}
// //       <path d="M50 19 L50 81 M19 50 L81 50" stroke={stroke} strokeWidth="0.65" opacity="0.3" />
// //     </svg>
// //   );
// // }

// function ShapeVisual({
//   shape,
//   active,
// }: {
//   shape: string;
//   active: boolean;
// }) {
//   const stroke = active ? "#B08D57" : "#9B9387";
//   const fill = active ? "#F4E9CC" : "#F8F5EF";

//   const common = {
//     fill,
//     stroke,
//     strokeWidth: 1.5,
//     vectorEffect: "non-scaling-stroke" as const,
//   };

//   const visuals: Record<string, ReactNode> = {
//     Round: <circle cx="50" cy="50" r="31" {...common} />,

//     Oval: <ellipse cx="50" cy="50" rx="24" ry="33" {...common} />,

//     Emerald: (
//       <polygon
//         points="27,34 73,34 82,43 82,57 73,66 27,66 18,57 18,43"
//         {...common}
//       />
//     ),

//     Cushion: (
//       <rect
//         x="20"
//         y="20"
//         width="60"
//         height="60"
//         rx="17"
//         {...common}
//       />
//     ),

//     Pear: (
//       <path
//         d="M50 17 C45 29 27 40 27 57 C27 72 37 82 50 82 C63 82 73 72 73 57 C73 40 55 29 50 17Z"
//         {...common}
//       />
//     ),

//     Radiant: (
//       <polygon
//         points="27,20 73,20 80,27 80,73 73,80 27,80 20,73 20,27"
//         {...common}
//       />
//     ),

//     Princess: (
//       <rect
//         x="21"
//         y="21"
//         width="58"
//         height="58"
//         {...common}
//       />
//     ),

//     Marquise: (
//       <path
//         d="M50 15 C60 26 76 37 76 50 C76 63 60 74 50 85 C40 74 24 63 24 50 C24 37 40 26 50 15Z"
//         {...common}
//       />
//     ),

//     /* BELLIZA CRAFTED */

//     "Belliza Crafted": (
//       <path
//         d="M50 13 C58 24 73 25 82 37 C88 46 85 59 77 69 C68 80 57 84 50 87 C43 84 32 80 23 69 C15 59 12 46 18 37 C27 25 42 24 50 13Z"
//         {...common}
//       />
//     ),
//   };

//   return (
//     <svg
//       viewBox="0 0 100 100"
//       aria-hidden="true"
//       className="h-12 w-12 sm:h-14 sm:w-14"
//     >
//       {visuals[shape] ?? (
//         <circle cx="50" cy="50" r="30" {...common} />
//       )}

//       <path
//         d="M50 19 L50 81 M19 50 L81 50"
//         stroke={stroke}
//         strokeWidth="0.65"
//         opacity="0.3"
//       />
//     </svg>
//   );
// }

// function Viewer360({
//   src,
//   title,
//   type,
//   lab,
// }: {
//   src: string;
//   title: string;
//   type: string;
//   lab: string;
// }) {
//   const [shouldLoad, setShouldLoad] = useState(false);
//   const [container, setContainer] = useState<HTMLDivElement | null>(null);

//   useEffect(() => {
//     if (!src || !container) return;
//     const observer = new IntersectionObserver(
//       ([entry]) => {
//         if (entry?.isIntersecting) {
//           setShouldLoad(true);
//           observer.disconnect();
//         }
//       },
//       { rootMargin: "500px" },
//     );
//     observer.observe(container);
//     return () => observer.disconnect();
//   }, [src, container]);

//   if (!src) {
//     return (
//       <div className="relative aspect-[0.79/1] w-full overflow-hidden rounded-[20px] bg-[#F5F3EE]">
//         <div className="flex h-full flex-col items-center justify-center">
//           <span className="text-[9px] font-semibold uppercase tracking-[0.22em] text-[#8B8379]">
//             360° View
//           </span>
//           <span className="mt-2 text-[10px] text-[#AAA39A]">Unavailable</span>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div
//       ref={setContainer}
//       className="group/viewer relative aspect-[0.79/1] w-full overflow-hidden rounded-[20px] bg-[#F5F3EE]"
//     >
//       {shouldLoad ? (
//         <iframe
//           src={src}
//           title={title}
//           loading="lazy"
//           className="absolute inset-0 h-full w-full border-0"
//           allowFullScreen
//         />
//       ) : (
//         <div className="absolute inset-0 flex items-center justify-center bg-[#F5F3EE]">
//           <div className="text-center">
//             <div className="mx-auto h-6 w-6 animate-spin rounded-full border border-[#E0D8CA] border-t-[#D09A32]" />
//             <p className="mt-3 text-[8px] font-medium uppercase tracking-[0.18em] text-[#8B8379]">
//               Loading view
//             </p>
//           </div>
//         </div>
//       )}

//       {/* UI layer — intentionally light and premium, matching the reference design. */}
//       <div className="pointer-events-none absolute inset-x-0 top-0 z-10 flex items-start justify-between p-3 sm:p-4">
//         <div className="flex items-center gap-2">
//           <span className="rounded-[10px] border border-[#E5DED2] bg-white/95 px-3 py-2 text-[9px] font-semibold uppercase tracking-[0.14em] text-[#302D29] shadow-[0_2px_10px_rgba(70,60,45,0.04)] backdrop-blur-sm">
//             {type || "CVD"}
//           </span>
//           <span className="rounded-[10px] border border-[#E5DED2] bg-white/95 px-3 py-2 text-[9px] font-semibold uppercase tracking-[0.14em] text-[#302D29] shadow-[0_2px_10px_rgba(70,60,45,0.04)] backdrop-blur-sm">
//             {lab || "IGI"}
//           </span>
//         </div>

//         <div className="rounded-[11px] border border-[#E5DED2] bg-white/95 px-3 py-2.5 shadow-[0_2px_12px_rgba(70,60,45,0.05)] backdrop-blur-sm">
//           <span className="inline-flex items-center gap-2 text-[9px] font-semibold uppercase tracking-[0.14em] text-[#302D29]">
//             <span className="text-[15px] leading-none">◇</span>
//             360° View
//           </span>
//         </div>
//       </div>
//     </div>
//   );
// }

// function DiamondCard({ diamond }: { diamond: Diamond }) {
//   return (
//     <motion.article
//       whileHover={{ y: -3 }}
//       transition={{ type: "spring", stiffness: 260, damping: 25 }}
//       className="group flex h-full min-w-0 flex-col overflow-hidden rounded-[26px] border border-[#E8DCC8] bg-white p-3 shadow-[0_3px_20px_rgba(73,58,37,0.035)] transition-[box-shadow,border-color] duration-300 hover:border-[#DCC79D] hover:shadow-[0_12px_36px_rgba(73,58,37,0.08)] sm:p-3.5"
//     >
//       {/* 360° media — tall, soft-cornered and visually dominant like the reference. */}
//       <div className="relative overflow-hidden rounded-[22px] bg-[#F5F3EE]">
//         <Viewer360
//           src={diamond.view360}
//           title={`${diamond.carat}ct ${diamond.shape} diamond 360 degree view`}
//           type={diamond.type || "CVD"}
//           lab={diamond.lab || "IGI"}
//         />
//       </div>

//       {/* Product information */}
//       <div className="flex flex-1 flex-col px-1.5 pb-1.5 pt-4 sm:px-2 sm:pt-4">

//         {/* KEY SPECS — directly under the 360° media */}
//         <div className="overflow-hidden rounded-[15px] border border-[#EAE1D3] bg-[#FBFAF7]">
//           <div className="grid grid-cols-4 divide-x divide-[#EAE1D3]">
//             {[
//               { label: "Carat", value: `${Number(diamond.carat).toFixed(3)} ct` },
//               { label: "Colour", value: diamond.color || "—" },
//               { label: "Clarity", value: diamond.clarity || "—" },
//               { label: "Cut", value: diamond.cut || "—" },
//             ].map((item) => (
//               <div key={item.label} className="min-w-0 px-2 py-3 text-center sm:px-2.5">
//                 <p className="text-[7px] font-semibold uppercase tracking-[0.16em] text-[#A49B8D]">
//                   {item.label}
//                 </p>
//                 <p className="mt-1 truncate text-[10px] font-medium tracking-[-0.01em] text-[#302D29]">
//                   {item.value}
//                 </p>
//               </div>
//             ))}
//           </div>

//           <div className="flex items-center justify-between gap-3 border-t border-[#EAE1D3] px-3 py-2.5">
//             <div className="flex min-w-0 items-center gap-2">
//               <span className="text-[7px] font-semibold uppercase tracking-[0.16em] text-[#A49B8D]">Lab</span>
//               <span className="truncate text-[9px] font-semibold uppercase tracking-[0.1em] text-[#625B51]">
//                 {diamond.lab || "—"}
//               </span>
//             </div>
//             <div className="min-w-0 text-right">
//               <span className="text-[7px] font-semibold uppercase tracking-[0.16em] text-[#A49B8D]">Measurements</span>
//               <span className="ml-2 text-[8px] text-[#746D63]">
//                 {diamond.measurements || "—"}
//               </span>
//             </div>
//           </div>
//         </div>

//         {/* TITLE */}
//         <h3 className="mt-4 text-[19px] font-medium leading-[1.16] tracking-[-0.035em] text-[#171614] sm:text-[21px]">
//           {Number(diamond.carat).toFixed(3)} Carat {diamond.shape}
//         </h3>

//         {/* PRICE + CTA */}
//         <div className="mt-4 border-t border-[#E8E0D3] pt-4">
//           <div className="flex items-end justify-between gap-3">
//             <div>
//               <p className="text-[7px] font-semibold uppercase tracking-[0.2em] text-[#A08F70]">
//                 Investment
//               </p>
//               <p className="mt-1 text-[22px] font-medium leading-none tracking-[-0.04em] text-[#171614] sm:text-[24px]">
//                 {formatPrice(Number(diamond.price))}
//               </p>
//             </div>

//             <Link
//               to="/diamonds/$id"
//               params={{ id: diamond.id }}
//               className="group inline-flex h-10 shrink-0 items-center gap-2 rounded-[10px] border border-[#C6A15A] bg-[#C6A15A] px-4 text-[8px] font-semibold uppercase tracking-[0.17em] text-white transition-all duration-300 hover:border-[#B08D57] hover:bg-[#B08D57]"
//             >
//               <span>View Diamond</span>
//               <span className="text-[13px] leading-none transition-transform duration-200 group-hover:translate-x-0.5">↗</span>
//             </Link>
//           </div>
//         </div>

//       </div>
//     </motion.article>
//   );
// }

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

//   const [fancyColor, setFancyColor] = useState(false);

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

//   const activeFilterCount =
//     shapes.length +
//     (diamondType !== "all" ? 1 : 0) +
//     (priceMax < MAX_DIAMOND_PRICE ? 1 : 0) +
//     (caratMin > 0.001 ? 1 : 0) +
//     (color[0] !== 0 || color[1] !== COLORS.length - 1 ? 1 : 0) +
//     (fancyColor ? 1 : 0) +
//     (clarity[0] !== 0 || clarity[1] !== CLARITIES.length - 1 ? 1 : 0) +
//     (cut[0] !== 0 || cut[1] !== CUTS.length - 1 ? 1 : 0);

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
//       // UI labels are normalized to database values.
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
//       // Fancy Colour is intentionally separate from D-L.
//       // It dynamically matches every database value containing FANCY,
//       // including FANCY VIVID, FANCY INTENSE, FANCY LIGHT, FANCY DEEP, etc.
//       const selectedColors = COLORS.slice(
//         color[0],
//         color[1] + 1,
//       );

//       const allStandardColorsSelected =
//         color[0] === 0 &&
//         color[1] === COLORS.length - 1;

//       if (fancyColor) {
//         // Fancy colour is a category: fetch ALL FANCY* colours.
//         // When standard colours are also selected, use one OR group.
//         const standardValues = allStandardColorsSelected
//           ? []
//           : selectedColors.map((value) => value.toUpperCase());

//         if (standardValues.length > 0) {
//           query = query.or(
//             `color.in.(${standardValues.join(",")}),color.ilike.*FANCY*`,
//           );
//         } else {
//           query = query.ilike("color", "%FANCY%");
//         }
//       } else if (!allStandardColorsSelected) {
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
//           fancyColor,
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
//   fancyColor,
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

//   setFancyColor(false);

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
//       <section className="relative overflow-hidden border-b border-[#DED8CB] bg-[#F4F0E7]">
//         <div className="mx-auto max-w-[1440px] px-5 pb-12 pt-24 sm:px-8 sm:pb-14 sm:pt-28 lg:px-12 lg:pb-16 lg:pt-32">
//           <div className="grid items-end gap-10 lg:grid-cols-[minmax(0,1fr)_360px] lg:gap-16">
//             <Reveal>
//               <div className="flex items-center gap-3">
//                 <span className="h-px w-8 bg-[#D8C08A]" />
//                 <p className="text-[9px] font-semibold uppercase tracking-[0.28em] text-[#7B7368]">Belliza Diamond Inventory</p>
//               </div>
//               <h1 className="mt-5 max-w-3xl text-[clamp(2.75rem,5.5vw,5.5rem)] font-medium leading-[0.94] tracking-[-0.055em] text-[#292723]">
//                 Find a diamond
//                 <span className="block text-[#C5A766]">with intention.</span>
//               </h1>
//               <p className="mt-6 max-w-xl text-sm leading-7 text-[#756E64] sm:text-[15px]">
//                 Certified CVD, HPHT and natural diamonds, selected by shape, carat, colour, clarity and cut — directly from Belliza&apos;s inventory.
//               </p>
//               <button
//                 type="button"
//                 onClick={() => document.getElementById("diamond-results")?.scrollIntoView({ behavior: "smooth" })}
//                 className="mt-7 border-b border-[#B08D57] pb-1.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#8C7042] transition-colors hover:text-[#5E4B2F]"
//               >
//                 Explore inventory <span className="ml-2">→</span>
//               </button>
//             </Reveal>

//             <Reveal className="lg:justify-self-end">
//               <div className="border-t border-[#D8C08A] pt-5 lg:border-l lg:border-t-0 lg:pl-7 lg:pt-0">
//                 <p className="text-[9px] font-semibold uppercase tracking-[0.25em] text-[#B08D57]">Live inventory</p>
//                 <div className="mt-2 flex items-baseline gap-3">
//                   <span className="text-5xl font-medium tracking-[-0.05em] text-[#292723] sm:text-6xl">
//                     {loading ? "—" : totalCount >= 100000 ? "100K+" : totalCount.toLocaleString()}
//                   </span>
//                   <span className="text-[10px] uppercase tracking-[0.2em] text-[#7B7368]">diamonds</span>
//                 </div>
//                 <p className="mt-3 max-w-xs text-xs leading-6 text-[#756E64]">
//                   Live stock, searchable page by page for a faster buying experience.
//                 </p>
//               </div>
//             </Reveal>
//           </div>
//         </div>
//       </section>

//       <section id="diamond-results" className="px-5 py-8 sm:px-8 sm:py-10 lg:px-12 lg:py-12">
//         <div className="mx-auto max-w-[1440px]">
//           <div className="border-y border-[#DED8CB] py-5">
//             <div className="mb-5 flex items-center justify-between gap-4">
//               <div>
//                 <p className="text-[9px] font-semibold uppercase tracking-[0.25em] text-[#B08D57]">Choose a shape</p>
//                 <p className="mt-1 text-xs text-[#8A8379]">Select one or more diamond silhouettes</p>
//               </div>
//               {shapes.length > 0 && (
//                 <button type="button" onClick={() => setShapes([])} className="text-[9px] font-semibold uppercase tracking-[0.15em] text-[#8A8379] underline underline-offset-4 hover:text-[#292723]">
//                   Clear
//                 </button>
//               )}
//             </div>
//             <div className="grid grid-cols-3 gap-2 sm:grid-cols-5 lg:grid-cols-9">
//               {SHAPES.map((shape) => {
//                 const active = shapes.includes(shape);
//                 return (
//                   <button
//                     key={shape}
//                     type="button"
//                     onClick={() => toggleShape(shape)}
//                     aria-pressed={active}
//                     className={`group flex min-h-[104px] flex-col items-center justify-center rounded-[16px] border px-2 py-4 transition-all duration-200 sm:min-h-[116px] ${active ? "border-[#D5BA7A] bg-[#F7EEDB] shadow-[0_6px_18px_rgba(176,141,87,0.10)]" : "border-[#E5DED2] bg-[#FBFAF7] hover:border-[#D9C7A7] hover:bg-white"}`}
//                   >
//                     <span className="transition-transform duration-200 group-hover:-translate-y-0.5">
//                       <ShapeVisual shape={shape} active={active} />
//                     </span>
//                     <span className={`mt-2.5 text-[9px] font-semibold uppercase tracking-[0.14em] ${active ? "text-[#8C7042]" : "text-[#746D63]"}`}>
//                       {shape}
//                     </span>
//                     <span className={`mt-2 h-px transition-all ${active ? "w-7 bg-[#B08D57]" : "w-0 bg-[#D8C08A] group-hover:w-4"}`} />
//                   </button>
//                 );
//               })}
//             </div>
//           </div>

//           <div className="mt-7 lg:grid lg:grid-cols-[270px_minmax(0,1fr)] lg:gap-10 xl:grid-cols-[290px_minmax(0,1fr)] xl:gap-14">
//             {filtersOpen && (
//               <button
//                 type="button"
//                 aria-label="Close filters"
//                 onClick={() => setFiltersOpen(false)}
//                 className="fixed inset-0 z-40 bg-[#F2EEE5]/65 backdrop-blur-[1px] lg:hidden"
//               />
//             )}

//             <aside
//               className={`z-50 h-max rounded-[22px] border border-[#E3DBCE] bg-white/95 p-5 shadow-[0_10px_34px_rgba(73,58,37,0.055)] backdrop-blur-sm lg:sticky lg:top-24 lg:block ${
//                 filtersOpen
//                   ? "fixed inset-x-4 bottom-4 top-20 overflow-y-auto shadow-[0_20px_55px_rgba(80,70,55,0.14)] sm:inset-x-8 sm:top-24"
//                   : "hidden"
//               }`}
//             >
//               <div className="border-b border-[#E8E0D3] pb-5">
//                 <div className="flex items-start justify-between gap-4">
//                   <div>
//                     <div className="flex items-center gap-2">
//                       <span className="h-px w-5 bg-[#C6A15A]" />
//                       <p className="text-[9px] font-semibold uppercase tracking-[0.24em] text-[#A17E45]">Refine</p>
//                     </div>
//                     <h2 className="mt-2 text-[19px] font-medium tracking-[-0.025em] text-[#292723]">Diamond filters</h2>
//                   </div>

//                   <button
//                     type="button"
//                     onClick={reset}
//                     className="shrink-0 rounded-full border border-[#E2D9CA] px-3 py-1.5 text-[8px] font-semibold uppercase tracking-[0.14em] text-[#7E766B] transition-colors hover:border-[#CDB98F] hover:text-[#8C7042]"
//                   >
//                     Reset
//                   </button>
//                 </div>

//                 <div className="mt-4 flex items-center justify-between rounded-[11px] bg-[#F8F5EF] px-3 py-2.5">
//                   <span className="text-[8px] font-semibold uppercase tracking-[0.16em] text-[#8B8378]">Active filters</span>
//                   <span className={`grid h-5 min-w-5 place-items-center rounded-full px-1.5 text-[8px] font-semibold ${activeFilterCount > 0 ? "bg-[#C6A15A] text-white" : "bg-white text-[#9B9387]"}`}>
//                     {activeFilterCount}
//                   </span>
//                 </div>
//               </div>

//               <div className="space-y-5 pt-5">
//                 <div>
//                   <div className="mb-3 text-[10px] font-semibold uppercase tracking-[0.22em] text-muted-foreground">Diamond type</div>
//                   <div className="flex border-b border-[#DED8CB]">
//                     {[
//                       { id: "all" as const, label: "All" },
//                       { id: "lab-grown" as const, label: "Lab-Grown" },
//                       { id: "real" as const, label: "Natural" },
//                     ].map((item) => {
//                       const active = diamondType === item.id;
//                       return (
//                         <button
//                           key={item.id}
//                           type="button"
//                           onClick={() => {
//                             setDiamondType(item.id);
//                             setPage(1);
//                           }}
//                           className={`relative min-h-10 flex-1 px-2 text-[9px] font-semibold uppercase tracking-[0.1em] transition-colors ${
//                             active ? "text-[#B08D57]" : "text-[#8A8379] hover:text-foreground"
//                           }`}
//                         >
//                           {item.label}
//                           {active && <span className="absolute inset-x-3 bottom-0 h-px bg-[#D8C08A]" />}
//                         </button>
//                       );
//                     })}
//                   </div>
//                 </div>

//                 <div className="border-t border-border/70 pt-5">
//                   <div className="mb-4 flex items-center justify-between">
//                     <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-muted-foreground">Max price</span>
//                     <span className="text-xs font-medium">{formatPrice(priceMax)}</span>
//                   </div>
//                   <input
//                     type="range"
//                     min={0}
//                     max={MAX_DIAMOND_PRICE}
//                     step={1000}
//                     value={Math.min(priceMax, MAX_DIAMOND_PRICE)}
//                     onChange={(event) => {
//                       setPriceMax(Number(event.target.value));
//                       setPage(1);
//                     }}
//                     className="w-full accent-[var(--color-primary)]"
//                     aria-label="Maximum price"
//                   />
//                 </div>

//                 <div className="border-t border-border/70 pt-5">
//                   <div className="mb-4 flex items-center justify-between">
//                     <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-muted-foreground">Minimum carat</span>
//                     <span className="text-xs font-medium">{caratMin.toFixed(2)} ct</span>
//                   </div>
//                   <input
//                     type="range"
//                     min={0.001}
//                     max={50}
//                     step={0.01}
//                     value={caratMin}
//                     onChange={(event) => {
//                       setCaratMin(Number(event.target.value));
//                       setPage(1);
//                     }}
//                     className="w-full accent-[var(--color-primary)]"
//                     aria-label="Minimum carat"
//                   />
//                 </div>

//                 <div className="border-t border-border/70 pt-5">
//                   <div className="mb-4 flex items-center justify-between gap-3">
//                     <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-muted-foreground">
//                       Colour
//                     </span>
//                     {(color[0] !== 0 || color[1] !== COLORS.length - 1 || fancyColor) && (
//                       <button
//                         type="button"
//                         onClick={() => {
//                           setColor([0, COLORS.length - 1]);
//                           setFancyColor(false);
//                           setPage(1);
//                         }}
//                         className="text-[8px] font-semibold uppercase tracking-[0.14em] text-[#A17E45] underline-offset-4 hover:underline"
//                       >
//                         Clear
//                       </button>
//                     )}
//                   </div>

//                   <RangeRow
//                     label=""
//                     options={COLORS}
//                     from={color[0]}
//                     to={color[1]}
//                     onChange={(from, to) => {
//                       setColor([from, to]);
//                       setPage(1);
//                     }}
//                   />

//                   <button
//                     type="button"
//                     aria-pressed={fancyColor}
//                     onClick={() => {
//                       setFancyColor((current) => !current);
//                       setPage(1);
//                     }}
//                     className={`group mt-4 flex min-h-[52px] w-full items-center justify-between rounded-[5px] border px-3.5 py-2.5 text-left transition-all duration-200 ${
//                       fancyColor
//                         ? "border-[#B08D57] bg-[#F8F1E3]"
//                         : "border-[#DED8CB] bg-white hover:border-[#C6A15A] hover:bg-[#FBF9F5]"
//                     }`}
//                   >
//                     <div className="min-w-0">
//                       <span className={`block text-[9px] font-semibold uppercase tracking-[0.16em] ${fancyColor ? "text-[#80643A]" : "text-[#5F594F]"}`}>
//                         Fancy Colour
//                       </span>
//                       <span className="mt-1 block text-[8px] leading-none text-[#9A9389]">
//                         Vivid · Intense · Light · Deep · All Fancy
//                       </span>
//                     </div>
//                     <span className={`ml-3 grid h-5 w-5 shrink-0 place-items-center rounded-full border text-[10px] transition-all ${fancyColor ? "border-[#B08D57] bg-[#B08D57] text-white" : "border-[#D1C7B7] bg-white text-transparent group-hover:border-[#C6A15A]"}`}>
//                       ✓
//                     </span>
//                   </button>
//                 </div>
//                 <RangeRow label="Clarity" options={CLARITIES} from={clarity[0]} to={clarity[1]} onChange={(from, to) => { setClarity([from, to]); setPage(1); }} />
//                 <RangeRow label="Cut" options={CUTS} from={cut[0]} to={cut[1]} onChange={(from, to) => { setCut([from, to]); setPage(1); }} />

//                 <button
//                   type="button"
//                   onClick={() => setFiltersOpen(false)}
//                   className="w-full border border-[#D8C08A] bg-transparent py-3 text-[10px] font-semibold uppercase tracking-[0.16em] text-foreground transition-colors hover:bg-[#F7F2E8] lg:hidden"
//                 >
//                   Apply filters
//                 </button>
//               </div>
//             </aside>

//             <div className="min-w-0">
//               <div className="border-b border-border/70 pb-4">
//                 <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
//                   <div>
//                     <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-primary">Available stones</p>
//                     <div className="mt-2 flex flex-wrap items-center gap-2">
//                       <p className="text-sm text-muted-foreground">
//                         {loading
//                           ? "Searching inventory..."
//                           : totalCount > 0
//                             ? `${pageStart.toLocaleString()}–${pageEnd.toLocaleString()} of ${totalCount >= 100000 ? "100,000+" : totalCount.toLocaleString()} diamonds`
//                             : "0 diamonds found"}
//                       </p>
//                       {activeFilterCount > 0 && (
//                         <span className="rounded-full border border-[#E0D4C0] bg-[#FBF7EE] px-2.5 py-1 text-[8px] font-semibold uppercase tracking-[0.12em] text-[#8C7042]">
//                           {activeFilterCount} active
//                         </span>
//                       )}
//                     </div>
//                   </div>

//                   <div className="flex items-center gap-2">
//                     <button
//                       type="button"
//                       onClick={() => setFiltersOpen((value) => !value)}
//                       className="inline-flex min-h-10 items-center gap-2 border border-border px-3 text-[10px] font-semibold uppercase tracking-[0.14em] lg:hidden"
//                     >
//                       <SlidersHorizontal className="h-3.5 w-3.5" /> Filters
//                     </button>

//                     <select
//                       value={sort}
//                       onChange={(event) => {
//                         setSort(event.target.value as typeof sort);
//                         setPage(1);
//                       }}
//                       aria-label="Sort diamonds"
//                       className="min-h-10 max-w-[190px] border border-border bg-transparent px-3 text-[10px] font-semibold uppercase tracking-[0.1em] outline-none"
//                     >
//                       {SORTS.map((item) => <option key={item.id} value={item.id}>{item.label}</option>)}
//                     </select>

//                     <div className="flex min-h-10 border border-border">
//                       <button
//                         type="button"
//                         aria-label="Grid view"
//                         onClick={() => setView("grid")}
//                         className={`grid w-10 place-items-center ${view === "grid" ? "bg-[#F7F2E8] text-[#B08D57]" : "text-muted-foreground hover:text-foreground"}`}
//                       >
//                         <LayoutGrid className="h-4 w-4" />
//                       </button>
//                       <button
//                         type="button"
//                         aria-label="List view"
//                         onClick={() => setView("list")}
//                         className={`grid w-10 place-items-center border-l border-border ${view === "list" ? "bg-[#F7F2E8] text-[#B08D57]" : "text-muted-foreground hover:text-foreground"}`}
//                       >
//                         <List className="h-4 w-4" />
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               {loading ? (
//                 <div className="grid gap-5 pt-6 sm:grid-cols-2 xl:grid-cols-3">
//                   {Array.from({ length: 6 }).map((_, index) => (
//                     <div key={index} className="animate-pulse border border-[#DED8CB] bg-white p-5">
//                       <div className="aspect-[1.08/1] bg-[#F4F0E8]" />
//                       <div className="mt-5 h-2.5 w-24 bg-[#E7DDC7]" />
//                       <div className="mt-3 h-5 w-44 bg-[#E7DDC7]" />
//                       <div className="mt-5 h-12 bg-[#F4F0E8]" />
//                       <div className="mt-5 h-10 bg-[#E7DDC7]" />
//                     </div>
//                   ))}
//                 </div>
//               ) : error ? (
//                 <div className="border-b border-border/70 py-24 text-center">
//                   <p className="text-sm font-medium">Unable to load diamonds</p>
//                   <p className="mx-auto mt-2 max-w-lg text-xs leading-6 text-muted-foreground">{error}</p>
//                   <button
//                     type="button"
//                     onClick={() => window.location.reload()}
//                     className="mt-6 border border-[#D8C08A] bg-transparent px-6 py-3 text-[10px] font-semibold uppercase tracking-[0.16em] text-foreground hover:bg-[#F7F2E8]"
//                   >
//                     Try again
//                   </button>
//                 </div>
//               ) : diamonds.length === 0 ? (
//                 <div className="border-b border-border/70 py-24 text-center">
//                   <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-primary">No match</span>
//                   <p className="mt-3 text-lg font-medium">No diamonds match your filters.</p>
//                   <p className="mx-auto mt-2 max-w-md text-xs leading-6 text-muted-foreground">
//                     Adjust your selection or clear the filters to explore the full inventory.
//                   </p>
//                   <button
//                     type="button"
//                     onClick={reset}
//                     className="mt-6 border border-[#D8C08A] bg-transparent px-6 py-3 text-[10px] font-semibold uppercase tracking-[0.16em] text-foreground hover:bg-[#F7F2E8]"
//                   >
//                     Clear filters
//                   </button>
//                 </div>
//               ) : view === "grid" ? (
//                 <div className="mt-6 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
//                   {diamonds.map((diamond) => <DiamondCard key={diamond.id} diamond={diamond} />)}
//                 </div>
//               ) : (
//                 <div className="mt-6 overflow-hidden border border-border/70 bg-card">
//                   <div className="overflow-x-auto">
//                     <table className="w-full min-w-[980px] text-left text-sm">
//                       <thead className="bg-secondary/35">
//                         <tr className="border-b border-border/70 text-[9px] uppercase tracking-[0.18em] text-muted-foreground">
//                           <th className="px-5 py-4 font-semibold">ID</th>
//                           <th className="px-5 py-4 font-semibold">Shape</th>
//                           <th className="px-5 py-4 font-semibold">Carat</th>
//                           <th className="px-5 py-4 font-semibold">Colour</th>
//                           <th className="px-5 py-4 font-semibold">Clarity</th>
//                           <th className="px-5 py-4 font-semibold">Cut</th>
//                           <th className="px-5 py-4 font-semibold">Lab</th>
//                           <th className="px-5 py-4 font-semibold">Price</th>
//                           <th className="px-5 py-4 font-semibold">Type</th>
//                           <th className="px-5 py-4" />
//                         </tr>
//                       </thead>
//                       <tbody>
//                         {diamonds.map((diamond) => (
//                           <tr key={diamond.id} className="border-b border-border/60 last:border-0 hover:bg-secondary/25">
//                             <td className="px-5 py-5 font-mono text-[10px] text-muted-foreground">{diamond.id}</td>
//                             <td className="px-5 py-5 font-medium">{diamond.shape}</td>
//                             <td className="px-5 py-5">{Number(diamond.carat).toFixed(2)}</td>
//                             <td className="px-5 py-5">{diamond.color}</td>
//                             <td className="px-5 py-5">{diamond.clarity}</td>
//                             <td className="px-5 py-5">{diamond.cut}</td>
//                             <td className="px-5 py-5">{diamond.lab || "—"}</td>
//                             <td className="px-5 py-5 font-semibold">{formatPrice(Number(diamond.price))}</td>
//                             <td className="px-5 py-5 text-xs text-muted-foreground">{diamond.type || "Lab-Grown"}</td>
//                             <td className="px-5 py-5 text-right">
//                               <Link
//                                 to="/diamonds/$id"
//                                 params={{ id: diamond.id }}
//                                 className="inline-flex min-h-9 items-center border border-[#CFC6B6] px-4 text-[9px] font-semibold uppercase tracking-[0.14em] hover:border-[#D8C08A] hover:bg-[#F7F2E8]"
//                               >
//                                 View
//                               </Link>
//                             </td>
//                           </tr>
//                         ))}
//                       </tbody>
//                     </table>
//                   </div>
//                 </div>
//               )}

//               {!loading && !error && totalCount > PAGE_SIZE && (
//                 <div className="mt-8 flex flex-col gap-5 border-t border-border/70 pt-5 sm:flex-row sm:items-center sm:justify-between">
//                   <p className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
//                     Page {page.toLocaleString()} of {totalPages.toLocaleString()}
//                   </p>
//                   <div className="flex w-full items-center sm:w-auto">
//                     <button
//                       type="button"
//                       disabled={page <= 1}
//                       onClick={() => {
//                         setPage((current) => Math.max(1, current - 1));
//                         window.scrollTo({ top: 0, behavior: "smooth" });
//                       }}
//                       className="flex min-h-11 flex-1 items-center justify-center gap-2 border border-border px-4 text-[10px] font-semibold uppercase tracking-[0.14em] disabled:opacity-35 sm:flex-none"
//                     >
//                       <ChevronLeft className="h-4 w-4" /> Previous
//                     </button>
//                     <span className="grid min-h-11 min-w-12 place-items-center border-y border-border bg-[#F7F2E8] px-3 text-[10px] font-semibold text-[#B08D57]">{page}</span>
//                     <button
//                       type="button"
//                       disabled={page >= totalPages}
//                       onClick={() => {
//                         setPage((current) => Math.min(totalPages, current + 1));
//                         window.scrollTo({ top: 0, behavior: "smooth" });
//                       }}
//                       className="flex min-h-11 flex-1 items-center justify-center gap-2 border border-border px-4 text-[10px] font-semibold uppercase tracking-[0.14em] disabled:opacity-35 sm:flex-none"
//                     >
//                       Next <ChevronRight className="h-4 w-4" />
//                     </button>
//                   </div>
//                 </div>
//               )}
//             </div>
//           </div>

//           <Reveal className="mt-20 border-t border-border/70 pt-14 sm:mt-28 sm:pt-20">
//             <div className="grid gap-8 sm:grid-cols-[1fr_auto] sm:items-end">
//               <div>
//                 <div className="flex items-center gap-3">
//                   <span className="h-px w-8 bg-primary" />
//                   <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-primary">Bespoke sourcing</p>
//                 </div>
//                 <h2 className="mt-5 max-w-2xl text-3xl font-medium leading-tight tracking-[-0.035em] sm:text-4xl">
//                   Can&apos;t find the stone you need?
//                 </h2>
//                 <p className="mt-4 max-w-2xl text-sm leading-7 text-muted-foreground">
//                   As a direct manufacturer, Belliza can source and produce stones to your required specifications,
//                   from calibrated melee to large certified centre stones.
//                 </p>
//               </div>
//               <Link
//                 to="/contact"
//                 className="inline-flex min-h-12 items-center justify-center border border-[#D8C08A] bg-transparent px-7 text-[10px] font-semibold uppercase tracking-[0.16em] text-foreground transition-colors hover:bg-[#F7F2E8] sm:min-w-[190px]"
//               >
//                 Request a stone
//               </Link>
//             </div>
//           </Reveal>
//         </div>
//       </section>
//     </>
//   );

// } 