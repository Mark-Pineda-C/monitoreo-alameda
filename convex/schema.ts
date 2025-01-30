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
        photo: v.id("_storage"),
      }),
    ),
    latest_update: v.optional(v.number()),
    department: v.optional(v.string()),
    defined_client: v.optional(v.id("clients")),
    status: v.optional(v.union(v.literal("PARKED"), v.literal("EMPTY"))),
  })
    .index("by_number", ["number"])
    .index("by_type", ["type"])
    .index("by_department", ["department"])
    .index("by_status", ["status"]),
  clients: defineTable({
    name: v.string(),
    plate: v.string(),
    avatar: v.id("_storage"),
  }).index("by_plate", ["plate"]),
  parking_history: defineTable({
    parking_lot: v.id("parking_lot"),
    plate: v.string(),
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
  })
    .index("email", ["email"])
    .index("phone", ["phone"]),
});
