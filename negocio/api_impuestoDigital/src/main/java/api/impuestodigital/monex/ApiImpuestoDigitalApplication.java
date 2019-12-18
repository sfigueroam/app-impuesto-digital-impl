package api.impuestodigital.monex;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

@ComponentScan({"controllers","entities"})
@SpringBootApplication
public class ApiImpuestoDigitalApplication {

	public static void main(String[] args) {
		SpringApplication.run(ApiImpuestoDigitalApplication.class, args);
	}

}
