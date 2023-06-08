const express = require("express");
const router = require("express-promise-router")();
const programController = require("../controllers/program.controller.js");
const {
  validateParam,
  validateBody,
  schemas,
} = require("../helpers/routeHelpers");

router
  .route("/")
  .get(programController.allPrograms)
  .post(programController.createProgram);

router.route("/activeprograms").get(programController.allActivePrograms);

router
  .route("/course/:courseId/programtype/:programType")
  .get(programController.getProgramByCourseProgramType);

router
  .route("/:programId")
  .get(
    validateParam(schemas.idSchema, ["programId"]),
    programController.getProgram
  )
  .patch(programController.updateProgram)
  .delete(programController.removeProgram);

router
  .route("/:programId/status/:status")
  .get(
    validateParam(schemas.idSchema, ["programId"]),
    programController.getProgram
  )
  .patch(programController.changeStatusForProgram);

router
  .route("/course/:courseId")
  .get(
    validateParam(schemas.idSchema, ["courseId"]),
    programController.getProgramByCourse
  );

router
  .route("/:programId/complete")
  .get(
    validateParam(schemas.idSchema, ["programId"]),
    programController.getCompleteProgram
  );

module.exports = router;
