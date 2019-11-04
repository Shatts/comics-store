import dotenv from 'dotenv';
import { google } from 'googleapis';

dotenv.config();
const {
  googleClientId,
  googleClientSecret,
  googleRedirectLink,
} = process.env;

export const oauth2Client = new google.auth.OAuth2(
  googleClientId,
  googleClientSecret,
  googleRedirectLink,
);

export const scopes = [
  'https://www.googleapis.com/auth/blogger',
  'https://www.googleapis.com/auth/calendar',
  'https://www.googleapis.com/auth/userinfo.email',
];

export const url = oauth2Client.generateAuthUrl({
  // 'online' (default) or 'offline' (gets refresh_token)
  access_type: 'offline',
  scope: scopes,
});
