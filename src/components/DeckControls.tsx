import { ChevronLeft, ChevronRight, CircleHelp, Maximize2, Minimize2, PanelsTopLeft } from "lucide-react";

interface DeckControlsProps {
  currentIndex: number;
  total: number;
  isFullscreen: boolean;
  onPrevious: () => void;
  onNext: () => void;
  onOverview: () => void;
  onHelp: () => void;
  onFullscreen: () => void;
}

export function DeckControls({
  currentIndex,
  total,
  isFullscreen,
  onPrevious,
  onNext,
  onOverview,
  onHelp,
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
        className="control-button control-button--wide"
        onClick={onOverview}
        aria-label="Open slide overview"
        title="Slide overview (O)"
      >
        <PanelsTopLeft aria-hidden="true" />
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

      <button
        type="button"
        className="control-button"
        onClick={onHelp}
        aria-label="Show keyboard shortcuts"
        title="Keyboard shortcuts (?)"
      >
        <CircleHelp aria-hidden="true" />
      </button>
    </nav>
  );
}
