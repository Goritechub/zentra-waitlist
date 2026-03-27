import { useState, useEffect, useCallback } from "react";
import { ZentraGigLogo } from "@/components/ZentraGigLogo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CountrySelect } from "@/components/CountrySelect";
import { toast } from "sonner";
import { useColorTheme, THEME_OPTIONS } from "@/hooks/useTheme";
import {
  Rocket, Users, Briefcase, CheckCircle2, ArrowRight, Sparkles,
  Globe, Wrench, MessageSquare, ChevronDown, Palette, Trophy,
} from "lucide-react";

const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:4000";

const DEFAULT_LAUNCH_DATE = new Date("2026-04-29T23:00:00Z");

const REFERRAL_OPTIONS = [
  "Twitter / X",
  "LinkedIn",
  "Instagram",
  "Facebook",
  "Google Search",
  "A friend or colleague",
  "Blog / Article",
  "Other",
];

function useCountdown(target: Date) {
  const calc = useCallback(() => {
    const diff = Math.max(0, target.getTime() - Date.now());
    return {
      days: Math.floor(diff / 86400000),
      hours: Math.floor((diff % 86400000) / 3600000),
      minutes: Math.floor((diff % 3600000) / 60000),
      seconds: Math.floor((diff % 60000) / 1000),
    };
  }, [target]);

  const [time, setTime] = useState(() => calc());

  useEffect(() => {
    setTime(calc());
    const id = setInterval(() => setTime(calc()), 1000);
    return () => clearInterval(id);
  }, [calc]);

  return time;
}

const HEADLINES = [
  { top: "Where Skilled Pros", accent: "Get Things Built" },
  { top: "", accent: "Democratize STEM Skills" },
  { top: "Your Next Big Project", accent: "Starts Right Here" },
];

function RotatingHeadline() {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setIndex((i) => (i + 1) % HEADLINES.length);
        setVisible(true);
      }, 500);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <h1
      className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-foreground tracking-tight transition-all duration-500"
      style={{
        lineHeight: "1.08",
        fontFamily: "'Plus Jakarta Sans', sans-serif",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(12px)",
      }}
    >
      {HEADLINES[index].top && <>{HEADLINES[index].top}<br /></>}
      <span className="text-primary">{HEADLINES[index].accent}</span>
    </h1>
  );
}

