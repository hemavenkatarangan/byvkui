const DocumentFormats = require('../models/document_format.model');
let response = {};


module.exports = {

    allDocumentFormats: async (req, res, next) => {
        try {
            const DocumentFormats = await DocumentFormats.find({});
            response.status_code = "200";
            response.status_message = "Document formats Found";
            response.result = DocumentFormats;
            return res.status(200).json(response);

        }
        catch (err) {
            response.status_code = "404";
            response.status_message = "Document Formats data not found";
            response.result = null;
            return res.status(200).json(response);
        }

    },
    
   
    getDocumentFormatForDocumentName: async (req, res) => {
        const { name } = req.params;
        const DocumentFormats = await DocumentFormats.findById(name);
        if (!DocumentFormats) {

            response.status_code = "404";
            response.status_message = "DocumentFormats for User not Found";
            response.result = null;
            res.status(404).json(response);

        }
        else {
            response.status_code = "200";
            response.status_message = "DocumentFormats Found for user";
            response.result = DocumentFormats;
            res.status(200).json(response);
        }

    },
    storeDocumentFormat: async (req, res) => {
        try {
            const newDocFormats = new DocumentFormats(req.body);
            const documentFormats = await newDocFormats.save();

            response.status_code = "200";
            response.status_message = "Created new Document format";
            response.result = documentFormats;
            return res.status(200).json(response);
        }

        catch (err) {
            response.status_code = "404";
            response.status_message = "Document Format not be created";
            response.result = null;
            return res.status(404).json(response);
        }

    }


    


};