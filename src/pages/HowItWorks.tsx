import { ZentraGigLogo } from "@/components/ZentraGigLogo";
import { Button } from "@/components/ui/button";
import { useColorTheme, THEME_OPTIONS } from "@/hooks/useTheme";
import { useState } from "react";
import {
  ArrowLeft,
  Palette,
  UserPlus,
  FileText,
  Handshake,
  ShieldCheck,
  CheckCircle2,
  CreditCard,
  AlertCircle,
  RotateCcw,
  Mail,
  Trophy,
  Lock,
  DollarSign,
  Search,
  MessageSquare,
  ArrowRight,
  Building2,
} from "lucide-react";

// ─── Data ───────────────────────────────────────────────────────────────────

const clientSteps = [
  {
    icon: UserPlus,
    title: "Create a Client Account",
    description:
      "Sign up and verify your identity. Provide your name, email, and business details. All accounts are reviewed before access is granted.",
  },
  {
    icon: FileText,
    title: "Post a Job or Launch a Contest",
    description:
      "Describe your engineering project, set a budget, required skills, and deadline. For contests, set prize tiers and let multiple experts submit proposals.",
  },
  {
    icon: Search,
    title: "Review & Hire",
    description:
      "Browse proposals from verified engineers. Review portfolios, ratings, and past reviews. Send a direct offer or accept a proposal.",
  },
  {
    icon: Handshake,
    title: "Fund the Contract",
    description:
      "Before work begins, deposit funds into your ZentraGig wallet. The agreed amount is moved into escrow — locked securely until you approve each milestone.",
  },
  {
    icon: MessageSquare,
    title: "Collaborate",
    description:
      "Work with your expert through built-in messaging and file sharing. Track milestone progress and request revisions as needed.",
  },
  {
    icon: CheckCircle2,
    title: "Approve & Release Payment",
    description:
      "Review the deliverable. If satisfied, approve the milestone to release the escrowed funds to the expert. You control every release.",
  },
];

const expertSteps = [
  {
    icon: UserPlus,
    title: "Create an Expert Profile",
    description:
      "Sign up, verify your identity, and build your professional profile. Add your skills, software expertise, portfolio, certifications, and rates.",
  },
  {
    icon: Search,
    title: "Browse & Apply",
    description:
      "Find jobs that match your expertise. Submit proposals with your bid, estimated timeline, and a cover letter explaining your approach.",
  },
  {
    icon: Handshake,
    title: "Get Hired",
    description:
      "A client accepts your proposal or sends a direct offer. Both parties agree on milestones, deliverables, and payment amounts before work starts.",
  },
  {
    icon: FileText,
    title: "Deliver Work",
    description:
      "Complete each milestone and submit your work through the platform. You can share files, drawings, and progress updates directly in the contract.",
  },
  {
    icon: CreditCard,
    title: "Get Paid",
    description:
      "Once the client approves your milestone, the escrowed funds are credited to your ZentraGig wallet. Withdraw to your bank account at any time.",
  },
];

const paymentFlow = [
  {
    step: "1",
    actor: "Client",
    icon: CreditCard,
    title: "Fund Your Wallet",
    description:
      "Clients deposit money into their ZentraGig wallet via bank transfer or card payment. No funds leave your wallet until you explicitly start a contract.",
    highlight: false,
  },
  {
    step: "2",
    actor: "Platform",
    icon: Lock,
    title: "Escrow Hold",
    description:
      "When a contract is started, the agreed contract amount is moved from the client's wallet into a secure escrow balance. The funds are held by ZentraGig and are not accessible by either party until the conditions are met.",
    highlight: true,
  },
  {
    step: "3",
    actor: "Expert",
    icon: FileText,
    title: "Work is Delivered",
    description:
      "The expert completes the milestone and submits the deliverable. The client reviews the work and may request revisions at no extra cost within the agreed scope.",
    highlight: false,
  },
  {
    step: "4",
    actor: "Client",
    icon: CheckCircle2,
    title: "Client Approves",
    description:
      "The client reviews and approves the milestone. This is the only event that triggers a release of escrowed funds. Clients are never forced to pay for unapproved work.",
    highlight: true,
  },
  {
    step: "5",
    actor: "Expert",
    icon: DollarSign,
    title: "Expert Receives Payment",
    description:
      "The milestone amount — minus the ZentraGig service fee — is credited to the expert's wallet. The expert can withdraw to their registered bank account at any time.",
    highlight: false,
  },
];

