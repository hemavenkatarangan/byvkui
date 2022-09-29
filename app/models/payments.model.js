var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var PaymentsSchema = new Schema(
    {
        
        user_id:{ type: String }, 
        user_name:{ type: String },
        email_id:{type:String},
        program_id:{ type: String },
        payment_path:{type : String}
   
    },
    {
        timestamps: true
    }
);

//Virtual for event's URL


//Export model
module.exports = mongoose.model('Payments', PaymentsSchema);