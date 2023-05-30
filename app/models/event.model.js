var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var EventSchema = new Schema(
  {
    eventName: { type: String },
    description: { type: String },
    eventFee: { type: Number },
    courseType: { type: Schema.Types.ObjectId, ref: "Course" },
    eventType: { type: String, enum: ["Online", "Offline", "Hybrid"] },
    isUserCompleteProfileNeeded: { type: Boolean, default: false },
    status: {
      type: String,
      enum: [
        "Not Started",
        "Open",
        "InProgress",
        "Cancelled",
        "Completed",
        "Closed",
      ],
      default: "Not Started",
    },
    minAge: { type: Number },
    maxAge: { type: Number },
    registrationStartDate: { type: Date },
    registrationEndDate: { type: Date },
    publishDate: { type: Date },
    eventStartDate: { type: Date },
    eventEndDate: { type: Date },
    eventMaxSize: { type: Number },
    registeredCount: { type: Number },
    receivedApplicationCount: { type: Number },
    registrationAcceptanceCount: { type: Number },
    closeRegistration: { type: Boolean, default: false },
    kendra: { type: String },
    users: [{ type: Schema.Types.ObjectId, ref: "User" }],
  },
  {
    timestamps: true,
  }
);

//Virtual for event's URL
EventSchema.virtual("url").get(function () {
  return "/byvk/event/" + this._id;
});

//Export model
module.exports = mongoose.model("Event", EventSchema);
