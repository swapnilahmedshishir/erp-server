import express, { Request, Response } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import notFound from './middlewares/notFound';
import globalErrorHandler from './middlewares/globalErrorHandler';

const app = express();

app.use(cors());

app.use(express.json());

app.use(cookieParser());

app.use(morgan('dev'));

// Testing Route
app.get('/', (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: 'Server is running perfectly!',
  });
});

app.use(notFound);

app.use(globalErrorHandler);

export default app;
