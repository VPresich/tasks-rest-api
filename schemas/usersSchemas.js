import Joi from 'joi';
import { EMAIL_PATTERN, NAME_PATTERN } from '../helpers/constants.js';

export const registerSchema = Joi.object({
  name: Joi.string().required().pattern(NAME_PATTERN),
  email: Joi.string().required().pattern(EMAIL_PATTERN),
  password: Joi.string().required().min(6),
});

export const emailSchema = Joi.object({
  email: Joi.string().pattern(EMAIL_PATTERN).required(),
});

export const loginSchema = Joi.object({
  email: Joi.string().required().pattern(EMAIL_PATTERN),
  password: Joi.string().required().min(6),
});

export const profileSchema = Joi.object({
  name: Joi.string().optional().pattern(NAME_PATTERN),
  email: Joi.string().email().optional().pattern(EMAIL_PATTERN),
  password: Joi.string().min(6).optional(),
  theme: Joi.string().valid('light', 'violet', 'dark').insensitive().optional(),
});

export const themeSchema = Joi.object({
  theme: Joi.string().valid('light', 'violet', 'dark').insensitive().required(),
});
