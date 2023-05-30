var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var ProgramSchema = new Schema(
  {
    name: { type: String },
    description: { type: String },
    program_fee: { type: Number },
    program_fee_in_usd: { type: Number },
    course: { type: Schema.Types.ObjectId, ref: "Course" },
    program_type: { type: String, enum: ["ONLINE", "OFFLINE", "HYBRID"] },
    status: {
      type: String,
      enum: ["NOT_STARTED", "STARTED", "COMPLETED"],
      default: "NOT_STARTED",
    },
    min_age: { type: Number },
    max_age: { type: Number },
    registration_start_date: { type: Date },
    registration_end_date: { type: Date },
    program_start_date: { type: Date },
    program_end_date: { type: Date },
    program_max_size: { type: Number },
    registered_count: { type: Number },
    received_application_count: { type: Number },
    registration_acceptance_count: { type: Number },
    close_registration: { type: Boolean, default: false },
    required_documents: { type: Array },
    kendra: { type: String },
  },
  {
    timestamps: true,
  }
);

//Export model
module.exports = mongoose.model("Program", ProgramSchema);
