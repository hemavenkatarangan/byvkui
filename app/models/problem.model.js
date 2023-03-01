var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var ProblemSchema = new Schema(
  {
    name: { type: String },
    problemstatement: { type: String },
    email: { type: String },
    problemdescription: { type: String },
    status: { type: String },
  },
  {
    timestamps: true,
  }
);

//Export model
module.exports = mongoose.model("Problem", ProblemSchema);
