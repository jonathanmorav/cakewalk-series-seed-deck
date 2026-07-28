export function normalizeHash(hash: string) {
  const value = hash.replace(/^#/, "").trim();
  if (!value) return "";

  try {
    return decodeURIComponent(value);
  } catch {
    return value;
  }
}

export function slideIndexFromHash(slideIds: string[], hash: string) {
  const id = normalizeHash(hash);
  const index = slideIds.indexOf(id);
  return index >= 0 ? index : 0;
}

export function clampSlideIndex(index: number, total: number) {
  if (total <= 0) return 0;
  return Math.min(Math.max(index, 0), total - 1);
}

export function isInteractiveTarget(target: EventTarget | null) {
  if (typeof Element === "undefined" || !(target instanceof Element)) return false;

  return Boolean(
    target.closest(
      "a, button, input, textarea, select, summary, [contenteditable='true'], [role='button'], [role='link'], [role='menuitem']",
    ),
  );
}
