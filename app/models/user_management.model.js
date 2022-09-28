var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var UserManagementSchema = new Schema(
  {
    program_id: { type: String },
    course_name: { type: String },
    user_id: { type: String },
    user_name: { type: String },
    user_email: { type: String },
    phoneNum:{type:String},
    address_1: { type: String },
    address_2: { type: String },
    city: { type: String },
    state: { type: String },
    country: { type: String },
    date_of_birth:{type:String},
    status: {
      type: String,
      enum: ["REGISTERED", "APPROVED", "REJECTED"],
      default: "REGISTERED",
    },
    reject_reason: { type: String },
    registered_by: { type: String },
    medical_reason: { type: String },
    relationship: {
      type: String,
      enum: ["Self", "Parent", "Spouse", "Others","Child1","Child2","Relative"],
      default: "Self",
    },
    age: { type: String },
    gender: { type: String, enum: ["Male", "Female", "Rather Not Say"] },
     nationality: {
      type: String,
      enum: ["Indian", "NRI", "Rather Not Say"],
    },
    maritalstatus: {
      type: String,
      enum: ["Single", "Married", "Rather Not Say"],
    },
    qualification: {
      type: String,
      enum: [
        "School",
        "Undergraduate",
        "Graduate",
        "Diploma",
        "Post Graduate",
        "PhD",
        "Rather Not Say",
      ],
    },
    occupation: { type: String },
    occupation_details: { type: String },
    health_ailments: { type: Array },
    lifestyle: {
      type: String,
      enum: ["Sedentary", "Moderately active", "Highly active"],
    },
    previous_experience: { type: String, enum: ["Yes", "No"], default: "No" },
    experty_level: { type: String },
    about_byuk: { type: String },
    alternate_phone_number: { type: String },
    emergency_contactname: { type: String },
    emergency_contactnumber: { type: String },
    emergency_contactrelationship: { type: String },
    emergency_contactname2: { type: String },
    emergency_contactnumber2: { type: String },
    emergency_contactrelationship2: { type: String },
    languages: { type: String },
    learning_yoga: {
      type: String,
      enum: ["No Experience", "Yes 6 Months", "Yes More Than 1 Year"],
      default: "No Experience",
    },
    kind_of_yoga: { type: String },
    health_conditions: { type: String },
    medicines_details: { type: String },
    covid_vaccine_dose: {
      type: String,
      enum: ["Yes Single Dose", "Yes Both Dose", "No"],
    },
    tobbaco_consumption: {
      type: String,
      enum: ["Yes", "No"],
      default: "No",
    },
    frequency_details_of_tobaaco_use: { type: String },
    role_of_yoga_teacher: { type: String },
    planning_to_teach: { type: String },
    why_teach_yoga: { type: String },
    teaching_experience: { type: String, enum: ["Yes", "No"], default: "No" },
    teaching_experience_description: { type: String },
    attraction_to_yoga_path: { type: String },
    meditation_practices: { type: String },
    terms_agreed: { type: String, enum: ["Yes", "No"], default: "No" },
    rules_agreed: { type: String, enum: ["Yes", "No"], default: "No" },
    fees_agreed: { type: String, enum: ["Yes", "No"], default: "No" },
  },
  {
    timestamps: true,
  }
);

//Export model
module.exports = mongoose.model("UserManagement", UserManagementSchema);
