import { useEffect, useState, type ReactNode } from "react";
import {
  BriefcaseBusiness,
  Building2,
  Check,
  ChevronRight,
  CirclePause,
  CirclePlay,
  Globe2,
  LoaderCircle,
  LockKeyhole,
  Mail,
  MapPin,
  MousePointer2,
  PencilLine,
  Phone,
  Search,
  ShieldCheck,
  Sparkles,
  Users,
} from "lucide-react";
import {
  businessOnboardingDemoData,
  businessOnboardingLoopDuration,
  businessOnboardingProgressStepByScene,
  businessOnboardingQuoteData,
  getBusinessOnboardingFrame,
  type BusinessOnboardingFrame,
} from "./businessOnboardingWorkflow";

const onboardingHeroImageSrc = "https://demo.cakewalkbenefits.com/images/get-started/hero-background.jpg";
const quickBooksLogoSrc = "https://demo.cakewalkbenefits.com/payroll-logos/quickbooks.png";

function formatMoney(value: number) {
  return `$${value.toLocaleString("en-US")}`;
}

function usePrefersReducedMotion() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const syncPreference = () => setPrefersReducedMotion(mediaQuery.matches);

    mediaQuery.addEventListener("change", syncPreference);
    return () => mediaQuery.removeEventListener("change", syncPreference);
  }, []);

  return prefersReducedMotion;
}

function DemoPointer({ pressing = false }: { pressing?: boolean }) {
  return (
    <span className={`business-onboarding__pointer${pressing ? " business-onboarding__pointer--pressing" : ""}`} aria-hidden="true">
      <MousePointer2 />
    </span>
  );
}

function QuickBooksLogo({ size }: { size: "card" | "lockup" | "heading" }) {
  return (
    <span className={`business-onboarding__quickbooks-logo business-onboarding__quickbooks-logo--${size}`}>
      <img src={quickBooksLogoSrc} alt="" aria-hidden="true" />
    </span>
  );
}

function TypeField({ label, value, secret = false }: { label: string; value: string; secret?: boolean }) {
  return (
    <label className="business-onboarding__field">
      <span>{label}</span>
      <span className="business-onboarding__input">
        {secret ? "•".repeat(value.length) : value}
        <i className="business-onboarding__caret" aria-hidden="true" />
      </span>
    </label>
  );
}

function CompanySearch({ progress }: { progress: number }) {
  const typedLength = Math.min(
    businessOnboardingDemoData.company.length,
    Math.floor((Math.max(0, progress - 0.06) / 0.58) * businessOnboardingDemoData.company.length),
  );
  const typedCompany = businessOnboardingDemoData.company.slice(0, typedLength);
  const showResult = progress > 0.66;

  return (
    <div className="business-onboarding__scene business-onboarding__scene--search">
      <span className="business-onboarding__eyebrow">Find your business</span>
      <h2>Big-company benefits for everyday businesses.</h2>
      <p>Start by finding your company. We’ll pull in the basics so you don’t have to.</p>

      <div className="business-onboarding__search-wrap">
        <div className="business-onboarding__search-field">
          <Search aria-hidden="true" />
          <span className={typedCompany ? "" : "business-onboarding__placeholder"}>
            {typedCompany || "Search for your company..."}
          </span>
          {typedLength < businessOnboardingDemoData.company.length && typedLength > 0 && (
            <i className="business-onboarding__caret" aria-hidden="true" />
          )}
        </div>

        {showResult && (
          <div className="business-onboarding__company-result business-onboarding__target">
            <span className="business-onboarding__result-mark"><Building2 /></span>
            <span>
              <strong>{businessOnboardingDemoData.company}</strong>
              <small>{businessOnboardingDemoData.address}</small>
            </span>
            <ChevronRight aria-hidden="true" />
            <DemoPointer pressing={progress > 0.86} />
          </div>
        )}
      </div>

      <small className="business-onboarding__trust"><LockKeyhole /> No forms, no commitment.</small>
    </div>
  );
}

