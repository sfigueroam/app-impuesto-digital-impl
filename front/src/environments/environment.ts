// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  
   apiNube: 'https://wnrssq4u4c.execute-api.us-east-1.amazonaws.com/dev', 
//   apiNube: 'BUILD_API_ENDPOINT',
  
    cognito: { 
     authorizeURL: 'https://autentica-dev.tegere.info/oauth2/authorize', 
     logoutURL: 'https://autentica-dev.tegere.info/logout', 
     clientId: '2ous0l73nn5h3enldboi04ktn6', 
     redirectUri: 'https://impuesto-digital-dev.tegere.info/login', 
     logoutUri: 'https://impuesto-digital-dev.tegere.info/logout', 
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
