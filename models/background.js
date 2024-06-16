import { Schema, mongoose } from 'mongoose';

const backgroundSchema = new mongoose.Schema(
  {
    imgUrl_desktop_2x: {
      type: String,
      required: [true],
    },

    imgUrl_desktop_1x: {
      type: String,
      required: [true],
    },

    imgUrl_mobile_2x: {
      type: String,
      required: [true],
    },

    imgUrl_mobile_1x: {
      type: String,
      required: [true],
    },
    imgUrl_tablet_2x: {
      type: String,
      required: [true],
    },

    imgUrl_tablet_1x: {
      type: String,
      required: [true],
    },

    label: {
      type: String,
      required: [true],
    },
  },
  { versionKey: false, timestamps: true }
);

export default mongoose.model('Background', backgroundSchema);
