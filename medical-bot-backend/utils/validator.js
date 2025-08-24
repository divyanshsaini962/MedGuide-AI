import Joi from "joi";

/**
 * Middleware to validate request body against a Joi schema.
 * Returns structured errors or sanitizes incoming data.
 *
 * @param {Joi.Schema} schema
 * @returns {import('express').RequestHandler}
 */
export const validateBody = (schema) => (req, res, next) => {
  const options = {
    abortEarly: false, // Gather all validation issues
    allowUnknown: false, // Reject unexpected fields
    stripUnknown: true, // Remove the extras from `req.body`
  };

  const { error, value } = schema.validate(req.body, options);

  if (error) {
    const messages = error.details.map((d) => d.message).join(", ");
    return res.status(400).json({ error: messages });
  }

  req.body = value;
  next();
};
