
process.env.REST_TOKEN_CLIENT_ID= "35nv2hboh2n83geo9k0jk6j4fu";
process.env.REST_TOKEN_SCOPE= "tgr-dev-api-certificados/all";
process.env.REST_TOKEN_CLIENT_SECRET= "3s3v8fcod4kv5qm0e9789sr0sr0hfgtsr0cgas7pum0s876dmtt";
process.env.REST_TOKEN_GRANT_TYPE ="client_credentials" ;
process.env.HOST_NUBE = "id-dev.tegere.info";
process.env.endpoint = "zop1awucw7.execute-api.us-east-1.amazonaws.com"
process.env.BUCKET_NAME="tgr-dev-api-certificados-data";

const crear = require('../getPropertyVista');


console.log('Inicio de funcion');
let event = {};

crear.handler(event, null, ()=>{});
