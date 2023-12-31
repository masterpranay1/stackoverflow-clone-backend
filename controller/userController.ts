import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import asyncHandler from "express-async-handler";
import User from "../models/userModel";
import LoginInfo from "../models/loginInfoModel";

// @desc    Register new user
// @route   POST /api/users
// @access  Public
const registerUser = asyncHandler(async (req: Request, res: Response) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Please add all fields");
  }

  // Check if user exists
  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  // Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // Create user
  const user = await User.create({
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
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

// @desc    Authenticate a user
// @route   POST /api/users/login
// @access  Public
const loginUser = asyncHandler(async (req: Request, res: Response) => {
  const {
    email,
    password,
    browser,
    browserVersion,
    os,
    osVersion,
    device,
    ip,
  } = req.body;

  // Check for user email
  const user = await User.findOne({ email });

  if (user && (await bcrypt.compare(password, user.password))) {

    // Create login info
    const loginInfo = await LoginInfo.create({
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
    // set the access-control-allow-orign header to the frontend url
    // @ts-ignore
    res.header("Access-Control-Allow-Origin", 'https://stackoverflow-clone-frontend.onrender.com');
    res.json({
      _id: user.id,
      name: user.name,
      email: user.email,
      // @ts-ignore
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid credentials");
  }
});

// @desc    Get user data
// @route   GET /api/users/me
// @access  Private
const getMe = asyncHandler(async (req: Request, res: Response) => {
  // @ts-ignore
  res.status(200).json(req.user);
});

// Generate JWT
const generateToken = (id: string) => {
  // @ts-ignore
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

export { registerUser, loginUser, getMe };
