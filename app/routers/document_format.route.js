const express = require('express');
const router = require('express-promise-router')();
const document_format_Controller = require('../controllers/document_format.controller');
router.route('/')
    .get(document_format_Controller.allDocumentFormats)
    .post(document_format_Controller.storeDocumentFormat);

router.route('/document_name/:name')
    .get(document_format_Controller.getDocumentFormatForDocumentName);
router.route('/document_type/:name')
    .get(document_format_Controller.getDocumentFormatTypeForDocumentName);    
    

  

module.exports = router;