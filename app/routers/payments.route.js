const express = require('express');
const router = require('express-promise-router')();
const paymentsController = require('../controllers/payments.controller.js');
const { validateParam, validateBody, schemas } = require('../helpers/routeHelpers');

router.route('/')
    .get(paymentsController.allPayments)
    .post(paymentsController.createPayments);
router.route('/program/:program_id/user_id/:user_id')
     .get(paymentsController.getPaymentsForUserForEvent)
   

module.exports = router;