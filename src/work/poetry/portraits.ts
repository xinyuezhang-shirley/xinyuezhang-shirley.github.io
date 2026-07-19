/** Self-portrait series — editorial motifs, not profile pics. */
export const portraits = {
  crownClose: "/poetry/portraits/crown-close.png",
  crownCake: "/poetry/portraits/crown-cake.png",
  handReach: "/poetry/portraits/hand-reach.png",
  sepiaCrown: "/poetry/portraits/sepia-crown.png",
  candleGaze: "/poetry/portraits/candle-gaze.png",
  flashBw: "/poetry/portraits/flash-bw.png",
  closeEyes: "/poetry/portraits/close-eyes.png",
  layeredCollage: "/poetry/portraits/layered-collage.png",
  shadowTurn: "/poetry/portraits/shadow-turn.png",
} as const;

export type PortraitKey = keyof typeof portraits;

/** Supporting images already in the portfolio. */
export const scraps = {
  butterfly: "/photography/Zhang_butterfly.jpg",
  deer: "/photography/Zhang_deer.jpg",
  blurry: "/photography/Zhang_blurry.jpg",
  texture: "/photography/Zhang_texture.jpg",
  cupcake: "/photography/Zhang_Cupcake.png",
  portal: "/photography/Zhang_Portal.jpg",
  goddess: "/art/goddess.PNG",
  light: "/art/light.JPEG",
  vernon: "/art/vernon.JPEG",
  celestial: "/work/echo/celestial.jpg",
} as const;
