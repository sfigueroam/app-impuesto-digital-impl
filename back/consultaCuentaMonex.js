'use strict';
const servAmazon = require('./serviciosAmazon');
const genToken = require('./genToken');

module.exports.handler = async (event, context, callback) => {
    console.log(event.body);
    
    var In = JSON.parse(event.body);
    var rut = In['identificacion'];
    var formulario = In['formulario'];
    var fechaDesde = In['fechaDesde'];
    var fechaHasta = In['fechaHasta'];
    var saldo = In['saldo'];
    
    if(fechaDesde == 'Invalid date' || fechaHasta == 'Invalid date'){
        fechaDesde = ''
        fechaHasta = ''
    }
    
    var dv = rut.substring(rut.length-1)
    
    rut = rut.replace(/-/g , "");
    rut = rut.replace(/\./g , "");
    rut = rut.substring(0,rut.length-1);
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
    let salida = await servAmazon.consultaCuentaMonex(rut,formulario,fechaDesde,fechaHasta, saldo, dv, token);
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