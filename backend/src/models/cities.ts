import { model, Schema } from "mongoose";

const citySchema = new Schema(
  {
    cities: {
      type: [String],
      required: true,
    },
  },
  { collection: "cities" },
);

export const CityModel = model("City", citySchema);
