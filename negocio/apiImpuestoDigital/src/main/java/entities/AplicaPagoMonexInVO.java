package entities; 
import java.io.Serializable; 
import java.math.BigDecimal;
import javax.validation.constraints.NotNull; 

public class AplicaPagoMonexInVO implements Serializable { 
  /** 
  * 
  */ 
  private static final long serialVersionUID = 1L; 

  @NotNull
  private BigDecimal inMontoSwift;
  
  private String inFechaOrdenPago; 
  private String inFechaDeposito; 
  private String inOrdenante; 
  private String inRemesa; 
  private String inBanco; 
  private String inNroOrdenPago; 
  private String inListaArs;
  private BigDecimal inMontoAplicar; 
 

  public AplicaPagoMonexInVO(){ 
  } 


  public void setInMontoSwift(BigDecimal newInMontoSwift){ 
    this.inMontoSwift = newInMontoSwift; 
  } 

  public BigDecimal getInMontoSwift(){ 
    return this.inMontoSwift; 
  } 


  public void setInFechaOrdenPago(String newInFechaOrdenPago){ 
    this.inFechaOrdenPago = newInFechaOrdenPago; 
  } 

  public String getInFechaOrdenPago(){ 
    return this.inFechaOrdenPago; 
  } 


  public void setInFechaDeposito(String newInFechaDeposito){ 
    this.inFechaDeposito = newInFechaDeposito; 
  } 

  public String getInFechaDeposito(){ 
    return this.inFechaDeposito; 
  } 


  public void setInOrdenante(String newInOrdenante){ 
    this.inOrdenante = newInOrdenante; 
  } 

  public String getInOrdenante(){ 
    return this.inOrdenante; 
  } 


  public void setInRemesa(String newInRemesa){ 
    this.inRemesa = newInRemesa; 
  } 

  public String getInRemesa(){ 
    return this.inRemesa; 
  } 


  public void setInBanco(String newInBanco){ 
    this.inBanco = newInBanco; 
  } 

  public String getInBanco(){ 
    return this.inBanco; 
  } 


  public void setInNroOrdenPago(String newInNroOrdenPago){ 
    this.inNroOrdenPago = newInNroOrdenPago; 
  } 

  public String getInNroOrdenPago(){ 
    return this.inNroOrdenPago; 
  } 


  public void setInListaArs(String newInListaArs){ 
    this.inListaArs = newInListaArs; 
  } 

  public String getInListaArs(){ 
    return this.inListaArs; 
  } 


  public void setInMontoAplicar(BigDecimal newInMontoAplicar){ 
    this.inMontoAplicar = newInMontoAplicar; 
  } 

  public BigDecimal getInMontoAplicar(){ 
    return this.inMontoAplicar; 
  } 


} 
