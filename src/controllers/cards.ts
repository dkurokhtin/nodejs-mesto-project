import { Request, Response, NextFunction } from 'express';
import Card from '../models/cards';
import { STATUS_CODES, ERROR_MESSAGES } from '../utils/constants';
import { CastErrorHandler } from '../middlewares/errorHandler';

// Получить все карточки
export const getAllCards = (req: Request, res: Response, next: NextFunction) => {
  Card.find({})
    .then((cards) => res.send(cards))
    .catch(() => next({
      status: STATUS_CODES.INTERNAL_SERVER_ERROR,
      message: ERROR_MESSAGES.INTERNAL_SERVER_ERROR,
    }));
};

// Создать карточку
export const createCard = (req: Request, res:Response, next: NextFunction) => {
  const { name, link } = req.body;
  const owner = req.user?._id;

  Card.create({ name, link, owner })
    .then((card) => {
      if (!card) {
        return next({
          status: STATUS_CODES.BAD_REQUEST,
          message: ERROR_MESSAGES.BAD_REQUEST,
        });
      }
      return res.send(card);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next({
          status: STATUS_CODES.BAD_REQUEST,
          message: ERROR_MESSAGES.BAD_REQUEST,
        });
      } else {
        next({
          status: STATUS_CODES.INTERNAL_SERVER_ERROR,
          message: ERROR_MESSAGES.INTERNAL_SERVER_ERROR,
        });
      }
    });
};

// Удалить карточку
export const deleteCard = (req: Request, res: Response, next: NextFunction) => {
  const { cardId } = req.params;
  Card.findByIdAndDelete({ _id: cardId })
    .then((card) => {
      if (card) {
        res.send(card);
      } else {
        next({
          status: STATUS_CODES.NOT_FOUND,
          message: ERROR_MESSAGES.CARD_NOT_FOUND,
        });
      }
    })
    .catch((err) => {
      CastErrorHandler(err, next);
    });
};

// Добавить лайк
export const addLike = (req: Request, res: Response, next: NextFunction) => {
  const { cardId } = req.params;
  const userId = req.user?._id;

  Card.findByIdAndUpdate(
    { _id: cardId },
    { $addToSet: { likes: userId } },
    { new: true },
  )
    .then((card) => {
      if (card) {
        res.send(card);
      } else {
        next({
          status: STATUS_CODES.NOT_FOUND,
          message: ERROR_MESSAGES.INVALID_CARD_ID,
        });
      }
    })
    .catch((err) => {
      CastErrorHandler(err, next);
    });
};

// Удалить лайк
export const deleteLike = (req: Request, res:Response, next: NextFunction) => {
  const { cardId } = req.params;
  const userId = req.user?._id;

  Card.findByIdAndUpdate(
    { _id: cardId },
    { $pull: { likes: userId } },
    { new: true },
  )
    .then((card) => {
      if (card) {
        res.send(card);
      } else {
        next({
          status: STATUS_CODES.NOT_FOUND,
          message: ERROR_MESSAGES.INVALID_CARD_ID,
        });
      }
    })
    .catch((err) => {
      CastErrorHandler(err, next);
    });
};
