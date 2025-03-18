import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import { errors } from 'celebrate';
import cors from 'cors';
import errorHandler from './middlewares/errorHandler';
import router from './routes/routes';
import { requestLogger, errorLogger } from './middlewares/logger';

const app = express();
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});

dotenv.config();
const { PORT = 3000, MONGODB_URL = 'mongodb://localhost:27017/mestodb' } = process.env;
mongoose.set('strictQuery', true);
mongoose.connect(String(MONGODB_URL));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(limiter);
app.use(helmet());
app.use(cors());
app.use(requestLogger);

app.use('/', router);
app.use(errorLogger);
app.use(errors());
app.use(errorHandler);
app.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}`);
});

export default app;
