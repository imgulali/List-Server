export const validate = (schema, params = false) => {
  return (req, res, next) => {
    try {
      let data;
      if (params) data = req.params;
      else data = req.body;

      const result = schema.validate(data, {
        abortEarly: true,
        stripUnknown: true,
      });

      if (result.error) {
        const error = result.error.details
          .map((detail) => detail.message)
          .join(", ");
        return res.error("Validation Error", error, 400);
      }
      if (result.value.phone) {
        req.body.phone = result.value.phone;
      }
      next();
    } catch (error) {
      next(error);
    }
  };
};
