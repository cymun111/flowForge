# FlowForge - Project Plan

## Overview
**FlowForge** is an AI-powered development automation platform that bridges Jira and GitHub, enabling AI-assisted code generation, automated workflows, and real-time project visibility for engineering teams.

**Tech Stack:** Next.js 14 + tRPC + Prisma + PostgreSQL + Tailwind + shadcn/ui

---

## Epic 1: Authentication & User Management
| ID | Story | Points | Acceptance Criteria |
|----|-------|--------|---------------------|
| AU-1 | As a user, I want to sign up with GitHub OAuth so that I can quickly create an account | 3 | • GitHub OAuth flow <br>• Stores GitHub username, avatar <br>• Creates user record in DB |
| AU-2 | As a user, I want to sign in with Google OAuth so that I have alternative login options | 3 | • Google OAuth flow <br>• Links to existing account if email matches <br>• Session management |
| AU-3 | As a user, I want to connect my Jira account so that FlowForge can access my projects | 5 | • OAuth flow with Atlassian <br>• Stores access token securely <br>• Validates permissions |
| AU-4 | As a user, I want to connect my GitHub account so that FlowForge can manage repositories | 5 | • GitHub App installation flow <br>• Stores installation token <br>• Requests necessary scopes |
| AU-5 | As a user, I want to manage my profile and connected accounts so that I can update settings | 3 | • Profile page <br>• View/revoke connected accounts <br>• Notification preferences |

**Epic Total: 19 points**

---

## Epic 2: Project Setup & Configuration
| ID | Story | Points | Acceptance Criteria |
|----|-------|--------|---------------------|
| PS-1 | As a user, I want to create a new project and link it to a Jira project so that I can track work | 5 | • Project creation form <br>• Select from Jira projects <br>• Stores jiraProjectKey |
| PS-2 | As a user, I want to link a GitHub repository to my project so that code changes are tracked | 3 | • Select from GitHub repos <br>• Stores githubRepo <br>• Validates access |
| PS-3 | As a user, I want to configure AI provider settings per project so that different projects can use different models | 5 | • Provider selection (Ollama/OpenAI/Claude) <br>• API key management <br>• Model configuration |
| PS-4 | As a user, I want to set up automation rules so that workflows are customized | 5 | • Rule builder UI <br>• Trigger/action configuration <br>• Enable/disable rules |
| PS-5 | As a user, I want to invite team members to a project so that we can collaborate | 3 | • Email/username invite <br>• Role assignment (admin, member, viewer) <br>• Invitation email |

**Epic Total: 21 points**

---

## Epic 3: Jira Integration
| ID | Story | Points | Acceptance Criteria |
|----|-------|--------|---------------------|
| JI-1 | As a user, I want to view my Jira sprint tasks in FlowForge so that I can see what needs to be done | 5 | • Fetch active sprint tasks <br>• Display task list with status <br>• Filter by assignee/type |
| JI-2 | As a user, I want to see task details including description and acceptance criteria so that I understand requirements | 3 | • Expandable task cards <br>• Show all Jira fields <br>• Link to Jira issue |
| JI-3 | As a user, I want to update Jira task status from FlowForge so that I don't have to switch tools | 3 | • Status dropdown <br>• Transitions based on workflow <br>• Syncs back to Jira |
| JI-4 | As a user, I want to add comments to Jira tasks so that I can communicate progress | 2 | • Comment input <br>• Posts to Jira via API <br>• Shows in activity feed |
| JI-5 | As a user, I want to see real-time Jira updates so that I always have current information | 5 | • WebSocket connection <br>• Live status updates <br>• Notification on task changes |

**Epic Total: 18 points**

---

