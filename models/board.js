import { Schema, mongoose } from 'mongoose';

const boardSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Set title for board'],
    },

    background: {
      type: String,
      default: '',
    },

    owner: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  { versionKey: false, timestamps: true }
);

export default mongoose.model('Board', boardSchema);
