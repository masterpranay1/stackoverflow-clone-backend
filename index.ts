import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/db';
import { errorHandler } from "./middleware/errorMiddleware";

dotenv.config();

connectDB();

const app: Express = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req: Request, res: Response) => {
  res.send('Express + TypeScript Server');
});

app.use(errorHandler);

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
