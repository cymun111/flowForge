import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const projectRouter = createTRPCRouter({
  list: publicProcedure.query(async ({ ctx }) => {
    return {
      projects: [],
    };
  }),

  getById: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input }) => {
      return {
        project: null,
      };
    }),

  create: publicProcedure
    .input(
      z.object({
        name: z.string(),
        key: z.string(),
        description: z.string().optional(),
        jiraProjectKey: z.string().optional(),
        githubOwner: z.string().optional(),
        githubRepo: z.string().optional(),
      })
    )
    .mutation(async ({ input }) => {
      return {
        project: {
          id: "1",
          ...input,
        },
      };
    }),
});
