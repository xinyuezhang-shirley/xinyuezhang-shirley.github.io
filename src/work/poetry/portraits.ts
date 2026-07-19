/**
 * Curated standalone portraits for the poetry zine.
 * Orientation noted so layouts can respect the photograph.
 */
export const portraits = {
  /** landscape — hand to lens, geometric crown, cover */
  coverReach: "/poetry/portraits/n13-2903.png",
  /** vertical — crown triptych (hands framing face) */
  crownTriptych: "/poetry/portraits/n33-2961-triptych.jpg",
  /** vertical — B&W crown glance over shoulder */
  crownShoulder: "/poetry/portraits/n34-2958-crown-glance.jpg",
  /** vertical — paper crown ring, direct gaze */
  crownHeld: "/poetry/portraits/n03-2918.png",
  /** vertical — leaning black bow, quiet weight */
  leanBow: "/poetry/portraits/n01-2914.png",
  /** vertical — sepia crown, seated, solemn */
  crownSepiaSeat: "/poetry/portraits/n22-2951.png",
  /** vertical — looking back with crown, motion grain */
  crownGlance: "/poetry/portraits/n14-2904.png",
  /** vertical — ruffle lean, soft distance */
  ruffleLean: "/poetry/portraits/n32-0806.png",
  /** vertical — hands framing face, introspective */
  handsFrame: "/poetry/portraits/n25-0813.png",
  /** vertical — reach toward lens, confrontational */
  ruffleReach: "/poetry/portraits/n27-0814.png",
  /** vertical — crown + cake (self-portrait) */
  crownCake: "/poetry/portraits/n10-2901.png",
  /** vertical — abyss / hand in foreground */
  handReach: "/poetry/portraits/hand-reach.png",
  /** landscape — flame match (watermark cropped) */
  flameTeeth: "/poetry/portraits/n06-2947-clean.jpg",
  /** landscape — candle light, intimate (Gemini mark cropped) */
  candleClose: "/poetry/portraits/n31-candle-clean.jpg",
  /** landscape — motion blur, 2 a.m. */
  motionBlur: "/poetry/portraits/n15-2571.png",
  /** landscape — grainy crown close (unused reserve) */
  crownHands: "/poetry/portraits/n08-2910.png",
} as const;

export type PortraitKey = keyof typeof portraits;
