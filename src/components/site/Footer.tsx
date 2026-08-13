import { Link } from "@tanstack/react-router";
import { Mail, MessageCircle, MapPin } from "lucide-react";
import { NAV_LINKS, CONTACT } from "@/lib/site-data";
import { Logo } from "./Logo";

export function Footer() {
  return (
    <footer className="border-t border-border bg-[color-mix(in_oklab,var(--color-surface)_60%,transparent)]">
      <div className="mx-auto grid max-w-[1300px] gap-12 px-6 py-16 md:grid-cols-2 lg:grid-cols-4">
        <div className="lg:col-span-1">
          <Logo />
          <p className="mt-5 max-w-xs text-sm leading-relaxed text-muted-foreground">
            A global leader in advanced CVD &amp; HPHT lab-grown diamond
            manufacturing, powering the world&rsquo;s most trusted jewellery
            partners.
          </p>
        </div>

        <div>
          <h3 className="eyebrow">Navigate</h3>
          <ul className="mt-5 space-y-3">
            {NAV_LINKS.map((l) => (
              <li key={l.to}>
                <Link
                  to={l.to}
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {[CONTACT.india, CONTACT.mumbai].map((office) => (
          <div key={office.title}>
            <h3 className="eyebrow">{office.title}</h3>
            <ul className="mt-5 space-y-3 text-sm text-muted-foreground">
              <li className="flex gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                <span>{office.address}</span>
              </li>
              <li className="flex gap-3">
                <MessageCircle className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                <a
                  className="transition-colors hover:text-foreground"
                  href={office.whatsappHref}
                  target="_blank"
                  rel="noreferrer"
                >
                  {office.whatsapp}
                </a>
              </li>
              <li className="flex gap-3">
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                <a
                  className="transition-colors hover:text-foreground"
                  href={`mailto:${office.email}`}
                >
                  {office.email}
                </a>
              </li>
            </ul>
          </div>
        ))}
      </div>

      <div className="border-t border-border">
        <div className="mx-auto flex max-w-[1300px] flex-col items-center justify-between gap-3 px-6 py-6 text-xs text-muted-foreground sm:flex-row">
          <p>
            &copy; {new Date().getFullYear()} Belliza Gems &amp; Jewels. All
            rights reserved.
          </p>
          <p>Surat, India &middot; Mumbai, India</p>
        </div>
      </div>
    </footer>
  );
}
