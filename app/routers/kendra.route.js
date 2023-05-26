const express = require("express");
const router = require("express-promise-router")();
const kendraController = require("../controllers/kendra.controller.js");


router
    .route("/")
    .get(kendraController.allKendras)
    .post(kendraController.createKendra);

router
    .route("/:kendraId")
    .get(kendraController.getKendra)
    .put(
        kendraController.updateKendra)
    .delete(
        kendraController.removeKendra);

module.exports = router;
