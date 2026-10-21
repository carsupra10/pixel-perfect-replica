import { useEffect, useRef, type ReactNode } from "react";

export function FadeIn({ children, className = "" }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e?.isIntersecting) {
          el.classList.add("is-visible");
          io.disconnect();
        }
      },
      { threshold: 0.1 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <div ref={ref} className={`fade-in ${className}`}>
      {children}
    </div>
  );
}

export function Section({
  id,
  alt,
  title,
  subtitle,
  children,
}: {
  id: string;
  alt?: boolean;
  title: string;
  subtitle?: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className={`py-16 md:py-24 ${alt ? "bg-muted" : "bg-background"}`}>
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <FadeIn className="mb-10 text-center md:mb-14">
          <h2 className="text-3xl font-bold tracking-tight text-primary md:text-4xl">{title}</h2>
          <div className="mx-auto mt-3 h-1 w-12 rounded bg-accent" />
          {subtitle && <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">{subtitle}</p>}
        </FadeIn>
        {children}
      </div>
    </section>
  );
}

export const btnAccent =
  "inline-flex items-center justify-center gap-2 rounded-md bg-accent px-5 py-3 text-sm font-semibold text-accent-foreground transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring";
export const btnOutline =
  "inline-flex items-center justify-center gap-2 rounded-md border-2 border-current px-5 py-3 text-sm font-semibold transition-colors hover:bg-background/10";
