import Joi from "joi";

const userSchema = Joi.object({
  name: Joi.string().min(3).max(30).required().messages({
    "string.empty": "Name cannot be empty",
    "string.min": "Name must have at least {#limit} characters",
    "string.max": "Name cannot have more than {#limit} characters",
    "any.required": "Name is a required field",
  }),
  lastname: Joi.string().min(3).max(30).required().messages({
    "string.empty": "Last name cannot be empty",
    "string.min": "Last name must have at least {#limit} characters",
    "string.max": "Last name cannot have more than {#limit} characters",
    "any.required": "Last name is a required field",
  }),
  telphone: Joi.string().required().messages({
    "string.empty": "Telephone cannot be empty",
    "any.required": "Telephone is a required field",
  }),
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
  address: Joi.string().messages({
    "string.empty": "Address cannot be empty",
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
  img: Joi.string().allow("").optional(),
  parentsName: Joi.string().required().messages({
    "string.empty": "Parents' name cannot be empty",
    "any.required": "Parents' name is a required field",
  }),
  parentsPhone: Joi.string().required().messages({
    "string.empty": "Parents' phone cannot be empty",
    "any.required": "Parents' phone is a required field",
  }),
  branch: Joi.string(),
  registrationStatus: Joi.string().default("Not registered"),
  role: Joi.string().valid("ADMIN_ROLE", "USER_ROLE").allow("").required(),
  google: Joi.boolean().default(false),
  terms: Joi.boolean(),
});

export default userSchema;