const Waitlist = () => {
  const [email, setEmail] = useState("");
  const [role, setRole] = useState<"client" | "expert">("client");
  const [country, setCountry] = useState("");
  const [professionOrSkills, setProfessionOrSkills] = useState("");
  const [projectDescription, setProjectDescription] = useState("");
  const [referralSource, setReferralSource] = useState("");
  const [loading, setLoading] = useState(false);
  const [joined, setJoined] = useState(false);
  const [themeOpen, setThemeOpen] = useState(false);
  const { colorTheme, setColorTheme } = useColorTheme();
  const countdown = useCountdown(DEFAULT_LAUNCH_DATE);
  const [waitlistCount, setWaitlistCount] = useState(0);

  useEffect(() => {
    fetch(`${API_BASE}/waitlist/count`)
      .then((res) => res.json())
      .then((body) => {
        if (body?.data?.count !== undefined) setWaitlistCount(body.data.count);
      })
      .catch(() => {});
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !email.trim() ||
      !country.trim() ||
      !professionOrSkills.trim() ||
      !referralSource ||
      (role === "client" && !projectDescription.trim())
    ) {
      toast.error("Please fill in all fields before submitting.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/waitlist`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email.trim().toLowerCase(),
          role,
          country: country.trim(),
          profession_or_skills: professionOrSkills.trim(),
          referral_source: referralSource,
          project_description: role === "client" ? projectDescription.trim() || null : null,
        }),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        const message: string = body?.message || "";
        if (res.status === 400 && message.toLowerCase().includes("already on the waitlist")) {
          toast.info("You're already on the waitlist! We'll notify you soon.");
          setJoined(true);
        } else {
          toast.error(message || "Something went wrong. Please try again.");
        }
        return;
      }

      setJoined(true);
      setWaitlistCount((c) => c + 1);
      toast.success("You're on the list! We'll notify you when we launch.");
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background relative overflow-hidden flex flex-col">
      {/* Background effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] rounded-full bg-accent/5 blur-3xl" />
      </div>

      {/* Header */}
      <header className="relative z-10 flex items-center justify-between px-4 sm:px-6 py-6 sm:py-8">
        <div />
        <ZentraGigLogo size="lg" />
        <div className="relative">
          <button
            type="button"
            onClick={() => setThemeOpen((o) => !o)}
            className="p-2 rounded-lg border border-border bg-card hover:bg-accent transition-colors"
            aria-label="Change color theme"
            title="Change color theme"
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
                  title={t.label}
                />
              ))}
            </div>
          )}
        </div>
      </header>

      {/* Main content */}
      <main className="relative z-10 flex-1 flex items-center justify-center px-4 pb-8 sm:pb-12">
        <div className="max-w-2xl w-full text-center space-y-6 sm:space-y-8">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary rounded-full px-4 py-1.5 text-sm font-semibold animate-fade-in">
            <Sparkles className="h-4 w-4" />
            Coming Soon
          </div>

          {/* Headline */}
          <div className="space-y-3 sm:space-y-4 animate-fade-in">
            <RotatingHeadline />
            <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-xl mx-auto leading-relaxed text-pretty">
              A marketplace connecting businesses with verified engineers, makers, and skilled fabricators for real-world technical projects. Join the waitlist to get early access.
            </p>
          </div>

          {/* Waitlist counter */}
          {waitlistCount > 0 && (
            <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground animate-fade-in">
              <Users className="h-4 w-4 text-primary" />
              <span>
                Join <span className="font-bold text-foreground">{waitlistCount.toLocaleString()}+</span> others on the waitlist
              </span>
            </div>
          )}

          {/* Countdown */}
          <div className="flex items-center justify-center gap-2 sm:gap-3 md:gap-5">
            {[
              { label: "Days", value: countdown.days },
              { label: "Hours", value: countdown.hours },
              { label: "Minutes", value: countdown.minutes },
              { label: "Seconds", value: countdown.seconds },
            ].map((item) => (
              <div key={item.label} className="flex flex-col items-center">
                <div className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-2xl bg-card border border-border shadow-lg flex items-center justify-center">
                  <span
                    className="text-xl sm:text-2xl md:text-3xl font-bold text-foreground tabular-nums"
                    style={{ fontFamily: "'IBM Plex Mono', monospace" }}
                  >
                    {String(item.value).padStart(2, "0")}
                  </span>
                </div>
                <span className="text-[10px] sm:text-xs text-muted-foreground mt-1.5 sm:mt-2 font-medium">{item.label}</span>
              </div>
            ))}
          </div>

          {/* Form */}
          {!joined ? (
            <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-3 sm:space-y-4 text-left">
              {/* Role selection */}
              <div className="grid grid-cols-2 gap-2 sm:gap-3">
                <button
                  type="button"
                  onClick={() => setRole("client")}
                  className={`relative flex flex-col items-center gap-1 sm:gap-1.5 p-3 sm:p-3.5 rounded-xl border-2 transition-all duration-200 ${
                    role === "client"
                      ? "border-primary bg-primary/5 shadow-md"
                      : "border-border bg-card hover:border-muted-foreground/30"
                  }`}
                >
                  <Briefcase className={`h-5 w-5 ${role === "client" ? "text-primary" : "text-muted-foreground"}`} />
                  <span className={`text-xs sm:text-sm font-semibold ${role === "client" ? "text-primary" : "text-foreground"}`}>
                    I want to hire
                  </span>
                  <span className="text-[10px] sm:text-xs text-muted-foreground">Find skilled pros</span>
                  {role === "client" && <CheckCircle2 className="absolute top-2 right-2 h-4 w-4 text-primary" />}
                </button>
                <button
                  type="button"
                  onClick={() => setRole("expert")}
                  className={`relative flex flex-col items-center gap-1 sm:gap-1.5 p-3 sm:p-3.5 rounded-xl border-2 transition-all duration-200 ${
                    role === "expert"
                      ? "border-primary bg-primary/5 shadow-md"
                      : "border-border bg-card hover:border-muted-foreground/30"
                  }`}
                >
                  <Users className={`h-5 w-5 ${role === "expert" ? "text-primary" : "text-muted-foreground"}`} />
                  <span className={`text-xs sm:text-sm font-semibold ${role === "expert" ? "text-primary" : "text-foreground"}`}>
                    I'm an expert
                  </span>
                  <span className="text-[10px] sm:text-xs text-muted-foreground">Find projects</span>
                  {role === "expert" && <CheckCircle2 className="absolute top-2 right-2 h-4 w-4 text-primary" />}
                </button>
              </div>

              {/* Email */}
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-foreground">Email address</label>
                <Input
                  type="email"
                  required
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-11"
                  autoComplete="email"
                />
              </div>

              {/* Country */}
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-foreground flex items-center gap-1.5">
                  <Globe className="h-3.5 w-3.5 text-muted-foreground" /> Country
                </label>
                <CountrySelect value={country} onChange={setCountry} />
              </div>

              {/* Profession or skills */}
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-foreground flex items-center gap-1.5">
                  <Wrench className="h-3.5 w-3.5 text-muted-foreground" />
                  {role === "client" ? "Your industry / profession" : "Your skills / expertise"}
                </label>
                <Input
                  type="text"
                  required
                  placeholder={role === "client" ? "e.g. Construction, Oil & Gas" : "e.g. AutoCAD, Civil Engineering"}
                  value={professionOrSkills}
                  onChange={(e) => setProfessionOrSkills(e.target.value)}
                  className="h-11"
                />
              </div>

              {/* Project description - clients only */}
              {role === "client" && (
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-foreground flex items-center gap-1.5">
                    <Briefcase className="h-3.5 w-3.5 text-muted-foreground" />
                    What kind of project are you looking for?
                  </label>
                  <Input
                    type="text"
                    required
                    placeholder="e.g. I need a mechanical design engineer for machine drawings"
                    value={projectDescription}
                    onChange={(e) => setProjectDescription(e.target.value)}
                    className="h-11"
                  />
                </div>
              )}

              {/* Referral source */}
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-foreground flex items-center gap-1.5">
                  <MessageSquare className="h-3.5 w-3.5 text-muted-foreground" /> How did you hear about us?
                </label>
                <div className="relative">
                  <select
                    required
                    value={referralSource}
                    onChange={(e) => setReferralSource(e.target.value)}
                    className="flex h-11 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 appearance-none pr-10"
                  >
                    <option value="" disabled>Select an option</option>
                    {REFERRAL_OPTIONS.map((opt) => (
                      <option key={opt} value={opt}>{opt}</option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
                </div>
              </div>

              {/* Submit */}
              <Button type="submit" size="lg" disabled={loading} className="w-full h-12 text-base">
                {loading ? (
                  <span className="animate-spin h-4 w-4 border-2 border-primary-foreground border-t-transparent rounded-full" />
                ) : (
                  <>
                    Join the Waitlist <ArrowRight className="h-4 w-4 ml-2" />
                  </>
                )}
              </Button>

              <p className="text-xs text-muted-foreground text-center">
                No spam, ever. We'll only email you when we launch.
              </p>
            </form>
          ) : (
            <div className="max-w-md mx-auto bg-primary/5 border border-primary/20 rounded-2xl p-6 sm:p-8 space-y-3 animate-scale-in">
              <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                <Rocket className="h-7 w-7 text-primary" />
              </div>
              <h3 className="text-xl font-bold text-foreground">You're on the list!</h3>
              <p className="text-muted-foreground text-sm">
                We'll send you an email when ZentraGig is ready for beta. Stay tuned!
              </p>
            </div>
          )}

          {/* Features teaser */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 pt-4">
            {[
              { Icon: CheckCircle2, title: "Secure Escrow", desc: "Payments held safely until work is approved" },
              { Icon: Users, title: "Verified Pros", desc: "Background-checked professionals you can trust" },
              { Icon: Rocket, title: "Fast Matching", desc: "Get proposals from experts within hours" },
              { Icon: Trophy, title: "Contests", desc: "Launch creative contests and crowdsource solutions" },
            ].map((f) => (
              <div key={f.title} className="bg-card border border-border rounded-xl p-4 sm:p-5 text-center space-y-1.5 sm:space-y-2 hover-scale">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mx-auto">
                  <f.Icon className="h-5 w-5 text-primary" />
                </div>
                <h4 className="font-semibold text-foreground text-xs sm:text-sm">{f.title}</h4>
                <p className="text-[10px] sm:text-xs text-muted-foreground">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 text-center py-5 sm:py-6 space-y-3 border-t border-border/50">
        <div className="flex items-center justify-center gap-4">
          <a
            href="https://www.linkedin.com/company/zentragig/"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-lg border border-border bg-card hover:bg-accent transition-colors hover-scale"
            aria-label="Follow us on LinkedIn"
          >
            <svg className="h-4 w-4 text-muted-foreground" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
            </svg>
          </a>
          <a
            href="https://x.com/zentragig"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-lg border border-border bg-card hover:bg-accent transition-colors hover-scale"
            aria-label="Follow us on X"
          >
            <svg className="h-4 w-4 text-muted-foreground" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
            </svg>
          </a>
        </div>
        <p className="text-xs text-muted-foreground">
          © {new Date().getFullYear()} ZentraGig. All rights reserved.
        </p>
      </footer>
    </div>
  );
};

export default Waitlist;
