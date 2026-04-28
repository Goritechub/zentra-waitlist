import { useState, useEffect } from "react";
import { ZentraGigLogo } from "@/components/ZentraGigLogo";
import { Button } from "@/components/ui/button";
import {
  ArrowRight, Sparkles, Palette, Lock, CheckCircle2,
  Briefcase, FileText, Send, Trophy, MessageSquare, Users, Award,
} from "lucide-react";
import { useColorTheme, THEME_OPTIONS } from "@/hooks/useTheme";

const APP_URL = "https://zentragig.netlify.app";

/* ── Slide Showcase ── */

type IconDef = { Icon: React.ElementType; style: React.CSSProperties; delay: string };
type SlideItem = { text: string; sub: string; icons: IconDef[] };

const SLIDES: SlideItem[] = [
  {
    text: "Post Jobs",
    sub: "Describe your project. Get proposals within hours.",
    icons: [
      { Icon: Briefcase, style: { top: "-54px", left: "calc(50% - 56px)" }, delay: "0s"   },
      { Icon: Users,     style: { top: "-54px", left: "calc(50% + 16px)"  }, delay: "0.6s" },
    ],
  },
  {
    text: "Send Proposals",
    sub: "Pitch your expertise directly to the right client.",
    icons: [
      { Icon: FileText, style: { top: "-54px", left: "12%" },    delay: "0s"   },
      { Icon: Send,     style: { bottom: "-54px", right: "12%" }, delay: "0.8s" },
    ],
  },
  {
    text: "Make a Bid",
    sub: "Compete in contests. Win real projects.",
    icons: [
      { Icon: Trophy, style: { bottom: "-54px", left: "calc(50% - 56px)" }, delay: "0.3s" },
      { Icon: Award,  style: { bottom: "-54px", left: "calc(50% + 16px)"  }, delay: "0.9s" },
    ],
  },
  {
    text: "Get Hired",
    sub: "Interview, agree, and start work — all in one place.",
    icons: [
      { Icon: MessageSquare, style: { top: "-54px",    right: "14%" }, delay: "0s"   },
      { Icon: CheckCircle2,  style: { bottom: "-54px", left:  "14%" }, delay: "0.7s" },
    ],
  },
];

type Phase = "in" | "hold" | "out";

function SlideShowcase() {
  const [index, setIndex] = useState(0);
  const [phase, setPhase] = useState<Phase>("in");

  useEffect(() => {
    let t: number;
    if (phase === "in")        t = window.setTimeout(() => setPhase("hold"), 450);
    else if (phase === "hold") t = window.setTimeout(() => setPhase("out"),  2800);
    else                       t = window.setTimeout(() => { setIndex(i => (i + 1) % SLIDES.length); setPhase("in"); }, 450);
    return () => clearTimeout(t);
  }, [phase]);

  const slide = SLIDES[index];

  const animStyle: React.CSSProperties =
    phase === "in"  ? { animation: "zg-slide-in 0.45s cubic-bezier(0.22,1,0.36,1) both" } :
    phase === "out" ? { animation: "zg-slide-out 0.45s cubic-bezier(0.55,0,0.45,1) both" } :
    {};

  return (
    <div
      className="relative w-full flex flex-col items-center justify-center rounded-2xl border border-border min-h-[380px] overflow-hidden"
      style={{ background: "linear-gradient(135deg, hsl(var(--primary)/0.06) 0%, hsl(var(--background)) 50%, hsl(var(--accent)/0.06) 100%)" }}
    >
      {/* Grid overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.04]"
        style={{
          backgroundImage: "linear-gradient(hsl(var(--foreground)) 1px,transparent 1px),linear-gradient(90deg,hsl(var(--foreground)) 1px,transparent 1px)",
          backgroundSize: "44px 44px",
        }}
      />

      {/* Animated content */}
      <div className="relative px-14 py-16" style={animStyle}>
        {slide.icons.map(({ Icon, style, delay }, i) => (
          <div
            key={i}
            className="absolute flex items-center justify-center w-11 h-11 rounded-xl"
            style={{
              ...style,
              background: "hsl(var(--primary))",
              boxShadow: "inset 0 1px 0 rgba(255,255,255,0.28), 0 8px 24px rgba(0,0,0,0.38), 0 2px 6px rgba(0,0,0,0.22)",
              animation: "zg-float 3s ease-in-out infinite",
              animationDelay: delay,
            }}
          >
            <Icon className="h-5 w-5" style={{ color: "rgba(255,255,255,0.92)" }} />
          </div>
        ))}
        <div className="text-center space-y-2.5">
          <p
            className="text-4xl sm:text-5xl font-extrabold tracking-tight"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", color: "hsl(var(--foreground))" }}
          >
            {slide.text}
          </p>
          <p className="text-sm max-w-[210px] mx-auto leading-relaxed" style={{ color: "hsl(var(--muted-foreground))" }}>
            {slide.sub}
          </p>
        </div>
      </div>

      {/* Progress dots */}
      <div className="absolute bottom-5 flex gap-2">
        {SLIDES.map((_, i) => (
          <div
            key={i}
            className="h-1.5 rounded-full transition-all duration-500"
            style={{ width: i === index ? "24px" : "6px", background: i === index ? "hsl(var(--primary))" : "hsl(var(--border))" }}
          />
        ))}
      </div>
    </div>
  );
}