## Epic 4: GitHub Integration
| ID | Story | Points | Acceptance Criteria |
|----|-------|--------|---------------------|
| GI-1 | As a user, I want to create a branch from a Jira task so that work is properly tracked | 5 | • "Create Branch" button on task <br>• Auto-names branch (e.g., `DEV-123-feature-name`) <br>• Creates via GitHub API |
| GI-2 | As a user, I want to see branches linked to tasks so that I know what code corresponds to what work | 3 | • Branch list per task <br>• Show branch status (active, merged) <br>• Link to GitHub |
| GI-3 | As a user, I want to create a PR from FlowForge so that I can submit work for review | 5 | • PR creation form <br>• Auto-fills description from task <br>• Links PR to Jira issue |
| GI-4 | As a user, I want to see PR status and checks so that I know if code is ready to merge | 3 | • PR status indicator <br>• Show CI/CD checks <br>• Review status |
| GI-5 | As a user, I want to merge PRs from FlowForge so that I can complete the workflow | 5 | • Merge button <br>• Squash/merge/rebase options <br>• Auto-updates Jira status |
| GI-6 | As a user, I want to see commit history linked to tasks so that I can track code changes | 3 | • Commits list per task <br>• Show commit messages <br>• Link to GitHub commits |

**Epic Total: 24 points**

---

## Epic 5: AI Code Assistant
| ID | Story | Points | Acceptance Criteria |
|----|-------|--------|---------------------|
| AC-1 | As a user, I want AI to analyze a Jira task and suggest implementation approach so that I can plan my work | 8 | • AI reads task description <br>• Suggests files to modify <br>• Estimates complexity |
| AC-2 | As a user, I want AI to generate code based on task requirements so that I can speed up development | 13 | • AI generates code snippets <br>• Suggests file changes <br>• Shows diff preview |
| AC-3 | As a user, I want AI to create PR descriptions so that documentation is consistent | 5 | • Auto-generates PR body <br>• Includes changes summary <br>• Links to Jira issue |
| AC-4 | As a user, I want AI to review my PR and suggest improvements so that code quality is high | 8 | • AI analyzes diff <br>• Suggests improvements <br>• Flags potential issues |
| AC-5 | As a user, I want to approve AI suggestions before they're applied so that I maintain control | 5 | • Preview changes <br>• Accept/reject per suggestion <br>• Edit before applying |
| AC-6 | As a user, I want to configure AI behavior per project so that it follows our coding standards | 5 | • Custom prompts <br>• Coding style rules <br>• Technology preferences |

**Epic Total: 44 points**

---

## Epic 6: Workflow Automation
| ID | Story | Points | Acceptance Criteria |
|----|-------|--------|---------------------|
| WA-1 | As a user, I want automatic branch creation when a Jira task moves to "In Progress" so that workflow is streamlined | 5 | • Webhook listener <br>• Creates branch automatically <br>• Posts comment with branch name |
| WA-2 | As a user, I want automatic Jira status updates when PR is merged so that tracking stays current | 5 | • Detects merge event <br>• Updates Jira status <br>• Adds PR link to issue |
| WA-3 | As a user, I want automatic PR creation when I push to a task branch so that review is faster | 5 | • Detects push to linked branch <br>• Creates draft PR <br>• Fills description from task |
| WA-4 | As a user, I want to create custom automation rules with a visual builder so that I can define my own workflows | 8 | • Trigger selection <br>• Condition builder <br>• Action configuration |
| WA-5 | As a user, I want to see an activity log of all automations so that I can audit what happened | 3 | • Timeline view <br>• Filter by type <br>• Shows success/failure |

**Epic Total: 26 points**

---

## Epic 7: Dashboard & Visualization
| ID | Story | Points | Acceptance Criteria |
|----|-------|--------|---------------------|
| DV-1 | As a user, I want a project dashboard showing sprint progress so that I can see overall health | 5 | • Task status breakdown <br>• Progress bar <br>• Burndown chart |
| DV-2 | As a user, I want to see AI activity metrics so that I can measure productivity impact | 5 | • Code generated count <br>• Time saved estimate <br>• PR review stats |
| DV-3 | As a user, I want to see team member contributions so that I can track who's doing what | 3 | • Team activity feed <br>• Contribution graph <br>• Task assignments |
| DV-4 | As a user, I want to see integration health so that I know if connections are working | 3 | • Connection status indicators <br>• Last sync time <br>• Error notifications |
| DV-5 | As a user, I want to receive notifications for important events so that I stay informed | 5 | • In-app notifications <br>• Email notifications <br>• Webhook support |

**Epic Total: 21 points**

---

