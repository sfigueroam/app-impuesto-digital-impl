export const environment = {
  production: true,
  cognito: {
    authorizeURL: 'BUILD_AUTHORIZE_URL',
    logoutURL: 'BUILD_LOGOUT_URL',
    clientId: 'BUILD_CLIENT_ID',
    redirectUri: 'BUILD_REDIRECT_URI',
    logoutUri: 'BUILD_LOGOUT_URI',
    jwtCookieName: 'tgr-jwt',
    expCookieName: 'exp',
    allowCookies: true,
  }
};


