const { model, Schema } = require("mongoose");

const AnswerSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "Student",
    },
    question: Array,
    answer: Array,
  },
  { timestamps: true }
);

module.exports = model("Answer", AnswerSchema);