function CompanyConfirmation({ progress }: { progress: number }) {
  const isAnalyzing = progress < 0.58;

  return (
    <div className="business-onboarding__scene business-onboarding__scene--confirmation">
      <span className="business-onboarding__eyebrow">Your company</span>
      <h2>Is this your business?</h2>
      <p>We pulled this from public records. Give it a quick look and fix anything that&apos;s off before we build your quote.</p>

      <article className="business-onboarding__company-card">
        <header className="business-onboarding__company-card-header">
          <span className="business-onboarding__result-mark"><Building2 /></span>
          <span className="business-onboarding__company-identity">
            <strong>{businessOnboardingDemoData.company}</strong>
            <small>{businessOnboardingDemoData.category}</small>
          </span>
          <span className="business-onboarding__verified"><Check /> Verified profile</span>
        </header>
        <div className="business-onboarding__ai-source"><Sparkles /> Cakewalk AI · pre-filled from your profile</div>
        <dl>
          <div><dt><MapPin /> Business address</dt><dd>{businessOnboardingDemoData.address}</dd></div>
          <div><dt><Phone /> Phone</dt><dd>{businessOnboardingDemoData.phone}</dd></div>
          <div><dt><Globe2 /> Website</dt><dd>{businessOnboardingDemoData.website}</dd></div>
          <div><dt><Building2 /> Legal entity</dt><dd>{businessOnboardingDemoData.legalEntity}</dd></div>
          <div className="business-onboarding__industry-row">
            <dt><BriefcaseBusiness /> Industry</dt>
            <dd>
              {isAnalyzing ? (
                <span className="business-onboarding__analysis-status"><LoaderCircle /> Analyzing your business…</span>
              ) : (
                <span className="business-onboarding__industry-match">
                  <span><small>{businessOnboardingDemoData.industryCode}</small>{businessOnboardingDemoData.industry}</span>
                  <button type="button" tabIndex={-1}><PencilLine /> Change</button>
                </span>
              )}
            </dd>
          </div>
        </dl>
      </article>

      <div className="business-onboarding__company-actions">
        <button className="business-onboarding__primary business-onboarding__target" type="button" tabIndex={-1} disabled={isAnalyzing}>
          This is my business — continue
          <ChevronRight aria-hidden="true" />
          {!isAnalyzing && <DemoPointer pressing={progress > 0.9} />}
        </button>
        <button className="business-onboarding__secondary" type="button" tabIndex={-1}>Not quite</button>
      </div>
    </div>
  );
}

function TeamExplanation({ progress }: { progress: number }) {
  return (
    <div className="business-onboarding__scene business-onboarding__scene--team">
      <span className="business-onboarding__eyebrow">Next: your team</span>
      <h2>Here’s what we look at — and what we never touch.</h2>
      <p>We only bring in what’s needed to price the plan and build your census.</p>

      <div className="business-onboarding__privacy-grid">
        <article>
          <Users aria-hidden="true" />
          <strong>What we bring in</strong>
          <span><Check /> Full-time W-2 employees</span>
          <span><Check /> Basic personal details</span>
          <span><Check /> Salary bands</span>
        </article>
        <article>
          <ShieldCheck aria-hidden="true" />
          <strong>What we never touch</strong>
          <span><Check /> Bank account details</span>
          <span><Check /> Social Security numbers</span>
          <span><Check /> Anything without review</span>
        </article>
      </div>

      <button className="business-onboarding__primary business-onboarding__target" type="button" tabIndex={-1}>
        Continue
        <ChevronRight aria-hidden="true" />
        <DemoPointer pressing={progress > 0.76} />
      </button>
    </div>
  );
}

const payrollProviders = [
  { name: "QuickBooks Payroll", mark: "qb", tone: "green" },
  { name: "Gusto", mark: "G", tone: "coral" },
  { name: "Paychex", mark: "P", tone: "blue" },
  { name: "BambooHR", mark: "B", tone: "mint" },
  { name: "ADP", mark: "ADP", tone: "red" },
] as const;

function PayrollSelection({ progress }: { progress: number }) {
  return (
    <div className="business-onboarding__scene business-onboarding__scene--payroll">
      <span className="business-onboarding__eyebrow">Bring in your roster</span>
      <h2>Connect payroll — we’ll pull your roster in for you.</h2>
      <p>Click your platform and connect. You’ll review everything before launch.</p>

      <div className="business-onboarding__providers">
        {payrollProviders.map((provider, index) => (
          <article
            className={`business-onboarding__provider${index === 0 ? " business-onboarding__target business-onboarding__provider--active" : ""}`}
            key={provider.name}
          >
            {index === 0 ? (
              <QuickBooksLogo size="card" />
            ) : (
              <span className={`business-onboarding__provider-mark business-onboarding__provider-mark--${provider.tone}`}>
                {provider.mark}
              </span>
            )}
            <strong>{provider.name}</strong>
            <small>{index === 0 ? "Your team and pay info — already in QuickBooks." : "Import your roster in one step."}</small>
            <span className="business-onboarding__connect">Connect</span>
            {index === 0 && <DemoPointer pressing={progress > 0.78} />}
          </article>
        ))}
      </div>
    </div>
  );
}

