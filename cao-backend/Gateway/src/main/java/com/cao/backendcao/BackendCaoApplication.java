package com.cao.backendcao;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.netflix.zuul.EnableZuulProxy;

@EnableZuulProxy
@SpringBootApplication
public class BackendCaoApplication {

	public static void main(String[] args) {
		SpringApplication.run(BackendCaoApplication.class, args);
	}

}
