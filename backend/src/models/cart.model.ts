import mongoose, { Schema, Document } from "mongoose";

export interface ICart extends Document {
  userId: mongoose.Types.ObjectId;
  status: string;
}

const CartSchema: Schema = new Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    status: { type: String, enum: ["active", "inactive"], required: true },
  },
  {
    timestamps: true,
  },
);

export const Cart = mongoose.model<ICart>("Cart", CartSchema);