function VerificationModal({ mode, progress }: { mode: "email" | "code"; progress: number }) {
  const isEmail = mode === "email";
  const value = isEmail ? businessOnboardingDemoData.workEmail : businessOnboardingDemoData.verificationCode;
  const typeStart = isEmail ? 0.12 : 0.16;
  const typeWindow = isEmail ? 0.48 : 0.42;
  const typedLength = Math.min(value.length, Math.floor((Math.max(0, progress - typeStart) / typeWindow) * value.length));
  const typedValue = value.slice(0, typedLength);

  return (
    <div className="business-onboarding__scene business-onboarding__scene--modal">
      <div className="business-onboarding__modal-backdrop" aria-hidden="true">
        <div /><div /><div /><div />
      </div>
      <section className="business-onboarding__modal-card">
        <div className="business-onboarding__integration-lockup">
          <QuickBooksLogo size="lockup" />
          <span className="business-onboarding__integration-line" />
          <img src={`${import.meta.env.BASE_URL}brand/cakewalk-mark.svg`} alt="" aria-hidden="true" />
        </div>
        <span className="business-onboarding__eyebrow">Secure connection</span>
        <h2>Verify to connect QuickBooks Payroll</h2>
        {isEmail ? (
          <>
            <p>Linking payroll needs a verified Cakewalk account. It only takes a few seconds.</p>
            <TypeField label="Work email" value={typedValue} />
            <button className="business-onboarding__primary business-onboarding__target" type="button" tabIndex={-1}>
              <Mail aria-hidden="true" /> Email me a code
              <DemoPointer pressing={progress > 0.82} />
            </button>
          </>
        ) : (
          <>
            <p>We sent a 6-digit code to <strong>{businessOnboardingDemoData.workEmail}</strong>.</p>
            <TypeField label="Verification code" value={typedValue} />
            <button className="business-onboarding__primary business-onboarding__target" type="button" tabIndex={-1}>
              Verify &amp; connect
              <ChevronRight aria-hidden="true" />
              <DemoPointer pressing={progress > 0.82} />
            </button>
          </>
        )}
        <small className="business-onboarding__trust"><LockKeyhole /> Read-only access. Revoke anytime.</small>
      </section>
    </div>
  );
}

const providerProgress = ["Overview", "Sign in", "Import", "Done"] as const;

