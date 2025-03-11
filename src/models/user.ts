import mongoose from "mongoose";
// Опишем схему:
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  about: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
    required: true,
  }
});

// создаём модель и экспортируем её
export default mongoose.model('user', userSchema); 