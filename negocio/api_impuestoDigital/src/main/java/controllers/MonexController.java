package controllers;

import java.io.IOException;
import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Collection;
import javax.servlet.http.HttpServletResponse;

//import org.springframework.expression.ParseException;
//import org.springframework.http.MediaType;
//import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import api.impuestodigital.monex.DBConnection;
//import entities.GetCutCtaMonexInVO;
import entities.GetCutCtaMonexOutCursorVO;
import entities.GetCutItmMonexOutCursorVO;
import entities.GetCutMovMonexOutCursorVO;
import oracle.jdbc.OracleTypes;


@RestController
@RequestMapping("/monex/v1")
public class MonexController {
  
  @RequestMapping(value="/cuentasme", method=RequestMethod.POST, produces = "application/json")
//  public Collection<GetCutCtaMonexOutCursorVO> cuentasme(@RequestBody GetCutCtaMonexInVO parameters, HttpServletResponse res) throws ParseException, IOException {
  public Collection<GetCutCtaMonexOutCursorVO> cuentasme(@RequestParam(value="in_usuario", required = true) String in_usuario, 
	  @RequestParam(value="in_id_sistema", required = true) String in_id_sistema,
	  @RequestParam(value="in_cliente_tipo", required = true) String in_cliente_tipo,
	  @RequestParam(value="in_rut_rol", required = true) String in_rut_rol, 
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

//	  System.out.println(parameters.getInUsuario());
	  CallableStatement stmt = null;
	  Connection con = null;
	  ResultSet rs = null;
	  Collection<GetCutCtaMonexOutCursorVO> lista  = new ArrayList<GetCutCtaMonexOutCursorVO>();

  	  if ( isNumeric(in_usuario) == false || in_usuario.trim() == "" || isNumeric(in_id_sistema) == false || in_id_sistema.trim() == "" || isNumeric(in_cliente_tipo) == false || in_cliente_tipo.trim() == "" || isNumeric(in_rut_rol) == false || in_rut_rol.trim() == "") {
//	  if ( isNumeric(parameters.getInUsuario()) == false || parameters.getInUsuario().trim() == "" || isNumeric(parameters.getInIdSistema()) == false || parameters.getInIdSistema().trim() == "" || isNumeric(parameters.getInClienteTipo()) == false || parameters.getInClienteTipo().trim() == "" || isNumeric(parameters.getInRutRol()) == false || parameters.getInRutRol().trim() == "") {
  		  res.sendError(400,"Datos insuficientes para la consulta.");
	  }else {
		  try {
			  GetCutCtaMonexOutCursorVO vo;
			  con = DBConnection.getConnection();

			  stmt  = con.prepareCall("{call pkg_cut_monex_srv_api.get_cut_cta_monex(?,?,?,?,?,?,?,?,?,?,?,?,?,?)}");
//			  stmt.setString(1,parameters.getInUsuario()); 
//			  stmt.setString(2,parameters.getInIdSistema()); 
//			  stmt.setString(3,parameters.getInClienteTipo()); 
//			  stmt.setString(4,parameters.getInRutRol()); 
//			  stmt.setString(5,parameters.getInRutDv()); 
//			  stmt.setString(6,parameters.getInFormTipo()); 
//			  stmt.setString(7,parameters.getInFormFolio()); 
//			  stmt.setString(8,parameters.getInMoneda()); 
//			  stmt.setString(9,parameters.getInFechaVcto()); 
//			  stmt.setString(10,parameters.getInPeriodo()); 
//			  stmt.setString(11,parameters.getInSaldo()); 
//			  stmt.setString(12,parameters.getInFechaVctoDesde()); 
//			  stmt.setString(13,parameters.getInFechaVctoHasta()); 
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
	  }
	  return lista;
  }
  
  @RequestMapping(value="/movimientosme", method=RequestMethod.GET, produces = "application/json")
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
	  return lista;
  }

  @RequestMapping(value="/itemsme", method=RequestMethod.GET, produces = "application/json")
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
	  return lista;
  }
  
  
  public static boolean isNumeric(String str) {
	  return str.matches("-?\\d+(\\.\\d+)?");  //match a number with optional '-' and decimal.
  }

}