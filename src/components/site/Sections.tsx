import { useState, type FormEvent } from "react";
import {
  Menu, X, KeyRound, CalendarClock, ShoppingCart, Truck, Settings2, ShieldCheck, Repeat,
  BadgeIndianRupee, Users, Briefcase, Award, Handshake, Scale, MapPin, Phone, Smartphone,
  Mail, MessageCircle, Eye, Target, CheckCircle2,
} from "lucide-react";
import { about, company, gallery, hero_, navLinks, quoteOptions, services, whyUs } from "@/content/site";
import { FadeIn, Section, btnAccent, btnOutline } from "./ui";

const icons = {
  leasing: KeyRound, rental: CalendarClock, sales: ShoppingCart, logistics: Truck, custom: Settings2,
  reliable: ShieldCheck, flexible: Repeat, pricing: BadgeIndianRupee, customer: Users,
  professional: Briefcase, quality: Award, relationship: Handshake, integrity: Scale,
};

export function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <a href="#top" className="text-xl font-extrabold tracking-tight text-primary">{company.shortName}</a>
        <nav className="hidden items-center gap-6 lg:flex">
          {navLinks.map((l) => (
            <a key={l.href} href={l.href} className="text-sm font-medium text-primary hover:text-accent">{l.label}</a>
          ))}
        </nav>
        <a href="#quote" className={`${btnAccent} hidden lg:inline-flex`}>Get a Quote</a>
        <button aria-label="Toggle menu" className="text-primary lg:hidden" onClick={() => setOpen(!open)}>
          {open ? <X /> : <Menu />}
        </button>
      </div>
      {open && (
        <nav className="border-t border-border bg-background px-4 py-4 lg:hidden">
          {navLinks.map((l) => (
            <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="block py-2 font-medium text-primary">{l.label}</a>
          ))}
          <a href="#quote" onClick={() => setOpen(false)} className={`${btnAccent} mt-3 w-full`}>Get a Quote</a>
        </nav>
      )}
    </header>
  );
}

