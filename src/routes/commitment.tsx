import { createFileRoute } from "@tanstack/react-router";
import { IMG } from "@/lib/site-data";
import { FeatureSplit, PageHero, Section } from "@/components/site/Sections";

export const Route = createFileRoute("/commitment")({
  head: () => ({
    meta: [
      { title: "Our Commitment | Sustainability & Community | Belliza" },
      {
        name: "description",
        content:
          "Eco-conscious lab-grown diamond manufacturing in Surat and sustained community investment in Gujarat, including a free community hospital.",
      },
      { property: "og:title", content: "Responsibility in Every Carat" },
      {
        property: "og:description",
        content:
          "Eco-conscious manufacturing and tangible, sustained social responsibility.",
      },
      { property: "og:image", content: IMG.eco },
      { name: "twitter:image", content: IMG.eco },
    ],
  }),
  component: Commitment,
});

function Commitment() {
  return (
    <>
      <PageHero title="Responsibility in Every Carat." image={IMG.eco} />

      <Section>
        <FeatureSplit
          image={IMG.eco}
          imageAlt="A modern, eco-friendly factory with solar panels on the roof."
          title="Eco-Conscious Manufacturing"
          body="The lab-grown diamond is, by its nature, a more sustainable choice. We take this commitment further. Our Surat facility is continually optimized for energy efficiency and minimal environmental impact. We provide a product you and your customers can be proud of."
        />
      </Section>

      <Section className="border-t border-border bg-[color-mix(in_oklab,var(--color-surface)_50%,transparent)]">
        <FeatureSplit
          reverse
          image={IMG.surat}
          imageAlt="A cityscape of Surat, India."
          title="Investing in Our Community"
          body="We believe that corporate success and community well-being are intrinsically linked. Belliza Gems & Jewels is deeply invested in our home region of Gujarat, where we operate a full-service hospital in a local village, providing comprehensive medical care completely free of charge. We also address fundamental needs by organizing daily distributions of nutritious meals and clean water to support the underprivileged. Partnering with Belliza Gems means choosing a source that is not only committed to diamond excellence but also to tangible, sustained social responsibility."
        />
      </Section>
    </>
  );
}
