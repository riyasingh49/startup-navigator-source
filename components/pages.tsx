import type { Dispatch, FormEvent, SetStateAction } from "react";
import { AdminLoginCard, AdminPasswordPanel, LoginCard } from "@/components/auth-panels";
import { EmptyState, Field, InfoPanel, PageShell, StatCard } from "@/components/ui";
import type { Article, Resource, SearchRecord, SessionRole } from "@/lib/types";

type DraftArticle = {
  title: string;
  topic: string;
  summary: string;
  content: string;
};

type CommonSearchProps = {
  searchQuery: string;
  setSearchQuery: (value: string) => void;
  searching: boolean;
  searchError: string;
  runSearch: (event: FormEvent) => void;
};

export function HomePage({
  searchQuery,
  setSearchQuery,
  searching,
  searchError,
  runSearch,
}: CommonSearchProps) {
  return (
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
        {searchError && (
          <p className="mt-3 rounded border border-[#efc8bc] bg-[#fff4f1] p-3 text-sm font-bold text-[#a84632]">
            {searchError}
          </p>
        )}
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
              "Server route: app/page.tsx renders the app shell",
              "Client island: interactive navigation, auth, admin, and search",
              "Knowledge base: startup articles and resources in lib/",
              "RAG Search: query scoring, source retrieval, generated answer",
              "Dashboard: stats and persistent search history",
              "Components: page sections, UI primitives, auth panels",
            ].map((item) => (
              <div key={item} className="rounded border border-[#d8ded4] bg-white p-3 font-semibold">
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export function ExploreTopicsPage({
  articles,
  editArticle,
}: {
  articles: Article[];
  editArticle: (article: Article) => void;
}) {
  return (
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
  );
}

export function AiSearchPage({
  latestAnswer,
  searchQuery,
  setSearchQuery,
  searching,
  searchError,
  runSearch,
}: CommonSearchProps & { latestAnswer?: SearchRecord }) {
  return (
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
          {searchError && (
            <p className="mt-3 rounded border border-[#efc8bc] bg-[#fff4f1] p-3 text-sm font-bold text-[#a84632]">
              {searchError}
            </p>
          )}
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
  );
}

export function ResourcesPage({ resources }: { resources: Resource[] }) {
  return (
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
  );
}

export function DashboardPage({
  articles,
  resources,
  searchHistory,
  topicStats,
  topSearchSources,
  session,
  clearHistory,
}: {
  articles: Article[];
  resources: Resource[];
  searchHistory: SearchRecord[];
  topicStats: Array<[string, number]>;
  topSearchSources: Array<[string, number]>;
  session: SessionRole;
  clearHistory: () => void;
}) {
  return (
    <PageShell title="Dashboard" eyebrow="Simple statistics">
      <div className="grid gap-4 md:grid-cols-4">
        <StatCard label="Articles" value={articles.length.toString()} />
        <StatCard label="Resources" value={resources.length.toString()} />
        <StatCard label="Searches" value={searchHistory.length.toString()} />
        <StatCard label="Topics" value={topicStats.length.toString()} />
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
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-lg font-black">Search history</h2>
              <p className="mt-1 text-sm font-semibold text-[#65736b]">
                Saved on this device for demo review.
              </p>
            </div>
            {searchHistory.length > 0 && (
              <button
                onClick={clearHistory}
                className="rounded border border-[#a84632] px-3 py-2 text-xs font-black text-[#a84632]"
              >
                Clear History
              </button>
            )}
          </div>
          <div className="mt-4 space-y-3">
            {searchHistory.length ? (
              searchHistory.map((record) => (
                <div key={record.id} className="rounded bg-[#f7f8f5] p-3 text-sm font-semibold">
                  <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                    <span>{record.query}</span>
                    <span className="text-xs text-[#65736b]">{record.createdAt}</span>
                  </div>
                  <p className="mt-2 text-xs text-[#65736b]">Sources: {record.sources.join(", ")}</p>
                </div>
              ))
            ) : (
              <EmptyState text="Searches appear here after founders use AI Search." />
            )}
          </div>
        </div>
      </div>
      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <div className="rounded border border-[#d8ded4] bg-white p-5">
          <h2 className="text-lg font-black">Top retrieved sources</h2>
          <div className="mt-4 space-y-3">
            {topSearchSources.length ? (
              topSearchSources.map(([source, count]) => (
                <div key={source} className="flex items-center justify-between rounded bg-[#f7f8f5] p-3">
                  <span className="text-sm font-bold">{source}</span>
                  <span className="rounded bg-[#dfe8d8] px-2 py-1 text-xs font-black">{count}</span>
                </div>
              ))
            ) : (
              <EmptyState text="Retrieved source stats appear after AI Search is used." />
            )}
          </div>
        </div>
        <div className="rounded border border-[#d8ded4] bg-white p-5">
          <h2 className="text-lg font-black">Account state</h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <StatCard label="Current role" value={session === "guest" ? "Guest" : session} />
            <StatCard label="Last search" value={searchHistory[0]?.createdAt ?? "None"} />
          </div>
        </div>
      </div>
    </PageShell>
  );
}

export function AdminPage({
  session,
  adminPassword,
  adminError,
  setAdminPassword,
  loginAdmin,
  saveArticle,
  editingId,
  draft,
  setDraft,
  articles,
  editArticle,
  deleteArticle,
}: {
  session: SessionRole;
  adminPassword: string;
  adminError: string;
  setAdminPassword: (value: string) => void;
  loginAdmin: (event: FormEvent) => void;
  saveArticle: (event: FormEvent) => void;
  editingId: number | null;
  draft: DraftArticle;
  setDraft: Dispatch<SetStateAction<DraftArticle>>;
  articles: Article[];
  editArticle: (article: Article) => void;
  deleteArticle: (id: number) => void;
}) {
  return (
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
                        onClick={() => deleteArticle(article.id)}
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
  );
}

export function LoginPage({
  loginUser,
  adminPassword,
  adminError,
  setAdminPassword,
  loginAdmin,
  loginMessage,
}: {
  loginUser: () => void;
  adminPassword: string;
  adminError: string;
  setAdminPassword: (value: string) => void;
  loginAdmin: (event: FormEvent) => void;
  loginMessage: string;
}) {
  return (
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
  );
}

export function AboutPage() {
  return (
    <PageShell title="About" eyebrow="Architecture and AI approach">
      <div className="grid gap-5 lg:grid-cols-2">
        <InfoPanel title="Architecture">
          Next.js server route, client-side interactive shell, typed data modules, reusable page
          sections, local RAG retrieval, admin content management, and responsive UI components.
        </InfoPanel>
        <InfoPanel title="AI tools and prompts">
          Built with ChatGPT/Codex assistance. The assistant uses local knowledge retrieval
          instead of external APIs, so evaluators can test the AI search without an API key.
        </InfoPanel>
      </div>
    </PageShell>
  );
}

export function PromptsPanel({ prompts }: { prompts: string[] }) {
  return (
    <div className="mt-5 rounded border border-[#d8ded4] bg-white p-5">
      <h2 className="text-lg font-black">Prompts used</h2>
      <ul className="mt-3 space-y-2 text-sm leading-6 text-[#4d5d55]">
        {prompts.map((prompt) => (
          <li key={prompt} className="rounded bg-[#f7f8f5] p-3 font-semibold">
            {prompt}
          </li>
        ))}
      </ul>
    </div>
  );
}

export function ContactPage() {
  return (
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
          <button type="button" className="mt-4 rounded bg-[#153b37] px-4 py-3 text-sm font-black text-white">
            Send Demo Message
          </button>
        </form>
      </div>
    </PageShell>
  );
}
