"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import {
  AboutPage,
  AdminPage,
  AiSearchPage,
  ContactPage,
  DashboardPage,
  ExploreTopicsPage,
  HomePage,
  LoginPage,
  PromptsPanel,
  ResourcesPage,
} from "@/components/pages";
import { buildAnswer } from "@/lib/rag";
import { promptsUsed, seedArticles, seedResources } from "@/lib/startup-content";
import type { Article, SearchRecord, SessionRole } from "@/lib/types";

const SEARCH_HISTORY_KEY = "startup-navigator-search-history";
const pages = ["Home", "Explore Topics", "AI Search", "Resources", "About", "Contact"];

type DraftArticle = {
  title: string;
  topic: string;
  summary: string;
  content: string;
};

export function StartupNavigatorApp() {
  const [activePage, setActivePage] = useState("Home");
  const [articles, setArticles] = useState(seedArticles);
  const [resources] = useState(seedResources);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchHistory, setSearchHistory] = useState<SearchRecord[]>([]);
  const [searching, setSearching] = useState(false);
  const [searchError, setSearchError] = useState("");
  const [session, setSession] = useState<SessionRole>("guest");
  const [loginMessage, setLoginMessage] = useState("");
  const [adminPassword, setAdminPassword] = useState("");
  const [adminError, setAdminError] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);
  const [draft, setDraft] = useState<DraftArticle>({
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

  const topSearchSources = useMemo(() => {
    const counts = searchHistory.reduce<Record<string, number>>((acc, record) => {
      record.sources.forEach((source) => {
        acc[source] = (acc[source] ?? 0) + 1;
      });
      return acc;
    }, {});

    return Object.entries(counts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 4);
  }, [searchHistory]);

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(SEARCH_HISTORY_KEY);
      if (stored) {
        setSearchHistory(JSON.parse(stored) as SearchRecord[]);
      }
    } catch {
      setSearchError("Search history could not be loaded on this device.");
    }
  }, []);

  useEffect(() => {
    try {
      window.localStorage.setItem(SEARCH_HISTORY_KEY, JSON.stringify(searchHistory));
    } catch {
      setSearchError("Search history could not be saved on this device.");
    }
  }, [searchHistory]);

  function runSearch(event: FormEvent) {
    event.preventDefault();
    const query = searchQuery.trim();
    if (!query) {
      setSearchError("Please enter a question before searching.");
      return;
    }

    setSearchError("");
    setSearching(true);
    window.setTimeout(() => {
      const result = buildAnswer(query, articles);
      setSearchHistory((current) => [
        {
          id: Date.now(),
          query,
          answer: result.answer,
          sources: result.sources,
          createdAt: new Date().toLocaleString(),
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

  function deleteArticle(id: number) {
    setArticles((current) => current.filter((item) => item.id !== id));
  }

  return (
    <main className="min-h-screen bg-[#f7f8f5] text-[#14201d]">
      <AppHeader activePage={activePage} session={session} setActivePage={setActivePage} />

      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {activePage === "Home" && (
          <HomePage
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            searching={searching}
            searchError={searchError}
            runSearch={runSearch}
          />
        )}
        {activePage === "Explore Topics" && <ExploreTopicsPage articles={articles} editArticle={editArticle} />}
        {activePage === "AI Search" && (
          <AiSearchPage
            latestAnswer={searchHistory[0]}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            searching={searching}
            searchError={searchError}
            runSearch={runSearch}
          />
        )}
        {activePage === "Resources" && <ResourcesPage resources={resources} />}
        {activePage === "Dashboard" && (
          <DashboardPage
            articles={articles}
            resources={resources}
            searchHistory={searchHistory}
            topicStats={topicStats}
            topSearchSources={topSearchSources}
            session={session}
            clearHistory={() => setSearchHistory([])}
          />
        )}
        {activePage === "Admin" && (
          <AdminPage
            session={session}
            adminPassword={adminPassword}
            adminError={adminError}
            setAdminPassword={setAdminPassword}
            loginAdmin={loginAdmin}
            saveArticle={saveArticle}
            editingId={editingId}
            draft={draft}
            setDraft={setDraft}
            articles={articles}
            editArticle={editArticle}
            deleteArticle={deleteArticle}
          />
        )}
        {activePage === "Login" && (
          <LoginPage
            loginUser={loginUser}
            adminPassword={adminPassword}
            adminError={adminError}
            setAdminPassword={setAdminPassword}
            loginAdmin={loginAdmin}
            loginMessage={loginMessage}
          />
        )}
        {activePage === "About" && (
          <>
            <AboutPage />
            <PromptsPanel prompts={promptsUsed} />
          </>
        )}
        {activePage === "Contact" && <ContactPage />}
      </section>
    </main>
  );
}

function AppHeader({
  activePage,
  session,
  setActivePage,
}: {
  activePage: string;
  session: SessionRole;
  setActivePage: (page: string) => void;
}) {
  return (
    <header className="sticky top-0 z-30 border-b border-[#d8ded4] bg-[#f7f8f5]/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <button className="flex items-center gap-3 text-left" onClick={() => setActivePage("Home")} aria-label="Go to home">
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
          {[...pages, "Dashboard", "Admin"].map((page) => (
            <NavButton key={page} page={page} activePage={activePage} setActivePage={setActivePage} />
          ))}
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
          <NavButton key={page} page={page} activePage={activePage} setActivePage={setActivePage} compact />
        ))}
      </div>
    </header>
  );
}

function NavButton({
  page,
  activePage,
  setActivePage,
  compact = false,
}: {
  page: string;
  activePage: string;
  setActivePage: (page: string) => void;
  compact?: boolean;
}) {
  return (
    <button
      onClick={() => setActivePage(page)}
      className={
        activePage === page
          ? `rounded bg-[#153b37] text-white ${compact ? "shrink-0 px-3 py-2 text-xs" : "px-3 py-2 text-sm"} font-bold`
          : `rounded bg-white text-[#4d5d55] hover:bg-[#e6ebe2] ${compact ? "shrink-0 px-3 py-2 text-xs" : "px-3 py-2 text-sm"} font-bold`
      }
    >
      {page}
    </button>
  );
}
