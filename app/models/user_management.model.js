var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var UserManagementSchema = new Schema(
    {

        program_id: { type: String },
        course_name:{type:String},
        user_id: { type: String },
        user_name:{type:String},
        address_1: { type: String },
        address_2: { type: String },
        city:{type: String},
        state:{type: String},
        country:{type: String},
        status:{type:String,enum: ['REGISTERED', 'APPROVED', 'REJECTED'], default: 'REGISTERED'},
        reject_reason:{type:String},
        registered_by:{type:String},
        medical_reason:{type:String},
        relationship:{type:String,enum: ['SELF', 'PARENTS', 'SPOUSE','OTHERS'], default: 'SELF'}
        
    },
    {
        timestamps: true
    }
);



//Export model
module.exports = mongoose.model('UserManagement', UserManagementSchema);