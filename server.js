require("dotenv").config();
// Require Libraries
const express = require("express");
const exphbs = require("express-handlebars");
const bodyParser = require("body-parser");
const expressValidator = require("express-validator");
var cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");

// App Setup
const app = express();

// Use Body Parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Add after body parser initialization!
app.use(expressValidator());

app.use(cookieParser());

app.use(express.static("public"));

app.engine(
  "handlebars",
  exphbs({
    defaultLayout: "main",
  })
);
app.set("view engine", "handlebars");

// Set db
require("./data/reddit-db");
require("./controllers/posts.js")(app);
require("./controllers/comments.js")(app);
require("./controllers/auth.js")(app);

// Routes
app.get("/", (req, res) => {
  text = "Hello World";
  res.render("home", { text });
});

app.get("/posts/new", function (req, res) {
  var currentUser = req.user;
  return res.render("posts-new", { currentUser });
});

module.exports = app;

// Start Server
app.listen(3000, () => {
  console.log("Reddit Clone listening on port localhost:3000!");
});
