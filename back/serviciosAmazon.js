const https = require('https');
const hostService = process.env.HOSTNUBE;



function consultaCuentaMonex(id,formulario,fechaDesde,fechaHasta, saldo, dv, token) {
    return new Promise((resolve, reject) => {
        
    var respServicio = {
      codeStatus: "",
      respuesta: ""
    };

            let options = {
                //hostname: host,
                hostname: hostService,
                port: 443,
                // path:  "/" + process.env.ENV + '/servicios-recaudacion/v1/monex/cuentasme?in_usuario=1' +
                // '&in_id_sistema=1&in_cliente_tipo=1&in_rut_rol=' + id  ,
                path:  "/" + process.env.ENV +  '/servicios-recaudacion/v1/monex/cuentasme?in_usuario=1&in_id_sistema=1' + 
                '&in_cliente_tipo=1&in_rut_rol=' + id + '&in_rut_dv=' + dv + '&in_form_tipo=' + formulario +
                '&in_saldo='+ saldo +'&in_fecha_vcto_desde=' + fechaDesde +'&in_fecha_vcto_hasta='+ fechaHasta,
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
                   respServicio.codeStatus = res.statusCode
                    if( res.statusCode != 200 && res.statusCode != 201){
                        console.log("Error al tratar de consumir el servicio tierra");
                        // return("Por el momento no podemos atender su consulta");
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
                 respServicio.respuesta = salida
                //----------------------------Corregir salida en servicio web--------------------------------------//
                resolve(respServicio);
            });
            req.end();
        })
        .catch((error) => {
            console.log(error, 'Error en promesa validarCliente');
        });
}

function consultaMovimiento(id, token) {
    return new Promise((resolve, reject) => {
    var respServicio = {
      codeStatus: "",
      respuesta: ""
    };

            let options = {
                //hostname: host,
                hostname: hostService,
                port: 443,
                path:  "/" + process.env.ENV + '/servicios-recaudacion/v1/monex/movsme?idCta='+ id,
                // path:  "/" + 'dev' + '/servicios-recaudacion/v1/monex/movsme?idCta='+ id,
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
                   respServicio.codeStatus = res.statusCode
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
                 respServicio.respuesta = salida
                //----------------------------Corregir salida en servicio web--------------------------------------//
                resolve(respServicio);
            });
            req.end();
        })
        .catch((error) => {
            console.log(error, 'Error en promesa validarCliente');
        });
}





function consultaItem(id, token) {
    return new Promise((resolve, reject) => {
    var respServicio = {
      codeStatus: "",
      respuesta: ""
    };

            let options = {
                //hostname: host,
                hostname: hostService,
                port: 443,
                path:  "/" + process.env.ENV + '/servicios-recaudacion/v1/monex/itemsme?idMov='+ id,
                // path:  "/" + 'dev' + '/servicios-recaudacion/v1/monex/movsme?idCta='+ id,
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
                   respServicio.codeStatus = res.statusCode
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
                 respServicio.respuesta = salida
                //----------------------------Corregir salida en servicio web--------------------------------------//
                resolve(respServicio);
            });
            req.end();
        })
        .catch((error) => {
            console.log(error, 'Error en promesa validarCliente');
        });
}


function consultaCuentaMonexFolio(form, folio, token) {
    return new Promise((resolve, reject) => {
        
    var respServicio = {
      codeStatus: "",
      respuesta: ""
    };

            let options = {
                //hostname: host,
                hostname: hostService,
                port: 443,
                path:  "/" + process.env.ENV + '/servicios-recaudacion/v1/monex/cuentasme?in_usuario=1' +
                '&in_id_sistema=1&in_form_tipo=' + form + '&in_form_folio=' + folio,
                // path:  "/" + 'dev' + '/servicios-recaudacion/v1/monex/cuentasme?in_usuario=1' +
                // '&in_id_sistema=1&in_cliente_tipo=1&in_rut_rol=' + id  ,
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
                   respServicio.codeStatus = res.statusCode
                    if( res.statusCode != 200 && res.statusCode != 201){
                        console.log("Error al tratar de consumir el servicio tierra");
                        // return("Por el momento no podemos atender su consulta");
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
                 respServicio.respuesta = salida
                //----------------------------Corregir salida en servicio web--------------------------------------//
                resolve(respServicio);
            });
            req.end();
        })
        .catch((error) => {
            console.log(error, 'Error en promesa validarCliente');
        });
}





exports.consultaCuentaMonex  = consultaCuentaMonex;
exports.consultaMovimiento = consultaMovimiento;
exports.consultaItem = consultaItem;
exports.consultaCuentaMonexFolio = consultaCuentaMonexFolio;

