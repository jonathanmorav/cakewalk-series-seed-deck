/* eslint-disable react-refresh/only-export-components -- this is the intentional single-file deck authoring surface */
import { useEffect, useId, useState, type CSSProperties } from "react";
import {
  BookOpenText,
  BriefcaseBusiness,
  Check,
  ClipboardCheck,
  CreditCard,
  ExternalLink,
  FileText,
  LockKeyhole,
  RefreshCw,
  ShieldCheck,
  Store,
  Table2,
  UserRound,
  UserRoundCheck,
} from "lucide-react";
import { BusinessOnboardingAutoplay } from "../components/BusinessOnboardingAutoplay";
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
        <span className="ceremony-line">big-company employee benefits</span>{" "}
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
        <span className="ceremony-line">Cakewalk unlocks</span>{" "}
        <span className="ceremony-line ceremony-title__emphasis">
          Fortune 500-caliber employee benefits
        </span>{" "}
        <span className="ceremony-line">for small businesses.</span>
      </h1>
    </div>
  );
}

export const fragmentedBenefitsLifecycle = [
  {
    id: "broker-coordination",
    step: "01",
    label: "Broker coordination",
    detail: "Calls + referrals",
    icon: BriefcaseBusiness,
    tone: "blue",
    attentionDelay: "0s",
    staticX: "-35cqw",
    staticY: "-29cqh",
  },
  {
    id: "plan-comparison",
    step: "02",
    label: "Plan comparison",
    detail: "Carrier PDFs",
    icon: ShieldCheck,
    tone: "mint",
    attentionDelay: "1.75s",
    staticX: "0cqw",
    staticY: "-34cqh",
  },
  {
    id: "employee-census",
    step: "03",
    label: "Employee census",
    detail: "Spreadsheet",
    icon: Table2,
    tone: "sunny",
    attentionDelay: "3.5s",
    staticX: "35cqw",
    staticY: "-29cqh",
  },
  {
    id: "carrier-applications",
    step: "04",
    label: "Carrier applications",
    detail: "Forms + signatures",
    icon: FileText,
    tone: "purple",
    attentionDelay: "5.25s",
    staticX: "35cqw",
    staticY: "0cqh",
  },
  {
    id: "underwriting",
    step: "05",
    label: "Underwriting",
    detail: "More follow-up",
    icon: ClipboardCheck,
    tone: "blue",
    attentionDelay: "7s",
    staticX: "35cqw",
    staticY: "29cqh",
  },
  {
    id: "employee-enrollment",
    step: "06",
    label: "Employee enrollment",
    detail: "Emails + decisions",
    icon: UserRoundCheck,
    tone: "mint",
    attentionDelay: "8.75s",
    staticX: "0cqw",
    staticY: "34cqh",
  },
  {
    id: "billing-payroll",
    step: "07",
    label: "Billing + payroll",
    detail: "Separate systems",
    icon: CreditCard,
    tone: "sunny",
    attentionDelay: "10.5s",
    staticX: "-35cqw",
    staticY: "29cqh",
  },
  {
    id: "changes-renewals",
    step: "08",
    label: "Changes + renewals",
    detail: "Start all over",
    icon: RefreshCw,
    tone: "purple",
    attentionDelay: "12.25s",
    staticX: "-35cqw",
    staticY: "0cqh",
  },
] as const;

