/* eslint-disable react-refresh/only-export-components -- this is the intentional single-file deck authoring surface */
import { useEffect, useState } from "react";
import type { LucideIcon } from "lucide-react";
import {
  ArrowRight,
  BookOpenText,
  CloudUpload,
  Code2,
  FileText,
  Link2,
  MonitorPlay,
  PackageCheck,
} from "lucide-react";
import type { DeckSlide } from "./types";

interface DeckMonth {
  label: string;
  dateTime: string;
}

export function formatDeckMonth(date: Date): DeckMonth {
  return {
    label: new Intl.DateTimeFormat("en-US", {
      month: "long",
      year: "numeric",
    }).format(date),
    dateTime: `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`,
  };
}

function CurrentDeckMonth() {
  const [month, setMonth] = useState(() => formatDeckMonth(new Date()));

  useEffect(() => {
    const syncMonth = () => setMonth(formatDeckMonth(new Date()));
    const interval = window.setInterval(syncMonth, 60 * 60 * 1000);

    window.addEventListener("focus", syncMonth);
    document.addEventListener("visibilitychange", syncMonth);

    return () => {
      window.clearInterval(interval);
      window.removeEventListener("focus", syncMonth);
      document.removeEventListener("visibilitychange", syncMonth);
    };
  }, []);

  return (
    <time className="investor-cover__date" dateTime={month.dateTime}>
      {month.label}
    </time>
  );
}

function Eyebrow({ children }: { children: string }) {
  return <p className="eyebrow">{children}</p>;
}

function SlideHeading({ children }: { children: React.ReactNode }) {
  return <h1 className="slide-heading">{children}</h1>;
}

function Lead({ children }: { children: React.ReactNode }) {
  return <p className="slide-lead">{children}</p>;
}

function CoverSlide() {
  return (
    <div className="investor-cover">
      <img
        className="investor-cover__logo"
        src={`${import.meta.env.BASE_URL}brand/cakewalk-logo-orange.svg`}
        alt="Cakewalk"
      />
      <div className="investor-cover__copy">
        <h1 className="investor-cover__title">Series Seed Investor Deck</h1>
        <CurrentDeckMonth />
      </div>
    </div>
  );
}

function MissionSlide() {
  return (
    <div className="ceremony-layout">
      <h1 className="ceremony-title">
        <span className="ceremony-line">Our mission is to make</span>{" "}
        <span className="ceremony-line">high quality employee benefits</span>{" "}
        <span className="ceremony-line ceremony-title__emphasis">accessible and easy to offer</span>{" "}
        <span className="ceremony-line">for every small business.</span>
      </h1>
    </div>
  );
}

function SolutionSlide() {
  return (
    <div className="ceremony-layout">
      <h1 className="ceremony-title ceremony-title--solution">
        <span className="ceremony-line">Cakewalk enables all small business owners</span>{" "}
        <span className="ceremony-line">
          to offer <span className="ceremony-title__emphasis">enterprise grade employee benefits</span>
        </span>{" "}
        <span className="ceremony-line">without friction.</span>
      </h1>
    </div>
  );
}

const burdenPoints = [
  { number: "01", stage: "Compare", detail: "Confusing products and terminology" },
  { number: "02", stage: "Coordinate", detail: "Disconnected carriers, forms, and systems" },
  { number: "03", stage: "Understand", detail: "Unclear coverage and costs" },
  { number: "04", stage: "Keep current", detail: "Ongoing employee and billing changes" },
];

