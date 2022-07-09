const express = require('express');
const router = require('express-promise-router')();
const user_documents_Controller = require('../controllers/user_documents.controller');
router.route('/')
    .get(user_documents_Controller.allUserDocuments)
    .post(user_documents_Controller.storeUserDocument);

router.route('/user/:user_id')
    .get(user_documents_Controller.getUserDocumentsForUser);

router.route('/program/:program_id/user/:user_id')
    .get(user_documents_Controller.getUserDocumentsForProgram);  

module.exports = router;