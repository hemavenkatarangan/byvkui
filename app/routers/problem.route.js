const express = require("express");
const router = require("express-promise-router")();
const problemController = require("../controllers/problem.controller.js");

router
  .route("/")
  .get(problemController.allProblems)
  .post(problemController.createProblem);

router.route('/:problemId/status/:status')
     .patch(problemController.updateStatus);
module.exports = router;
