import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { ALLIANCES, IMG } from "@/lib/site-data";
import { Section } from "@/components/site/Sections";

// Belliza luxury palette:
// Ivory #F8F6F1 · Warm White #FCFBF8 · Champagne Gold #B08D57
// Deep Brown #332E27 · Muted Taupe #756E63 · Sand #EFE9DE
// Soft Border #E5DED0 · Warm Panel #F3EFE7
import {
  Reveal,
  StaggerGroup,
  StaggerItem,
  WordsReveal,
} from "@/components/site/Motion";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      {
        title: "Belliza Gems & Jewels | Lab-Grown CVD & HPHT Diamond Manufacturer",
      },
      {
        name: "description",
        content:
          "Belliza Gems & Jewels is a direct manufacturer of precision-engineered CVD & HPHT lab-grown diamonds, from calibrated melee to 50ct+ certified stones.",
      },
      {
        property: "og:title",
        content: "Belliza Gems & Jewels | Lab-Grown Diamond Manufacturer",
      },
      {
        property: "og:description",
        content:
          "A global leader in advanced CVD & HPHT manufacturing, powering the world's most trusted jewellery partners.",
      },
      { property: "og:image", content: IMG.hero },
      { name: "twitter:image", content: IMG.hero },
    ],
  }),
  component: Home,
});

const PILLARS = [
  {
    title: "Direct Manufacturer",
    body: "From seed to stone. We are the source. Our state-of-the-art facility in Surat controls every step, ensuring unparalleled quality and supply chain integrity.",
  },
  {
    title: "Unmatched Capability",
    body: "From precision-calibrated melee to 50ct+ certified stones. Our mastery of both CVD and HPHT delivers a vast, consistent inventory of DEF white, fancy colors, and custom-cut diamonds.",
  },
  {
    title: "Global B2B Partner",
    body: "With primary manufacturing in India and a key logistics hub in Mumbai, we provide seamless, reliable service to jewellery professionals worldwide.",
  },
];

const TESTIMONIALS = [
  {
    quote:
      "Belliza's consistency and quality are unmatched. Their calibrated melee has saved us countless hours in production, allowing us to scale our most intricate designs.",
    name: "Eleonore Dubois",
    role: "Head of Production, Atelier Bijoux, Paris",
    avatar:
      "https://images.unsplash.com/photo-1652471943570-f3590a4e52ed?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw2fHxwcm9mZXNzaW9uYWwlMjBoZWFkc2hvdHxlbnwwfHx8fDE3NjE3ODM0OTl8MA&ixlib=rb-4.1.0&q=80&w=1080",
  },
  {
    quote:
      "Working with Belliza is a true partnership. They understand our need for unique, high-quality stones and have been instrumental in developing our latest collection.",
    name: "Kenji Tanaka",
    role: "Lead Designer, Tanaka Fine Jewellery, Tokyo",
    avatar:
      "https://images.unsplash.com/photo-1560250097-0b93528c311a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBoZWFkc2hvdHxlbnwwfHx8fDE3NjE3ODM0OTl8MA&ixlib=rb-4.1.0&q=80&w=1080",
  },
  {
    quote:
      "The reliability of their supply chain is critical for our business. With their Mumbai hub, we get our orders on time, every time, without any surprises.",
    name: "Isabella Rossi",
    role: "CEO, Rossi Diamonds, New York",
    avatar:
      "https://images.unsplash.com/photo-1595211877493-41a4e5f236b3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw5fHxwcm9mZXNzaW9uYWwlMjBoZWFkc2hvdHxlbnwwfHx8fDE3NjE3ODM0OTl8MA&ixlib=rb-4.1.0&q=80&w=1080",
  },
];

function Home() {
  const heroRef = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "22%"]);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1.1, 1.24]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, -70]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <>
 
 {/* =========================================================
    SECTION 01  — HERO 
========================================================= */}


<section
  ref={heroRef}
  className="relative flex min-h-screen items-center justify-center overflow-hidden px-6"
>
  {/* HERO BACKGROUND */}
  <motion.img
    src={IMG.hero}
    alt="Belliza diamonds and fine jewellery"
    style={{ y: bgY, scale: bgScale }}
    className="absolute inset-0 h-full w-full object-cover"
  />

  {/* LUXURY OVERLAY */}
  <motion.div
    className="absolute inset-0 bg-[#F8F6F1]/72"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 1.2 }}
  />

  {/* HERO CONTENT */}
  <motion.div
    style={{ y: contentY, opacity: contentOpacity }}
    className="relative mx-auto max-w-5xl text-center"
  >

    {/* MAIN HEADING */}
    <h1 className="heading-xl mt-6 text-4xl sm:text-6xl lg:text-7xl">
      <WordsReveal text="Exceptional Diamonds. Fine Jewellery. From the Source." />
    </h1>

    {/* PRIMARY DESCRIPTION */}
    <motion.p
      className="mx-auto mt-8 max-w-3xl text-base leading-relaxed text-[#4A443B]/85 sm:text-lg"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.9,
        delay: 0.7,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
     Belliza delivers exceptional diamonds and jewellery through precision craftsmanship, global sourcing, and international partnerships.
    </motion.p>

    {/* SECONDARY DESCRIPTION */}
    <motion.p
      className="mx-auto mt-5 max-w-2xl text-sm leading-relaxed text-[#5F584E] sm:text-base"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.9,
        delay: 0.9,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      From the first cut to the final creation, every piece is guided by
      precision, quality, transparency, and craftsmanship.
    </motion.p>

