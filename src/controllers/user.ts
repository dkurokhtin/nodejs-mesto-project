import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/user';
import { STATUS_CODES, ERROR_MESSAGES } from '../utils/constants';
import { BadRequestError } from '../errors/BadRequest';
import { ConflictError } from '../errors/ConflictError';
import { NotFoundError } from '../errors/NotFoundError';
import { CustomError } from '../errors/CustomError';

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

export const createUser = (req: Request, res: Response, next: NextFunction) => {
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
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new ConflictError(ERROR_MESSAGES.CONFLICT));
      } else {
        next(err);
      }
    });
};

// Получить пользователя по ID
export const getUserById = (req: Request, res: Response, next: NextFunction) => {
  const { userId } = req.params;

  User.findById(userId).orFail(new NotFoundError(ERROR_MESSAGES.USER_NOT_FOUND))
    .then((user) => {
      res.send(user);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError(ERROR_MESSAGES.INVALID_USER_ID));
      } else {
        next(err);
      }
    });
};

export const getCurrentUser = (req: Request, res: Response, next: NextFunction) => {
  const { _id } = req.user;
  User.findById(_id).orFail(new NotFoundError(ERROR_MESSAGES.USER_NOT_FOUND))
    .then((user) => {
      res.send(user);
    })
    .catch(next);
};

// Получить всех пользователей
export const getAllUsers = (req: Request, res: Response, next: NextFunction) => {
  User.find({}).orFail(new CustomError(STATUS_CODES.NOT_FOUND, 'Коллекция пользователей не найдена'))
    .then((users) => res.send(users))
    .catch(next);
};

// Обновить профиль пользователя
export const updateUserProfile = (req: Request, res: Response, next: NextFunction) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(
    { _id: req.user._id },
    { name, about },
    { new: true, runValidators: true },
  ).orFail(new NotFoundError(ERROR_MESSAGES.USER_NOT_FOUND))
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError(ERROR_MESSAGES.BAD_REQUEST));
      } else {
        next(err);
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
  ).orFail(new NotFoundError(ERROR_MESSAGES.USER_NOT_FOUND))
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError(ERROR_MESSAGES.INVALID_URL));
      } else {
        next(err);
      }
    });
};
