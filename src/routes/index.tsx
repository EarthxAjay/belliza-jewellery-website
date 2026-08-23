import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { ALLIANCES, IMG } from "@/lib/site-data";
import { Section } from "@/components/site/Sections";
import {
  Truck,
  ShieldCheck,
  MessageCircle,
  Gem,
  RefreshCcw,
} from "lucide-react";

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
   FEATURED VIDEO — TOP
========================================================= */}

<section className="relative w-full overflow-hidden bg-black">
  <div className="relative aspect-video w-full">
    <video
      className="absolute inset-0 h-full w-full object-cover"
      autoPlay
      muted
      loop
      playsInline
      preload="auto"
      poster="/images/reviews/video-poster.jpg"
    >
      <source
        src={IMG.FEATURED_VIDEO}
        type="video/mp4"
      />
    </video>
  </div>
</section>
 {/* =========================================================
    SECTION   — HERO 
========================================================= */}


<section
  ref={heroRef}
  className="relative flex min-h-screen items-center justify-center overflow-hidden px-6"
>
  {/* HERO BACKGROUND */}
  {/* <motion.img
    src={IMG.hero}
    alt="Belliza diamonds and fine jewellery"
    style={{ y: bgY, scale: bgScale }}
    className="absolute inset-0 h-full w-full object-cover"
  /> */}

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
  {/* <motion.div
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
  /> */}
</section>


{/* .Explore part */}

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
    SECTION -     THE BELLIZA DIFFERENCE
========================================================= */}

<Section className="border-y border-[#E5DED0] bg-[#F3EFE7]">
  <Reveal className="mx-auto max-w-5xl text-center">

    {/* HEADING */}
    <h2 className="heading-xl text-3xl sm:text-5xl lg:text-6xl">
      THE BELLIZA DIFFERENCE
    </h2>

      <Reveal className="mx-auto mt-8 max-w-3xl text-center">
    <p className="text-xs font-medium uppercase tracking-[0.16em] text-[#756E63] sm:text-sm">
      One Source · Multiple Markets · Global Possibilities
    </p>
  </Reveal>

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
        title: "Direct Customers",
        subtitle: "INDIVIDUALS",
        description:
          "Exceptional diamonds and fine jewellery for individual customers seeking quality, craftsmanship, and a trusted source.",
      },
      {
        title: "B2B & B2C Brands",
        subtitle: "BRANDS",
        description:
          "Reliable diamond and jewellery supply for established and emerging brands seeking quality, consistency, and scalable solutions.",
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

  {/*STATEMENT */}

</Section>


{/* =========================================================
    SECTION  — WHAT WE OFFER
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
        <p className="text-sm">Women's jewelry</p>
        <p className="text-sm">Men's jewelry</p>
        <p className="text-sm">Diamonds jewelry</p>
        <p className="text-sm">All type jewelry</p>
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
    SECTION -    Expertise You Can Rely On
========================================================= */}


<Section className="border-y border-[#E5DED0] bg-white py-10 sm:py-12">

  {/* HEADER */}
  <Reveal className="mx-auto max-w-4xl text-center">
    <h2 className="heading-xl text-3xl sm:text-5xl lg:text-6xl">
      Expertise You Can Rely On
    </h2>
  </Reveal>

  {/* TRUST FEATURES */}
  <StaggerGroup className="mx-auto mt-10 grid max-w-7xl grid-cols-2 gap-y-10 sm:grid-cols-3 lg:grid-cols-5 lg:gap-4">

    {/* FREE SHIPPING & RETURNS */}
    <StaggerItem>
      <a
        href="/shipping-returns"
        className="group flex flex-col items-center text-center"
      >
        <div className="flex h-24 w-24 items-center justify-center rounded-full border border-[#E5DED0] bg-[#F8F6F1] transition-all duration-300 group-hover:-translate-y-1 group-hover:border-[#B08D57] group-hover:shadow-[0_8px_25px_rgba(0,0,0,0.08)]">
          <Truck className="h-11 w-11 text-[#332E27] transition-colors duration-300 group-hover:text-[#B08D57]" />
        </div>

        <p className="mt-7 text-sm font-medium uppercase tracking-wide text-[#332E27]">
          Free Shipping & Returns
        </p>
      </a>
    </StaggerItem>

    {/* FREE LIFETIME WARRANTY */}
    <StaggerItem>
      <a
        href="/warranty"
        className="group flex flex-col items-center text-center"
      >
        <div className="flex h-24 w-24 items-center justify-center rounded-full border border-[#E5DED0] bg-[#F8F6F1] transition-all duration-300 group-hover:-translate-y-1 group-hover:border-[#B08D57] group-hover:shadow-[0_8px_25px_rgba(0,0,0,0.08)]">
          <ShieldCheck className="h-11 w-11 text-[#332E27] transition-colors duration-300 group-hover:text-[#B08D57]" />
        </div>

        <p className="mt-7 text-sm font-medium uppercase tracking-wide text-[#332E27]">
          Free Lifetime Warranty
        </p>
      </a>
    </StaggerItem>

    {/* 24/7 CUSTOMER SUPPORT */}
    <StaggerItem>
      <a
        href="/contact"
        className="group flex flex-col items-center text-center"
      >
        <div className="flex h-24 w-24 items-center justify-center rounded-full border border-[#E5DED0] bg-[#F8F6F1] transition-all duration-300 group-hover:-translate-y-1 group-hover:border-[#B08D57] group-hover:shadow-[0_8px_25px_rgba(0,0,0,0.08)]">
          <MessageCircle className="h-11 w-11 text-[#332E27] transition-colors duration-300 group-hover:text-[#B08D57]" />
        </div>

        <p className="mt-7 text-sm font-medium uppercase tracking-wide text-[#332E27]">
          24/7 Customer Support
        </p>
      </a>
    </StaggerItem>

    {/* LIFETIME DIAMOND UPGRADE */}
    <StaggerItem>
      <a
        href="/diamond-upgrade"
        className="group flex flex-col items-center text-center"
      >
        <div className="flex h-24 w-24 items-center justify-center rounded-full border border-[#E5DED0] bg-[#F8F6F1] transition-all duration-300 group-hover:-translate-y-1 group-hover:border-[#B08D57] group-hover:shadow-[0_8px_25px_rgba(0,0,0,0.08)]">
          <Gem className="h-11 w-11 text-[#332E27] transition-colors duration-300 group-hover:text-[#B08D57]" />
        </div>

        <p className="mt-7 text-sm font-medium uppercase tracking-wide text-[#332E27]">
          Lifetime Diamond Upgrade
        </p>
      </a>
    </StaggerItem>

    {/* FREE 1-YEAR RESIZING */}
    <StaggerItem>
      <a
        href="/resizing"
        className="group flex flex-col items-center text-center"
      >
        <div className="flex h-24 w-24 items-center justify-center rounded-full border border-[#E5DED0] bg-[#F8F6F1] transition-all duration-300 group-hover:-translate-y-1 group-hover:border-[#B08D57] group-hover:shadow-[0_8px_25px_rgba(0,0,0,0.08)]">
          <RefreshCcw className="h-11 w-11 text-[#332E27] transition-colors duration-300 group-hover:text-[#B08D57]" />
        </div>

        <p className="mt-7 text-sm font-medium uppercase tracking-wide text-[#332E27]">
          Free 1-Year Resizing
        </p>
      </a>
    </StaggerItem>

  </StaggerGroup>

</Section>


{/* =========================================================
    SECTION —     Annoucebar line 
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