function ProviderModal({ mode, progress }: { mode: "overview" | "login" | "import" | "done"; progress: number }) {
  const activeIndex = { overview: 0, login: 1, import: 2, done: 3 }[mode];
  const emailLength = Math.min(
    businessOnboardingDemoData.adminEmail.length,
    Math.floor((Math.max(0, progress - 0.08) / 0.35) * businessOnboardingDemoData.adminEmail.length),
  );
  const passwordLength = Math.min(
    businessOnboardingDemoData.password.length,
    Math.floor((Math.max(0, progress - 0.43) / 0.27) * businessOnboardingDemoData.password.length),
  );

  return (
    <div className="business-onboarding__scene business-onboarding__scene--modal">
      <div className="business-onboarding__modal-backdrop" aria-hidden="true">
        <div /><div /><div /><div />
      </div>
      <section className="business-onboarding__modal-card business-onboarding__modal-card--provider">
        <div className="business-onboarding__provider-heading">
          <QuickBooksLogo size="heading" />
          <span><small>Secure provider connection</small><strong>Connect QuickBooks Payroll</strong></span>
        </div>
        <ol className="business-onboarding__provider-progress">
          {providerProgress.map((step, index) => (
            <li className={index <= activeIndex ? "is-active" : ""} key={step}>
              <span>{index < activeIndex ? <Check /> : index + 1}</span>{step}
            </li>
          ))}
        </ol>

        {mode === "overview" && (
          <div className="business-onboarding__provider-content">
            <h2>Bring your team in automatically.</h2>
            <p>We’ll pull company basics, your roster, work emails, and pay details. You review every detail.</p>
            <div className="business-onboarding__permission-list">
              <span><Check /> Company basics</span><span><Check /> Team roster</span><span><Check /> Pay details</span>
            </div>
            <button className="business-onboarding__primary business-onboarding__target" type="button" tabIndex={-1}>
              Continue to QuickBooks Payroll <ChevronRight />
              <DemoPointer pressing={progress > 0.76} />
            </button>
          </div>
        )}

        {mode === "login" && (
          <div className="business-onboarding__provider-content">
            <h2>Sign in to QuickBooks Payroll</h2>
            <p>Use your payroll admin login. We’ll handle the rest.</p>
            <div className="business-onboarding__login-fields">
              <TypeField label="Admin email" value={businessOnboardingDemoData.adminEmail.slice(0, emailLength)} />
              <TypeField label="Password" value={businessOnboardingDemoData.password.slice(0, passwordLength)} secret />
            </div>
            <button className="business-onboarding__primary business-onboarding__target" type="button" tabIndex={-1}>
              Import my team <ChevronRight />
              <DemoPointer pressing={progress > 0.84} />
            </button>
          </div>
        )}

        {mode === "import" && (
          <div className="business-onboarding__provider-content business-onboarding__provider-content--centered">
            <span className="business-onboarding__import-orbit"><Users /><i /></span>
            <h2>Pulling in your team…</h2>
            <p>Bringing over the company details and roster for your review.</p>
            <div className="business-onboarding__import-list">
              <span><Check /> Company info</span>
              <span className={progress > 0.34 ? "is-complete" : ""}>{progress > 0.34 ? <Check /> : <i />} Your team</span>
              <span className={progress > 0.68 ? "is-complete" : ""}>{progress > 0.68 ? <Check /> : <i />} Work emails</span>
            </div>
          </div>
        )}

        {mode === "done" && (
          <div className="business-onboarding__provider-content business-onboarding__provider-content--centered">
            <span className="business-onboarding__success-mark"><Check /></span>
            <h2>QuickBooks Payroll is connected</h2>
            <p>We found your team. Take a quick look, fill any gaps, and you’re on your way.</p>
            <div className="business-onboarding__import-stats">
              <span><strong>6</strong>Employees found</span>
              <span><strong>6</strong>Work emails</span>
              <span><strong>2</strong>Fields to review</span>
            </div>
            <button className="business-onboarding__primary business-onboarding__target" type="button" tabIndex={-1}>
              Done <ChevronRight />
              <DemoPointer pressing={progress > 0.78} />
            </button>
          </div>
        )}
      </section>
    </div>
  );
}

const rosterMembers = [
  ["MP", "Maya Patel", "Female · full-time · 39"],
  ["AJ", "Andre Johnson", "Male · full-time · 34"],
  ["SR", "Sofia Rivera", "Female · full-time · 41"],
  ["EB", "Ethan Brooks", "Male · full-time · 30"],
  ["NK", "Nina Kim", "Female · full-time · 33"],
] as const;

function RosterReview({ progress }: { progress: number }) {
  return (
    <div className="business-onboarding__scene business-onboarding__scene--roster">
      <span className="business-onboarding__eyebrow">Your roster</span>
      <div className="business-onboarding__roster-heading">
        <span><h2>Review your roster</h2><p>Imported from QuickBooks Payroll. Scan the profiles and continue when you’re ready.</p></span>
        <span className="business-onboarding__sync"><Sparkles /> 5 eligible employees</span>
      </div>
      <div className="business-onboarding__roster-grid">
        {rosterMembers.map(([initials, name, detail], index) => (
          <article style={{ animationDelay: `${index * 90}ms` }} key={name}>
            <span>{initials}</span>
            <div><strong>{name}</strong><small>{detail}</small></div>
            <Check aria-hidden="true" />
          </article>
        ))}
      </div>
      <div className="business-onboarding__roster-footer">
        <small><LockKeyhole /> Names and pay details stay linked to your provider.</small>
        <button className="business-onboarding__primary business-onboarding__target" type="button" tabIndex={-1}>
          See my estimate <ChevronRight />
          <DemoPointer pressing={progress > 0.76} />
        </button>
      </div>
    </div>
  );
}

function SceneIntro({ eyebrow, title, description }: { eyebrow: string; title: string; description: string }) {
  return (
    <>
      <span className="business-onboarding__eyebrow">{eyebrow}</span>
      <h2>{title}</h2>
      <p>{description}</p>
    </>
  );
}

function SceneAction({ children, progress }: { children: ReactNode; progress: number }) {
  return (
    <button className="business-onboarding__primary business-onboarding__target" type="button" tabIndex={-1}>
      {children}<ChevronRight aria-hidden="true" />
      <DemoPointer pressing={progress > 0.76} />
    </button>
  );
}

