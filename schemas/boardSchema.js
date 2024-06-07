import Joi from 'joi';

export const boardSchemaCreate = Joi.object({
  title: Joi.string().required(),
  background: Joi.string(),
  icon: Joi.string(),
  owner: Joi.string().required(),
});

export const boardSchemaUpdate = Joi.object({
  title: Joi.string(),
  background: Joi.string(),
  icon: Joi.string(),
});