export function Hero() {
  return (
    <section id="top" className="relative flex min-h-[80vh] items-center">
      <img src={hero_.image} alt="Shipping container yard" width={1920} height={1088} className="absolute inset-0 h-full w-full object-cover" />
      <div className="absolute inset-0 bg-deep/70" />
      <div className="relative mx-auto max-w-6xl px-4 py-20 text-deep-foreground sm:px-6">
        <FadeIn className="max-w-2xl">
          <h1 className="text-4xl font-extrabold leading-tight tracking-tight md:text-6xl">{hero_.headline}</h1>
          <p className="mt-5 text-lg opacity-90 md:text-xl">{hero_.subheadline}</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a href="#quote" className={btnAccent}>Get a Quote</a>
            <a href={company.whatsapp} target="_blank" rel="noopener noreferrer" className={btnOutline}>
              <MessageCircle className="h-4 w-4" /> WhatsApp Us
            </a>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

export function Services() {
  return (
    <Section id="services" title="What We Do">
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((s) => {
          const Icon = icons[s.icon];
          return (
            <FadeIn key={s.title} className="rounded-lg border border-border bg-card p-6">
              <Icon className="h-9 w-9 text-primary" strokeWidth={1.5} />
              <h3 className="mt-4 text-lg font-semibold text-primary">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed">{s.text}</p>
            </FadeIn>
          );
        })}
      </div>
    </Section>
  );
}

export function About() {
  return (
    <Section id="about" alt title="About Us">
      <FadeIn><p className="mx-auto max-w-3xl text-center leading-relaxed">{about.text}</p></FadeIn>
      <div className="mt-10 grid gap-6 md:grid-cols-2">
        {[{ t: "Our Vision", b: about.vision, I: Eye }, { t: "Our Mission", b: about.mission, I: Target }].map(({ t, b, I }) => (
          <FadeIn key={t} className="rounded-lg border-t-4 border-accent bg-card p-7 shadow-sm">
            <div className="flex items-center gap-3">
              <I className="h-7 w-7 text-primary" strokeWidth={1.5} />
              <h3 className="text-xl font-semibold text-primary">{t}</h3>
            </div>
            <p className="mt-3 leading-relaxed">{b}</p>
          </FadeIn>
        ))}
      </div>
    </Section>
  );
}

export function Gallery() {
  return (
    <Section id="gallery" title="Custom-Built Containers" subtitle="Containers fabricated for specific operational needs.">
      <div className="grid gap-6 md:grid-cols-2">
        {gallery.map((g) => (
          <FadeIn key={g.title} className="overflow-hidden rounded-lg border border-border bg-card">
            <img src={g.image} alt={g.title} loading="lazy" width={1024} height={768} className="aspect-[4/3] w-full object-cover" />
            <div className="p-5">
              <h3 className="text-lg font-semibold text-primary">{g.title}</h3>
              <p className="mt-1 text-sm">{g.text}</p>
            </div>
          </FadeIn>
        ))}
      </div>
    </Section>
  );
}

export function WhyUs() {
  return (
    <Section id="why-us" alt title="Why Choose Mission Ocean">
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {whyUs.map((w) => {
          const Icon = icons[w.icon];
          return (
            <FadeIn key={w.title} className="flex flex-col items-center rounded-lg bg-card p-6 text-center shadow-sm">
              <Icon className="h-8 w-8 text-accent" strokeWidth={1.5} />
              <h3 className="mt-3 font-semibold text-primary">{w.title}</h3>
            </FadeIn>
          );
        })}
      </div>
    </Section>
  );
}

export type QuoteData = { name?: string; company?: string; phone?: string; email?: string; service?: string; size?: string; quantity?: string; location?: string; message?: string };

/** Placeholder: connect this to your backend / email service later. */
export async function sendQuoteRequest(data: QuoteData): Promise<void> {
  console.info("Quote request (not yet sent anywhere):", data);
}

const field = "w-full rounded-md border border-input bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring";
const label = "mb-1.5 block text-sm font-medium text-primary";

export function Quote() {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [done, setDone] = useState(false);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget)) as unknown as QuoteData;
    const errs: Record<string, string> = {};
    if (!data.name?.trim()) errs.name = "Please enter your full name.";
    if (!data.phone?.trim() || !/^[+\d\s-]{7,}$/.test(data.phone)) errs.phone = "Please enter a valid phone number.";
    if (!data.email?.trim() || !/^\S+@\S+\.\S+$/.test(data.email)) errs.email = "Please enter a valid email.";
    setErrors(errs);
    if (Object.keys(errs).length) return;
    await sendQuoteRequest(data);
    setDone(true);
  }

  const Err = ({ k }: { k: string }) => (errors[k] ? <p className="mt-1 text-xs text-destructive">{errors[k]}</p> : null);

  return (
    <Section id="quote" title="Get a Quote" subtitle="Tell us what you need and we will get back to you.">
      <FadeIn className="mx-auto max-w-3xl rounded-lg border border-border bg-card p-6 shadow-sm md:p-10">
        {done ? (
          <div className="flex flex-col items-center py-10 text-center">
            <CheckCircle2 className="h-12 w-12 text-primary" />
            <p className="mt-4 text-lg font-semibold text-primary">Thank you. Our team will contact you shortly.</p>
          </div>
        ) : (
          <form noValidate onSubmit={onSubmit} className="grid gap-5 md:grid-cols-2">
            <div><label className={label} htmlFor="name">Full name *</label><input id="name" name="name" className={field} /><Err k="name" /></div>
            <div><label className={label} htmlFor="company">Company name</label><input id="company" name="company" className={field} /></div>
            <div><label className={label} htmlFor="phone">Phone *</label><input id="phone" name="phone" type="tel" className={field} /><Err k="phone" /></div>
            <div><label className={label} htmlFor="email">Email *</label><input id="email" name="email" type="email" className={field} /><Err k="email" /></div>
            <div><label className={label} htmlFor="service">Service</label>
              <select id="service" name="service" className={field} defaultValue="">
                <option value="" disabled>Select a service</option>
                {quoteOptions.services.map((o) => <option key={o}>{o}</option>)}
              </select></div>
            <div><label className={label} htmlFor="size">Container size</label>
              <select id="size" name="size" className={field} defaultValue="">
                <option value="" disabled>Select a size</option>
                {quoteOptions.sizes.map((o) => <option key={o}>{o}</option>)}
              </select></div>
            <div><label className={label} htmlFor="quantity">Quantity</label><input id="quantity" name="quantity" type="number" min={1} className={field} /></div>
            <div><label className={label} htmlFor="location">Duration or delivery location</label><input id="location" name="location" className={field} /></div>
            <div className="md:col-span-2"><label className={label} htmlFor="message">Message</label><textarea id="message" name="message" rows={4} className={field} /></div>
            <div className="md:col-span-2"><button type="submit" className={`${btnAccent} w-full md:w-auto`}>Send Enquiry</button></div>
          </form>
        )}
      </FadeIn>
    </Section>
  );
}

export function Contact() {
  const rows = [
    { I: MapPin, label: "Address", value: company.address },
    { I: Phone, label: "Phone", value: company.phone, href: company.phoneHref },
    { I: Smartphone, label: "Mobile", value: company.mobile, href: company.mobileHref },
    { I: Mail, label: "Email", value: company.email, href: `mailto:${company.email}` },
  ];
  return (
    <Section id="contact" alt title="Contact Us">
      <div className="grid gap-8 md:grid-cols-2">
        <FadeIn className="space-y-5">
          {rows.map(({ I, label: l, value, href }) => (
            <div key={l} className="flex gap-4">
              <I className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
              <div>
                <p className="text-sm font-semibold text-primary">{l}</p>
                {href ? <a href={href} className="hover:text-accent">{value}</a> : <p className="leading-relaxed">{value}</p>}
              </div>
            </div>
          ))}
          <a href={company.whatsapp} target="_blank" rel="noopener noreferrer" className={btnAccent}>
            <MessageCircle className="h-4 w-4" /> WhatsApp Us
          </a>
        </FadeIn>
        <FadeIn className="min-h-80 overflow-hidden rounded-lg border border-border">
          <iframe
            title="Office location map"
            src={`https://www.google.com/maps?q=${encodeURIComponent(company.mapQuery)}&output=embed`}
            className="h-full min-h-80 w-full"
            loading="lazy"
          />
        </FadeIn>
      </div>
    </Section>
  );
}

export function Footer() {
  return (
    <footer className="bg-deep py-10 text-deep-foreground">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-5 px-4 text-center sm:px-6">
        <p className="text-lg font-bold">{company.shortName}</p>
        <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2">
          {navLinks.map((l) => <a key={l.href} href={l.href} className="text-sm opacity-80 hover:opacity-100">{l.label}</a>)}
        </nav>
        <p className="text-sm opacity-70">© {company.fullName}. All Rights Reserved.</p>
      </div>
    </footer>
  );
}
