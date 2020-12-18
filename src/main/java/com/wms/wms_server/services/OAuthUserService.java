package com.wms.wms_server.services;

import org.springframework.data.mongodb.config.EnableMongoAuditing;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;
import java.util.HashMap;

@Service
public class OAuthUserService {
    public Map<String, Object> getUser(@AuthenticationPrincipal OAuth2User principal) {
        Map<String, Object> h = new HashMap<String, Object>();
		h.put("name", principal.getAttribute("name"));
		h.put("email", principal.getAttribute("email"));
		return h;
    }
}
