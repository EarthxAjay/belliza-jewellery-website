import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { Mail, MapPin, MessageCircle } from "lucide-react";
import { CONTACT } from "@/lib/site-data";
import { PageHero, Section } from "@/components/site/Sections";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact Belliza | Surat & Mumbai Offices" },
      {
        name: "description",
        content:
          "Partner with the source. Contact Belliza Gems & Jewels in Surat, India or Mumbai for lab-grown diamond sales, logistics, and manufacturing inquiries.",
      },
      { property: "og:title", content: "Partner With The Source" },
      {
        property: "og:description",
        content:
          "Reach out to our global team today. We are ready to support your business.",
      },
    ],
  }),
  component: Contact,
});

const FIELDS = [
  { name: "fullName", label: "Full Name", type: "text", required: true },
  { name: "company", label: "Company Name", type: "text", required: true },
  { name: "email", label: "Email", type: "email", required: true },
  { name: "phone", label: "Phone Number", type: "tel", required: false },
  { name: "country", label: "Country", type: "text", required: false },
] as const;

const inputClass =
  "mt-2 w-full rounded-xl border border-input bg-background/60 px-4 py-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-ring";

function Contact() {
  const [sending, setSending] = useState(false);

  return (
    <>
      <PageHero
        title="Partner With The Source."
        subtitle="Reach out to our global team today. We are ready to support your business."
      />

      <Section>
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          <div className="surface-panel p-8">
            <h2 className="heading-xl text-2xl">Send a Message</h2>
            <form
              className="mt-8 space-y-5"
              onSubmit={(e) => {
                e.preventDefault();
                setSending(true);
                const form = e.currentTarget;
                setTimeout(() => {
                  setSending(false);
                  form.reset();
                  toast.success("Message sent", {
                    description: "Our team will get back to you shortly.",
                  });
                }, 600);
              }}
            >
              {FIELDS.map((f) => (
                <div key={f.name}>
                  <label
                    htmlFor={f.name}
                    className="text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground"
                  >
                    {f.label}
                  </label>
                  <input
                    id={f.name}
                    name={f.name}
                    type={f.type}
                    required={f.required}
                    className={inputClass}
                  />
                </div>
              ))}
              <div>
                <label
                  htmlFor="message"
                  className="text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  required
                  className={inputClass}
                />
              </div>
              <button
                type="submit"
                disabled={sending}
                className="w-full rounded-full bg-primary px-7 py-3 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-60"
              >
                {sending ? "Sending..." : "Send Message"}
              </button>
            </form>
          </div>

          <div className="space-y-6">
            {[CONTACT.india, CONTACT.hongKong].map((office) => (
              <article key={office.title} className="surface-panel p-8">
                <h3 className="heading-xl text-xl">{office.title}</h3>
                <p className="mt-3 text-sm text-muted-foreground">
                  {office.blurb}
                </p>
                <ul className="mt-6 space-y-4 text-sm text-muted-foreground">
                  <li className="flex gap-3">
                    <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                    <span>{office.address}</span>
                  </li>
                  <li className="flex gap-3">
                    <MessageCircle className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                    <span>
                      <span className="font-semibold text-foreground">
                        WhatsApp:{" "}
                      </span>
                      <a
                        href={office.whatsappHref}
                        target="_blank"
                        rel="noreferrer"
                        className="transition-colors hover:text-foreground"
                      >
                        {office.whatsapp}
                      </a>
                    </span>
                  </li>
                  <li className="flex gap-3">
                    <Mail className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                    <span>
                      <span className="font-semibold text-foreground">
                        Email:{" "}
                      </span>
                      <a
                        href={`mailto:${office.email}`}
                        className="transition-colors hover:text-foreground"
                      >
                        {office.email}
                      </a>
                    </span>
                  </li>
                </ul>
              </article>
            ))}
          </div>
        </div>
      </Section>
    </>
  );
}
