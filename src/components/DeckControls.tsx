import { ChevronLeft, ChevronRight, Maximize2, Menu, Minimize2 } from "lucide-react";
import type { Ref } from "react";

interface DeckControlsProps {
  currentIndex: number;
  total: number;
  isFullscreen: boolean;
  overviewOpen: boolean;
  overviewButtonRef: Ref<HTMLButtonElement>;
  onPrevious: () => void;
  onNext: () => void;
  onOverview: () => void;
  onFullscreen: () => void;
}

export function DeckControls({
  currentIndex,
  total,
  isFullscreen,
  overviewOpen,
  overviewButtonRef,
  onPrevious,
  onNext,
  onOverview,
  onFullscreen,
}: DeckControlsProps) {
  return (
    <nav className="deck-controls" aria-label="Presentation controls">
      <button
        type="button"
        className="control-button"
        onClick={onPrevious}
        disabled={currentIndex === 0}
        aria-label="Previous slide"
        title="Previous slide (Left arrow)"
      >
        <ChevronLeft aria-hidden="true" />
      </button>

      <button
        type="button"
        className={`control-button control-button--wide control-button--overview${overviewOpen ? " control-button--active" : ""}`}
        ref={overviewButtonRef}
        onClick={onOverview}
        aria-label={overviewOpen ? "Close section navigation" : "Open section navigation"}
        aria-controls="section-navigation"
        aria-expanded={overviewOpen}
        title="Sections (O)"
      >
        <Menu aria-hidden="true" />
        <span>
          {currentIndex + 1} / {total}
        </span>
      </button>

      <button
        type="button"
        className="control-button"
        onClick={onNext}
        disabled={currentIndex === total - 1}
        aria-label="Next slide"
        title="Next slide (Right arrow or Space)"
      >
        <ChevronRight aria-hidden="true" />
      </button>

      <span className="control-divider" aria-hidden="true" />

      <button
        type="button"
        className="control-button"
        onClick={onFullscreen}
        aria-label={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
        title="Fullscreen (F)"
      >
        {isFullscreen ? <Minimize2 aria-hidden="true" /> : <Maximize2 aria-hidden="true" />}
      </button>

    </nav>
  );
}
