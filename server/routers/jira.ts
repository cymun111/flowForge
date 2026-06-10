import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const jiraRouter = createTRPCRouter({
  getTasks: publicProcedure
    .input(
      z.object({
        projectKey: z.string(),
        sprintId: z.string().optional(),
      })
    )
    .query(async ({ input }) => {
      return {
        tasks: [],
      };
    }),

  getTaskById: publicProcedure
    .input(z.object({ issueKey: z.string() }))
    .query(async ({ input }) => {
      return {
        task: null,
      };
    }),

  updateStatus: publicProcedure
    .input(
      z.object({
        issueKey: z.string(),
        status: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      return {
        success: true,
      };
    }),

  addComment: publicProcedure
    .input(
      z.object({
        issueKey: z.string(),
        body: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      return {
        success: true,
      };
    }),
});
