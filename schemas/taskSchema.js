import Joi from 'joi';

export const taskSchemaCreate = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().allow('').default(''),
  priority: Joi.string()
    .valid('Low', 'Medium', 'High', 'Without priority')
    .default('Without priority')
    .insensitive(),
  deadline: Joi.string().allow(null).default(null),
});

export const taskSchemaUpdate = Joi.object({
  title: Joi.string(),
  description: Joi.string(),
  priority: Joi.string()
    .valid('low', 'medium', 'high', 'without priority')
    .insensitive(),
  deadline: Joi.string().allow(null),
  column: Joi.string(),
});