{/* CTA BUTTONS */}
    <motion.div
      className="mt-9 flex flex-wrap items-center justify-center gap-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.9,
        delay: 1.1,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      <Link
        to="/products"
        className="inline-block rounded-full border border-[#E5DED0] px-7 py-3 text-sm font-medium text-[#332E27] transition-all duration-300 hover:scale-[1.03] hover:bg-[#EFE9DE]"
      >
        Explore Diamonds
      </Link>

      <Link
         to="/products"
        className="inline-block rounded-full border border-[#E5DED0] px-7 py-3 text-sm font-medium text-[#332E27] transition-all duration-300 hover:scale-[1.03] hover:bg-[#EFE9DE]"
      >
        Explore Jewellery
      </Link>
    </motion.div>

 {/* EYEBROW */}
{/* EYEBROW */}
      <motion.p
      className="mt-8 text-xs font-medium uppercase tracking-[0.28em] text-[#B08D57] sm:mt-16 sm:text-sm"
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.2 }}
    >
      The Source Behind Exceptional Diamonds &amp; Jewellery
    </motion.p>
  </motion.div>

  {/* SCROLL INDICATOR */}
  <motion.div
    className="absolute bottom-10 left-1/2 h-12 w-[1px] -translate-x-1/2 bg-gradient-to-b from-transparent via-foreground/50 to-transparent"
    animate={{
      opacity: [0.2, 1, 0.2],
      scaleY: [0.6, 1, 0.6],
    }}
    transition={{
      duration: 2.4,
      repeat: Infinity,
      ease: "easeInOut",
    }}
  />
</section>



{/* =========================================================
    SECTION 02 — WHO WE SERVE
========================================================= */}

<Section className="border-y border-[#E5DED0] bg-[#F3EFE7]">
  <Reveal className="mx-auto max-w-5xl text-center">

    {/* HEADING */}
    <h2 className="heading-xl text-3xl sm:text-5xl lg:text-6xl">
      One Source. Every Customer.
    </h2>

    {/* DESCRIPTION */}
    <p className="mx-auto mt-5 max-w-3xl text-base leading-relaxed text-[#756E63] sm:text-lg">
      From a single diamond to larger business requirements, Belliza provides
      trusted sourcing, manufacturing, and jewellery solutions for customers
      across the global diamond and jewellery industry.
    </p>
  </Reveal>

  {/* CUSTOMER TYPES */}
  <StaggerGroup className="mx-auto mt-10 grid max-w-6xl gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {[
      {
        title: "B2B Brands",
        subtitle: "BRANDS",
        description:
          "Reliable diamond and jewellery supply for established and emerging brands seeking quality, consistency, and scalable solutions.",
      },
      {
        title: "B2C Customers",
        subtitle: "INDIVIDUALS",
        description:
          "Exceptional diamonds and fine jewellery for individual customers seeking quality, craftsmanship, and a trusted source.",
      },
      {
        title: "Traders & Retailers",
        subtitle: "TRADE",
        description:
          "Flexible sourcing and dependable supply for diamond traders, retailers, and businesses serving diverse customer requirements.",
      },
      {
        title: "Jewellers & Designers",
        subtitle: "CREATIVE PARTNERS",
        description:
          "Precision diamonds, bespoke sourcing, and jewellery solutions designed to support distinctive collections and creations.",
      },
    ].map((item, index) => (
    <StaggerItem
  key={item.title}
  className="group rounded-2xl border border-[#E5DED0] bg-[#FCFBF8] px-6 py-7 text-center transition-all duration-500 hover:-translate-y-1 hover:border-[#B08D57]/50 hover:bg-[#B08D57]/5 hover:shadow-[0_12px_40px_rgba(0,0,0,0.06)] sm:px-7 sm:py-8"
>
        {/* CATEGORY */}
        <p className="mt-3 text-[9px] font-medium uppercase tracking-[0.2em] text-[#756E63]">
          {item.subtitle}
        </p>

        {/* TITLE */}
        <h3 className="heading-xl mt-2 text-xl sm:text-2xl">
          {item.title}
        </h3>

        {/* DESCRIPTION */}
        <p className="mt-3 text-sm leading-6 text-[#756E63]">
          {item.description}
        </p>
      </StaggerItem>
    ))}
  </StaggerGroup>

  {/* BOTTOM STATEMENT */}
  <Reveal className="mx-auto mt-8 max-w-3xl text-center">
    <p className="text-xs font-medium uppercase tracking-[0.16em] text-[#756E63] sm:text-sm">
      One Source · Multiple Markets · Global Possibilities
    </p>
  </Reveal>
</Section>


{/* =========================================================
    SECTION 03 — WHAT WE OFFER
========================================================= */}

