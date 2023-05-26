var mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const keys = require('../../config/config');
const config = require('../../config/config');

var Schema = mongoose.Schema;

var KendraSchema = new Schema(    {
        name: { type: String },
        address: { type: String },
        gps : {type: String}
    },
    {
        timestamps: true
    }
);

//Export model
module.exports = mongoose.model('Kendra', KendraSchema);