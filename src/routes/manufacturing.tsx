import { createFileRoute, Link } from "@tanstack/react-router";
import { IMG } from "@/lib/site-data";
import { FeatureSplit, PageHero, Section } from "@/components/site/Sections";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/site/Motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/manufacturing")({
  head: () => ({
    meta: [
      {
        title:
          "Diamond & Jewellery Manufacturing | Custom Jewellery & Diamonds | Belliza",
      },
      {
        name: "description",
        content:
          "Belliza offers diamond and jewellery manufacturing in India, including CVD and HPHT lab-grown diamonds, natural diamonds, precision cutting and polishing, CAD jewellery design, custom jewellery, diamond setting, private-label and B2B jewellery manufacturing.",
      },
      {
        name: "keywords",
        content:
          "diamond manufacturing, jewellery manufacturing, jewellery manufacturer India, jewellery manufacturer Surat, lab grown diamond manufacturer, CVD diamond manufacturer, HPHT diamond manufacturer, custom jewellery manufacturer, private label jewellery manufacturer, diamond jewellery manufacturer, wholesale jewellery manufacturer, CAD jewellery design, bespoke jewellery manufacturing, diamond cutting and polishing",
      },
      { property: "og:type", content: "website" },
      {
        property: "og:title",
        content: "Diamond & Jewellery Manufacturing | Belliza",
      },
      {
        property: "og:description",
        content:
          "Discover Belliza's diamond manufacturing, CVD and HPHT lab-grown diamonds, natural diamonds, precision cutting, polishing and custom jewellery manufacturing capabilities.",
      },
      { property: "og:image", content: IMG.manufacturing },
      { name: "twitter:card", content: "summary_large_image" },
      {
        name: "twitter:title",
        content: "Diamond & Jewellery Manufacturing | Belliza",
      },
      {
        name: "twitter:description",
        content:
          "Diamond and jewellery manufacturing, custom jewellery, natural and lab-grown diamonds, CVD, HPHT and B2B manufacturing.",
      },
      { name: "twitter:image", content: IMG.manufacturing },
    ],
  }),
  component: Manufacturing,
});

const PROCESS_STEPS = [
  {
    number: "01",
    title: "Diamond Growth",
    // image: IMG.manufacturing,
    body: "Lab-grown diamonds are produced using controlled CVD or HPHT growth technologies according to the required specifications.",
  },
  {
    number: "02",
    title: "Planning & Mapping",
    // image: IMG.manufacturing,
    body: "Rough material is evaluated and planned to determine the most suitable cutting strategy for the desired shape, size and quality.",
  },
  {
    number: "03",
    title: "Laser Cutting",
    // image: IMG.manufacturing,
    body: "Precision laser technology can be used for accurate cutting and preparation of diamond material before polishing.",
  },
  {
    number: "04",
    title: "Cutting & Shaping",
    // image: IMG.manufacturing,
    body: "Diamond cutters transform rough material into precise shapes designed to meet the requirements of the final stone.",
  },
  {
    number: "05",
    title: "Polishing",
    // image: IMG.grading,
    body: "Careful polishing develops the facets and surface finish that contribute to a diamond's visual appearance and light performance.",
  },
  {
    number: "06",
    title: "Quality Control",
    // image: IMG.grading,
    body: "Finished diamonds undergo quality checks for specifications including carat weight, colour, clarity, cut-related characteristics, polish and symmetry.",
  },
];

const SHAPES = [
  "Round Brilliant",
  "Oval",
  "Pear",
  "Emerald",
  "Long Cushion",
  "Cushion",
  "Radiant",
  "Princess",
  "Marquise",
  "Heart",
  "Asscher",
  "Baguette",
  "Trillion",
  "Fancy Shapes",
  "Custom Cuts",
];

