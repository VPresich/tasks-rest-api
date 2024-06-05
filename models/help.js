import { Schema, mongoose } from 'mongoose';
const helpSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
  },
  { versionKey: false, timestamps: true }
);

export default mongoose.model('Help', helpSchema);
