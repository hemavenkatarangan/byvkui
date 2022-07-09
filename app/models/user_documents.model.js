var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var UserDocumentsSchema = new Schema(
  {
    document_path: { type: String },
    document_type: {
      type: String,
      enum: [
        "PAN_CARD",
        "AADHAR_CARD",
        "COVID_VACINATION_CERTIFICATE",
        "RTPCR",
        "MEDICAL_REPORTS",
        "PASSPORT",
      ],
    },
    user_id: { type: String },
    program_id: { type: String },
    email_id: { type: String },
    document_format: { type: String },
    any_disease: { type: Boolean },
    disease_desc: { type: String },
  },
  {
    timestamps: true,
  }
);

//Export model
module.exports = mongoose.model("UserDocuments", UserDocumentsSchema);
