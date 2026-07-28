import { useState, type ReactNode } from "react";
import { useLocation } from "react-router-dom";
import { Nav } from "./Nav";
import { Footer } from "./Footer";
import { AskShirleyPopup } from "@/components/AskShirleyPopup";
import { trackEvent } from "@/lib/analytics";
import { useOwnerSession } from "@/hooks/useOwnerSession";

export function SiteShell({ children }: { children: ReactNode }) {
  const location = useLocation();
  const { ownerMode } = useOwnerSession();
  const isAskPage =
    location.pathname === "/ask" || location.pathname.startsWith("/ask-shirley");
  // Immersive Ask hides chrome for visitors; owner keeps site nav (Insights)
  const hideChrome = isAskPage && !ownerMode;
  const [askOpen, setAskOpen] = useState(false);

  return (
    <div className={`min-h-screen flex flex-col${hideChrome ? " ask-shell--immersive" : ""}`}>
      {!hideChrome && <Nav />}
      <main className="flex-1 w-full">{children}</main>
      {!hideChrome && !isAskPage && <Footer />}
      <AskShirleyPopup
        open={askOpen}
        onOpen={() => {
          setAskOpen(true);
          trackEvent("chat_opened");
        }}
        onClose={() => setAskOpen(false)}
      />
    </div>
  );
}
