import joi from "joi";

export const RegisterAdminSchema = joi.object({
  name: joi.string().required().empty().messages({
    "string.base": "Name should be a string",
    "any.required": "Name is required",
    "string.empty": "Name is required",
  }),

  username: joi
    .string()
    .required()
    .empty()
    .regex(/^[a-zA-Z0-9!@#$%^&*()_+{}\[\]:;<>,.?/~\-]+$/)
    .messages({
      "string.base": "Username should be a string",
      "any.required": "Username is required",
      "string.empty": "Username cannot be empty",
      "string.pattern.base": "Invalid Username Format",
    }),

  password: joi.string().required().min(6).messages({
    "string.base": "Password should be a string",
    "any.required": "Password is required",
    "string.min": "Password should be atleast of 6 chars",
  }),
});

export const LoginAdminSchema = joi.object({
  username: joi
    .string()
    .required()
    .empty()
    .regex(/^[a-zA-Z0-9!@#$%^&*()_+{}\[\]:;<>,.?/~\-]+$/)
    .messages({
      "string.base": "Username should be a string",
      "any.required": "Username is required",
      "string.empty": "Username cannot be empty",
      "string.pattern.base": "Invalid Username Format",
    }),

  password: joi.string().required().min(6).messages({
    "string.base": "Password should be a string",
    "any.required": "Password is required",
    "string.min": "Password should be atleast of 6 chars",
  }),
});

export const UpdateAdminSchema = joi.object({
  name: joi.string().messages({
    "string.base": "Name should be a string",
  }),
  username: joi
    .string()
    .regex(/^[a-zA-Z0-9!@#$%^&*()_+{}\[\]:;<>,.?/~\-]+$/)
    .messages({
      "string.base": "Username should be a string",
      "string.pattern.base": "Invalid Username Format",
    }),
  password: joi.string().min(6).messages({
    "string.base": "Password should be a string",
    "string.min": "Password should be atleast of 6 chars",
  }),
});
