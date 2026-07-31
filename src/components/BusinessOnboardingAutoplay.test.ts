import { describe, expect, it } from "vitest";
import {
  businessOnboardingDemoData,
  businessOnboardingLoopDuration,
  businessOnboardingProgressStepByScene,
  businessOnboardingQuoteData,
  businessOnboardingScenes,
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

  it("keeps the recommendation, contribution split, and locked quote in shared workflow data", () => {
    expect(businessOnboardingQuoteData.employeeCount).toBe(5);
    expect(businessOnboardingQuoteData.roughEstimate).toMatchObject({
      monthlyLow: 1_303,
      monthlyHigh: 1_871,
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
      employerMonthly: 928,
      employeeMonthly: 668,
      averageEmployeeMonthly: 134,
    });
    expect(businessOnboardingQuoteData.finalQuote).toEqual({ employerMonthly: 928, holdDays: 30 });
  });

  it("advances the five-stage indicator with the live lifecycle", () => {
    expect(Object.keys(businessOnboardingProgressStepByScene)).toHaveLength(businessOnboardingScenes.length);
    expect(businessOnboardingProgressStepByScene["roster-review"]).toBe(1);
    expect(businessOnboardingProgressStepByScene["census-confirmation"]).toBe(2);
    expect(businessOnboardingProgressStepByScene["benefits-package"]).toBe(3);
    expect(businessOnboardingProgressStepByScene["contribution-setup"]).toBe(4);
    expect(businessOnboardingProgressStepByScene["final-locked-quote"]).toBe(4);
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