function MetricStrip({ metrics }: { metrics: readonly { label: string; value: string }[] }) {
  return (
    <div className="business-onboarding__metric-strip">
      {metrics.map((metric) => (
        <span key={metric.label}><small>{metric.label}</small><strong>{metric.value}</strong></span>
      ))}
    </div>
  );
}

function RoughEstimate({ progress }: { progress: number }) {
  const { roughEstimate } = businessOnboardingQuoteData;

  return (
    <div className="business-onboarding__scene business-onboarding__scene--dense business-onboarding__scene--estimate">
      <SceneIntro
        eyebrow="Rough estimate"
        title="Groups like yours typically spend"
        description="Add who is actually enrolling and any dependents to turn this range into your exact rate."
      />
      <section className="business-onboarding__estimate-card">
        <span className="business-onboarding__estimate-range">
          <strong>{formatMoney(roughEstimate.monthlyLow)}–{formatMoney(roughEstimate.monthlyHigh)}</strong>
          <small>/mo</small>
        </span>
        <p>That’s the full premium — about <strong>{formatMoney(roughEstimate.monthlyPerEmployee)}/employee</strong> — shared between the business and your team.</p>
        <div className="business-onboarding__factor-row">
          {['Team size', 'Industry', 'Location', 'Average age'].map((factor) => <span key={factor}><Check />{factor}</span>)}
        </div>
      </section>
      <SceneAction progress={progress}>Add my census &amp; get an exact quote</SceneAction>
    </div>
  );
}

function CensusChoice({ progress }: { progress: number }) {
  return (
    <div className="business-onboarding__scene business-onboarding__scene--dense business-onboarding__scene--census">
      <SceneIntro
        eyebrow="One step from your quote"
        title="Confirm who’s actually covered"
        description="Collect each employee’s coverage choice and dependents so underwriting can return a firm rate."
      />
      <section className="business-onboarding__panel business-onboarding__census-panel">
        <div className="business-onboarding__tabs-mini">
          <span>Ask my team</span>
          <span className="is-active business-onboarding__target">Type it in myself<DemoPointer pressing={progress > 0.72} /></span>
        </div>
        <div className="business-onboarding__census-choice-body">
          <span className="business-onboarding__result-mark"><Users /></span>
          <span><strong>5 employees ready</strong><small>Use your payroll roster and confirm coverage in one pass.</small></span>
          <span className="business-onboarding__sync"><LockKeyhole /> Nothing sent yet</span>
        </div>
      </section>
    </div>
  );
}

function CensusConfirmation({ progress }: { progress: number }) {
  return (
    <div className="business-onboarding__scene business-onboarding__scene--dense business-onboarding__scene--census">
      <SceneIntro
        eyebrow="Group census"
        title="Confirm coverage for 5 employees"
        description="All five eligible employees are enrolling. Review the roster and submit it directly to underwriting."
      />
      <section className="business-onboarding__panel business-onboarding__census-roster">
        {rosterMembers.map(([initials, name]) => (
          <div className="business-onboarding__result-row" key={name}>
            <span className="business-onboarding__avatar">{initials}</span>
            <span><strong>{name}</strong><small>Employee only · Enrolling</small></span>
            <span className="business-onboarding__enrolling"><Check /> Included</span>
          </div>
        ))}
      </section>
      <div className="business-onboarding__scene-footer">
        <span><strong>5 of 5</strong> enrolling · 5 covered lives</span>
        <SceneAction progress={progress}>Submit for underwriting</SceneAction>
      </div>
    </div>
  );
}

function UnderwritingScene() {
  const stages = ['Submitted', 'Underwriting', 'Firm quote'];

  return (
    <div className="business-onboarding__scene business-onboarding__scene--dense business-onboarding__scene--processing">
      <SceneIntro
        eyebrow="Census complete"
        title="Your census is in — finalizing your rate"
        description="Cakewalk is checking the confirmed group against the selected medical product and carrier rules."
      />
      <section className="business-onboarding__panel business-onboarding__underwriting-card">
        <div className="business-onboarding__underwriting-heading">
          <span className="business-onboarding__success-mark"><Check /></span>
          <span><strong>Census submitted to underwriting</strong><small>5 of 5 confirmed · 13 covered lives</small></span>
        </div>
        <div className="business-onboarding__status-track">
          {stages.map((stage, index) => <span className={index < 2 ? 'is-complete' : 'is-current'} key={stage}><i>{index < 2 ? <Check /> : 3}</i>{stage}</span>)}
        </div>
        <div className="business-onboarding__underwriting-product">
          <ShieldCheck />
          <span><strong>Medical underwriting</strong><small>Balanced · Level-funded · Blue Cross Blue Shield</small></span>
          <span>Checking rates</span>
        </div>
      </section>
    </div>
  );
}

