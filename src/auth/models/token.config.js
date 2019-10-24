import dotenv from 'dotenv';

// toDO: move to app.js
dotenv.config();

export const {
  ISSUER,
  AUDIENCE,
  tokenExpirationInMilliSec,
  refreshTokenExpirationInMilliSec,
  SECRET_KEY,
} = process.env;
