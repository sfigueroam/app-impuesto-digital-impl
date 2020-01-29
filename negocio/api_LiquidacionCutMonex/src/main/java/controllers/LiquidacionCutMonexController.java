package controllers;

import java.io.IOException;
import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Collection;

import javax.servlet.http.HttpServletResponse;
import javax.validation.Valid;


import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import config.DBConnection;

import entities.LiquidaCtasMonexInVO;
import entities.LiquidaCtasMonexOutCursorVO;
import oracle.jdbc.OracleTypes;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;

@RestController
public class LiquidacionCutMonexController {

  @ApiOperation(value = "Liquidar cuentas desde tablas CUT Monex asociados a un(os) ID(s).", notes = "Liquidar cuentas desde tablas CUT Monex asociados a un(os) ID(s).", tags = { "Consultas" })
  @ApiResponses(value = {
		  @ApiResponse(code = 200, message = "", response=LiquidaCtasMonexOutCursorVO.class),
		  @ApiResponse(code = 404, message = "Not Found") 
  })
  @PostMapping(path = "/monex/v1/liquidacuentas", consumes = "application/json", produces = "application/json")
  public Collection<LiquidaCtasMonexOutCursorVO> itemsmepost(@Valid @RequestBody LiquidaCtasMonexInVO inParams, HttpServletResponse res) throws IOException {
	  CallableStatement stmt = null;
	  Connection con = null;
	  ResultSet rs = null;
	  Collection<LiquidaCtasMonexOutCursorVO> lista  = new ArrayList<LiquidaCtasMonexOutCursorVO>();
  	  if ( isNumericAndCommaAndSpace(inParams.getInListaIds()) == false || inParams.getInListaIds().trim() == "") {
		  res.sendError(400,"Datos insuficientes para la consulta.");
		  System.out.println("InListaIds: " + inParams.getInListaIds());
		  return lista;
	  }else {
		  try {
			  LiquidaCtasMonexOutCursorVO vo;
			  con = DBConnection.getConnection();
			  stmt  = con.prepareCall("{call pkg_cut_monex_srv_api.liquida_ctas_monex(?,?)}");
			  stmt.setString(1, inParams.getInListaIds());
			  stmt.registerOutParameter(2, OracleTypes.CURSOR);
			  stmt.execute();
			  try {
			      rs = (ResultSet) stmt.getObject(2);
			      while (rs.next()) {
			    	  vo = new LiquidaCtasMonexOutCursorVO();
			    	  vo.setClienteTipo(rs.getBigDecimal("CLIENTE_TIPO"));
			    	  vo.setRutRol(rs.getBigDecimal("RUT_ROL"));
			    	  vo.setFormTipo(rs.getBigDecimal("FORM_TIPO"));
			    	  vo.setFormFolio(rs.getBigDecimal("FORM_FOLIO"));
			    	  vo.setFechaVcto(rs.getDate("FECHA_VCTO"));
			    	  vo.setMontoNeto(rs.getBigDecimal("MONTO_NETO"));
			    	  vo.setIntereses(rs.getBigDecimal("INTERESES"));
			    	  vo.setMultas(rs.getBigDecimal("MULTAS"));
			      	  vo.setAsreajustes(rs.getBigDecimal("ASREAJUSTES"));
			      	  vo.setAscondonacion(rs.getBigDecimal("ASCONDONACION"));
			      	  vo.setMontoTotal(rs.getBigDecimal("MONTO_TOTAL"));
			      	  vo.setCodigoBarra(rs.getString("CODIGO_BARRA"));
			    	  lista.add(vo);
			      }
			  } finally {
				  rs.close();
			  } 
		  } catch (SQLException e ) {
			  e.printStackTrace();
			  System.out.println("entre1");
			  res.sendError(500, e.toString());
		  } finally {
			  if (stmt != null) {
				  try {
					  stmt.close();
					  con.close();
				  } catch (SQLException e) {
					  //TODO Auto-generated catch block
					  e.printStackTrace();
					  System.out.println("entre2");
					  res.sendError(500, e.toString());
				  }
			  }
		  }
	  }
  	  if (lista.isEmpty()) 
  		  res.sendError(404,"No existen datos para el ID de movimiento.");

	  return lista;
  }  
  
  public static boolean isNumeric(String str) {
	  return str.matches("-?\\d+(\\\\d+)?");  //match a number with optional '-' and decimal.
  }

  public static boolean isNumericAndCommaAndSpace(String str) {
	  return str.matches("[0-9, ,]+");  //permite numeros, comas y espacios.
  }
}