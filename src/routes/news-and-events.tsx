import { createFileRoute } from "@tanstack/react-router";
import { IMG } from "@/lib/site-data";
import { PageHero, Section } from "@/components/site/Sections";

export const Route = createFileRoute("/news-and-events")({
  head: () => ({
    meta: [
      { title: "News & Events | Trade Shows & Updates | Belliza Gems & Jewels" },
      {
        name: "description",
        content:
          "Latest Belliza Gems & Jewels developments, manufacturing milestones, and upcoming lab-grown diamond trade shows in Mumbai and beyond.",
      },
      { property: "og:title", content: "Belliza Gems News & Events" },
      {
        property: "og:description",
        content:
          "Stay updated with our latest developments and find us at upcoming trade shows.",
      },
      { property: "og:image", content: IMG.newsHK },
      { name: "twitter:image", content: IMG.newsHK },
    ],
  }),
  component: News,
});

const POSTS = [
  {
    img: IMG.newsHK,
    alt: "A busy, modern trade show booth with clients.",
    date: "September 20, 2025",
    title:
      "Belliza Gems Concludes Successful September Mumbai Jewellery & Gem Fair",
    body: "We thank our valued partners and all new visitors for a highly successful show at the recent Mumbai Jewellery & Gem Fair. The industry response to our latest inventory—particularly our 10ct+ IGI certified stones and our new collection of vivid fancy pinks—was exceptional. We look forward to strengthening these new partnerships.",
  },
  {
    img: IMG.news50ct,
    alt: "A single, flawless 50-carat pink diamond.",
    date: "August 15, 2025",
    title:
      "Manufacturing Milestone: Belliza Gems Produces Flawless 50.02ct CVD Diamond",
    body: "Our Surat R&D and manufacturing teams have successfully produced a remarkable 50.02-carat, Intense Pink VS1 (Type IIa) CVD diamond. This stone represents a new benchmark in our large-carat production, demonstrating our complete mastery of the CVD process and our unique capacity to fulfill high-value, bespoke orders.",
  },
  {
    img: IMG.newsPinks,
    alt: "An arrangement of several vivid pink diamonds.",
    date: "September 5, 2023",
    title:
      "Belliza Gems Expands Fancy Color Portfolio with New Vivid Pink Collection",
    body: "In response to significant market demand, we are proud to announce a major expansion of our fancy color division. By dedicating a new line of advanced CVD reactors, we now offer a consistent, reliable supply of vivid pink lab-grown diamonds, available from 1 to 5 carats, allowing our B2B partners to build their collections with confidence.",
  },
  {
    img: IMG.newsHospital,
    alt: "The clean, modern exterior of a community hospital.",
    date: "October 20, 2022",
    title:
      "Our Commitment: Belliza Gems Funds New Wing at Community Hospital",
    body: "We are proud to announce the opening of a new, fully-equipped medical wing at the community hospital we operate in Gujarat. This expansion deepens our commitment to providing free, high-quality healthcare to local families, reinforcing our core philosophy that true business growth means uplifting the community around us.",
  },
  {
    img: IMG.newsCustomShape,
    alt: "A CAD drawing of a unique diamond shape.",
    date: "July 22, 2024",
    title: "Belliza Innovates with Advanced Custom-Shape Diamond Capabilities",
    body: "Our manufacturing excellence now extends to bespoke solutions. We have enhanced our laser-cutting and planning technology to partner with designers and brands on proprietary, custom-cut diamonds. From unique shapes to exclusive faceting patterns, our Surat facility can now bring your most complex visions to life.",
  },
  // {
  //   img: IMG.newsCvdOne,
  //   alt: "A laptop screen showing a B2B portal login page.",
  //   date: "October 30, 2025",
  //   title: "Belliza Gems & Jewels Launches Globally, Our Exclusive Inventory On Website",
  //   body: "To better serve our global partners, we have launched cvd.one, our exclusive B2B inventory portal. Powered by Belliza Gems, this platform provides our registered clients with 24/7 access to our live inventory of over 150,000 certified diamonds, streamlining the sourcing and ordering process for our valued partners.",
  // },
];

const SHOWS = [
  {
    name: "HKTDC International Diamond, Gem & Pearl Show",
     when: "",
     booth: "Coming Soon",
  },
  {
    name: "The Jewellery & Gem Fair, Mumbai",
     when: "",
    booth: "Coming Soon",
  },
];

function News() {
  return (
    <>
      <PageHero
        title="News & Events"
        subtitle="Stay updated with our latest developments and find us at upcoming trade shows."
      />

      <Section>
        <h2 className="heading-xl text-3xl sm:text-4xl">
          Belliza Gems Updates
        </h2>
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {POSTS.map((p) => (
            <article
              key={p.title}
              className="surface-panel flex flex-col overflow-hidden"
            >
              <img
                src={p.img}
                alt={p.alt}
                loading="lazy"
                className="h-56 w-full object-cover"
              />
              <div className="flex flex-1 flex-col p-7">
                <p className="eyebrow">{p.date}</p>
                <h3 className="mt-3 text-lg font-semibold leading-snug">
                  {p.title}
                </h3>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                  {p.body}
                </p>
              </div>
            </article>
          ))}
        </div>
      </Section>

      <Section className="border-t border-border bg-[color-mix(in_oklab,var(--color-surface)_50%,transparent)]">
        <h2 className="heading-xl text-3xl sm:text-4xl">Upcoming Trade Shows</h2>
        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          {SHOWS.map((s) => (
            <article key={s.name} className="surface-panel p-8">
              <h3 className="text-lg font-semibold">{s.name}</h3>
              <p className="mt-3 text-sm text-muted-foreground">{s.when}</p>
              <p className="mt-4 inline-block rounded-full bg-primary/15 px-4 py-1.5 text-xs font-medium text-foreground">
                {s.booth}
              </p>
            </article>
          ))}
        </div>
      </Section>
    </>
  );
}
