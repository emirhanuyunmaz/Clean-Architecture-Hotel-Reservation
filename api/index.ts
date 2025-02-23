import 'reflect-metadata';
import express, { Express, Request, Response, Application } from 'express';
import dotenv from 'dotenv';
import userRouter from './src/routes/userRoutes';
import { dbConnect } from './dbConnection';

dotenv.config(); // .env dosyası için.

const app: Application = express();
const port = process.env.PORT || 8000;

dbConnect();

app.use(express.json()); // Gelen verilerin JSON formatınada okunabilmesini sağlar
app.use('/user', userRouter);

app.get('/', (req: Request, res: Response) => {
  res.send('<h1>TypeScript Server</h1>');
});

app.listen(port, () => {
  console.log(`Server is Fire at http://localhost:${port}`);
});
