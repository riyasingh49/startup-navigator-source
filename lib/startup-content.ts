import type { Article, Resource } from "./types";

export const seedArticles: Article[] = [
  {
    id: 1,
    title: "Registering a startup in India",
    topic: "Company Registration",
    stage: "Foundation",
    readTime: "6 min",
    summary:
      "Choose the right entity, reserve a name, collect founder documents, and complete incorporation with MCA filings.",
    content:
      "Most scalable startups choose a Private Limited Company because it supports equity, ESOPs, investor due diligence, and clearer founder ownership. The registration checklist includes DSCs for directors, DIN, name approval, MOA, AOA, PAN, TAN, registered office proof, and bank account setup. Founders should also prepare a shareholders agreement early so vesting, roles, IP ownership, and exit terms are clear.",
  },
  {
    id: 2,
    title: "Funding options from bootstrapping to venture capital",
    topic: "Funding",
    stage: "Capital",
    readTime: "7 min",
    summary:
      "Compare grants, revenue financing, angels, accelerators, seed rounds, and venture capital before choosing a path.",
    content:
      "Early founders should match funding to business model. Bootstrapping protects control, grants reduce dilution, angel capital helps with early validation, and venture capital is best when the market is large and growth can compound quickly. A fundraising data room should include pitch deck, cap table, incorporation documents, financial model, customer proof, IP details, and compliance records.",
  },
  {
    id: 3,
    title: "Legal compliance calendar for new founders",
    topic: "Legal Compliance",
    stage: "Operations",
    readTime: "5 min",
    summary:
      "Stay ready for board meetings, statutory registers, tax filings, labour obligations, contracts, privacy, and annual returns.",
    content:
      "A startup compliance system should track ROC filings, board minutes, tax returns, GST filings where applicable, payroll records, consultant agreements, employment contracts, privacy policy, terms of service, and IP assignments. The safest approach is to keep a monthly compliance tracker and store signed documents in a single organized data room.",
  },
  {
    id: 4,
    title: "Hiring the first team",
    topic: "Hiring",
    stage: "Team",
    readTime: "4 min",
    summary:
      "Define critical roles, write scorecards, use trial projects carefully, and create onboarding systems before scaling.",
    content:
      "The first ten hires shape company culture. Hire for ownership, learning speed, and role clarity. Use scorecards, structured interviews, reference checks, and clear compensation bands. If offering ESOPs, explain vesting schedules, cliffs, exercise windows, and dilution in plain language.",
  },
  {
    id: 5,
    title: "Branding and go-to-market foundations",
    topic: "Branding & Marketing",
    stage: "Growth",
    readTime: "6 min",
    summary:
      "Create positioning, audience segments, messaging pillars, launch channels, and a measurable acquisition funnel.",
    content:
      "A strong brand starts with a narrow customer, a painful problem, and a credible promise. Marketing should connect positioning to measurable channels such as search, founder-led content, partnerships, email, paid experiments, product-led loops, and community. Track CAC, activation, retention, payback period, and referral rate.",
  },
  {
    id: 6,
    title: "Taxation basics for startups",
    topic: "Taxation",
    stage: "Finance",
    readTime: "5 min",
    summary:
      "Understand income tax, GST, TDS, payroll taxes, invoicing, bookkeeping, and investor-related tax records.",
    content:
      "Founders should separate personal and business accounts immediately. Maintain invoices, expense proofs, payroll data, TDS records, GST filings if registered, and reconciled books. Investor-backed companies need clean accounting because due diligence reviews revenue recognition, related-party transactions, cash burn, liabilities, and tax compliance.",
  },
  {
    id: 7,
    title: "Practical AI tools for startup teams",
    topic: "AI Tools",
    stage: "Productivity",
    readTime: "5 min",
    summary:
      "Use AI for research, support, drafting, coding assistance, design exploration, analysis, and sales workflows.",
    content:
      "AI tools can improve speed but need governance. Start with high-volume workflows: customer support drafts, market research summaries, sales email personalization, product documentation, code review, analytics explanations, and meeting notes. Keep humans in review loops for legal, finance, hiring, and customer commitments.",
  },
  {
    id: 8,
    title: "Business growth metrics investors expect",
    topic: "Business Growth",
    stage: "Scale",
    readTime: "6 min",
    summary:
      "Track activation, retention, revenue quality, burn, runway, sales efficiency, and expansion signals.",
    content:
      "Investors look for a clear market, fast learning, strong retention, and efficient growth. Key metrics include MRR, ARR, gross margin, churn, net revenue retention, CAC, LTV, burn multiple, runway, pipeline conversion, and cohort retention. Dashboards should show trend quality, not just vanity totals.",
  },
];

export const seedResources: Resource[] = [
  {
    id: 1,
    title: "Founder data room checklist",
    type: "Template",
    detail: "Documents investors and advisors usually ask for during due diligence.",
  },
  {
    id: 2,
    title: "90-day launch plan",
    type: "Workflow",
    detail: "A milestone plan covering research, MVP, landing page, beta users, and launch metrics.",
  },
  {
    id: 3,
    title: "Compliance tracker",
    type: "Checklist",
    detail: "Monthly legal, tax, finance, and HR reminders for early-stage teams.",
  },
  {
    id: 4,
    title: "Investor outreach CRM",
    type: "Spreadsheet",
    detail: "Track investor fit, warm intros, status, follow-ups, and feedback themes.",
  },
];

export const promptsUsed = [
  "Design a professional startup advisory app for founders with pages, dashboard, admin, and AI search.",
  "Create a RAG-style assistant that retrieves relevant startup knowledge chunks and returns practical founder guidance.",
  "Improve mobile UX, empty states, loading states, admin editing, and submission README content.",
];
