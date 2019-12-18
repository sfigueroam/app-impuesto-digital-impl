'use strict';
const servAmazon = require('./serviciosAmazon');
const genToken = require('./genToken');

module.exports.handler = async (event, context, callback) => {

    // var In = JSON.parse(event.body);
    // console.log('tgr-certificado-api crearCertificado. JSON de Entrada:' , In);
    

    console.log("[INICIO PROCESO] Iniciando consulta a servicios");
    
    // let clienteId = process.env.REST_TOKEN_CLIENT_ID;
    // let scope = process.env.REST_TOKEN_SCOPE;
    // let clientSecret = process.env.REST_TOKEN_CLIENT_SECRET;
    // let grantType = process.env.REST_TOKEN_GRANT_TYPE;
    // let token;
    
    // try{
    //     token = await genToken.obtenerToken(clienteId,scope,clientSecret,grantType);
    //     console.log("tokenGenerico calculado");
    // } catch(err){
    //     console.log('Error al generar token nube', err);
    // }
    
    // let salida = await servAmazon.crearCertificado(In,token);
    // console.log("Resultado Final:", salida);
    // console.log("[FIN PROCESO]");
    let data = [{
             "idCta": 30566879,
           "idMov": 5432267,
           "TipoMov": "cargo",
           "EstadoMov": "vigente",
           "FechaMov": 2019-11-20,
           "FormTipo": 21,
           "Folio": 3456784,
           "MonedaOrigen": "USD",
           "MontoMov": 300,
           "MonedaPago": '3' ,
           "PeriodoContab": 201911,
           "comuna": "Santiago",
           "MovOrigen": 0
    },
    {       "idCta": 30566879,
           "idMov": 5432267,
           "TipoMov": "cargo",
           "EstadoMov": "vigente",
           "FechaMov": 2019-11-20,
           "FormTipo": 21,
           "Folio": 3456784,
           "MonedaOrigen": "USD",
           "MontoMov": 300,
           "MonedaPago":  '2',
           "PeriodoContab": 201911,
           "comuna": "Santiago",
           "MovOrigen": 0}]
    
    let salida = data;
    

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