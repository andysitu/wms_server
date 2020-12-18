package com.wms.wms_server.services;

import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

import java.util.Map;
import java.util.HashMap;

@Service
public class OAuthUserService {
    public Map<String, Object> getUser(@AuthenticationPrincipal OAuth2User principal) {
        Map<String, Object> h = new HashMap<String, Object>();
		h.put("name", principal.getAttribute("name"));
        h.put("email", principal.getAttribute("email"));
        h.put("sub", principal.getAttribute("sub"));
        // Map<String, Object> ats = principal.getAttributes();
        // for (Map.Entry<String, Object> entry : ats.entrySet()) {
        //     System.out.println(entry.getKey() + " : " + entry.getValue());
        // }
		return h;
    }
}

