const express = require("express");
const app = express();
const bodyParse = require("body-parser");

//Utilities

app.use(bodyParse.json());
app.use("/", require("./controllers/routers/indexroute"));

//Start the server

app.listen(3000, function() {
  console.log("Example app listening on port 3000!");
});
