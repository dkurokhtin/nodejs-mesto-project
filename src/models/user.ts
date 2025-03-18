import mongoose, { Model, Document, ObjectId } from 'mongoose';
import bcrypt from 'bcryptjs';

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
    validate: {
      validator: (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v),
      message: 'Неверный формат email',
    },
  },
  password: {
    type: String,
    required: true,
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
    default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604386755.png',
  },
});

userSchema.index({ email: 1 }, { unique: true }); // Создаём уникальный индекс для email

userSchema.static('findUserByCredentials', function findUserByCredentials(email: string, password: string) {
  return this.findOne({ email })
    .then((user:IUser) => {
      if (!user) {
        return Promise.reject(new Error('Неправильные почта или пароль'));
      }

      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return Promise.reject(new Error('Неправильные почта или пароль'));
          }

          return user;
        });
    });
});

export default mongoose.model<IUser, UserModel>('user', userSchema);
