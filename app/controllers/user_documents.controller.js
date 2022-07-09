const UserDocuments = require('../models/user_documents.model');
let response = {};


module.exports = {

    allUserDocuments: async (req, res, next) => {
        try {
            const UserDocuments = await UserDocuments.find({});
            response.status_code = "200";
            response.status_message = "Users Documents Found";
            response.result = UserDocuments;
            return res.status(200).json(response);

        }
        catch (err) {
            response.status_code = "404";
            response.status_message = "User Documents data not found";
            response.result = null;
            return res.status(200).json(response);
        }

    },
    
    getUserDocuments: async (req, res) => {
        const { UserDocumentsId } = req.params;
        const UserDocuments = await UserDocuments.findById(UserDocumentsId);
        if (!course) {

            response.status_code = "404";
            response.status_message = "User Documents not Found";
            response.result = null;
            res.status(404).json(response);

        }
        else {
            response.status_code = "200";
            response.status_message = "User Documents Found";
            response.result = UserDocuments;
            res.status(200).json(response);
        }

    },
    getUserDocumentsForUser: async (req, res) => {
        const { user_id } = req.params;
        const UserDocuments = await UserDocuments.find({user_id:user_id});
        if (!course) {

            response.status_code = "404";
            response.status_message = "User Documents for User not Found";
            response.result = null;
            res.status(404).json(response);

        }
        else {
            response.status_code = "200";
            response.status_message = "User Documents Found for user";
            response.result = UserDocuments;
            res.status(200).json(response);
        }

    },
     getUserDocumentsForProgram: async (req, res) => {
        const { user_id } = req.params.user_id;
        const { program_id } = req.params.program_id;
        const UserDocuments = await UserDocuments.find({user_id:user_id,program_id:program_id});
        if (!course) {

            response.status_code = "404";
            response.status_message = "User Documents for Program not Found";
            response.result = null;
            res.status(404).json(response);

        }
        else {
            response.status_code = "200";
            response.status_message = "User Documents Found for program";
            response.result = UserDocuments;
            res.status(200).json(response);
        }

    },
    storeUserDocument: async (req, res) => {
        try {
            const newUserDocuments = new UserDocuments(req.body);
            const userDocuments = await newUserDocuments.save();

            response.status_code = "200";
            response.status_message = "UserDocuments data created";
            response.result = userDocuments;
            return res.status(200).json(response);
        }

        catch (err) {
            response.status_code = "404";
            response.status_message = "User Document not be created";
            response.result = null;
            return res.status(404).json(response);
        }

    }


    


};