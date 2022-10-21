const { model, Schema } = require("mongoose");

const StudentSchema = new Schema(
  {
    fname: String,
    lname: String,
    matnumber: String,
    dept: String,
    level: String,
  },
  { timestamps: true }
);

module.exports = model("Student", StudentSchema);
