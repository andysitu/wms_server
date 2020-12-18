package com.wms.wms_server;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import org.springframework.data.mongodb.config.EnableMongoAuditing;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;
import java.util.HashMap;

import com.wms.wms_server.services.OAuthUserService;
import org.springframework.beans.factory.annotation.Autowired;

@SpringBootApplication
@EnableMongoAuditing
@RestController
public class WmsServerApplication {
	@Autowired
	OAuthUserService oAuthUserService;
	
	@GetMapping("/user") 
	public  Map<String, Object> user(@AuthenticationPrincipal OAuth2User principal) {
		return oAuthUserService.getUser(principal);
	}

	public static void main(String[] args) {
		SpringApplication.run(WmsServerApplication.class, args);
	}
}