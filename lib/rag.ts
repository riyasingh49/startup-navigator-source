import type { Article } from "./types";

function scoreArticle(article: Article, query: string) {
  const terms = query
    .toLowerCase()
    .split(/\W+/)
    .filter((term) => term.length > 2);
  const haystack = `${article.title} ${article.topic} ${article.summary} ${article.content}`.toLowerCase();

  return terms.reduce((score, term) => score + (haystack.includes(term) ? 1 : 0), 0);
}

export function buildAnswer(query: string, articles: Article[]) {
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
