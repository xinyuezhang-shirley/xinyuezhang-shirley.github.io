import type { ReactNode } from "react";

/** Soft wrapper for curated print clusters — enables neighbor hover dimming. */
export function EditorialCluster({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return <div className={`photo-cluster ${className}`.trim()}>{children}</div>;
}
