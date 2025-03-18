import Joi from 'joi';
import { celebrate } from 'celebrate';
import { URL_REGEX } from '../utils/constants';

const userBaseSchema = Joi.object().keys({
  email: Joi.string().required().email(),
  password: Joi.string().required(),
});

const cardParams = Joi.object().keys({
  cardId: Joi.string().required().hex().length(24),
});

const userParams = Joi.object().keys({
  userId: Joi.string().required().hex().length(24),
});

export const getUserByIdSchema = celebrate({
  params: userParams,
});

export const signupSchema = celebrate({
  body: userBaseSchema.keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(200),
    avatar: Joi.string().pattern(URL_REGEX),
  }),
});

export const signinSchema = celebrate({
  body: userBaseSchema,
});

export const deleteCardSchema = celebrate({
  params: cardParams,
});

export const deleteLikeSchema = celebrate({
  params: cardParams,
});
export const addLikeSchema = celebrate({
  params: cardParams,
});
export const updateProfileSchema = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    about: Joi.string().min(2).max(200).required(),
  }),
});

export const updateAvatarSchema = celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required().pattern(URL_REGEX),
  }),
});

export const createCardSchema = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().pattern(URL_REGEX),
  }),
});
