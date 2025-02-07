import { Doc } from "./_generated/dataModel.d";
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

export const searchParkingLot = query({
  args: {
    query: v.string(),
  },
  handler: async (ctx, args) => {
    if (/T\d{1}-\d{3,4}/g.test(args.query)) {
      const client = await ctx.db
        .query("clients")
        .filter((q) => q.eq(q.field("department"), args.query))
        .unique();
      if (!client) {
        return {
          data: [],
          error: "Departamento sin estacionamiento",
        };
      }
      if (typeof client.parking_lot === "string") {
        const lot = await ctx.db.get(client.parking_lot);
        return {
          data: [{ ...lot, owner: client }],
          error: null,
        };
      } else {
        return {
          data: { ...Promise.all(client.parking_lot.map((lot) => ctx.db.get(lot))), owner: client },
          error: null,
        };
      }
    }
    if (/E-\d{1,3}/g.test(args.query)) {
      const lot = await ctx.db
        .query("parking_lot")
        .filter((q) => q.and(q.eq(q.field("type"), "CAR"), q.eq(q.field("number"), parseInt(args.query.split("-")[1]))))
        .unique();
      if (!lot) {
        return {
          data: [],
          error: "No se encontró el estacionamiento",
        };
      }
      return {
        data: [{ ...lot, owner: null }],
        error: null,
      };
    }
    if (/EM-\d{1,3}/g.test(args.query)) {
      const lot = await ctx.db
        .query("parking_lot")
        .filter((q) =>
          q.and(q.eq(q.field("type"), "BIKE"), q.eq(q.field("number"), parseInt(args.query.split("-")[1]))),
        )
        .unique();
      if (!lot) {
        return {
          data: [],
          error: "No se encontró el estacionamiento",
        };
      }
      return {
        data: [{ ...lot, owner: null }],
        error: null,
      };
    }

    const clients = await ctx.db.query("clients").collect();
    const regex = new RegExp(`.*${args.query.toLowerCase()}.*`, "g");

    const filteredClients = clients.filter((client) => !!client.name.toLowerCase().match(regex));

    if (filteredClients.length === 0) {
      return {
        data: [],
        error: "No se encontraron propietarios",
      };
    }

    let data: (Doc<"parking_lot"> & { owner: Doc<"clients"> | null })[] = [];

    for (const client of filteredClients) {
      if (typeof client.parking_lot === "string") {
        const lot = await ctx.db.get(client.parking_lot);
        data.push({ ...lot!, owner: client });
      } else {
        const lots = await Promise.all(client.parking_lot.map((lot) => ctx.db.get(lot)));
        data.push(...lots!.map((lot) => ({ ...lot!, owner: client })));
      }
    }

    return {
      data,
      error: null,
    };
  },
});

export const listParkingLotForPdf = query({
  args: {},
  handler: async (ctx) => {
    const lots = await ctx.db.query("parking_lot").collect();
    return Promise.all(
      lots.map(async (lot) => ({
        ...lot,
        defined_client: lot.defined_client ? await ctx.db.get(lot.defined_client) : null,
        current: {
          ...lot.current,
          photo: lot.current?.photo ? await ctx.storage.getUrl(lot.current.photo) : null,
        },
      })),
    );
  },
});
