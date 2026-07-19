export function PhotoCaption({ children }: { children: string }) {
  return <span className="photo-print__caption">{children}</span>;
}

export function PhotoNote({
  children,
  warm = false,
}: {
  children: string;
  warm?: boolean;
}) {
  return (
    <p className={`photo-note${warm ? " photo-note--warm" : ""}`}>{children}</p>
  );
}
