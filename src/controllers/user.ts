import { Request, Response } from "express";
import User from '../models/user';
import { STATUS_CODES, ERROR_MESSAGES } from '../utils/constants';

// Получить пользователя по ID
export const getUserById = (req: Request, res: Response) => {
  const {userId} = req.params;

  User.findById(userId)
    .then((user) => {
      if (!user) {
        return res.status(STATUS_CODES.NOT_FOUND)
          .send({ message: ERROR_MESSAGES.USER_NOT_FOUND });
      }
      res.send(user);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(STATUS_CODES.BAD_REQUEST)
          .send({ message: ERROR_MESSAGES.BAD_REQUEST });
      } else {
        res.status(STATUS_CODES.INTERNAL_SERVER_ERROR)
          .send({ message: ERROR_MESSAGES.INTERNAL_SERVER_ERROR });
      }
    });
};

// Получить всех пользователей
export const getAllUsers = (req: Request, res: Response) => {
  User.find({})
    .then((users) => res.send(users))
    .catch(() => res.status(STATUS_CODES.INTERNAL_SERVER_ERROR)
      .send({ message: ERROR_MESSAGES.INTERNAL_SERVER_ERROR }));
};

// Создать пользователя
export const createUser = (req: Request, res: Response) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then((user) => res.status(STATUS_CODES.CREATED).send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(STATUS_CODES.BAD_REQUEST)
          .send({ message: ERROR_MESSAGES.BAD_REQUEST });
      } else {
        res.status(STATUS_CODES.INTERNAL_SERVER_ERROR)
          .send({ message: ERROR_MESSAGES.INTERNAL_SERVER_ERROR });
      }
    });
};

// Обновить профиль пользователя
export const updateUserProfile = (req: Request, res: Response) => {
  const { name, about } = req.body;
  const userId = req.user?._id as string; 


  User.findByIdAndUpdate(
    {_id:userId},
    { name, about },
    { new: true, runValidators: true }
  )
    .then((user) => {
      if (user) {
        res.send(user);
      } else {
        res.status(STATUS_CODES.NOT_FOUND)
          .send({ message: ERROR_MESSAGES.USER_NOT_FOUND });
      }
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(STATUS_CODES.BAD_REQUEST)
          .send({ message: ERROR_MESSAGES.BAD_REQUEST });
      } else {
        res.status(STATUS_CODES.INTERNAL_SERVER_ERROR)
          .send({ message: ERROR_MESSAGES.INTERNAL_SERVER_ERROR });
      }
    });
};



// Обновить аватар пользователя
export const updateUserAvatar = (req: Request, res: Response) => {
  const { avatar } = req.body;
  const userId = req.user?._id as string;


  User.findByIdAndUpdate(
    {_id:userId},
    { avatar },
    { new: true, runValidators: true }
  )
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(STATUS_CODES.BAD_REQUEST)
          .send({ message: ERROR_MESSAGES.BAD_REQUEST });
      } else {
        res.status(STATUS_CODES.INTERNAL_SERVER_ERROR)
          .send({ message: ERROR_MESSAGES.INTERNAL_SERVER_ERROR });
      }
    });
};
