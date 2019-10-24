import mongoose from 'mongoose';
import databaseUserName from './user.helper.js';

// toDO: simplify and unify schema creation
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
// toDO: implement bullet-proof work with indexes (unique: true)
const userSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    // toDO: add trim/lowercase
    // plus write decorators for data-sanitization for client-requests
  },
  password: {
    type: String,
    required: true,
  },
  refreshToken: Token,
}, { timestamps: true });

const User = mongoose.model(databaseUserName, userSchema);

export default User;
