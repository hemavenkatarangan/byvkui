const UserManagement = require("../models/user_management.model");
let response = {};

module.exports = {
  allUsers: async (req, res, next) => {
    try {
      const usermanagement = await UserManagement.find({});
      response.status_code = "200";
      response.status_message = "Users Data Found";
      response.result = usermanagement;
      return res.status(200).json(response);
    } catch (err) {
      response.status_code = "404";
      response.status_message = "User details data not found";
      response.result = null;
      return res.status(200).json(response);
    }
  },
  getUsersForProgram: async (req, res) => {
    var program_id = req.params.program_id;
    // console.log("Program id :" + program_id);
    const users = await UserManagement.find({ program_id: program_id });
    if (!users) {
      response.status_code = "404";
      response.status_message = "Program Users Data not found";
      response.result = null;
      return res.status(200).json(response);
    } else {
      response.status_code = "200";
      response.status_message = "Program users data found";
      response.result = users;
      res.status(200).json(response);
    }
  },
 getRegisteredUserByUserForProgram: async (req, res) => {
    var program_id = req.params.program_id;
    var user_id = req.params.user_id;
    // console.log("Program id :" + program_id);
    const users = await UserManagement.find({ program_id: program_id ,user_id:user_id});
    if (!users) {
      response.status_code = "404";
      response.status_message = "Program Users Data not found";
      response.result = null;
      return res.status(200).json(response);
    } else {
      response.status_code = "200";
      response.status_message = "Program users data found";
      response.result = users;
      res.status(200).json(response);
    }
  },
  getUserManagement: async (req, res) => {
    const { userManagementId } = req.params;
    const userManagement = await UserManagement.findById(userManagementId);
    if (!course) {
      response.status_code = "404";
      response.status_message = "User Management not Found";
      response.result = null;
      res.status(404).json(response);
    } else {
      response.status_code = "200";
      response.status_message = "User Management Id Found";
      response.result = userManagement;
      res.status(200).json(response);
    }
  },
  updateStatus: async (req, res) => {
    try {
      const userRegistration = await UserManagement.findByIdAndUpdate(
        req.params.userManagementId,
        req.body,
        { new: true }
      );

      response.status_code = "200";
      response.status_message =
        "Users Registration Status  updated successfully";
      response.result = userRegistration;
      res.status(200).json(response);
    } catch (err) {
      response.status_code = "404";
      response.status_message = "User Registration Status could not be updated";
      response.result = null;
      res.status(200).json(response);
    }
  },

  registerForProgram: async (req, res) => {
    try {
	  console.log(req.body);
	  const users = await UserManagement.find({ program_id: req.body.program_id ,user_name:req.body.user_name});
	  if(!users)
	  {
      const newUser = new UserManagement(req.body);
      const user = await newUser.save();

      response.status_code = "200";
      response.status_message = "User Registered for Event";
      response.result = user;
      return res.status(200).json(response);
      }
      else
      {
	 response.status_code = "404";
      response.status_message = "User Already Registered for the Event";
      response.result = null;
      return res.status(404).json(response);
}
    } catch (err) {
      console.log(err);
      response.status_code = "404";
      response.status_message = "User not registered for Event";
      response.result = null;
      return res.status(404).json(response);
    }
  },
};
