import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import User from '../models/userModel';

const protect = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  let token;
  console.log(req.headers);
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      // Get token from header
      token = req.headers.authorization.split(' ')[1];

      // Verify token
      // @ts-ignore
      const decoded: any = jwt.verify(token, process.env.JWT_SECRET); // Use 'any' if you don't have a specific type for the decoded object

      // Get user from the token
      // @ts-ignore
      req.user = await User.findById(decoded.id).select('-password');

      next();
    } catch (error) {
      console.log(error);
      res.status(401);
      throw new Error('Not authorized');
    }
  }

  if (!token) {
    res.status(401);
    throw new Error('Not authorized, no token');
  }
});

export { protect };
