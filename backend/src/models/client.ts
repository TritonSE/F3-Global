import { model, Schema } from "mongoose";

const clientSchema = new Schema(
  {
    name: { type: String, required: true },
    imageUrl: { type: String, required: true },
    order: { type: Number, required: true, default: 0 },
  },
  { collection: "clients" },
);

export const ClientModel = model("Client", clientSchema);
