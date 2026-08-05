import { useEffect, useState, type ReactNode } from "react";
import {
  BriefcaseBusiness,
  Building2,
  Check,
  ChevronRight,
  CirclePause,
  CirclePlay,
  Clock3,
  Download,
  Globe2,
  LoaderCircle,
  LockKeyhole,
  Mail,
  MailCheck,
  MapPin,
  MousePointer2,
  PencilLine,
  Phone,
  Search,
  Send,
  ShieldCheck,
  Sparkles,
  UserRoundX,
  Users,
} from "lucide-react";
import {
  businessOnboardingDemoData,
  businessOnboardingLoopDuration,
  businessOnboardingProgressStepByScene,
  businessOnboardingProgressSteps,
  businessOnboardingQuoteData,
  businessOnboardingRosterData,
  businessOnboardingScenes,
  businessOnboardingStepSlugByScene,
  businessOnboardingStepTitleByScene,
  getBusinessOnboardingFrame,
  type BusinessOnboardingFrame,
} from "./businessOnboardingWorkflow";

const onboardingHeroImageSrc = `${import.meta.env.BASE_URL}images/get-started/hero-background.jpg`;
const payrollLogoSrc = (fileName: string) => `${import.meta.env.BASE_URL}payroll-logos/${fileName}.png`;
const quickBooksLogoSrc = payrollLogoSrc("quickbooks");

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

function ProviderLogo({ fileName, name }: { fileName: string; name: string }) {
  return (
    <span className="business-onboarding__provider-logo" aria-label={name}>
      <img src={payrollLogoSrc(fileName)} alt="" aria-hidden="true" />
    </span>
  );
}

