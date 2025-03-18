import mongoose, { Model, Document, ObjectId } from 'mongoose';
import bcrypt from 'bcryptjs';
import { ERROR_MESSAGES, STATUS_CODES } from '../utils/constants';
import { CustomError } from '../errors/CustomError';

interface IUser extends Document {
  _id: ObjectId;
  email: string;
  password: string;
  name?: string;
  about?: string;
  avatar?: string;
}
interface UserModel extends Model<IUser> {
  // eslint-disable-next-line
  findUserByCredentials: (email: string, password: string) => Promise<Document<unknown, any, IUser>>;
}
// Опишем схему:
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  name: {
    type: String,
    required: false,
    minlength: 2,
    maxlength: 30,
    default: 'Жак-Ив Кусто',
  },
  about: {
    type: String,
    required: false,
    default: 'Исследователь',
  },
  avatar: {
    type: String,
    required: false,
    default: `https://pictures.s3.yandex.net/resources/images/avatar${Math.random()}`,
  },
});

userSchema.index({ email: 1 }, { unique: true }); // Создаём уникальный индекс для email

userSchema.static('findUserByCredentials', function findUserByCredentials(email: string, password: string) {
  // eslint-disable-next-line max-len
  return this.findOne({ email }).select('+password').orFail(new CustomError(STATUS_CODES.UNAUTHORIZED, ERROR_MESSAGES.INVALID_CREDENTIALS))
    .then((user:IUser) => bcrypt.compare(password, user.password)
      .then((matched) => {
        if (!matched) {
          // eslint-disable-next-line max-len
          return Promise.reject(new CustomError(STATUS_CODES.UNAUTHORIZED, ERROR_MESSAGES.INVALID_CREDENTIALS));
        }

        return user;
      }));
});

export default mongoose.model<IUser, UserModel>('user', userSchema);
