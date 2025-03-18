import express from 'express';
import mongoose from 'mongoose';

import dotenv from 'dotenv';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import errorHandler from './middlewares/errorHandler';
import router from './routes/routes';
import { requestLogger, errorLogger } from './middlewares/logger';

const app = express();
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // за 15 минут
  max: 100, // можно совершить максимум 100 запросов с одного IP
});

dotenv.config();
const { PORT, MONGODB_URL } = process.env;
mongoose.set('strictQuery', true);
mongoose.connect(String(MONGODB_URL));

app.use(express.urlencoded({ extended: false })); // подключаем middleware для парсинга urlencoded
app.use(express.json()); // подключаем middleware для парсинга json
app.use(limiter); // подключаем rateLimit для защиты от DDOS атак
app.use(helmet()); // подключаем helmet для защиты от известных веб-уязвимостей
app.use(requestLogger); // подключаем логер запросов

app.use('/', router); // запускаем роутер
app.use(errorLogger); // подключаем логер ошибок
app.use(errorHandler); // подключаем middleware для обработки ошибок
app.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}`);
});

export default app;
