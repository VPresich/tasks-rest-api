import mongoose from 'mongoose';
import { EMAIL_PATTERN, NAME_PATTERN } from '../helpers/constants.js';

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      match: [
        NAME_PATTERN,
        'Name must contain only letters, numbers, and special characters, and be between 2 and 32 characters long',
      ],
    },

    password: {
      type: String,
      required: [true, 'Password is required'],
    },

    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      match: EMAIL_PATTERN,
    },

    token: {
      type: String,
      default: null,
    },

    avatarURL: {
      type: String,
      required: true,
    },

    verify: {
      type: Boolean,
      default: false,
    },

    verificationToken: {
      type: String,
      required: [true, 'Verify token is required'],
    },

    theme: {
      type: String,
      enum: ['light', 'violet', 'dark'],
      default: 'light',
      lowercase: true,
    },

    googleId: {
      type: String,
      unique: true,
      default: null,
    },
  },
  { versionKey: false, timestamps: true }
);

export default mongoose.model('User', userSchema);
