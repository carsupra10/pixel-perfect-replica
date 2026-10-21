import { useEffect, useState, type ReactNode } from "react";
import { motion, useReducedMotion, useScroll, useSpring } from "framer-motion";

const ease = [0.22, 1, 0.36, 1] as const;

/** Fades/slides content in once when it enters the viewport. */
export function FadeIn({ children, className = "", delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.8, ease, delay }}
    >
      {children}
    </motion.div>
  );
}

/** Reveals a headline word-line by word-line. */
export function RevealText({ text, className = "", as: Tag = "h2" }: { text: string; className?: string; as?: "h1" | "h2" | "p" }) {
  const reduce = useReducedMotion();
  const words = text.split(" ");
  return (
    <Tag className={className} aria-label={text}>
      {words.map((w, i) => (
        <span key={i} aria-hidden className="inline-block overflow-hidden pb-[0.08em] align-bottom">
          <motion.span
            className="inline-block"
            initial={reduce ? false : { y: "110%" }}
            whileInView={{ y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease, delay: i * 0.05 }}
          >
            {w}&nbsp;
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}

export function Label({ children, light }: { children: ReactNode; light?: boolean }) {
  return (
    <p className={`flex items-center gap-3 text-xs font-medium uppercase tracking-[0.2em] ${light ? "text-primary-foreground/80" : "text-muted-foreground"}`}>
      <span className="h-1.5 w-1.5 rounded-full bg-accent" />
      {children}
    </p>
  );
}

export function ProgressBar() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });
  return <motion.div style={{ scaleX }} className="fixed inset-x-0 top-0 z-[60] h-[3px] origin-left bg-accent" />;
}

/** Orange dot cursor that grows over links/buttons. Desktop with fine pointer only. */
export function Cursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [hover, setHover] = useState(false);
  const [on, setOn] = useState(false);
  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    setOn(true);
    document.documentElement.classList.add("has-cursor");
    const move = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
      setHover(!!(e.target as HTMLElement).closest("a,button,select,input,textarea,label"));
    };
    window.addEventListener("mousemove", move);
    return () => {
      window.removeEventListener("mousemove", move);
      document.documentElement.classList.remove("has-cursor");
    };
  }, []);
  if (!on) return null;
  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[70] rounded-full mix-blend-normal"
      animate={{ x: pos.x - (hover ? 18 : 5), y: pos.y - (hover ? 18 : 5), width: hover ? 36 : 10, height: hover ? 36 : 10 }}
      transition={{ type: "spring", stiffness: 600, damping: 40, mass: 0.3 }}
      style={{ background: hover ? "color-mix(in oklab, var(--accent) 70%, transparent)" : "var(--primary)" }}
    />
  );
}

/** Lenis smooth scrolling on desktop; anchors scroll smoothly too. */
export function useSmoothScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || window.innerWidth < 768) return;
    let raf = 0;
    let lenis: { raf: (t: number) => void; destroy: () => void; scrollTo: (t: Element, o?: object) => void } | null = null;
    let cancelled = false;
    const onClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement).closest('a[href^="#"]');
      const el = a && document.querySelector(a.getAttribute("href")!);
      if (el && lenis) { e.preventDefault(); lenis.scrollTo(el, { offset: -64 }); }
    };
    import("lenis").then(({ default: Lenis }) => {
      if (cancelled) return;
      lenis = new Lenis({ lerp: 0.1 });
      const loop = (t: number) => { lenis!.raf(t); raf = requestAnimationFrame(loop); };
      raf = requestAnimationFrame(loop);
      document.addEventListener("click", onClick);
    });
    return () => { cancelled = true; cancelAnimationFrame(raf); lenis?.destroy(); document.removeEventListener("click", onClick); };
  }, []);
}

export const btnAccent =
  "inline-flex items-center justify-center gap-2 rounded-full bg-accent px-6 py-3.5 text-sm font-semibold text-accent-foreground transition-transform hover:scale-[1.03] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring";
export const btnOutline =
  "inline-flex items-center justify-center gap-2 rounded-full border border-current px-6 py-3.5 text-sm font-semibold transition-colors hover:bg-primary-foreground hover:text-primary";
