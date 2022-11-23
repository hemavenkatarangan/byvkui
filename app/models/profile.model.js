var mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const keys = require('../../config/config');
const config = require('../../config/config');

var Schema = mongoose.Schema;

var ProfileSchema = new Schema(    {
	    user_id :{type:String},
        first_name: { type: String },
        last_name: { type: String },
        email_id: { type: String, required: true, index: { unique: true, dropDups: true } },
        dob : {type: Date},
        phone_num: { type: Number }, 
        gender: { type: String, enum: ["Male", "Female", "Rather Not Say"] },
       
        age: { type: String },
        address_1 : {type:String},
    address_2 : {type:String},
    city: {type:String},
    state: {type:String},
    country: {type:String},
    nationality: {type:String},
    qualification: {type:String},
   	maritalstatus: {type:String},
   	occupation: {type:String},
   	occupation_details: {type:String},
   	languages: {type:"String"},
   	experty_level: {type:"String"},
   	previous_experience:{type:"String"},
   	about_byuk:{type:String}
        
    },
    {
        timestamps: true
    }
);






//Export model
module.exports = mongoose.model('Profile', ProfileSchema);