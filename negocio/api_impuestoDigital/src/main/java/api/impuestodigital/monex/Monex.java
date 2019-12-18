package api.impuestodigital.monex;

public class Monex {

  private final long id;
  private final String content;

  public Monex(long id, String content) {
    this.id = id;
    this.content = content;
  }

  public long getId() {
    return id;
  }

  public String getContent() {
    return content;
  }
}