function BurdenSlide() {
  return (
    <div className="fragmented-benefits">
      <header className="fragmented-benefits__header">
        <h1 className="fragmented-benefits__title">
          Offering benefits is a <em>second job</em> for small-business owners.
        </h1>
      </header>

      <figure
        className="benefits-chaos"
        aria-label="The fragmented small-business benefits lifecycle: broker coordination, plan comparison, employee census, carrier applications, underwriting, employee enrollment, billing and payroll, and ongoing changes and renewals"
      >
        <svg className="benefits-chaos__connectors" viewBox="0 0 1000 360" preserveAspectRatio="none" aria-hidden="true">
          <ellipse className="benefits-chaos__orbit benefits-chaos__orbit--outer" cx="500" cy="180" rx="408" ry="145" />
          <ellipse className="benefits-chaos__orbit benefits-chaos__orbit--inner" cx="500" cy="180" rx="276" ry="105" />
          <path className="benefits-chaos__line benefits-chaos__line--blue" d="M500 180 C410 75 220 55 108 92" />
          <path className="benefits-chaos__line benefits-chaos__line--coral" d="M500 180 C620 75 790 55 902 92" />
          <path className="benefits-chaos__line benefits-chaos__line--mint" d="M500 180 C620 285 795 300 905 272" />
          <path className="benefits-chaos__line benefits-chaos__line--purple" d="M500 180 C385 288 215 302 95 270" />
          <path className="benefits-chaos__line benefits-chaos__line--return" d="M180 80 C700 322 265 322 820 78" />
          <path className="benefits-chaos__line benefits-chaos__line--return" d="M162 278 C740 35 282 34 845 280" />
        </svg>

        <div className="benefits-chaos__pressure" aria-hidden="true">
          <span />
          <span />
          <span />
        </div>

        <div className="benefits-chaos__actors">
          {fragmentedBenefitsLifecycle.map((stage) => {
            const StageIcon = stage.icon;
            return (
              <article
                className={`benefits-chaos__actor benefits-chaos__actor--${stage.tone}`}
                data-step={stage.step}
                key={stage.id}
                style={{
                  "--attention-delay": stage.attentionDelay,
                  "--static-x": stage.staticX,
                  "--static-y": stage.staticY,
                } as CSSProperties}
              >
                <span className="benefits-chaos__actor-icon" aria-hidden="true">
                  <StageIcon />
                </span>
                <span className="benefits-chaos__actor-copy">
                  <strong>{stage.label}</strong>
                  <small>{stage.detail}</small>
                </span>
                <span className="benefits-chaos__actor-step" aria-hidden="true">{stage.step}</span>
              </article>
            );
          })}
        </div>

        <article className="benefits-chaos__owner">
          <span className="benefits-chaos__owner-avatar" aria-hidden="true">
            <UserRound />
            <span className="benefits-chaos__owner-business">
              <Store />
            </span>
          </span>
          <span className="benefits-chaos__owner-copy">
            <span>No HR or benefits team</span>
            <strong>Small-business owner</strong>
            <small>Running the business—and managing every handoff.</small>
          </span>
        </article>

      </figure>
    </div>
  );
}

export const productDemos = [
  {
    id: "business-onboarding",
    label: "Business Onboarding",
    url: "https://demo.cakewalkbenefits.com/business-activation-zero-entry?order=census-first&devtools=1",
  },
  {
    id: "owner-dashboard",
    label: "Owner Dashboard",
    url: "https://demo.cakewalkbenefits.com/dashboard-v2?devtools=1",
  },
  {
    id: "benefits-wallet",
    label: "Benefits Wallet",
    url: "https://demo.cakewalkbenefits.com/benefits-wallet-v2?devtools=1",
  },
  {
    id: "member-enrollment",
    label: "Member Enrollment",
    url: "https://demo.cakewalkbenefits.com/enrollment-intro?devtools=1&enrollsim=1",
  },
] as const;

function compactDemoUrl(url: string) {
  const parsed = new URL(url);
  return `${parsed.hostname}${parsed.pathname === "/" ? "" : parsed.pathname}`;
}

function initialProductDemoId() {
  const requestedDemoId = new URLSearchParams(window.location.search).get("demo");
  return productDemos.find(({ id }) => id === requestedDemoId)?.id ?? productDemos[0].id;
}

function ProductBrowserHeadline() {
  return (
    <h1 className="product-browser-slide__title">
      <span>
        Fortune 500-caliber benefits, <em>made effortless.</em>
      </span>
    </h1>
  );
}

