import mongoose from 'mongoose';
import databaseUserName, { RolesEnum } from './user.helper.js';

const { Schema } = mongoose;
const Token = new Schema({
  token: {
    type: String,
    required: true,
  },
  expirationDate: {
    type: Date,
    required: true,
  },
});
// toDO: implement bullet-proof work with indexes (unique: true)
const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    // plus write decorators for data-sanitization for client-requests
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
    enum: [RolesEnum.user, RolesEnum.admin],
    default: RolesEnum.user,
  },
  salt: {
    type: String,
    required: true,
  },
  refreshToken: Token,
}, { timestamps: true });

const User = mongoose.model(databaseUserName, userSchema);

export default User;
