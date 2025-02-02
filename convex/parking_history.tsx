import { mutation, query } from "./_generated/server";

export const getRecentLogs = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("parking_history").withIndex("by_creation_time").order("desc").take(3);
  },
});

export const test = mutation({
  args: {},
  handler: async (ctx) => {
    const clients = await ctx.db.query("clients").collect();
    for (const client of clients) {
      if (typeof client.parking_lot === "string") {
        const lot = await ctx.db.get(client.parking_lot);
        if (lot) {
          await ctx.db.patch(lot._id, {
            defined_client: client._id,
          });
        }
      } else {
        const lots = await Promise.all(client.parking_lot.map((lot) => ctx.db.get(lot)));
        for (const lot of lots) {
          if (lot) {
            await ctx.db.patch(lot._id, {
              defined_client: client._id,
            });
          }
        }
      }
    }
  },
});
