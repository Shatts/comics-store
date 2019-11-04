import dotenv from 'dotenv';
import { google } from 'googleapis';

// toDO: this method must be somewhere at the beginning of app.js
dotenv.config();
const {
  googleClientId,
  googleClientSecret,
  googleRedirectLink,
} = process.env;

// toDO: better to be specific at what kind of object you return
// you can have multiple oauth clients in your app
// in this case isn't it better to call it googleOauthClient or something?
export const oauth2Client = new google.auth.OAuth2(
  googleClientId,
  googleClientSecret,
  googleRedirectLink,
);

// toDO: better to be more specific for exported vars
export const scopes = [
  'https://www.googleapis.com/auth/blogger',
  'https://www.googleapis.com/auth/calendar',
  'https://www.googleapis.com/auth/userinfo.email',
];

// toDO: better to be more specific for exported vars
// 'url' is too general
export const url = oauth2Client.generateAuthUrl({
  // 'online' (default) or 'offline' (gets refresh_token)
  access_type: 'offline',
  scope: scopes,
});
