package controllers;

import java.io.IOException;
import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Types;
import java.util.ArrayList;
import java.util.Collection;

import javax.servlet.http.HttpServletResponse;
import javax.validation.Valid;

import org.springframework.http.MediaType;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import config.DBConnection;
import entities.AplicaPagoMonexInVO;
import entities.AplicaPagoMonexOutVO;
import entities.GetCutCtaMonexOutCursorVO;
import entities.GetCutItmMonexOutCursorVO;
import entities.GetCutMovMonexOutCursorVO;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import oracle.jdbc.OracleTypes; 

@RestController
public class MonexController {

    @ApiOperation(value = "Objetivo rescatar desde tablas CUT Monex cuentas, según parámetros solicitados.", notes = "En todos los casos los párametros 'in_usuario' y 'in_id_sistema' son obligatorios: \n A) Se puede ocupar enviando los párametros 'in_cliente_tipo' y 'in_rut_rol', el resto de los campos son opcionales. \n B) Se puede ocupar con los párametros obligatorios 'in_form_tipo' y 'in_form_folio', el resto de los parametros son opcionales.", tags = { "Consultas" })
    @ApiResponses(value = {
    		@ApiResponse(code = 200, message = "", response=GetCutCtaMonexOutCursorVO.class),
    		@ApiResponse(code = 404, message = "Not Found") })
    @GetMapping(value = "/monex/v1/cuentasme", produces = "application/json")
    public Collection<GetCutCtaMonexOutCursorVO> cuentasme(
    	      @RequestParam(value="in_usuario", required = true) String in_usuario, 
    	      @RequestParam(value="in_id_sistema", required = true) String in_id_sistema,
    		  @RequestParam(value="in_cliente_tipo", required = false) String in_cliente_tipo,
    		  @RequestParam(value="in_rut_rol", required = false) String in_rut_rol, 
    		  @RequestParam(value="in_rut_dv", required = false) String in_rut_dv, 
    		  @RequestParam(value="in_form_tipo", required = false) String in_form_tipo, 
    		  @RequestParam(value="in_form_folio", required = false) String in_form_folio, 
    		  @RequestParam(value="in_moneda", required = false) String in_moneda, 
    		  @RequestParam(value="in_fecha_vcto", required = false) String in_fecha_vcto, 
    		  @RequestParam(value="in_periodo", required = false) String in_periodo, 
    		  @RequestParam(value="in_saldo", required = false) String in_saldo, 
    		  @RequestParam(value="in_fecha_vcto_desde", required = false) String in_fecha_vcto_desde, 
    		  @RequestParam(value="in_fecha_vcto_hasta", required = false) String in_fecha_vcto_hasta, 
	  HttpServletResponse res) throws IOException {

	  CallableStatement stmt = null;
	  Connection con = null;
	  ResultSet rs = null;
	  Collection<GetCutCtaMonexOutCursorVO> lista  = new ArrayList<GetCutCtaMonexOutCursorVO>();

  	  if ( isNumeric(in_usuario) == false || in_usuario.trim() == "" || isNumeric(in_id_sistema) == false || in_id_sistema.trim() == "" ) {
  		  res.sendError(400,"Datos insuficientes para la consulta.");
  		  return lista;
  	  }else if ((StringUtils.isEmpty(in_cliente_tipo) || StringUtils.isEmpty(in_rut_rol))) {
  		  if ((StringUtils.isEmpty(in_form_tipo) || StringUtils.isEmpty(in_form_folio))) {
  			  res.sendError(400,"Datos insuficientes para la consulta.");
  	  		  return lista;
  	  	  }else if (isNumeric(in_form_tipo) == false || in_form_tipo.trim() == "" || isNumeric(in_form_folio) == false || in_form_folio.trim() == "") {
  	  		  res.sendError(400,"Datos insuficientes para la consulta.");
  	  		  return lista;
  	  	  }
  	  }else if (isNumeric(in_cliente_tipo) == false || in_cliente_tipo.trim() == "" || isNumeric(in_rut_rol) == false || in_rut_rol.trim() == "") {
  		  res.sendError(400,"Datos insuficientes para la consulta.");
  		  return lista;
	  }
  	  
  	  try {
  		  GetCutCtaMonexOutCursorVO vo;
  		  con = DBConnection.getConnection();
  		  stmt  = con.prepareCall("{call pkg_cut_monex_srv_api.get_cut_cta_monex(?,?,?,?,?,?,?,?,?,?,?,?,?,?)}");
  		  stmt.setString(1,in_usuario);
  		  stmt.setString(2,in_id_sistema);
  		  stmt.setString(3,in_cliente_tipo);
  		  stmt.setString(4,in_rut_rol);
  		  stmt.setString(5,in_rut_dv);
  		  stmt.setString(6,in_form_tipo); 
  		  stmt.setString(7,in_form_folio); 
  		  stmt.setString(8,in_moneda); 
  		  stmt.setString(9,in_fecha_vcto); 
  		  stmt.setString(10,in_periodo); 
  		  stmt.setString(11,in_saldo); 
  		  stmt.setString(12,in_fecha_vcto_desde); 
  		  stmt.setString(13,in_fecha_vcto_hasta); 
  		  stmt.registerOutParameter(14, OracleTypes.CURSOR);
  		  stmt.execute();
  		  try {
  			  rs = (ResultSet) stmt.getObject(14);
  			  while (rs.next()) {
  				  vo = new GetCutCtaMonexOutCursorVO();
  				  vo.setId(rs.getBigDecimal("ID"));
  				  vo.setRutRol(rs.getBigDecimal("RUT_ROL"));
  				  vo.setRutDv(rs.getString("RUT_DV"));
  				  vo.setFormTipo(rs.getBigDecimal("FORM_TIPO"));
  				  vo.setFormFolio(rs.getBigDecimal("FORM_FOLIO"));
  				  vo.setMoneda(rs.getString("MONEDA"));
  				  vo.setFechaVcto(rs.getString("FECHA_VCTO"));
  				  vo.setSaldo(rs.getBigDecimal("SALDO"));
  				  vo.setFechaGiro(rs.getString("FECHA_GIRO"));
  				  vo.setNombreContribuyente(rs.getString("NOMBRE_CONTRIBUYENTE"));
  				  lista.add(vo);	      
  			  }
  		  } finally {
  			  rs.close();
  		  } 
  	  } catch (SQLException e ) {
  		  e.printStackTrace();
  		  res.sendError(500, e.toString());
  	  } finally {
  		  if (stmt != null) {
  			  try {
  				  stmt.close();
  				  con.close();
  			  } catch (SQLException e) {
  				  //TODO Auto-generated catch block
  				  e.printStackTrace();
  				  res.sendError(500, e.toString());
  			  }
  		  }
  	  }
	  
  	  if (lista.isEmpty())
  		  res.sendError(404,"No existen datos para el rut o folio.");

  	  return lista;
  }

