package com.wms.wms_server;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import org.springframework.data.mongodb.config.EnableMongoAuditing;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

import com.wms.wms_server.services.OAuthUserService;
import org.springframework.beans.factory.annotation.Autowired;

@SpringBootApplication
@EnableMongoAuditing
@Controller
public class WmsServerApplication {
	@Autowired
	OAuthUserService oAuthUserService;
	
	@GetMapping("/user")
	@ResponseBody
	public  Map<String, Object> user(@AuthenticationPrincipal OAuth2User principal) {
		return oAuthUserService.getUser(principal);
	}

	@GetMapping(value={"/error"})
    public String view_error() {
        return "error";
	}
	@GetMapping(value={"/index"})
    public String view_index() {
        return "index";
	}
	@GetMapping(value={"/login"})
    public String view_login() {
        return "login";
    }

	public static void main(String[] args) {
		SpringApplication.run(WmsServerApplication.class, args);
	}
}