<Section>
  <Reveal className="mx-auto max-w-5xl text-center">

    {/* EYEBROW */}
    <p className="text-xs font-medium uppercase tracking-[0.28em] text-[#B08D57] sm:text-sm">
      What We Offer
    </p>

    {/* HEADING */}
    <h2 className="heading-xl mt-5 text-3xl sm:text-5xl lg:text-6xl">
      One Source. Three Ways to Create.
    </h2>

    {/* DESCRIPTION */}
    <p className="mx-auto mt-5 max-w-3xl text-base leading-relaxed text-[#756E63] sm:text-lg">
      From precision-manufactured diamonds to finished jewellery and
      tailored production, Belliza brings sourcing, technology, and
      craftsmanship together under one global platform.
    </p>
  </Reveal>

  {/* OFFER CARDS */}
  <StaggerGroup className="mx-auto mt-10 grid max-w-6xl gap-4 md:grid-cols-3">

    {/* DIAMONDS */}
    <StaggerItem
      className="group rounded-2xl border border-[#E5DED0] bg-[#FCFBF8] p-7 transition-all duration-500 hover:-translate-y-1 hover:border-[#B08D57]/50 hover:bg-[#B08D57]/5 hover:shadow-[0_12px_40px_rgba(0,0,0,0.06)] sm:p-8"
    >
      <div className="flex items-center justify-between">
        <span className="text-xs uppercase tracking-[0.18em] text-[#756E63]">
          Source
        </span>
      </div>

      <h3 className="heading-xl mt-8 text-2xl sm:text-3xl">
        Diamonds
      </h3>

      <p className="mt-3 text-sm leading-relaxed text-[#756E63]">
        Precision-manufactured diamonds for jewellery brands, traders,
        retailers, and individual requirements.
      </p>

      <div className="mt-7 space-y-2 border-t border-[#E5DED0] pt-5 text-left">
        <p className="text-sm">Lab-Grown Diamonds</p>
        <p className="text-sm">Real Diamonds</p>
        <p className="text-sm">Loose Diamonds</p>
        <p className="text-sm">Certified Stones</p> 
        <p className="text-sm">BELLIZA SIGNATURE CRAFT DIAMONDS</p>
      </div>
    </StaggerItem>

    {/* JEWELLERY */}
    <StaggerItem
      className="group rounded-2xl border border-[#E5DED0] bg-[#FCFBF8] p-7 transition-all duration-500 hover:-translate-y-1 hover:border-[#B08D57]/50 hover:bg-[#B08D57]/5 hover:shadow-[0_12px_40px_rgba(0,0,0,0.06)] sm:p-8"
    >
      <div className="flex items-center justify-between">

        <span className="text-xs uppercase tracking-[0.18em] text-[#756E63]">
          Craft
        </span>
      </div>

      <h3 className="heading-xl mt-8 text-2xl sm:text-3xl">
        Jewellery
      </h3>

      <p className="mt-3 text-sm leading-relaxed text-[#756E63]">
        Fine jewellery created with carefully selected diamonds,
        refined craftsmanship, and attention to detail.
      </p>

      <div className="mt-7 space-y-2 border-t border-[#E5DED0] pt-5 text-left">
        <p className="text-sm">Rings</p>
        <p className="text-sm">Earrings</p>
        <p className="text-sm">Pendants</p>
        <p className="text-sm">Bracelets</p>
         <p className="text-sm">BELLIZA SIGNATURE CRAFT JEWELRY</p>
      </div>
    </StaggerItem>

    {/* CUSTOM ORDERS */}
    <StaggerItem
      className="group rounded-2xl border border-[#E5DED0] bg-[#FCFBF8] p-7 transition-all duration-500 hover:-translate-y-1 hover:border-[#B08D57]/50 hover:bg-[#B08D57]/5 hover:shadow-[0_12px_40px_rgba(0,0,0,0.06)] sm:p-8"
    >
      <div className="flex items-center justify-between"> 

        <span className="text-xs uppercase tracking-[0.18em] text-[#756E63]">
          Bespoke
        </span>
      </div>

      <h3 className="heading-xl mt-8 text-2xl sm:text-3xl">
        Custom Orders
      </h3>

      <p className="mt-3 text-sm leading-relaxed text-[#756E63]">
        From your concept to final production, we provide tailored
        sourcing and manufacturing solutions for unique requirements.
      </p>

      <div className="mt-7 space-y-2 border-t border-[#E5DED0] pt-5 text-left">
        <p className="text-sm">Your Design</p>
        <p className="text-sm">Our Supply</p>
        <p className="text-sm">Custom Specifications</p>
        <p className="text-sm">Production Support</p>
        <p className="text-sm">BELLIZA SIGNATURE CRAFT PEACES</p>
      </div>
    </StaggerItem>

  </StaggerGroup>
</Section>


