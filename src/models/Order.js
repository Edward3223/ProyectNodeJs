const mongoose = require("mongoose");
const Shema = mongoose.Schema;

const GrudCream = new Shema({
  author: String,
  description: String,
  status: {
    type: Boolean,
    default: false
  }
});

const TaskActivity = mongoose.model("GrudCream", GrudCream);
module.exports = TaskActivity;
