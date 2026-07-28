import type { ReactNode } from "react";

export type SlideTone = "canvas" | "sidewalk" | "cream" | "blush" | "ink";

export interface DeckSlide {
  id: string;
  title: string;
  section: string;
  tone?: SlideTone;
  notes?: string;
  render: () => ReactNode;
}
