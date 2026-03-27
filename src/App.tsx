import { Toaster } from "sonner";
import Waitlist from "@/pages/Waitlist";

export default function App() {
  return (
    <>
      <Waitlist />
      <Toaster richColors position="top-center" />
    </>
  );
}
