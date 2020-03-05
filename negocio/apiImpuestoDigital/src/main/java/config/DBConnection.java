package config;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

import javax.annotation.PostConstruct;
import org.springframework.stereotype.Service;

@Service
public class DBConnection {


	@PostConstruct
	public static Connection getConnection() {

		Connection con = null;
		try {
			Class.forName("oracle.jdbc.driver.OracleDriver");
			con = DriverManager.getConnection(System.getenv("URL"),System.getenv("USER"),System.getenv("PASSWORD"));
//			con = DriverManager.getConnection("jdbc:oracle:thin:@192.168.7.150:1521/teso","reca_des2","desareca");	//Ambiente Desarrollo
//			con = DriverManager.getConnection("jdbc:oracle:thin:@192.168.24.150:1521/teso","reca","rkat_1114");	//Ambiente TEST
		} catch (ClassNotFoundException e) {
			e.printStackTrace();
		} catch (SQLException e) {
			e.printStackTrace();
		}
		return con;
	}
	
	
}