/** Slim Echo control helpers — no mode router (portfolio uses Network only). */

export function clamp01(value) {
  return Math.min(1, Math.max(0, value));
}

export function densityToCount(density, min, max) {
  if (min === undefined) min = 8;
  if (max === undefined) max = 40;
  const d = clamp01(density);
  return Math.round(min + d * (max - min));
}

export function getContainerSize(container) {
  const rect = container.getBoundingClientRect();
  const width = rect.width || container.clientWidth;
  const height = rect.height || container.clientHeight;
  return {
    width: Math.max(1, Math.round(width)),
    height: Math.max(1, Math.round(height)),
  };
}