const pricingChecks = [
  'Confirming group eligibility',
  'Pricing your confirmed census of 5',
  `Confirming network near ${businessOnboardingQuoteData.location}`,
  'Matching medical product for veterinary services',
  'Pricing your monthly rate',
] as const;

function PricingAnalysis({ progress }: { progress: number }) {
  const completedCount = Math.min(pricingChecks.length, Math.floor(progress * (pricingChecks.length + 1)));

  return (
    <div className="business-onboarding__scene business-onboarding__scene--dense business-onboarding__scene--processing">
      <SceneIntro
        eyebrow="Building your package"
        title={`Pricing ${businessOnboardingDemoData.company}’s census`}
        description="Matching your confirmed team to the right network, product, and monthly rate."
      />
      <section className="business-onboarding__panel business-onboarding__analysis-list">
        {pricingChecks.map((check, index) => (
          <div className={index < completedCount ? 'is-complete' : index === completedCount ? 'is-current' : ''} key={check}>
            <span>{index < completedCount ? <Check /> : <i />}</span>
            <strong>{check}</strong>
            <small>{index < completedCount ? 'Confirmed' : index === completedCount ? 'Working…' : 'Next'}</small>
          </div>
        ))}
      </section>
    </div>
  );
}

function PlanQualified({ progress }: { progress: number }) {
  const medical = businessOnboardingQuoteData.plans[0];

  return (
    <div className="business-onboarding__scene business-onboarding__scene--dense business-onboarding__scene--qualified">
      <SceneIntro
        eyebrow="Underwriting complete"
        title="Done — your group qualifies for level-funded"
        description={`We compared four medical plans in ${businessOnboardingQuoteData.location} and matched the best fit for your team.`}
      />
      <section className="business-onboarding__panel business-onboarding__qualified-card">
        <span className="business-onboarding__success-mark"><Check /></span>
        <span><small>Recommended medical plan</small><strong>{medical.name}</strong><em>fulfilled by {medical.carrier}</em></span>
        <span className="business-onboarding__plan-price"><strong>{formatMoney(medical.monthlyPerEmployee)}</strong><small>/employee</small></span>
      </section>
      <SceneAction progress={progress}>See my full benefits package</SceneAction>
    </div>
  );
}

function BenefitsPackage({ progress }: { progress: number }) {
  const { plans } = businessOnboardingQuoteData;

  return (
    <div className="business-onboarding__scene business-onboarding__scene--dense business-onboarding__scene--plans">
      <SceneIntro
        eyebrow="Benefits bundle"
        title="Here’s your recommended benefits package"
        description={`Built for ${businessOnboardingDemoData.company} · 5 full-time employees · balanced for cost, coverage, and simplicity.`}
      />
      <section className="business-onboarding__panel business-onboarding__plan-list">
        {plans.map((plan) => (
          <div className="business-onboarding__result-row" key={plan.category}>
            <span className="business-onboarding__plan-kind">{plan.category.slice(0, 1)}</span>
            <span><small>{plan.category}</small><strong>{plan.name}</strong><em>{plan.carrier}</em></span>
            <span className="business-onboarding__plan-price"><strong>{formatMoney(plan.monthlyPerEmployee)}</strong><small>/employee</small></span>
          </div>
        ))}
      </section>
      <div className="business-onboarding__package-footer">
        <span><small>Firm total</small><strong>{formatMoney(businessOnboardingQuoteData.packageMonthlyTotal)}/mo</strong><em>{formatMoney(businessOnboardingQuoteData.packageMonthlyPerEmployee)}/employee</em></span>
        <SceneAction progress={progress}>Continue to contributions</SceneAction>
      </div>
    </div>
  );
}

function ContributionExplainer({ progress }: { progress: number }) {
  return (
    <div className="business-onboarding__scene business-onboarding__scene--dense business-onboarding__scene--contribution-intro">
      <SceneIntro
        eyebrow="Last step: your split"
        title="Decide what the business covers."
        description="Your total premium is firm. All that’s left is how you split it between the business and each employee’s paycheck."
      />
      <section className="business-onboarding__contribution-explainer">
        <article><Building2 /><span><strong>You decide what the business pays</strong><small>Set a percentage for every plan in the package.</small></span></article>
        <article><Users /><span><strong>Your team picks up the rest</strong><small>Employee payroll deductions update automatically.</small></span></article>
      </section>
      <div className="business-onboarding__minimum-rule"><ShieldCheck /><span><strong>Cover at least 50% of medical</strong><small>Dental, vision, and life can be set as low as $0.</small></span></div>
      <SceneAction progress={progress}>Set your contribution</SceneAction>
    </div>
  );
}

