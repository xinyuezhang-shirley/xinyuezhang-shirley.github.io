import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { SiteShell } from "@/components/layout/SiteShell";
import { PageTransition } from "@/components/layout/PageTransition";
import Home from "@/pages/Home";
import Work from "@/pages/Work";
import WorkDetail from "@/pages/WorkDetail";
import MuseLabRoom from "@/pages/MuseLabRoom";
import Research from "@/pages/Research";
import ResearchDetail from "@/pages/ResearchDetail";
import CreativeIndex from "@/pages/CreativeIndex";
import CreativeArt from "@/pages/CreativeArt";
import CreativePhotography from "@/pages/CreativePhotography";
import CreativePoetry from "@/pages/CreativePoetry";
import About from "@/pages/About";
import Resume from "@/pages/Resume";
import NotFound from "@/pages/NotFound";

function AnimatedRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageTransition><Home /></PageTransition>} />
        <Route path="/work" element={<PageTransition><Work /></PageTransition>} />
        <Route path="/work/muselab" element={<PageTransition><MuseLabRoom /></PageTransition>} />
        <Route path="/work/:slug" element={<PageTransition><WorkDetail /></PageTransition>} />
        <Route path="/research" element={<PageTransition><Research /></PageTransition>} />
        <Route path="/research/:slug" element={<PageTransition><ResearchDetail /></PageTransition>} />
        <Route path="/creative" element={<PageTransition><CreativeIndex /></PageTransition>} />
        <Route path="/creative/art" element={<PageTransition><CreativeArt /></PageTransition>} />
        <Route path="/creative/photography" element={<PageTransition><CreativePhotography /></PageTransition>} />
        <Route path="/creative/poetry" element={<PageTransition><CreativePoetry /></PageTransition>} />
        <Route path="/about" element={<PageTransition><About /></PageTransition>} />
        <Route path="/resume" element={<PageTransition><Resume /></PageTransition>} />
        <Route path="*" element={<PageTransition><NotFound /></PageTransition>} />
      </Routes>
    </AnimatePresence>
  );
}

const App = () => (
  <BrowserRouter>
    <SiteShell>
      <AnimatedRoutes />
    </SiteShell>
  </BrowserRouter>
);

export default App;
