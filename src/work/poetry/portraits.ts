/**
 * Self-portrait series for the poetry zine.
 * COMPOSITES = complete editorial layouts — show entire, never crop.
 * SINGLES = one photograph — show entire, never invent crops.
 */
export const portraits = {
  /** Composite: two stacked frames (clear + crown/hand blur). */
  crownClose: "/poetry/portraits/crown-close.png",
  /** Composite: nested crown + cake. */
  crownCake: "/poetry/portraits/crown-cake.png",
  /** Single: hand reaching through frame, crown in shadow. */
  handReach: "/poetry/portraits/hand-reach.png",
  /** Single: sepia grain, paper crown. */
  sepiaCrown: "/poetry/portraits/sepia-crown.png",
  /** Composite: candle diptych. */
  candleGaze: "/poetry/portraits/candle-gaze.png",
  /** Composite: B&W print on dark ground. */
  flashBw: "/poetry/portraits/flash-bw.png",
  /** Composite: reclining portrait + hand strip. */
  closeEyes: "/poetry/portraits/close-eyes.png",
  /** Composite: staggered cake triptych with !!! */
  layeredCollage: "/poetry/portraits/layered-collage.png",
  /** Composite: three crown/hand frames. */
  shadowTurn: "/poetry/portraits/shadow-turn.png",
} as const;

export type PortraitKey = keyof typeof portraits;
