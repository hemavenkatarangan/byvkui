const express = require("express");
const router = require("express-promise-router")();
const usersController = require("../controllers/user.controller.js");
const {
  validateParam,
  validateBody,
  checkRoles,
  schemas,
} = require("../helpers/routeHelpers");
const auth = require("../helpers/authHelper")();

router
  .route("/")
  // [auth.authenticate(),checkRoles(['SUPER'])],
  .get(usersController.allUsers)
  .post(validateBody(schemas.userSchema), usersController.createUser);

router
  .route("/register")
  .post(validateBody(schemas.registerUserSchema), usersController.registerUser);
router
  .route("/login")
  .post(validateBody(schemas.loginUserSchema), usersController.loginUser);

router
  .route("/:userId")
  .get(validateParam(schemas.idSchema, ["userId"]), usersController.getUser)
  .put(
    [
      validateParam(schemas.idSchema, ["userId"]),
      validateBody(schemas.userSchema),
    ],
    usersController.replaceUser
  )
  .patch(
    [
      validateParam(schemas.idSchema, ["userId"]),
      validateBody(schemas.userOptionalSchema),
    ],
    usersController.updateUser
  )
  .delete(
    validateParam(schemas.idSchema, ["userId"]),
    usersController.removeUser
  );

router
  .route("/:userId/completeprofile")
  .get(
    validateParam(schemas.idSchema, ["userId"]),
    usersController.getCompleteUserDetails
  );

router
  .route("/:userId/registeredevents")
  .get(
    validateParam(schemas.idSchema, ["userId"]),
    usersController.getUserEvents
  )
  .post(
    validateParam(schemas.idSchema, ["userId"]),
    usersController.createUserEvent
  );

router
  .route("/:userId/event/:registredEventId")
  .get(
    validateParam(schemas.idSchema, ["userId", "registredEventId"]),
    usersController.getRegisteredEvent
  );
// .put(usersController.replaceRegisteredEvent)
// .patch(usersController.updateRegisteredEvent)
// .delete(usersController.removeRegisteredEvent);

module.exports = router;