  @ApiOperation(value = "Objetivo rescatar desde tablas CUT Monex movimiento asociado a una cuenta seleccionada .", notes = "Objetivo rescatar desde tablas CUT Monex movimiento asociado a una cuenta seleccionada.", tags = { "Consultas" })
  @ApiResponses(value = {
		  @ApiResponse(code = 200, message = "", response=GetCutMovMonexOutCursorVO.class),
		  @ApiResponse(code = 404, message = "Not Found") })
  @GetMapping(value = "/monex/v1/movimientosme", produces = MediaType.APPLICATION_JSON_VALUE)
//  @RequestMapping(value="/monex/v1/movimientosme", method=RequestMethod.GET, produces = "application/json")
  public Collection<GetCutMovMonexOutCursorVO> movimientosme(@RequestParam(value="idCta", required = true) String idCta, HttpServletResponse res) throws IOException {
	  CallableStatement stmt = null;
	  Connection con = null;
	  ResultSet rs = null;
	  Collection<GetCutMovMonexOutCursorVO> lista  = new ArrayList<GetCutMovMonexOutCursorVO>();

  	  if ( isNumeric(idCta) == false || idCta.trim() == "") {
  		  res.sendError(400,"Datos insuficientes para la consulta.");
	  }else {
		  try {
			  GetCutMovMonexOutCursorVO vo;
			  con = DBConnection.getConnection();

			  stmt  = con.prepareCall("{call pkg_cut_monex_srv_api.get_cut_mov_monex(?,?)}");
			  stmt.setString(1, idCta);
			  stmt.registerOutParameter(2, OracleTypes.CURSOR);
			  stmt.execute();
			  try {
			      rs = (ResultSet) stmt.getObject(2);
			      while (rs.next()) {
			          vo = new GetCutMovMonexOutCursorVO();
			          vo.setCuenta(rs.getBigDecimal("CUENTA"));
			          vo.setId(rs.getBigDecimal("ID"));
			          vo.setMovTipo(rs.getString("MOV_TIPO"));
			          vo.setEstado(rs.getString("ESTADO"));
			          vo.setFecha(rs.getString("FECHA"));
			          vo.setFormTipo(rs.getBigDecimal("FORM_TIPO"));
			          vo.setFormFolio(rs.getBigDecimal("FORM_FOLIO"));
			          vo.setFechaVcto(rs.getString("FECHA_VCTO"));
			          vo.setFormVersion(rs.getString("FORM_VERSION"));
			          vo.setMonedaOrigen(rs.getString("MONEDA_ORIGEN"));
			          vo.setMonto(rs.getBigDecimal("MONTO"));
			          vo.setMonedaPago(rs.getString("MONEDA_PAGO"));
			          vo.setMontopago(rs.getBigDecimal("MONTOPAGO"));
			          vo.setPeriodoContab(rs.getTimestamp("PERIODO_CONTAB")==null?null:new java.util.Date(rs.getTimestamp("PERIODO_CONTAB").getTime()));
			          vo.setComuna(rs.getString("COMUNA"));
			          vo.setOriginal(rs.getBigDecimal("ORIGINAL"));
			          lista.add(vo);		      
			      }
			  } finally {
				  rs.close();
			  } 
		  } catch (SQLException e ) {
			  e.printStackTrace();
			  res.sendError(500, e.toString());
		  } finally {
			  if (stmt != null) {
				  try {
					  stmt.close();
					  con.close();
				  } catch (SQLException e) {
					  //TODO Auto-generated catch block
					  e.printStackTrace();
					  res.sendError(500, e.toString());
				  }
			  }
		  }
	  }
  	  if (lista.isEmpty()) 
  		  res.sendError(404,"No existen datos para el ID cuenta.");
	  return lista;
  }

