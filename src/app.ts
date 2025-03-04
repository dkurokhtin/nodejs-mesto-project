import express, {Request,Response,NextFunction} from 'express';

import router from '../src/routes/routes'; // импортируем роутер

// Слушаем 3000 порт
const { PORT = 3000 } = process.env;

const app = express();

app.use('/', router); // запускаем роутер

// app.use((req: Request, res: Response, next: NextFunction) => {
//     req.user = {
//       _id: '5d8b8592978f8bd833ca8133' // вставьте сюда _id созданного в предыдущем пункте пользователя
//     };
  
//     next();
//   }); 

app.listen(PORT, () => {
    // Если всё работает, консоль покажет, какой порт приложение слушает
    console.log(`App listening on port ${PORT}`)
}) 