function BurdenSlide() {
  return (
    <div className="burden-layout">
      <h1 className="burden-title">
        <span>Too many calls. Too many forms.</span>
        <span className="burden-title__emphasis">Too much uncertainty.</span>
      </h1>

      <ol className="burden-grid" aria-label="The work that turns benefits into a second job">
        {burdenPoints.map((point) => (
          <li className="burden-item" key={point.number}>
            <div className="burden-stage">
              <span>{point.number}</span>
              <strong>{point.stage}</strong>
            </div>
            <div className="burden-connector" aria-hidden="true" />
            <div className="burden-card">
              <p>{point.detail}</p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}

const proofPoints = [
  { value: "16:9", label: "Fit-to-screen canvas", detail: "A consistent presentation frame with a readable portrait fallback." },
  { value: "#hash", label: "Shareable slide links", detail: "Every slide has a stable URL and works with browser Back and Forward." },
  { value: "Static", label: "Zero server runtime", detail: "Vite emits portable files that GitHub Pages can serve directly." },
  { value: "PDF", label: "Complete print view", detail: "The print stylesheet renders the whole story, not only the active slide." },
];

function ProofSlide() {
  return (
    <div className="content-stack">
      <div className="title-block title-block--compact">
        <Eyebrow>PROOF OF CRAFT</Eyebrow>
        <SlideHeading>The system stays out of the story.</SlideHeading>
        <Lead>These are delivery guarantees built into the starter, so future deck work can focus on the narrative.</Lead>
      </div>
      <div className="metric-grid">
        {proofPoints.map((point, index) => (
          <article className={`metric-card${index === 0 ? " metric-card--lead" : ""}`} key={point.value}>
            <span className="metric-card__value">{point.value}</span>
            <h2>{point.label}</h2>
            <p>{point.detail}</p>
          </article>
        ))}
      </div>
    </div>
  );
}

const shipSteps: Array<{ icon: LucideIcon; kicker: string; title: string; detail: string; code: string }> = [
  { icon: FileText, kicker: "EDIT", title: "Shape the story", detail: "Reorder slides and replace the starter copy in one registry.", code: "src/deck/slides.tsx" },
  { icon: PackageCheck, kicker: "VERIFY", title: "Build with confidence", detail: "Type checking, linting, tests, and the production build run together.", code: "npm run check" },
  { icon: CloudUpload, kicker: "PUBLISH", title: "Ship to Pages", detail: "Push main and let the official Pages actions deploy the static artifact.", code: "git push origin main" },
];

function ShipSlide() {
  return (
    <div className="content-stack content-stack--ink">
      <div className="title-block title-block--compact">
        <Eyebrow>DELIVERY</Eyebrow>
        <SlideHeading>Edit. Push. Present.</SlideHeading>
        <Lead>The new path is intentionally boring: source at the repository root, generated output in CI, and no force-added build folder.</Lead>
      </div>
      <div className="ship-grid">
        {shipSteps.map(({ icon: Icon, kicker, title, detail, code }, index) => (
          <article className="ship-card" key={kicker}>
            <div className="ship-card__icon"><Icon aria-hidden="true" /></div>
            <span className="mini-overline">{kicker}</span>
            <h2>{title}</h2>
            <p>{detail}</p>
            <code>{code}</code>
            {index < shipSteps.length - 1 && <ArrowRight className="ship-card__connector" aria-hidden="true" />}
          </article>
        ))}
      </div>
    </div>
  );
}

function ClosingSlide() {
  return (
    <div className="closing-grid">
      <div>
        <Eyebrow>YOUR TURN</Eyebrow>
        <h1 className="statement-title">Ready to make the story <em>yours.</em></h1>
        <p className="closing-lead">The environment is set. Replace the starter narrative, add approved imagery, and let the system handle the room.</p>
        <a className="primary-action" href="#cover">
          Restart the deck <ArrowRight aria-hidden="true" />
        </a>
      </div>
      <div className="closing-notes">
        <article>
          <Code2 aria-hidden="true" />
          <div><span className="mini-overline">AUTHOR</span><strong>Edit `src/deck/slides.tsx`</strong></div>
        </article>
        <article>
          <MonitorPlay aria-hidden="true" />
          <div><span className="mini-overline">PRESENT</span><strong>Press F for fullscreen</strong></div>
        </article>
        <article>
          <BookOpenText aria-hidden="true" />
          <div><span className="mini-overline">HAND OFF</span><strong>README covers publishing</strong></div>
        </article>
        <article>
          <Link2 aria-hidden="true" />
          <div><span className="mini-overline">SHARE</span><strong>Copy any slide's hash URL</strong></div>
        </article>
      </div>
    </div>
  );
}

export const slides: DeckSlide[] = [
  {
    id: "cover",
    title: "Series Seed Investor Deck",
    section: "Cover slide",
    tone: "canvas",
    notes: "Welcome the room and introduce the Series Seed story.",
    render: () => <CoverSlide />,
  },
  {
    id: "story",
    title: "Our mission",
    section: "Mission",
    tone: "ink",
    brandPlacement: "footer",
    notes: "Pause on the mission. Emphasize accessible and easy to offer.",
    render: () => <MissionSlide />,
  },
  {
    id: "system",
    title: "The solution",
    section: "The solution",
    tone: "ink",
    brandPlacement: "footer",
    notes: "Introduce Cakewalk as the low-friction path to enterprise-grade benefits.",
    render: () => <SolutionSlide />,
  },
  {
    id: "flow",
    title: "Offering benefits shouldn’t become a second job",
    section: "The problem",
    tone: "sidewalk",
    brandPlacement: "footer",
    notes: "The problem isn’t that small-business owners don’t care about benefits. The problem is that the process was never designed around them. You’re expected to compare unfamiliar products, coordinate paperwork, enroll employees, handle billing, and manage changes—all while running the business. Cakewalk takes that work off your plate.",
    render: () => <BurdenSlide />,
  },
  {
    id: "proof",
    title: "Proof of craft",
    section: "Proof of craft",
    tone: "cream",
    render: () => <ProofSlide />,
  },
  {
    id: "ship",
    title: "Edit, push, present",
    section: "Delivery",
    tone: "ink",
    render: () => <ShipSlide />,
  },
  {
    id: "close",
    title: "Make the story yours",
    section: "Your turn",
    tone: "blush",
    render: () => <ClosingSlide />,
  },
];
