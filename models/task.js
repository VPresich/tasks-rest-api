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

taskSchema.pre('save', function (next) {
  if (this.priority) {
    const validPriorities = ['low', 'medium', 'high', 'without priority'];
    if (!validPriorities.includes(this.priority.toLowerCase())) {
      return next(new Error('Invalid priority value'));
    }
  }
  next();
});

export default mongoose.model('Task', taskSchema);
