const DocumentFormats = require('../models/document_format.model');
let response = {};


module.exports = {

    allDocumentFormats: async (req, res, next) => {
        try {
            const docformat = await DocumentFormats.find({});
            response.status_code = "200";
            response.status_message = "Document formats Found";
            response.result = docformat;
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
       var name=req.params.name;
        console.log("name"+name);
        const docformats = await DocumentFormats.find({ name: name });
        if (!docformats) {

            response.status_code = "404";
            response.status_message = "DocumentFormats for Document not Found";
            response.result = null;
            res.status(404).json(response);

        }
        else {
            response.status_code = "200";
            response.status_message = "DocumentFormats Found for docoument name";
            response.result = docformats;
            res.status(200).json(response);
        }

    },
     getDocumentFormatTypeForDocumentName: async (req, res) => {
       var name=req.params.name;
        console.log("name"+name);
        const type = await DocumentFormats.find({ name: name }).select('type');
        if (!type) {

            response.status_code = "404";
            response.status_message = "Document Format type not Found";
            response.result = null;
            res.status(404).json("");

        }
        else {
            response.status_code = "200";
            response.status_message = "DocumentFormats Found for document name";
            res.status(200).json(type);
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