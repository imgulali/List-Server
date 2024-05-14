import joi from "joi";

export const AddVersionSchema = joi.object({
  version: joi.string().required().empty().messages({
    "string.base": "Version should be a string",
    "any.required": "Version is required",
    "string.empty": "Version is required",
  }),
  appLink: joi.string().required().empty().uri().messages({
    "string.base": "App Link should be a string",
    "any.required": "App Link is required",
    "string.empty": "App Link is required",
    "string.uri": "App link should be a URL",
  }),
});

export const UpdateVersionSchema = joi.object({
  version: joi.string().messages({
    "string.base": "Version should be a string",
  }),
  appLink: joi.string().uri().messages({
    "string.base": "App Link should be a string",
    "string.uri": "App link should be a URL",
  }),
});

export const DeleteVersionSchema = joi.object({
  id: joi.string().required().messages({
    "string.base": "Id should be a string",
    "any.required": "Id is required",
    "string.empty": "Id is required",
  }),
});
