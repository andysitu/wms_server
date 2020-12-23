package com.wms.wms_server.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

import com.wms.wms_server.repository.UserRepository;
import com.wms.wms_server.model.user.WMSUser;

@Service
public class OAuthUserService {
    @Autowired
    private UserRepository userRepository;

    public WMSUser getOrMakeUser(@AuthenticationPrincipal OAuth2User principal) {
        // Map<String, Object> h = new HashMap<String, Object>();
		// h.put("name", principal.getAttribute("name"));
        // h.put("email", principal.getAttribute("email"));
        // h.put("sub", principal.getAttribute("sub"));
        // Map<String, Object> ats = principal.getAttributes();
        // for (Map.Entry<String, Object> entry : ats.entrySet()) {
        //     System.out.println(entry.getKey() + " : " + entry.getValue());
        // }

        WMSUser u = userRepository.findBySub(principal.getAttribute("sub"));
        if (u == null) {
            u = new WMSUser(
                    principal.getAttribute("email"), 
                    principal.getAttribute("name"), 
                    principal.getAttribute("sub"));
            userRepository.save(u);
        }
        return u;
    }
}