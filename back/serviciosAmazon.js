const https = require('https');
const hostService = process.env.endpoint;


/*
  Funcion encargada de crear un certificado valido.
*/
function crearCertificado( body, token) {
    return new Promise((resolve, reject) => {

        console.log("body ==> ", body);
        console.log("hostService ==> ", hostService);
        console.log("servicio  ==> ", hostService + "/dev/certificados");
  
            let options = {
                hostname: hostService ,
                port: 443,
                path: "/" + process.env.ENV + "/certificados/",
                method: 'POST',
                rejectUnauthorized: false,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                },
                body: body
            };

            let respuesta = '';
            let req = https.request(options, (res) => {
                
                    console.log('Respuesta servicio tierra statusCode:', res.statusCode);
                    
                    /*if( res.statusCode != 200 && res.statusCode != 201){
                        console.log("Error al tratar de consumir el servicio tierra");
                        return("Por el momento no podemos atender su consulta");
                    }*/
                res.on('data', (d) => {
                    respuesta += d;
                });
            }).on('error', (error) => {     
                console.error(error);
                reject(error);
            });

            req.write(JSON.stringify(body));
            req.on('close', () => {

                console.log("respuesta ==> ", respuesta);
                let salida = JSON.parse(respuesta);
                resolve(salida);
            });
            req.end();
        })
        .catch((error) => {
            console.log(error, 'Error en promesa crearCertificado');
        });
}

/*
  Funcion encargada de crear un certificado valido.
*/
function buscarCertificado(id, token) {
    return new Promise((resolve, reject) => {

            let options = {
                //hostname: host,
                hostname: hostService,
                port: 443,
                path:  "/" + process.env.ENV + "/certificados/"+ id,
                method: 'GET',
                rejectUnauthorized: false,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                },
            };

            let respuesta = '';
            let req = https.request(options, (res) => {
                
                    console.log('Respuesta servicio tierra statusCode:', res.statusCode);
                   
                    if( res.statusCode != 200 && res.statusCode != 201){
                        console.log("Error al tratar de consumir el servicio tierra");
                        return("Por el momento no podemos atender su consulta");
                    }
                  
                res.on('data', (d) => {
                    respuesta += d;
                });

            }).on('error', (error) => {
                console.error(error);
                reject(error);
            });

            req.on('close', () => {
                let salida = JSON.parse(respuesta);
                //----------------------------Corregir salida en servicio web--------------------------------------//
                resolve(salida);
            });
            req.end();
        })
        .catch((error) => {
            console.log(error, 'Error en promesa validarCliente');
        });
}



/*
  Funcion encargada de crear un certificado valido.
*/
function listarCertificado(token) {
    return new Promise((resolve, reject) => {

            let options = {
                //hostname: host,
                hostname: hostService,
                port: 443,
                path: "/" + process.env.ENV + "/listacertificados",
                method: 'GET',
                rejectUnauthorized: false,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                },
            };

            let respuesta = '';
            let req = https.request(options, (res) => {
                
                    console.log('Respuesta servicio tierra statusCode:', res.statusCode);
                   
                    if( res.statusCode != 200 && res.statusCode != 201){
                        
                        console.log("Error al tratar de consumir el servicio tierra", JSON.stringify(res));
                        return("Por el momento no podemos atender su consulta");
                    }
                  
                res.on('data', (d) => {
                    respuesta += d;
                });
            }).on('error', (error) => {
                console.error(error);
                reject(error);
            });

            req.on('close', () => {

                let salida = JSON.parse(respuesta);
                //----------------------------Corregir salida en servicio web--------------------------------------//
                resolve(salida);
            });
            req.end();
        })
        .catch((error) => {
            console.log(error, 'Error en promesa validarCliente');
        });
}

exports.listarCertificado = listarCertificado;
exports.crearCertificado  = crearCertificado;
exports.buscarCertificado = buscarCertificado;
