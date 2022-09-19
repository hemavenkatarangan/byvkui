var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var UserManagementSchema = new Schema(
    {

        program_id: { type: String },
        course_name:{type:String},
        user_id: { type: String },
        user_name:{type:String},
        user_email:{type:String},
        address_1: { type: String },
        address_2: { type: String },
        city:{type: String},
        state:{type: String},
        country:{type: String},
        status:{type:String,enum: ['REGISTERED', 'APPROVED', 'REJECTED'], default: 'REGISTERED'},
        reject_reason:{type:String},
        registered_by:{type:String},
        medical_reason:{type:String},
        relationship:{type:String,enum: ['Self', 'Parent', 'Spouse','Others'], default: 'Self'},
        age:{type:String},
        gender:{type:String,enum: ['Male', 'Female', 'Rather Not Say']},
        maritalstatus:{type:String,enum: ['Single', 'Married', 'Rather Not Say']},
        qualification:{type:String,enum:['School', 'Undergraduate', 'Graduate','Diploma', 'Post Graduate', 'PhD', 'Rather Not Say']},
        occupation:{type:String},
        occupation_details:{type:String},
        health_ailments:{type:String},
        lifestyle:{type:String,enum:['Sedentary','Moderately active','Highly active']},
        previous_experience:{type:String,enum:['Yes','No'],default:'No'},
        experty_level:{type:String},
        about_byuk:{type:String},     
    },
    {
        timestamps: true
    }
);



//Export model
module.exports = mongoose.model('UserManagement', UserManagementSchema);