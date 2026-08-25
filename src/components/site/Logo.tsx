import { Link } from "@tanstack/react-router";

export function Logo({ className = "" }: { className?: string }) {
  return (
    <Link
      to="/"
      className={`flex items-center ${className}`}
    >
      <span
        className="text-[20px] font-normal leading-none"
        style={{
          fontFamily: '"Instagram Sans", sans-serif',
          letterSpacing: "1.5px",
        }}
      >
        BELLIZA
      </span>
    </Link>
  );
}