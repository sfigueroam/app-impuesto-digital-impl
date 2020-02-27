package entities;
import java.io.Serializable; 
import java.math.BigDecimal;

import springfox.documentation.annotations.ApiIgnore; 

@ApiIgnore
public class GetCutCtaMonexOutCursorVO implements Serializable { 
  /** 
  * 
  */ 
  private static final long serialVersionUID = 1L; 

  private BigDecimal id; 
  private BigDecimal rutRol; 
  private String rutDv; 
  private BigDecimal formTipo; 
  private BigDecimal formFolio; 
  private String moneda; 
  private String fechaVcto; 
  private BigDecimal saldo; 
  private String fechaGiro; 
  private String nombreContribuyente; 
 

  public GetCutCtaMonexOutCursorVO(){ 
  } 


  public void setId(BigDecimal newId){ 
    this.id = newId; 
  } 

  public BigDecimal getId(){ 
    return this.id; 
  } 


  public void setRutRol(BigDecimal newRutRol){ 
    this.rutRol = newRutRol; 
  } 

  public BigDecimal getRutRol(){ 
    return this.rutRol; 
  } 


  public void setRutDv(String newRutDv){ 
    this.rutDv = newRutDv; 
  } 

  public String getRutDv(){ 
    return this.rutDv; 
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


  public void setMoneda(String newMoneda){ 
    this.moneda = newMoneda; 
  } 

  public String getMoneda(){ 
    return this.moneda; 
  } 


  public void setFechaVcto(String newFechaVcto){ 
    this.fechaVcto = newFechaVcto; 
  } 

  public String getFechaVcto(){ 
    return this.fechaVcto; 
  } 


  public void setSaldo(BigDecimal newSaldo){ 
    this.saldo = newSaldo; 
  } 

  public BigDecimal getSaldo(){ 
    return this.saldo; 
  } 


  public void setFechaGiro(String newFechaGiro){ 
    this.fechaGiro = newFechaGiro; 
  } 

  public String getFechaGiro(){ 
    return this.fechaGiro; 
  } 


  public void setNombreContribuyente(String newNombreContribuyente){ 
    this.nombreContribuyente = newNombreContribuyente; 
  } 

  public String getNombreContribuyente(){ 
    return this.nombreContribuyente; 
  } 


} 
