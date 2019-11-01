const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost/grud", { useUnifiedTopology: true })
  .then(db => console.log("Database connected"))
  .catch(err => console.error(err));
