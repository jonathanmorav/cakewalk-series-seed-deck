/* eslint-disable react-refresh/only-export-components -- this is the intentional single-file deck authoring surface */
import type { LucideIcon } from "lucide-react";
import {
  ArrowRight,
  BookOpenText,
  Boxes,
  Check,
  CloudUpload,
  Code2,
  FileText,
  Heart,
  Keyboard,
  Layers3,
  Link2,
  MonitorPlay,
  PackageCheck,
  ShieldCheck,
  Sparkles,
  Users,
  Workflow,
} from "lucide-react";
import type { DeckSlide } from "./types";

function Eyebrow({ children }: { children: string }) {
  return <p className="eyebrow">{children}</p>;
}

function SlideHeading({ children }: { children: React.ReactNode }) {
  return <h1 className="slide-heading">{children}</h1>;
}

function Lead({ children }: { children: React.ReactNode }) {
  return <p className="slide-lead">{children}</p>;
}

function FeatureCard({ icon: Icon, title, children }: { icon: LucideIcon; title: string; children: React.ReactNode }) {
  return (
    <article className="feature-card">
      <div className="icon-frame" aria-hidden="true">
        <Icon />
      </div>
      <div>
        <h2>{title}</h2>
        <p>{children}</p>
      </div>
    </article>
  );
}

function CoverSlide() {
  return (
    <div className="cover-grid">
      <div className="cover-copy">
        <Eyebrow>CAKEWALK DECK STARTER</Eyebrow>
        <h1 className="hero-title">
          Build benefits your team will <em>actually use.</em>
        </h1>
        <p className="hero-lead">
          A browser-native presentation system for clear stories, confident delivery, and effortless publishing.
        </p>
        <div className="tag-row" aria-label="Deck capabilities">
          <span>React</span>
          <span>16:9</span>
          <span>GitHub Pages</span>
        </div>
      </div>

      <div className="cover-visual" aria-label="Example Cakewalk benefits card">
        <div className="visual-orbit visual-orbit--one" aria-hidden="true" />
        <div className="visual-orbit visual-orbit--two" aria-hidden="true" />
        <article className="benefits-card">
          <header>
            <div>
              <span className="mini-overline">YOUR BENEFITS</span>
              <h2>Everything in one place.</h2>
            </div>
            <span className="status-dot" aria-label="Active" />
          </header>
          <div className="benefit-row">
            <span className="benefit-icon benefit-icon--coral"><Heart aria-hidden="true" /></span>
            <span><strong>Health</strong><small>Coverage that fits</small></span>
            <Check aria-hidden="true" />
          </div>
          <div className="benefit-row">
            <span className="benefit-icon benefit-icon--blue"><ShieldCheck aria-hidden="true" /></span>
            <span><strong>Dental + vision</strong><small>Simple add-ons</small></span>
            <Check aria-hidden="true" />
          </div>
          <div className="benefit-row">
            <span className="benefit-icon benefit-icon--mint"><Users aria-hidden="true" /></span>
            <span><strong>Your team</strong><small>Invited and ready</small></span>
            <Check aria-hidden="true" />
          </div>
        </article>
      </div>
    </div>
  );
}

function StatementSlide() {
  return (
    <div className="statement-layout">
      <Eyebrow>THE STORY</Eyebrow>
      <h1 className="statement-title">
        A great deck is a guided conversation, <em>not a scrollable document.</em>
      </h1>
      <div className="statement-rule" aria-hidden="true" />
      <p>One idea per beat. One clear next step. Enough system underneath that the speaker can stay present.</p>
    </div>
  );
}

function SystemSlide() {
  return (
    <div className="content-stack">
      <div className="title-block">
        <Eyebrow>THE SYSTEM</Eyebrow>
        <SlideHeading>A presentation system, not a pile of pages.</SlideHeading>
        <Lead>Keep the reference deck's strongest ideas, while removing its nested build, stale source files, and manual deployment steps.</Lead>
      </div>
      <div className="feature-grid">
        <FeatureCard icon={Layers3} title="One story registry">
          Slides, titles, sections, notes, and order live together in a single typed file.
        </FeatureCard>
        <FeatureCard icon={Keyboard} title="Presentation-first controls">
          Arrow keys, Space, touch gestures, fullscreen, overview, and browser history all agree.
        </FeatureCard>
        <FeatureCard icon={CloudUpload} title="Publish on every push">
          GitHub Actions builds the static site with the correct repository path and deploys the artifact.
        </FeatureCard>
      </div>
    </div>
  );
}

const flowSteps: Array<{ icon: LucideIcon; label: string; title: string; body: string; tone: string }> = [
  { icon: Boxes, label: "01", title: "Choose a bundle", body: "Put health, dental, and vision choices into one understandable frame.", tone: "coral" },
  { icon: Users, label: "02", title: "Invite your team", body: "Make the next action obvious and give every employee a clear path in.", tone: "blue" },
  { icon: Sparkles, label: "03", title: "Open enrollment", body: "Turn the peak moment into a confident, low-friction launch.", tone: "sunny" },
  { icon: Workflow, label: "04", title: "Keep it moving", body: "Manage the ongoing work without losing the simplicity of the first day.", tone: "mint" },
];

function FlowSlide() {
  return (
    <div className="content-stack">
      <div className="title-block title-block--compact">
        <Eyebrow>PRODUCT NARRATIVE</Eyebrow>
        <SlideHeading>From choice to enrollment, one clear path.</SlideHeading>
        <Lead>The deck components are flexible enough for the Cakewalk story and disciplined enough to keep every slide legible.</Lead>
      </div>
      <ol className="flow-grid">
        {flowSteps.map(({ icon: Icon, label, title, body, tone }) => (
          <li className={`flow-card flow-card--${tone}`} key={label}>
            <div className="flow-card__top">
              <span>{label}</span>
              <Icon aria-hidden="true" />
            </div>
            <h2>{title}</h2>
            <p>{body}</p>
            <ArrowRight className="flow-card__arrow" aria-hidden="true" />
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
    title: "Build benefits your team will actually use",
    section: "Cakewalk deck starter",
    tone: "canvas",
    notes: "Open with the outcome. The deck itself should disappear behind the conversation.",
    render: () => <CoverSlide />,
  },
  {
    id: "story",
    title: "A guided conversation",
    section: "The story",
    tone: "blush",
    notes: "Use this as a section-level statement beat. Pause before advancing.",
    render: () => <StatementSlide />,
  },
  {
    id: "system",
    title: "A presentation system",
    section: "The system",
    tone: "sidewalk",
    render: () => <SystemSlide />,
  },
  {
    id: "flow",
    title: "One clear path",
    section: "Product narrative",
    tone: "canvas",
    render: () => <FlowSlide />,
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
