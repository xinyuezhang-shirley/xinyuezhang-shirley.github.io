import type { PhotoPrint } from "../collections";
import { FloatingPrint } from "./FloatingPrint";

interface ContactSheetProps {
  prints: PhotoPrint[];
  onOpen?: (src: string) => void;
  label?: string;
  className?: string;
}

/** Same-study grid — cells large enough to read, never decorative thumbnails. */
export function ContactSheet({
  prints,
  onOpen,
  label,
  className = "",
}: ContactSheetProps) {
  return (
    <div className={`photo-sheet ${className}`.trim()}>
      {label ? <p className="photo-sheet__label">{label}</p> : null}
      <div className="photo-sheet__grid">
        {prints.map((print, i) => (
          <FloatingPrint
            key={print.id}
            print={print}
            role="frame"
            onOpen={onOpen}
            delayMs={i * 35}
          />
        ))}
      </div>
    </div>
  );
}
