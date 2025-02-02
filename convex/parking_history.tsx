import { query } from "./_generated/server";

export const getRecentLogs = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("parking_history").withIndex("by_creation_time").order("desc").take(3);
  },
});
