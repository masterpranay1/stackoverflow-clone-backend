"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const loginInfoSchema = new mongoose_1.default.Schema({
    userId: {
        type: String,
    },
    browser: {
        type: String,
    },
    browserVersion: {
        type: String,
    },
    os: {
        type: String,
    },
    osVersion: {
        type: String,
    },
    device: {
        type: String,
    },
    ip: {
        type: String,
    }
}, {
    timestamps: true,
});
const LoginInfo = mongoose_1.default.model('LoginInfo', loginInfoSchema);
exports.default = LoginInfo;
