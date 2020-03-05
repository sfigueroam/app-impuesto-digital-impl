package entities; 
import java.io.Serializable; 
import java.math.BigDecimal; 
import java.util.Date; 

public class LiquidaCtasMonexOutCursorVO implements Serializable { 
  /** 
  * 
  */ 
  private static final long serialVersionUID = 1L; 

  private BigDecimal idCta; 
  private BigDecimal clienteTipo; 
  private BigDecimal rutRol; 
  private BigDecimal formTipo; 
  private BigDecimal formFolio; 
  private Date fechaVcto; 
  private BigDecimal montoNeto; 
  private BigDecimal intereses; 
  private BigDecimal multas; 
  private BigDecimal reajustes; 
  private BigDecimal condonacion; 
  private BigDecimal montoTotal; 
  private String liquidable; 
  private String codigoBarra; 
 

  public LiquidaCtasMonexOutCursorVO(){ 
  } 


  public void setIdCta(BigDecimal newIdCta){ 
    this.idCta = newIdCta; 
  } 

  public BigDecimal getIdCta(){ 
    return this.idCta; 
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


  public void setReajustes(BigDecimal newReajustes){ 
    this.reajustes = newReajustes; 
  } 

  public BigDecimal getReajustes(){ 
    return this.reajustes; 
  } 


  public void setCondonacion(BigDecimal newCondonacion){ 
    this.condonacion = newCondonacion; 
  } 

  public BigDecimal getCondonacion(){ 
    return this.condonacion; 
  } 


  public void setMontoTotal(BigDecimal newMontoTotal){ 
    this.montoTotal = newMontoTotal; 
  } 

  public BigDecimal getMontoTotal(){ 
    return this.montoTotal; 
  } 


  public void setLiquidable(String newLiquidable){ 
    this.liquidable = newLiquidable; 
  } 

  public String getLiquidable(){ 
    return this.liquidable; 
  } 


  public void setCodigoBarra(String newCodigoBarra){ 
    this.codigoBarra = newCodigoBarra; 
  } 

  public String getCodigoBarra(){ 
    return this.codigoBarra; 
  } 


} 
