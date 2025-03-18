import { Request, Response, NextFunction } from 'express';
import Card from '../models/cards';
import { ERROR_MESSAGES } from '../utils/constants';
import { InternalServerError } from '../errors/InternalServerError';
import { BadRequestError } from '../errors/BadRequest';
import { ForbiddenError } from '../errors/ForbiddenError';
import { NotFoundError } from '../errors/NotFoundError';
// Получить все карточки
export const getAllCards = (req: Request, res: Response, next: NextFunction) => {
  Card.find({})
    .then((cards) => res.send(cards))
    .catch(() => next(new InternalServerError(ERROR_MESSAGES.INTERNAL_SERVER_ERROR)));
};

// Создать карточку
export const createCard = (req: Request, res:Response, next: NextFunction) => {
  const { name, link } = req.body;

  Card.create({ name, link, owner: req.user._id })
    .then((card) => {
      if (!card) {
        return next(new BadRequestError(ERROR_MESSAGES.BAD_REQUEST));
      }
      return res.send(card);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError(ERROR_MESSAGES.BAD_REQUEST));
      } else {
        next(new InternalServerError(ERROR_MESSAGES.INTERNAL_SERVER_ERROR));
      }
    });
};

// Удалить карточку
export const deleteCard = (req: Request, res: Response, next: NextFunction) => {
  Card.findById(req.params.cardId)
    .orFail(new NotFoundError(ERROR_MESSAGES.CARD_NOT_FOUND))
    .then((card) => {
      if (card.owner.toString() !== req.user._id) {
        next(new ForbiddenError(ERROR_MESSAGES.FORBIDDEN));
      }
      return Card.deleteOne({ _id: card._id });
    })
    .then(() => res.send({ message: 'Карточка успешно удалена' }))
    .catch(next);
};

// Добавить лайк
export const addLike = (req: Request, res: Response, next: NextFunction) => {
  const { cardId } = req.params;
  const userId = req.user._id;

  Card.findByIdAndUpdate(
    { _id: cardId },
    { $addToSet: { likes: userId } },
    { new: true },
  )
    .then((card) => {
      if (card) {
        res.send(card);
      } else {
        next(new NotFoundError(ERROR_MESSAGES.INVALID_CARD_ID));
      }
    })
    .catch(next);
};

// Удалить лайк
export const deleteLike = (req: Request, res:Response, next: NextFunction) => {
  const { cardId } = req.params;
  const userId = req.user._id;

  Card.findByIdAndUpdate(
    { _id: cardId },
    { $pull: { likes: userId } },
    { new: true },
  )
    .then((card) => {
      if (card) {
        res.send(card);
      } else {
        next(new NotFoundError(ERROR_MESSAGES.INVALID_CARD_ID));
      }
    })
    .catch(next);
};
