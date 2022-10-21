const { model, Schema } = require("mongoose");

const QuestionSchema = new Schema(
  {
    number: Number,
    question: String,
    option: Array,
    answer: String,
  },
  { timestamps: true }
);

module.exports = model("Question", QuestionSchema);
