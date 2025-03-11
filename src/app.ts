import express from 'express';
import mongoose from 'mongoose';

import dotenv from 'dotenv';
import helmet from 'helmet';
import router from './routes/routes';
import { requestLogger, errorLogger } from './middlewares/logger';
import addUserToRequest from './middlewares/userMiddleware';
import { errorHandler } from './middlewares/errorHandler';

const app = express();

dotenv.config();
const { PORT, MONGODB_URL } = process.env;
mongoose.set('strictQuery', true);
mongoose.connect(String(MONGODB_URL));

app.use(express.urlencoded({ extended: false })); // подключаем middleware для парсинга urlencoded
app.use(express.json()); // подключаем middleware для парсинга json
app.use(helmet()); // подключаем helmet для защиты от известных веб-уязвимостей
app.use(requestLogger); // подключаем логер запросов
app.use(addUserToRequest); // подключаем middleware для добавления пользователя в запрос
app.use('/', router); // запускаем роутер
app.use(errorLogger); // подключаем логер ошибок
app.use(errorHandler); // подключаем middleware для обработки ошибок
app.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}`);
});

export default app;
