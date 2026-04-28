import { Toaster } from "sonner";
import Waitlist from "@/pages/Waitlist";
import HowItWorksPage from "@/pages/HowItWorks";
import BetaAccess from "@/pages/BetaAccess";

const path = window.location.pathname.replace(/\/$/, "");

export default function App() {
  let page = <Waitlist />;
  if (path === "/how-it-works") page = <HowItWorksPage />;
  if (path === "/groundfloor") page = <BetaAccess />;

  return (
    <>
      {page}
      <Toaster richColors position="top-center" />
    </>
  );
}
