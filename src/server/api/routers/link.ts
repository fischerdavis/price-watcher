import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { link } from "@/server/db/schema";

export const linkRouter = createTRPCRouter({
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.db.query.link.findMany();
  }),
  addLink: publicProcedure
    .input(z.object({ link: z.string().min(1) }))
    .mutation(async ({ ctx, input }) => {
      await ctx.db.insert(link).values({
        link: input.link,
      });
    }),
});
