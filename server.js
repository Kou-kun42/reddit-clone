// Require Libraries
const express = require("express");
const exphbs = require("express-handlebars");
const bodyParser = require("body-parser");
const expressValidator = require("express-validator");

// App Setup
const app = express();

// Use Body Parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Add after body parser initialization!
app.use(expressValidator());

app.use(express.static("public"));

app.engine(
  "handlebars",
  exphbs({
    defaultLayout: "main",
  })
);
app.set("view engine", "handlebars");

require("./controllers/posts.js")(app);
// Set db
require("./data/reddit-db");

// Routes
app.get("/", (req, res) => {
  text = "Hello World";
  res.render("home", { text });
});

app.get("/posts/new", function (req, res) {
  var currentUser = req.user;
  return res.render("posts-new", { currentUser });
});

// Start Server
app.listen(3000, () => {
  console.log("Reddit Clone listening on port localhost:3000!");
});
