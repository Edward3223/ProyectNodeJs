const express = require("express");
const app = express();
const bodyParse = require("body-parser");
const path = require("path");

//Utilities

require("./controllers/database");

app.use(bodyParse.json());
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

//Start the server

app.listen(3000, function() {
  console.log("Example app listening on port 3000!");
});
