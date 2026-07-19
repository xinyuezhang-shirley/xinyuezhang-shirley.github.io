/**
 * Poetry contact sheet — curated paths.
 * Composites: show whole, never crop. Singles: show whole.
 * Files in public/poetry/portraits/.
 */
export const portraits = {
  // —— Prior batch (kept on disk; use selectively) ——
  crownClose: "/poetry/portraits/crown-close.png", // composite diptych
  crownCake: "/poetry/portraits/crown-cake.png", // composite nested
  handReach: "/poetry/portraits/hand-reach.png", // single
  sepiaCrown: "/poetry/portraits/sepia-crown.png", // single
  candleGaze: "/poetry/portraits/candle-gaze.png", // composite diptych
  flashBw: "/poetry/portraits/flash-bw.png", // composite presentation
  closeEyes: "/poetry/portraits/close-eyes.png", // composite + strip
  layeredCollage: "/poetry/portraits/layered-collage.png", // composite triptych
  shadowTurn: "/poetry/portraits/shadow-turn.png", // composite triptych

  // —— New contact sheet ——
  leanBow: "/poetry/portraits/n01-2914.png",
  crownHeld: "/poetry/portraits/n03-2918.png",
  flameTeeth: "/poetry/portraits/n06-2947.png",
  crownHands: "/poetry/portraits/n08-2910.png",
  crownCakeSingle: "/poetry/portraits/n10-2901.png",
  crownSepiaDark: "/poetry/portraits/n12-2907.png",
  motionBlur: "/poetry/portraits/n15-2571.png",
  eyesOverCake: "/poetry/portraits/n16-2906.png",
  stanfordProfile: "/poetry/portraits/n17-2572.png",
  crownCakeNested: "/poetry/portraits/n18-2964-cake.png", // collage — whole only
  headphonesGrin: "/poetry/portraits/n20-0810.png",
  crownSepiaSeat: "/poetry/portraits/n22-2951.png",
  headphonesSmile: "/poetry/portraits/n24-0820.png",
  ruffleRibbon: "/poetry/portraits/n28-0811.png",
  candleClose: "/poetry/portraits/n31-gemini.png",
  ruffleLean: "/poetry/portraits/n32-0806.png",
} as const;

export type PortraitKey = keyof typeof portraits;
