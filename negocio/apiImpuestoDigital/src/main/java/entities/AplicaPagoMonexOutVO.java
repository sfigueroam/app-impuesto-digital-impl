package entities; 
import java.io.Serializable; 
import java.math.BigDecimal; 

public class AplicaPagoMonexOutVO implements Serializable { 
  /** 
  * 
  */ 
  private static final long serialVersionUID = 1L; 

  private BigDecimal outErrlvl; 
  private String outMensajes; 
  private String outLote; 
  private String outFolioF10; 
 

  public AplicaPagoMonexOutVO(){ 
  } 


  public void setOutErrlvl(BigDecimal newOutErrlvl){ 
    this.outErrlvl = newOutErrlvl; 
  } 

  public BigDecimal getOutErrlvl(){ 
    return this.outErrlvl; 
  } 


  public void setOutMensajes(String newOutMensajes){ 
    this.outMensajes = newOutMensajes; 
  } 

  public String getOutMensajes(){ 
    return this.outMensajes; 
  } 


  public void setOutLote(String newOutLote){ 
    this.outLote = newOutLote; 
  } 

  public String getOutLote(){ 
    return this.outLote; 
  } 


  public void setOutFolioF10(String newOutFolioF10){ 
    this.outFolioF10 = newOutFolioF10; 
  } 

  public String getOutFolioF10(){ 
    return this.outFolioF10; 
  } 


} 
