import { defineSchema, defineTable } from "convex/server";
import { authTables } from "@convex-dev/auth/server";
import { v } from "convex/values";

export default defineSchema({
  ...authTables,
  parking_lot: defineTable({
    number: v.number(),
    type: v.union(v.literal("CAR"), v.literal("BIKE")),
    current: v.optional(
      v.object({
        name: v.optional(v.string()),
        plate: v.string(),
        is_guest: v.boolean(),
        photo: v.optional(v.id("_storage")),
      }),
    ),
    latest_update: v.optional(v.number()),
    department: v.optional(v.number()),
    defined_client: v.optional(v.id("clients")),
    status: v.optional(v.union(v.literal("PARKED"), v.literal("EMPTY"))),
  })
    .index("by_number", ["number"])
    .index("by_type", ["type"])
    .index("by_department", ["department"])
    .index("by_status", ["status"]),
  clients: defineTable({
    name: v.string(),
    department: v.string(),
    plate: v.optional(v.string()),
    avatar: v.optional(v.id("_storage")),
    parking_lot: v.union(v.id("parking_lot"), v.array(v.id("parking_lot"))),
  }).index("by_plate", ["plate"]),
  parking_history: defineTable({
    parking_lot: v.id("parking_lot"),
    parking_lot_number: v.string(),
    plate: v.string(),
    owner: v.string(),
    type: v.union(v.literal("ENTRY"), v.literal("EXIT")),
  }),
  users: defineTable({
    email: v.optional(v.string()),
    emailVerificationTime: v.optional(v.float64()),
    image: v.optional(v.string()),
    isAnonymous: v.optional(v.boolean()),
    name: v.optional(v.string()),
    phone: v.optional(v.string()),
    phoneVerificationTime: v.optional(v.float64()),
    userName: v.optional(v.string()),
    role: v.optional(v.union(v.literal("ADMIN"), v.literal("USER"))),
  })
    .index("email", ["email"])
    .index("phone", ["phone"]),
});
