# Startup Navigator - Comprehensive Guide to Startups

Startup Navigator is a modern AI-powered founder guide built with Next.js. It helps entrepreneurs explore startup topics such as company registration, funding, legal compliance, hiring, branding, marketing, taxation, fundraising, AI tools, and business growth.

## Live URL

Add the deployed URL here after publishing:

```text
https://your-deployment-url
```

## GitHub Repository

```text
https://github.com/riyasingh49/startup-navigator-source
```

## Demo Login Credentials

Admin:

```text
admin@startupnavigator.com
admin123
```

Founder:

```text
founder@startupnavigator.com
user123
```

## Features

- Home page with startup-focused positioning and architecture map
- Explore Topics page with startup knowledge articles
- AI Search page using a local RAG-style demo
- Resources page with templates, workflows, and checklists
- About page explaining architecture, AI tools, and prompts
- Contact page with demo inquiry form
- Demo login for founder and admin roles
- Admin section to add, edit, and delete articles
- Dashboard with article, resource, session, topic, and search-history statistics
- Loading, empty, and error-friendly UI states
- Responsive layout for mobile, tablet, and desktop

## Architecture

The app is built as a Next.js app with a small server-rendered route and a client-side interactive shell:

```text
app/
  page.tsx                 -> server route entry
  layout.tsx               -> metadata and document shell
components/
  startup-navigator-app.tsx -> client app shell and state orchestration
  pages.tsx                -> Home, Explore, AI Search, Dashboard, Admin, Login, About, Contact
  auth-panels.tsx          -> founder/admin login and admin password gate
  ui.tsx                   -> reusable UI primitives
lib/
  startup-content.ts       -> startup articles, resources, and prompt notes
  rag.ts                   -> local RAG-style retrieval and answer generation
  types.ts                 -> shared TypeScript types
```

The current version uses browser state and localStorage for demo data/search history so evaluators can test the full experience without a database or paid API key. In production, the same structure can be connected to a database such as PostgreSQL, Supabase, Firebase, or Cloudflare D1.

## AI / RAG Implementation

This project uses a simple RAG-style demo instead of a paid OpenAI, Gemini, or Claude API key.

Flow:

1. The user asks a startup question.
2. The app scores stored articles against the query.
3. The most relevant knowledge-base articles are selected as sources.
4. The app generates a practical founder answer and displays source titles.
5. The query and answer are saved in search history for the dashboard.

This approach makes the project easy to test in a classroom or evaluation setting without external billing.

## AI Tools Used

- ChatGPT / Codex was used to generate and improve the application structure, UI copy, RAG logic, README, and testing flow.

## Prompts Used

```text
Design a professional startup advisory app for founders with pages, dashboard, admin, and AI search.
Create a RAG-style assistant that retrieves relevant startup knowledge chunks and returns practical founder guidance.
Improve mobile UX, empty states, loading states, admin editing, and submission README content.
```

## Local Development

Requirements:

- Node.js 20.19 or newer

Run locally:

```bash
npm install
npm run dev
```

Test production build:

```bash
npm run build
npm test
```

## Deployment Process

Recommended free platforms:

- Vercel
- Netlify
- Render
- Railway
- Firebase Hosting

Typical Vercel deployment:

1. Open Vercel and choose Add New Project.
2. Import `riyasingh49/startup-navigator-source` from GitHub.
3. Use the default Next.js settings.
4. Deploy.
5. Add the deployed URL to this README.

## Future Improvements

- Replace demo login with real authentication.
- Store articles, resources, users, and searches in a database.
- Add embeddings and vector search for stronger RAG.
- Connect OpenAI, Gemini, or Claude for natural language generation.
- Add role-based access control for admin operations.
