import { google } from 'googleapis';
import { googleConfig } from '../models/google.config.js';
import { defaultScope } from '../models/google.config.js';

export class GoogleAuth {
  // toDO: simplify this co 'connect', maybe?
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

  // toDO: method name must start with verb
  urlGoogle() {
    const auth = this.createConnection();
    return this.getConnectionUrl(auth);
  }

  // toDO: perhaps 'by' is more suitable than 'from' here, don't you think?
  // getGoogleAccountFromCode => getGoogleAccountByCode
  // because code id not the source of data, but a key
  async getGoogleAccountFromCode(code) {
    // toDO: finalize this code
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
