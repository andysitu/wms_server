package com.wms.wms_server.config;

import org.springframework.data.domain.AuditorAware;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

import org.springframework.security.oauth2.core.user.OAuth2User;

import java.util.Optional;

public class AuditorAwareImp implements AuditorAware<String> {
    //  AuditorAware is used for @CreatedBy & @LastModifiedBy
    @Override
    public Optional<String> getCurrentAuditor() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        System.out.println(authentication.getPrincipal());

        return Optional.of(authentication.getName());
    }
}