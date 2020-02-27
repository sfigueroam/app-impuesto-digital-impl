package entities; 
import java.io.Serializable;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull; 

public class LiquidaCtasMonexInVO implements Serializable { 
  /** 
  * 
  */ 
  private static final long serialVersionUID = 1L; 

  @NotNull
  @NotEmpty(message = "inIdConsulta must not be empty")
  private String inIdConsulta; 
  
  @NotNull
  @NotEmpty(message = "inListaIds must not be empty")
  private String inListaIds; 
 

  public LiquidaCtasMonexInVO(){ 
  } 


  public void setInIdConsulta(String newInIdConsulta){ 
    this.inIdConsulta = newInIdConsulta; 
  } 

  public String getInIdConsulta(){ 
    return this.inIdConsulta; 
  } 


  public void setInListaIds(String newInListaIds){ 
    this.inListaIds = newInListaIds; 
  } 

  public String getInListaIds(){ 
    return this.inListaIds; 
  } 


} 
