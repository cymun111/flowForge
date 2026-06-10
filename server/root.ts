import { createTRPCRouter } from "./trpc";
import { projectRouter } from "./routers/project";
import { jiraRouter } from "./routers/jira";
import { githubRouter } from "./routers/github";
import { aiRouter } from "./routers/ai";
import { workflowRouter } from "./routers/workflow";

export const appRouter = createTRPCRouter({
  project: projectRouter,
  jira: jiraRouter,
  github: githubRouter,
  ai: aiRouter,
  workflow: workflowRouter,
});

export type AppRouter = typeof appRouter;
