var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var DocumentFormatSchema = new Schema(
    {

        name: { type: String },
        type: { type: String ,enum: ['text', 'doc']},
        

    },
    {
        timestamps: true
    }
);



//Export model
module.exports = mongoose.model('DocumentFormats', DocumentFormatSchema);