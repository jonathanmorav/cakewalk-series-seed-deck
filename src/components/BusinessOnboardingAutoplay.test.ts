import { describe, expect, it } from "vitest";
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
} from "./businessOnboardingWorkflow";

describe("BusinessOnboardingAutoplay", () => {
  it("follows the live onboarding workflow in order", () => {
    expect(businessOnboardingScenes.map(({ id }) => id)).toEqual([
      "company-search",
      "company-confirmation",
      "team-explanation",
      "payroll-selection",
      "account-email",
      "account-code",
      "provider-overview",
      "provider-login",
      "team-import",
      "connection-complete",
      "roster-review",
      "rough-estimate",
      "census-choice",
      "census-confirmation",
      "underwriting",
      "pricing-analysis",
      "plan-qualified",
      "benefits-package",
      "contribution-explainer",
      "contribution-setup",
      "final-locked-quote",
    ]);
    expect(businessOnboardingScenes.map(({ duration }) => duration)).toEqual([
      4_200,
      4_400,
      2_800,
      2_800,
      3_000,
      3_000,
      2_300,
      3_600,
      2_800,
      2_400,
      3_800,
      2_800,
      3_000,
      3_200,
      3_200,
      2_700,
      2_800,
      4_200,
      2_800,
      3_800,
      4_000,
    ]);
    expect(businessOnboardingLoopDuration).toBe(67_600);
  });

  it("uses the seeded company and valid demo-only verification values", () => {
    expect(businessOnboardingDemoData.company).toBe("Northside Veterinary Clinic");
    expect(businessOnboardingDemoData).toMatchObject({
      category: "Veterinary Care",
      phone: "(423) 509-0142",
      website: "northsidevet.com",
      industryCode: "SIC 0742",
      industry: "Veterinary Services for Animal Specialties",
    });
    expect(businessOnboardingDemoData.workEmail).toMatch(/@northsidevet\.com$/);
    expect(businessOnboardingDemoData.adminEmail).toMatch(/@northsidevet\.com$/);
    expect(businessOnboardingDemoData.password.length).toBeGreaterThanOrEqual(4);
    expect(businessOnboardingDemoData.verificationCode).toMatch(/^\d{6}$/);
    expect(businessOnboardingDemoData.verificationCode).not.toBe("000000");
  });

  it("leaves enough time for the AI industry analysis to resolve before confirmation", () => {
    expect(businessOnboardingScenes[1]).toEqual({ id: "company-confirmation", duration: 4_400 });
  });

  it("keeps imported, eligible, and excluded roster counts explicit", () => {
    expect(businessOnboardingRosterData).toEqual({
      importedCount: 7,
      eligibleCount: 5,
      excludedCount: 2,
    });
    expect(businessOnboardingRosterData.importedCount).toBe(
      businessOnboardingRosterData.eligibleCount + businessOnboardingRosterData.excludedCount,
    );
    expect(businessOnboardingQuoteData.employeeCount).toBe(businessOnboardingRosterData.eligibleCount);
  });

  it("keeps the recommendation, contribution split, and locked quote in shared workflow data", () => {
    expect(businessOnboardingQuoteData.employeeCount).toBe(5);
    expect(businessOnboardingQuoteData.roughEstimate).toMatchObject({
      monthlyLow: 1_310,
      monthlyHigh: 1_880,
      monthlyPerEmployee: 319,
    });
    expect(businessOnboardingQuoteData.plans.map(({ category }) => category)).toEqual([
      "Medical",
      "Dental",
      "Vision",
      "Life",
    ]);
    expect(businessOnboardingQuoteData.plans.reduce((total, plan) => total + plan.monthlyTotal, 0)).toBe(
      businessOnboardingQuoteData.packageMonthlyTotal,
    );
    expect(businessOnboardingQuoteData.contribution).toMatchObject({
      minimumMedicalPercent: 50,
      employerMonthlyCost: 928,
      employerMonthly: 928,
      employeeMonthly: 668,
      averageEmployeeMonthly: 134,
    });
    expect(businessOnboardingQuoteData.contribution.employerMonthly).toBe(
      businessOnboardingQuoteData.contribution.employerMonthlyCost,
    );
    expect(businessOnboardingQuoteData.finalQuote).toEqual({
      employerMonthlyCost: 928,
      employerMonthly: 928,
      holdDays: 30,
    });
    expect(businessOnboardingQuoteData.finalQuote.employerMonthly).toBe(
      businessOnboardingQuoteData.finalQuote.employerMonthlyCost,
    );
  });

  it("advances the five-stage indicator with the live lifecycle", () => {
    expect(businessOnboardingProgressSteps).toEqual([
      { id: "confirm-company", label: "Your company" },
      { id: "roster-method", label: "Your team" },
      { id: "underwriting", label: "Group census" },
      { id: "results", label: "Your plans" },
      { id: "quote", label: "Your costs" },
    ]);
    expect(Object.keys(businessOnboardingProgressStepByScene)).toHaveLength(businessOnboardingScenes.length);
    expect(businessOnboardingProgressStepByScene["roster-review"]).toBe(1);
    expect(businessOnboardingProgressStepByScene["census-confirmation"]).toBe(2);
    expect(businessOnboardingProgressStepByScene["benefits-package"]).toBe(3);
    expect(businessOnboardingProgressStepByScene["contribution-setup"]).toBe(4);
    expect(businessOnboardingProgressStepByScene["final-locked-quote"]).toBe(4);
  });

  it("exposes the live step title for every autoplay scene", () => {
    expect(Object.keys(businessOnboardingStepTitleByScene)).toHaveLength(businessOnboardingScenes.length);
    expect(businessOnboardingStepTitleByScene["company-search"]).toBe("");
    expect(businessOnboardingStepTitleByScene["roster-review"]).toBe("Your team");
    expect(businessOnboardingStepTitleByScene["rough-estimate"]).toBe("Your ballpark");
    expect(businessOnboardingStepTitleByScene["pricing-analysis"]).toBe("Building your plans");
    expect(businessOnboardingStepTitleByScene["benefits-package"]).toBe("Your plans");
    expect(businessOnboardingStepTitleByScene["contribution-setup"]).toBe("Set your contribution");
    expect(businessOnboardingStepTitleByScene["final-locked-quote"]).toBe("You're covered");
    expect(Object.keys(businessOnboardingStepSlugByScene)).toHaveLength(businessOnboardingScenes.length);
    expect(businessOnboardingStepSlugByScene["company-search"]).toBe("");
    expect(businessOnboardingStepSlugByScene["rough-estimate"]).toBe("indicative");
    expect(businessOnboardingStepSlugByScene["final-locked-quote"]).toBe("complete");
  });

  it("advances through every scene and loops back to search", () => {
    let elapsed = 0;

    for (const [sceneIndex, scene] of businessOnboardingScenes.entries()) {
      expect(getBusinessOnboardingFrame(elapsed)).toMatchObject({ id: scene.id, sceneIndex, progress: 0 });
      elapsed += scene.duration;
    }

    expect(elapsed).toBe(businessOnboardingLoopDuration);
    expect(getBusinessOnboardingFrame(businessOnboardingLoopDuration)).toMatchObject({
      id: "company-search",
      sceneIndex: 0,
      progress: 0,
    });
  });
});
