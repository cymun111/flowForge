import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const workflowRouter = createTRPCRouter({
  list: publicProcedure
    .input(z.object({ projectId: z.string() }))
    .query(async ({ input }) => {
      return {
        workflows: [],
      };
    }),

  create: publicProcedure
    .input(
      z.object({
        projectId: z.string(),
        name: z.string(),
        description: z.string().optional(),
        trigger: z.object({
          type: z.string(),
          config: z.record(z.unknown()),
        }),
        conditions: z.array(
          z.object({
            field: z.string(),
            operator: z.string(),
            value: z.string(),
          })
        ),
        actions: z.array(
          z.object({
            type: z.string(),
            config: z.record(z.unknown()),
          })
        ),
      })
    )
    .mutation(async ({ input }) => {
      return {
        workflow: {
          id: "1",
          ...input,
          enabled: true,
          createdAt: new Date(),
        },
      };
    }),

  toggle: publicProcedure
    .input(
      z.object({
        workflowId: z.string(),
        enabled: z.boolean(),
      })
    )
    .mutation(async ({ input }) => {
      return {
        success: true,
      };
    }),

  getLogs: publicProcedure
    .input(
      z.object({
        workflowId: z.string(),
        limit: z.number().default(50),
      })
    )
    .query(async ({ input }) => {
      return {
        logs: [],
      };
    }),
});
