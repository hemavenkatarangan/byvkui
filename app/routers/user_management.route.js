const express = require('express');
const router = require('express-promise-router')();
const user_management_Controller = require('../controllers/user_management.controller');
const { validateParam, validateBody, schemas } = require('../helpers/routeHelpers');
router.route('/')
    .get(user_management_Controller.allUsers)
    .post(user_management_Controller.registerForProgram);

router.route('/program/:program_id')
    .get(user_management_Controller.getUsersForProgram);

router.route('/status/:userManagementId')
     .get(validateParam(schemas.idSchema, ['userManagementId']), user_management_Controller.getUserManagement)
     .patch(user_management_Controller.updateStatus);
     
router.route('/program/:program_id/user_id/:user_id')
     .get(user_management_Controller.getRegisteredUserByUserForProgram)
router.route('/user/:user_id')
     .get(user_management_Controller.getRegisteredUserPrograms)
    

module.exports = router;