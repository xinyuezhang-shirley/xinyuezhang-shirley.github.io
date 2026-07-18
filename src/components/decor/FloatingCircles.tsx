import { useEffect, useState, type RefObject } from "react";
import { motion } from "framer-motion";

interface Fragment {
  x: number; // position on screen, % of hero width
  y: number; // position on screen, % of hero height
  d: number; // diameter, px
  opacity: number;
  blur?: number;
}

// Hand-placed: dense right where the photo's edge sits, thinning out into the
// whitespace, with a few stragglers traveling deep into the text region.
// Curated diameters — small 20-30, medium 40-70, large 80-120, one oversized.
const fragments: Fragment[] = [
  { x: 44, y: 8, d: 35, opacity: 0.85 },
  { x: 48, y: 18, d: 90, opacity: 0.95 },
  { x: 56, y: 12, d: 60, opacity: 0.9 },
  { x: 40, y: 30, d: 45, opacity: 0.8 },
  { x: 52, y: 40, d: 120, opacity: 1 },
  { x: 60, y: 34, d: 50, opacity: 0.9 },
  { x: 35, y: 50, d: 28, opacity: 0.65, blur: 1 },
  { x: 46, y: 60, d: 70, opacity: 0.85 },
  { x: 58, y: 66, d: 40, opacity: 0.85 },
  { x: 50, y: 78, d: 55, opacity: 0.85 },
  { x: 62, y: 80, d: 30, opacity: 0.8 },
  { x: 28, y: 22, d: 25, opacity: 0.55, blur: 1.5 },
  { x: 22, y: 68, d: 24, opacity: 0.5, blur: 1.5 },
  { x: 14, y: 45, d: 20, opacity: 0.4, blur: 2 },
  { x: 32, y: 86, d: 26, opacity: 0.45, blur: 1.5 },
];

interface FloatingCirclesProps {
  heroRef: RefObject<HTMLDivElement>;
  photoRef: RefObject<HTMLDivElement>;
  photoSrc: string;
  objectPosition: { x: number; y: number }; // %, must match the <img>'s object-position
  naturalSize: { width: number; height: number };
}

interface Geometry {
  heroW: number;
  heroH: number;
  bgW: number;
  bgH: number;
  imageOriginX: number; // hero-space px where the (scaled) source image's top-left corner sits
  imageOriginY: number;
}

export function FloatingCircles({ heroRef, photoRef, photoSrc, objectPosition, naturalSize }: FloatingCirclesProps) {
  const [geo, setGeo] = useState<Geometry | null>(null);

  useEffect(() => {
    const measure = () => {
      const hero = heroRef.current;
      const photo = photoRef.current;
      if (!hero || !photo) return;

      const heroRect = hero.getBoundingClientRect();
      const photoRect = photo.getBoundingClientRect();

      // object-fit: cover scale — same scale the real <img> renders at
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

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      {fragments.map((f, i) => {
        const r = f.d / 2;
        const heroX = (f.x / 100) * geo.heroW;
        const heroY = (f.y / 100) * geo.heroH;
        const bgPosX = r - (heroX - geo.imageOriginX);
        const bgPosY = r - (heroY - geo.imageOriginY);

        return (
          <motion.div
            key={i}
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
              x: [0, (i % 3) - 1, 0, (i % 2 === 0 ? -1 : 1) * 1.5, 0],
              y: [0, (i % 4) - 1.5, 0, (i % 3 === 0 ? -1 : 1) * 2, 0],
            }}
            transition={{
              duration: 26 + (i % 8) * 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: (i % 9) * 0.8,
            }}
          />
        );
      })}
    </div>
  );
}
