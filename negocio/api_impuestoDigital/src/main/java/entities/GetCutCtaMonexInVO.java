package entities;
import java.io.Serializable; 

public class GetCutCtaMonexInVO implements Serializable { 
  /** 
  * 
  */ 
  private static final long serialVersionUID = 1L; 

  private String inUsuario; 
  private String inIdSistema; 
  private String inClienteTipo; 
  private String inRutRol; 
  private String inRutDv; 
  private String inFormTipo; 
  private String inFormFolio; 
  private String inMoneda; 
  private String inFechaVcto; 
  private String inPeriodo; 
  private String inSaldo; 
  private String inFechaVctoDesde; 
  private String inFechaVctoHasta; 
 

  public GetCutCtaMonexInVO(){ 
  } 


  public void setInUsuario(String newInUsuario){ 
    this.inUsuario = newInUsuario; 
  } 

  public String getInUsuario(){ 
    return this.inUsuario; 
  } 


  public void setInIdSistema(String newInIdSistema){ 
    this.inIdSistema = newInIdSistema; 
  } 

  public String getInIdSistema(){ 
    return this.inIdSistema; 
  } 


  public void setInClienteTipo(String newInClienteTipo){ 
    this.inClienteTipo = newInClienteTipo; 
  } 

  public String getInClienteTipo(){ 
    return this.inClienteTipo; 
  } 


  public void setInRutRol(String newInRutRol){ 
    this.inRutRol = newInRutRol; 
  } 

  public String getInRutRol(){ 
    return this.inRutRol; 
  } 


  public void setInRutDv(String newInRutDv){ 
    this.inRutDv = newInRutDv; 
  } 

  public String getInRutDv(){ 
    return this.inRutDv; 
  } 


  public void setInFormTipo(String newInFormTipo){ 
    this.inFormTipo = newInFormTipo; 
  } 

  public String getInFormTipo(){ 
    return this.inFormTipo; 
  } 


  public void setInFormFolio(String newInFormFolio){ 
    this.inFormFolio = newInFormFolio; 
  } 

  public String getInFormFolio(){ 
    return this.inFormFolio; 
  } 


  public void setInMoneda(String newInMoneda){ 
    this.inMoneda = newInMoneda; 
  } 

  public String getInMoneda(){ 
    return this.inMoneda; 
  } 


  public void setInFechaVcto(String newInFechaVcto){ 
    this.inFechaVcto = newInFechaVcto; 
  } 

  public String getInFechaVcto(){ 
    return this.inFechaVcto; 
  } 


  public void setInPeriodo(String newInPeriodo){ 
    this.inPeriodo = newInPeriodo; 
  } 

  public String getInPeriodo(){ 
    return this.inPeriodo; 
  } 


  public void setInSaldo(String newInSaldo){ 
    this.inSaldo = newInSaldo; 
  } 

  public String getInSaldo(){ 
    return this.inSaldo; 
  } 


  public void setInFechaVctoDesde(String newInFechaVctoDesde){ 
    this.inFechaVctoDesde = newInFechaVctoDesde; 
  } 

  public String getInFechaVctoDesde(){ 
    return this.inFechaVctoDesde; 
  } 


  public void setInFechaVctoHasta(String newInFechaVctoHasta){ 
    this.inFechaVctoHasta = newInFechaVctoHasta; 
  } 

  public String getInFechaVctoHasta(){ 
    return this.inFechaVctoHasta; 
  } 


} 
