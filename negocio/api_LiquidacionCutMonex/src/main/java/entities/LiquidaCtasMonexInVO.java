package entities;
import java.io.Serializable; 

public class LiquidaCtasMonexInVO implements Serializable { 
  /** 
  * 
  */ 
  private static final long serialVersionUID = 1L; 

  private String inListaIds; 
 

  public LiquidaCtasMonexInVO(){ 
  } 


  public void setInListaIds(String newInListaIds){ 
    this.inListaIds = newInListaIds; 
  } 

  public String getInListaIds(){ 
    return this.inListaIds; 
  } 


} 
