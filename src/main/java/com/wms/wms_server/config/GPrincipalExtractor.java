package com.wms.wms_server.config;

import java.util.Map;

import org.springframework.boot.autoconfigure.security.oauth2.resource.PrincipalExtractor;

import com.wms.wms_server.model.user.User;
import com.wms.wms_server.services.UserService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.core.OAuth2AccessToken;

@Component
public class GPrincipalExtractor implements PrincipalExtractor{
    @Autowired
    private UserService userService;

    @Override
    public Object extractPrincipal(Map<String, Object> map) {
        String id = (String) map.get("id");
        User user = userService.getBySub(id);
        System.out.println("hu");

        if (user == null) {
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            System.out.println("need to ge");
            System.out.println(map.get("sub"));
        } else {
            System.out.println("got");
            System.out.println(map.get("sub"));
        }
        return map.get("name");
    }
}