const disputeAndRefund = [
  {
    icon: AlertCircle,
    title: "Raising a Dispute",
    description:
      "If a client believes the delivered work does not meet the agreed scope, they can raise a dispute before approving the milestone. Both parties submit their case along with supporting evidence (files, messages, etc.).",
  },
  {
    icon: ShieldCheck,
    title: "Admin Adjudication",
    description:
      "ZentraGig's disputes team reviews the evidence from both sides. Based on the contract terms, submitted deliverables, and platform communications, the team decides whether to release funds to the expert or return them to the client.",
  },
  {
    icon: RotateCcw,
    title: "Refunds",
    description:
      "If a dispute is resolved in the client's favour, the escrowed funds are returned to the client's wallet. Clients can withdraw their wallet balance to their original payment method. Refunds are processed within 5–10 business days.",
  },
];

// ─── Component ──────────────────────────────────────────────────────────────

export default function HowItWorksPage() {
  const { colorTheme, setColorTheme } = useColorTheme();
  const [themeOpen, setThemeOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-background/80 backdrop-blur-sm border-b border-border">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
          <button
            onClick={() => (window.location.href = "/")}
            className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </button>

          <ZentraGigLogo size="md" />

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
                    onClick={() => {
                      setColorTheme(t.value);
                      setThemeOpen(false);
                    }}
                    className={`w-7 h-7 rounded-full border-2 transition-all ${colorTheme === t.value ? "border-foreground scale-110" : "border-transparent hover:scale-105"}`}
                    style={{ backgroundColor: t.color }}
                    aria-label={`${t.label} theme`}
                    title={t.label}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* ── Hero ── */}
        <section className="bg-gradient-to-br from-primary/90 to-primary text-white py-16 md:py-24">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center">
            <div className="inline-flex items-center gap-2 bg-white/15 rounded-full px-4 py-1.5 text-sm font-semibold mb-6">
              <ShieldCheck className="h-4 w-4" />
              Transparent by Design
            </div>
            <h1
              className="text-3xl md:text-5xl font-extrabold mb-4 leading-tight"
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
            >
              How ZentraGig Works
            </h1>
            <p className="text-white/80 text-lg max-w-2xl mx-auto leading-relaxed">
              ZentraGig is a marketplace connecting businesses with verified
              engineers and skilled professionals. Every transaction is
              protected by our escrow system — you only pay for approved work.
            </p>
          </div>
        </section>

        {/* ── What We Do ── */}
        <section className="py-16 md:py-20 bg-muted/30">
          <div className="max-w-5xl mx-auto px-4 sm:px-6">
            <div className="text-center mb-10">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3">
                What is ZentraGig?
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                ZentraGig is a professional services marketplace built for
                Nigeria's engineering and technical sector. Clients post
                projects or run open contests; verified expert professionals
                apply, get hired, and deliver work — all on a single platform
                with built-in payments and dispute resolution.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {[
                {
                  icon: Building2,
                  title: "Who can be a Client?",
                  desc: "Any registered individual, business, or organisation looking to hire engineering or technical professionals for a project.",
                },
                {
                  icon: UserPlus,
                  title: "Who can be an Expert?",
                  desc: "Verified Nigerian engineers, designers, fabricators, and skilled technical professionals with demonstrable portfolios.",
                },
                {
                  icon: Trophy,
                  title: "What are Contests?",
                  desc: "An alternative hiring mode where clients set prizes and multiple experts submit work. The client selects the best submission and pays only the winner(s).",
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="bg-card border border-border rounded-xl p-6"
                >
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                    <item.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">
                    {item.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Payment Flow ── */}
        <section className="py-16 md:py-20">
          <div className="max-w-5xl mx-auto px-4 sm:px-6">
            <div className="text-center mb-12">
              <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold mb-3 uppercase tracking-wide">
                Payment Flow
              </span>
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3">
                How Money Moves on ZentraGig
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                All payments are processed through our secure escrow system.
                Funds are only released when the client explicitly approves
                completed work — never automatically.
              </p>
            </div>

            <div className="relative">
              {/* Connecting line */}
              <div className="hidden md:block absolute left-[2.25rem] top-10 bottom-10 w-0.5 bg-border" />

              <div className="space-y-4">
                {paymentFlow.map((item) => (
                  <div
                    key={item.step}
                    className={`relative flex gap-5 p-5 rounded-xl border transition-all ${
                      item.highlight
                        ? "bg-primary/5 border-primary/30"
                        : "bg-card border-border"
                    }`}
                  >
                    {/* Step circle */}
                    <div
                      className={`relative z-10 shrink-0 w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold shadow-sm ${
                        item.highlight
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted text-muted-foreground border border-border"
                      }`}
                    >
                      {item.step}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2 mb-1">
                        <span
                          className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                            item.actor === "Client"
                              ? "bg-blue-50 text-blue-700 dark:bg-blue-950/40 dark:text-blue-300"
                              : item.actor === "Expert"
                                ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300"
                                : "bg-amber-50 text-amber-700 dark:bg-amber-950/40 dark:text-amber-300"
                          }`}
                        >
                          {item.actor}
                        </span>
                        <h3 className="font-semibold text-foreground">
                          {item.title}
                        </h3>
                      </div>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {item.description}
                      </p>
                    </div>

                    <item.icon
                      className={`shrink-0 h-5 w-5 mt-1 ${item.highlight ? "text-primary" : "text-muted-foreground/50"}`}
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Fee callout */}
            <div className="mt-8 p-5 rounded-xl bg-muted/50 border border-border flex gap-4">
              <DollarSign className="h-5 w-5 text-primary shrink-0 mt-0.5" />
              <div>
                <h4 className="font-semibold text-foreground mb-1">
                  Platform Service Fee
                </h4>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  ZentraGig charges a service fee on each successfully completed
                  transaction. The fee is deducted from the expert's payout at
                  the point of milestone release. The fee percentage is
                  displayed clearly at the time of contract creation. No hidden
                  charges apply to clients.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ── For Clients ── */}
        <section className="py-16 md:py-20 bg-muted/30">
          <div className="max-w-5xl mx-auto px-4 sm:px-6">
            <div className="text-center mb-10">
              <span className="inline-block px-3 py-1 rounded-full bg-blue-100 text-blue-700 dark:bg-blue-950/40 dark:text-blue-300 text-xs font-semibold mb-3 uppercase tracking-wide">
                For Clients
              </span>
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3">
                Hiring in 6 Steps
              </h2>
              <p className="text-muted-foreground max-w-xl mx-auto">
                From posting a job to approving the final deliverable.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {clientSteps.map((step, i) => (
                <div
                  key={i}
                  className="bg-card border border-border rounded-xl p-5 relative"
                >
                  <div className="absolute -top-3 -left-1 w-7 h-7 rounded-full bg-primary text-primary-foreground text-xs font-bold flex items-center justify-center shadow">
                    {i + 1}
                  </div>
                  <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center mb-3 mt-1">
                    <step.icon className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-1.5">
                    {step.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── For Experts ── */}
        <section className="py-16 md:py-20">
          <div className="max-w-5xl mx-auto px-4 sm:px-6">
            <div className="text-center mb-10">
              <span className="inline-block px-3 py-1 rounded-full bg-emerald-100 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300 text-xs font-semibold mb-3 uppercase tracking-wide">
                For Experts
              </span>
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3">
                Getting Paid in 5 Steps
              </h2>
              <p className="text-muted-foreground max-w-xl mx-auto">
                Find quality projects, deliver great work, and get paid
                securely.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {expertSteps.map((step, i) => (
                <div
                  key={i}
                  className="bg-card border border-border rounded-xl p-5 relative"
                >
                  <div className="absolute -top-3 -left-1 w-7 h-7 rounded-full bg-emerald-600 text-white text-xs font-bold flex items-center justify-center shadow">
                    {i + 1}
                  </div>
                  <div className="w-11 h-11 rounded-xl bg-emerald-600/10 flex items-center justify-center mb-3 mt-1">
                    <step.icon className="h-5 w-5 text-emerald-600" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-1.5">
                    {step.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Disputes & Refunds ── */}
        <section className="py-16 md:py-20 bg-muted/30">
          <div className="max-w-5xl mx-auto px-4 sm:px-6">
            <div className="text-center mb-10">
              <span className="inline-block px-3 py-1 rounded-full bg-amber-100 text-amber-700 dark:bg-amber-950/40 dark:text-amber-300 text-xs font-semibold mb-3 uppercase tracking-wide">
                Disputes &amp; Refunds
              </span>
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3">
                Protected on Both Sides
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Our escrow model means neither party can be shortchanged. If a
                disagreement arises, our disputes team steps in with a fair,
                evidence-based resolution.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {disputeAndRefund.map((item) => (
                <div
                  key={item.title}
                  className="bg-card border border-border rounded-xl p-6"
                >
                  <div className="w-12 h-12 rounded-xl bg-amber-500/10 flex items-center justify-center mb-4">
                    <item.icon className="h-6 w-6 text-amber-600" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">
                    {item.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>

            {/* Additional clarifications */}
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl border border-border bg-card flex gap-3">
                <ShieldCheck className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-semibold text-foreground mb-0.5">
                    Funds are never auto-released
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Escrowed funds require an explicit approval action by the
                    client. There is no automatic release timer.
                  </p>
                </div>
              </div>
              <div className="p-4 rounded-xl border border-border bg-card flex gap-3">
                <RotateCcw className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-semibold text-foreground mb-0.5">
                    Refund timeline
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Approved refunds are returned to the client's wallet
                    immediately. Bank withdrawal processing takes 5–10 business
                    days depending on your bank.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Contact ── */}
        <section className="py-16 md:py-20" id="contact">
          <div className="max-w-5xl mx-auto px-4 sm:px-6">
            <div className="text-center mb-10">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3">
                Contact Us
              </h2>
              <p className="text-muted-foreground max-w-xl mx-auto">
                Have questions about how the platform works, payment terms, or
                our policies? We're here to help.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 max-w-2xl mx-auto">
              <a
                href="mailto:support@zentragig.com"
                className="flex items-center gap-4 p-5 bg-card border border-border rounded-xl hover:border-primary/50 transition-colors group"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
                  <Mail className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="font-semibold text-foreground">Support</p>
                  <p className="text-sm text-primary">support@zentragig.com</p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    Payment, disputes, and general enquiries
                  </p>
                </div>
              </a>

              <a
                href="mailto:hello@zentragig.com"
                className="flex items-center gap-4 p-5 bg-card border border-border rounded-xl hover:border-primary/50 transition-colors group"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
                  <Mail className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="font-semibold text-foreground">
                    General Enquiries
                  </p>
                  <p className="text-sm text-primary">hello@zentragig.com</p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    Partnerships and business development
                  </p>
                </div>
              </a>
            </div>

            <div className="mt-6 text-center">
              <p className="text-xs text-muted-foreground">
                ZentraGig — Abuja, Nigeria &nbsp;·&nbsp;
                <a
                  href="https://www.linkedin.com/company/zentragig/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-foreground transition-colors underline underline-offset-2"
                >
                  LinkedIn
                </a>
                &nbsp;·&nbsp;
                <a
                  href="https://x.com/zentragig"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-foreground transition-colors underline underline-offset-2"
                >
                  X / Twitter
                </a>
              </p>
            </div>
          </div>
        </section>

        {/* ── CTA ── */}
        <section className="bg-gradient-to-br from-primary/90 to-primary text-white py-14">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-3">
              Ready to get early access?
            </h2>
            <p className="text-white/80 mb-7 max-w-lg mx-auto">
              Join the waitlist and be the first to know when ZentraGig
              launches.
            </p>
            <Button
              size="lg"
              className="bg-white text-primary hover:bg-white/90 font-semibold"
              onClick={() => (window.location.href = "/")}
            >
              Join the Waitlist <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-background border-t border-border/50 py-6 text-center space-y-3">
        <div className="flex items-center justify-center gap-4">
          <a
            href="https://www.linkedin.com/company/zentragig/"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-lg border border-border bg-card hover:bg-accent transition-colors"
            aria-label="Follow us on LinkedIn"
          >
            <svg
              className="h-4 w-4 text-muted-foreground"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
          </a>
          <a
            href="https://x.com/zentragig"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-lg border border-border bg-card hover:bg-accent transition-colors"
            aria-label="Follow us on X"
          >
            <svg
              className="h-4 w-4 text-muted-foreground"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
          </a>
        </div>
        <p className="text-xs text-muted-foreground">
          © {new Date().getFullYear()} ZentraGig. All rights reserved.
          &nbsp;·&nbsp;
          <a
            href="mailto:support@zentragig.com"
            className="hover:text-foreground transition-colors"
          >
            support@zentragig.com
          </a>
        </p>
      </footer>
    </div>
  );
}
