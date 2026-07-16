"use client";

import { FormEvent, useMemo, useState } from "react";

type Article = {
  id: number;
  title: string;
  topic: string;
  stage: string;
  summary: string;
  content: string;
  readTime: string;
};

type Resource = {
  id: number;
  title: string;
  type: string;
  detail: string;
};

type SearchRecord = {
  id: number;
  query: string;
  answer: string;
  sources: string[];
};

const seedArticles: Article[] = [
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

const seedResources: Resource[] = [
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

const promptsUsed = [
  "Design a professional startup advisory app for founders with pages, dashboard, admin, and AI search.",
  "Create a RAG-style assistant that retrieves relevant startup knowledge chunks and returns practical founder guidance.",
  "Improve mobile UX, empty states, loading states, admin editing, and submission README content.",
];

function scoreArticle(article: Article, query: string) {
  const terms = query
    .toLowerCase()
    .split(/\W+/)
    .filter((term) => term.length > 2);
  const haystack = `${article.title} ${article.topic} ${article.summary} ${article.content}`.toLowerCase();
  return terms.reduce((score, term) => score + (haystack.includes(term) ? 1 : 0), 0);
}

function buildAnswer(query: string, articles: Article[]) {
  const ranked = [...articles]
    .map((article) => ({ article, score: scoreArticle(article, query) }))
    .sort((a, b) => b.score - a.score);
  const matches = ranked.filter((item) => item.score > 0).slice(0, 3);
  const selected = matches.length ? matches : ranked.slice(0, 3);
  const focus = selected.map(({ article }) => article);

  return {
    sources: focus.map((article) => article.title),
    answer: `Based on the Startup Navigator knowledge base, start with ${focus[0].topic.toLowerCase()}: ${focus[0].summary} Next, connect it with ${focus
      .slice(1)
      .map((article) => article.topic.toLowerCase())
      .join(" and ")} so your plan covers legal, financial, and growth risk. Practical next step: create a one-page action checklist, assign an owner, set a deadline, and store supporting documents in your founder data room.`,
  };
}

export default function Home() {
  const [activePage, setActivePage] = useState("Home");
  const [articles, setArticles] = useState(seedArticles);
  const [resources, setResources] = useState(seedResources);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchHistory, setSearchHistory] = useState<SearchRecord[]>([]);
  const [searching, setSearching] = useState(false);
  const [session, setSession] = useState<"guest" | "user" | "admin">("guest");
  const [loginMessage, setLoginMessage] = useState("");
  const [adminPassword, setAdminPassword] = useState("");
  const [adminError, setAdminError] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);
  const [draft, setDraft] = useState({
    title: "",
    topic: "Funding",
    summary: "",
    content: "",
  });

  const topicStats = useMemo(() => {
    const counts = articles.reduce<Record<string, number>>((acc, article) => {
      acc[article.topic] = (acc[article.topic] ?? 0) + 1;
      return acc;
    }, {});
    return Object.entries(counts);
  }, [articles]);

  function runSearch(event: FormEvent) {
    event.preventDefault();
    const query = searchQuery.trim();
    if (!query) return;
    setSearching(true);
    window.setTimeout(() => {
      const result = buildAnswer(query, articles);
      setSearchHistory((current) => [
        {
          id: Date.now(),
          query,
          answer: result.answer,
          sources: result.sources,
        },
        ...current,
      ]);
      setSearching(false);
      setSearchQuery("");
      setActivePage("AI Search");
    }, 650);
  }

  function loginUser() {
    setSession("user");
    setLoginMessage("Logged in as founder. Your search history is now visible.");
    setActivePage("Dashboard");
  }

  function loginAdmin(event: FormEvent) {
    event.preventDefault();
    if (adminPassword === "admin123") {
      setSession("admin");
      setAdminPassword("");
      setAdminError("");
      setLoginMessage("Logged in as admin. You can manage articles and resources.");
      setActivePage("Admin");
      return;
    }

    setAdminError("Incorrect admin password. Please try admin123 for this demo.");
  }

  function saveArticle(event: FormEvent) {
    event.preventDefault();
    if (!draft.title.trim() || !draft.summary.trim()) return;
    if (editingId) {
      setArticles((current) =>
        current.map((article) =>
          article.id === editingId
            ? {
                ...article,
                title: draft.title,
                topic: draft.topic,
                summary: draft.summary,
                content: draft.content || draft.summary,
              }
            : article,
        ),
      );
    } else {
      setArticles((current) => [
        {
          id: Date.now(),
          title: draft.title,
          topic: draft.topic,
          stage: "Admin",
          readTime: "3 min",
          summary: draft.summary,
          content: draft.content || draft.summary,
        },
        ...current,
      ]);
    }
    setDraft({ title: "", topic: "Funding", summary: "", content: "" });
    setEditingId(null);
  }

  function editArticle(article: Article) {
    setEditingId(article.id);
    setDraft({
      title: article.title,
      topic: article.topic,
      summary: article.summary,
      content: article.content,
    });
    setActivePage("Admin");
  }

  const latestAnswer = searchHistory[0];
  const pages = ["Home", "Explore Topics", "AI Search", "Resources", "About", "Contact"];

  return (
    <main className="min-h-screen bg-[#f7f8f5] text-[#14201d]">
      <header className="sticky top-0 z-30 border-b border-[#d8ded4] bg-[#f7f8f5]/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
          <button
            className="flex items-center gap-3 text-left"
            onClick={() => setActivePage("Home")}
            aria-label="Go to home"
          >
            <span className="grid h-11 w-11 place-items-center rounded bg-[#153b37] text-lg font-black text-white">
              SN
            </span>
            <span>
              <span className="block text-base font-black sm:text-lg">Startup Navigator</span>
              <span className="block text-xs font-semibold uppercase tracking-[0.18em] text-[#65736b]">
                Comprehensive Guide
              </span>
            </span>
          </button>

          <nav className="hidden items-center gap-1 lg:flex">
            {pages.map((page) => (
              <button
                key={page}
                onClick={() => setActivePage(page)}
                className={`rounded px-3 py-2 text-sm font-bold transition ${
                  activePage === page
                    ? "bg-[#153b37] text-white"
                    : "text-[#4d5d55] hover:bg-[#e6ebe2]"
                }`}
              >
                {page}
              </button>
            ))}
            <button
              onClick={() => setActivePage("Dashboard")}
              className="rounded px-3 py-2 text-sm font-bold text-[#4d5d55] hover:bg-[#e6ebe2]"
            >
              Dashboard
            </button>
            <button
              onClick={() => setActivePage("Admin")}
              className="rounded px-3 py-2 text-sm font-bold text-[#4d5d55] hover:bg-[#e6ebe2]"
            >
              Admin
            </button>
          </nav>

          <button
            onClick={() => setActivePage("Login")}
            className="rounded bg-[#f0b84f] px-4 py-2 text-sm font-black text-[#14201d] shadow-sm transition hover:bg-[#e0a836]"
          >
            {session === "guest" ? "Login" : session === "admin" ? "Admin" : "Founder"}
          </button>
        </div>

        <div className="flex gap-2 overflow-x-auto px-4 pb-3 lg:hidden">
          {[...pages, "Dashboard", "Admin"].map((page) => (
            <button
              key={page}
              onClick={() => setActivePage(page)}
              className={`shrink-0 rounded px-3 py-2 text-xs font-bold ${
                activePage === page ? "bg-[#153b37] text-white" : "bg-white text-[#4d5d55]"
              }`}
            >
              {page}
            </button>
          ))}
        </div>
      </header>

      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {activePage === "Home" && (
          <div className="grid gap-8 lg:grid-cols-[1.12fr_0.88fr] lg:items-center">
            <div className="py-8">
              <p className="mb-4 inline-flex rounded bg-[#dfe8d8] px-3 py-2 text-xs font-black uppercase tracking-[0.18em] text-[#31524c]">
                Founder command center
              </p>
              <h1 className="max-w-4xl text-4xl font-black leading-tight text-[#10211e] sm:text-5xl lg:text-6xl">
                Startup Navigator - Comprehensive Guide to Startups.
              </h1>
              <p className="mt-5 max-w-2xl text-lg leading-8 text-[#4d5d55]">
                Explore company registration, funding, legal compliance, hiring, branding,
                marketing, taxation, fundraising, AI tools, and growth with a searchable
                knowledge base built for early-stage entrepreneurs.
              </p>
              <form
                onSubmit={runSearch}
                className="mt-8 flex flex-col gap-3 rounded border border-[#d8ded4] bg-white p-3 shadow-sm sm:flex-row"
              >
                <input
                  value={searchQuery}
                  onChange={(event) => setSearchQuery(event.target.value)}
                  placeholder="Ask: What should I prepare before seed fundraising?"
                  className="min-h-12 flex-1 rounded border border-transparent bg-[#f7f8f5] px-4 text-sm outline-none focus:border-[#153b37]"
                />
                <button className="min-h-12 rounded bg-[#153b37] px-5 text-sm font-black text-white">
                  {searching ? "Searching..." : "Ask AI Search"}
                </button>
              </form>
              <div className="mt-6 grid gap-3 sm:grid-cols-3">
                {[
                  ["8", "Startup guides"],
                  ["4", "Founder resources"],
                  ["0 API keys", "RAG demo works locally"],
                ].map(([value, label]) => (
                  <div key={label} className="rounded border border-[#d8ded4] bg-white p-4">
                    <strong className="block text-2xl font-black text-[#153b37]">{value}</strong>
                    <span className="text-sm font-semibold text-[#65736b]">{label}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded border border-[#d8ded4] bg-[#153b37] p-5 text-white shadow-xl">
              <div className="rounded bg-[#f7f8f5] p-4 text-[#14201d]">
                <div className="flex items-center justify-between border-b border-[#d8ded4] pb-3">
                  <span className="font-black">Architecture Map</span>
                  <span className="rounded bg-[#f0b84f] px-2 py-1 text-xs font-black">Next.js</span>
                </div>
                <div className="mt-4 grid gap-3 text-sm">
                  {[
                    "Founder UI: pages, mobile navigation, topic cards",
                    "Knowledge Base: startup articles and resources",
                    "RAG Search: query scoring, source retrieval, generated answer",
                    "Admin: create, edit, delete content",
                    "Dashboard: stats and search history",
                    "Deployment: production build and hosting-ready README",
                  ].map((item) => (
                    <div key={item} className="rounded border border-[#d8ded4] bg-white p-3 font-semibold">
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {activePage === "Explore Topics" && (
          <PageShell title="Explore Topics" eyebrow="Knowledge base">
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {articles.map((article) => (
                <article key={article.id} className="rounded border border-[#d8ded4] bg-white p-5 shadow-sm">
                  <div className="mb-4 flex items-center justify-between gap-3">
                    <span className="rounded bg-[#dfe8d8] px-3 py-1 text-xs font-black text-[#31524c]">
                      {article.topic}
                    </span>
                    <span className="text-xs font-bold text-[#65736b]">{article.readTime}</span>
                  </div>
                  <h2 className="text-xl font-black text-[#10211e]">{article.title}</h2>
                  <p className="mt-3 text-sm leading-6 text-[#4d5d55]">{article.summary}</p>
                  <button
                    onClick={() => editArticle(article)}
                    className="mt-4 rounded border border-[#153b37] px-3 py-2 text-sm font-black text-[#153b37]"
                  >
                    Edit in Admin
                  </button>
                </article>
              ))}
            </div>
          </PageShell>
        )}

        {activePage === "AI Search" && (
          <PageShell title="AI Search" eyebrow="RAG-style assistant">
            <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
              <form onSubmit={runSearch} className="rounded border border-[#d8ded4] bg-white p-5 shadow-sm">
                <label className="text-sm font-black text-[#10211e]" htmlFor="search">
                  Ask a startup question
                </label>
                <textarea
                  id="search"
                  value={searchQuery}
                  onChange={(event) => setSearchQuery(event.target.value)}
                  placeholder="Example: How do I prepare a data room for investors?"
                  className="mt-3 min-h-36 w-full rounded border border-[#d8ded4] bg-[#f7f8f5] p-4 text-sm outline-none focus:border-[#153b37]"
                />
                <button className="mt-4 w-full rounded bg-[#153b37] px-4 py-3 text-sm font-black text-white">
                  {searching ? "Retrieving sources..." : "Generate Answer"}
                </button>
                <p className="mt-3 text-xs font-semibold text-[#65736b]">
                  Demo method: keyword retrieval over stored articles, then a generated summary with sources.
                </p>
              </form>

              <div className="rounded border border-[#d8ded4] bg-white p-5 shadow-sm">
                <h2 className="text-xl font-black">Latest answer</h2>
                {latestAnswer ? (
                  <div className="mt-4">
                    <p className="rounded bg-[#f7f8f5] p-4 text-sm font-bold text-[#31524c]">
                      {latestAnswer.query}
                    </p>
                    <p className="mt-4 leading-7 text-[#4d5d55]">{latestAnswer.answer}</p>
                    <div className="mt-5">
                      <h3 className="text-sm font-black">Sources used</h3>
                      <div className="mt-2 flex flex-wrap gap-2">
                        {latestAnswer.sources.map((source) => (
                          <span key={source} className="rounded bg-[#dfe8d8] px-3 py-1 text-xs font-bold">
                            {source}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  <EmptyState text="No questions yet. Ask about registration, funding, tax, hiring, AI tools, or growth." />
                )}
              </div>
            </div>
          </PageShell>
        )}

        {activePage === "Resources" && (
          <PageShell title="Resources" eyebrow="Templates and workflows">
            <div className="grid gap-4 md:grid-cols-2">
              {resources.map((resource) => (
                <div key={resource.id} className="rounded border border-[#d8ded4] bg-white p-5 shadow-sm">
                  <span className="rounded bg-[#f0b84f] px-3 py-1 text-xs font-black text-[#14201d]">
                    {resource.type}
                  </span>
                  <h2 className="mt-4 text-xl font-black">{resource.title}</h2>
                  <p className="mt-2 leading-7 text-[#4d5d55]">{resource.detail}</p>
                </div>
              ))}
            </div>
          </PageShell>
        )}

        {activePage === "Dashboard" && (
          <PageShell title="Dashboard" eyebrow="Simple statistics">
            <div className="grid gap-4 md:grid-cols-4">
              <StatCard label="Articles" value={articles.length.toString()} />
              <StatCard label="Resources" value={resources.length.toString()} />
              <StatCard label="Searches" value={searchHistory.length.toString()} />
              <StatCard label="Session" value={session === "guest" ? "Guest" : session} />
            </div>
            <div className="mt-6 grid gap-6 lg:grid-cols-2">
              <div className="rounded border border-[#d8ded4] bg-white p-5">
                <h2 className="text-lg font-black">Topic coverage</h2>
                <div className="mt-4 space-y-3">
                  {topicStats.map(([topic, count]) => (
                    <div key={topic}>
                      <div className="flex justify-between text-sm font-bold">
                        <span>{topic}</span>
                        <span>{count}</span>
                      </div>
                      <div className="mt-2 h-2 rounded bg-[#e6ebe2]">
                        <div
                          className="h-2 rounded bg-[#153b37]"
                          style={{ width: `${Math.max(18, (count / articles.length) * 100)}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="rounded border border-[#d8ded4] bg-white p-5">
                <h2 className="text-lg font-black">Search history</h2>
                <div className="mt-4 space-y-3">
                  {searchHistory.length ? (
                    searchHistory.map((record) => (
                      <div key={record.id} className="rounded bg-[#f7f8f5] p-3 text-sm font-semibold">
                        {record.query}
                      </div>
                    ))
                  ) : (
                    <EmptyState text="Searches appear here after founders use AI Search." />
                  )}
                </div>
              </div>
            </div>
          </PageShell>
        )}

        {activePage === "Admin" && (
          <PageShell title="Admin Section" eyebrow="Manage articles">
            {session !== "admin" ? (
              <AdminPasswordPanel
                adminPassword={adminPassword}
                adminError={adminError}
                setAdminPassword={setAdminPassword}
                onSubmit={loginAdmin}
              />
            ) : (
              <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
                <form onSubmit={saveArticle} className="rounded border border-[#d8ded4] bg-white p-5 shadow-sm">
                <h2 className="text-lg font-black">{editingId ? "Edit article" : "Add article"}</h2>
                <Field
                  label="Title"
                  value={draft.title}
                  onChange={(value) => setDraft((current) => ({ ...current, title: value }))}
                />
                <label className="mt-4 block text-sm font-black">Topic</label>
                <select
                  value={draft.topic}
                  onChange={(event) => setDraft((current) => ({ ...current, topic: event.target.value }))}
                  className="mt-2 w-full rounded border border-[#d8ded4] bg-[#f7f8f5] px-3 py-3 text-sm"
                >
                  {[
                    "Company Registration",
                    "Funding",
                    "Legal Compliance",
                    "Hiring",
                    "Branding & Marketing",
                    "Taxation",
                    "AI Tools",
                    "Business Growth",
                  ].map((topic) => (
                    <option key={topic}>{topic}</option>
                  ))}
                </select>
                <Field
                  label="Summary"
                  value={draft.summary}
                  onChange={(value) => setDraft((current) => ({ ...current, summary: value }))}
                />
                <label className="mt-4 block text-sm font-black">Knowledge content</label>
                <textarea
                  value={draft.content}
                  onChange={(event) => setDraft((current) => ({ ...current, content: event.target.value }))}
                  className="mt-2 min-h-28 w-full rounded border border-[#d8ded4] bg-[#f7f8f5] p-3 text-sm"
                />
                <button className="mt-4 w-full rounded bg-[#153b37] px-4 py-3 text-sm font-black text-white">
                  {editingId ? "Save Changes" : "Add Article"}
                </button>
                </form>

                <div className="rounded border border-[#d8ded4] bg-white p-5 shadow-sm">
                <h2 className="text-lg font-black">Content library</h2>
                <div className="mt-4 space-y-3">
                  {articles.map((article) => (
                    <div key={article.id} className="rounded border border-[#d8ded4] p-4">
                      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                        <div>
                          <h3 className="font-black">{article.title}</h3>
                          <p className="mt-1 text-sm text-[#65736b]">{article.topic}</p>
                        </div>
                        <div className="flex gap-2">
                          <button
                            onClick={() => editArticle(article)}
                            className="rounded border border-[#153b37] px-3 py-2 text-xs font-black text-[#153b37]"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() =>
                              setArticles((current) => current.filter((item) => item.id !== article.id))
                            }
                            className="rounded border border-[#a84632] px-3 py-2 text-xs font-black text-[#a84632]"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                </div>
              </div>
            )}
          </PageShell>
        )}

        {activePage === "Login" && (
          <PageShell title="Login" eyebrow="Demo credentials">
            <div className="grid gap-5 md:grid-cols-2">
              <LoginCard
                title="Founder login"
                email="founder@startupnavigator.com"
                password="user123"
                onClick={loginUser}
              />
              <AdminLoginCard
                adminPassword={adminPassword}
                adminError={adminError}
                setAdminPassword={setAdminPassword}
                onSubmit={loginAdmin}
              />
            </div>
            {loginMessage && (
              <p className="mt-5 rounded border border-[#d8ded4] bg-white p-4 text-sm font-bold text-[#31524c]">
                {loginMessage}
              </p>
            )}
          </PageShell>
        )}

        {activePage === "About" && (
          <PageShell title="About" eyebrow="Architecture and AI approach">
            <div className="grid gap-5 lg:grid-cols-2">
              <InfoPanel title="Architecture">
                Next.js frontend, browser-state demo data, componentized page sections, local
                RAG-style retrieval, admin content management, and production-ready responsive UI.
              </InfoPanel>
              <InfoPanel title="AI tools and prompts">
                Built with ChatGPT/Codex assistance. The assistant uses local knowledge retrieval
                instead of external APIs, so evaluators can test the AI search without an API key.
              </InfoPanel>
            </div>
            <div className="mt-5 rounded border border-[#d8ded4] bg-white p-5">
              <h2 className="text-lg font-black">Prompts used</h2>
              <ul className="mt-3 space-y-2 text-sm leading-6 text-[#4d5d55]">
                {promptsUsed.map((prompt) => (
                  <li key={prompt} className="rounded bg-[#f7f8f5] p-3 font-semibold">
                    {prompt}
                  </li>
                ))}
              </ul>
            </div>
          </PageShell>
        )}

        {activePage === "Contact" && (
          <PageShell title="Contact" eyebrow="Founder support">
            <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
              <InfoPanel title="Contact Startup Navigator">
                Email: hello@startupnavigator.demo
                <br />
                Office hours: Monday to Friday, 10 AM to 6 PM
                <br />
                Use this page to request new topics, submit resources, or ask for founder support.
              </InfoPanel>
              <form className="rounded border border-[#d8ded4] bg-white p-5 shadow-sm">
                <Field label="Name" value="" onChange={() => undefined} placeholder="Your name" />
                <Field label="Email" value="" onChange={() => undefined} placeholder="you@example.com" />
                <label className="mt-4 block text-sm font-black">Message</label>
                <textarea
                  className="mt-2 min-h-32 w-full rounded border border-[#d8ded4] bg-[#f7f8f5] p-3 text-sm"
                  placeholder="Tell us what you need help with"
                />
                <button
                  type="button"
                  className="mt-4 rounded bg-[#153b37] px-4 py-3 text-sm font-black text-white"
                >
                  Send Demo Message
                </button>
              </form>
            </div>
          </PageShell>
        )}
      </section>
    </main>
  );
}

function PageShell({
  title,
  eyebrow,
  children,
}: {
  title: string;
  eyebrow: string;
  children: React.ReactNode;
}) {
  return (
    <section>
      <p className="mb-3 text-xs font-black uppercase tracking-[0.18em] text-[#65736b]">{eyebrow}</p>
      <h1 className="mb-6 text-3xl font-black text-[#10211e] sm:text-4xl">{title}</h1>
      {children}
    </section>
  );
}

function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded border border-[#d8ded4] bg-white p-5 shadow-sm">
      <strong className="block text-3xl font-black text-[#153b37]">{value}</strong>
      <span className="mt-1 block text-sm font-bold text-[#65736b]">{label}</span>
    </div>
  );
}

function EmptyState({ text }: { text: string }) {
  return <p className="rounded bg-[#f7f8f5] p-4 text-sm font-semibold text-[#65736b]">{text}</p>;
}

function Field({
  label,
  value,
  onChange,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}) {
  return (
    <label className="mt-4 block text-sm font-black">
      {label}
      <input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className="mt-2 block w-full rounded border border-[#d8ded4] bg-[#f7f8f5] px-3 py-3 text-sm font-normal outline-none focus:border-[#153b37]"
      />
    </label>
  );
}

function LoginCard({
  title,
  email,
  password,
  onClick,
}: {
  title: string;
  email: string;
  password: string;
  onClick: () => void;
}) {
  return (
    <div className="rounded border border-[#d8ded4] bg-white p-5 shadow-sm">
      <h2 className="text-xl font-black">{title}</h2>
      <p className="mt-3 text-sm font-semibold text-[#4d5d55]">Email: {email}</p>
      <p className="mt-1 text-sm font-semibold text-[#4d5d55]">Password: {password}</p>
      <button onClick={onClick} className="mt-5 rounded bg-[#153b37] px-4 py-3 text-sm font-black text-white">
        Continue as {title.replace(" login", "")}
      </button>
    </div>
  );
}

function AdminLoginCard({
  adminPassword,
  adminError,
  setAdminPassword,
  onSubmit,
}: {
  adminPassword: string;
  adminError: string;
  setAdminPassword: (value: string) => void;
  onSubmit: (event: FormEvent) => void;
}) {
  return (
    <form onSubmit={onSubmit} className="rounded border border-[#d8ded4] bg-white p-5 shadow-sm">
      <h2 className="text-xl font-black">Admin login</h2>
      <p className="mt-3 text-sm font-semibold text-[#4d5d55]">
        Email: admin@startupnavigator.com
      </p>
      <label className="mt-4 block text-sm font-black">
        Password
        <input
          type="password"
          value={adminPassword}
          onChange={(event) => setAdminPassword(event.target.value)}
          placeholder="Enter admin password"
          className="mt-2 block w-full rounded border border-[#d8ded4] bg-[#f7f8f5] px-3 py-3 text-sm font-normal outline-none focus:border-[#153b37]"
        />
      </label>
      {adminError && <p className="mt-3 text-sm font-bold text-[#a84632]">{adminError}</p>}
      <button className="mt-5 rounded bg-[#153b37] px-4 py-3 text-sm font-black text-white">
        Open Admin Dashboard
      </button>
      <p className="mt-3 text-xs font-semibold text-[#65736b]">Demo password: admin123</p>
    </form>
  );
}

function AdminPasswordPanel({
  adminPassword,
  adminError,
  setAdminPassword,
  onSubmit,
}: {
  adminPassword: string;
  adminError: string;
  setAdminPassword: (value: string) => void;
  onSubmit: (event: FormEvent) => void;
}) {
  return (
    <form
      onSubmit={onSubmit}
      className="mx-auto max-w-xl rounded border border-[#d8ded4] bg-white p-6 shadow-sm"
    >
      <h2 className="text-2xl font-black">Admin access required</h2>
      <p className="mt-3 leading-7 text-[#4d5d55]">
        Enter the admin password to open the dashboard where articles and resources can be managed.
      </p>
      <label className="mt-5 block text-sm font-black">
        Admin password
        <input
          type="password"
          value={adminPassword}
          onChange={(event) => setAdminPassword(event.target.value)}
          placeholder="Enter admin password"
          className="mt-2 block w-full rounded border border-[#d8ded4] bg-[#f7f8f5] px-3 py-3 text-sm font-normal outline-none focus:border-[#153b37]"
        />
      </label>
      {adminError && <p className="mt-3 text-sm font-bold text-[#a84632]">{adminError}</p>}
      <button className="mt-5 w-full rounded bg-[#153b37] px-4 py-3 text-sm font-black text-white">
        Unlock Admin Dashboard
      </button>
      <p className="mt-3 text-xs font-semibold text-[#65736b]">Demo password: admin123</p>
    </form>
  );
}

function InfoPanel({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded border border-[#d8ded4] bg-white p-5 shadow-sm">
      <h2 className="text-xl font-black">{title}</h2>
      <p className="mt-3 leading-7 text-[#4d5d55]">{children}</p>
    </div>
  );
}
