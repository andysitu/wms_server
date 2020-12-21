package com.wms.wms_server.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.user.OAuth2User;

import org.springframework.web.bind.annotation.ResponseBody;

import com.wms.wms_server.services.OAuthUserService;
import com.wms.wms_server.model.user.User;

import javax.servlet.http.HttpServletRequest;

import com.wms.wms_server.model.response.UserResponse;
import org.springframework.stereotype.Controller;

@Controller
public class UserController {
    @Autowired
    OAuthUserService oAuthUserService;
    
    @GetMapping("/user")
	@ResponseBody
	public UserResponse user(@AuthenticationPrincipal OAuth2User principal) {
		User u = oAuthUserService.getOrMakeUser(principal);
		return new UserResponse(u.getSub(), u.getName(), u.getEmail());
	}

	@GetMapping("/view_users")
	@PreAuthorize("hasRole('ADMAIN')")
	public String view_users(HttpServletRequest request) {
		System.out.println(request.isUserInRole("ROLE_ADMIN"));
		return "users/view_users";
	}
}