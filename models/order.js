const { Schema, model } = require("mongoose");

module.exports.Order = model(
  "Order",
  Schema(
    {
      ingredients: [{ type: { type: String }, amount: Number, price: Number }],
      transaction_id: {
        type: String,
        unique: true,
      },
      address: {
        phone: String,
        address1: String,
        address2: String,
        city: String,
        state: String,
        postcode: Number,
        country: String,
      },
      status: {
        type: String,
        default: "Pending",
        enum: ["Pending", "Complete"],
      },
      paymentStatus: String,
      sslStatus: String,

      user: {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
      sessionKey: String,
    },
    { timestamps: true }
  )
);
