import { Schema, mongoose } from 'mongoose';

const boardSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Set title for board'],
    },

    background: {
      type: String,
      default: 'no-img',
    },

    icon: {
      type: String,
      default: 'icon-circles',
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
