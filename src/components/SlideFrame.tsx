import type { ReactNode } from "react";
import type { DeckSlide } from "../deck/types";

interface SlideFrameProps {
  slide: DeckSlide;
  index: number;
  total: number;
  children: ReactNode;
}

function assetUrl(path: string) {
  return `${import.meta.env.BASE_URL}${path}`;
}

export function SlideFrame({ slide, index, total, children }: SlideFrameProps) {
  const tone = slide.tone ?? "canvas";
  const brandPlacement = slide.brandPlacement ?? "header";
  const wordmark = tone === "ink" ? "brand/cakewalk-logo-white.svg" : "brand/cakewalk-logo-orange.svg";

  return (
    <section
      className={`slide slide--${tone}`}
      aria-label={`Slide ${index + 1} of ${total}: ${slide.title}`}
      data-slide-id={slide.id}
    >
      <div className="slide__ambient slide__ambient--one" aria-hidden="true" />
      <div className="slide__ambient slide__ambient--two" aria-hidden="true" />

      <header className="slide__chrome slide__chrome--top">
        <span className="slide__section">{slide.section}</span>
        {brandPlacement === "header" && <img className="slide__wordmark" src={assetUrl(wordmark)} alt="Cakewalk" />}
      </header>

      <div className="slide__body">{children}</div>

      <footer className="slide__chrome slide__chrome--bottom">
        <span className="slide__counter">
          {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
        </span>
        {brandPlacement === "footer" ? (
          <img className="slide__wordmark" src={assetUrl(wordmark)} alt="Cakewalk" />
        ) : (
          <img className="slide__mark" src={assetUrl("brand/cakewalk-mark.svg")} alt="" aria-hidden="true" />
        )}
      </footer>
    </section>
  );
}
