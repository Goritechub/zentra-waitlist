import { Toaster } from "sonner";
import Waitlist from "@/pages/Waitlist";
import HowItWorksPage from "@/pages/HowItWorks";

const path = window.location.pathname.replace(/\/$/, "");

export default function App() {
  return (
    <>
      {path === "/how-it-works" ? <HowItWorksPage /> : <Waitlist />}
      <Toaster richColors position="top-center" />
    </>
  );
}