function ProductBrowserSlide() {
  const [activeDemoId, setActiveDemoId] = useState<(typeof productDemos)[number]["id"]>(initialProductDemoId);
  const [reloadKey, setReloadKey] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const tabGroupId = useId();
  const activeDemo = productDemos.find((demo) => demo.id === activeDemoId) ?? productDemos[0];

  const selectDemo = (demoId: (typeof productDemos)[number]["id"]) => {
    setActiveDemoId(demoId);
    setIsLoading(demoId !== "business-onboarding");
  };

  const focusDemo = (index: number) => {
    const demo = productDemos[index];
    selectDemo(demo.id);
    window.requestAnimationFrame(() => document.getElementById(`${tabGroupId}-${demo.id}`)?.focus());
  };

  const onTabKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>, index: number) => {
    let nextIndex: number;

    if (event.key === "ArrowRight") nextIndex = (index + 1) % productDemos.length;
    else if (event.key === "ArrowLeft") nextIndex = (index - 1 + productDemos.length) % productDemos.length;
    else if (event.key === "Home") nextIndex = 0;
    else if (event.key === "End") nextIndex = productDemos.length - 1;
    else return;

    event.preventDefault();
    focusDemo(nextIndex);
  };

  return (
    <div className="product-browser-slide">
      <ProductBrowserHeadline />

      <section className="product-browser" aria-label="Interactive Cakewalk product tour" data-deck-interactive>
        <header className="product-browser__tabbar">
          <div className="product-browser__brand">
            <img src={`${import.meta.env.BASE_URL}brand/cakewalk-logo-orange.svg`} alt="Cakewalk" />
            <span>Product tour</span>
          </div>

          <div className="product-browser__tabs" role="tablist" aria-label="Cakewalk product demos">
            {productDemos.map((demo, index) => {
              const isActive = demo.id === activeDemo.id;
              return (
                <button
                  id={`${tabGroupId}-${demo.id}`}
                  className={`product-browser__tab${isActive ? " product-browser__tab--active" : ""}`}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  aria-controls={`${tabGroupId}-panel`}
                  tabIndex={isActive ? 0 : -1}
                  key={demo.id}
                  onClick={() => selectDemo(demo.id)}
                  onKeyDown={(event) => onTabKeyDown(event, index)}
                >
                  {demo.label}
                </button>
              );
            })}
          </div>
        </header>

        <div className="product-browser__toolbar">
          <div className="product-browser__lights" aria-hidden="true">
            <span />
            <span />
            <span />
          </div>

          <div className="product-browser__address" title={activeDemo.url}>
            <LockKeyhole aria-hidden="true" />
            <span>{compactDemoUrl(activeDemo.url)}</span>
          </div>

          <button
            className="product-browser__tool"
            type="button"
            aria-label={`Reload ${activeDemo.label}`}
            onClick={() => {
              setReloadKey((key) => key + 1);
              setIsLoading(activeDemo.id !== "business-onboarding");
            }}
          >
            <RefreshCw aria-hidden="true" />
          </button>

          <a
            className="product-browser__tool"
            href={activeDemo.url}
            target="_blank"
            rel="noreferrer"
            aria-label={`Open ${activeDemo.label} in a new tab`}
          >
            <ExternalLink aria-hidden="true" />
          </a>
        </div>

        <div
          className="product-browser__viewport"
          id={`${tabGroupId}-panel`}
          role="tabpanel"
          aria-labelledby={`${tabGroupId}-${activeDemo.id}`}
        >
          {activeDemo.id === "business-onboarding" ? (
            <BusinessOnboardingAutoplay key={reloadKey} />
          ) : (
            <>
              {isLoading && (
                <div className="product-browser__loading" aria-live="polite">
                  <img src={`${import.meta.env.BASE_URL}brand/cakewalk-mark.svg`} alt="" aria-hidden="true" />
                  <span>Opening {activeDemo.label}</span>
                </div>
              )}
              <iframe
                key={`${activeDemo.id}-${reloadKey}`}
                className="product-browser__iframe"
                src={activeDemo.url}
                title={`${activeDemo.label} demo`}
                loading="eager"
                referrerPolicy="strict-origin-when-cross-origin"
                allow="clipboard-read; clipboard-write; fullscreen"
                allowFullScreen
                onLoad={() => setIsLoading(false)}
              />
            </>
          )}
        </div>
      </section>
    </div>
  );
}

function ProductBrowserPrintSlide() {
  const firstDemo = productDemos[0];

  return (
    <div className="product-browser-slide">
      <ProductBrowserHeadline />

      <section className="product-browser product-browser--print" aria-label="Cakewalk product tour">
        <header className="product-browser__tabbar">
          <div className="product-browser__brand">
            <img src={`${import.meta.env.BASE_URL}brand/cakewalk-logo-orange.svg`} alt="Cakewalk" />
            <span>Product tour</span>
          </div>
          <div className="product-browser__tabs" aria-hidden="true">
            {productDemos.map((demo, index) => (
              <span className={`product-browser__tab${index === 0 ? " product-browser__tab--active" : ""}`} key={demo.id}>
                {demo.label}
              </span>
            ))}
          </div>
        </header>

        <div className="product-browser__toolbar">
          <div className="product-browser__lights" aria-hidden="true">
            <span />
            <span />
            <span />
          </div>
          <div className="product-browser__address">
            <LockKeyhole aria-hidden="true" />
            <span>{compactDemoUrl(firstDemo.url)}</span>
          </div>
        </div>

        <div className="product-browser__viewport">
          <div className="product-browser__print-preview">
            <img src={`${import.meta.env.BASE_URL}brand/cakewalk-mark.svg`} alt="" aria-hidden="true" />
            <span className="mini-overline">PRODUCT TOUR</span>
            <h2>Four connected Cakewalk experiences.</h2>
            <p>Business Onboarding · Owner Dashboard · Benefits Wallet · Member Enrollment</p>
          </div>
        </div>
      </section>
    </div>
  );
}

