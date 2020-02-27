// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  
 apiNube: 'https://wnrssq4u4c.execute-api.us-east-1.amazonaws.com/dev', 
 // apiNube: 'BUILD_API_ENDPOINT',
  
  cognito: { 
   authorizeURL: 'BUILD_AUTH_AUTHORIZE_URL', 
   logoutURL: 'BUILD_AUTH_LOGOUT_URL', 
   clientId: 'BUILD_AUTH_CLIENT_ID', 
   redirectUri: 'BUILD_APP_REDIRECT_LOGIN_URL', 
   logoutUri: 'BUILD_APP_REDIRECT_LOGOUT_URL', 
   jwtCookieName: 'tgr-jwt', 
   expCookieName: 'exp', 
   allowCookies: true, 
  },
  
  
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
