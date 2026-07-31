export const businessOnboardingDemoData = {
  company: "Northside Veterinary Clinic",
  address: "1248 Hixson Pike, Chattanooga, TN 37405",
  workEmail: "alex@northsidevet.com",
  adminEmail: "demo@northsidevet.com",
  password: "Northside2026!",
  verificationCode: "274916",
} as const;

export const businessOnboardingQuoteData = {
  employeeCount: 5,
  location: "Chattanooga, TN 37405",
  roughEstimate: {
    monthlyLow: 1_303,
    monthlyHigh: 1_871,
    monthlyPerEmployee: 319,
  },
  preliminaryMonthlyRate: {
    low: 702,
    high: 858,
  },
  plans: [
    {
      category: "Medical",
      name: "Blue Choice Silver EPO",
      carrier: "Blue Cross Blue Shield",
      monthlyPerEmployee: 260,
      monthlyTotal: 1_300,
    },
    {
      category: "Dental",
      name: "DentalGuard Preferred PPO",
      carrier: "Guardian",
      monthlyPerEmployee: 34,
      monthlyTotal: 170,
    },
    {
      category: "Vision",
      name: "VisionGuard Plus",
      carrier: "Guardian",
      monthlyPerEmployee: 13,
      monthlyTotal: 65,
    },
    {
      category: "Life",
      name: "Group Term Life — Basic",
      carrier: "MetLife",
      monthlyPerEmployee: 12,
      monthlyTotal: 60,
    },
  ],
  packageMonthlyTotal: 1_595,
  packageMonthlyPerEmployee: 319,
  levelFunded: {
    claimsFundMonthly: 1_117,
    stopLossMonthly: 351,
    adminMonthly: 128,
    potentialYearEndRefund: 2_412,
  },
  contribution: {
    minimumMedicalPercent: 50,
    employerMonthly: 928,
    employeeMonthly: 668,
    averageEmployeeMonthly: 134,
  },
  finalQuote: {
    employerMonthly: 928,
    holdDays: 30,
  },
} as const;

export const businessOnboardingScenes = [
  { id: "company-search", duration: 4_200 },
  { id: "company-confirmation", duration: 2_700 },
  { id: "team-explanation", duration: 2_800 },
  { id: "payroll-selection", duration: 2_800 },
  { id: "account-email", duration: 3_000 },
  { id: "account-code", duration: 3_000 },
  { id: "provider-overview", duration: 2_300 },
  { id: "provider-login", duration: 3_600 },
  { id: "team-import", duration: 2_800 },
  { id: "connection-complete", duration: 2_400 },
  { id: "roster-review", duration: 3_800 },
  { id: "rough-estimate", duration: 2_800 },
  { id: "census-choice", duration: 3_000 },
  { id: "census-confirmation", duration: 3_200 },
  { id: "underwriting", duration: 3_200 },
  { id: "pricing-analysis", duration: 2_700 },
  { id: "plan-qualified", duration: 2_800 },
  { id: "benefits-package", duration: 4_200 },
  { id: "contribution-explainer", duration: 2_800 },
  { id: "contribution-setup", duration: 3_800 },
  { id: "final-locked-quote", duration: 4_000 },
] as const;

export type BusinessOnboardingSceneId = (typeof businessOnboardingScenes)[number]["id"];

export const businessOnboardingProgressStepByScene: Record<BusinessOnboardingSceneId, 0 | 1 | 2 | 3 | 4> = {
  "company-search": 0,
  "company-confirmation": 0,
  "team-explanation": 1,
  "payroll-selection": 1,
  "account-email": 1,
  "account-code": 1,
  "provider-overview": 1,
  "provider-login": 1,
  "team-import": 1,
  "connection-complete": 1,
  "roster-review": 1,
  "rough-estimate": 1,
  "census-choice": 2,
  "census-confirmation": 2,
  underwriting: 2,
  "pricing-analysis": 3,
  "plan-qualified": 3,
  "benefits-package": 3,
  "contribution-explainer": 4,
  "contribution-setup": 4,
  "final-locked-quote": 4,
};

export const businessOnboardingLoopDuration = businessOnboardingScenes.reduce(
  (total, scene) => total + scene.duration,
  0,
);

export interface BusinessOnboardingFrame {
  id: BusinessOnboardingSceneId;
  progress: number;
  sceneIndex: number;
}

export function getBusinessOnboardingFrame(elapsedMs: number): BusinessOnboardingFrame {
  const loopPosition =
    ((elapsedMs % businessOnboardingLoopDuration) + businessOnboardingLoopDuration) % businessOnboardingLoopDuration;
  let sceneStart = 0;

  for (let sceneIndex = 0; sceneIndex < businessOnboardingScenes.length; sceneIndex += 1) {
    const scene = businessOnboardingScenes[sceneIndex];
    const sceneEnd = sceneStart + scene.duration;

    if (loopPosition < sceneEnd) {
      return {
        id: scene.id,
        progress: (loopPosition - sceneStart) / scene.duration,
        sceneIndex,
      };
    }

    sceneStart = sceneEnd;
  }

  return { id: "company-search", progress: 0, sceneIndex: 0 };
}
