package com.wms.wms_server.config;

import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.LinkedHashSet;
import java.util.List;
import java.util.Map;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.boot.autoconfigure.security.oauth2.resource.AuthoritiesExtractor;

public class GAuthoritiesExtractor implements AuthoritiesExtractor{
    @Override
    public List<GrantedAuthority> extractAuthorities(Map<String, Object> map) {
        return AuthorityUtils.commaSeparatedStringToAuthorityList(asAuthorities(map));
    }

    private String asAuthorities(Map<String, Object> map) {
        List<String> authorities = new ArrayList<>();
        authorities.add("ADMIN");
        List<LinkedHashMap<String, String>> a = 
            (List<LinkedHashMap<String, String>>) map.get("authorities");
        for (LinkedHashMap<String, String> entry: a) {
            authorities.add(entry.get("authority"));
        }
        return String.join(",", authorities);
    }
}
