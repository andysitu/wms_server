package com.wms.wms_server;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

import com.wms.wms_server.services.OAuthUserService;
import org.springframework.beans.factory.annotation.Autowired;

@SpringBootApplication
@Controller
public class WmsServerApplication {
	@Autowired
	OAuthUserService oAuthUserService;

	// @GetMapping(value={"/error"})
    // public String view_error() {
    //     return "error";
	// }
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