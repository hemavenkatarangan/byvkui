const express = require("express");
const dbConfig = require("./config/database.config.js");
const mongoose = require("mongoose");
const event = require("./app/routers/event.route");
const user = require("./app/routers/user.route");
const course = require("./app/routers/course.route");
const contact = require("./app/routers/contact.route");
//const fileupload = require('./app/routers/fileupload.route');
const port = process.env.PORT || 3000;

// create express app
const app = express();

//app.use(express.static(path.join(__dirname, "client/build")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.Promise = global.Promise;

// Connecting to the database
mongoose
  .connect(dbConfig.url, {
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
// define a simple route
//app.get("*", (req, res) => {
//res.sendFile(path.join(__dirname + "/client/build/index.html"));
// });

app.get("/", (req, res) => {
  res.json({ message: "Welcome to BYVK WebSite application" });
});

//   const port = process.env.PORT || 5000;

// listen for requests
app.listen(port, () => {
  console.log(`server is running on ${port}`);
});
