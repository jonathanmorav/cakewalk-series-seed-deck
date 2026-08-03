import { useCallback, useEffect, useRef, useState, type TouchEvent } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { X } from "lucide-react";
import type { DeckSlide } from "../deck/types";
import { isInteractiveTarget } from "../deck/navigation";
import { useDeckNavigation } from "../hooks/useDeckNavigation";
import { DeckControls } from "./DeckControls";
import { SlideFrame } from "./SlideFrame";

interface DeckProps {
  slides: DeckSlide[];
}

interface TouchStart {
  x: number;
  y: number;
  interactive: boolean;
}

const shortcuts = [
  ["→ / ↓ / Space", "Next slide"],
  ["← / ↑ / Shift + Space", "Previous slide"],
  ["Home / End", "First / last slide"],
  ["O", "Section navigation"],
  ["F", "Fullscreen"],
  ["?", "Keyboard shortcuts"],
];

const sectionNavigationLabels: Record<string, string> = {
  cover: "Cover",
  cakewalk: "Cakewalk",
  flow: "The Need",
  system: "The Solution",
};

function getSectionNavigationLabel(slide: DeckSlide) {
  return sectionNavigationLabels[slide.id] ?? slide.section;
}

export function Deck({ slides }: DeckProps) {
  const { currentIndex, currentSlide, direction, goTo, next, previous, first, last } = useDeckNavigation(slides);
  const [overviewOpen, setOverviewOpen] = useState(false);
  const [helpOpen, setHelpOpen] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(Boolean(document.fullscreenElement));
  const touchStartRef = useRef<TouchStart | null>(null);
  const sectionNavigationRef = useRef<HTMLElement | null>(null);
  const sectionNavigationTriggerRef = useRef<HTMLButtonElement | null>(null);
  const activeSectionRef = useRef<HTMLButtonElement | null>(null);
  const prefersReducedMotion = useReducedMotion();

  const closeSectionNavigation = useCallback((restoreFocus = false) => {
    setOverviewOpen(false);
    if (restoreFocus) {
      window.requestAnimationFrame(() => sectionNavigationTriggerRef.current?.focus());
    }
  }, []);

  const toggleFullscreen = useCallback(async () => {
    try {
      if (document.fullscreenElement) {
        await document.exitFullscreen();
      } else {
        await document.documentElement.requestFullscreen();
      }
    } catch (error) {
      console.warn("Fullscreen is not available in this browser.", error);
    }
  }, []);

  useEffect(() => {
    const syncFullscreen = () => setIsFullscreen(Boolean(document.fullscreenElement));
    document.addEventListener("fullscreenchange", syncFullscreen);
    return () => document.removeEventListener("fullscreenchange", syncFullscreen);
  }, []);

  useEffect(() => {
    if (!currentSlide) return;
    document.title = `${currentSlide.title} | Cakewalk deck`;
  }, [currentSlide]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeSectionNavigation(overviewOpen);
        setHelpOpen(false);
        return;
      }

      const key = event.key.toLowerCase();
      if (overviewOpen && key === "o" && !event.metaKey && !event.ctrlKey && !event.altKey) {
        event.preventDefault();
        closeSectionNavigation(true);
        return;
      }

      if (overviewOpen || helpOpen || event.metaKey || event.ctrlKey || event.altKey) return;
      if (isInteractiveTarget(event.target)) return;

      if (["arrowright", "arrowdown", "pagedown"].includes(key)) {
        event.preventDefault();
        next();
      } else if (["arrowleft", "arrowup", "pageup"].includes(key)) {
        event.preventDefault();
        previous();
      } else if (event.key === " ") {
        event.preventDefault();
        if (event.shiftKey) previous();
        else next();
      } else if (key === "home") {
        event.preventDefault();
        first();
      } else if (key === "end") {
        event.preventDefault();
        last();
      } else if (key === "o") {
        event.preventDefault();
        setOverviewOpen(true);
      } else if (key === "f") {
        event.preventDefault();
        void toggleFullscreen();
      } else if (event.key === "?") {
        event.preventDefault();
        setHelpOpen(true);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [closeSectionNavigation, first, helpOpen, last, next, overviewOpen, previous, toggleFullscreen]);

  useEffect(() => {
    if (!overviewOpen) return;

    const focusFrame = window.requestAnimationFrame(() => {
      activeSectionRef.current?.scrollIntoView({ block: "nearest" });
      activeSectionRef.current?.focus({ preventScroll: true });
    });

    const closeOnOutsidePointer = (event: PointerEvent) => {
      const target = event.target;
      if (!(target instanceof Node)) return;
      if (sectionNavigationRef.current?.contains(target)) return;
      if (target instanceof Element && target.closest('[aria-controls="section-navigation"]')) return;
      closeSectionNavigation();
    };

    document.addEventListener("pointerdown", closeOnOutsidePointer);
    return () => {
      window.cancelAnimationFrame(focusFrame);
      document.removeEventListener("pointerdown", closeOnOutsidePointer);
    };
  }, [closeSectionNavigation, currentIndex, overviewOpen]);

  const onTouchStart = (event: TouchEvent<HTMLDivElement>) => {
    const touch = event.changedTouches[0];
    touchStartRef.current = {
      x: touch.clientX,
      y: touch.clientY,
      interactive: isInteractiveTarget(event.target),
    };
  };

  const onTouchEnd = (event: TouchEvent<HTMLDivElement>) => {
    const start = touchStartRef.current;
    touchStartRef.current = null;
    if (!start || start.interactive) return;

    const touch = event.changedTouches[0];
    const deltaX = touch.clientX - start.x;
    const deltaY = touch.clientY - start.y;

    if (Math.abs(deltaX) < 56 || Math.abs(deltaX) < Math.abs(deltaY) * 1.25) return;
    if (deltaX < 0) next();
    else previous();
  };

  if (!currentSlide) return null;

  const progress = slides.length <= 1 ? 100 : (currentIndex / (slides.length - 1)) * 100;

  return (
    <>
      <div className="deck-app">
        <main className="deck-viewport" onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
          <div className="deck-stage" aria-live="polite">
            <AnimatePresence initial={false} mode="wait" custom={direction}>
              <motion.div
                key={currentSlide.id}
                className="deck-stage__motion"
                custom={direction}
                initial={{ opacity: 0, x: prefersReducedMotion ? 0 : direction * 18 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: prefersReducedMotion ? 0 : direction * -12 }}
                transition={{ duration: prefersReducedMotion ? 0.01 : 0.42, ease: [0.22, 1, 0.36, 1] }}
              >
                <SlideFrame slide={currentSlide} index={currentIndex} total={slides.length}>
                  {currentSlide.render()}
                </SlideFrame>
              </motion.div>
            </AnimatePresence>
          </div>
        </main>

        <DeckControls
          currentIndex={currentIndex}
          total={slides.length}
          isFullscreen={isFullscreen}
          overviewOpen={overviewOpen}
          overviewButtonRef={sectionNavigationTriggerRef}
          onPrevious={previous}
          onNext={next}
          onOverview={() => setOverviewOpen((open) => !open)}
          onFullscreen={() => void toggleFullscreen()}
        />

        <div className="deck-progress" aria-hidden="true">
          <div className="deck-progress__band deck-progress__band--mint">
            <div className="deck-progress__fill" style={{ width: `${progress}%` }} />
          </div>
          <div className="deck-progress__band deck-progress__band--blue">
            <div className="deck-progress__fill" style={{ width: `${progress}%` }} />
          </div>
          <div className="deck-progress__band deck-progress__band--purple">
            <div className="deck-progress__fill" style={{ width: `${progress}%` }} />
          </div>
        </div>

        {overviewOpen && (
          <nav
            className="section-navigation"
            id="section-navigation"
            aria-labelledby="section-navigation-title"
            ref={sectionNavigationRef}
          >
            <header className="section-navigation__header">
              <h2 id="section-navigation-title">Sections</h2>
            </header>
            <ul className="section-navigation__list">
              {slides.map((slide, index) => {
                const isActive = index === currentIndex;
                return (
                  <li key={slide.id}>
                    <button
                      type="button"
                      className={`section-navigation__item${isActive ? " section-navigation__item--active" : ""}`}
                      aria-current={isActive ? "page" : undefined}
                      ref={isActive ? activeSectionRef : undefined}
                      onClick={() => {
                        goTo(index);
                        closeSectionNavigation(true);
                      }}
                    >
                      {getSectionNavigationLabel(slide)}
                    </button>
                  </li>
                );
              })}
            </ul>
          </nav>
        )}

        {helpOpen && (
          <div className="overlay" role="presentation" onMouseDown={(event) => event.target === event.currentTarget && setHelpOpen(false)}>
            <section className="overlay__panel" role="dialog" aria-modal="true" aria-labelledby="help-title">
              <header className="overlay__header">
                <div>
                  <span className="eyebrow">PRESENTATION MODE</span>
                  <h2 id="help-title">Keyboard shortcuts</h2>
                </div>
                <button className="icon-button" type="button" onClick={() => setHelpOpen(false)} aria-label="Close shortcuts" autoFocus>
                  <X aria-hidden="true" />
                </button>
              </header>
              <dl className="shortcut-list">
                {shortcuts.map(([keys, action]) => (
                  <div key={keys}>
                    <dt>{keys}</dt>
                    <dd>{action}</dd>
                  </div>
                ))}
              </dl>
            </section>
          </div>
        )}
      </div>

      <div className="print-deck" aria-hidden="true">
        {slides.map((slide, index) => (
          <div className="print-page" key={slide.id}>
            <SlideFrame slide={slide} index={index} total={slides.length}>
              {slide.renderPrint?.() ?? slide.render()}
            </SlideFrame>
          </div>
        ))}
      </div>
    </>
  );
}
