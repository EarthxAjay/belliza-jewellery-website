import { createFileRoute, Link } from "@tanstack/react-router";
import { IMG } from "@/lib/site-data";
import { FeatureSplit, PageHero, Section } from "@/components/site/Sections";


export const Route = createFileRoute("/products")({
  head: () => ({
    meta: [
      { title: "Products | GIA & IGI Certified Lab-Grown Diamonds | Belliza" },
      {
        name: "description",
        content:
          "Certified 0.001ct to 50ct+ lab-grown diamonds, vivid fancy colors, and precision-calibrated melee manufactured in-house by Belliza Gems & Jewels.",
      },
      { property: "og:title", content: "A Comprehensive Diamond Inventory" },
      {
        property: "og:description",
        content:
          "Certified diamonds, fancy colors, and calibrated melee — manufactured for every need.",
      },
      { property: "og:image", content: IMG.certified },
      { name: "twitter:image", content: IMG.certified },
    ],
  }),
  component: Products,
});

function Products() {
  return (
    <>
      <PageHero
        title="A Comprehensive Inventory. Manufactured for Every Need."
        subtitle="Our capabilities as a direct manufacturer allow us to produce a complete range of lab-grown diamonds."
        image={IMG.certified}
      />

      <Section>
        <FeatureSplit
          image={IMG.certified}
          imageAlt="A stunning, large 10-carat white diamond on a dark background."
          title="GIA & IGI Certified Diamonds (0.001ct - 50ct+)"
          body="This is our core strength. We offer an extensive inventory of GIA and IGI certified diamonds, specializing in sizes from 0.001 carat to over 50 carats. Our focus is on premium DEF colors and high-clarity (VVS-VS) stones, available in all standard and exotic shapes."
        />

        {/* <div className="mt-10 text-center">
          <Link
            to="/diamonds"
            className="inline-block rounded-full bg-primary px-7 py-3 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
          >
            Explore Diamonds
          </Link>
        </div> */}
      </Section>

      <Section className="border-y border-border bg-[color-mix(in_oklab,var(--color-surface)_50%,transparent)]">
        <FeatureSplit
          reverse
          image={IMG.fancyColor}
          imageAlt="A deep, vivid fancy blue diamond."
          title="A Spectrum of Possibility"
          body="As a primary manufacturer, we create a consistent and reliable supply of vibrant, saturated fancy color diamonds. Our mastery of both CVD and HPHT allows us to produce a full range of sought-after colors, including Pinks, Blues, Yellows, Greens, and rare Reds."
        />
      </Section>

      <Section>
        <FeatureSplit
          image={IMG.melee}
          imageAlt="A pile of small, perfectly sorted melee diamonds."
          title="Calibrated for Perfection"
          body={`The new standard for jewellers. Our melee is not just "small diamonds"; it is a precision product. Meticulously sorted and calibrated for exact size, color, and clarity, our melee ensures seamless setting for any pavé, halo, or intricate design, saving you time and labor.`}
        />
      </Section>
    </>
  );
}
