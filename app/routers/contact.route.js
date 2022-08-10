const express = require("express");
const router = require("express-promise-router")();
const contactusController = require("../controllers/contact.controller.js");

router
  .route("/")
  .get(contactusController.allContactUs)
  .post(contactusController.createContactUs);

module.exports = router;
