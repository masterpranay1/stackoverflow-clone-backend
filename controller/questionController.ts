import { Request, Response } from 'express';
import { Document } from 'mongoose';
import QuestionModel from "../models/questionModel";

const createQuestion = async (req: Request, res: Response) => {
  try {
    const {
      title,
      description,
      tags,
    } = req.body;

    // @ts-ignore
    const userId = req.user._id;

    const newQuestion = new QuestionModel({
      title,
      description,
      tags,
      userId,
    });

    const savedQuestion: Document = await newQuestion.save();
    console.log(savedQuestion);
    res.status(201).json(savedQuestion);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while creating the question.' });
  }
};

export { createQuestion };