## Epic 8: UI/UX & Design System
| ID | Story | Points | Acceptance Criteria |
|----|-------|--------|---------------------|
| UX-1 | As a user, I want a responsive layout that works on desktop and tablet so that I can use it anywhere | 5 | • Responsive at 768px+ <br>• Collapsible sidebar <br>• Mobile-friendly tables |
| UX-2 | As a user, I want dark and light themes so that I can choose my preference | 3 | • Theme toggle <br>• Persists preference <br>• System theme detection |
| UX-3 | As a user, I want keyboard shortcuts so that I can navigate quickly | 5 | • Shortcut modal <br>• Common actions mapped <br>• Customizable |
| UX-4 | As a user, I want loading states and empty states so that the UI feels polished | 3 | • Skeleton loaders <br>• Helpful empty states <br>• Error boundaries |
| UX-5 | As a user, I want toast notifications so that I get feedback on actions | 2 | • Success/error toasts <br>• Auto-dismiss <br>• Action links |

**Epic Total: 18 points**

---

## Epic 9: DevOps & Infrastructure
| ID | Story | Points | Acceptance Criteria |
|----|-------|--------|---------------------|
| DO-1 | As a developer, I want a PostgreSQL database with Prisma so that data is properly structured | 3 | • Schema defined <br>• Migrations setup <br>• Seed data |
| DO-2 | As a developer, I want environment variable validation so that the app fails fast | 2 | • Zod validation <br>• Clear error messages <br>• Required vs optional |
| DO-3 | As a developer, I want a CI/CD pipeline so that deployments are automated | 5 | • GitHub Actions <br>• Lint, test, build <br>• Deploy to Vercel |
| DO-4 | As a developer, I want Docker configuration so that the app can be containerized | 3 | • Dockerfile <br>• docker-compose.yml <br>• Local development setup |
| DO-5 | As a developer, I want error tracking so that issues are caught in production | 3 | • Sentry integration <br>• Error boundaries <br>• Performance monitoring |

**Epic Total: 16 points**

---

## Epic 10: Security & Compliance
| ID | Story | Points | Acceptance Criteria |
|----|-------|--------|---------------------|
| SC-1 | As a user, I want API tokens stored securely so that credentials are protected | 5 | • Encryption at rest <br>• Never expose in API <br>• Secure deletion |
| SC-2 | As a user, I want role-based access control so that permissions are enforced | 5 | • Admin/Member/Viewer roles <br>• API authorization checks <br>• Project-level permissions |
| SC-3 | As a user, I want audit logging so that I can track who did what | 5 | • Log all write operations <br>• Timestamp and user <br>• Searchable history |
| SC-4 | As a user, I want rate limiting so that the API is protected | 3 | • Per-user limits <br>• Per-endpoint limits <br>• Graceful degradation |

**Epic Total: 18 points**

---

## Epic 11: Testing
| ID | Story | Points | Acceptance Criteria |
|----|-------|--------|---------------------|
| TS-1 | As a developer, I want unit tests for core logic so that business rules are correct | 5 | • Test automation rules <br>• Test AI service <br>• Mock external APIs |
| TS-2 | As a developer, I want API integration tests so that endpoints work correctly | 5 | • Test Jira integration <br>• Test GitHub integration <br>• Test auth flows |
| TS-3 | As a developer, I want component tests so that UI renders correctly | 5 | • Test key components <br>• Mock data <br>• Accessibility checks |
| TS-4 | As a developer, I want e2e tests for critical flows so that user journeys work | 8 | • Test: login → create project → create branch <br>• Test: view task → generate code → create PR <br>• Playwright |
| TS-5 | As a developer, I want load testing so that performance is validated | 5 | • k6 or Artillery <br>• API endpoint tests <br>• Concurrent user simulation |

**Epic Total: 28 points**

---

## Summary

| Epic | Points | Stories |
|------|--------|---------|
| Authentication & User Management | 19 | 5 |
| Project Setup & Configuration | 21 | 5 |
| Jira Integration | 18 | 5 |
| GitHub Integration | 24 | 6 |
| AI Code Assistant | 44 | 6 |
| Workflow Automation | 26 | 5 |
| Dashboard & Visualization | 21 | 5 |
| UI/UX & Design System | 18 | 5 |
| DevOps & Infrastructure | 16 | 5 |
| Security & Compliance | 18 | 4 |
| Testing | 28 | 5 |
| **TOTAL** | **253** | **56** |