  @ApiOperation(value = "Objetivo rescatar desde tablas CUT Monex ítems asociados a un movimiento seleccionado.", notes = "Objetivo rescatar desde tablas CUT Monex ítems asociados a un movimiento seleccionado.", tags = { "Consultas" })
  @ApiResponses(value = {
		  @ApiResponse(code = 200, message = "", response=GetCutItmMonexOutCursorVO.class),
		  @ApiResponse(code = 404, message = "Not Found") })
  @GetMapping(value = "/monex/v1/itemsme", produces = MediaType.APPLICATION_JSON_VALUE)
  public Collection<GetCutItmMonexOutCursorVO> itemsme(@RequestParam(value="idMov", required = true) String idMov, HttpServletResponse res) throws IOException {
	  CallableStatement stmt = null;
	  Connection con = null;
	  ResultSet rs = null;
	  Collection<GetCutItmMonexOutCursorVO> lista  = new ArrayList<GetCutItmMonexOutCursorVO>();

  	  if ( isNumeric(idMov) == false || idMov.trim() == "") {
		  res.sendError(400,"Datos insuficientes para la consulta.");
	  }else {
	  
		  try {
			  GetCutItmMonexOutCursorVO vo;
			  con = DBConnection.getConnection();
			  stmt  = con.prepareCall("{call pkg_cut_monex_srv_api.get_cut_itm_monex(?,?)}");
			  stmt.setString(1, idMov);
			  stmt.registerOutParameter(2, OracleTypes.CURSOR);
			  stmt.execute();
			  try {
			      rs = (ResultSet) stmt.getObject(2);
			      while (rs.next()) {
			    	  vo = new GetCutItmMonexOutCursorVO();
			    	  vo.setMov(rs.getBigDecimal("MOV"));
			    	  vo.setCodigo(rs.getBigDecimal("CODIGO"));
			    	  vo.setDescripcion(rs.getString("DESCRIPCION"));
			    	  vo.setValor(rs.getString("VALOR"));
			    	  lista.add(vo);
			      }
			  } finally {
				  rs.close();
			  } 
		  } catch (SQLException e ) {
			  e.printStackTrace();
			  res.sendError(500, e.toString());
		  } finally {
			  if (stmt != null) {
				  try {
					  stmt.close();
					  con.close();
				  } catch (SQLException e) {
					  //TODO Auto-generated catch block
					  e.printStackTrace();
					  res.sendError(500, e.toString());
				  }
			  }
		  }
	  }
  	  if (lista.isEmpty()) 
  		  res.sendError(404,"No existen datos para el ID de movimiento.");
	  return lista;
  }

