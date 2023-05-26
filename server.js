const express = require("express");
var bodyParser = require('body-parser');
const config = require("./config/config");
const mongoose = require("mongoose");
const event = require("./app/routers/event.route");
const user = require("./app/routers/user.route");
const contact = require("./app/routers/contact.route");
const problem = require("./app/routers/problem.route");
const course = require("./app/routers/course.route");
const program = require("./app/routers/program.route");
const role = require("./app/routers/role.route");
const userrole = require("./app/routers/user_role.route");
const audit = require("./app/routers/audit.route");
const mediamanagement = require("./app/routers/media_management.route");
const usermanagement = require("./app/routers/user_management.route");
const userdocuments = require("./app/routers/user_documents.route");
const documentformat = require("./app/routers/document_format.route");
const payments = require("./app/routers/payments.route");
const dotenv = require("dotenv");
const mailservice = require("./app/routers/mail_service.route");
const profile = require("./app/routers/profile.route");
const kendra = require("./app/routers/kendra.route");
const auth = require("./app/helpers/authHelper")();
const passport = require("passport");


// create express app
const app = express();
dotenv.config();

const port = process.env.PORT || 3000;
app.use(bodyParser.json({limit: '2000mb', extended: true}))
app.use(bodyParser.urlencoded({limit: '2000mb', extended: true}))
//app.use(express.static(path.join(__dirname, "client/build")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(auth.initialize());
app.use(passport.initialize());
app.use(passport.session());

mongoose.Promise = global.Promise;

// Connecting to the database
mongoose
  .connect(config.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: true,
    useCreateIndex: true,
  })
  .then(() => {
    console.log("Successfully connected to the database");
  })
  .catch((err) => {
    console.log("Could not connect to the database. Exiting now...", err);
    process.exit();
  });

// Require batch routes

app.use("/courses", course);
//app.use('/fileupload', fileupload);
app.use("/events", event);
app.use("/users", user);
app.use("/contact", contact);
app.use("/roles", role);
app.use("/audits", audit);
app.use("/programs", program);
app.use("/userroles", userrole);
app.use("/mediamanagement", mediamanagement);
app.use("/usermanagement", usermanagement);
app.use("/userdocuments", userdocuments);
app.use("/documentformat", documentformat);
app.use("/payments", payments);
app.use("/mailservice", mailservice);
app.use("/profile", profile);
app.use("/problem", problem);
app.use("/kendras", kendra);




app.get("/", (req, res) => {
  res.json({ message: "Welcome to BYVK WebSite application" });
});

// listen for requests
app.listen(port, () => {
  console.log(`server is running on ${port}`);
});
