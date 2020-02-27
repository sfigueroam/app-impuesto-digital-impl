package entities;
import java.io.Serializable; 
import java.math.BigDecimal; 
import java.util.Date;

import springfox.documentation.annotations.ApiIgnore; 

@ApiIgnore
public class GetCutMovMonexOutCursorVO implements Serializable { 
  /** 
  * 
  */ 
  private static final long serialVersionUID = 1L; 

  private BigDecimal cuenta; 
  private BigDecimal id; 
  private String movTipo; 
  private String estado; 
  private String fecha; 
  private BigDecimal formTipo; 
  private BigDecimal formFolio; 
  private String monedaOrigen; 
  private BigDecimal monto; 
  private String monedaPago; 
  private BigDecimal montopago; 
  private Date periodoContab; 
  private String comuna; 
  private BigDecimal original; 
  private String fechaVcto; 
  private String formVersion; 
 
  public GetCutMovMonexOutCursorVO(){ 
  } 


  public void setCuenta(BigDecimal newCuenta){ 
    this.cuenta = newCuenta; 
  } 

  public BigDecimal getCuenta(){ 
    return this.cuenta; 
  } 


  public void setId(BigDecimal newId){ 
    this.id = newId; 
  } 

  public BigDecimal getId(){ 
    return this.id; 
  } 


  public void setMovTipo(String newMovTipo){ 
    this.movTipo = newMovTipo; 
  } 

  public String getMovTipo(){ 
    return this.movTipo; 
  } 


  public void setEstado(String newEstado){ 
    this.estado = newEstado; 
  } 

  public String getEstado(){ 
    return this.estado; 
  } 


  public void setFecha(String newFecha){ 
    this.fecha = newFecha; 
  } 

  public String getFecha(){ 
    return this.fecha; 
  } 


  public void setFormTipo(BigDecimal newFormTipo){ 
    this.formTipo = newFormTipo; 
  } 

  public BigDecimal getFormTipo(){ 
    return this.formTipo; 
  } 


  public void setFormFolio(BigDecimal newFormFolio){ 
    this.formFolio = newFormFolio; 
  } 

  public BigDecimal getFormFolio(){ 
    return this.formFolio; 
  } 

  public void setFechaVcto(String newFechaVcto){ 
	  this.fechaVcto = newFechaVcto; 
  } 

  public String getFechaVcto(){ 
	  return this.fechaVcto; 
  } 
  
  public void setFormVersion(String newFormVersion){ 
	  this.formVersion = newFormVersion; 
  } 

  public String getFormVersion(){ 
	  return this.formVersion; 
  }
  
  public void setMonedaOrigen(String newMonedaOrigen){ 
    this.monedaOrigen = newMonedaOrigen; 
  } 

  public String getMonedaOrigen(){ 
    return this.monedaOrigen; 
  } 


  public void setMonto(BigDecimal newMonto){ 
    this.monto = newMonto; 
  } 

  public BigDecimal getMonto(){ 
    return this.monto; 
  } 


  public void setMonedaPago(String newMonedaPago){ 
    this.monedaPago = newMonedaPago; 
  } 

  public String getMonedaPago(){ 
    return this.monedaPago; 
  } 


  public void setMontopago(BigDecimal newMontopago){ 
    this.montopago = newMontopago; 
  } 

  public BigDecimal getMontopago(){ 
    return this.montopago; 
  } 


  public void setPeriodoContab(Date newPeriodoContab){ 
    this.periodoContab = newPeriodoContab; 
  } 

  public Date getPeriodoContab(){ 
    return this.periodoContab; 
  } 


  public void setComuna(String newComuna){ 
    this.comuna = newComuna; 
  } 

  public String getComuna(){ 
    return this.comuna; 
  } 


  public void setOriginal(BigDecimal newOriginal){ 
    this.original = newOriginal; 
  } 

  public BigDecimal getOriginal(){ 
    return this.original; 
  } 

} 
