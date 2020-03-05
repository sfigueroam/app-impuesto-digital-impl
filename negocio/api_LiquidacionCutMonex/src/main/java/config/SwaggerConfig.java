package config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
//import org.springframework.web.bind.annotation.RestController;

import com.google.common.base.Predicate;
import com.google.common.base.Predicates;

import springfox.documentation.builders.ApiInfoBuilder;
import springfox.documentation.builders.PathSelectors;
import springfox.documentation.builders.RequestHandlerSelectors;
import springfox.documentation.service.ApiInfo;
//import springfox.documentation.service.Contact;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spring.web.plugins.Docket;
import springfox.documentation.swagger2.annotations.EnableSwagger2;


@Configuration
@EnableSwagger2
public class SwaggerConfig {                                    
	   @Bean
	    public Docket api() { 
	        return new Docket(DocumentationType.SWAGGER_2)
	          .apiInfo(apiInfo())
	          .select()
	          .apis(RequestHandlerSelectors.basePackage("api.liquidacioncut.monex.controllers"))
	          .paths(paths())
	          .build();                              
	    }
	    
		private ApiInfo apiInfo() {
		    return new ApiInfoBuilder()
		    .title("Management Rest APIs")
		    .description("This page lists all the rest apis for TGR Management App.")
		    .version("1.0-SNAPSHOT")
		    .build();
		}

		private Predicate<String> paths() {
		// Match all paths except /error
		    return Predicates.and(PathSelectors.regex("/monex/v1/*"),Predicates.not(PathSelectors.regex("/error*")));
		}


}