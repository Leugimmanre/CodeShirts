import Joi from "joi";

const updateUserSchema = Joi.object({
  name: Joi.string().min(3).max(30).optional(),
  lastname: Joi.string().min(3).max(30).optional(),
  telphone: Joi.string().optional(),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net", "es", "org", "edu", "gov", "info"] },
    })
    .optional(),
  address: Joi.string().optional(),
  password: Joi.string()
    .min(8)
    .regex(/^(?=.*[A-Z])(?=.*[!@#$%^&*])/)
    .optional()
    .messages({
      "string.min": "Password must have at least {#limit} characters",
      "string.pattern.base":
        "Password must contain at least one uppercase letter and one special character",
    }),
  img: Joi.string().allow("").optional(),
  parentsName: Joi.string().optional(),
  parentsPhone: Joi.string().optional(),
  branch: Joi.string().optional(),
  registrationStatus: Joi.string().default("Not registered"),
  role: Joi.string().valid("ADMIN_ROLE", "USER_ROLE"),
  google: Joi.boolean().default(false),
  terms: Joi.boolean(),
});

export default updateUserSchema;
