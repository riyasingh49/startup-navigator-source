export type Article = {
  id: number;
  title: string;
  topic: string;
  stage: string;
  summary: string;
  content: string;
  readTime: string;
};

export type Resource = {
  id: number;
  title: string;
  type: string;
  detail: string;
};

export type SearchRecord = {
  id: number;
  query: string;
  answer: string;
  sources: string[];
  createdAt: string;
};

export type SessionRole = "guest" | "user" | "admin";
