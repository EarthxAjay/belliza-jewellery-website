import { createFileRoute } from "@tanstack/react-router";
import { IMG } from "@/lib/site-data";
import { FeatureSplit, PageHero, Section } from "@/components/site/Sections";

export const Route = createFileRoute("/bespoke-services")({
  head: () => ({
    meta: [
      { title: "Bespoke Services | Custom Cuts & White-Label | Belliza" },
      {
        name: "description",
        content:
          "Proprietary and custom diamond cuts plus white-label jewellery manufacturing, engineered with Belliza Gems & Jewels for your exclusive collection.",
      },
      { property: "og:title", content: "Your Vision. Our Manufacturing Expertise." },
      {
        property: "og:description",
        content:
          "Custom cuts and private-label jewellery manufacturing for brands and designers.",
      },
      { property: "og:image", content: IMG.bespokeCustom },
      { name: "twitter:image", content: IMG.bespokeCustom },
    ],
  }),
  component: Bespoke,
});

function Bespoke() {
  return (
    <>
      <PageHero
        title="Your Vision. Our Manufacturing Expertise."
        subtitle="Beyond our extensive inventory, we partner with brands to create unique, custom solutions."
        image={IMG.bespokeCustom}
      />

      <Section>
        <FeatureSplit
          image={IMG.bespokeCustom}
          imageAlt="A 3D digital rendering of a diamond on a computer screen."
          title="Proprietary & Custom Cuts"
          body="Move beyond the standard. Our R&D and cutting teams collaborate directly with designers and jewellery brands to develop proprietary cuts and unique, custom diamond shapes. Bring us your concept, and we will engineer the diamond for your exclusive collection."
        />
      </Section>

      <Section className="border-t border-border bg-[color-mix(in_oklab,var(--color-surface)_50%,transparent)]">
        <FeatureSplit
          reverse
          image={IMG.bespokeJewellery}
          imageAlt="An artisan carefully polishing a diamond on a wheel."
          title="White-Label Jewellery Manufacturing"
          body="Leverage our manufacturing infrastructure for your brand. By special order, we offer comprehensive private-label jewellery manufacturing services. From CAD design and precise diamond sourcing to final setting and finishing, we can serve as your silent, high-quality production partner."
        />
      </Section>
    </>
  );
}
