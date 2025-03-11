import mongoose from 'mongoose';
// Опишем схему:
const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  link: {
    required: true,
    type: String,
  },
  likes: {
    type: Array,
    required: true,
    default: [],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  about: {
    type: String,
    required: true,
  },
});

// создаём модель и экспортируем её
export default mongoose.model('card', cardSchema);