function TypeField({ label, value, secret = false }: { label: string; value: string; secret?: boolean }) {
  return (
    <label className="business-onboarding__field cw-v2-input-field">
      <span className="cw-v2-label cw-v2-label--sm">{label}</span>
      <span className="business-onboarding__input cw-v2-input cw-v2-input--md cw-v2-input--focused">
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
    <div className="business-onboarding__scene business-onboarding__scene--search cw-blur-in-up">
      <span className="business-onboarding__eyebrow cw-v2-typography cw-v2-typography--overline">Find your business</span>
      <h2 className="cw-v2-marketing-typography cw-v2-marketing-typography--hero">Big-company benefits for everyday businesses.</h2>
      <p className="cw-v2-typography cw-v2-typography--body-large">
        Premium medical, dental, vision &amp; life coverage your team will love — with an exact rate built on your real people, not a ballpark.
      </p>

      <div className="business-onboarding__search-wrap">
        <div className="business-onboarding__search-field cw-v2-input cw-v2-input--xl cw-v2-input--focused">
          <Search aria-hidden="true" />
          <span className={typedCompany ? "" : "business-onboarding__placeholder"}>
            {typedCompany || "Search for your company..."}
          </span>
          {typedLength < businessOnboardingDemoData.company.length && typedLength > 0 && (
            <i className="business-onboarding__caret" aria-hidden="true" />
          )}
        </div>

        {showResult && (
          <div className="business-onboarding__company-result business-onboarding__target cw-v2-card cw-v2-card--elevated">
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

      <small className="business-onboarding__trust">
        <LockKeyhole /> No forms, no commitment — see a ballpark first, then an exact rate once your census is in.
      </small>
    </div>
  );
}

function CompanyConfirmation({ progress }: { progress: number }) {
  const isAnalyzing = progress < 0.58;

  if (progress > 0.78) {
    return (
      <div className="business-onboarding__scene business-onboarding__scene--statement cw-blur-in-up">
        <span className="business-onboarding__eyebrow cw-v2-typography cw-v2-typography--overline">You&apos;re in.</span>
        <h2 className="cw-v2-marketing-typography cw-v2-marketing-typography--ceremony">
          Let&apos;s build {businessOnboardingDemoData.company}&apos;s benefits.
        </h2>
      </div>
    );
  }

  return (
    <div className="business-onboarding__scene business-onboarding__scene--confirmation cw-blur-in-up">
      <span className="business-onboarding__eyebrow cw-v2-typography cw-v2-typography--overline">Your company</span>
      <h2 className="cw-v2-typography cw-v2-typography--display">Is this your business?</h2>
      <p className="cw-v2-typography cw-v2-typography--body-large">We pulled this from public records. Give it a quick look and fix anything that&apos;s off before we build your quote.</p>

      <article className="business-onboarding__company-card cw-v2-card">
        <header className="business-onboarding__company-card-header">
          <span className="business-onboarding__result-mark"><Building2 /></span>
          <span className="business-onboarding__company-identity">
            <strong>{businessOnboardingDemoData.company}</strong>
            <small>{businessOnboardingDemoData.category}</small>
          </span>
          <span className="business-onboarding__verified cw-v2-badge cw-v2-badge--success cw-v2-badge--sm"><Check /> Verified profile</span>
        </header>
        <div className="business-onboarding__ai-source"><Sparkles /> Pre-filled from your profile</div>
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
        <button className="business-onboarding__primary business-onboarding__target cw-v2-button cw-v2-button--primary cw-v2-button--sm" type="button" tabIndex={-1} disabled={isAnalyzing}>
          This is my business — continue
          <ChevronRight aria-hidden="true" />
          {!isAnalyzing && <DemoPointer pressing={progress > 0.72} />}
        </button>
        <button className="business-onboarding__secondary cw-v2-button cw-v2-button--link cw-v2-button--sm" type="button" tabIndex={-1}>Not quite</button>
      </div>
    </div>
  );
}

function TeamExplanation({ progress }: { progress: number }) {
  return (
    <div className="business-onboarding__scene business-onboarding__scene--team cw-blur-in-up">
      <span className="business-onboarding__eyebrow cw-v2-typography cw-v2-typography--overline">Next: your team</span>
      <h2 className="cw-v2-typography cw-v2-typography--display">Here’s what we look at — and what we never touch.</h2>
      <p className="cw-v2-typography cw-v2-typography--body-large">To price your plan we need to know who’s on your team. Here’s exactly what we use and what we leave alone.</p>

      <div className="business-onboarding__privacy-grid">
        <article className="cw-v2-card">
          <Users aria-hidden="true" />
          <strong>What we bring in</strong>
          <span><Check /> Full-time W-2 employees</span>
          <span><Check /> Names, age, home ZIP and gender</span>
          <span><Check /> Annual salary</span>
        </article>
        <article className="cw-v2-card">
          <ShieldCheck aria-hidden="true" />
          <strong>What we never touch</strong>
          <span><Check /> Bank account details</span>
          <span><Check /> Social Security numbers</span>
        </article>
      </div>

      <small className="business-onboarding__assurance"><LockKeyhole /> Nothing goes live until you approve it. Bank-level encryption.</small>

      <button className="business-onboarding__primary business-onboarding__target cw-v2-button cw-v2-button--primary cw-v2-button--sm" type="button" tabIndex={-1}>
        Continue
        <ChevronRight aria-hidden="true" />
        <DemoPointer pressing={progress > 0.76} />
      </button>
    </div>
  );
}

const payrollProviders = [
  { name: "QuickBooks Payroll", fileName: "quickbooks", description: "Your team and pay info — already in QuickBooks." },
  { name: "Gusto", fileName: "gusto", description: "Popular with small teams. Import your roster in one step." },
  { name: "Paychex", fileName: "paychex", description: "Pull your Paychex Flex roster over — no retyping names." },
  { name: "BambooHR", fileName: "bamboohr", description: "Your HR roster and work emails, brought over for you." },
  { name: "ADP", fileName: "adp", description: "Import your RUN or Workforce Now team in minutes." },
] as const;

function PayrollSelection({ progress }: { progress: number }) {
  return (
    <div className="business-onboarding__scene business-onboarding__scene--payroll cw-blur-in-up">
      <span className="business-onboarding__eyebrow cw-v2-typography cw-v2-typography--overline">Bring in your roster</span>
      <h2 className="cw-v2-typography cw-v2-typography--display">Connect payroll — we’ll pull your roster in for you.</h2>
      <p className="cw-v2-typography cw-v2-typography--body-large">We’ll pull in names, emails, and pay details from payroll — you review and edit everything before launch. Usually takes about five minutes.</p>

      <div className="business-onboarding__providers">
        {payrollProviders.map((provider, index) => (
          <article
            className={`business-onboarding__provider cw-v2-card${index === 0 ? " business-onboarding__target business-onboarding__provider--active" : ""}`}
            key={provider.name}
          >
            <ProviderLogo fileName={provider.fileName} name={provider.name} />
            <strong>{provider.name}</strong>
            <small>{provider.description}</small>
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
    <div className="business-onboarding__scene business-onboarding__scene--modal bd-v2-step-build-light">
      <div className="business-onboarding__modal-backdrop" aria-hidden="true">
        <div /><div /><div /><div />
      </div>
      <section className="business-onboarding__modal-card cw-v2-card cw-v2-card--elevated">
        <div className="business-onboarding__integration-lockup">
          <QuickBooksLogo size="lockup" />
          <span className="business-onboarding__integration-line" />
          <img src={`${import.meta.env.BASE_URL}brand/cakewalk-mark.svg`} alt="" aria-hidden="true" />
        </div>
        <span className="business-onboarding__eyebrow cw-v2-typography cw-v2-typography--overline">Secure connection</span>
        <h2 className="cw-v2-typography cw-v2-typography--heading-xl">Verify to connect QuickBooks Payroll</h2>
        {isEmail ? (
          <>
            <p className="cw-v2-typography cw-v2-typography--body">Linking payroll needs a verified Cakewalk account. It only takes a few seconds.</p>
            <button className="business-onboarding__google-button cw-v2-button cw-v2-button--contrast cw-v2-button--sm" type="button" tabIndex={-1}>
              <span aria-hidden="true">G</span> Continue with Google
            </button>
            <div className="business-onboarding__divider"><span>or use your work email</span></div>
            <TypeField label="Work email" value={typedValue} />
            <button className="business-onboarding__primary business-onboarding__target cw-v2-button cw-v2-button--primary cw-v2-button--sm" type="button" tabIndex={-1}>
              <Mail aria-hidden="true" /> Email me a code
              <DemoPointer pressing={progress > 0.82} />
            </button>
          </>
        ) : (
          <>
            <div className="business-onboarding__verification-notice">
              <MailCheck aria-hidden="true" />
              <span>We sent a 6-digit code to <strong>{businessOnboardingDemoData.workEmail}</strong>.</span>
            </div>
            <label className="business-onboarding__field business-onboarding__otp-field">
              <span className="cw-v2-label cw-v2-label--sm">Verification code</span>
              <span className="business-onboarding__otp" aria-label="Verification code">
                {Array.from({ length: 6 }, (_, index) => (
                  <i className={typedValue[index] ? "is-filled" : ""} key={index}>{typedValue[index] ?? ""}</i>
                ))}
              </span>
            </label>
            <button className="business-onboarding__primary business-onboarding__target cw-v2-button cw-v2-button--primary cw-v2-button--sm" type="button" tabIndex={-1}>
              Verify &amp; connect
              <ChevronRight aria-hidden="true" />
              <DemoPointer pressing={progress > 0.82} />
            </button>
            <button className="business-onboarding__resend cw-v2-button cw-v2-button--link cw-v2-button--sm" type="button" tabIndex={-1}>Resend code</button>
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
    <div className="business-onboarding__scene business-onboarding__scene--modal bd-v2-step-build-light">
      <div className="business-onboarding__modal-backdrop" aria-hidden="true">
        <div /><div /><div /><div />
      </div>
      <section className="business-onboarding__modal-card business-onboarding__modal-card--provider cw-v2-card cw-v2-card--elevated">
        <div className="business-onboarding__provider-heading">
          <QuickBooksLogo size="heading" />
          <span><small>Secure provider connection</small><strong>Connect QuickBooks Payroll</strong></span>
          <img src={`${import.meta.env.BASE_URL}brand/cakewalk-mark.svg`} alt="" aria-hidden="true" />
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
            <h2 className="cw-v2-typography cw-v2-typography--heading-xl">Bring your team in automatically.</h2>
            <p className="cw-v2-typography cw-v2-typography--body">We’ll pull company basics, your roster, work emails, and pay details. You review every detail.</p>
            <div className="business-onboarding__permission-list">
              <span><Check /> Company basics</span><span><Check /> Team roster</span><span><Check /> Pay details</span>
            </div>
            <div className="business-onboarding__provider-security"><LockKeyhole /> Read-only connection. Cakewalk can’t change payroll or move money.</div>
            <button className="business-onboarding__primary business-onboarding__target cw-v2-button cw-v2-button--primary cw-v2-button--sm" type="button" tabIndex={-1}>
              Continue to QuickBooks Payroll <ChevronRight />
              <DemoPointer pressing={progress > 0.76} />
            </button>
          </div>
        )}

        {mode === "login" && (
          <div className="business-onboarding__provider-content">
            <h2 className="cw-v2-typography cw-v2-typography--heading-xl">Sign in to QuickBooks Payroll</h2>
            <p className="cw-v2-typography cw-v2-typography--body">Use your payroll admin login. We’ll handle the rest.</p>
            <div className="business-onboarding__login-fields">
              <TypeField label="Admin email" value={businessOnboardingDemoData.adminEmail.slice(0, emailLength)} />
              <TypeField label="Password" value={businessOnboardingDemoData.password.slice(0, passwordLength)} secret />
            </div>
            <button className="business-onboarding__primary business-onboarding__target cw-v2-button cw-v2-button--primary cw-v2-button--sm" type="button" tabIndex={-1}>
              Import my team <ChevronRight />
              <DemoPointer pressing={progress > 0.84} />
            </button>
          </div>
        )}

        {mode === "import" && (
          <div className="business-onboarding__provider-content business-onboarding__provider-content--centered">
            <span className="business-onboarding__import-orbit"><Users /><i /></span>
            <h2 className="cw-v2-typography cw-v2-typography--heading-xl">Pulling in your team…</h2>
            <p className="cw-v2-typography cw-v2-typography--body">Bringing over the company details and roster for your review.</p>
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
            <h2 className="cw-v2-typography cw-v2-typography--heading-xl">QuickBooks Payroll is connected</h2>
            <p className="cw-v2-typography cw-v2-typography--body">We found your team. Take a quick look, fill any gaps, and you’re on your way.</p>
            <div className="business-onboarding__import-stats">
              <span><strong>{businessOnboardingRosterData.importedCount}</strong>People imported</span>
              <span><strong>{businessOnboardingRosterData.eligibleCount}</strong>Eligible employees</span>
              <span><strong>{businessOnboardingRosterData.excludedCount}</strong>Set aside</span>
            </div>
            <button className="business-onboarding__primary business-onboarding__target cw-v2-button cw-v2-button--primary cw-v2-button--sm" type="button" tabIndex={-1}>
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

const excludedRosterMembers = [
  ["CM", "Caleb Morgan", "Part-time · 24 hours/week"],
  ["DS", "Dev Sharma", "Contractor · 1099"],
] as const;

function RosterReview({ progress }: { progress: number }) {
  return (
    <div className="business-onboarding__scene business-onboarding__scene--roster cw-blur-in-up">
      <span className="business-onboarding__eyebrow cw-v2-typography cw-v2-typography--overline">Your roster</span>
      <div className="business-onboarding__roster-heading">
        <span><h2 className="cw-v2-typography cw-v2-typography--display">Review your roster</h2><p>Imported from QuickBooks Payroll. We automatically set ineligible workers aside for review.</p></span>
        <span className="business-onboarding__sync cw-v2-badge cw-v2-badge--success cw-v2-badge--sm"><Sparkles /> 7 imported · 5 eligible · 2 set aside</span>
      </div>
      <div className="business-onboarding__roster-grid">
        {rosterMembers.map(([initials, name, detail], index) => (
          <article className="cw-v2-card" style={{ animationDelay: `${index * 70}ms` }} key={name}>
            <span>{initials}</span>
            <div><strong>{name}</strong><small>{detail}</small></div>
            <Check aria-hidden="true" />
          </article>
        ))}
        {excludedRosterMembers.map(([initials, name, detail], index) => (
          <article className="cw-v2-card business-onboarding__roster-card--excluded" style={{ animationDelay: `${(index + rosterMembers.length) * 70}ms` }} key={name}>
            <span>{initials}</span>
            <div><strong>{name}</strong><small>{detail}</small></div>
            <UserRoundX aria-hidden="true" />
          </article>
        ))}
      </div>
      <div className="business-onboarding__roster-footer">
        <small><LockKeyhole /> Names and pay details stay linked to your provider.</small>
        <button className="business-onboarding__primary business-onboarding__target cw-v2-button cw-v2-button--primary cw-v2-button--sm" type="button" tabIndex={-1}>
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
      <span className="business-onboarding__eyebrow cw-v2-typography cw-v2-typography--overline">{eyebrow}</span>
      <h2 className="cw-v2-typography cw-v2-typography--display">{title}</h2>
      <p className="cw-v2-typography cw-v2-typography--body-large">{description}</p>
    </>
  );
}

function SceneAction({ children, progress }: { children: ReactNode; progress: number }) {
  return (
    <button className="business-onboarding__primary business-onboarding__target cw-v2-button cw-v2-button--primary cw-v2-button--sm" type="button" tabIndex={-1}>
      {children}<ChevronRight aria-hidden="true" />
      <DemoPointer pressing={progress > 0.76} />
    </button>
  );
}

function RoughEstimate({ progress }: { progress: number }) {
  const { roughEstimate } = businessOnboardingQuoteData;

  return (
    <div className="business-onboarding__scene business-onboarding__scene--dense business-onboarding__scene--estimate cw-blur-in-up">
      <SceneIntro
        eyebrow="Rough estimate"
        title="Groups like yours typically spend"
        description="Add who is actually enrolling and any dependents to turn this range into your exact rate."
      />
      <section className="business-onboarding__estimate-card cw-v2-card cw-v2-card--elevated">
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
    <div className="business-onboarding__scene business-onboarding__scene--dense business-onboarding__scene--census cw-blur-in-up">
      <SceneIntro
        eyebrow="One step from your quote"
        title="Confirm who’s actually covered"
        description="Your firm rate needs each person’s confirmed info and dependents. We can collect it directly from your team — no chasing."
      />
      <section className="business-onboarding__panel business-onboarding__census-panel cw-v2-card">
        <div className="business-onboarding__tabs-mini">
          <span className="is-active"><MailCheck /> Ask my team</span>
          <span><Users /> Type it in myself</span>
        </div>
        <div className="business-onboarding__census-choice-body">
          <span className="business-onboarding__result-mark"><Send /></span>
          <span><strong>We email your team — you don’t have to explain anything</strong><small>Five private links are ready. Cakewalk tracks responses and nudges anyone unfinished.</small></span>
          <span className="business-onboarding__sync cw-v2-badge cw-v2-badge--success cw-v2-badge--sm"><Check /> 5 invites ready</span>
        </div>
      </section>
      <SceneAction progress={progress}>Send 5 links</SceneAction>
    </div>
  );
}

function CensusConfirmation({ progress }: { progress: number }) {
  const confirmedCount = Math.min(rosterMembers.length, Math.max(1, Math.floor(progress * 6)));

  return (
    <div className="business-onboarding__scene business-onboarding__scene--dense business-onboarding__scene--census business-onboarding__scene--census-progress cw-blur-in-up">
      <SceneIntro
        eyebrow="Census building"
        title="Invites sent — your quote builds as answers land"
        description="Cakewalk tracks every response and nudges anyone unfinished. You’ll get one update when the census is complete."
      />
      <section className="business-onboarding__panel business-onboarding__census-roster cw-v2-card">
        {rosterMembers.map(([initials, name], index) => (
          <div className="business-onboarding__result-row" key={name}>
            <span className="business-onboarding__avatar">{initials}</span>
            <span><strong>{name}</strong><small>{index < confirmedCount ? "Coverage and dependents confirmed" : "Private link delivered"}</small></span>
            <span className={`business-onboarding__enrolling${index < confirmedCount ? "" : " is-pending"}`}>
              {index < confirmedCount ? <Check /> : <Clock3 />} {index < confirmedCount ? "Confirmed" : "Waiting"}
            </span>
          </div>
        ))}
      </section>
      <div className="business-onboarding__scene-footer">
        <span><strong>{confirmedCount} of 5</strong> confirmed · {confirmedCount === 5 ? 13 : Math.max(confirmedCount, Math.round(confirmedCount * 2.6))} covered lives</span>
        <span className="business-onboarding__auto-submit"><Sparkles /> Submits automatically when complete</span>
      </div>
    </div>
  );
}

function UnderwritingScene({ progress }: { progress: number }) {
  const stages = ['Submitted', 'Underwriting', 'Firm quote'];
  const activeStage = progress < 0.28 ? 0 : progress < 0.86 ? 1 : 2;

  return (
    <div className="business-onboarding__scene business-onboarding__scene--dense business-onboarding__scene--processing cw-blur-in-up">
      <SceneIntro
        eyebrow="Underwriting"
        title="Your census is in — finalizing your rate"
        description="We submitted your confirmed census to underwriting. Most quotes come back in about 2 minutes."
      />
      <section className="business-onboarding__panel business-onboarding__underwriting-card cw-v2-card cw-v2-card--elevated">
        <div className="business-onboarding__underwriting-heading">
          <span className="business-onboarding__success-mark"><Check /></span>
          <span><strong>Census submitted to underwriting</strong><small>5 of 5 confirmed · 13 covered lives</small></span>
        </div>
        <div className="business-onboarding__status-track">
          {stages.map((stage, index) => <span className={index < activeStage ? 'is-complete' : index === activeStage ? 'is-current' : ''} key={stage}><i>{index < activeStage ? <Check /> : index + 1}</i>{stage}</span>)}
        </div>
        <div className="business-onboarding__underwriting-product">
          <ShieldCheck />
          <span><strong>Medical underwriting</strong><small>Balanced · Level-funded · Blue Cross Blue Shield</small></span>
          <span>{activeStage === 2 ? "Rate ready" : "Checking rates"}</span>
        </div>
        <small className="business-onboarding__underwriting-timing"><Clock3 /> Most groups: about 2 minutes · Complex groups: up to 3 business days</small>
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
    <div className="business-onboarding__scene business-onboarding__scene--dense business-onboarding__scene--processing cw-blur-in-up">
      <SceneIntro
        eyebrow="Building your package"
        title={`Pricing ${businessOnboardingDemoData.company}’s census`}
        description="Matching your confirmed team to the right network, product, and monthly rate."
      />
      <section className="business-onboarding__panel business-onboarding__analysis-list cw-v2-card">
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
    <div className="business-onboarding__scene business-onboarding__scene--dense business-onboarding__scene--qualified cw-blur-in-up">
      <SceneIntro
        eyebrow="Underwriting complete"
        title="Done — your group qualifies for level-funded"
        description="Your census is in. We ran it through underwriting — your group size, location, and dependents — and here’s your medical product and rate, based on the census you gave us."
      />
      <section className="business-onboarding__panel business-onboarding__qualified-card cw-v2-card cw-v2-card--elevated">
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
    <div className="business-onboarding__scene business-onboarding__scene--dense business-onboarding__scene--plans business-onboarding__scene--source-layout cw-blur-in-up">
      <SceneIntro
        eyebrow="Benefits bundle"
        title="Here’s your recommended benefits package"
        description={`Built for ${businessOnboardingDemoData.company} · 5 full-time employees · balanced for cost, coverage, and simplicity.`}
      />
      <div className="business-onboarding__plans-layout">
        <section className="business-onboarding__source-card business-onboarding__plans-card cw-v2-card">
          <header>
            <strong>Built for: {businessOnboardingDemoData.company}</strong>
            <small>Toggle any coverage on or off — your cost updates instantly.</small>
          </header>
          <div className="business-onboarding__source-plan-list">
            {plans.map((plan, index) => (
              <article className="business-onboarding__source-plan" data-slot={index} key={plan.category}>
                <i className="business-onboarding__plan-divider" aria-hidden="true" />
                <div className="business-onboarding__source-plan-body">
                  <span className="business-onboarding__source-plan-icon" aria-hidden="true">{plan.category.slice(0, 1)}</span>
                  <span className="business-onboarding__source-plan-copy">
                    <small>{plan.category} · {plan.carrier}</small>
                    <strong>{plan.name}</strong>
                    <em>{index === 0 ? "Balanced network · level-funded" : "Included in your recommended bundle"}</em>
                  </span>
                  <span className="business-onboarding__source-plan-cost">
                    <strong>{formatMoney(plan.monthlyPerEmployee)}</strong>
                    <small>/employee</small>
                  </span>
                  <span className="business-onboarding__source-switch" aria-label={`${plan.category} included`}><i /></span>
                </div>
              </article>
            ))}
          </div>
        </section>

        <aside className="business-onboarding__source-card business-onboarding__plans-summary cw-v2-card cw-v2-card--elevated">
          <div className="business-onboarding__plans-summary-hero">
            <small>Your monthly cost</small>
            <strong>{formatMoney(businessOnboardingQuoteData.packageMonthlyTotal)}<em>/mo</em></strong>
            <span>for 5 employees · {formatMoney(businessOnboardingQuoteData.packageMonthlyPerEmployee)}/employee</span>
            <p>Your census is in, so this is your firm premium. You’ll set the company and employee split next.</p>
          </div>
          <div className="business-onboarding__plans-summary-lines">
            <header><strong>In your package</strong><small>Premium / mo</small></header>
            {plans.map((plan) => (
              <span key={plan.category}><small>{plan.name}</small><strong>{formatMoney(plan.monthlyTotal)}</strong></span>
            ))}
          </div>
          <SceneAction progress={progress}>Continue to contributions</SceneAction>
          <button className="business-onboarding__source-link" type="button" tabIndex={-1}>Talk to our expert</button>
        </aside>
      </div>
    </div>
  );
}

function ContributionExplainer({ progress }: { progress: number }) {
  return (
    <div className="business-onboarding__scene business-onboarding__scene--dense business-onboarding__scene--contribution-intro business-onboarding__scene--source-layout cw-blur-in-up">
      <SceneIntro
        eyebrow="Last step: your split"
        title="Decide what the business covers."
        description="Your total premium is firm. All that’s left is how you split it — what the business covers, and what comes out of each paycheck. Here’s how that works, and the one rule to know."
      />
      <section className="business-onboarding__source-card business-onboarding__contribution-explainer cw-v2-card">
        <article><span className="business-onboarding__concept-icon"><Building2 /></span><span><strong>You decide what the business pays</strong><small>For each plan you turned on, set your share — a percentage of the premium or a flat dollar amount per employee.</small></span></article>
        <article><span className="business-onboarding__concept-icon"><Users /></span><span><strong>Your team picks up the rest</strong><small>Whatever you don’t cover comes out of each employee’s paycheck. You’ll see both sides update live as you move the sliders.</small></span></article>
      </section>
      <div className="business-onboarding__minimum-rule"><span className="business-onboarding__concept-icon"><ShieldCheck /></span><span><strong>One rule: cover at least 50% of medical</strong><small>The medical slider won’t go below it. Dental, vision, and life are entirely your call — down to $0.</small></span></div>
      <SceneAction progress={progress}>Set your contribution</SceneAction>
      <small className="business-onboarding__contribution-assurance"><ShieldCheck /> Nothing is charged here. You can adjust every split before you submit.</small>
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
  const isConfirmingRate = progress < 1_400 / businessOnboardingScenes.find(({ id }) => id === "contribution-setup")!.duration;

  return (
    <div className="business-onboarding__scene business-onboarding__scene--dense business-onboarding__scene--costs business-onboarding__scene--source-layout cw-blur-in-up">
      <SceneIntro
        eyebrow="Your quote"
        title={`${businessOnboardingDemoData.company}’s quote`}
        description="Your census is in and underwriting is done. Adjust your contribution and finalize the firm rate."
      />
      <div className="business-onboarding__quote-layout">
        <div className="business-onboarding__quote-main">
          <section className="business-onboarding__quote-hero">
            <header>
              <span>
                <strong>{isConfirmingRate ? "Estimated total/mo" : "Total cost/mo"}</strong>
                <small>{isConfirmingRate ? "Confirming your rate…" : `Your rate · ~${formatMoney(businessOnboardingQuoteData.packageMonthlyPerEmployee)}/employee`}</small>
              </span>
              <strong key={isConfirmingRate ? "range" : "firm"} className="cw-blur-in-up">
                {isConfirmingRate
                  ? `${formatMoney(businessOnboardingQuoteData.roughEstimate.monthlyLow)}–${formatMoney(businessOnboardingQuoteData.roughEstimate.monthlyHigh)}`
                  : formatMoney(businessOnboardingQuoteData.packageMonthlyTotal)}
                {!isConfirmingRate && <em>/mo</em>}
              </strong>
            </header>
            <div><span><small>Company pays</small><strong>~{formatMoney(contribution.employerMonthlyCost)}/mo</strong></span><span><small>Employees pay</small><strong>~{formatMoney(contribution.employeeMonthly)}/mo</strong></span></div>
          </section>
          <section className="business-onboarding__source-card business-onboarding__contribution-panel cw-v2-card">
            <div className="business-onboarding__contribution-heading"><span><strong>Set your contribution</strong><small>Employees pay ~{formatMoney(contribution.averageEmployeeMonthly)}/mo each on average.</small></span></div>
            {contributionRows.map((row, index) => (
              <div className="business-onboarding__contribution-row" data-slot={index} key={row.label}>
                <span className="business-onboarding__contribution-label"><i>{row.label.slice(0, 1)}</i><span><strong>{row.label}</strong><small>{row.label === 'Medical' ? 'Min 50% required' : 'Employer contribution'}</small></span></span>
                <span className="business-onboarding__contribution-control">
                  {row.label !== 'Medical' && <span className="business-onboarding__contribution-mode"><i className="is-active">%</i><i>$</i></span>}
                  <span className="business-onboarding__slider"><i style={{ width: `${row.percent}%` }} /><b style={{ left: `${row.percent}%` }} /></span>
                </span>
                <span className="business-onboarding__contribution-value"><strong>{row.percent}%</strong><small>{formatMoney(row.monthly)}/mo</small></span>
              </div>
            ))}
          </section>
        </div>

        <aside className="business-onboarding__source-card business-onboarding__quote-summary cw-v2-card cw-v2-card--elevated">
          <header><span className="business-onboarding__quote-company-icon"><Building2 /></span><span><strong>{businessOnboardingDemoData.company}</strong><small>{businessOnboardingQuoteData.location} · 5 employees</small></span></header>
          <div className="business-onboarding__quote-summary-cost">
            <small>{isConfirmingRate ? "Total / month · est." : "Total / month"}</small>
            <strong key={isConfirmingRate ? "range" : "firm"} className="cw-blur-in-up">
              {isConfirmingRate
                ? `${formatMoney(businessOnboardingQuoteData.roughEstimate.monthlyLow)}–${formatMoney(businessOnboardingQuoteData.roughEstimate.monthlyHigh)}`
                : formatMoney(businessOnboardingQuoteData.packageMonthlyTotal)}
              {!isConfirmingRate && <em>/mo</em>}
            </strong>
            <span>{isConfirmingRate ? "Confirming your rate…" : `Company pays ${formatMoney(contribution.employerMonthlyCost)}/mo`}</span>
          </div>
          <button className="business-onboarding__primary business-onboarding__target cw-v2-button cw-v2-button--primary cw-v2-button--sm" type="button" tabIndex={-1}>
            Finalize my quote <ChevronRight />
            <DemoPointer pressing={progress > 0.76} />
          </button>
          <p>Your census is already in, so this is your rate for this group — not an estimate. Submit to move forward.</p>
          <button className="business-onboarding__source-link" type="button" tabIndex={-1}>Adjust plans</button>
        </aside>
      </div>
    </div>
  );
}

function FinalLockedQuote({ progress }: { progress: number }) {
  if (progress < 0.18) {
    return (
      <div className="business-onboarding__scene business-onboarding__scene--ceremony cw-blur-in-up">
        <span className="business-onboarding__success-mark"><Check /></span>
        <span className="business-onboarding__eyebrow">You’re covered</span>
        <h2>{businessOnboardingDemoData.company}&apos;s benefits are locked in.</h2>
      </div>
    );
  }

  const { finalQuote, contribution } = businessOnboardingQuoteData;
  const nextSteps = [
    ['Quote ready', 'Done', 'Your census ran through underwriting — here’s your rate.'],
    ['Set up your bank account', 'Next', 'Add a funding source so the first premium is ready.'],
    ['Enrollment opens', 'Soon', 'Your team reviews and chooses their coverage.'],
    ['Benefits become active', 'Launch day', 'Coverage goes live for everyone enrolled.'],
  ] as const;

  return (
    <div className="business-onboarding__scene business-onboarding__scene--dense business-onboarding__scene--complete business-onboarding__scene--source-layout cw-blur-in-up">
      <div className="business-onboarding__completion-grid">
        <section className="business-onboarding__completion-primary">
          <SceneIntro
            eyebrow="You’re covered"
            title={`${businessOnboardingDemoData.company}'s benefits are locked in.`}
            description={`Underwriting came back with your firm rate. It is held for ${finalQuote.holdDays} days while you finish launch prep.`}
          />
          <article className="business-onboarding__locked-card cw-v2-card cw-v2-card--elevated">
            <header><small>Employer monthly cost</small><span><ShieldCheck /> Held {finalQuote.holdDays} days</span></header>
            <strong>{formatMoney(finalQuote.employerMonthlyCost)}<em>/mo</em></strong>
            <div><span>~{formatMoney(contribution.averageEmployeeMonthly)}/employee · team of 5</span><span>≈ {formatMoney(finalQuote.employerMonthlyCost * 12)}/yr employer cost</span></div>
            <p>Based on the census you submitted — changes to your group before enrollment may adjust this rate.</p>
          </article>
          <div className="business-onboarding__complete-actions">
            <button className="business-onboarding__primary cw-v2-button cw-v2-button--primary cw-v2-button--sm" type="button" tabIndex={-1}>Go to Owner Dashboard <ChevronRight /></button>
            <button className="business-onboarding__source-link" type="button" tabIndex={-1}><Download /> Download quote</button>
          </div>
        </section>
        <section className="business-onboarding__next-steps">
          <header><strong>What happens next</strong><small>Cakewalk keeps the rest moving — we’ll reach out if anything else is needed.</small></header>
          <div className="business-onboarding__completion-timeline">
            {nextSteps.map(([label, status, description], index) => (
              <article className={index === 0 ? 'is-complete' : index === 1 ? 'is-current' : ''} key={label}>
                <i>{index === 0 ? <Check /> : index + 1}</i>
                <span><strong>{label}</strong><small>{description}</small></span>
                <em>{status}</em>
              </article>
            ))}
          </div>
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
      return <UnderwritingScene progress={frame.progress} />;
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

interface BusinessOnboardingAutoplayProps {
  onStepChange?: (step: { title: string; slug: string }) => void;
}

export function BusinessOnboardingAutoplay({ onStepChange }: BusinessOnboardingAutoplayProps) {
  const prefersReducedMotion = usePrefersReducedMotion();
  const [elapsedMs, setElapsedMs] = useState(prefersReducedMotion ? businessOnboardingLoopDuration - 1 : 0);
  const [isPaused, setIsPaused] = useState(false);
  const [isVisible, setIsVisible] = useState(() => document.visibilityState === "visible");
  const frame = getBusinessOnboardingFrame(elapsedMs);
  const progressStep = businessOnboardingProgressStepByScene[frame.id];
  const showProgress = frame.id !== "company-search" && frame.id !== "final-locked-quote";

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

  useEffect(() => {
    onStepChange?.({
      title: businessOnboardingStepTitleByScene[frame.id],
      slug: businessOnboardingStepSlugByScene[frame.id],
    });
  }, [frame.id, onStepChange]);

  return (
    <div
      className={`business-onboarding cw-v2-theme cw-v2-theme-root cw-v2-dashboard-canvas-bg${showProgress ? "" : " business-onboarding--progress-hidden"}`}
      data-scene={frame.id}
      data-step-title={businessOnboardingStepTitleByScene[frame.id]}
      aria-label="Automatically looping Cakewalk business onboarding walkthrough"
    >
      <header className="business-onboarding__header">
        <img src={`${import.meta.env.BASE_URL}brand/cakewalk-logo-orange.svg`} alt="Cakewalk" />
        <div className="business-onboarding__header-meta">
          <span className="business-onboarding__secure"><LockKeyhole /> Encrypted &amp; secure</span>
          <div className="business-onboarding__autoplay">
            <span><i /> {prefersReducedMotion ? "Motion reduced" : isPaused ? "Walkthrough paused" : "Looping walkthrough"}</span>
            {!prefersReducedMotion && (
              <button type="button" onClick={() => setIsPaused((paused) => !paused)} aria-label={isPaused ? "Play onboarding walkthrough" : "Pause onboarding walkthrough"}>
                {isPaused ? <CirclePlay /> : <CirclePause />}
              </button>
            )}
          </div>
        </div>
      </header>

      {showProgress && (
        <div className="business-onboarding__progress-wrap">
          <ol className="business-onboarding__progress cw-v2-step-indicator" aria-label="Business activation progress">
            {businessOnboardingProgressSteps.map((step, index) => {
              const state = index < progressStep ? "complete" : index === progressStep ? "current" : "upcoming";
              return (
                <li className={`cw-v2-step-indicator__item cw-v2-step-indicator__item--${state}`} key={step.id}>
                  <div className="cw-v2-step-indicator__trigger cw-v2-step-indicator__trigger--static" aria-current={state === "current" ? "step" : undefined}>
                    <span className={`cw-v2-step-indicator__bar cw-v2-step-indicator__bar--${state}`} />
                    <span className={`cw-v2-step-indicator__label${state === "current" ? " cw-v2-step-indicator__label--current" : ""}`}>{step.label}</span>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      )}

      <main className="business-onboarding__stage cw-v2-enrollment-flow-main cw-v2-enrollment-flow-main--default" aria-live="off">
        <img className="business-onboarding__stage-background" src={onboardingHeroImageSrc} alt="" aria-hidden="true" />
        <OnboardingScene frame={frame} />
      </main>

    </div>
  );
}
