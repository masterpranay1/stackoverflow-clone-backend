import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/db';
import { errorHandler } from "./middleware/errorMiddleware";
import userRoutes from './routes/userRoutes';
import questionRoutes from './routes/questionRoutes';
import cors from 'cors';

dotenv.config();

connectDB();

const app: Express = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
  origin: 'http://localhost:5173',
}));

app.use('/api/users', userRoutes);
app.use('/api/questions', questionRoutes);

app.get('/', (req: Request, res: Response) => {
  res.send('Express + TypeScript Server');
});

app.use(errorHandler);

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
