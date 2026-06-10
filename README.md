# FlowForge

AI-powered development automation platform that bridges Jira and GitHub.

## Features

- **Jira Integration** - View and manage tasks, sync status automatically
- **GitHub Integration** - Create branches, PRs, and track commits
- **AI Code Assistant** - Generate code, review PRs, suggest improvements
- **Workflow Automation** - Automate repetitive tasks between Jira and GitHub
- **Team Dashboard** - Project health, AI metrics, team activity

## Tech Stack

- **Frontend:** Next.js 14 (App Router), React, Tailwind CSS, shadcn/ui
- **Backend:** tRPC, Prisma ORM
- **Database:** PostgreSQL
- **AI:** Ollama (local), OpenAI (optional), Anthropic (optional)
- **Auth:** NextAuth.js with GitHub/Google OAuth

## Getting Started

### Prerequisites

- Node.js 18+
- PostgreSQL
- Ollama (for local AI)

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/flowforge.git
cd flowforge

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Edit .env with your configuration

# Set up the database
npx prisma db push
npx prisma generate

# Start the development server
npm run dev
```

### Environment Variables

See `.env.example` for required configuration.

## Project Structure

```
flowforge/
├── app/              # Next.js App Router
├── server/           # tRPC routers and services
├── lib/              # Shared utilities
├── components/       # React components
└── prisma/           # Database schema
```

## License

MIT