---

## Sprint Breakdown (2-week sprints, ~35 pts/sprint)

| Sprint | Focus | Stories | Points |
|--------|-------|---------|--------|
| Sprint 1 | Foundation | DO-1, DO-2, UX-1, UX-2, UX-4, UX-5, AU-1, AU-2 | 26 |
| Sprint 2 | Integrations Setup | AU-3, AU-4, AU-5, PS-1, PS-2, PS-3 | 26 |
| Sprint 3 | Jira Integration | JI-1, JI-2, JI-3, JI-4, JI-5 | 18 |
| Sprint 4 | GitHub Integration | GI-1, GI-2, GI-3, GI-4 | 16 |
| Sprint 5 | GitHub + Automation | GI-5, GI-6, WA-1, WA-2, WA-3 | 21 |
| Sprint 6 | AI Core | AC-1, AC-2, AC-3 | 26 |
| Sprint 7 | AI Advanced | AC-4, AC-5, AC-6, WA-4, WA-5 | 31 |
| Sprint 8 | Dashboard | DV-1, DV-2, DV-3, DV-4, DV-5 | 21 |
| Sprint 9 | Polish & Security | SC-1, SC-2, SC-3, SC-4, PS-4, PS-5, UX-3 | 29 |
| Sprint 10 | DevOps | DO-3, DO-4, DO-5 | 11 |
| Sprint 11 | Testing | TS-1, TS-2, TS-3 | 15 |
| Sprint 12 | E2E & Load | TS-4, TS-5 | 13 |

---

## Environment Variables

```env
# Database
DATABASE_URL=postgresql://user:pass@localhost:5432/flowforge

# Authentication
NEXTAUTH_SECRET=your-secret
NEXTAUTH_URL=http://localhost:3000

# GitHub
GITHUB_CLIENT_ID=
GITHUB_CLIENT_SECRET=
GITHUB_APP_ID=
GITHUB_PRIVATE_KEY=

# Jira
ATLASSIAN_CLIENT_ID=
ATLASSIAN_CLIENT_SECRET=

# AI Providers
AI_PROVIDER=ollama
OLLAMA_URL=http://localhost:11434
OLLAMA_MODEL=llama3.2
OPENAI_API_KEY=
ANTHROPIC_API_KEY=

# App
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

---

## Project Structure

```
flowforge/
├── app/                          # Next.js App Router
│   ├── (auth)/                   # Auth routes
│   │   ├── login/
│   │   └── register/
│   ├── (dashboard)/              # Dashboard routes
│   │   ├── page.tsx              # Home dashboard
│   │   ├── projects/
│   │   │   ├── page.tsx          # Projects list
│   │   │   └── [id]/
│   │   │       ├── page.tsx      # Project overview
│   │   │       ├── tasks/        # Jira tasks view
│   │   │       ├── prs/          # PRs view
│   │   │       ├── ai/           # AI assistant
│   │   │       └── settings/     # Project settings
│   │   └── settings/             # User settings
│   ├── api/                      # API routes
│   │   └── trpc/[trpc]/
│   └── layout.tsx
├── server/                       # tRPC routers
│   ├── routers/
│   │   ├── jira.ts
│   │   ├── github.ts
│   │   ├── ai.ts
│   │   ├── project.ts
│   │   └── workflow.ts
│   ├── services/
│   │   ├── jira.ts
│   │   ├── github.ts
│   │   └── ai/
│   │       ├── index.ts
│   │       ├── ollama.ts
│   │       ├── openai.ts
│   │       └── anthropic.ts
│   └── trpc.ts
├── lib/                          # Shared utilities
│   ├── prisma.ts
│   ├── auth.ts
│   └── validations.ts
├── components/                   # React components
│   ├── ui/                       # shadcn/ui
│   ├── dashboard/
│   ├── tasks/
│   ├── prs/
│   └── ai/
└── prisma/
    └── schema.prisma
```
