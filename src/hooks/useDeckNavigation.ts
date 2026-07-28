import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { DeckSlide } from "../deck/types";
import { clampSlideIndex, normalizeHash, slideIndexFromHash } from "../deck/navigation";

interface NavigateOptions {
  replace?: boolean;
}

export function useDeckNavigation(slides: DeckSlide[]) {
  const slideIds = useMemo(() => slides.map((slide) => slide.id), [slides]);
  const [currentIndex, setCurrentIndex] = useState(() =>
    typeof window === "undefined" ? 0 : slideIndexFromHash(slideIds, window.location.hash),
  );
  const [direction, setDirection] = useState(0);
  const currentIndexRef = useRef(currentIndex);

  const commitIndex = useCallback(
    (requestedIndex: number, options: NavigateOptions = {}) => {
      const nextIndex = clampSlideIndex(requestedIndex, slides.length);
      const previousIndex = currentIndexRef.current;

      currentIndexRef.current = nextIndex;
      setDirection(nextIndex === previousIndex ? 0 : nextIndex > previousIndex ? 1 : -1);
      setCurrentIndex(nextIndex);

      const slide = slides[nextIndex];
      if (!slide || typeof window === "undefined") return;

      const nextHash = `#${encodeURIComponent(slide.id)}`;
      if (window.location.hash === nextHash) return;

      const nextUrl = `${window.location.pathname}${window.location.search}${nextHash}`;
      window.history[options.replace ? "replaceState" : "pushState"]({}, "", nextUrl);
    },
    [slides],
  );

  useEffect(() => {
    const currentSlide = slides[currentIndexRef.current];
    if (!currentSlide) return;

    if (normalizeHash(window.location.hash) !== currentSlide.id) {
      commitIndex(currentIndexRef.current, { replace: true });
    }

    const syncFromLocation = () => {
      const nextIndex = slideIndexFromHash(slideIds, window.location.hash);
      const previousIndex = currentIndexRef.current;
      currentIndexRef.current = nextIndex;
      setDirection(nextIndex === previousIndex ? 0 : nextIndex > previousIndex ? 1 : -1);
      setCurrentIndex(nextIndex);
    };

    window.addEventListener("popstate", syncFromLocation);
    window.addEventListener("hashchange", syncFromLocation);
    return () => {
      window.removeEventListener("popstate", syncFromLocation);
      window.removeEventListener("hashchange", syncFromLocation);
    };
  }, [commitIndex, slideIds, slides]);

  const next = useCallback(() => commitIndex(currentIndexRef.current + 1), [commitIndex]);
  const previous = useCallback(() => commitIndex(currentIndexRef.current - 1), [commitIndex]);
  const first = useCallback(() => commitIndex(0), [commitIndex]);
  const last = useCallback(() => commitIndex(slides.length - 1), [commitIndex, slides.length]);

  return {
    currentIndex,
    currentSlide: slides[currentIndex],
    direction,
    goTo: commitIndex,
    next,
    previous,
    first,
    last,
  };
}
