var mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const keys = require('../../config/config');
const config = require('../../config/config');

var Schema = mongoose.Schema;

var UserSchema = new Schema(    {
        first_name: { type: String },
        last_name: { type: String },
        email_id: { type: String, required: true, index: { unique: true, dropDups: true } },
        password: { type: String, required: true },
        dob : {type: Date},
        phone_num: { type: Number }, 
        roles: [
            {
                type: String, enum: ["ADMIN", "USER", "SUPERADMIN"]
            }]
        ,
        gender: { type: String, enum: ["Male", "Female", "Rather Not Say"] },
        isAgreedTerms: { type: Boolean, default: false },
        age: { type: String },
    },
    {
        timestamps: true
    }
);





UserSchema.pre('save', async function (next) {
    try {
        const hashpwd = await bcrypt.hash(this.password, 10);
        this.password = hashpwd;

    } catch (error) {

    }
});

UserSchema.methods = {
    authenticate: async function (pwd) {

        let fact = {};

        console.log("Inside Authenticate");
        const result = await bcrypt.compare(pwd, this.password);
        console.log(result);

        if (result) {

            const payload = {
                id: this._id,
                name: this.email_id, 
                role: this.role,
                username: this.first_name,    
                expire: Date.now() + 1000 * 60 * 60 * 2

            };

            const token = jwt.sign(payload, config.jwtSecret, {
                expiresIn: "2h",
            });


            console.log(token);
            fact.status = "200";
            fact.message = " login success";
            fact.token = token;

            return fact;


        } else {

            fact.status = "404";
            fact.message = " login failed";
            fact.token = null;
            return fact;
        }
    }
};






//Export model
module.exports = mongoose.model('User', UserSchema);