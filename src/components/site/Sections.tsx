import type { ReactNode } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { Reveal, WordsReveal } from "./Motion";

export function PageHero({
  eyebrow,
  title,
  subtitle,
  image,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  image?: string;
}) {
  const ref = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1.08, 1.18]);

  return (
    <section
      ref={ref}
      className="relative overflow-hidden border-b border-border pb-20 pt-40"
    >
      {image && (
        <>
          <motion.img
            src={image}
            alt=""
            aria-hidden="true"
            style={{ y, scale }}
            className="absolute inset-0 h-full w-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/85 to-background" />
        </>
      )}
      <div className="relative mx-auto max-w-[1100px] px-6 text-center">
        {eyebrow && (
          <motion.p
            className="eyebrow"
            initial={{ opacity: 0, letterSpacing: "0.5em" }}
            animate={{ opacity: 1, letterSpacing: "0.22em" }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          >
            {eyebrow}
          </motion.p>
        )}
        <h1 className="heading-xl mt-5 text-4xl sm:text-5xl lg:text-6xl">
          <WordsReveal text={title} delay={0.1} />
        </h1>
        {subtitle && (
          <motion.p
            className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            {subtitle}
          </motion.p>
        )}
      </div>
    </section>
  );
}

export function Section({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <section className={`px-6 py-20 lg:py-28 ${className}`}>
      <div className="mx-auto max-w-[1300px]">{children}</div>
    </section>
  );
}

export function FeatureSplit({
  image,
  imageAlt,
  title,
  body,
  reverse = false,
}: {
  image: string;
  imageAlt: string;
  title: string;
  body: string;
  reverse?: boolean;
}) {
  return (
    <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
      <Reveal
        y={40}
        className={`group overflow-hidden rounded-2xl border border-border ${reverse ? "lg:order-2" : ""}`}
      >
        <motion.img
          src={image}
          alt={imageAlt}
          loading="lazy"
          initial={{ scale: 1.14 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
      </Reveal>
      <Reveal delay={0.12} className={reverse ? "lg:order-1" : ""}>
        <h2 className="heading-xl text-3xl sm:text-4xl">{title}</h2>
        <p className="mt-6 text-base leading-relaxed text-muted-foreground">
          {body}
        </p>
      </Reveal>
    </div>
  );
}
