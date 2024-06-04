import { Schema, mongoose } from 'mongoose';

const themeSchema = new Schema({
  imgUrl_desktop_2x: String,
  imgUrl_desktop_1x: String,
  imgUrl_mobile_1x: String,
  imgUrl_mobile_2x: String,
  imgUrl_tablet_1x: String,
  imgUrl_tablet_2x: String,
  img_small: String,
});

export default mongoose.model('Theme', themeSchema);
