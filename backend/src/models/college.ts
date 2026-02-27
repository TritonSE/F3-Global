import mongoose, { Schema } from "mongoose";

type ICollege = {
  name: string;
  imageUrl: string;
  order: number;
};

const collegeSchema = new Schema<ICollege>({
  name: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  order: {
    type: Number,
    required: true,
    default: 0,
  },
});

const College = mongoose.model<ICollege>("College", collegeSchema);
export default College;
