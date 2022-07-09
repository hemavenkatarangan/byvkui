const Program = require('../models/program.model.js');
const errorDetail = require('../helpers/errorHelpers');
let response = {};

module.exports = {

    allPrograms: async (req, res, next) => {
        try {
            const programs = await Program.find({});
            response.status_code = "200";
            response.status_message = "All Programs";
            response.result = programs;
            res.status(200).json(response);
        }
        catch (err) {
            response.status_code = "404";
            response.status_message = "No Programs found";
            response.result = null;
            response.error = errorDetail.getErrorDetail(err.name, err.code + "-->" + err.message);

            res.status(200).json(response);
        }

    },

    getProgram: async (req, res) => {
        const { programId } = req.params;
        const program = await Program.findById(programId);
        if (!program) {
            response.status_code = "404";
            response.status_message = "Program not found";
            response.result = null;
            return res.status(404).send(response);
        }

        response.status_code = "200";
        response.status_message = "Program found";
        response.result = program;
        res.status(200).json(response);
    },

    getProgramByCourse: async (req, res) => {
        const { courseId } = req.params;
        const program = await Program.find({ course: courseId });
        if (!program) {

            response.status_code = "404";
            response.status_message = "Program not found";
            response.result = null;
            return res.status(404).send(response);
        }

        response.status_code = "200";
        response.status_message = "Program found";
        response.result = program;
        res.status(200).json(response);
    },

    getCompleteProgram: async (req, res) => {
        const { programId } = req.params;
        const program = await Program.findById(programId).populate('course');
        if (!program) {
            response.status_code = "404";
            response.status_message = "Program not found";
            response.result = null;
            return res.status(404).send(response);
        }
        response.status_code = "200";
        response.status_message = "Program found";
        response.result = program;
        res.status(200).json(response);
    },


    createProgram: async (req, res) => {

        try {

            const newProgram = new Program(req.body);
            console.log(JSON.stringify(req.body))
            
            var reg_start_date = req.body.registration_start_date;
            var reg_end_date = req.body.registration_end_date;
            var prg_start_date = req.body.program_start_date;
            var prg_end_date = req.body.program_end_date;
            
            var error_msg = "";
            // Fetch year, month and day of
            // respective dates
            const [sy, sm, sd] = prg_start_date.split('-')
            const [ey, em, ed] = prg_end_date.split('-')
 
            // Constructing dates from given
            // string date input
            const startDate = new Date(sy, sm-1, sd)
            const endDate = new Date(ey, em-1, ed)
             
            // Validate start date so that it must
            // comes before end date
            if (startDate >= endDate) {
				error_msg = 'Program Start date  must be before Program End date';
                throw Error(
					error_msg)
				
            }
            
            // validate registration date with program start date
            const [rsy, rsm, rsd] = reg_start_date.split('-')
            const [rey, rem, red] = reg_end_date.split('-')
            
            const regStartDate = new Date(rsy, rsm-1, rsd)
            const regEndDate = new Date(rey, rem-1, red)
            
            if(regStartDate >= startDate)
            {
				error_msg = 'Registration Start date  must be before Program Start date';
                throw Error(
					error_msg)
			}
			
			
            
             if (regStartDate >= regEndDate) {
				error_msg = 'Registration Start date  must be before Registration End date';
                throw Error(
					error_msg)
				
            }
            
            const program = await newProgram.save();

            response.status_code = "200";
            response.status_message = "Program Created Successfully ";
            response.result = program;
            res.status(200).json(response);

        }

        catch (err) {
           
            response.status_code = "403";
            response.error = error_msg;
            response.status_message = "Program could not be created";
            response.result = null;
            console.log("Error in "+ JSON.stringify(response));
            res.status(403).json(response);

        }


    },
 	changeStatusForProgram: async (req, res) => {

        try {
            const program = await Program.findByIdAndUpdate(req.params.programId,{ status : req.params.status }, { new: true });
            if (program) {
                response.status_code = "200";
                response.status_message = "Program Changed Status Successfully";
                response.result = program;
                res.status(200).json(response);


            } else {
                response.status_code = "404";
                response.status_message = "Program not found";
                response.result = null;
                res.status(200).json(response);
            }

        }
        catch (err) {
            response.status_code = "403";
            response.errorObj = err;
            response.status_message = "Program could not be changed with status "+req.params.status;
            response.result = null;
            res.status(403).json(response);
        }
    },
    updateProgram: async (req, res) => {

        try {
            const program = await Program.findByIdAndUpdate(req.params.programId, req.body, { new: true });
            if (program) {
                response.status_code = "200";
                response.status_message = "Program Updated Successfully";
                response.result = program;
                res.status(200).json(response);


            } else {
                response.status_code = "404";
                response.status_message = "Program not found";
                response.result = null;
                res.status(200).json(response);
            }

        }
        catch (err) {
            response.status_code = "403";
            response.errorObj = err;
            response.status_message = "Program could not be updated";
            response.result = null;
            res.status(403).json(response);
        }
    },


    removeProgram: async (req, res) => {
        const program = await Program.findByIdAndRemove(req.params.programId);
        if (!program) {
            response.status_code = "404";
            response.status_message = "Program not found";
            response.result = null;
            res.status(200).json(response);
        }
        response.status_code = "200";
        response.status_message = "Program deleted Successfully";
        response.result = program;
        res.status(200).json(response);
    }
};