const express = require('express');
const router = require('express-promise-router')();
const mail_serviceController = require('../controllers/mailservice.controller.js');

router.route('/sendmailforregistration')
    .post(mail_serviceController.mailService)
router.route('/sendmailforpayments')
    .post(mail_serviceController.mailPaymentService)
    

module.exports = router;