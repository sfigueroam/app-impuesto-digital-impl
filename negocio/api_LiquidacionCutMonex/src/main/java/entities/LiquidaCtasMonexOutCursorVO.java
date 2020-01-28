package entities;
import java.io.Serializable; 
import java.math.BigDecimal; 
import java.util.Date; 

public class LiquidaCtasMonexOutCursorVO implements Serializable { 
  /** 
  * 
  */ 
  private static final long serialVersionUID = 1L; 

  private BigDecimal clienteTipo; 
  private BigDecimal rutRol; 
  private BigDecimal formTipo; 
  private BigDecimal formFolio; 
  private Date fechaVcto; 
  private BigDecimal montoNeto; 
  private BigDecimal intereses; 
  private BigDecimal multas; 
  private BigDecimal asreajustes; 
  private BigDecimal ascondonacion; 
  private BigDecimal montoTotal; 
  private String codigoBarra; 
 

  public LiquidaCtasMonexOutCursorVO(){ 
  } 


  public void setClienteTipo(BigDecimal newClienteTipo){ 
    this.clienteTipo = newClienteTipo; 
  } 

  public BigDecimal getClienteTipo(){ 
    return this.clienteTipo; 
  } 


  public void setRutRol(BigDecimal newRutRol){ 
    this.rutRol = newRutRol; 
  } 

  public BigDecimal getRutRol(){ 
    return this.rutRol; 
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


  public void setFechaVcto(Date newFechaVcto){ 
    this.fechaVcto = newFechaVcto; 
  } 

  public Date getFechaVcto(){ 
    return this.fechaVcto; 
  } 


  public void setMontoNeto(BigDecimal newMontoNeto){ 
    this.montoNeto = newMontoNeto; 
  } 

  public BigDecimal getMontoNeto(){ 
    return this.montoNeto; 
  } 


  public void setIntereses(BigDecimal newIntereses){ 
    this.intereses = newIntereses; 
  } 

  public BigDecimal getIntereses(){ 
    return this.intereses; 
  } 


  public void setMultas(BigDecimal newMultas){ 
    this.multas = newMultas; 
  } 

  public BigDecimal getMultas(){ 
    return this.multas; 
  } 


  public void setAsreajustes(BigDecimal newAsreajustes){ 
    this.asreajustes = newAsreajustes; 
  } 

  public BigDecimal getAsreajustes(){ 
    return this.asreajustes; 
  } 


  public void setAscondonacion(BigDecimal newAscondonacion){ 
    this.ascondonacion = newAscondonacion; 
  } 

  public BigDecimal getAscondonacion(){ 
    return this.ascondonacion; 
  } 


  public void setMontoTotal(BigDecimal newMontoTotal){ 
    this.montoTotal = newMontoTotal; 
  } 

  public BigDecimal getMontoTotal(){ 
    return this.montoTotal; 
  } 


  public void setCodigoBarra(String newCodigoBarra){ 
    this.codigoBarra = newCodigoBarra; 
  } 

  public String getCodigoBarra(){ 
    return this.codigoBarra; 
  } 


} 
