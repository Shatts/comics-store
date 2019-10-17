import dotenv from 'dotenv';

dotenv.config();

export const {
  ISSUER,
  AUDIENCE,
  tokenExpirationInMilliSec,
  refreshTokenExpirationInMilliSec,
  SECRET_KEY,
} = process.env;