export const tamMarketSegments = [
  {
    id: "total-market",
    label: "Total U.S. Benefits Premium Market",
    value: "$1.69T",
    sources: "1-7",
    detail: "All U.S. employer-sponsored benefits premiums.",
  },
  {
    id: "tam",
    label: "TAM",
    value: "$656B",
    sources: "1-7,8",
    detail: "Addressable SMB market (<=50 employees; 38.85% of U.S. Labor Force).",
  },
] as const;

export const tamSources = [
  {
    id: 1,
    label: "Grand View Research - U.S. Group Health Insurance Market Report",
    url: "https://www.grandviewresearch.com/industry-analysis/us-group-health-insurance-market-report",
  },
  {
    id: 2,
    label: "Towards Healthcare - U.S. Dental Insurance Market",
    url: "https://www.towardshealthcare.com/insights/us-dental-insurance-market",
  },
  {
    id: 3,
    label: "IBISWorld - Vision Insurance in the United States",
    url: "https://www.ibisworld.com/united-states/industry/vision-insurance/5914/",
  },
  {
    id: 4,
    label: "Precedence Research - Group Life Insurance Market",
    url: "https://www.precedenceresearch.com/group-life-insurance-market",
  },
  {
    id: 5,
    label: "Milliman - 2025 U.S. Group Disability Market Survey Summary",
    url: "https://us.milliman.com/en/insight/2025-us-group-disability-market-survey-summary",
  },
  {
    id: 6,
    label: "Precedence Research - U.S. Supplemental Health Market",
    url: "https://www.precedenceresearch.com/us-supplemental-health-market",
  },
  {
    id: 7,
    label: "Datos Insights - AI and Digital Innovation Reshape the Group Benefits Landscape in 2024 (citing Eastbridge Consulting)",
    url: "https://datos-insights.com/blog/ai-and-digital-innovation-reshape-the-group-benefits-landscape-in-2024/",
  },
  {
    id: 8,
    label: "U.S. Census Bureau - County Business Patterns 2023 (employment by establishment size)",
    url: "https://api.census.gov/data/2023/cbp?get=EMP,EMPSZES,EMPSZES_LABEL,NAICS2017&for=us:*",
  },
] as const;

export const tamSourceNote =
  "Notes: midpoints used where sources provide ranges; supplemental health 2024 total derived from the 2024 product table in source 6.";

function TamSlide({ forceSources = false }: { forceSources?: boolean }) {
  const [showSources, setShowSources] = useState(false);
  const sourcePanelId = useId();
  const sourcesOpen = forceSources || showSources;

  return (
    <div className={`tam-slide${forceSources ? " tam-slide--print" : ""}`}>
      <h1 className="tam-slide__headline">
        The largest <em>overlooked</em>{" "}
        insurance market in the U.S.
      </h1>

      <section className="tam-market" aria-label="Total addressable market visualization">
        <figure className="tam-market__figure">
          <div className="tam-market__circle tam-market__circle--total">
            <span className="tam-market__circle-label">Total U.S. market</span>
            <span className="tam-market__value">
              {tamMarketSegments[0].value}<sup>{tamMarketSegments[0].sources}</sup>
            </span>
            <div className="tam-market__circle tam-market__circle--addressable">
              <span className="tam-market__circle-label">Small-business TAM</span>
              <span className="tam-market__value">
                {tamMarketSegments[1].value}<sup>{tamMarketSegments[1].sources}</sup>
              </span>
              <span className="tam-market__share">
                39% of the U.S. workforce<sup>8</sup>
              </span>
            </div>
          </div>
          <figcaption className="tam-market__caption">
            The $656B addressable SMB market sits within the $1.69T U.S. benefits premium market.
          </figcaption>
        </figure>

        <div className="tam-market__legend">
          {tamMarketSegments.map((segment) => (
            <article className={`tam-market__legend-item tam-market__legend-item--${segment.id}`} key={segment.id}>
              <div className="tam-market__legend-label">
                <span aria-hidden="true" />
                <h2>{segment.label}</h2>
              </div>
              <p>
                {segment.id === "tam"
                  ? "Businesses with 50 or fewer employees."
                  : segment.detail}
              </p>
            </article>
          ))}
          <article className="tam-market__legend-item tam-market__legend-item--workforce">
            <span className="tam-market__workforce-value">38.85%</span>
            <p>of the U.S. labor force works at businesses with 50 or fewer employees.</p>
          </article>
        </div>
      </section>

      <div className="tam-sources">
        {!forceSources && (
          <button
            className="tam-sources__toggle"
            type="button"
            aria-expanded={showSources}
            aria-controls={sourcePanelId}
            onClick={() => setShowSources((visible) => !visible)}
          >
            <BookOpenText aria-hidden="true" />
            {showSources ? "Hide sources" : "Show sources"}
          </button>
        )}

        {sourcesOpen && (
          <aside className="tam-sources__drawer" id={sourcePanelId} aria-label="Total addressable market sources" data-deck-interactive>
            <ol>
              {tamSources.map((source) => (
                <li key={source.id}>
                  <span>{source.id}.</span>
                  <a href={source.url} target="_blank" rel="noreferrer">
                    {source.label}
                    <ExternalLink aria-hidden="true" />
                  </a>
                </li>
              ))}
            </ol>
            <p>{tamSourceNote}</p>
          </aside>
        )}
      </div>
    </div>
  );
}

