import mongoose from "mongoose";

const questionSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
    answers: {
      type: [String],
      default: [],
    },
    votes: {
      type: Number,
      default: 0,
    },
    views: {
      type: Number,
      default: 0,
    },
    tags: {
      type: [String],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

const QuestionModel = mongoose.model("Question", questionSchema);
export default QuestionModel;
