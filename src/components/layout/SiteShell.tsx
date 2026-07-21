import { useState, type ReactNode } from "react";
import { useLocation } from "react-router-dom";
import { Nav } from "./Nav";
import { Footer } from "./Footer";
import { AskShirleyPopup } from "@/components/AskShirleyPopup";

export function SiteShell({ children }: { children: ReactNode }) {
  const location = useLocation();
  const isAskPage =
    location.pathname === "/ask" || location.pathname.startsWith("/ask-shirley");
  const [askOpen, setAskOpen] = useState(false);

  return (
    <div className={`min-h-screen flex flex-col${isAskPage ? " ask-shell--immersive" : ""}`}>
      {!isAskPage && <Nav />}
      <main className="flex-1 w-full">{children}</main>
      {!isAskPage && <Footer />}
      <AskShirleyPopup
        open={askOpen}
        onOpen={() => setAskOpen(true)}
        onClose={() => setAskOpen(false)}
      />
    </div>
  );
}
