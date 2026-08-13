import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { ALLIANCES, IMG } from "@/lib/site-data";
import { Section } from "@/components/site/Sections";
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
      <section
        ref={heroRef}
        className="relative flex min-h-screen items-center justify-center overflow-hidden px-6"
      >
        <motion.img
          src={IMG.hero}
          alt="Homepage hero background image."
          style={{ y: bgY, scale: bgScale }}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <motion.div
          className="absolute inset-0 bg-[color-mix(in_oklab,var(--color-background)_72%,transparent)]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2 }}
        />
        <motion.div
          style={{ y: contentY, opacity: contentOpacity }}
          className="relative mx-auto max-w-4xl text-center"
        >
          <h1 className="heading-xl text-4xl sm:text-6xl lg:text-7xl">
            <WordsReveal text="The Source for Precision-Engineered Lab-Grown Diamonds." />
          </h1>
          <motion.p
            className="mx-auto mt-8 max-w-2xl text-base leading-relaxed text-foreground/80 sm:text-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            Belliza Gems &amp; Jewels: A global leader in advanced CVD &amp; HPHT
            manufacturing, powering the world&rsquo;s most trusted jewellery
            partners.
          </motion.p>
        </motion.div>

        <motion.div
          className="absolute bottom-10 left-1/2 h-12 w-[1px] -translate-x-1/2 bg-gradient-to-b from-transparent via-foreground/50 to-transparent"
          animate={{ opacity: [0.2, 1, 0.2], scaleY: [0.6, 1, 0.6] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
        />
      </section>

      <Section>
        <StaggerGroup className="grid gap-6 lg:grid-cols-3">
          {PILLARS.map((p) => (
            <StaggerItem key={p.title} className="surface-panel p-8">
              <h2 className="heading-xl text-2xl">{p.title}</h2>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                {p.body}
              </p>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </Section>

      <Section className="border-y border-border bg-[color-mix(in_oklab,var(--color-surface)_50%,transparent)]">
        <Reveal className="mx-auto max-w-3xl text-center">
          <h2 className="heading-xl text-3xl sm:text-5xl">
            The New Standard in Diamond Supply.
          </h2>
          <p className="mt-6 text-base leading-relaxed text-muted-foreground">
            Discover how our manufacturing excellence and direct-from-source
            model can become your strategic advantage.
          </p>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
            <motion.div
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 320, damping: 20 }}
            >
              <Link
                to="/manufacturing"
                className="inline-block rounded-full bg-primary px-7 py-3 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
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
                className="inline-block rounded-full border border-border px-7 py-3 text-sm font-medium text-foreground transition-colors hover:bg-secondary"
              >
                View Our Product Range
              </Link>
            </motion.div>
          </div>
        </Reveal>
      </Section>

      <Section>
        <Reveal>
          <h2 className="heading-xl text-center text-3xl sm:text-4xl">
            What Our Partners Say
          </h2>
        </Reveal>
        <StaggerGroup className="mt-14 grid gap-6 lg:grid-cols-3">
          {TESTIMONIALS.map((t) => (
            <StaggerItem
              key={t.name}
              className="surface-panel flex flex-col p-8"
            >
              <blockquote className="text-sm leading-relaxed text-foreground/85">
                &ldquo;{t.quote}&rdquo;
              </blockquote>
              <figcaption className="mt-8 flex items-center gap-4">
                <img
                  src={t.avatar}
                  alt={`Portrait of ${t.name}`}
                  loading="lazy"
                  className="h-12 w-12 rounded-full object-cover"
                />
                <div>
                  <p className="text-sm font-semibold">{t.name}</p>
                  <p className="text-xs text-muted-foreground">{t.role}</p>
                </div>
              </figcaption>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </Section>

      <Section className="border-t border-border">
        <Reveal className="text-center">
          <h2 className="heading-xl text-2xl sm:text-3xl">
            Our Alliances &amp; Memberships
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-sm leading-relaxed text-muted-foreground">
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

