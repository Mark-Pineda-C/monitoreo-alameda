import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const listParkingLots = query({
  args: { type: v.union(v.literal("CAR"), v.literal("BIKE")) },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("parking_lot")
      .filter((q) => q.eq(q.field("type"), args.type))
      .collect();
  },
});

export const setParkingLotStatus = mutation({
  args: {
    lot_id: v.id("parking_lot"),
    photo: v.optional(v.id("_storage")),
    owner: v.optional(v.string()),
    plate: v.string(),
    status: v.union(v.literal("EMPTY"), v.literal("PARKED")),
  },
  handler: async (ctx, args) => {
    const lot = await ctx.db.get(args.lot_id);
    if (!lot) {
      throw new Error("Parking lot not found");
    }
    if (lot.current?.photo && args.photo) {
      await ctx.storage.delete(lot.current.photo);
    }
    const setLog = args.status !== lot.status;

    await ctx.db.patch(args.lot_id, {
      current: {
        is_guest: false,
        photo: args.photo,
        plate: args.plate,
        name: args.owner,
      },
      latest_update: Date.now(),
      status: args.status,
    });
    if (setLog) {
      await ctx.db.insert("parking_history", {
        parking_lot: args.lot_id,
        type: args.status === "PARKED" ? "ENTRY" : "EXIT",
        plate: args.plate,
        parking_lot_number: `${lot.type === "CAR" ? "E" : "EM"}-${lot.number}`,
        owner: args.owner ?? "Sin nombre registrado",
      });
    } else {
      const log = await ctx.db
        .query("parking_history")
        .filter((q) => q.eq(q.field("parking_lot"), args.lot_id))
        .order("desc")
        .first();
      await ctx.db.patch(log?._id!, {
        owner: args.owner ?? "Sin nombre registrado",
        plate: args.plate,
      });
    }
  },
});
