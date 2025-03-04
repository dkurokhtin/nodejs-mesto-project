import { Router, Request, Response } from "express";
import { users } from '../../db'; // данные нужны для роутинга, поэтому импортируем их

const router = Router(); // создали роутер

export default router.get('/users/:id', (req: Request, res: Response) => {
  // хорошая практика: явно привести типы
  // индекс в массиве - число, поэтому приводим к Number
  const id = Number(req.params.id);
  if (!users[id]) {
    res.send(`Такого пользователя не существует`);
    return;
  }

  const { name, age } = users[id];
  
  res.send(`Пользователь ${name}, ${age} лет`);
});