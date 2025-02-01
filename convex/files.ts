import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const generateUploadUrl = mutation(async (ctx) => {
  return await ctx.storage.generateUploadUrl();
});

export const getUrl = query({
  args: {
    id: v.optional(v.id("_storage")),
  },
  handler: async (ctx, args) => {
    if (!args.id) return;
    return await ctx.storage.getUrl(args.id);
  },
});
