import mongoose, { Schema, type Document } from "mongoose";

export interface ReferenceCounterDocument extends Document {
  key: string;
  sequence: number;
}

const referenceCounterSchema = new Schema<ReferenceCounterDocument>(
  {
    key: { type: String, required: true, unique: true },
    sequence: { type: Number, required: true, default: 0 },
  },
  { timestamps: false, strict: "throw" },
);

export const ReferenceCounterModel =
  (mongoose.models.ReferenceCounter as mongoose.Model<ReferenceCounterDocument>) ||
  mongoose.model<ReferenceCounterDocument>(
    "ReferenceCounter",
    referenceCounterSchema,
  );
