package com.wms.wms_server.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.wms.wms_server.services.OAuthUserService;

import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.user.OAuth2User;

import org.springframework.web.bind.annotation.ResponseBody;

import com.wms.wms_server.model.user.User;
import com.wms.wms_server.model.response.UserResponse;

import java.util.Map;

@RestController
public class UserController {
    @Autowired
    OAuthUserService oAuthUserService;
    
    @GetMapping("/user")
	@ResponseBody
	public UserResponse user(@AuthenticationPrincipal OAuth2User principal) {
		User u = oAuthUserService.getOrMakeUser(principal);
		return new UserResponse(u.getSub(), u.getName(), u.getEmail());
	}
}
