"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMe = exports.loginUser = exports.registerUser = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const userModel_1 = __importDefault(require("../models/userModel"));
const loginInfoModel_1 = __importDefault(require("../models/loginInfoModel"));
// @desc    Register new user
// @route   POST /api/users
// @access  Public
const registerUser = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        res.status(400);
        throw new Error("Please add all fields");
    }
    // Check if user exists
    const userExists = yield userModel_1.default.findOne({ email });
    if (userExists) {
        res.status(400);
        throw new Error("User already exists");
    }
    // Hash password
    const salt = yield bcryptjs_1.default.genSalt(10);
    const hashedPassword = yield bcryptjs_1.default.hash(password, salt);
    // Create user
    const user = yield userModel_1.default.create({
        name,
        email,
        password: hashedPassword,
    });
    if (user) {
        res.status(201).json({
            _id: user.id,
            name: user.name,
            email: user.email,
            // @ts-ignore
            token: generateToken(user._id),
        });
    }
    else {
        res.status(400);
        throw new Error("Invalid user data");
    }
}));
exports.registerUser = registerUser;
// @desc    Authenticate a user
// @route   POST /api/users/login
// @access  Public
const loginUser = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password, browser, browserVersion, os, osVersion, device, ip, } = req.body;
    // Check for user email
    const user = yield userModel_1.default.findOne({ email });
    if (user && (yield bcryptjs_1.default.compare(password, user.password))) {
        // Create login info
        const loginInfo = yield loginInfoModel_1.default.create({
            userId: user._id,
            browser,
            browserVersion,
            os,
            osVersion,
            device,
            ip,
        });
        if (!loginInfo) {
            res.status(400);
            throw new Error("Invalid login info");
        }
        res.json({
            _id: user.id,
            name: user.name,
            email: user.email,
            // @ts-ignore
            token: generateToken(user._id),
        });
    }
    else {
        res.status(400);
        throw new Error("Invalid credentials");
    }
}));
exports.loginUser = loginUser;
// @desc    Get user data
// @route   GET /api/users/me
// @access  Private
const getMe = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // @ts-ignore
    res.status(200).json(req.user);
}));
exports.getMe = getMe;
// Generate JWT
const generateToken = (id) => {
    // @ts-ignore
    return jsonwebtoken_1.default.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: "30d",
    });
};
