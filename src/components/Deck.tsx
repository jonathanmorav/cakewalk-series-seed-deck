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
  ["O", "Slide overview"],
  ["F", "Fullscreen"],
  ["?", "Keyboard shortcuts"],
];

export function Deck({ slides }: DeckProps) {
  const { currentIndex, currentSlide, direction, goTo, next, previous, first, last } = useDeckNavigation(slides);
  const [overviewOpen, setOverviewOpen] = useState(false);
  const [helpOpen, setHelpOpen] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(Boolean(document.fullscreenElement));
  const touchStartRef = useRef<TouchStart | null>(null);
  const prefersReducedMotion = useReducedMotion();

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
        setOverviewOpen(false);
        setHelpOpen(false);
        return;
      }

      if (overviewOpen || helpOpen || event.metaKey || event.ctrlKey || event.altKey) return;
      if (isInteractiveTarget(event.target)) return;

      const key = event.key.toLowerCase();
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
  }, [first, helpOpen, last, next, overviewOpen, previous, toggleFullscreen]);

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
          onPrevious={previous}
          onNext={next}
          onOverview={() => setOverviewOpen(true)}
          onHelp={() => setHelpOpen(true)}
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
          <div className="overlay" role="presentation" onMouseDown={(event) => event.target === event.currentTarget && setOverviewOpen(false)}>
            <section className="overlay__panel overlay__panel--wide" role="dialog" aria-modal="true" aria-labelledby="overview-title">
              <header className="overlay__header">
                <div>
                  <span className="eyebrow">DECK OVERVIEW</span>
                  <h2 id="overview-title">Choose a slide</h2>
                </div>
                <button className="icon-button" type="button" onClick={() => setOverviewOpen(false)} aria-label="Close overview" autoFocus>
                  <X aria-hidden="true" />
                </button>
              </header>
              <div className="overview-grid">
                {slides.map((slide, index) => (
                  <button
                    type="button"
                    className={`overview-card${index === currentIndex ? " overview-card--active" : ""}`}
                    key={slide.id}
                    onClick={() => {
                      goTo(index);
                      setOverviewOpen(false);
                    }}
                  >
                    <span className="overview-card__number">{String(index + 1).padStart(2, "0")}</span>
                    <span className="overview-card__section">{slide.section}</span>
                    <strong>{slide.title}</strong>
                  </button>
                ))}
              </div>
            </section>
          </div>
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
