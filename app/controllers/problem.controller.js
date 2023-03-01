const Problem = require("../models/problem.model.js");

module.exports = {
	

  allProblems: async (req, res, next) => {
    try {
      const events = await Problem.find({});
      
      var response ={};
      response.status_code="200";
      response.result=events;
      response.status_message="Successfully obtained problems";
      res.status(200).json(response);
    } catch (err) {
      next(err);
    }
  },

  getProblem: async (req, res) => {
    const { problemId } = req.params;
    const event = await Problem.findById(problemId);
    if (!event) {
      return res.status(404).send({
        message: "Problem data not found with id " + req.params.eventId,
      });
    }
    res.status(200).json(event);
  },

  createProblem: async (req, res) => {
    const newEvent = new Problem(req.body);
    const event = await newEvent.save();
    res.status(200).json(event);
  },
  
  updateStatus: async (req, res) => {
	var response = {};
	   console.log(req.params.problemId);
	   console.log(req.params.status);
		try {
			 const problem = await Problem.findByIdAndUpdate(req.params.problemId,{ status : req.params.status }, { new: true });

			response.status_code = "200";
			response.status_message =
				"Problem Status  updated successfully";
			response.result = problem;
			res.status(200).json(response);
		} catch (err) {
			response.status_code = "404";
			response.status_message = "Problem Status could not be updated";
			response.result = null;
			res.status(200).json(response);
		}
	},
};
