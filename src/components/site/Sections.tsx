import { useRef, useState, type FormEvent } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowDown, ArrowUpRight, Menu, MessageCircle, X } from "lucide-react";
import { about, company, gallery, hero_, marquee, navLinks, quoteOptions, sections, services, whyUs } from "@/content/site";
import { FadeIn, Label, RevealText, btnAccent, btnOutline } from "./ui";

const wrap = "mx-auto max-w-[90rem] px-5 sm:px-8 lg:px-12";
const display = "font-display font-bold tracking-[-0.02em] leading-[0.95]";

export function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-border/60 bg-background/85 backdrop-blur-md">
      <div className={`${wrap} flex h-16 items-center justify-between`}>
        <a href="#top" className="font-display text-xl font-bold tracking-tight text-primary">{company.shortName}</a>
        <nav className="hidden items-center gap-8 lg:flex">
          {navLinks.map((l) => (
            <a key={l.href} href={l.href} className="text-sm font-medium text-foreground transition-colors hover:text-accent">{l.label}</a>
          ))}
        </nav>
        <a href="#quote" className={`${btnAccent} hidden !py-2.5 lg:inline-flex`}>Get a Quote</a>
        <button aria-label="Open menu" className="text-primary lg:hidden" onClick={() => setOpen(true)}><Menu /></button>
      </div>
      {open && (
        <div className="fixed inset-0 z-50 flex h-dvh flex-col bg-primary px-5 py-5 text-primary-foreground lg:hidden">
          <div className="flex items-center justify-between">
            <span className="font-display text-xl font-bold">{company.shortName}</span>
            <button aria-label="Close menu" onClick={() => setOpen(false)}><X /></button>
          </div>
          <nav className="mt-16 flex flex-col gap-4">
            {navLinks.map((l, i) => (
              <a key={l.href} href={l.href} onClick={() => setOpen(false)} className={`${display} text-5xl`}>
                <span className="mr-3 align-top text-sm font-normal tracking-normal opacity-60">0{i + 1}</span>{l.label}
              </a>
            ))}
          </nav>
          <a href="#quote" onClick={() => setOpen(false)} className={`${btnAccent} mt-auto w-full`}>Get a Quote</a>
        </div>
      )}
    </header>
  );
}

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const scale = useTransform(scrollYProgress, [0, 1], [1, reduce ? 1 : 1.15]);
  const y = useTransform(scrollYProgress, [0, 1], ["0%", reduce ? "0%" : "15%"]);
  return (
    <section id="top" ref={ref} className="relative flex min-h-dvh items-end overflow-hidden text-primary-foreground">
      <motion.img style={{ scale, y }} src={hero_.image} alt="Shipping container yard" width={1920} height={1088} className="absolute inset-0 h-full w-full object-cover" />
      <div className="absolute inset-0 bg-primary/40" />
      <div className={`${wrap} relative w-full pb-24 pt-32`}>
        <RevealText as="h1" text={hero_.headline} className={`${display} max-w-6xl text-5xl sm:text-7xl lg:text-8xl`} />
        <FadeIn delay={0.4} className="mt-10 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <p className="max-w-md text-lg opacity-90">{hero_.subheadline}</p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <a href="#quote" className={btnAccent}>Get a Quote</a>
            <a href={company.whatsapp} target="_blank" rel="noopener noreferrer" className={btnOutline}><MessageCircle className="h-4 w-4" /> WhatsApp Us</a>
          </div>
        </FadeIn>
      </div>
      <a href="#services" aria-label="Scroll down" className="absolute bottom-6 left-1/2 -translate-x-1/2 text-xs uppercase tracking-[0.2em]">
        <ArrowDown className="scroll-cue mx-auto h-5 w-5" />
      </a>
    </section>
  );
}