const JEWELLERY_STEPS = [
  {
    number: "01",
    title: "Design Consultation",
    body: "We understand the jewellery concept, diamond requirements, metal preference, dimensions, budget and production requirements.",
  },
  {
    number: "02",
    title: "CAD Design",
    body: "The jewellery concept can be developed into a detailed computer-aided design for review and production planning.",
  },
  {
    number: "03",
    title: "3D Model & Approval",
    body: "The proposed design can be reviewed for proportions, dimensions, stone placement and overall appearance before production.",
  },
  {
    number: "04",
    title: "Model Production",
    body: "An approved design can be converted into a production model suitable for the selected manufacturing process.",
  },
  {
    number: "05",
    title: "Casting",
    body: "The jewellery model can be cast using the selected precious metal and required production specifications.",
  },
  {
    number: "06",
    title: "Filing & Finishing",
    body: "The jewellery is cleaned, filed and prepared for diamond or gemstone setting and final finishing.",
  },
  {
    number: "07",
    title: "Diamond Setting",
    body: "Diamonds and gemstones are carefully positioned and secured according to the approved jewellery design.",
  },
  {
    number: "08",
    title: "Polishing & QC",
    body: "The finished jewellery undergoes final polishing and quality inspection before delivery.",
  },
];

const JEWELLERY_TYPES = [
  "Engagement Rings",
  "Wedding Rings",
  "Diamond Rings",
  "Earrings",
  "Diamond Earrings",
  "Pendants",
  "Diamond Pendants",
  "Necklaces",
  "Bracelets",
  "Bangles",
  "Diamond Jewellery",
  "Custom Jewellery",
];

const B2B_ITEMS = [
  {
    title: "Wholesale Diamonds",
    body: "Diamond sourcing and supply for professional jewellery businesses.",
  },
  {
    title: "Custom Jewellery",
    body: "Develop jewellery around your design, diamond and production requirements.",
  },
  {
    title: "Private Label",
    body: "Manufacturing support for jewellery brands developing their own collections.",
  },
  {
    title: "Diamond Jewellery",
    body: "Combine natural or lab-grown diamonds with custom jewellery designs.",
  },
  {
    title: "Bespoke Production",
    body: "Create individual jewellery pieces according to specific requirements.",
  },
  {
    title: "Jewellery Collections",
    body: "Support for brands developing coordinated jewellery collections.",
  },
];

const FAQS = [
  {
    question: "What does Belliza manufacture?",
    answer:
      "Belliza's capabilities include diamond manufacturing and sourcing, laboratory-grown diamonds, precision diamond cutting and polishing, and jewellery manufacturing according to specific project requirements.",
  },
  {
    question: "Does Belliza manufacture lab-grown diamonds?",
    answer:
      "Belliza works with CVD and HPHT laboratory-grown diamond technologies and can offer diamonds across a broad range of specifications depending on availability.",
  },
  {
    question: "Does Belliza offer natural diamonds?",
    answer:
      "Yes. Belliza offers natural diamonds through its diamond sourcing and supply capabilities across a range of shapes, sizes, colours and qualities.",
  },
  {
    question: "Does Belliza manufacture custom jewellery?",
    answer:
      "Belliza can support custom jewellery projects according to design, diamond, gemstone, metal and production requirements.",
  },
  {
    question: "Can Belliza manufacture jewellery for jewellery brands?",
    answer:
      "Yes. Belliza can support jewellery brands, retailers, designers and professional buyers with custom and private-label jewellery manufacturing requirements.",
  },
  {
    question: "Can I provide my own jewellery design?",
    answer:
      "Customers can discuss projects based on sketches, reference images, CAD files or other design concepts. The manufacturing approach depends on the specific project.",
  },
  {
    question: "What jewellery does Belliza manufacture?",
    answer:
      "Potential categories include engagement rings, wedding rings, diamond rings, earrings, pendants, necklaces, bracelets, bangles and bespoke jewellery.",
  },
  {
    question: "What diamond shapes are available?",
    answer:
      "Available shapes can include Round Brilliant, Oval, Pear, Emerald, Cushion, Radiant, Princess, Marquise, Heart, Asscher, Baguette, Trillion, fancy shapes and melee.",
  },
  {
    question: "Does Belliza offer fancy colour diamonds?",
    answer:
      "Belliza offers available fancy colour diamond options across natural and laboratory-grown categories, subject to individual stone specifications and availability.",
  },
  {
    question: "Can Belliza source diamonds according to specific requirements?",
    answer:
      "Yes. Diamond requirements can be discussed based on diamond type, shape, carat weight, colour, clarity, certification, quantity and budget.",
  },
  {
    question: "Does Belliza offer private-label jewellery manufacturing?",
    answer:
      "Belliza can support private-label and custom jewellery manufacturing requirements for jewellery businesses, subject to project specifications and production capabilities.",
  },
  {
    question: "Where is Belliza's manufacturing operation located?",
    answer:
      "Belliza's diamond manufacturing operation is based in Surat, Gujarat, India, subject to the specific production and sourcing arrangement for each project.",
  },
];

