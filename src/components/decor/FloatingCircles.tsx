import { useEffect, useState, type RefObject } from "react";
import { motion } from "framer-motion";

interface Fragment {
  x: number;
  y: number;
  d: number;
  opacity: number;
  blur?: number;
  /** paint under the portrait plane */
  behindPhoto?: boolean;
}

/** Intentional diagonal orbit — fewer discs, print-like spacing. */
const fragments: Fragment[] = [
  { x: 58, y: 14, d: 96, opacity: 0.92, behindPhoto: true },
  { x: 49, y: 28, d: 58, opacity: 0.78 },
  { x: 42, y: 42, d: 118, opacity: 0.95 },
  { x: 36, y: 56, d: 36, opacity: 0.42, blur: 1.5 },
  { x: 52, y: 62, d: 72, opacity: 0.7, behindPhoto: true },
  { x: 30, y: 72, d: 48, opacity: 0.55, blur: 0.5 },
  { x: 22, y: 38, d: 26, opacity: 0.28, blur: 2 },
  { x: 46, y: 84, d: 40, opacity: 0.5, blur: 1 },
];

interface FloatingCirclesProps {
  heroRef: RefObject<HTMLDivElement>;
  photoRef: RefObject<HTMLDivElement>;
  photoSrc: string;
  objectPosition: { x: number; y: number };
  naturalSize: { width: number; height: number };
  layer?: "front" | "back";
}

interface Geometry {
  heroW: number;
  heroH: number;
  bgW: number;
  bgH: number;
  imageOriginX: number;
  imageOriginY: number;
}

export function FloatingCircles({
  heroRef,
  photoRef,
  photoSrc,
  objectPosition,
  naturalSize,
  layer = "front",
}: FloatingCirclesProps) {
  const [geo, setGeo] = useState<Geometry | null>(null);

  useEffect(() => {
    const measure = () => {
      const hero = heroRef.current;
      const photo = photoRef.current;
      if (!hero || !photo) return;

      const heroRect = hero.getBoundingClientRect();
      const photoRect = photo.getBoundingClientRect();

      const scale = Math.max(photoRect.width / naturalSize.width, photoRect.height / naturalSize.height);
      const bgW = naturalSize.width * scale;
      const bgH = naturalSize.height * scale;

      const photoLeft = photoRect.left - heroRect.left;
      const photoTop = photoRect.top - heroRect.top;

      const imageOriginX = photoLeft - (bgW - photoRect.width) * (objectPosition.x / 100);
      const imageOriginY = photoTop - (bgH - photoRect.height) * (objectPosition.y / 100);

      setGeo({ heroW: heroRect.width, heroH: heroRect.height, bgW, bgH, imageOriginX, imageOriginY });
    };

    measure();
    const observer = new ResizeObserver(measure);
    if (heroRef.current) observer.observe(heroRef.current);
    if (photoRef.current) observer.observe(photoRef.current);
    return () => observer.disconnect();
  }, [heroRef, photoRef, naturalSize, objectPosition]);

  if (!geo) return null;

  const items = fragments.filter((f) => (layer === "back" ? f.behindPhoto : !f.behindPhoto));
  if (!items.length) return null;

  return (
    <div
      className={`absolute inset-0 overflow-hidden pointer-events-none ${
        layer === "back" ? "z-0" : "z-10"
      }`}
      aria-hidden="true"
    >
      {items.map((f, i) => {
        const r = f.d / 2;
        const heroX = (f.x / 100) * geo.heroW;
        const heroY = (f.y / 100) * geo.heroH;
        const bgPosX = r - (heroX - geo.imageOriginX);
        const bgPosY = r - (heroY - geo.imageOriginY);

        return (
          <motion.div
            key={`${layer}-${i}-${f.x}-${f.y}-${f.d}`}
            className="absolute rounded-full"
            style={{
              left: `${f.x}%`,
              top: `${f.y}%`,
              width: f.d,
              height: f.d,
              marginLeft: -r,
              marginTop: -r,
              backgroundImage: `url(${photoSrc})`,
              backgroundSize: `${geo.bgW}px ${geo.bgH}px`,
              backgroundPosition: `${bgPosX}px ${bgPosY}px`,
              opacity: f.opacity,
              filter: f.blur ? `blur(${f.blur}px)` : undefined,
            }}
            animate={{
              x: [0, i % 2 === 0 ? 0.8 : -0.8, 0],
              y: [0, (i % 3 === 0 ? -1 : 1) * 1.1, 0],
            }}
            transition={{
              duration: 32 + (i % 5) * 3,
              repeat: Infinity,
              ease: "easeInOut",
              delay: (i % 6) * 1.1,
            }}
          />
        );
      })}
    </div>
  );
}
