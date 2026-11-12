import mongoose, { Schema, type Document } from "mongoose";

export type EngagementEventType = "call" | "whatsapp";

export interface EngagementEventDocument extends Document {
  eventType: EngagementEventType;
  page: string;
}

const engagementEventSchema = new Schema<EngagementEventDocument>(
  {
    eventType: { type: String, enum: ["call", "whatsapp"], required: true },
    page: { type: String, required: true, trim: true, maxlength: 240 },
  },
  { timestamps: true, strict: "throw" },
);

engagementEventSchema.index({ page: 1, eventType: 1 });

export const EngagementEventModel =
  (mongoose.models.EngagementEvent as mongoose.Model<EngagementEventDocument>) ||
  mongoose.model<EngagementEventDocument>(
    "EngagementEvent",
    engagementEventSchema,
  );
