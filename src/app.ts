import express from 'express';
import router from './routes';
import mongoose from 'mongoose';
import { requestLogger, errorLogger } from './middlewares/logger';
import { errors } from 'celebrate';
import helmet from 'helmet';
import { addUserToRequest } from './middlewares/userMiddleware';
const app = express();
const { PORT = 3000 , MONGODB_URL = 'mongodb://localhost:27017/mydb' } = process.env;
mongoose.set('strictQuery', true); 
mongoose.connect(MONGODB_URL);


app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(helmet()); 
app.use(requestLogger); // подключаем логер запросов

app.use(addUserToRequest);

app.use('/', router); // запускаем роутер

app.use(errorLogger); // подключаем логер ошибок
app.use(errors()); // обработчик ошибок celebrate

app.use(express.static('public'));



app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
