process.env.REST_TOKEN_CLIENT_ID_PERFILES= "1ecebr1cfu6pjrro9c4q3k0fdd";
process.env.REST_TOKEN_SCOPE_PERFILES= "tgr-dev-api-info-perfiles/all";
process.env.REST_TOKEN_CLIENT_SECRET_PERFILES= "eskdjj1rvr8jhb24n33fh260neae3iufcmpsl3tlpheg49soobu";
process.env.REST_TOKEN_GRANT_TYPE_PERFILES ="client_credentials" ;
process.env.HOST_TOKEN = "id-dev.tegere.info";
process.env.HOSTNUBE_PERFILES = "tnqhfbrkek.execute-api.us-east-1.amazonaws.com"
// process.env.BUCKET_NAME="tgr-dev-api-certificados-data";
process.env.ENV = "dev";
const crear = require('../consultaPerfilamiento');


console.log('Inicio de funcion');
let event = {"pathParameters": {"idUsuario":"jmoraT"} , "queryStringParameters" : {"aplicacion" : "361"}};

crear.handler(event, null, ()=>{});