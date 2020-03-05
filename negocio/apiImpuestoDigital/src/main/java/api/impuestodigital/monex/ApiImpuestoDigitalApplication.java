package api.impuestodigital.monex;

import org.springframework.boot.SpringApplication;
//import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

import springfox.documentation.swagger2.annotations.EnableSwagger2;


@ComponentScan({"controllers","entities"})
@EnableSwagger2
@SpringBootApplication
//@EnableAutoConfiguration
public class ApiImpuestoDigitalApplication {

	public static void main(String[] args) {
		SpringApplication.run(ApiImpuestoDigitalApplication.class, args);
	}

}
