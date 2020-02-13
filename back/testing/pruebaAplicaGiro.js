process.env.REST_TOKEN_CLIENT_ID= "4i65ld3cq12ddnp2th47g359os";
process.env.REST_TOKEN_SCOPE= "tgr-dev-api-servicios-cut/all";
process.env.REST_TOKEN_CLIENT_SECRET= "67gpaamp8fp5387o6gfke7op4nt11dpfll94portn907sh6fpa";
process.env.REST_TOKEN_GRANT_TYPE ="client_credentials" ;
process.env.HOST_TOKEN = "id-dev.tegere.info";
process.env.HOSTNUBE = "jx1wukpm36.execute-api.us-east-1.amazonaws.com"
// process.env.BUCKET_NAME="tgr-dev-api-certificados-data";
process.env.ENV = "dev";
const crear = require('../aplicarGiros');


console.log('Inicio de funcion');
let event = {"body": "{\"inMontoSwift\": 798798,\r\n \"inFechaOrdenPago\": \"\",\r\n\"inFechaDeposito\": \"\",\r\n\"inOrdenante\": \"\",\r\n\"inRemesa\": \"\",\r\n\"inBanco\": \"\",\r\n\"inNroOrdenPago\": \"\",\r\n    \"inListaArs\": \"400633;410116;410120;410122;410468\",\r\n    \"inMontoAplicar\": 0\r\n}"};

crear.handler(event, null, ()=>{});
