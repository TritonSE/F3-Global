import mongoose, { Schema } from "mongoose";

type ICollege = {
  name: string;
  imageUrl: string;
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
});

const College = mongoose.model<ICollege>("College", collegeSchema);
export default College;
