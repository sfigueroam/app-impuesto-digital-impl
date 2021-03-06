'use strict';
const servAmazon = require('./serviciosAmazon');
const genToken = require('./genToken');

module.exports.handler = async (event, context, callback) => {
    console.log(event.body);
    
    var Ids = JSON.parse(event.body);
    
    console.log('Datos recibidos del Front', Ids)

    
    console.log("[INICIO PROCESO] Iniciando consulta a servicios");

    
    let clienteId = process.env.REST_TOKEN_CLIENT_ID;
    let scope = process.env.REST_TOKEN_SCOPE;
    let clientSecret = process.env.REST_TOKEN_CLIENT_SECRET;
    let grantType = process.env.REST_TOKEN_GRANT_TYPE;
    
    
    let token;
    
    try{
        token = await genToken.obtenerToken(clienteId,scope,clientSecret,grantType);
        console.log("tokenGenerico calculado");
    } catch(err){
        console.log('Error al generar token nube', err);
    }
    
    let salida = await servAmazon.consultaEstadoLiquidables(token,Ids);
    console.log('resultado invocacion',salida)

    console.log("Resultado Final:", salida);
    console.log("[FIN PROCESO]");
    send(salida.codeStatus,salida.respuesta,callback)
    

function send(httpCode, resultado, callback) { 
    const response = { 
        statusCode: httpCode, 
        headers: { 
            "Access-Control-Allow-Origin": "*", // Required for CORS support to work 
            "Access-Control-Allow-Credentials": true, // Required for cookies, authorization headers with HTTPS 
            'Accept': 'application/json, text/plain, */*', 
            'Content-Type': 'application/json' 
        } 
    }; 
 
    if (httpCode) { 
        response.body = JSON.stringify(resultado); 
        
    }
    console.log('ests es la rpta', response);
    callback(null, response); 
}

};