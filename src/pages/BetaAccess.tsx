import { useState } from "react";
import { ZentraGigLogo } from "@/components/ZentraGigLogo";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, Palette, Lock, CheckCircle2 } from "lucide-react";
import { useColorTheme, THEME_OPTIONS } from "@/hooks/useTheme";

const APP_URL = "https://zentragig.netlify.app";

const WHAT_TO_TRY = [
  "Post a job and receive proposals from verified experts",
  "Offer your services and get discovered by clients",
  "Test our secure milestone-based payment system",
];

export default function BetaAccess() {
  const [themeOpen, setThemeOpen] = useState(false);
  const { colorTheme, setColorTheme } = useColorTheme();

  return (
    <div className="min-h-screen bg-background relative overflow-hidden flex flex-col">
      {/* Background orbs */}
      <div className="absolute inset-0 pointer-events-none select-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[900px] rounded-full bg-primary/6 blur-3xl" />
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] rounded-full bg-accent/6 blur-3xl" />
        <div className="absolute bottom-1/3 left-0 w-[400px] h-[400px] rounded-full bg-primary/4 blur-3xl" />
      </div>

      {/* Theme picker */}
      <header className="relative z-10 flex justify-end px-5 sm:px-8 py-5">
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
      <main className="relative z-10 flex-1 flex items-center justify-center px-4 py-10">
        <div className="max-w-lg w-full text-center space-y-8">

          {/* Logo */}
          <div className="flex justify-center">
            <ZentraGigLogo size="lg" />
          </div>

          {/* Badge */}
          <div className="flex flex-col items-center gap-3">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary rounded-full px-5 py-2 text-sm font-bold tracking-wide border border-primary/20">
              <Sparkles className="h-4 w-4" />
              BETA ACCESS
            </div>
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <Lock className="h-3 w-3" />
              Exclusive invite — not publicly accessible
            </div>
          </div>

          {/* Headline */}
          <div className="space-y-4">
            <h1
              className="text-4xl sm:text-5xl font-extrabold text-foreground tracking-tight"
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", lineHeight: 1.1 }}
            >
              You're one of<br />
              <span className="text-primary">the first.</span>
            </h1>
            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-md mx-auto">
              You've been handpicked to try ZentraGig before it opens to the world.
              Explore the platform and let us know what you think — your feedback shapes the launch.
            </p>
          </div>

          {/* What to try */}
          <div className="bg-card border border-border rounded-2xl p-5 sm:p-6 text-left space-y-3">
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-widest">Things to try</p>
            <ul className="space-y-2.5">
              {WHAT_TO_TRY.map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-sm text-foreground">
                  <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* CTA */}
          <div className="space-y-3">
            <Button
              size="lg"
              className="w-full h-13 text-base sm:text-lg font-semibold gap-2 shadow-lg shadow-primary/20"
              asChild
            >
              <a href={APP_URL} target="_blank" rel="noopener noreferrer">
                Try ZentraGig <ArrowRight className="h-5 w-5" />
              </a>
            </Button>
            <p className="text-xs text-muted-foreground">
              This link is exclusive to beta testers. Please don't share it publicly.
            </p>
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
