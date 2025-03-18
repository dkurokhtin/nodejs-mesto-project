export const URL_REGEX = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\\+.~#?&//=]*)/;
export const STATUS_CODES = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
  UNAUTHORIZED: 401,
  CONFLICT: 409,
} as const;

export const ERROR_MESSAGES = {
  DUPLICATE_EMAIL: 'Пользователь с таким email уже существует',
  NOT_FOUND: 'Запрашиваемый ресурс не найден',
  BAD_REQUEST: 'Переданы некорректные данные',
  INTERNAL_SERVER_ERROR: 'На сервере произошла ошибка',
  CARD_NOT_FOUND: 'Карточка с указанным _id не найдена',
  INVALID_CARD_ID: 'Некорректный ID карточки',
  USER_NOT_FOUND: 'Пользователь с указанным _id не найден',
  INVALID_USER_ID: 'Некорректный ID пользователя',
  UNAUTHORIZED: 'Необходима авторизация',
  INVALID_EMAIL: 'Неверный формат email',
  INVALID_PASSWORD: 'Неверный пароль',
  INVALID_CREDENTIALS: 'Неправильные почта или пароль',
  FORBIDDEN: 'Недостаточно прав для удаления карточки',
  CONFLICT: 'Пользователь с таким email уже существует',
  USER_COLLECTION_NOT_FOUND: 'Коллекция пользователей не найдена',
  CARD_COLLECTION_NOT_FOUND: 'Коллекция карточек не найдена',
  INVALID_URL: 'Неправильный url avatar',
} as const;
