"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const questionController_1 = require("../controller/questionController");
const authMiddleware_1 = require("../middleware/authMiddleware");
router.post('/create', authMiddleware_1.protect, questionController_1.createQuestion);
exports.default = router;
