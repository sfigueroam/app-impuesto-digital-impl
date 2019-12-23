'use strict';
const servAmazon = require('./serviciosAmazon');
const genToken = require('./genToken');

module.exports.handler = async (event, context, callback) => {

    var In = event.pathParameters.mov
    console.log('idmov:' , In);
    

    console.log("[INICIO PROCESO] Iniciando consulta a servicios");
    
    // let clienteId = process.env.REST_TOKEN_CLIENT_ID;
    // let scope = process.env.REST_TOKEN_SCOPE;
    // let clientSecret = process.env.REST_TOKEN_CLIENT_SECRET;
    // let grantType = process.env.REST_TOKEN_GRANT_TYPE;
    
    let clienteId = '4i65ld3cq12ddnp2th47g359os';
    let scope =  "tgr-dev-api-servicios-cut/all";
    let clientSecret = "67gpaamp8fp5387o6gfke7op4nt11dpfll94portn907sh6fpa";
    let grantType = "client_credentials";
    
    
    let token;
    
    try{
        token = await genToken.obtenerToken(clienteId,scope,clientSecret,grantType);
        console.log("tokenGenerico calculado");
    } catch(err){
        console.log('Error al generar token nube', err);
    }
    
    let salida = await servAmazon.consultaMovimiento(In,token);
    console.log("Resultado Final:", salida);
    console.log("[FIN PROCESO]");

    

    const response = {
        statusCode: 201,
        body: JSON.stringify(salida),
        headers: {
            "Access-Control-Allow-Origin": "*", // Required for CORS support to work
            "Access-Control-Allow-Credentials": true, // Required for cookies, authorization headers with HTTPS
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        }
    };

    console.log('tgr-certificado-api createCertificado', 'response', response);
    callback(null, response);

};