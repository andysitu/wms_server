package com.wms.wms_server.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.wms.wms_server.services.OAuthUserService;

import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.user.OAuth2User;

import org.springframework.web.bind.annotation.ResponseBody;

import java.util.Map;

@RestController
public class UserController {
    @Autowired
    OAuthUserService oAuthUserService;
    
    @GetMapping("/user")
	@ResponseBody
	public  String user(@AuthenticationPrincipal OAuth2User principal) {
		return oAuthUserService.getOrMakeUser(principal).toString();
	}
}
