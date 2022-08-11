var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var ContactSchema = new Schema(
  {
    name: { type: String },
    query: { type: String },
    email: { type: String },
    address: { type: String },
    phonenumber: { type: Number },
    courseName: { type: String },
  },
  {
    timestamps: true,
  }
);

//Export model
module.exports = mongoose.model("Contact", ContactSchema);