/* ── Page ── */

export default function BetaAccess() {
  const [themeOpen, setThemeOpen] = useState(false);
  const { colorTheme, setColorTheme } = useColorTheme();

  return (
    <div className="h-screen bg-background relative flex flex-col overflow-hidden">
      {/* Background orbs */}
      <div className="absolute inset-0 pointer-events-none select-none -z-10">
        <div className="absolute -top-40 left-1/4 w-[700px] h-[700px] rounded-full blur-3xl" style={{ background: "hsl(var(--primary)/0.05)" }} />
        <div className="absolute -bottom-40 right-1/4 w-[600px] h-[600px] rounded-full blur-3xl" style={{ background: "hsl(var(--accent)/0.05)" }} />
      </div>

      {/* Header */}
      <header className="relative z-20 flex items-center justify-between px-6 sm:px-10 py-5">
        <ZentraGigLogo size="lg" />
        <div className="relative">
          <button
            type="button"
            onClick={() => setThemeOpen((o) => !o)}
            className="p-2 rounded-lg border border-border bg-card hover:bg-accent transition-colors"
            aria-label="Change color theme"
          >
            <Palette className="h-4 w-4 text-muted-foreground" />
          </button>
          {themeOpen && (
            <div className="absolute right-0 mt-2 bg-popover border border-border rounded-lg shadow-lg p-2 flex gap-2 z-50">
              {THEME_OPTIONS.map((t) => (
                <button
                  key={t.value}
                  type="button"
                  onClick={() => { setColorTheme(t.value); setThemeOpen(false); }}
                  className={`w-7 h-7 rounded-full border-2 transition-all ${colorTheme === t.value ? "border-foreground scale-110" : "border-transparent hover:scale-105"}`}
                  style={{ backgroundColor: t.color }}
                  aria-label={`${t.label} theme`}
                />
              ))}
            </div>
          )}
        </div>
      </header>

      {/* Main */}
      <main className="relative z-10 flex-1 flex items-center px-6 sm:px-10 py-10">
        <div className="w-full max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* Left */}
          <div className="space-y-8">
            <div className="space-y-5">
              <div
                className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-bold tracking-widest uppercase border"
                style={{ background: "hsl(var(--primary)/0.1)", color: "hsl(var(--primary))", borderColor: "hsl(var(--primary)/0.2)" }}
              >
                <Sparkles className="h-3.5 w-3.5" />
                Beta Launch
              </div>
              <h1
                className="text-4xl sm:text-5xl xl:text-6xl font-extrabold text-foreground tracking-tight"
                style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", lineHeight: 1.08 }}
              >
                You're one of<br />
                <span style={{ color: "hsl(var(--primary))" }}>the first.</span>
              </h1>
              <p className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-md">
                You've been handpicked to try ZentraGig before it opens to the world.
                Explore the platform and share your honest feedback — your input shapes what comes next.
              </p>
            </div>

            <ul className="space-y-3">
              {[
                "Post a job and receive proposals from verified experts",
                "Offer your services and get discovered by clients",
                "Test our secure milestone-based payment escrow",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-sm text-foreground">
                  <CheckCircle2 className="h-4 w-4 mt-0.5 shrink-0" style={{ color: "hsl(var(--primary))" }} />
                  {item}
                </li>
              ))}
            </ul>

            <div className="space-y-3">
              <Button size="lg" className="h-12 px-8 text-base font-semibold whitespace-nowrap" asChild>
                <a href={APP_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2">
                  Try ZentraGig <ArrowRight className="h-5 w-5 shrink-0" />
                </a>
              </Button>
              <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <Lock className="h-3 w-3 shrink-0" />
                Exclusive beta link — please don't share publicly
              </p>
            </div>
          </div>

          {/* Right */}
          <div className="hidden lg:block">
            <SlideShowcase />
          </div>

        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 text-center py-5 border-t border-border/50">
        <p className="text-xs text-muted-foreground">© {new Date().getFullYear()} ZentraGig. All rights reserved.</p>
      </footer>
    </div>
  );
}
