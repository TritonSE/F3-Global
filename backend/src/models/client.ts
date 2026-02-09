import { model, Schema } from "mongoose";

const clientSchema = new Schema(
  {
    name: { type: String, required: true },
    imageUrl: { type: String, required: true },
  },
  { collection: "clients" },
);

export const ClientModel = model("Client", clientSchema);