{/* =========================================================
    SECTION 04 — TRUST & SCALE
========================================================= */}
<Section className="border-y border-border bg-background">

  {/* HEADER */}
  <Reveal className="mx-auto max-w-4xl text-center">

    <p className="text-xs font-medium uppercase tracking-[0.28em] text-[#B08D57] sm:text-sm">
      Trusted Partnership
    </p>

    <h2 className="heading-xl mt-5 text-3xl sm:text-5xl lg:text-6xl">
      Built on Trust. Driven by Precision.
    </h2>

    <p className="mx-auto mt-5 max-w-3xl text-base leading-relaxed text-muted-foreground sm:text-lg">
      Belliza brings advanced technology, manufacturing expertise, quality
      control, and responsive service together to create dependable
      diamond and jewellery partnerships worldwide.
    </p>

  </Reveal>


  {/* TRUST FEATURES */}
  <StaggerGroup className="mx-auto mt-12 grid max-w-6xl gap-4 md:grid-cols-2 lg:grid-cols-3">

    {/* 01 */}
    <StaggerItem
      className="group rounded-2xl border border-border bg-background p-7 transition-all duration-500 hover:-translate-y-1 hover:border-[#B08D57]/50 hover:bg-[#F8F6F1] hover:shadow-[0_16px_45px_rgba(0,0,0,0.06)] sm:p-8"
    >
      <div className="flex h-10 w-10 items-center justify-center rounded-full border border-[#B08D57]/40 text-[#B08D57]">
        <span className="text-sm">✦</span>
      </div>

      <h3 className="heading-xl mt-6 text-xl sm:text-2xl">
        Advanced Technology
      </h3>

      <p className="mt-3 text-sm leading-6 text-muted-foreground">
        Modern technology supports precision, consistency, efficiency, and
        controlled manufacturing across diamond and jewellery production.
      </p>
    </StaggerItem>


    {/* 02 */}
    <StaggerItem
      className="group rounded-2xl border border-border bg-background p-7 transition-all duration-500 hover:-translate-y-1 hover:border-[#B08D57]/50 hover:bg-[#F8F6F1] hover:shadow-[0_16px_45px_rgba(0,0,0,0.06)] sm:p-8"
    >
      <div className="flex h-10 w-10 items-center justify-center rounded-full border border-[#B08D57]/40 text-[#B08D57]">
        <span className="text-sm">◇</span>
      </div>

      <h3 className="heading-xl mt-6 text-xl sm:text-2xl">
        Precision &amp; Quality
      </h3>

      <p className="mt-3 text-sm leading-6 text-muted-foreground">
        Every requirement is approached with attention to specifications,
        finishing, consistency, and quality throughout the process.
      </p>
    </StaggerItem>


    {/* 03 */}
    <StaggerItem
      className="group rounded-2xl border border-border bg-background p-7 transition-all duration-500 hover:-translate-y-1 hover:border-[#B08D57]/50 hover:bg-[#F8F6F1] hover:shadow-[0_16px_45px_rgba(0,0,0,0.06)] sm:p-8"
    >
      <div className="flex h-10 w-10 items-center justify-center rounded-full border border-[#B08D57]/40 text-[#B08D57]">
        <span className="text-sm">◌</span>
      </div>

      <h3 className="heading-xl mt-6 text-xl sm:text-2xl">
        Transparent Sourcing
      </h3>

      <p className="mt-3 text-sm leading-6 text-muted-foreground">
        Clear communication and specification-led sourcing help customers
        make confident decisions for every diamond and jewellery requirement.
      </p>
    </StaggerItem>


    {/* 04 */}
    <StaggerItem
      className="group rounded-2xl border border-border bg-background p-7 transition-all duration-500 hover:-translate-y-1 hover:border-[#B08D57]/50 hover:bg-[#F8F6F1] hover:shadow-[0_16px_45px_rgba(0,0,0,0.06)] sm:p-8"
    >
      <div className="flex h-10 w-10 items-center justify-center rounded-full border border-[#B08D57]/40 text-[#B08D57]">
        <span className="text-sm">↗</span>
      </div>

      <h3 className="heading-xl mt-6 text-xl sm:text-2xl">
        Global Reach
      </h3>

      <p className="mt-3 text-sm leading-6 text-muted-foreground">
        Supporting brands, businesses, traders, jewellers, and customers
        across international diamond and jewellery markets.
      </p>
    </StaggerItem>


    {/* 05 */}
    <StaggerItem
      className="group rounded-2xl border border-border bg-background p-7 transition-all duration-500 hover:-translate-y-1 hover:border-[#B08D57]/50 hover:bg-[#F8F6F1] hover:shadow-[0_16px_45px_rgba(0,0,0,0.06)] sm:p-8"
    >
      <div className="flex h-10 w-10 items-center justify-center rounded-full border border-[#B08D57]/40 text-[#B08D57]">
        <span className="text-sm">+</span>
      </div>

      <h3 className="heading-xl mt-6 text-xl sm:text-2xl">
        Flexible Solutions
      </h3>

      <p className="mt-3 text-sm leading-6 text-muted-foreground">
        From individual stones to larger requirements, Belliza adapts its
        sourcing and production approach to different customer needs.
      </p>
    </StaggerItem>


    {/* 06 */}
    <StaggerItem
      className="group rounded-2xl border border-border bg-background p-7 transition-all duration-500 hover:-translate-y-1 hover:border-[#B08D57]/50 hover:bg-[#F8F6F1] hover:shadow-[0_16px_45px_rgba(0,0,0,0.06)] sm:p-8"
    >
      <div className="flex h-10 w-10 items-center justify-center rounded-full border border-[#B08D57]/40 text-[#B08D57]">
        <span className="text-sm">∞</span>
      </div>

      <h3 className="heading-xl mt-6 text-xl sm:text-2xl">
        Long-Term Partnership
      </h3>

      <p className="mt-3 text-sm leading-6 text-muted-foreground">
        We focus on dependable service, consistent communication, and
        relationships designed to grow with our customers.
      </p>
    </StaggerItem>

  </StaggerGroup>

</Section>