  @ApiOperation(value = "Aplica pago en cuentas desde tablas CUT Monex.", notes = "A) Se puede ocupar enviando sólo el párametro 'inMontoSwift'. \n B) Se puede ocupar con los párametros obligatorios 'inMontoSwift', 'inMontoAplicar' y 'inListaArs' (códigos de barras separados por ;), el resto de los parametros son opcionales.", tags = { "Consultas" })
  @ApiResponses(value = {
		  @ApiResponse(code = 200, message = "", response=AplicaPagoMonexOutVO.class),
		  @ApiResponse(code = 404, message = "Not Found") 
  })
  @PostMapping(path = "/monex/v1/aplicapago", consumes = "application/json", produces = "application/json")
  public AplicaPagoMonexOutVO aplicapago(@Valid @RequestBody AplicaPagoMonexInVO inParams, HttpServletResponse res) throws IOException {
	  CallableStatement stmt = null;
	  Connection con = null;
	  AplicaPagoMonexOutVO voOut =  new AplicaPagoMonexOutVO(); 
	  
	  if ( inParams.getInListaArs() == null && inParams.getInMontoAplicar() == null  ) { // Valida que si no vienen estos campos siga su curso solo con el parametro inMontoSwift (campo obligatorio)
	  		  
	  } else if ( ( inParams.getInListaArs() != null && inParams.getInMontoAplicar() == null ) || ( inParams.getInListaArs() == null && inParams.getInMontoAplicar() != null ) ) { //Valida para que los campos InListaArs y InMontoAplicar siempre se envien juntos
		  res.sendError(400,"Datos insuficientes para la consulta.");
		  return voOut;
	  } else if ( inParams.getInListaArs().isEmpty() || isNumericAndSemicolonAndSpace(inParams.getInListaArs()) == false || inParams.getInListaArs().trim() == "" ) { //Valida el formato correcto para el parametro InListaArs (solo numeros separados por ;)
		  res.sendError(400,"Datos insuficientes para la consulta.");
		  return voOut;
	  } 

	  try {
		  con = DBConnection.getConnection();
		  stmt  = con.prepareCall("{call pkg_cut_monex_srv_api.aplica_pago_monex(?,?,?,?,?,?,?,?,?,?,?,?,?)}");
		  stmt.setBigDecimal(1, inParams.getInMontoSwift());
		  stmt.setString(2, inParams.getInFechaOrdenPago());
		  stmt.setString(3, inParams.getInFechaDeposito());
		  stmt.setString(4, inParams.getInOrdenante());
		  stmt.setString(5, inParams.getInRemesa());
		  stmt.setString(6, inParams.getInBanco());
		  stmt.setString(7, inParams.getInNroOrdenPago());
		  stmt.setString(8, inParams.getInListaArs());
		  stmt.setBigDecimal(9, inParams.getInMontoAplicar());
		  stmt.registerOutParameter(10,Types.NUMERIC); 
		  stmt.registerOutParameter(11,Types.VARCHAR); 
		  stmt.registerOutParameter(12,Types.VARCHAR); 
		  stmt.registerOutParameter(13,Types.VARCHAR); 
		  stmt.execute();
		  voOut.setOutErrlvl(stmt.getBigDecimal(10)); 
		  voOut.setOutMensajes(stmt.getString(11)); 
		  voOut.setOutLote(stmt.getString(12)); 
		  voOut.setOutFolioF10(stmt.getString(13)); 
		  return voOut;
	  } catch (SQLException e ) {
		  e.printStackTrace();
		  if (e.getErrorCode() == 20000) {
			  res.sendError(400,"Error al aplicar pagos.");
			  return voOut;
		  } else {
			  res.sendError(500, e.toString());
		  }

	  } finally {
		  if (stmt != null) {
			  try {
				  stmt.close();
				  con.close();
			  } catch (SQLException e) {
				  //TODO Auto-generated catch block
				  e.printStackTrace();
				  res.sendError(500, e.toString());
			  }
		  }
	  }
	  
  	  if (voOut.getOutMensajes() != "OK") 
  		  res.sendError(404,"No existen datos.");

	  return voOut;
  }  
  
  public static boolean isNumeric(String str) {
	  return str.matches("-?\\d+(\\\\d+)?");  //match a number with optional '-' and decimal.
  }

  public static boolean isNumericAndSemicolonAndSpace(String str) {
	  return str.matches("[0-9 ;Kk]+");  //permite numeros, puntoycoma, espacios y K k.
  }
}