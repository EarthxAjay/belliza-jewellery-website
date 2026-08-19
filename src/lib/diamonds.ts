export type Diamond = {
  id: string;
  shape: string;
  carat: number;
  color: string;
  clarity: string;
  cut: string;
  polish: string;
  symmetry: string;
  fluorescence: string;
  lab: string;
  report: string;
  table: number;
  depth: number;
  measurements: string;
  price: number;
  type: "CVD" | "HPHT";
  view360: string;
};

export const DIAMONDS: Diamond[] = [
  {
    id: "1308261457-PM-3",
    shape: "Round",
    carat: 2.51,
    color: "E",
    clarity: "VVS2",
    cut: "Excellent",
    polish: "Excellent",
    symmetry: "Excellent",
    fluorescence: "None",
    lab: "IGI",
    report: "LG1308261457",
    table: 57,
    depth: 61.8,
    measurements: "8.62 x 8.66 x 5.34 mm",
    price: 3420,
    type: "CVD",
    view360: "https://view.gem360.in/gem360.html?d=1308261457-PM-3",
  },
  {
    id: "1308261456-PM-4",
    shape: "Oval",
    carat: 3.05,
    color: "F",
    clarity: "VS1",
    cut: "Excellent",
    polish: "Excellent",
    symmetry: "Very Good",
    fluorescence: "None",
    lab: "IGI",
    report: "LG1308261456",
    table: 58,
    depth: 62.4,
    measurements: "11.24 x 8.02 x 5.01 mm",
    price: 4180,
    type: "CVD",
    view360: "https://view.gem360.in/gem360.html?d=1308261456-PM-4",
  },
  {
    id: "1308261508-NR-857",
    shape: "Emerald",
    carat: 4.02,
    color: "D",
    clarity: "VVS1",
    cut: "Excellent",
    polish: "Excellent",
    symmetry: "Excellent",
    fluorescence: "None",
    lab: "GIA",
    report: "LG1308261508",
    table: 62,
    depth: 68.1,
    measurements: "10.18 x 7.62 x 5.19 mm",
    price: 6890,
    type: "HPHT",
    view360: "https://view.gem360.in/gem360.html?d=1308261508-NR-857",
  },
];

export const SHAPES = [
  "Round",
  "Oval",
  "Emerald",
  "Cushion",
  "Pear",
  "Radiant",
  "Princess",
  "Marquise",
] as const;

export const COLORS = ["J", "I", "H", "G", "F", "E", "D"] as const;
export const CLARITIES = [
  "SI2",
  "SI1",
  "VS2",
  "VS1",
  "VVS2",
  "VVS1",
  "IF",
  "FL",
] as const;
export const CUTS = ["Good", "Very Good", "Excellent", "Ideal"] as const;

export const formatPrice = (n: number) =>
  n.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  });

export const getDiamond = (id: string) => DIAMONDS.find((d) => d.id === id);
