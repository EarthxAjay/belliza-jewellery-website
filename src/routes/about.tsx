import { createFileRoute } from "@tanstack/react-router";
import { IMG } from "@/lib/site-data";
import { PageHero, Section } from "@/components/site/Sections";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Belliza Gems & Jewels | Surat Diamond Manufacturer" },
      {
        name: "description",
        content:
          "Founded in Surat, Belliza Gems & Jewels is a primary CVD and HPHT lab-grown diamond manufacturer with a global B2B footprint in India and the World.",
      },
      { property: "og:title", content: "About Belliza Gems & Jewels" },
      {
        property: "og:description",
        content:
          "A legacy of innovation and a future of partnership, from Surat to the global market.",
      },
      { property: "og:image", content: IMG.surat },
      { name: "twitter:image", content: IMG.surat },
    ],
  }),
  component: About,
});

function About() {
  return (
    <>
      <PageHero title="A Legacy of Innovation. A Future of Partnership." />

      <Section>
        <div className="mx-auto max-w-3xl">
          <h2 className="heading-xl text-3xl sm:text-4xl">
            From Surat&rsquo;s Heart to the Global Market.
          </h2>
          <p className="mt-6 text-base leading-relaxed text-muted-foreground">
            Founded in Surat, the undisputed diamond capital of the world,
            Belliza Gems &amp; Jewels was built on a foundation of deep
            gemological expertise and a commitment to technological advancement.
            We foresaw the future of the diamond industry and invested heavily
            in mastering the complex science of both CVD and HPHT diamond
            creation.
          </p>
          <p className="mt-5 text-base leading-relaxed text-muted-foreground">
            Today, we are not just a supplier; we are a primary manufacturer and
            a trusted partner to wholesalers, designers, and jewellery brands on
            every continent.
          </p>
        </div>
      </Section>

      <Section className="border-y border-border bg-[color-mix(in_oklab,var(--color-surface)_50%,transparent)]">
        <h2 className="heading-xl text-center text-3xl sm:text-4xl">
          Our Guiding Principles
        </h2>
        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          <article className="surface-panel p-8">
            <h3 className="heading-xl text-2xl">Our Mission</h3>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              To be the industry&rsquo;s most reliable and transparent source
              for high-quality lab-grown diamonds, enabling our B2B partners to
              thrive by providing them with consistent supply, exceptional
              value, and innovative solutions.
            </p>
          </article>
          <article className="surface-panel p-8">
            <h3 className="heading-xl text-2xl">Our Vision</h3>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              To lead the global diamond industry into a more sustainable,
              transparent, and technologically advanced future, setting the new
              benchmark for quality and ethical practices.
            </p>
          </article>
        </div>
      </Section>

      <Section>
        <h2 className="heading-xl text-center text-3xl sm:text-4xl">
          A Global Footprint Designed for B2B
        </h2>
        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          {[
            {
              img: IMG.surat,
              alt: "A cityscape of Surat, India.",
              region: "INDIA (Manufacturing & HQ)",
              title: "Surat: The Manufacturing Core",
              body: "Our state-of-the-art facility is the heart of our operation. This is where our R&D, diamond growth (CVD/HPHT), and precision cutting and polishing take place.",
            },
            {
              img: IMG.hongKong,
              alt: "The exterior of a high-rise office building in World.",
              region: "Global Hub",
              title: "World : The Logistics Hub",
              body: "Our World office serves as our primary international sales and logistics center. Its strategic location ensures efficient, secure, and timely delivery to all major global markets.",
            },
          ].map((o) => (
            <article
              key={o.region}
              className="surface-panel overflow-hidden p-0"
            >
              <img
                src={o.img}
                alt={o.alt}
                loading="lazy"
                className="h-64 w-full object-cover"
              />
              <div className="p-8">
                <p className="eyebrow">{o.region}</p>
                <h3 className="heading-xl mt-3 text-xl">{o.title}</h3>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                  {o.body}
                </p>
              </div>
            </article>
          ))}
        </div>
      </Section>
    </>
  );
}
