const { Schema, model } = require("mongoose");

const CompanySchema = new Schema(
  {
    title: String,
    decription: String,
    image: String,
    phone: Number,
  },
  { timestamps: true }
);

module.exports = model("Company", CompanySchema);
