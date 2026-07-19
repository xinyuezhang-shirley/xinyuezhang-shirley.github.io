import type { PhotoPrint } from "../collections";
import { FloatingPrint } from "./FloatingPrint";

/** Tiny intentional crop — teaches looking without repeating a full print. */
export function DetailCrop({
  print,
  onOpen,
  className = "",
  delayMs = 0,
}: {
  print: PhotoPrint;
  onOpen?: (src: string) => void;
  className?: string;
  delayMs?: number;
}) {
  return (
    <FloatingPrint
      print={print}
      onOpen={onOpen}
      className={className}
      delayMs={delayMs}
    />
  );
}
