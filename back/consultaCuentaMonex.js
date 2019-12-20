'use strict';
const servAmazon = require('./serviciosAmazon');
const genToken = require('./genToken');

module.exports.handler = async (event, context, callback) => {

    var In = JSON.parse(event.body);
    var rut = In['data']['identificacion']
    
    rut = rut.replace(/-/g , "");
    rut = rut.replace(/\./g , "");
    rut = rut.substring(0,rut.length-1)
    console.log('tgr-consultaCuentaMonex . JSON de Entrada:' , In);
    

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
    
    let salida = await servAmazon.consultaCuentaMonex(rut,token);
    console.log("Resultado Final:", salida);
    console.log("[FIN PROCESO]");
    
    
    // let data = [{
    //     "idCta" : 1234,
    //     "rutCta": 18365,
    //     "DvRutCta": '7',
    //     "FormaCta" : 21,
    //     "FolioCta": 12548,
    //     "MonedaCta": 3,
    //     "FechaVctoCta": '2019-11-21',
    //     "SaldoCta": 300,
    //     "FechaGiroCta": '2019-10-12',
    //     "NombreContrib": 'Importadora Smith'
    // },
    // { "idCta" : '789',
    //     "rutCta": 987,
    //     "DvRutCta": 4,
    //     "FormaCta" : 3,
    //     "FolioCta": 487,
    //     "MonedaCta": 3,
    //     "FechaVctoCta": '2019-11-14',
    //     "SaldoCta": 9788,
    //     "FechaGiroCta": '2019-10-18',
    //     "NombreContrib": 'Importadora Smith'}]

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