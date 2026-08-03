import { describe, expect, it } from "vitest";
import {
  boardDirectors,
  competitiveAdvantageRows,
  conclusionCopy,
  formatDeckMonth,
  fragmentedBenefitsLifecycle,
  projectionRows,
  projectionYears,
  productDemos,
  raiseTerms,
  slides,
  tamMarketSegments,
  tamSourceNote,
  tamSources,
  teamMembers,
  tractionStats,
  unitEconomicsCards,
} from "./slides";

describe("formatDeckMonth", () => {
  it("formats a calendar month for the investor-deck cover", () => {
    expect(formatDeckMonth(new Date(2026, 6, 1))).toEqual({
      label: "July 2026",
      dateTime: "2026-07",
    });
  });
});

describe("slide registry", () => {
  it("turns slide four into an owner-centered fragmented benefits lifecycle", () => {
    expect(slides[3]).toMatchObject({
      id: "flow",
      title: "Offering benefits is a second job for small-business owners",
      section: "The need",
    });
    expect(fragmentedBenefitsLifecycle.map(({ label }) => label)).toEqual([
      "Broker coordination",
      "Plan comparison",
      "Employee census",
      "Carrier applications",
      "Underwriting",
      "Employee enrollment",
      "Billing + payroll",
      "Changes + renewals",
    ]);
    expect(slides[3].title).not.toMatch(/40\+|8\s*(?:-|–)\s*12/);
  });

  it("keeps the interactive Cakewalk product tour on slide five", () => {
    expect(slides[4]).toMatchObject({
      id: "cakewalk",
      title: "Fortune 500-caliber benefits, made effortless",
      section: "The product",
    });
    expect(slides[4].renderPrint).toBeTypeOf("function");
    expect(productDemos.map(({ id }) => id)).toEqual([
      "business-onboarding",
      "owner-dashboard",
      "benefits-wallet",
      "member-enrollment",
    ]);
  });

  it("places the sourced total addressable market story on slide six", () => {
    expect(slides).toHaveLength(14);
    expect(slides[5]).toMatchObject({
      id: "tam",
      title: "The largest overlooked insurance market in the U.S.",
      section: "Total Addressable Market",
    });
    expect(slides[5].renderPrint).toBeTypeOf("function");
  });

  it("places the go-to-market statement on slide seven", () => {
    expect(slides[6]).toMatchObject({
      id: "gtm",
      title: "Building the SMB distribution flywheel",
      section: "Go-To-Market",
    });
  });

  it("places the competitive advantage comparison on slide eight", () => {
    expect(slides[7]).toMatchObject({
      id: "competitive-advantage",
      title: "Why Cakewalk Wins",
      section: "Competitive Advantage",
    });
  });

  it("places the team and board on slides nine and ten", () => {
    expect(slides[8]).toMatchObject({
      id: "team",
      title: "Operators, Product Builders, and Insurance Veterans",
      section: "Team",
    });
    expect(slides[9]).toMatchObject({
      id: "board-advisors",
      title: "Board of Directors",
      section: "Board of Directors",
    });
  });

  it("places unit economics, traction, the raise, and conclusion on slides eleven through fourteen", () => {
    expect(slides.slice(10).map(({ id, section }) => ({ id, section }))).toEqual([
      { id: "unit-economics", section: "Unit Economics" },
      { id: "traction", section: "Traction" },
      { id: "the-ask", section: "The Raise" },
      { id: "conclusion", section: "Conclusion" },
    ]);
    expect(slides[12]).toMatchObject({ tone: "canvas" });
    expect(slides[13]).toMatchObject({ tone: "canvas" });
  });
});

describe("slides eleven through fourteen content", () => {
  it("preserves the five unit economics metrics and projection years", () => {
    expect(unitEconomicsCards).toEqual([
      { label: "Premium Per SMB / Annually", value: "$27,600" },
      { label: "Revenue Per SMB / Annually", value: "$1,920" },
      { label: "Margin Per SMB / Annually", value: "$960" },
      { label: "LTV Per SMB", value: "$19,000" },
      { label: "Persistency", value: "95%" },
    ]);
    expect(projectionYears).toEqual(["2026(E)", "2027(E)", "2028(E)", "2029(E)", "2030(E)"]);
  });

  it("preserves every reference projection row", () => {
    expect(projectionRows).toEqual([
      { label: "Total Gross Written Premium*", values: ["$6.1M", "$114M", "$342M", "$798M", "$1.8B"] },
      { label: "YOY Growth", values: ["—", "1768.9%", "200.0%", "133.3%", "125.6%"] },
      {
        label: "Year End ARR",
        values: ["$2.7M", "$7.7M", "$23.0M", "$53.8M", "$122.9M"],
        highlight: true,
      },
      { label: "Net Income", values: ["-$4.0M", "$0.8M", "$5.8M", "$17.8M", "$61.5M"] },
      { label: "Net Margin", values: ["-148.1%", "10.0%", "25.0%", "33.0%", "50.0%"] },
      { label: "SMBs Enrolled", values: ["1,400", "4,000", "12,000", "28,000", "64,000"] },
    ]);
  });

  it("preserves the traction, raise, and conclusion copy", () => {
    expect(tractionStats).toEqual([
      { value: "1,200+", label: "SMBs Served" },
      { value: "$3M+", label: "Gross Written Premium" },
      { value: "$700K+", label: "ARR Run Rate" },
    ]);
    expect(raiseTerms).toEqual({
      commitment: "$5M",
      commitmentLabel: "New Equity Commitment",
      valuation: "$25M Pre-money Valuation",
      round: "Series Seed",
      previousRoundLabel: "Previous Round",
      previousRound: "Pre-Seed · SAFE Note",
      previousCapital: "$1.2M total capital invested",
    });
    expect(conclusionCopy).toEqual([
      "Every employee deserves great benefits.",
      "We're making it a Cakewalk.",
    ]);
  });
});

describe("team and board profiles", () => {
  it("preserves Lucas Milliron's leadership experience", () => {
    expect(teamMembers[2]).toEqual({
      name: "Lucas Milliron",
      title: "Chief Technology Officer",
      image: "people/team-lucas.png",
      highlights: [
        "VP, Technology @ Salty (Acquired by CDK)",
        "Founder, Benezen",
        "Engineering Manager, National Benefits Partners",
      ],
    });
    expect(teamMembers.map(({ name }) => name)).not.toContain("Niv Ben-Dor");
  });

  it("preserves the three reference board directors", () => {
    expect(boardDirectors.map(({ name }) => name)).toEqual([
      "Kevin McCarthy",
      "James Hall",
      "Mona Eliassen",
    ]);
  });
});

describe("competitive advantage comparison", () => {
  it("keeps the five non-price rows and excludes Premium Cost", () => {
    expect(competitiveAdvantageRows).toEqual([
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
    ]);
    expect(competitiveAdvantageRows.map(({ category }) => category)).not.toContain("Premium Cost");
  });
});

describe("TAM attribution", () => {
  it("preserves the reference values and their source mapping", () => {
    expect(tamMarketSegments).toEqual([
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
    ]);
  });

  it("keeps all eight citation labels and URLs aligned 1:1", () => {
    expect(tamSources).toEqual([
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
    ]);
    expect(tamSourceNote).toBe(
      "Notes: midpoints used where sources provide ranges; supplemental health 2024 total derived from the 2024 product table in source 6.",
    );
  });
});
