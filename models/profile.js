const { Schema, model } = require("mongoose");
const Joi = require("joi");

const profileSchema = Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      unique: true,
      required: true,
    },
    phone: String,
    address1: String,
    address2: String,
    city: String,
    state: String,
    postcode: Number,
    country: String,
  },
  { timestamps: true }
);

const validateProfile = (profile) => {
  const schema = Joi.object({
    phone: Joi.string()
      .length(14)
      .pattern(/^(?:\+88|88)?(01[3-9]\d{8})$/)
      .messages({
        "string.pattern.base": "Invalid phone number!",
      })
      .required(),
    address1: Joi.string().min(5).max(255).required(),
    address2: Joi.string().min(5).max(255),
    city: Joi.string().min(5).max(255).required(),
    state: Joi.string().min(5).max(255).required(),
    postcode: Joi.string().length(4).required(),
    country: Joi.string().min(5).max(255).required(),
  });
  return schema.validate(profile);
};

module.exports.Profile = model("Profile", profileSchema);
module.exports.validate = validateProfile;
