// import { Link } from "@tanstack/react-router";
// import { Menu, X } from "lucide-react";
// import { useState } from "react";
// import { AnimatePresence, motion } from "motion/react";
// import { NAV_LINKS } from "@/lib/site-data";
// import { Logo } from "./Logo";

// export function Navbar() {
//   const [open, setOpen] = useState(false);

//   return (
//     <header className="pointer-events-none fixed inset-x-0 top-0 z-50 px-4 pt-4">
//       <motion.div
//         initial={{ y: -80, opacity: 0 }}
//         animate={{ y: 0, opacity: 1 }}
//         transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
//         className="pointer-events-auto mx-auto flex max-w-[1300px] items-center justify-between gap-6 rounded-full border border-border bg-background/60 py-2.5 pl-5 pr-2.5 backdrop-blur-xl"
//       >
//         <Logo />


//         <nav className="hidden items-center gap-6 lg:flex">
//           {NAV_LINKS.map((l) => (
//             <Link
//               key={l.to}
//               to={l.to}
//               activeOptions={{ exact: l.to === "/" }}
//               className="text-[0.78rem] font-medium uppercase tracking-[0.08em] text-muted-foreground transition-colors hover:text-foreground data-[status=active]:text-foreground"
//             >
//               {l.label}
//             </Link>
//           ))}
//         </nav>

//         <div className="flex items-center gap-2">
//           <a
//             // href="https://www.etsy.com/uk/shop/Bellizajewel"
//              href="https://www.belliza.co"
//             target="_blank"
//             rel="noreferrer"
//             className="rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
//           >
//            BELLIZA
//           </a>
//           <button
//             type="button"
//             aria-label="Toggle menu"
//             onClick={() => setOpen((v) => !v)}
//             className="grid h-10 w-10 place-items-center rounded-full border border-border text-foreground lg:hidden"
//           >
//             {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
//           </button>
//         </div>
//       </motion.div>

//       <AnimatePresence initial={false}>
//         {open && (
//           <motion.div
//             initial={{ opacity: 0, y: -12, height: 0 }}
//             animate={{ opacity: 1, y: 0, height: "auto" }}
//             exit={{ opacity: 0, y: -12, height: 0 }}
//             transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
//             className="pointer-events-auto mx-auto mt-2 max-w-[1300px] overflow-hidden rounded-3xl border border-border bg-background/95 p-4 backdrop-blur-xl lg:hidden"
//           >
//             <nav className="flex flex-col">
//               {NAV_LINKS.map((l) => (
//                 <Link
//                   key={l.to}
//                   to={l.to}
//                   onClick={() => setOpen(false)}
//                   className="rounded-xl px-3 py-3 text-sm font-medium uppercase tracking-[0.08em] text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground data-[status=active]:text-foreground"
//                 >
//                   {l.label}
//                 </Link>
//               ))}
//             </nav>
//           </motion.div>
//         )}
//       </AnimatePresence>

//     </header>
//   );
// }


import { Link } from "@tanstack/react-router";
import { Menu, X, Search, UserRound } from "lucide-react";
import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { NAV_LINKS } from "@/lib/site-data";
import { Logo } from "./Logo";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();

    const query = searchQuery.trim();

    if (!query) return;

    window.location.href = `/search?q=${encodeURIComponent(query)}`;
  };

  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-50 px-4 pt-4">
      <motion.div
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="pointer-events-auto mx-auto flex max-w-[1300px] items-center justify-between gap-6 rounded-full border border-border bg-background/60 py-2.5 pl-5 pr-2.5 backdrop-blur-xl"
      >
        {/* Logo */}
        <Logo />

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-6 lg:flex">
          {NAV_LINKS.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              activeOptions={{ exact: l.to === "/" }}
              className="text-[0.78rem] font-medium uppercase tracking-[0.08em] text-muted-foreground transition-colors hover:text-foreground data-[status=active]:text-foreground"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-1.5">
          {/* Search */}
          <AnimatePresence initial={false}>
            {searchOpen && (
              <motion.form
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: 190, opacity: 1 }}
                exit={{ width: 0, opacity: 0 }}
                transition={{ duration: 0.25 }}
                onSubmit={handleSearch}
                className="hidden overflow-hidden sm:block"
              >
                <input
                  type="search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  autoFocus
                  placeholder="Search..."
                  className="h-10 w-full rounded-full border border-border bg-background/70 px-4 text-sm text-foreground outline-none placeholder:text-muted-foreground focus:border-foreground/30"
                />
              </motion.form>
            )}
          </AnimatePresence>

          <button
            type="button"
            aria-label="Search"
            onClick={() => setSearchOpen((v) => !v)}
            className="grid h-10 w-10 place-items-center rounded-full text-foreground transition-colors hover:bg-secondary"
          >
            <Search className="h-[19px] w-[19px]" strokeWidth={1.8} />
          </button>

          {/* Profile icon */}
          {/* <Link
            // to="/profile"
            aria-label="Profile"
            className="grid h-10 w-10 place-items-center rounded-full text-foreground transition-colors hover:bg-secondary"
          >
            <UserRound className="h-[19px] w-[19px]" strokeWidth={1.8} />
          </Link> */}
     
          {/* Mobile Menu */}
          <button
            type="button"
            aria-label="Toggle menu"
            onClick={() => setOpen((v) => !v)}
            className="grid h-10 w-10 place-items-center rounded-full border border-border text-foreground lg:hidden"
          >
            {open ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </button>
        </div>
      </motion.div>

      {/* Mobile Search */}
      <AnimatePresence initial={false}>
        {searchOpen && (
          <motion.form
            initial={{ opacity: 0, y: -12, height: 0 }}
            animate={{ opacity: 1, y: 0, height: "auto" }}
            exit={{ opacity: 0, y: -12, height: 0 }}
            transition={{ duration: 0.25 }}
            onSubmit={handleSearch}
            className="pointer-events-auto mx-auto mt-2 max-w-[1300px] overflow-hidden rounded-2xl border border-border bg-background/95 p-3 backdrop-blur-xl sm:hidden"
          >
            <div className="flex items-center gap-2">
              <Search className="ml-2 h-5 w-5 shrink-0 text-muted-foreground" />

              <input
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                autoFocus
                placeholder="Search diamonds, jewellery..."
                className="h-10 flex-1 bg-transparent px-2 text-sm text-foreground outline-none placeholder:text-muted-foreground"
              />
            </div>
          </motion.form>
        )}
      </AnimatePresence>

      {/* Mobile Navigation */}
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -12, height: 0 }}
            animate={{ opacity: 1, y: 0, height: "auto" }}
            exit={{ opacity: 0, y: -12, height: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="pointer-events-auto mx-auto mt-2 max-w-[1300px] overflow-hidden rounded-3xl border border-border bg-background/95 p-4 backdrop-blur-xl lg:hidden"
          >
            <nav className="flex flex-col">
              {NAV_LINKS.map((l) => (
                <Link
                  key={l.to}
                  to={l.to}
                  onClick={() => setOpen(false)}
                  className="rounded-xl px-3 py-3 text-sm font-medium uppercase tracking-[0.08em] text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground data-[status=active]:text-foreground"
                >
                  {l.label}
                </Link>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}