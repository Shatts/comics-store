import mongoose from 'mongoose';
import databaseUserName from './user.helper.js';

const { Schema } = mongoose;
const Token = new mongoose.Schema({
  token: {
    type: String,
    required: true,
  },
  expirationDate: {
    type: Date,
    required: true,
  },
});
const userSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  refreshToken: Token,
}, { timestamps: true });

const User = mongoose.model(databaseUserName, userSchema);

export default User;
