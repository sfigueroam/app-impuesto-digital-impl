const https = require('https');
const hostService = process.env.HOSTNUBE;
const hostServiceP = process.env.HOSTNUBE_PERFILES;



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


function consultaCuentaMonexFolio(folio,formulario,fechaDesde,fechaHasta,saldo, token) {
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
                // '&in_id_sistema=1&in_form_tipo=' + form + '&in_form_folio=' + folio,
                path:  "/" + process.env.ENV +  '/servicios-recaudacion/v1/monex/cuentasme?in_usuario=1&in_id_sistema=1' + 
                '&in_cliente_tipo=1&in_form_tipo=' + formulario + '&in_form_folio=' + folio + 
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


function consultaPerfil(idApp, idUsuario, token) {
    return new Promise((resolve, reject) => {
        
    var respServicio = {
      codeStatus: "",
      respuesta: ""
    };

            let options = {
                //hostname: host,
                hostname: hostServiceP,
                port: 443,
                path:  "/" + process.env.ENV +  '/info-perfiles/v1/roles/usuarios/' + idUsuario + '?aplicacion=' + idApp ,
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

function consultaEstadoLiquidables (token, json) {
  
  console.log('este es el json en servicios nube' + JSON.stringify(json));
 
  return new Promise((resolve, reject) => {
    
    var respServicio = {
      codeStatus: "",
      respuesta: ""
    };
    
    let options = {
      hostname: hostService,
      port: 443,
      path: '/' + process.env.ENV + '/servicios-recaudacion/v1/monex-liquidacion/liquidacuentas', //PARAMETRIZAR v1
      method: 'POST',
      rejectUnauthorized: false,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer '+token,
        "Content-Length": JSON.stringify(json).length
      }
    };

    let respuesta='';
    let estadoHttp='';
    let req = https.request(options, (res) => {
      
      console.log('statusCode:', res.statusCode);
      
      estadoHttp=res.statusCode;
      respServicio.codeStatus = res.statusCode;
      //guardado de dato obtenidos en respuesta
      res.on('data', (d) => {
        respuesta+=d;
        
      });
      
    }).on('error', (error) => {
      console.error(error);
      reject(error);
    });
    
    //terminado el request parsear la respuesta y entra al primer if donde lo devuelve a la promesa
    req.on('close', () => {
        respuesta = JSON.parse(respuesta);
        respServicio.respuesta = respuesta;
        console.log('respuesta en nube', respuesta);
        resolve(respServicio);
    });
    req.write(JSON.stringify(json));
    req.end();
  });
}





exports.consultaCuentaMonex  = consultaCuentaMonex;
exports.consultaMovimiento = consultaMovimiento;
exports.consultaItem = consultaItem;
exports.consultaCuentaMonexFolio = consultaCuentaMonexFolio;
exports.consultaPerfil = consultaPerfil;
exports.consultaEstadoLiquidables = consultaEstadoLiquidables;

