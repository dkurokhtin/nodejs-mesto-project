import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/user';
import { STATUS_CODES, ERROR_MESSAGES } from '../utils/constants';

export const login = (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;
  const { JWT_SECRET } = process.env;
  User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        String(JWT_SECRET),
        { expiresIn: '7d' },
      );
      res.send({ token });
    })
    .catch(next);
};

export const signup = (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;
  return bcrypt.hash(password, 10)
    .then((hash: string) => User.create({
      email,
      password: hash,
    }))
    .then((user) => {
      res.status(STATUS_CODES.CREATED).send({
        _id: user._id,
        email: user.email,
      });
    })
    .catch(next);
};

// Получить пользователя по ID
export const getUserById = (req: Request, res: Response, next: NextFunction) => {
  const { userId } = req.params;

  User.findById(userId)
    .then((user) => {
      res.send(user);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next({ status: STATUS_CODES.BAD_REQUEST, message: ERROR_MESSAGES.BAD_REQUEST });
      } else {
        next({
          status: STATUS_CODES.INTERNAL_SERVER_ERROR,
          message: ERROR_MESSAGES.INTERNAL_SERVER_ERROR,
        });
      }
    });
};

export const getCurrentUser = (req: Request, res: Response, next: NextFunction) => {
  const { _id } = req.user;
  User.findById(_id).orFail(new Error('NotFound'))
    .then((user) => {
      res.send(user);
    })
    .catch(next);
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

  User.create({
    name, about, avatar, owner: req.user._id,
  })
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
  User.findByIdAndUpdate(
    { _id: req.user._id },
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
  User.findByIdAndUpdate(
    { _id: req.user._id },
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