function GtmSlide() {
  return (
    <div className="gtm-statement">
      <h1>
        Building the SMB distribution flywheel through embedded partnerships and{" "}
        <em>data-driven acquisition</em>.
      </h1>
    </div>
  );
}

export const competitiveAdvantageRows = [
  {
    category: "Time to Coverage",
    incumbent: "8-12 weeks",
    cakewalk: "Minutes",
  },
  {
    category: "Process Steps",
    incumbent: "40+ manual handoffs",
    cakewalk: "One connected workflow",
  },
  {
    category: "Underwriting",
    incumbent: "Manual, days to weeks",
    cakewalk: "Instant, automated",
  },
  {
    category: "Benefits Quality",
    incumbent: "Limited options",
    cakewalk: "Enterprise quality benefits",
  },
  {
    category: "Technology",
    incumbent: "Fragmented & legacy systems",
    cakewalk: "AI-Native",
  },
] as const;

function CompetitiveAdvantageSlide() {
  return (
    <div className="competitive-slide">
      <header className="competitive-slide__header">
        <h1 className="competitive-slide__title" aria-label="Why Cakewalk Wins">
          <span aria-hidden="true">Why</span>
          <img
            src={`${import.meta.env.BASE_URL}brand/cakewalk-logo.svg`}
            alt=""
            aria-hidden="true"
          />
          <span aria-hidden="true">Wins</span>
        </h1>
        <p>End-to-end technology and risk pooling, purpose-built for the SMB.</p>
      </header>

      <section className="competitive-table" role="table" aria-label="Cakewalk compared with incumbent benefits providers">
        <div className="competitive-table__header" role="row">
          <span role="columnheader" aria-label="Comparison category" />
          <span role="columnheader">Incumbent</span>
          <span className="competitive-table__cakewalk-header" role="columnheader">
            <img
              src={`${import.meta.env.BASE_URL}brand/cakewalk-logo-orange.svg`}
              alt="Cakewalk"
            />
          </span>
        </div>

        <div className="competitive-table__body" role="rowgroup">
          {competitiveAdvantageRows.map((row, index) => (
            <div className="competitive-table__row" role="row" key={row.category} style={{ animationDelay: `${180 + index * 65}ms` }}>
              <h2 role="rowheader">{row.category}</h2>
              <div className="competitive-table__cell competitive-table__cell--incumbent" role="cell">
                <span className="competitive-table__mobile-label">Incumbent</span>
                <p>{row.incumbent}</p>
              </div>
              <div className="competitive-table__cell competitive-table__cell--cakewalk" role="cell">
                <span className="competitive-table__mobile-label">Cakewalk</span>
                <p>{row.cakewalk}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

interface PersonProfile {
  name: string;
  title?: string;
  image?: string;
  highlights?: readonly string[];
}

export const teamMembers: readonly PersonProfile[] = [
  {
    name: "Jonathan Morav",
    title: "Chief Executive Officer",
    image: "people/team-jonathan.jpeg",
    highlights: [
      "Executive roles across Operations, Product, Strategy, and GTM at Fabric.",
      "Scaled complex venture / high growth startups from 0 --> 30 million a year in revenue and 50 --> 120 million a year in revenue",
      "Cross-functional leader delivering across operations, strategy, and GTM.",
    ],
  },
  {
    name: "Paul Gable",
    title: "Chief Insurance Officer",
    image: "people/team-paul.jpeg",
    highlights: [
      "Chief Underwriting Officer at Prudential",
      "Chief Insurance Officer at Salty (acquired by CDK Global).",
      "Co-Founder, President at IBX (acquired by Alliant Insurance Services)",
      "Leading expert on group benefits underwriting",
    ],
  },
  {
    name: "Lucas Milliron",
    title: "Chief Technology Officer",
    image: "people/team-lucas.png",
    highlights: [
      "VP, Technology @ Salty (Acquired by CDK)",
      "Founder, Benezen",
      "Engineering Manager, National Benefits Partners",
    ],
  },
];

export const boardDirectors: readonly PersonProfile[] = [
  {
    name: "Kevin McCarthy",
    title: "Board Director",
    image: "people/board-kevin.jpeg",
    highlights: ["Former CEO, Unum", "Former COO, Unum Group"],
  },
  {
    name: "James Hall",
    title: "Board Director",
    image: "people/board-james.jpeg",
    highlights: [
      "Founder & Executive Chairman, Embedded Insurance",
      "Founder & CEO, Salty (Acquired by CDK Global)",
      "Founder & Executive Chairman, Insurance Point (Acquired by Arthur J. Gallagher)",
    ],
  },
  {
    name: "Mona Eliassen",
    title: "Board Director",
    image: "people/board-mona.png",
    highlights: [
      "Chief Executive Officer, Clear Point",
      "Founder & Chief Executive Officer, Eliassen Group",
    ],
  },
];

function PeopleSlide({
  title,
  eyebrow,
  people,
  variant,
}: {
  title: string;
  eyebrow: "Leadership" | "Board";
  people: readonly PersonProfile[];
  variant: "team" | "board";
}) {
  return (
    <div className={`people-slide people-slide--${variant}`}>
      <header className="people-slide__header">
        <h1>{title}</h1>
      </header>

      <div className="people-grid" aria-label={title}>
        {people.map((person, index) => {
          const isNameOnly = !person.image && !person.title && !person.highlights?.length;
          const hasAvatarPlaceholder = !person.image && !isNameOnly;

          return (
            <article
              className={`person-card${isNameOnly ? " person-card--name-only" : ""}${hasAvatarPlaceholder ? " person-card--placeholder" : ""}`}
              key={person.name}
              style={{ animationDelay: `${180 + index * 80}ms` }}
            >
              {isNameOnly ? (
                <h2>{person.name}</h2>
              ) : (
                <>
                  <p className="person-card__eyebrow">{eyebrow}</p>
                  <div className="person-card__identity">
                    {person.image ? (
                      <img
                        src={`${import.meta.env.BASE_URL}${person.image}`}
                        alt={`${person.name} headshot`}
                      />
                    ) : (
                      <span className="person-card__avatar-placeholder" aria-hidden="true" />
                    )}
                    <div>
                      <h2>{person.name}</h2>
                      <p className="person-card__title">{person.title}</p>
                    </div>
                  </div>
                  {person.highlights?.length ? (
                    <ul className="person-card__highlights">
                      {person.highlights.map((highlight, highlightIndex) => (
                        <li key={`${person.name}-${highlightIndex}`}>
                          <span aria-hidden="true"><Check /></span>
                          <p>{highlight || "\u00a0"}</p>
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </>
              )}
            </article>
          );
        })}
      </div>
    </div>
  );
}

function TeamSlide() {
  return (
    <PeopleSlide
      title="Operators, Product Builders, and Insurance Veterans"
      eyebrow="Leadership"
      people={teamMembers}
      variant="team"
    />
  );
}

function BoardDirectorsSlide() {
  return (
    <PeopleSlide
      title="Board of Directors"
      eyebrow="Board"
      people={boardDirectors}
      variant="board"
    />
  );
}

export const unitEconomicsCards = [
  { label: "Premium Per SMB / Annually", value: "$27,600" },
  { label: "Revenue Per SMB / Annually", value: "$1,920" },
  { label: "Margin Per SMB / Annually", value: "$960" },
  { label: "LTV Per SMB", value: "$19,000" },
  { label: "Persistency", value: "95%" },
] as const;

export const projectionYears = ["2026(E)", "2027(E)", "2028(E)", "2029(E)", "2030(E)"] as const;

interface ProjectionRow {
  label: string;
  values: readonly string[];
  highlight?: boolean;
}

export const projectionRows: readonly ProjectionRow[] = [
  { label: "Total Gross Written Premium*", values: ["$6.1M", "$114M", "$342M", "$798M", "$1.8B"] },
  { label: "YOY Growth", values: ["—", "1768.9%", "200.0%", "133.3%", "125.6%"] },
  { label: "Year End ARR", values: ["$2.7M", "$7.7M", "$23.0M", "$53.8M", "$122.9M"], highlight: true },
  { label: "Net Income", values: ["-$4.0M", "$0.8M", "$5.8M", "$17.8M", "$61.5M"] },
  { label: "Net Margin", values: ["-148.1%", "10.0%", "25.0%", "33.0%", "50.0%"] },
  { label: "SMBs Enrolled", values: ["1,400", "4,000", "12,000", "28,000", "64,000"] },
];

const unitChartHeights = [3, 6, 18, 45, 100] as const;

function UnitEconomicsSlide() {
  const grossWrittenPremium = projectionRows[0];

  return (
    <div className="unit-economics-slide">
      <header className="unit-economics-slide__header">
        <h1>Strong Unit Economics, <em>Clear Trajectory</em></h1>
      </header>

      <div className="unit-economics-layout">
        <section className="unit-metrics" aria-label="Unit economics">
          {unitEconomicsCards.map((card, index) => (
            <article key={card.label} style={{ animationDelay: `${150 + index * 55}ms` }}>
              <p>{card.label}</p>
              <strong>{card.value}</strong>
            </article>
          ))}
        </section>

        <section className="unit-projections" aria-label="Financial projections" data-deck-interactive>
          <div className="unit-chart" aria-label="Total Gross Written Premium projection">
            <div className="unit-chart__bars" aria-hidden="true">
              <span />
              {grossWrittenPremium.values.map((value, index) => (
                <div className="unit-chart__bar-column" key={projectionYears[index]}>
                  <strong>{value}</strong>
                  <span
                    className="unit-chart__bar"
                    style={{ height: `${unitChartHeights[index]}%`, animationDelay: `${360 + index * 80}ms` }}
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="unit-table" role="table" aria-label="Five-year financial projections">
            <div className="unit-table__header" role="row">
              <div role="rowheader">{grossWrittenPremium.label}</div>
              {projectionYears.map((year, index) => (
                <div role="columnheader" aria-label={`${year}: ${grossWrittenPremium.values[index]}`} key={year}>
                  {year}
                </div>
              ))}
            </div>

            <div className="unit-table__body" role="rowgroup">
              {projectionRows.slice(1).map((row, rowIndex) => (
                <div
                  className={`unit-table__row${row.highlight ? " unit-table__row--highlight" : ""}`}
                  role="row"
                  key={row.label}
                  style={{ animationDelay: `${560 + rowIndex * 45}ms` }}
                >
                  <div role="rowheader">{row.label}</div>
                  {row.values.map((value, index) => (
                    <div role="cell" key={`${row.label}-${projectionYears[index]}`}>{value}</div>
                  ))}
                </div>
              ))}
            </div>
          </div>

          <p className="unit-projections__footnote">*Gross Written Premium represents year-end run rate</p>
        </section>
      </div>
    </div>
  );
}

export const tractionStats = [
  { value: "1,200+", label: "SMBs Served" },
  { value: "$3M+", label: "Gross Written Premium" },
  { value: "$700K+", label: "ARR Run Rate" },
] as const;

function TractionSlide() {
  return (
    <div className="traction-slide">
      <h1>Built with <em>Small Business Customers.</em></h1>
      <div className="traction-stats">
        {tractionStats.map((stat, index) => (
          <article key={stat.label} style={{ animationDelay: `${260 + index * 100}ms` }}>
            <strong>{stat.value}</strong>
            <p>{stat.label}</p>
          </article>
        ))}
      </div>
    </div>
  );
}

export const raiseTerms = {
  commitment: "$5M",
  commitmentLabel: "New Equity Commitment",
  valuation: "$25M Pre-money Valuation",
  round: "Series Seed",
  previousRoundLabel: "Previous Round",
  previousRound: "Pre-Seed · SAFE Note",
  previousCapital: "$1.2M total capital invested",
} as const;

function TheAskSlide() {
  return (
    <div className="closing-atmosphere raise-slide">
      <div className="raise-slide__content">
        <p className="raise-slide__mobile-title">The Raise</p>
        <h1><em>{raiseTerms.commitment}</em> {raiseTerms.commitmentLabel}</h1>
        <p className="raise-slide__valuation">{raiseTerms.valuation}</p>
        <p className="raise-slide__round">{raiseTerms.round}</p>
        <div className="raise-slide__previous">
          <p>{raiseTerms.previousRoundLabel}</p>
          <strong>{raiseTerms.previousRound}</strong>
          <span>{raiseTerms.previousCapital}</span>
        </div>
      </div>
    </div>
  );
}

export const conclusionCopy = [
  "Every employee deserves great benefits.",
  "We're making it a Cakewalk.",
] as const;

function ConclusionSlide() {
  return (
    <div className="closing-atmosphere conclusion-slide">
      <h1>{conclusionCopy[0]}</h1>
      <h2 aria-label={conclusionCopy[1]}>
        <span aria-hidden="true">We&apos;re making it a</span>
        <img
          className="conclusion-slide__logo"
          src={`${import.meta.env.BASE_URL}brand/cakewalk-logo-orange.svg`}
          alt=""
          aria-hidden="true"
        />
      </h2>
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
    notes: "Lead with the core access unlock: Fortune 500-caliber employee benefits for small businesses.",
    render: () => <SolutionSlide />,
  },
  {
    id: "flow",
    title: "Offering benefits is a second job for small-business owners",
    section: "The need",
    tone: "sidewalk",
    brandPlacement: "footer",
    notes: "Walk the lifecycle clockwise. Emphasize that every stage adds another disconnected call, form, system, or handoff while the owner is still running the business.",
    render: () => <BurdenSlide />,
  },
  {
    id: "cakewalk",
    title: "Fortune 500-caliber benefits, made effortless",
    section: "The product",
    tone: "canvas",
    brandPlacement: "footer",
    notes: "Use the tabs for a live walkthrough of the owner dashboard, benefits wallet, member enrollment, and business onboarding experiences.",
    render: () => <ProductBrowserSlide />,
    renderPrint: () => <ProductBrowserPrintSlide />,
  },
  {
    id: "tam",
    title: "The largest overlooked insurance market in the U.S.",
    section: "Total Addressable Market",
    tone: "canvas",
    brandPlacement: "footer",
    notes: "The $1.69T U.S. employer-sponsored benefits premium market narrows to a $656B addressable SMB market using the 38.85% share of the U.S. labor force employed by businesses with 50 or fewer employees. Midpoints are used where sources provide ranges.",
    render: () => <TamSlide />,
    renderPrint: () => <TamSlide forceSources />,
  },
  {
    id: "gtm",
    title: "Building the SMB distribution flywheel",
    section: "Go-To-Market",
    tone: "canvas",
    brandPlacement: "footer",
    notes: "Cakewalk scales through embedded partnerships and data-driven acquisition, creating a repeatable distribution flywheel for the SMB market.",
    render: () => <GtmSlide />,
  },
  {
    id: "competitive-advantage",
    title: "Why Cakewalk Wins",
    section: "Competitive Advantage",
    tone: "canvas",
    brandPlacement: "footer",
    notes: "Compare Cakewalk with incumbent benefits delivery across speed, process, underwriting, benefit quality, and technology. Premium cost is intentionally excluded.",
    render: () => <CompetitiveAdvantageSlide />,
  },
  {
    id: "team",
    title: "Operators, Product Builders, and Insurance Veterans",
    section: "Team",
    tone: "canvas",
    brandPlacement: "footer",
    notes: "Introduce the operating and insurance leadership behind Cakewalk, including Lucas Milliron as Chief Technology Officer.",
    render: () => <TeamSlide />,
  },
  {
    id: "board-advisors",
    title: "Board of Directors",
    section: "Board of Directors",
    tone: "canvas",
    brandPlacement: "footer",
    notes: "Highlight the board's experience building, operating, and scaling insurance businesses.",
    render: () => <BoardDirectorsSlide />,
  },
  {
    id: "unit-economics",
    title: "Strong Unit Economics, Clear Trajectory",
    section: "Unit Economics",
    tone: "canvas",
    brandPlacement: "footer",
    notes: "Walk through the per-SMB economics, five-year premium growth, ARR, profitability, and enrolled SMB projections.",
    render: () => <UnitEconomicsSlide />,
  },
  {
    id: "traction",
    title: "Built with Small Business Customers.",
    section: "Traction",
    tone: "canvas",
    brandPlacement: "footer",
    notes: "Ground the growth story in current SMBs served, gross written premium, and ARR run rate.",
    render: () => <TractionSlide />,
  },
  {
    id: "the-ask",
    title: "$5M New Equity Commitment",
    section: "The Raise",
    tone: "canvas",
    brandPlacement: "footer",
    notes: "Present the $5M Series Seed raise at a $25M pre-money valuation and place it in the context of the prior SAFE round.",
    render: () => <TheAskSlide />,
  },
  {
    id: "conclusion",
    title: "Every employee deserves great benefits",
    section: "Conclusion",
    tone: "canvas",
    brandPlacement: "footer",
    notes: "Close on Cakewalk's promise: every employee deserves great benefits, and Cakewalk makes them easier to offer.",
    render: () => <ConclusionSlide />,
  },
];
