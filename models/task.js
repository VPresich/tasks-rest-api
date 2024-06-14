import { Schema, mongoose } from 'mongoose';

const taskSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      default: '',
    },
    priority: {
      type: String,
      enum: ['Low', 'Medium', 'High', 'Without priority'],
      default: 'Without priority',
    },
    deadline: {
      type: String,
      default: null,
    },
    column: {
      type: Schema.Types.ObjectId,
      ref: 'Column',
      required: true,
    },
  },
  { versionKey: false, timestamps: true }
);

export default mongoose.model('Task', taskSchema);
