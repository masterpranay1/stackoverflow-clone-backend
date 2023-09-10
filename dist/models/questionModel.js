"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const questionSchema = new mongoose_1.default.Schema({
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
}, {
    timestamps: true,
});
const QuestionModel = mongoose_1.default.model("Question", questionSchema);
exports.default = QuestionModel;