const contributionRows = [
  { label: 'Medical', percent: 60, monthly: 780 },
  { label: 'Dental', percent: 50, monthly: 85 },
  { label: 'Vision', percent: 50, monthly: 33 },
  { label: 'Life', percent: 50, monthly: 30 },
] as const;

function ContributionSetup({ progress }: { progress: number }) {
  const { contribution } = businessOnboardingQuoteData;

  return (
    <div className="business-onboarding__scene business-onboarding__scene--dense business-onboarding__scene--costs">
      <SceneIntro
        eyebrow="Your quote"
        title={`${businessOnboardingDemoData.company}’s quote`}
        description="Your census is in and underwriting is done. Adjust your contribution and finalize the firm rate."
      />
      <MetricStrip metrics={[
        { label: 'Total cost / mo', value: `${formatMoney(businessOnboardingQuoteData.packageMonthlyTotal)}/mo` },
        { label: 'Company pays', value: `${formatMoney(contribution.employerMonthly)}/mo` },
        { label: 'Employees pay', value: `${formatMoney(contribution.employeeMonthly)}/mo` },
      ]} />
      <section className="business-onboarding__panel business-onboarding__contribution-panel">
        <div className="business-onboarding__contribution-heading"><strong>Set your contribution</strong><small>Employees pay ~{formatMoney(contribution.averageEmployeeMonthly)}/mo each on average.</small></div>
        {contributionRows.map((row) => (
          <div className="business-onboarding__contribution-row" key={row.label}>
            <span><strong>{row.label}</strong><small>{row.label === 'Medical' ? 'Min 50% required' : 'Employer contribution'}</small></span>
            <span className="business-onboarding__slider"><i style={{ width: `${row.percent}%` }} /><b /></span>
            <span><strong>{row.percent}%</strong><small>~{formatMoney(row.monthly)}/mo</small></span>
          </div>
        ))}
      </section>
      <SceneAction progress={progress}>Finalize my quote</SceneAction>
    </div>
  );
}

function FinalLockedQuote({ progress }: { progress: number }) {
  if (progress < 0.18) {
    return (
      <div className="business-onboarding__scene business-onboarding__scene--ceremony">
        <span className="business-onboarding__success-mark"><Check /></span>
        <span className="business-onboarding__eyebrow">You’re covered</span>
        <h2>{businessOnboardingDemoData.company}&apos;s benefits are locked in.</h2>
      </div>
    );
  }

  const { finalQuote, contribution } = businessOnboardingQuoteData;
  const nextSteps = [
    ['Quote ready', 'Done'],
    ['Set up your bank account', 'Next'],
    ['Enrollment opens', 'Soon'],
    ['Benefits become active', 'Launch day'],
  ] as const;

  return (
    <div className="business-onboarding__scene business-onboarding__scene--dense business-onboarding__scene--complete">
      <SceneIntro
        eyebrow="You’re covered"
        title={`${businessOnboardingDemoData.company}'s benefits are locked in.`}
        description={`Underwriting came back with your rate. Your monthly premium is held for ${finalQuote.holdDays} days while you finish launch prep.`}
      />
      <div className="business-onboarding__completion-grid">
        <section className="business-onboarding__locked-card">
          <span>Held {finalQuote.holdDays} days</span>
          <small>Your monthly premium</small>
          <strong>{formatMoney(finalQuote.employerMonthly)}<em>/mo</em></strong>
          <p>~{formatMoney(contribution.averageEmployeeMonthly)}/employee · team of 5</p>
          <button className="business-onboarding__primary" type="button" tabIndex={-1}>Go to Owner Dashboard <ChevronRight /></button>
        </section>
        <section className="business-onboarding__next-steps">
          <strong>What happens next</strong>
          {nextSteps.map(([label, status], index) => (
            <div key={label}><i>{index === 0 ? <Check /> : index + 1}</i><span><strong>{label}</strong><small>{status}</small></span></div>
          ))}
        </section>
      </div>
    </div>
  );
}

