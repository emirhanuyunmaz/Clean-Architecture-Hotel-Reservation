import express, { Express, Request, Response , Application } from 'express';
import dotenv from 'dotenv';


dotenv.config(); // .env dosyası için.

const app: Application = express();
const port = process.env.PORT || 8000;

app.get('/', (req: Request, res: Response) => {
  res.send('TypeScript Server');
});

app.listen(port, () => {
  console.log(`Server is Fire at http://localhost:${port}`);
});