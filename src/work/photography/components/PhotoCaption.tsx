/** Legacy helpers — captions now render inside FloatingPrint. */
export function PhotoCaption({ children }: { children: string }) {
  return <span className="photo-frame__caption">{children}</span>;
}

export function PhotoNote({
  children,
}: {
  children: string;
  warm?: boolean;
}) {
  return <p className="photo-collection__rationale">{children}</p>;
}
