import type { PhotoPrint } from "../collections";
import { FloatingPrint } from "./FloatingPrint";

interface ContactSheetProps {
  prints: PhotoPrint[];
  onOpen?: (src: string) => void;
  label?: string;
  className?: string;
  /** Defaults to the flexible rhythm strip; pass `layout-macro__sheet` for a 2× grid. */
  sheetClassName?: string;
}

/** Dense strip of tiny proofs — not equal heroes. */
export function ContactSheet({
  prints,
  onOpen,
  label = "Contact",
  className = "",
  sheetClassName = "layout-rhythm__sheet",
}: ContactSheetProps) {
  return (
    <div className={className}>
      {label ? <div className="photo-sheet-label">{label}</div> : null}
      <div className={sheetClassName}>
        {prints.map((print, i) => (
          <FloatingPrint
            key={print.id}
            print={{ ...print, size: print.size ?? "proof" }}
            onOpen={onOpen}
            delayMs={i * 40}
          />
        ))}
      </div>
    </div>
  );
}
