import { useState, useEffect } from "react";
import { ZentraGigLogo } from "@/components/ZentraGigLogo";
import { Button } from "@/components/ui/button";
import {
  ArrowRight, Sparkles, Palette, Lock, CheckCircle2,
  Briefcase, FileText, Send, Trophy, MessageSquare, Users, Star, Award,
} from "lucide-react";
import { useColorTheme, THEME_OPTIONS } from "@/hooks/useTheme";

const APP_URL = "https://zentragig.netlify.app";

/* ── Bounce Showcase ── */

type IconDef = { Icon: React.ElementType; style: React.CSSProperties };
type SlideItem = { text: string; sub: string; icons: IconDef[] };

const SLIDES: SlideItem[] = [
  {
    text: "Post Jobs",
    sub: "Describe your project. Get proposals within hours.",
    icons: [
      { Icon: Briefcase, style: { top: "-52px", left: "calc(50% - 52px)" } },
      { Icon: Users,     style: { top: "-52px", left: "calc(50% + 12px)"  } },
    ],
  },
  {
    text: "Send Proposals",
    sub: "Pitch your expertise directly to the right client.",
    icons: [
      { Icon: FileText, style: { top: "10%",    right: "-56px" } },
      { Icon: Send,     style: { bottom: "10%", right: "-56px" } },
    ],
  },
  {
    text: "Make a Bid",
    sub: "Compete in contests. Win real projects.",
    icons: [
      { Icon: Trophy, style: { bottom: "-52px", left: "calc(50% - 52px)" } },
      { Icon: Award,  style: { bottom: "-52px", left: "calc(50% + 12px)"  } },
    ],
  },
  {
    text: "Get Hired",
    sub: "Interview, agree, and start work — all in one place.",
    icons: [
      { Icon: MessageSquare, style: { top: "-52px",    right: "12%" } },
      { Icon: CheckCircle2,  style: { bottom: "-52px", left:  "12%" } },
    ],
  },
];

type Phase = "entering" | "visible" | "leaving";

function BounceShowcase() {
  const [index, setIndex] = useState(0);
  const [phase, setPhase] = useState<Phase>("entering");

  useEffect(() => {
    let t: number;
    if (phase === "entering")      t = window.setTimeout(() => setPhase("visible"),  1300);
    else if (phase === "visible")  t = window.setTimeout(() => setPhase("leaving"),  2800);
    else                           t = window.setTimeout(() => { setIndex(i => (i + 1) % SLIDES.length); setPhase("entering"); }, 600);
    return () => clearTimeout(t);
  }, [phase]);

  const slide = SLIDES[index];

  const animStyle: React.CSSProperties =
    phase === "entering"
      ? { animation: "zg-bounce-in 1.3s cubic-bezier(0.215,0.61,0.355,1) forwards" }
      : phase === "leaving"
      ? { animation: "zg-bounce-out 0.6s ease-in forwards" }
      : {};

  return (
    <div className="relative w-full flex flex-col items-center justify-center rounded-2xl bg-gradient-to-br from-primary/8 via-background to-accent/8 border border-border overflow-hidden min-h-[380px]">
      <style>{`
        @keyframes zg-bounce-in {
          0%   { transform: translateY(110px); opacity: 0; }
          26%  { transform: translateY(0px);   opacity: 1; }
          41%  { transform: translateY(-38px); }
          56%  { transform: translateY(0px);   }
          67%  { transform: translateY(-17px); }
          78%  { transform: translateY(0px);   }
          87%  { transform: translateY(-7px);  }
          94%  { transform: translateY(0px);   }
          100% { transform: translateY(0px);   opacity: 1; }
        }
        @keyframes zg-bounce-out {
          0%   { transform: translateY(0px);   opacity: 1; }
          35%  { transform: translateY(-28px); opacity: 0.7; }
          100% { transform: translateY(-90px); opacity: 0; }
        }
      `}</style>

      {/* Subtle grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: "linear-gradient(hsl(var(--foreground)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      {/* Animated content */}
      <div className="relative px-12 py-16" style={animStyle}>
        {slide.icons.map(({ Icon, style }, i) => (
          <div
            key={i}
            className="absolute flex items-center justify-center w-11 h-11 rounded-xl bg-primary/15 border border-primary/25 backdrop-blur-sm"
            style={style}
          >
            <Icon className="h-5 w-5 text-primary" />
          </div>
        ))}
        <div className="text-center space-y-2.5">
          <p
            className="text-4xl sm:text-5xl font-extrabold text-foreground tracking-tight"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
          >
            {slide.text}
          </p>
          <p className="text-sm text-muted-foreground max-w-[210px] mx-auto leading-relaxed">
            {slide.sub}
          </p>
        </div>
      </div>

      {/* Progress dots */}
      <div className="absolute bottom-5 flex gap-2">
        {SLIDES.map((_, i) => (
          <div
            key={i}
            className={`h-1.5 rounded-full transition-all duration-500 ${i === index ? "w-6 bg-primary" : "w-1.5 bg-border"}`}
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
    <div className="min-h-screen bg-background relative overflow-hidden flex flex-col">
      {/* Background orbs */}
      <div className="absolute inset-0 pointer-events-none select-none">
        <div className="absolute -top-40 left-1/4 w-[700px] h-[700px] rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute -bottom-40 right-1/4 w-[600px] h-[600px] rounded-full bg-accent/5 blur-3xl" />
      </div>

      {/* Header */}
      <header className="relative z-10 flex items-center justify-between px-6 sm:px-10 py-5">
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
              <div className="inline-flex items-center gap-2 bg-primary/10 text-primary rounded-full px-4 py-1.5 text-xs font-bold tracking-widest uppercase border border-primary/20">
                <Sparkles className="h-3.5 w-3.5" />
                Beta Launch
              </div>
              <h1
                className="text-4xl sm:text-5xl xl:text-6xl font-extrabold text-foreground tracking-tight"
                style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", lineHeight: 1.08 }}
              >
                You're one of<br />
                <span className="text-primary">the first.</span>
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
                  <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                  {item}
                </li>
              ))}
            </ul>

            <div className="space-y-3">
              <Button
                size="lg"
                className="h-12 px-8 text-base font-semibold whitespace-nowrap"
                asChild
              >
                <a
                  href={APP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2"
                >
                  Try ZentraGig <ArrowRight className="h-5 w-5 shrink-0" />
                </a>
              </Button>
              <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <Lock className="h-3 w-3 shrink-0" />
                Exclusive beta link — please don't share publicly
              </p>
            </div>

          </div>

          {/* Right — Bounce showcase (desktop only) */}
          <div className="hidden lg:block">
            <BounceShowcase />
          </div>

        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 text-center py-5 border-t border-border/50">
        <p className="text-xs text-muted-foreground">
          © {new Date().getFullYear()} ZentraGig. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
