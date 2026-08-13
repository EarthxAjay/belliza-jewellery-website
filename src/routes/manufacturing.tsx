import { createFileRoute } from "@tanstack/react-router";
import { IMG } from "@/lib/site-data";
import { FeatureSplit, PageHero, Section } from "@/components/site/Sections";

export const Route = createFileRoute("/manufacturing")({
  head: () => ({
    meta: [
      { title: "Diamond Manufacturing | CVD & HPHT | Belliza Gems & Jewels" },
      {
        name: "description",
        content:
          "Explore Belliza's CVD and HPHT diamond growth, laser cutting and polishing, and multi-stage in-house grading at our Surat facility.",
      },
      { property: "og:title", content: "The Art & Science of Diamond Creation" },
      {
        property: "og:description",
        content:
          "We are not resellers. We are the manufacturers. Explore the technology that defines our quality.",
      },
      { property: "og:image", content: IMG.manufacturing },
      { name: "twitter:image", content: IMG.manufacturing },
    ],
  }),
  component: Manufacturing,
});

function Manufacturing() {
  return (
    <>
      <PageHero
        title="The Art & Science of Diamond Creation."
        subtitle="We are not resellers. We are the manufacturers. Explore the technology that defines our quality."
        image={IMG.manufacturing}
      />

      <Section>
        <h2 className="heading-xl text-center text-3xl sm:text-4xl">
          Total Control. Total Versatility.
        </h2>
        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          <article className="surface-panel p-8">
            <h3 className="heading-xl text-2xl">
              CVD (Chemical Vapor Deposition)
            </h3>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              Our advanced CVD reactors allow us to grow exceptional,
              high-purity Type IIa diamonds. This process is ideal for creating
              large-carat, high-clarity DEF white stones and rare Fancy Pinks,
              renowned for their exceptional quality.
            </p>
          </article>
          <article className="surface-panel p-8">
            <h3 className="heading-xl text-2xl">
              HPHT (High-Pressure High-Temperature)
            </h3>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              By replicating the earth&rsquo;s natural creation process, our
              HPHT technology is expertly controlled to produce consistently
              vivid Fancy Colors. This method is our key to creating
              sought-after, saturated Blues and brilliant Yellows.
            </p>
          </article>
        </div>
      </Section>

      <Section className="border-y border-border bg-[color-mix(in_oklab,var(--color-surface)_50%,transparent)]">
        <FeatureSplit
          image={IMG.manufacturing}
          imageAlt="A precision laser cutting a rough diamond."
          title="Precision in Every Facet"
          body="Our manufacturing prowess extends far beyond diamond growth. Our Surat facility houses a world-class cutting and polishing unit. We utilize advanced laser mapping and cutting technology, paired with the irreplaceable skill of our master artisans, to transform rough diamonds into perfectly proportioned stones that meet the most exacting B2B standards for symmetry, polish, and light performance."
        />
      </Section>

      <Section>
        <FeatureSplit
          reverse
          image={IMG.grading}
          imageAlt="A gemologist grading a diamond with tweezers."
          title="Our In-House Promise"
          body="Before any diamond is sent for third-party certification, it undergoes a rigorous, multi-stage in-house quality control process. Our team of expert gemologists meticulously grades every stone for color, clarity, cut, and carat. This commitment ensures that the diamonds you receive are not only certified but are also 100% consistent with your order."
        />
      </Section>
    </>
  );
}