{/* =========================================================
    SECTION 05 — CUSTOMER TRUST
========================================================= */}
<Section className="border-y border-border bg-[#F8F6F1]">

  {/* HEADER */}
  <Reveal className="mx-auto max-w-4xl text-center">

    <p className="text-xs font-medium uppercase tracking-[0.28em] text-[#B08D57] sm:text-sm">
      06 · Customer Trust
    </p>

    <h2 className="heading-xl mt-5 text-3xl sm:text-5xl lg:text-6xl">
      A Source You Can Trust.
    </h2>

    <p className="mx-auto mt-5 max-w-3xl text-base leading-relaxed text-[#5F584E] sm:text-lg">
      Every Belliza relationship is built on transparency, clear communication,
      verifiable information, and dependable service—from your first enquiry
      to final delivery.
    </p>

  </Reveal>


  {/* TRUST CARDS */}
  <StaggerGroup className="mx-auto mt-12 grid max-w-6xl gap-4 sm:grid-cols-2 lg:grid-cols-4">

    {/* BUSINESS TRANSPARENCY */}
    <StaggerItem
      className="group rounded-2xl border border-[#E5DED0] bg-white p-7 text-center transition-all duration-500 hover:-translate-y-1 hover:border-[#B08D57]/50 hover:bg-[#FBF8F2] hover:shadow-[0_16px_40px_rgba(0,0,0,0.06)]"
    >
      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full border border-[#B08D57]/40">
        <span className="text-lg text-[#B08D57]">✓</span>
      </div>

      <h3 className="mt-6 text-lg font-semibold">
        Verified Business
      </h3>

      <p className="mt-3 text-sm leading-6 text-muted-foreground">
        Clear business information and direct contact details give customers
        confidence in who they are dealing with.
      </p>
    </StaggerItem>


    {/* CERTIFICATION */}
    <StaggerItem
      className="group rounded-2xl border border-[#E5DED0] bg-white p-7 text-center transition-all duration-500 hover:-translate-y-1 hover:border-[#B08D57]/50 hover:bg-[#FBF8F2] hover:shadow-[0_16px_40px_rgba(0,0,0,0.06)]"
    >
      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full border border-[#B08D57]/40">
        <span className="text-lg text-[#B08D57]">◇</span>
      </div>

      <h3 className="mt-6 text-lg font-semibold">
        Diamond Certification
      </h3>

      <p className="mt-3 text-sm leading-6 text-muted-foreground">
        Applicable certified diamonds can be supplied with documentation
        supporting the stone's stated specifications.
      </p>
    </StaggerItem>


    {/* REAL COMMUNICATION */}
    <StaggerItem
      className="group rounded-2xl border border-[#E5DED0] bg-white p-7 text-center transition-all duration-500 hover:-translate-y-1 hover:border-[#B08D57]/50 hover:bg-[#FBF8F2] hover:shadow-[0_16px_40px_rgba(0,0,0,0.06)]"
    >
      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full border border-[#B08D57]/40">
        <span className="text-lg text-[#B08D57]">◌</span>
      </div>

      <h3 className="mt-6 text-lg font-semibold">
        Direct Communication
      </h3>

      <p className="mt-3 text-sm leading-6 text-muted-foreground">
        Speak directly with our team about specifications, sourcing,
        production, pricing, and delivery requirements.
      </p>
    </StaggerItem>


    {/* CUSTOMER SUPPORT */}
    <StaggerItem
      className="group rounded-2xl border border-[#E5DED0] bg-white p-7 text-center transition-all duration-500 hover:-translate-y-1 hover:border-[#B08D57]/50 hover:bg-[#FBF8F2] hover:shadow-[0_16px_40px_rgba(0,0,0,0.06)]"
    >
      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full border border-[#B08D57]/40">
        <span className="text-lg text-[#B08D57]">→</span>
      </div>

      <h3 className="mt-6 text-lg font-semibold">
        Customer Support
      </h3>

      <p className="mt-3 text-sm leading-6 text-muted-foreground">
        From enquiry to delivery, customers receive clear updates and
        support throughout their order journey.
      </p>
    </StaggerItem>

  </StaggerGroup>


  {/* TRUST CHECKLIST */}
  <Reveal className="mx-auto mt-10 max-w-5xl">

    <div className="rounded-2xl border border-[#E5DED0] bg-white px-6 py-7 sm:px-10">

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">

        <div className="flex items-center justify-center gap-3">
          <span className="text-[#B08D57]">✓</span>
          <span className="text-xs font-medium uppercase tracking-[0.12em]">
            Clear Specifications
          </span>
        </div>

        <div className="flex items-center justify-center gap-3">
          <span className="text-[#B08D57]">✓</span>
          <span className="text-xs font-medium uppercase tracking-[0.12em]">
            Transparent Communication
          </span>
        </div>

        <div className="flex items-center justify-center gap-3">
          <span className="text-[#B08D57]">✓</span>
          <span className="text-xs font-medium uppercase tracking-[0.12em]">
            Certification Available
          </span>
        </div>

        <div className="flex items-center justify-center gap-3">
          <span className="text-[#B08D57]">✓</span>
          <span className="text-xs font-medium uppercase tracking-[0.12em]">
            Global Customer Support
          </span>
        </div>

      </div>

    </div>

  </Reveal>


  {/* FINAL TRUST MESSAGE */}
  <Reveal className="mx-auto mt-10 max-w-3xl text-center">

    <p className="text-sm leading-7 text-[#5F584E] sm:text-base">
      <span className="font-semibold text-[#332E27]">
        Your confidence matters.
      </span>{" "}
      We believe a strong jewellery partnership begins with transparency,
      continues with consistent service, and grows through trust.
    </p>

  </Reveal>

</Section>

{/* =========================================================
    SECTION 06 — Exceptional Diamonds. Refined Craftsmanship.
========================================================= */}

 <Section className="border-y border-[#E5DED0] bg-[#F6F2EA]">
        <Reveal className="mx-auto max-w-3xl text-center">
          <h2 className="heading-xl text-3xl sm:text-5xl">
            Exceptional Diamonds. Refined Craftsmanship.
          </h2>
          <p className="mt-6 text-base leading-relaxed text-[#756E63]">
          From sourcing to manufacturing, Belliza provides dependable diamond and jewellery solutions tailored to businesses globally.
          </p>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
            <motion.div
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 320, damping: 20 }}
            >
              <Link
                to="/manufacturing"
                className="inline-block rounded-full bg-[#B08D57] px-7 py-3 text-sm font-medium text-[#FFFDF8] transition-opacity hover:opacity-90"
              >
                Explore Our Manufacturing
              </Link>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 320, damping: 20 }}
            >
              <Link
                to="/products"
                className="inline-block rounded-full border border-[#E5DED0] px-7 py-3 text-sm font-medium text-[#332E27] transition-colors hover:bg-[#EFE9DE]"
              >
                Explore Our Craftsmanship
              </Link>
            </motion.div>
          </div>
        </Reveal>
      </Section>

