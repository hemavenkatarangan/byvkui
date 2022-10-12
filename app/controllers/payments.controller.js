const Payments = require('../models/payments.model');
let response = {};


module.exports = {

    allPayments: async (req, res, next) => {
        try {
            const payments = await Payments.find({});
            response.status_code = "200";
            response.status_message = "Payments are Found";
            response.result = payments;
            return res.status(200).json(response);
           
        }
        catch (err) {
            response.status_code = "404";
            response.status_message = "Payments not found";
            response.result = null;
            return res.status(200).json(response);
        }

    },
    getPaymentsForUserForEvent: async (req, res) => {
      var program_id = req.params.program_id;
    var user_id = req.params.user_id;
    // console.log("Program id :" + program_id);
    const payments = await Payments.find({ program_id: program_id ,user_id:user_id});
    if (!payments) {
      response.status_code = "404";
      response.status_message = "Payments for Users Data not found";
      response.result = null;
      return res.status(200).json(response);
    } else {
      response.status_code = "200";
      response.status_message = "Payments for users data found";
      response.result = payments;
      res.status(200).json(response);
    }
       
    }, 

   getPaymentsForUserNameForEvent: async (req, res) => {
      var program_id = req.params.program_id;
    var user_name = req.params.user_name;
    // console.log("Program id :" + program_id);
    const payments = await Payments.find({ program_id: program_id ,user_name:user_name});
    if (!payments) {
      response.status_code = "404";
      response.status_message = "Payments for Users Data not found";
      response.result = null;
      return res.status(200).json(response);
    } else {
      response.status_code = "200";
      response.status_message = "Payments for users data found";
      response.result = payments;
      res.status(200).json(response);
    }
       
    },   

    createPayments: async (req, res) => {
try {
    const newPayments = new Payments(req.body);
    const payments = await newPayments.save();
    
    response.status_code = "200";
    response.status_message = "Payments done";
    response.result = payments;
    return res.status(200).json(response);
}

catch(err){
    response.status_code = "404";
    response.status_message = "Payment failed";
    response.result = null;
    return res.status(404).json(response);
}
       
}

  

};