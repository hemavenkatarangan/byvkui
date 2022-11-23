const express = require("express");
const router = require("express-promise-router")();
const profileController = require("../controllers/profile.controller.js");
const {
  validateParam,
  validateBody,
  checkRoles,
  schemas,
} = require("../helpers/routeHelpers");
const auth = require("../helpers/authHelper")();

router
  .route("/")
  .post(profileController.createProfile);


router
  .route("/:emailId")
  .get(profileController.allProfilesForLoggedUser)
  .patch(
    profileController.updateProfile
  )
  router.route("/")
  .get(profileController.getProfile);
 
module.exports = router;