{/* =========================================================
    SECTION 08 — WHY BELLIZA
========================================================= */}

<Section className="border-y border-[#E5DED0] bg-[#FCFBF8]">

  {/* HEADER */}
  <Reveal className="mx-auto max-w-5xl text-center">

    <p className="text-xs font-medium uppercase tracking-[0.28em] text-[#B08D57] sm:text-sm">
      Why Belliza
    </p>

    <h2 className="heading-xl mt-5 text-3xl sm:text-5xl lg:text-6xl">
      The Advantage of the Source.
    </h2>

    <p className="mx-auto mt-5 max-w-3xl text-base leading-relaxed text-[#756E63] sm:text-lg">
      Manufacturing expertise combined with flexible sourcing, quality
      control, and dependable service for individual and business
      requirements worldwide.
    </p>
  </Reveal>

  {/* ADVANTAGES */}
  <StaggerGroup className="mx-auto mt-12 grid max-w-6xl gap-4 sm:grid-cols-2 lg:grid-cols-3">

    {/* DIRECT MANUFACTURING */}
    <StaggerItem
      className="group rounded-2xl border border-[#E5DED0] bg-[#FCFBF8] p-7 transition-all duration-500 hover:-translate-y-1 hover:border-[#B08D57]/50 hover:bg-[#B08D57]/5 hover:shadow-[0_14px_40px_rgba(0,0,0,0.06)] sm:p-8"
    >
      <span className="text-2xl font-light text-[#B08D57]">01</span>

      <h3 className="heading-xl mt-6 text-xl sm:text-2xl">
        Direct Manufacturing
      </h3>

      <p className="mt-3 text-sm leading-6 text-[#756E63]">
        Direct access to manufacturing capabilities enables greater control
        over quality, specifications, production, and supply.
      </p>
    </StaggerItem>

    {/* FLEXIBLE SPECIFICATIONS */}
    <StaggerItem
      className="group rounded-2xl border border-[#E5DED0] bg-[#FCFBF8] p-7 transition-all duration-500 hover:-translate-y-1 hover:border-[#B08D57]/50 hover:bg-[#B08D57]/5 hover:shadow-[0_14px_40px_rgba(0,0,0,0.06)] sm:p-8"
    >
      <span className="text-2xl font-light text-[#B08D57]">02</span>

      <h3 className="heading-xl mt-6 text-xl sm:text-2xl">
        Flexible Specifications
      </h3>

      <p className="mt-3 text-sm leading-6 text-[#756E63]">
        From individual stones to larger requirements, specifications can be
        aligned with your product, design, and sourcing needs.
      </p>
    </StaggerItem>

    {/* QUALITY CONTROL */}
    <StaggerItem
      className="group rounded-2xl border border-[#E5DED0] bg-[#FCFBF8] p-7 transition-all duration-500 hover:-translate-y-1 hover:border-[#B08D57]/50 hover:bg-[#B08D57]/5 hover:shadow-[0_14px_40px_rgba(0,0,0,0.06)] sm:p-8"
    >
      <span className="text-2xl font-light text-[#B08D57]">03</span>

      <h3 className="heading-xl mt-6 text-xl sm:text-2xl">
        Quality Control
      </h3>

      <p className="mt-3 text-sm leading-6 text-[#756E63]">
        Attention to precision, consistency, finishing, and specifications
        helps maintain dependable quality across every requirement.
      </p>
    </StaggerItem>

    {/* GLOBAL SUPPLY */}
    <StaggerItem
      className="group rounded-2xl border border-[#E5DED0] bg-[#FCFBF8] p-7 transition-all duration-500 hover:-translate-y-1 hover:border-[#B08D57]/50 hover:bg-[#B08D57]/5 hover:shadow-[0_14px_40px_rgba(0,0,0,0.06)] sm:p-8"
    >
      <span className="text-2xl font-light text-[#B08D57]">04</span>

      <h3 className="heading-xl mt-6 text-xl sm:text-2xl">
        Global Supply
      </h3>

      <p className="mt-3 text-sm leading-6 text-[#756E63]">
        Supporting customers across international markets with dependable
        sourcing and supply solutions.
      </p>
    </StaggerItem>

    {/* RELIABLE SERVICE */}
    <StaggerItem
      className="group rounded-2xl border border-[#E5DED0] bg-[#FCFBF8] p-7 transition-all duration-500 hover:-translate-y-1 hover:border-[#B08D57]/50 hover:bg-[#B08D57]/5 hover:shadow-[0_14px_40px_rgba(0,0,0,0.06)] sm:p-8"
    >
      <span className="text-2xl font-light text-[#B08D57]">05</span>

      <h3 className="heading-xl mt-6 text-xl sm:text-2xl">
        Reliable Service
      </h3>

      <p className="mt-3 text-sm leading-6 text-[#756E63]">
        Clear communication, responsive support, and practical solutions
        throughout the sourcing and supply process.
      </p>
    </StaggerItem>

    {/* LONG-TERM PARTNERSHIP */}
    <StaggerItem
      className="group rounded-2xl border border-[#E5DED0] bg-[#FCFBF8] p-7 transition-all duration-500 hover:-translate-y-1 hover:border-[#B08D57]/50 hover:bg-[#B08D57]/5 hover:shadow-[0_14px_40px_rgba(0,0,0,0.06)] sm:p-8"
    >
      <span className="text-2xl font-light text-[#B08D57]">06</span>

      <h3 className="heading-xl mt-6 text-xl sm:text-2xl">
        Long-Term Partnership
      </h3>

      <p className="mt-3 text-sm leading-6 text-[#756E63]">
        Built around consistency, trust, transparent communication, and
        relationships designed to grow over time.
      </p>
    </StaggerItem>

  </StaggerGroup>

  {/* CLOSING STATEMENT */}
  <Reveal className="mx-auto mt-12 max-w-3xl text-center">

    <div className="mx-auto h-px w-16 bg-[#B08D57]/40" />

    <p className="mt-6 text-sm font-medium uppercase tracking-[0.18em] text-[#5F584E] sm:text-base">
     · Manufacturing Expertise · Flexible Sourcing · Global Partnership
    </p>

  </Reveal>

