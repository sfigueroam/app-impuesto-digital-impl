'use strict';
const servAmazon = require('./serviciosAmazon');
const genToken = require('./genToken');

module.exports.handler = async (event, context, callback) => {
    console.log(event.body);
    
    var In = JSON.parse(event.body);

    console.log('Datos recibidos del Front', In)

    
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
    
    let dummy = [
 {
   "idCta": 115685,
   "clienteTipo": 1,
   "rutRol": 90160000,
   "formTipo": 21,
   "formFolio": 3561357,
   "fechaVcto": "2017-02-28",
   "montoNeto": 126063.07,
   "intereses": 68074.06,
   "multas": 75637.84,
   "reajustes": 0,
   "condonacion": 0,
   "montoTotal": 269774.97,
   "liquidable": "S",
   "codigoBarra": "0205010000062002290211201K"
 },
 {
   "idCta": 115687,
   "clienteTipo": 1,
   "rutRol": 90160000,
   "formTipo": 21,
   "formFolio": 3561403,
   "fechaVcto": "2017-05-30",
   "montoNeto": 719781.41,
   "intereses": 367088.52,
   "multas": 431868.85,
   "reajustes": 0,
   "condonacion": 0,
   "montoTotal": 1518738.78,
   "liquidable": "S",
   "codigoBarra": "02050100000720022902111215"
 }
]
    
    let salida = {
        respuesta : dummy,
        codeStatus: 200
    }
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