function OnboardingScene({ frame }: { frame: BusinessOnboardingFrame }) {
  switch (frame.id) {
    case "company-search":
      return <CompanySearch progress={frame.progress} />;
    case "company-confirmation":
      return <CompanyConfirmation progress={frame.progress} />;
    case "team-explanation":
      return <TeamExplanation progress={frame.progress} />;
    case "payroll-selection":
      return <PayrollSelection progress={frame.progress} />;
    case "account-email":
      return <VerificationModal mode="email" progress={frame.progress} />;
    case "account-code":
      return <VerificationModal mode="code" progress={frame.progress} />;
    case "provider-overview":
      return <ProviderModal mode="overview" progress={frame.progress} />;
    case "provider-login":
      return <ProviderModal mode="login" progress={frame.progress} />;
    case "team-import":
      return <ProviderModal mode="import" progress={frame.progress} />;
    case "connection-complete":
      return <ProviderModal mode="done" progress={frame.progress} />;
    case "roster-review":
      return <RosterReview progress={frame.progress} />;
    case "rough-estimate":
      return <RoughEstimate progress={frame.progress} />;
    case "census-choice":
      return <CensusChoice progress={frame.progress} />;
    case "census-confirmation":
      return <CensusConfirmation progress={frame.progress} />;
    case "underwriting":
      return <UnderwritingScene />;
    case "pricing-analysis":
      return <PricingAnalysis progress={frame.progress} />;
    case "plan-qualified":
      return <PlanQualified progress={frame.progress} />;
    case "benefits-package":
      return <BenefitsPackage progress={frame.progress} />;
    case "contribution-explainer":
      return <ContributionExplainer progress={frame.progress} />;
    case "contribution-setup":
      return <ContributionSetup progress={frame.progress} />;
    case "final-locked-quote":
      return <FinalLockedQuote progress={frame.progress} />;
  }
}

export function BusinessOnboardingAutoplay() {
  const prefersReducedMotion = usePrefersReducedMotion();
  const [elapsedMs, setElapsedMs] = useState(prefersReducedMotion ? businessOnboardingLoopDuration - 1 : 0);
  const [isPaused, setIsPaused] = useState(false);
  const [isVisible, setIsVisible] = useState(() => document.visibilityState === "visible");
  const frame = getBusinessOnboardingFrame(elapsedMs);
  const progressStep = businessOnboardingProgressStepByScene[frame.id];

  useEffect(() => {
    const syncVisibility = () => setIsVisible(document.visibilityState === "visible");
    document.addEventListener("visibilitychange", syncVisibility);
    return () => document.removeEventListener("visibilitychange", syncVisibility);
  }, []);

  useEffect(() => {
    if (prefersReducedMotion || isPaused || !isVisible) return;

    let previousTick = window.performance.now();
    const interval = window.setInterval(() => {
      const now = window.performance.now();
      const delta = now - previousTick;
      previousTick = now;
      setElapsedMs((elapsed) => (elapsed + delta) % businessOnboardingLoopDuration);
    }, 80);

    return () => window.clearInterval(interval);
  }, [isPaused, isVisible, prefersReducedMotion]);

  return (
    <div className="business-onboarding" data-scene={frame.id} aria-label="Automatically looping Cakewalk business onboarding walkthrough">
      <header className="business-onboarding__header">
        <img src={`${import.meta.env.BASE_URL}brand/cakewalk-logo-orange.svg`} alt="Cakewalk" />
        <span><LockKeyhole /> Encrypted &amp; secure</span>
      </header>

      <div className={`business-onboarding__progress${frame.id === "final-locked-quote" ? " business-onboarding__progress--complete" : ""}`} aria-hidden="true">
        {["Your company", "Your team", "Group census", "Your plans", "Your costs"].map((step, index) => (
          <span className={index <= progressStep ? "is-active" : ""} key={step}>
            <i>{index < progressStep ? <Check /> : index + 1}</i>{step}
          </span>
        ))}
      </div>

      <main className="business-onboarding__stage" aria-live="off">
        <img className="business-onboarding__stage-background" src={onboardingHeroImageSrc} alt="" aria-hidden="true" />
        <OnboardingScene frame={frame} />
      </main>

      <div className="business-onboarding__autoplay">
        <span><i /> {prefersReducedMotion ? "Motion reduced" : isPaused ? "Walkthrough paused" : "Looping walkthrough"}</span>
        {!prefersReducedMotion && (
          <button type="button" onClick={() => setIsPaused((paused) => !paused)} aria-label={isPaused ? "Play onboarding walkthrough" : "Pause onboarding walkthrough"}>
            {isPaused ? <CirclePlay /> : <CirclePause />}
          </button>
        )}
      </div>
    </div>
  );
}