</Section>

{/* =========================================================
    SECTION 09 —     CLIENT STORIES / CUSTOMER REVIEWS
========================================================= */}

<Section className="border-y border-[#E5DED0] bg-[#F8F6F1]">

  {/* HEADER */}
  <Reveal className="mx-auto max-w-4xl text-center">

    <p className="text-xs font-medium uppercase tracking-[0.28em] text-[#B08D57] sm:text-sm">
      Client Stories
    </p>

    <h2 className="heading-xl mt-5 text-3xl sm:text-5xl lg:text-6xl">
      Trusted by Jewellery Professionals.
    </h2>

    <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-[#756E63] sm:text-lg">
      From diamond sourcing to finished jewellery, our clients choose
      Belliza for precision, reliability, and a dependable global supply
      partnership.
    </p>

  </Reveal>


  {/* REVIEWS + VIDEO */}
  <StaggerGroup className="mx-auto mt-12 grid max-w-7xl gap-5 lg:grid-cols-3">

    {/* REVIEW 01 */}
    <StaggerItem
      className="group flex flex-col rounded-2xl border border-[#E5DED0] bg-[#FCFBF8] p-7 transition-all duration-500 hover:-translate-y-1 hover:border-[#B08D57]/50 hover:shadow-[0_16px_45px_rgba(0,0,0,0.07)] sm:p-8"
    >

      {/* RATING */}
      <div className="flex items-center gap-1 text-[#B08D57]">
        <span>★</span>
        <span>★</span>
        <span>★</span>
        <span>★</span>
        <span>★</span>
      </div>

      {/* REVIEW */}
      <blockquote className="mt-6 text-base leading-7 text-[#403A32]/90">
        “Belliza has been a dependable sourcing partner for our diamond
        requirements. The consistency of quality, communication, and
        attention to specifications makes the process extremely smooth.”
      </blockquote>

      {/* CUSTOMER */}
      <div className="mt-auto flex items-center gap-4 border-t border-[#E5DED0] pt-7">

        <img
          src="/images/reviews/client-01.jpg"
          alt="Client testimonial"
          loading="lazy"
          className="h-12 w-12 rounded-full object-cover ring-1 ring-border"
        />

        <div>
          <p className="text-sm font-semibold">
            Client Name
          </p>

          <p className="mt-1 text-xs text-[#756E63]">
            Jewellery Brand · United Kingdom
          </p>
        </div>

      </div>

    </StaggerItem>


    {/* REVIEW 02 */}
    <StaggerItem
      className="group flex flex-col rounded-2xl border border-[#E5DED0] bg-[#FCFBF8] p-7 transition-all duration-500 hover:-translate-y-1 hover:border-[#B08D57]/50 hover:shadow-[0_16px_45px_rgba(0,0,0,0.07)] sm:p-8"
    >

      {/* RATING */}
      <div className="flex items-center gap-1 text-[#B08D57]">
        <span>★</span>
        <span>★</span>
        <span>★</span>
        <span>★</span>
        <span>★</span>
      </div>

      {/* REVIEW */}
      <blockquote className="mt-6 text-base leading-7 text-[#403A32]/90">
        “We value Belliza for their flexibility and ability to understand
        exact stone requirements. Their manufacturing expertise gives us
        confidence when working on demanding jewellery projects.”
      </blockquote>

      {/* CUSTOMER */}
      <div className="mt-auto flex items-center gap-4 border-t border-[#E5DED0] pt-7">

        <img
          src="/images/reviews/client-02.jpg"
          alt="Client testimonial"
          loading="lazy"
          className="h-12 w-12 rounded-full object-cover ring-1 ring-border"
        />

        <div>
          <p className="text-sm font-semibold">
            Client Name
          </p>

          <p className="mt-1 text-xs text-[#756E63]">
            Jewellery Designer · United States
          </p>
        </div>

      </div>

    </StaggerItem>


    {/* VIDEO TESTIMONIAL */}
    <StaggerItem
      className="group relative min-h-[360px] overflow-hidden rounded-2xl border border-[#E5DED0] bg-black"
    >

      {/* VIDEO */}
      <video
        className="absolute inset-0 h-full w-full object-cover"
        controls
        preload="metadata"
        poster="/images/reviews/video-poster.jpg"
      >
        <source
          src="/videos/client-testimonial.mp4"
          type="video/mp4"
        />
        Your browser does not support the video tag.
      </video>

      {/* OVERLAY LABEL */}
      <div className="pointer-events-none absolute left-5 top-5 rounded-full border border-white/20 bg-black/40 px-4 py-2 backdrop-blur-md">
        <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-white">
          Client Video
        </p>
      </div>

    </StaggerItem>

  </StaggerGroup>


  {/* SECOND ROW */}
  <StaggerGroup className="mx-auto mt-5 grid max-w-7xl gap-5 md:grid-cols-2">

    {/* REVIEW 03 */}
    <StaggerItem
      className="group rounded-2xl border border-[#E5DED0] bg-[#FCFBF8] p-7 transition-all duration-500 hover:-translate-y-1 hover:border-[#B08D57]/50 hover:shadow-[0_16px_45px_rgba(0,0,0,0.07)] sm:p-8"
    >

      <div className="flex items-center justify-between">

        <div className="flex items-center gap-1 text-[#B08D57]">
          <span>★</span>
          <span>★</span>
          <span>★</span>
          <span>★</span>
          <span>★</span>
        </div>

        <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-[#756E63]">
          Verified Client
        </span>

      </div>

      <blockquote className="mt-6 max-w-2xl text-base leading-7 text-[#403A32]/90">
        “What stands out about Belliza is the combination of manufacturing
        capability and personal service. We can discuss requirements
        directly and receive solutions that work for our business.”
      </blockquote>

      <div className="mt-7 flex items-center gap-4 border-t border-[#E5DED0] pt-6">

        <img
          src="/images/reviews/client-03.jpg"
          alt="Client testimonial"
          loading="lazy"
          className="h-12 w-12 rounded-full object-cover ring-1 ring-border"
        />

        <div>
          <p className="text-sm font-semibold">
            Client Name
          </p>

          <p className="mt-1 text-xs text-[#756E63]">
            Diamond Trader · India
          </p>
        </div>

      </div>

    </StaggerItem>


    {/* REVIEW 04 */}
    <StaggerItem
      className="group rounded-2xl border border-[#E5DED0] bg-[#FCFBF8] p-7 transition-all duration-500 hover:-translate-y-1 hover:border-[#B08D57]/50 hover:shadow-[0_16px_45px_rgba(0,0,0,0.07)] sm:p-8"
    >

      <div className="flex items-center justify-between">

        <div className="flex items-center gap-1 text-[#B08D57]">
          <span>★</span>
          <span>★</span>
          <span>★</span>
          <span>★</span>
          <span>★</span>
        </div>

        <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-[#756E63]">
          Client Experience
        </span>

      </div>

      <blockquote className="mt-6 max-w-2xl text-base leading-7 text-[#403A32]/90">
        “From the first enquiry through production and delivery, the Belliza
        team has been responsive and professional. Their ability to support
        both individual requirements and larger orders is valuable to us.”
      </blockquote>

      <div className="mt-7 flex items-center gap-4 border-t border-[#E5DED0] pt-6">

        <img
          src="/images/reviews/client-04.jpg"
          alt="Client testimonial"
          loading="lazy"
          className="h-12 w-12 rounded-full object-cover ring-1 ring-border"
        />

        <div>
          <p className="text-sm font-semibold">
            Client Name
          </p>

          <p className="mt-1 text-xs text-[#756E63]">
            Jewellery Retailer · Australia
          </p>
        </div>

      </div>

    </StaggerItem>

  </StaggerGroup>


  {/* BOTTOM STATEMENT */}
  <Reveal className="mx-auto mt-12 max-w-3xl text-center">

    <div className="mx-auto h-px w-12 bg-[#B08D57]/40" />

    <p className="mt-5 text-xs font-medium uppercase tracking-[0.2em] text-[#756E63] sm:text-sm">
      Trusted Relationships · Exceptional Service · Long-Term Partnerships
    </p>

  </Reveal>

</Section>


{/* =========================================================
    SECTION 09 —     Annoucebar line 
========================================================= */}

      <Section className="border-t border-[#E5DED0]">
        <Reveal className="text-center">
          <h2 className="heading-xl text-2xl sm:text-3xl">
            Our Alliances &amp; Memberships
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-sm leading-relaxed text-[#756E63]">
            We are proud to be associated with leading industry bodies,
            reinforcing our commitment to quality, ethics, and global trade.
          </p>
        </Reveal>
        <div className="mt-14 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
          <div className="flex w-max animate-marquee items-center gap-16">
            {[...ALLIANCES, ...ALLIANCES].map((a, i) => (
              <img
                key={`${a.name}-${i}`}
                src={a.src}
                alt={`${a.name} Logo`}
                loading="lazy"
                className="h-14 w-auto object-contain opacity-80 grayscale transition-all duration-500 hover:opacity-100 hover:grayscale-0"
              />
            ))}
          </div>
        </div>
      </Section>
    </>
  );
}
