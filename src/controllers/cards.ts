import { Request, Response } from 'express';
import Card from '../models/cards';
import { STATUS_CODES, ERROR_MESSAGES } from '../utils/constants';

// Получить все карточки
export const getAllCards = (req: Request, res: Response) => {
  Card.find({})
    .then((cards) => res.send(cards))
    .catch(() => res.status(STATUS_CODES.INTERNAL_SERVER_ERROR)
      .send({ message: ERROR_MESSAGES.INTERNAL_SERVER_ERROR }));
};

// Создать карточку
export const createCard = (req: Request, res:Response) => {
  const { name, link } = req.body;
  const owner = req.user?._id;

  Card.create({ name, link, owner })
    .then((card) => Card.findById(card._id).populate('owner'))
    .then((cardWithOwner) => {
      if (!cardWithOwner) {
        return res.status(STATUS_CODES.NOT_FOUND)
          .send({ message: ERROR_MESSAGES.CARD_NOT_FOUND });
      }
      res.send(cardWithOwner);
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

// Удалить карточку
export const deleteCard = (req: Request, res: Response) => {
  const { cardId } = req.params;
  Card.findByIdAndDelete({_id:cardId})
    .then((card) => {
      if (card) {
        res.send(card);
      } else {
        res.status(STATUS_CODES.NOT_FOUND)
          .send({ message: ERROR_MESSAGES.NOT_FOUND });
      }
    })
    .catch((err) => res.status(STATUS_CODES.BAD_REQUEST)
      .send({ message: ERROR_MESSAGES.BAD_REQUEST }));
};

// Добавить лайк
export const addLike = (req: Request, res: Response) => {
  const {cardId} = req.params;
  const userId = req.user?._id;

  Card.findByIdAndUpdate(
    {  _id:cardId },
    { $addToSet: { likes: userId } },
    { new: true }
  )
    .then((card) => {
      if (card) {
        res.send(card);
      } else {
        res.status(STATUS_CODES.NOT_FOUND)
          .send({ message: ERROR_MESSAGES.NOT_FOUND});
      }
    })
    .catch((err) => res.status(STATUS_CODES.BAD_REQUEST)
      .send({ message: ERROR_MESSAGES.NOT_FOUND}));
};

// Удалить лайк
export const deleteLike = (req: Request, res:Response) => {
  const { cardId } = req.params;
  const userId = req.user?._id;

  Card.findByIdAndUpdate(
    {  _id:cardId },
    { $pull: { likes: userId } },
    { new: true }
  )
    .then((card) => {
      if (card) {
        res.send(card);
      } else {
        res.status(STATUS_CODES.NOT_FOUND)
          .send({ message: ERROR_MESSAGES.NOT_FOUND });
      }
    })
    .catch((err) => res.status(STATUS_CODES.BAD_REQUEST)
      .send({ message: ERROR_MESSAGES.BAD_REQUEST }));
};