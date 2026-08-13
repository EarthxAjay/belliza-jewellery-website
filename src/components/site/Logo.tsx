import { Link } from "@tanstack/react-router";

export function Logo({ className = "" }: { className?: string }) {
  return (
    <Link to="/" className={`flex items-center gap-3 ${className}`}>
      <svg
        viewBox="0 0 32 32"
        className="h-7 w-7 shrink-0 text-foreground"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M16 1.5l2.2 9.1a6 6 0 003.2 3.2L30.5 16l-9.1 2.2a6 6 0 00-3.2 3.2L16 30.5l-2.2-9.1a6 6 0 00-3.2-3.2L1.5 16l9.1-2.2a6 6 0 003.2-3.2L16 1.5z"
          fill="currentColor"
        />
      </svg>
      <span className="h-8 w-px bg-border" />
      <span className="leading-none">
        <span className="block text-[0.95rem] font-semibold tracking-[0.28em] text-foreground">
         BELLIZA
        </span>
        <span className="mt-1 block text-[0.5rem] tracking-[0.34em] text-muted-foreground">
          GEMS &amp; JEWELS
        </span>
      </span>
    </Link>
  );
}