function Manufacturing() {
  return (
    <>
      <PageHero
        eyebrow ="Diamond & Jewellery Manufacturing"
        title="The Art & Science of Diamond Creation."
        subtitle="We are not resellers. We are the manufacturers. Explore the technology that defines our quality."
        image={IMG.manufacturing}
      />

      {/* INTRODUCTION */}
      <Section>
        <Reveal className="mx-auto max-w-3xl text-center">
          <p className="eyebrow text-[#B08D57]">Diamond &amp; Jewellery Manufacturing</p>
          <h2 className="heading-xl text-[#3A342A] mt-4 text-3xl sm:text-4xl">
            From Diamond Creation to Finished Jewellery
          </h2>
          <div className="gold-rule bg-[#D8C08A] mx-auto mt-6 w-40" />
          <p className="mt-6 text-base leading-relaxed text-[#6F665A]">
            Belliza brings together diamond manufacturing, diamond sourcing,
            precision cutting and polishing, jewellery design and jewellery
            manufacturing to create solutions for jewellery brands, retailers,
            manufacturers and private clients.
          </p>
          <p className="mt-4 text-base leading-relaxed text-[#6F665A]">
            Our diamond portfolio includes natural diamonds and
            laboratory-grown diamonds across a broad range of shapes, sizes,
            colours and qualities. Our jewellery manufacturing capabilities
            allow these diamonds to be transformed into finished jewellery
            according to individual design and production requirements.
          </p>
        </Reveal>
      </Section>

      {/* DIAMOND MANUFACTURING PROCESS */}
      <Section className="border-y border-[#E5DED0] bg-[#F8F6F1]">
        <Reveal className="mx-auto max-w-3xl text-center">
          <p className="eyebrow text-[#B08D57]">Our Process</p>
          <h2 className="heading-xl text-[#3A342A] mt-4 text-3xl sm:text-4xl">
            How a Diamond Becomes a Finished Stone
          </h2>
          <p className="mt-6 text-base leading-relaxed text-[#6F665A]">
            Every stage contributes to the final appearance, performance and
            quality of a diamond. Our manufacturing workflow combines
            technology with skilled human expertise.
          </p>
        </Reveal>

        <StaggerGroup className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {PROCESS_STEPS.map((step) => (
            <StaggerItem key={step.number}>
              <article className="lux-panel rounded-2xl border border-[#E5DED0] bg-[#F1EBDD] shadow-[0_4px_18px_rgba(0,0,0,0.04)] group h-full overflow-hidden">
                <div className="relative aspect-[16/10] overflow-hidden">
                  <img
                    // src={step.image}********************************************************************
                    alt={step.title}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-background/25 to-transparent" />
                  <span className="heading-xl text-[#3A342A] absolute bottom-3 left-4 text-3xl text-[#B08D57]">
                    {step.number}
                  </span>
                </div>
                <div className="p-6">
                  <h3 className="heading-xl text-[#3A342A] text-xl">{step.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-[#6F665A]">
                    {step.body}
                  </p>
                </div>
              </article>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </Section>

      {/* DIAMOND SHAPES */}
      {/* <Section>
        <Reveal className="mx-auto max-w-3xl text-center">
          <p className="eyebrow text-[#B08D57]">Diamond Shapes</p>
          <h2 className="heading-xl text-[#3A342A] mt-4 text-3xl sm:text-4xl">
            Diamond Shapes for Every Jewellery Design
          </h2>
          <p className="mt-6 text-base leading-relaxed text-[#6F665A]">
            Belliza offers diamonds across classic and contemporary shapes,
            subject to inventory and individual specifications.
          </p>
        </Reveal>

        <StaggerGroup
          stagger={0.05}
          className="mt-12 grid grid-cols-3 gap-4 sm:grid-cols-4 lg:grid-cols-5"
        >
          {SHAPES.map((name) => (
            <StaggerItem key={name}>
              <div className="spec-tile rounded-xl border border-[#E5DED0] bg-[#F1EBDD] transition-all duration-500 group flex h-full flex-col items-center gap-3 p-4 text-center hover:border-[#D8C08A]">
                <img
                  src={IMG.manufacturing}
                  alt={`${name} diamond shape`}
                  loading="lazy"
                  className="h-16 w-16 object-contain transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6"
                />
                <span className="text-xs font-medium tracking-wide text-[#6F665A]">
                  {name}
                </span>
              </div>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </Section> */}

      {/* GLOBAL DIAMOND SUPPLY */}
      <Section className="border-y border-[#E5DED0] bg-[#F8F6F1]">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <Reveal y={40}>
            <div className="relative overflow-hidden rounded-2xl border border-[#E5DED0] lux-shadow">
              <img
                src={IMG.manufacturing}
                alt="Belliza diamond manufacturing facility in Surat"
                loading="lazy"
                className="h-full w-full object-cover"
              />
              <span className="eyebrow text-[#B08D57] absolute bottom-4 left-4 rounded-full border border-[#E5DED0] bg-background/70 px-4 py-2 backdrop-blur">
                Belliza Manufacturing
              </span>
            </div>
          </Reveal>

          <Reveal delay={0.12}>
            <h2 className="heading-xl text-[#3A342A] text-3xl sm:text-4xl">
              Global Diamond Supply
            </h2>
            <p className="mt-6 text-base leading-relaxed text-[#6F665A]">
              Belliza offers a comprehensive range of natural and lab-grown
              diamonds in a wide selection of shapes, colours, cuts, and
              clarity grades.
            </p>

            <div className="mt-8 grid grid-cols-3 gap-4">
              {[
                { value: "100K+", label: "Customers" },
                { value: "10M+", label: "Diamonds Supplied" },
                { value: "IGI / GIA", label: "Certification" },
              ].map((stat) => (
                <div key={stat.label} className="spec-tile rounded-xl border border-[#E5DED0] bg-[#F1EBDD] transition-all duration-500 p-4 text-center">
                  <p className="heading-xl text-[#3A342A] text-xl text-[#B08D57] sm:text-2xl">
                    {stat.value}
                  </p>
                  <p className="eyebrow text-[#B08D57] mt-2 text-[0.6rem]">{stat.label}</p>
                </div>
              ))}
            </div>

            <p className="mt-8 text-sm leading-relaxed text-[#6F665A]">
              We offer diamonds from 0.001 carat to 10+ carats, with carefully
              selected stones available across a broad range of
              specifications. IGI and GIA certification is available for
              eligible diamonds, with certification applicable from 0.50 carat
              and above, subject to the individual stone and certification
              requirements.
            </p>
          </Reveal>
        </div>
      </Section>

      {/* NATURAL + LAB GROWN */}
      <Section>
        <Reveal className="mx-auto max-w-3xl text-center">
          <p className="eyebrow text-[#B08D57]">Our Diamond Portfolio</p>
          <h2 className="heading-xl text-[#3A342A] mt-4 text-3xl sm:text-4xl">
            Natural &amp; Lab-Grown Diamonds
          </h2>
          <p className="mt-6 text-base leading-relaxed text-[#6F665A]">
            Belliza serves customers looking for both natural diamonds and
            laboratory-grown diamonds, with options across a wide range of
            shapes, sizes, colours and qualities.
          </p>
        </Reveal>

        <StaggerGroup className="mt-12 grid gap-6 lg:grid-cols-2">
          <StaggerItem>
            <article className="lux-panel rounded-2xl border border-[#E5DED0] bg-[#F1EBDD] shadow-[0_4px_18px_rgba(0,0,0,0.04)] h-full p-8">
              <h3 className="heading-xl text-[#3A342A] text-2xl">Natural Diamonds</h3>
              <p className="mt-4 text-sm leading-relaxed text-[#6F665A]">
                Natural diamonds are formed through geological processes deep
                within the Earth over extremely long periods of time. Each
                natural diamond has its own combination of characteristics,
                including carat weight, colour, clarity, cut and proportions.
              </p>
              <p className="mt-4 text-sm leading-relaxed text-[#6F665A]">
                Belliza can source natural diamonds according to specific
                shape, size, colour, clarity, certification and budget
                requirements.
              </p>
            </article>
          </StaggerItem>
          <StaggerItem>
            <article className="lux-panel rounded-2xl border border-[#E5DED0] bg-[#F1EBDD] shadow-[0_4px_18px_rgba(0,0,0,0.04)] h-full p-8">
              <h3 className="heading-xl text-[#3A342A] text-2xl">Lab-Grown Diamonds</h3>
              <p className="mt-4 text-sm leading-relaxed text-[#6F665A]">
                Lab-grown diamonds are diamond material created using
                controlled technological processes. Belliza works with CVD and
                HPHT laboratory-grown diamond technologies.
              </p>
              <p className="mt-4 text-sm leading-relaxed text-[#6F665A]">
                Available options include white diamonds, fancy-colour
                diamonds, and larger stones, subject to inventory and specific
                requirements.
              </p>
            </article>
          </StaggerItem>
        </StaggerGroup>
      </Section>

      {/* JEWELLERY MANUFACTURING */}
      <Section className="border-y border-[#E5DED0] bg-[#F8F6F1]">
        <Reveal className="mx-auto max-w-3xl text-center">
          <p className="eyebrow text-[#B08D57]">Jewellery Manufacturing</p>
          <h2 className="heading-xl text-[#3A342A] mt-4 text-3xl sm:text-4xl">
            From Diamond to Finished Jewellery
          </h2>
          <p className="mt-6 text-base leading-relaxed text-[#6F665A]">
            Belliza combines diamond expertise with jewellery manufacturing to
            help transform diamonds and design concepts into finished
            jewellery.
          </p>
          <p className="mt-4 text-base leading-relaxed text-[#6F665A]">
            We support custom jewellery projects and professional jewellery
            manufacturing requirements, from design development and CAD to
            production, diamond setting, finishing and quality control,
            subject to the specific project and manufacturing requirements.
          </p>
        </Reveal>

        <Reveal className="mt-14 text-center" delay={0.1}>
          <h3 className="heading-xl text-[#3A342A] text-2xl">
            Our Jewellery Manufacturing Process
          </h3>
        </Reveal>

        <StaggerGroup
          stagger={0.08}
          className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4"
        >
          {JEWELLERY_STEPS.map((step) => (
            <StaggerItem key={step.number}>
              <article className="spec-tile rounded-xl border border-[#E5DED0] bg-[#F1EBDD] transition-all duration-500 h-full p-6 hover:border-[#D8C08A]">
                <span className="heading-xl text-[#3A342A] text-3xl text-[#B08D57]">
                  {step.number}
                </span>
                <h4 className="heading-xl text-[#3A342A] mt-4 text-lg">{step.title}</h4>
                <p className="mt-3 text-sm leading-relaxed text-[#6F665A]">
                  {step.body}
                </p>
              </article>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </Section>

      {/* DESIGN & CAD */}
      <Section>
        <FeatureSplit
          image={IMG.bespokeJewellery}
          imageAlt="CAD jewellery design and modelling"
          title="Design, CAD & Model Development"
          body="Every creation begins with a clear design vision. From initial sketches and reference imagery to detailed CAD development, our team transforms concepts into precise, production-ready models. Each design is meticulously reviewed for proportions, dimensions, stone placement and structural integrity—ensuring every detail is refined before production begins."
        />
      </Section>

      {/* JEWELLERY TYPES */}
      <Section className="border-y border-[#E5DED0] bg-[#F8F6F1]">
        <Reveal className="mx-auto max-w-3xl text-center">
          <p className="eyebrow text-[#B08D57]">Fine Jewellery</p>
          <h2 className="heading-xl text-[#3A342A] mt-4 text-3xl sm:text-4xl">
            Jewellery for Every Occasion
          </h2>
          <p className="mt-6 text-base leading-relaxed text-[#6F665A]">
            Our jewellery manufacturing capabilities can support a variety of
            classic, contemporary and bespoke jewellery designs.
          </p>
        </Reveal>

        <StaggerGroup
          stagger={0.05}
          className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4"
        >
          {JEWELLERY_TYPES.map((item) => (
            <StaggerItem key={item}>
              <div className="spec-tile rounded-xl border border-[#E5DED0] bg-[#F1EBDD] transition-all duration-500 p-5 text-center text-sm font-medium hover:border-[#D8C08A]">
                {item}
              </div>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </Section>

      {/* CUSTOM JEWELLERY + B2B */}
      <Section>
        <StaggerGroup className="grid gap-6 lg:grid-cols-2">
          <StaggerItem>
            <article className="lux-panel rounded-2xl border border-[#E5DED0] bg-[#F1EBDD] shadow-[0_4px_18px_rgba(0,0,0,0.04)] h-full p-8">
              <p className="eyebrow text-[#B08D57]">Custom Jewellery</p>
              <h3 className="heading-xl text-[#3A342A] mt-3 text-2xl">
                Jewellery Built Around Your Vision
              </h3>
              <p className="mt-4 text-sm leading-relaxed text-[#6F665A]">
                Whether you have a sketch, reference photograph, CAD file or
                simply an idea, our team can help develop the concept into a
                production-ready jewellery design.
              </p>
              <ul className="mt-6 flex flex-wrap gap-2">
                {[
                  "Engagement Rings",
                  "Wedding Rings",
                  "Earrings",
                  "Pendants",
                  "Necklaces",
                  "Bracelets",
                  "Bangles",
                  "Custom Designs",
                ].map((item) => (
                  <li
                    key={item}
                    className="rounded-full border border-[#E5DED0] px-3 py-1 text-xs text-[#6F665A]"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </article>
          </StaggerItem>

          <StaggerItem>
            <article className="lux-panel rounded-2xl border border-[#E5DED0] bg-[#F1EBDD] shadow-[0_4px_18px_rgba(0,0,0,0.04)] h-full p-8">
              <p className="eyebrow text-[#B08D57]">B2B Manufacturing</p>
              <h3 className="heading-xl text-[#3A342A] mt-3 text-2xl">
                Manufacturing for Jewellery Businesses
              </h3>
              <p className="mt-4 text-sm leading-relaxed text-[#6F665A]">
                Belliza can support jewellery brands, retailers, designers and
                professional buyers looking for custom jewellery
                manufacturing, diamond sourcing and production support.
              </p>
              <ul className="mt-6 flex flex-wrap gap-2">
                {[
                  "Private Label Jewellery",
                  "Custom Jewellery Collections",
                  "Diamond Jewellery Manufacturing",
                  "Wholesale Jewellery",
                  "Small-Batch Production",
                  "Bespoke Jewellery",
                ].map((item) => (
                  <li
                    key={item}
                    className="rounded-full border border-[#E5DED0] px-3 py-1 text-xs text-[#6F665A]"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </article>
          </StaggerItem>
        </StaggerGroup>
      </Section>

      {/* PRECIOUS METALS */}
      <Section className="border-y border-[#E5DED0] bg-[#F8F6F1]">
        <Reveal className="mx-auto max-w-3xl text-center">
          <p className="eyebrow text-[#B08D57]">Precious Metals</p>
          <h2 className="heading-xl text-[#3A342A] mt-4 text-3xl sm:text-4xl">
            Jewellery in Your Preferred Metal
          </h2>
          <p className="mt-6 text-base leading-relaxed text-[#6F665A]">
            Jewellery can be developed according to the selected precious
            metal, design requirements and production specifications.
          </p>
        </Reveal>

        <StaggerGroup className="mt-12 grid gap-6 sm:grid-cols-3">
          {["Silver", "Gold", "Platinum"].map((metal) => (
            <StaggerItem key={metal}>
              <article className="spec-tile rounded-xl border border-[#E5DED0] bg-[#F1EBDD] transition-all duration-500 h-full p-8 text-center hover:border-[#D8C08A]">
                <h3 className="heading-xl text-[#3A342A] text-2xl text-[#B08D57]">
                  {metal}
                </h3>
                <p className="mt-4 text-sm leading-relaxed text-[#6F665A]">
                  Available according to design, purity, production and
                  project requirements.
                </p>
              </article>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </Section>

      {/* CERTIFICATION */}
      <Section>
        <Reveal className="mx-auto max-w-3xl text-center">
          <p className="eyebrow text-[#B08D57]">Belliza Certification</p>
          <h2 className="heading-xl text-[#3A342A] mt-4 text-3xl sm:text-4xl">
            Certified Diamonds & Jewellery — Authenticity, quality and complete documentation for every piece
          </h2>
          <p className="mt-6 text-base leading-relaxed text-[#6F665A]">
            We provide comprehensive certification and documentation for both diamonds and fine jewellery. Where applicable, individual stones and finished pieces may be submitted to internationally recognised gemological laboratories, including IGI (International Gemological Institute) and GIA (Gemological Institute of America), for independent grading and certification. Each report documents the relevant quality characteristics, specifications and identity of the piece, providing transparency, confidence and assurance at every stage.
          </p>
        </Reveal>

        <StaggerGroup className="mx-auto mt-12 grid max-w-4xl gap-6 lg:grid-cols-2">
          <StaggerItem>
            <article className="lux-panel rounded-2xl border border-[#E5DED0] bg-[#F1EBDD] shadow-[0_4px_18px_rgba(0,0,0,0.04)] h-full p-8">
              <h3 className="heading-xl text-[#3A342A] text-xl">Diamond Specifications</h3>
              <p className="mt-4 text-sm leading-relaxed text-[#6F665A]">
                Review available information such as carat weight, colour,
                clarity, measurements and applicable grading characteristics.
              </p>
            </article>
          </StaggerItem>
          <StaggerItem>
            <article className="lux-panel rounded-2xl border border-[#E5DED0] bg-[#F1EBDD] shadow-[0_4px_18px_rgba(0,0,0,0.04)] h-full p-8">
              <h3 className="heading-xl text-[#3A342A] text-xl">Jewelry Specifications</h3>
              <p className="mt-4 text-sm leading-relaxed text-[#6F665A]">
                Access verified certification and documentation for each jewellery piece, including key details on materials, gemstones and specifications.
              </p>
            </article>
          </StaggerItem>
        </StaggerGroup>
      </Section>

      {/* B2B JEWELLERY MANUFACTURING */}
      <Section className="border-y border-[#E5DED0] bg-[#F8F6F1]">
        <Reveal className="mx-auto max-w-3xl text-center">
          <p className="eyebrow text-[#B08D57]">Fine Jewellery Manufacturing</p>
          <h2 className="heading-xl text-[#3A342A] mt-4 text-3xl sm:text-4xl">
            Crafted for Brands That Demand Excellence
          </h2>
          <p className="mt-6 text-base leading-relaxed text-[#6F665A]">
            From diamonds to finished jewellery, Belliza provides end-to-end manufacturing solutions for global jewellery brands, retailers and designers. Combining precision, craftsmanship and responsible sourcing, we transform concepts into refined jewellery created to meet exacting international standards.
          </p>
        </Reveal>

        <StaggerGroup className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {B2B_ITEMS.map((item) => (
            <StaggerItem key={item.title}>
              <article className="spec-tile rounded-xl border border-[#E5DED0] bg-[#F1EBDD] transition-all duration-500 h-full p-7 hover:border-[#D8C08A]">
                <h3 className="heading-xl text-[#3A342A] text-lg">{item.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-[#6F665A]">
                  {item.body}
                </p>
              </article>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </Section>

      {/* FAQ */}
      <Section>
        <Reveal className="mx-auto max-w-3xl text-center">
          <p className="eyebrow text-[#B08D57]">Frequently Asked Questions</p>
          <h2 className="heading-xl text-[#3A342A] mt-4 text-3xl sm:text-4xl">
            Diamond &amp; Jewellery Manufacturing FAQs
          </h2>
        </Reveal>

        <Reveal delay={0.1} className="mx-auto mt-12 max-w-3xl">
          <Accordion type="single" collapsible className="w-full">
            {FAQS.map((faq, i) => (
              <AccordionItem key={faq.question} value={`faq-${i}`}>
                <AccordionTrigger className="text-left text-base">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-sm leading-relaxed text-[#6F665A]">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Reveal>
      </Section>

      {/* FINAL CTA */}
      <Section className="border-t border-[#E5DED0]">
        <Reveal className="lux-panel rounded-2xl border border-[#E5DED0] bg-[#F1EBDD] shadow-[0_4px_18px_rgba(0,0,0,0.04)] mx-auto max-w-4xl p-10 text-center lux-shadow sm:p-14">
          <p className="eyebrow text-[#B08D57]">Join With Belliza Family</p>
          <h2 className="heading-xl text-[#3A342A] mt-4 text-3xl sm:text-4xl">
           Let’s Create Something Exceptional With Belliza
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-[#6F665A]">
            Whether you are sourcing a specific diamond, developing a bespoke jewellery collection or seeking a trusted manufacturing partner, Belliza works with brands, designers, retailers and professional buyers worldwide.
            Share your requirements — from diamond shape, carat, colour and clarity to certification, design and manufacturing specifications. Our team will help develop the right solution with precision, discretion and attention to detail.
          </p>
          <Button asChild size="lg" className="mt-8 hover-scale">
            <Link to="/contact">Connect With Belliza</Link>
          </Button>
        </Reveal>
      </Section>
    </>
  );
}