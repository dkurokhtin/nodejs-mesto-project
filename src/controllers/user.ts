import { Request, Response, NextFunction } from 'express';
import User from '../models/user';
import { STATUS_CODES, ERROR_MESSAGES } from '../utils/constants';
import { CastErrorHandler } from '../middlewares/errorHandler';

// Получить пользователя по ID
export const getUserById = (req: Request, res: Response, next: NextFunction) => {
  const { userId } = req.params;

  User.findById(userId)
    .then((user) => {
      if (!user) {
        return next({ status: STATUS_CODES.NOT_FOUND, message: ERROR_MESSAGES.USER_NOT_FOUND });
      }
      return res.send(user);
    })
    .catch((err) => {
      CastErrorHandler(err, next);
    });
};

// Получить всех пользователей
export const getAllUsers = (req: Request, res: Response, next: NextFunction) => {
  User.find({})
    .then((users) => res.send(users))
    .catch(() => next({
      status: STATUS_CODES.INTERNAL_SERVER_ERROR,
      message: ERROR_MESSAGES.INTERNAL_SERVER_ERROR,
    }));
};

// Создать пользователя
export const createUser = (req: Request, res: Response, next: NextFunction) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then((user) => res.status(STATUS_CODES.CREATED).send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next({ status: STATUS_CODES.BAD_REQUEST, message: ERROR_MESSAGES.BAD_REQUEST });
      } else {
        next({
          status: STATUS_CODES.INTERNAL_SERVER_ERROR,
          message: ERROR_MESSAGES.INTERNAL_SERVER_ERROR,
        });
      }
    });
};

// Обновить профиль пользователя
export const updateUserProfile = (req: Request, res: Response, next: NextFunction) => {
  const { name, about } = req.body;
  const userId = req.user?._id as string;
  User.findByIdAndUpdate(
    { _id: userId },
    { name, about },
    { new: true, runValidators: true },
  )
    .then((user) => {
      if (user) {
        res.send(user);
      } else {
        next({ status: STATUS_CODES.NOT_FOUND, message: ERROR_MESSAGES.USER_NOT_FOUND });
      }
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next({ status: STATUS_CODES.BAD_REQUEST, message: ERROR_MESSAGES.BAD_REQUEST });
      } else {
        next({
          status: STATUS_CODES.INTERNAL_SERVER_ERROR,
          message: ERROR_MESSAGES.INTERNAL_SERVER_ERROR,
        });
      }
    });
};

// Обновить аватар пользователя
export const updateUserAvatar = (req: Request, res: Response, next: NextFunction) => {
  const { avatar } = req.body;
  const userId = req.user?._id as string;

  User.findByIdAndUpdate(
    { _id: userId },
    { avatar },
    { new: true, runValidators: true },
  )
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next({ status: STATUS_CODES.BAD_REQUEST, message: ERROR_MESSAGES.BAD_REQUEST });
      } else {
        next({
          status: STATUS_CODES.INTERNAL_SERVER_ERROR,
          message: ERROR_MESSAGES.INTERNAL_SERVER_ERROR,
        });
      }
    });
};
