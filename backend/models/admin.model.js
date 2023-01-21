const mongoose = require("mongoose");

const employeeSchema = mongoose.Schema(
  {
    idemp: String,
    name: String,
    email: String,
    phone: Number,
    password: String,
  },
  {
    versionKey: false,
  }
);

const Employeemodel = mongoose.model("employee", employeeSchema);

module.exports = {
  Employeemodel,
};
