import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const githubRouter = createTRPCRouter({
  createBranch: publicProcedure
    .input(
      z.object({
        owner: z.string(),
        repo: z.string(),
        branchName: z.string(),
        fromBranch: z.string().default("main"),
      })
    )
    .mutation(async ({ input }) => {
      return {
        branch: {
          name: input.branchName,
          url: `https://github.com/${input.owner}/${input.repo}/tree/${input.branchName}`,
        },
      };
    }),

  createPR: publicProcedure
    .input(
      z.object({
        owner: z.string(),
        repo: z.string(),
        title: z.string(),
        body: z.string().optional(),
        head: z.string(),
        base: z.string().default("main"),
      })
    )
    .mutation(async ({ input }) => {
      return {
        pr: {
          number: 1,
          url: `https://github.com/${input.owner}/${input.repo}/pull/1`,
        },
      };
    }),

  getPRStatus: publicProcedure
    .input(
      z.object({
        owner: z.string(),
        repo: z.string(),
        prNumber: z.number(),
      })
    )
    .query(async ({ input }) => {
      return {
        status: "open",
        checks: [],
      };
    }),

  mergePR: publicProcedure
    .input(
      z.object({
        owner: z.string(),
        repo: z.string(),
        prNumber: z.number(),
        mergeMethod: z.enum(["merge", "squash", "rebase"]).default("squash"),
      })
    )
    .mutation(async ({ input }) => {
      return {
        merged: true,
      };
    }),
});
