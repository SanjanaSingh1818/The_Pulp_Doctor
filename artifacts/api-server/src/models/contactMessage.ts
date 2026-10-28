import mongoose, { Schema, type Document } from "mongoose";

export interface ContactMessageDocument extends Document {
  createdAt: Date;
  updatedAt: Date;
  reference: string;
  name: string;
  email: string;
  phone: string | null;
  message: string;
  service: string | null;
}

export const contactServiceOptions = [
  "Root Canal Treatment",
  "Dental Implants",
  "Veneers & Crowns",
  "Smile Designing",
  "Teeth Cleaning",
  "Oral Surgery",
  "Teeth Whitening",
  "Other / Not sure",
] as const;

const contactMessageSchema = new Schema<ContactMessageDocument>(
  {
    reference: { type: String, required: true, unique: true, index: true },
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    phone: { type: String, default: null },
    message: { type: String, required: true, trim: true },
    service: { type: String, enum: contactServiceOptions, default: null },
  },
  { timestamps: true, strict: "throw" },
);

export const ContactMessageModel =
  (mongoose.models.ContactMessage as mongoose.Model<ContactMessageDocument>) ||
  mongoose.model<ContactMessageDocument>("ContactMessage", contactMessageSchema);
