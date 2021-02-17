// Require Libraries
const express = require("express");
const exphbs = require("express-handlebars");

// App Setup
const app = express();

app.use(express.static("public"));

app.engine(
  "handlebars",
  exphbs({
    defaultLayout: "main",
  })
);
app.set("view engine", "handlebars");

// Routes
app.get("/", (req, res) => {
  text = "Hello World";
  res.render("home", { text });
});

// Start Server
app.listen(3000, () => {
  console.log("Reddit Clone listening on port localhost:3000!");
});
