import { google } from 'googleapis';
import { googleConfig } from '../models/google.config.js';
import { defaultScope } from '../models/google.config.js';

export class GoogleAuth {
  createConnection() {
    return new google.auth.OAuth2(
      googleConfig.clientId,
      googleConfig.clientSecret,
      googleConfig.redirect,
    );
  }

  getConnectionUrl(auth) {
    return auth.generateAuthUrl({
      access_type: 'offline',
      prompt: 'consent',
      scope: defaultScope,
    });
  }

  getGooglePlusApi(auth) {
    return google.plus({ version: 'v1', auth });
  }

  urlGoogle() {
    const auth = this.createConnection();
    return this.getConnectionUrl(auth);
  }

  async getGoogleAccountFromCode(code) {
    const data = await auth.getToken(code);
    const tokens = data.tokens;
    const auth = this.createConnection();
    auth.setCredentials(tokens);
    const plus = this.getGooglePlusApi(auth);
    const me = await plus.people.get({ userId: 'me' });
    const userGoogleId = me.data.id;
    const userGoogleEmail = me.data.emails && me.data.emails.length && me.data.emails[0].value;
    return {
      id: userGoogleId,
      email: userGoogleEmail,
      tokens: tokens,
    };
  }
}
