class Authorization {
  constructor(accessToken, expirationTime, refreshToken) {
    this.accessToken = accessToken;
    this.expirationTime = expirationTime;
    this.refreshToken = refreshToken;
  }
}

export default Authorization;