export function Marquee() {
  const items = [...marquee, ...marquee, ...marquee];
  return (
    <div className="overflow-hidden bg-primary py-6 text-primary-foreground" aria-label={marquee.join(", ")}>
      <div className="marquee-track flex w-max" aria-hidden>
        {[0, 1].map((k) => (
          <div key={k} className="flex shrink-0">
            {items.map((t, i) => (
              <span key={i} className="font-display text-3xl font-semibold tracking-tight md:text-5xl">
                {t}<span className="mx-6 text-accent">·</span>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

function SectionHead({ label, title, subtitle, light }: { label: string; title?: string; subtitle?: string; light?: boolean }) {
  return (
    <div className="mb-14 grid gap-6 md:mb-20 lg:grid-cols-12">
      <div className="lg:col-span-3"><Label light={!!light}>{label}</Label></div>
      <div className="lg:col-span-9">
        {title && <RevealText text={title} className={`${display} text-5xl md:text-7xl lg:text-8xl ${light ? "" : "text-primary"}`} />}
        {subtitle && <FadeIn><p className={`mt-6 max-w-lg text-lg ${light ? "opacity-80" : "text-muted-foreground"}`}>{subtitle}</p></FadeIn>}
      </div>
    </div>
  );
}

const serviceImages = [hero_.image, ...gallery.map((g) => g.image)];

export function Services() {
  return (
    <section id="services" className="py-24 md:py-36">
      <div className={wrap}><SectionHead label={sections.services.label} title={sections.services.title} /></div>
      <div className="border-t border-border">
        {services.map((s, i) => (
          <FadeIn key={s.title}>
            <a href="#quote" className="group relative block overflow-hidden border-b border-border">
              <img src={serviceImages[i]} alt="" loading="lazy" className="absolute inset-0 h-full w-full scale-110 object-cover opacity-0 transition-all duration-700 group-hover:scale-100 group-hover:opacity-100" />
              <div className="absolute inset-0 bg-primary/75 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              <div className={`${wrap} relative grid items-center gap-4 py-8 transition-colors duration-500 group-hover:text-primary-foreground md:grid-cols-12 md:py-12`}>
                <span className="font-display text-sm text-muted-foreground transition-colors group-hover:text-accent md:col-span-1 md:text-lg">0{i + 1}</span>
                <h3 className={`${display} text-3xl text-primary transition-all duration-500 group-hover:translate-x-2 group-hover:text-primary-foreground md:col-span-6 md:text-5xl lg:text-6xl`}>{s.title}</h3>
                <p className="max-w-md text-sm leading-relaxed md:col-span-4 md:text-base">{s.text}</p>
                <ArrowUpRight className="hidden h-8 w-8 justify-self-end transition-transform duration-500 group-hover:rotate-45 group-hover:text-accent md:col-span-1 md:block" />
              </div>
            </a>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}

export function About() {
  return (
    <section id="about" className="bg-muted py-24 md:py-36">
      <div className={wrap}>
        <SectionHead label={sections.about.label} />
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-9 lg:col-start-4">
            <RevealText as="p" text={about.statement} className="font-display text-3xl font-medium leading-[1.1] tracking-tight text-primary md:text-5xl" />
            <FadeIn><p className="mt-10 max-w-2xl text-lg leading-relaxed text-muted-foreground">{about.text}</p></FadeIn>
            <div className="mt-20 grid gap-12 md:grid-cols-2">
              {[{ t: "Our Vision", b: about.vision }, { t: "Our Mission", b: about.mission }].map(({ t, b }, i) => (
                <FadeIn key={t} delay={i * 0.1} className="border-t border-primary/30 pt-6">
                  <h3 className="font-display text-2xl font-semibold text-primary">{t}</h3>
                  <p className="mt-4 leading-relaxed">{b}</p>
                </FadeIn>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Slide({ g, i }: { g: (typeof gallery)[number]; i: number }) {
  return (
    <figure className="group flex h-full shrink-0 flex-col md:w-[70vw] lg:w-[55vw]">
      <div className="relative flex-1 overflow-hidden rounded-sm">
        <img src={g.image} alt={g.title} loading="lazy" width={1024} height={768} className="aspect-[4/3] h-full w-full object-cover transition-transform duration-[1.2s] group-hover:scale-105 md:aspect-auto" />
      </div>
      <figcaption className="mt-5 flex items-baseline gap-5">
        <span className="font-display text-sm text-accent">0{i + 1}</span>
        <div>
          <h3 className="font-display text-2xl font-semibold tracking-tight text-primary md:text-3xl">{g.title}</h3>
          <p className="mt-1 text-muted-foreground">{g.text}</p>
        </div>
      </figcaption>
    </figure>
  );
}

export function Gallery() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-62%"]);
  const head = <SectionHead label={sections.gallery.label} title={sections.gallery.title} subtitle={sections.gallery.subtitle} />;
  return (
    <section id="gallery">
      {/* Mobile: vertical stack */}
      <div className={`${wrap} py-24 md:hidden`}>
        {head}
        <div className="flex flex-col gap-14">{gallery.map((g, i) => <Slide key={g.title} g={g} i={i} />)}</div>
      </div>
      {/* Desktop: pinned horizontal scroll */}
      <div ref={ref} className="relative hidden h-[400vh] md:block">
        <div className="sticky top-0 flex h-screen flex-col overflow-hidden pb-12 pt-24">
          <div className={wrap}>
            <div className="flex items-end justify-between gap-8 pb-8">
              <div>
                <Label>{sections.gallery.label}</Label>
                <h2 className={`${display} mt-5 text-6xl text-primary lg:text-8xl`}>{sections.gallery.title}</h2>
              </div>
              <p className="max-w-xs text-muted-foreground">{sections.gallery.subtitle}</p>
            </div>
          </div>
          <motion.div style={{ x }} className="flex min-h-0 flex-1 gap-8 pl-12">
            {gallery.map((g, i) => <Slide key={g.title} g={g} i={i} />)}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export function WhyUs() {
  return (
    <section id="why-us" className="bg-muted py-24 md:py-36">
      <div className={wrap}>
        <SectionHead label={sections.whyUs.label} title={sections.whyUs.title} />
        <div className="grid border-t border-primary/20 md:grid-cols-2">
          {whyUs.map((w, i) => (
            <FadeIn key={w.title} delay={(i % 2) * 0.08} className="group flex items-baseline gap-6 border-b border-primary/20 py-7 md:odd:border-r md:odd:pr-10 md:even:pl-10">
              <span className="font-display text-sm text-accent">0{i + 1}</span>
              <h3 className="font-display text-2xl font-medium tracking-tight text-primary transition-transform duration-500 group-hover:translate-x-2 md:text-3xl">{w.title}</h3>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

export type QuoteData = { name?: string; company?: string; phone?: string; email?: string; service?: string; size?: string; quantity?: string; location?: string; message?: string };

/** PLACEHOLDER: connect this to your backend / email service later. */
export async function sendQuoteRequest(data: QuoteData): Promise<void> {
  console.info("Quote request (not yet sent anywhere):", data);
}

export function Quote() {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [done, setDone] = useState(false);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget)) as unknown as QuoteData;
    const errs: Record<string, string> = {};
    if (!data.name?.trim()) errs["name"] = "Please enter your full name.";
    if (!data.phone?.trim() || !/^[+\d\s-]{7,}$/.test(data.phone)) errs["phone"] = "Please enter a valid phone number.";
    if (!data.email?.trim() || !/^\S+@\S+\.\S+$/.test(data.email)) errs["email"] = "Please enter a valid email.";
    setErrors(errs);
    if (Object.keys(errs).length) return;
    await sendQuoteRequest(data);
    setDone(true);
  }

  const Err = ({ k }: { k: string }) => (errors[k] ? <p className="mt-2 text-sm text-accent">{errors[k]}</p> : null);
  const lbl = "text-xs uppercase tracking-[0.2em] opacity-70";

  return (
    <section id="quote" className="bg-primary py-24 text-primary-foreground md:py-36">
      <div className={wrap}>
        <SectionHead light label={sections.quote.label} title={sections.quote.title} subtitle={sections.quote.subtitle} />
        <div className="lg:ml-[25%]">
          {done ? (
            <FadeIn><p className={`${display} text-4xl md:text-6xl`}>{sections.quote.success}</p></FadeIn>
          ) : (
            <form noValidate onSubmit={onSubmit} className="grid gap-x-12 gap-y-10 md:grid-cols-2">
              <div><label className={lbl} htmlFor="name">Full name *</label><input id="name" name="name" className="uline" /><Err k="name" /></div>
              <div><label className={lbl} htmlFor="company">Company name</label><input id="company" name="company" className="uline" /></div>
              <div><label className={lbl} htmlFor="phone">Phone *</label><input id="phone" name="phone" type="tel" className="uline" /><Err k="phone" /></div>
              <div><label className={lbl} htmlFor="email">Email *</label><input id="email" name="email" type="email" className="uline" /><Err k="email" /></div>
              <div><label className={lbl} htmlFor="service">Service</label>
                <select id="service" name="service" className="uline" defaultValue="">
                  <option value="" disabled>Select a service</option>
                  {quoteOptions.services.map((o) => <option key={o}>{o}</option>)}
                </select></div>
              <div><label className={lbl} htmlFor="size">Container size</label>
                <select id="size" name="size" className="uline" defaultValue="">
                  <option value="" disabled>Select a size</option>
                  {quoteOptions.sizes.map((o) => <option key={o}>{o}</option>)}
                </select></div>
              <div><label className={lbl} htmlFor="quantity">Quantity</label><input id="quantity" name="quantity" type="number" min={1} className="uline" /></div>
              <div><label className={lbl} htmlFor="location">Duration or delivery location</label><input id="location" name="location" className="uline" /></div>
              <div className="md:col-span-2"><label className={lbl} htmlFor="message">Message</label><textarea id="message" name="message" rows={3} className="uline resize-none" /></div>
              <div className="md:col-span-2"><button type="submit" className={`${btnAccent} !px-10 !py-5 text-base`}>Send Enquiry <ArrowUpRight className="h-5 w-5" /></button></div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

export function Contact() {
  const rows = [
    { label: "Phone", value: company.phone, href: company.phoneHref },
    { label: "Mobile", value: company.mobile, href: company.mobileHref },
    { label: "Email", value: company.email, href: `mailto:${company.email}` },
  ];
  return (
    <section id="contact" className="py-24 md:py-36">
      <div className={wrap}>
        <SectionHead label={sections.contact.label} title={sections.contact.title} />
        <div className="grid gap-12 lg:grid-cols-12">
          <FadeIn className="lg:col-span-5">
            <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Address</p>
            <p className="mt-3 text-lg leading-relaxed">{company.address}</p>
            <div className="mt-8 divide-y divide-border border-y border-border">
              {rows.map((r) => (
                <a key={r.label} href={r.href} className="group flex items-center justify-between py-5">
                  <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground">{r.label}</span>
                  <span className="font-display text-xl font-medium text-primary transition-colors group-hover:text-accent md:text-2xl">{r.value}</span>
                </a>
              ))}
            </div>
            <a href={company.whatsapp} target="_blank" rel="noopener noreferrer" className={`${btnAccent} mt-8`}><MessageCircle className="h-4 w-4" /> WhatsApp Us</a>
          </FadeIn>
          <FadeIn className="min-h-96 overflow-hidden rounded-sm lg:col-span-7">
            <iframe title="Office location map" src={`https://www.google.com/maps?q=${encodeURIComponent(company.mapQuery)}&output=embed`} className="h-full min-h-96 w-full grayscale" loading="lazy" />
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="bg-primary pt-20 text-primary-foreground">
      <div className={wrap}>
        <div className="grid gap-10 border-b border-primary-foreground/20 pb-12 md:grid-cols-3">
          <nav className="flex flex-col gap-2">
            {navLinks.map((l) => <a key={l.href} href={l.href} className="opacity-80 hover:text-accent hover:opacity-100">{l.label}</a>)}
          </nav>
          <div className="flex flex-col gap-2 opacity-80">
            <a href={company.phoneHref} className="hover:text-accent">{company.phone}</a>
            <a href={company.mobileHref} className="hover:text-accent">{company.mobile}</a>
            <a href={`mailto:${company.email}`} className="hover:text-accent">{company.email}</a>
          </div>
          <p className="text-sm leading-relaxed opacity-70">{company.address}</p>
        </div>
        <p className={`${display} py-8 text-[17vw] leading-none lg:text-[12vw]`}>{company.shortName}</p>
        <p className="pb-8 text-sm opacity-70">© {company.fullName}. All Rights Reserved.</p>
      </div>
    </footer>
  );
}
