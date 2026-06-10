import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const aiRouter = createTRPCRouter({
  generateCode: publicProcedure
    .input(
      z.object({
        taskDescription: z.string(),
        requirements: z.string().optional(),
        context: z.string().optional(),
      })
    )
    .mutation(async ({ input }) => {
      return {
        suggestion: {
          id: "1",
          type: "code_generation",
          content: {
            explanation: "Generated code based on requirements",
            files: [],
          },
          status: "pending",
        },
      };
    }),

  reviewPR: publicProcedure
    .input(
      z.object({
        prUrl: z.string(),
        diff: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      return {
        review: {
          summary: "PR review completed",
          suggestions: [],
          issues: [],
        },
      };
    }),

  generatePRDescription: publicProcedure
    .input(
      z.object({
        taskTitle: z.string(),
        taskDescription: z.string().optional(),
        changes: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      return {
        description: `## Changes\n\n${input.changes}\n\n## Related Issue\n\nCloses task: ${input.taskTitle}`,
      };
    }),

  explainCode: publicProcedure
    .input(
      z.object({
        code: z.string(),
        language: z.string().optional(),
      })
    )
    .mutation(async ({ input }) => {
      return {
        explanation: "Code explanation generated",
      };
    }),
});
