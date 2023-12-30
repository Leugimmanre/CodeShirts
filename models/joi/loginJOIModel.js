import Joi from "joi";

const loginUserSchema = Joi.object({
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net", "es", "org", "edu", "gov", "info"] },
    })
    .required()
    .messages({
      "string.empty": "Email cannot be empty",
      "string.email": "Email must be valid",
      "any.required": "Email is a required field",
    }),
  password: Joi.string()
    .min(8)
    .regex(/^(?=.*[A-Z])(?=.*[!@#$%^&*])/)
    .required()
    .messages({
      "string.empty": "Password cannot be empty",
      "string.min": "Password must have at least {#limit} characters",
      "string.pattern.base":
        "Password must contain at least one uppercase letter and one special character",
      "any.required": "Password is a required field",
    }),
});

export default loginUserSchema;
