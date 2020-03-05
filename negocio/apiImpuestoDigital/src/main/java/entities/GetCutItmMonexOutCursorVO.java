package entities;
import java.io.Serializable; 
import java.math.BigDecimal;

import springfox.documentation.annotations.ApiIgnore; 

@ApiIgnore
public class GetCutItmMonexOutCursorVO implements Serializable { 
 
  private static final long serialVersionUID = 1L; 

  private BigDecimal mov; 
  private BigDecimal codigo; 
  private String descripcion; 
  private String valor;
  

  public GetCutItmMonexOutCursorVO(){
  }
  
  public void setMov(BigDecimal newMov){ 
    this.mov = newMov; 
  } 

  public BigDecimal getMov(){ 
    return this.mov; 
  } 


  public void setCodigo(BigDecimal newCodigo){ 
    this.codigo = newCodigo; 
  } 

  public BigDecimal getCodigo(){ 
    return this.codigo; 
  } 


  public void setDescripcion(String newDescripcion){ 
    this.descripcion = newDescripcion; 
  } 

  public String getDescripcion(){ 
    return this.descripcion; 
  } 


  public void setValor(String newValor){ 
    this.valor = newValor; 
  } 

  public String getValor(){ 
    return this.valor; 
  } 


} 
