package api.impuestodigital.monex;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

import javax.annotation.PostConstruct;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
public class DBConnection {

//	  @Value("${spring.datasource.driver-class-name}")
//	  private static String driver;
	  @Value("${spring.datasource.url}")
	  private static String url;
	  @Value("${spring.datasource.username}")
	  private static String user;
	  @Value("${spring.datasource.password}")
	  private static String password;
	
	@PostConstruct
	public static Connection getConnection() {
		System.out.println("-------- Oracle JDBC Connection Testing ------");
		Connection con = null;
		try {
			Class.forName("oracle.jdbc.driver.OracleDriver");
			con = DriverManager.getConnection("jdbc:oracle:thin:@192.168.7.150:1521/teso","reca_des2","desareca");
//			con = DriverManager.getConnection("jdbc:oracle:thin:@192.168.7.150:1521/teso","convenios","convenios");
//			con = DriverManager.getConnection(url,user,password);
		} catch (ClassNotFoundException e) {
			System.out.println("Where is your Oracle JDBC Driver?");
			e.printStackTrace();
		} catch (SQLException e) {
			e.printStackTrace();
		}
		return con;
	}
}