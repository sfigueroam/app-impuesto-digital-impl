
process.env.REST_TOKEN_CLIENT_ID= "4i65ld3cq12ddnp2th47g359os";
process.env.REST_TOKEN_SCOPE= "tgr-dev-api-servicios-cut/all";
process.env.REST_TOKEN_CLIENT_SECRET= "67gpaamp8fp5387o6gfke7op4nt11dpfll94portn907sh6fpa";
process.env.REST_TOKEN_GRANT_TYPE ="client_credentials" ;
process.env.HOST_TOKEN = "id-dev.tegere.info";
process.env.HOSTNUBE = "jx1wukpm36.execute-api.us-east-1.amazonaws.com"
// process.env.BUCKET_NAME="tgr-dev-api-certificados-data";
process.env.ENV = "dev";
const crear = require('../consultaCuentaMonex');


console.log('Inicio de funcion');
let event = {"body": "{\"identificacion\": \"99.588.400-3\",\"id\": {\"rut\": 66666666,\"dv\": \"6\" }}}"}

//nube:1AWS14110612w0jtpEiRE-cdcp

crear.handler(event, null, ()=>{});
