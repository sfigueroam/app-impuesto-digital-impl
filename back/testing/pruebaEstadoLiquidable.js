process.env.REST_TOKEN_CLIENT_ID= "4i65ld3cq12ddnp2th47g359os";
process.env.REST_TOKEN_SCOPE= "tgr-dev-api-servicios-cut/all";
process.env.REST_TOKEN_CLIENT_SECRET= "67gpaamp8fp5387o6gfke7op4nt11dpfll94portn907sh6fpa";
process.env.REST_TOKEN_GRANT_TYPE ="client_credentials" ;
process.env.HOST_TOKEN = "id-dev.tegere.info";
process.env.HOSTNUBE = "jx1wukpm36.execute-api.us-east-1.amazonaws.com"
// process.env.BUCKET_NAME="tgr-dev-api-certificados-data";
process.env.ENV = "dev";
const crear = require('../consultaEstadoMov');


console.log('Inicio de funcion');
let event = {"body": "{\"inIdConsulta\": \"1\", \"inListaIds\": \"4800,4801,4802\"}"};

crear.handler(event, null, ()=>{});
