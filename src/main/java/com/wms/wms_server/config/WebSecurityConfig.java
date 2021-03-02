package com.wms.wms_server.config;


import org.springframework.boot.autoconfigure.security.oauth2.resource.PrincipalExtractor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;

import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserService;
import org.springframework.security.oauth2.core.OAuth2AccessToken;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.oauth2.core.user.OAuth2UserAuthority;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.authority.mapping.GrantedAuthoritiesMapper;
import org.springframework.security.web.csrf.CookieCsrfTokenRepository;
import org.springframework.security.oauth2.core.user.DefaultOAuth2User;
import org.springframework.boot.autoconfigure.security.oauth2.resource.AuthoritiesExtractor;

import org.springframework.security.oauth2.client.oidc.userinfo.OidcUserRequest;
import org.springframework.security.oauth2.core.oidc.user.OidcUser;
import org.springframework.security.oauth2.client.oidc.userinfo.OidcUserService;
import org.springframework.security.oauth2.core.oidc.user.DefaultOidcUser;

// import com.wms.wms_server.config.GPrincipalExtractor;

@Configuration
@EnableWebSecurity
@EnableGlobalMethodSecurity(
    securedEnabled = true, prePostEnabled = true)
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {
    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.antMatcher("/**").authorizeRequests()
            .antMatchers("/").permitAll()
            .anyRequest().authenticated()
            .and()
            .csrf()
                .csrfTokenRepository(CookieCsrfTokenRepository.withHttpOnlyFalse())
            .and()
            .oauth2Login();
        /*
        http
        .logout(l -> {
            l.logoutSuccessUrl("/").permitAll();})
        .authorizeRequests(a -> a
            .antMatchers("/", "/error", "/login", "/logout", "/js/**", "/css/**").permitAll()
            // .antMatchers("/view_users").permitAll()
            .anyRequest().authenticated()
            // .anyRequest().hasRole("ADMIN")
        )
        .csrf(c -> c
            .csrfTokenRepository(CookieCsrfTokenRepository.withHttpOnlyFalse())
        )
        // .oauth2Login(oauth2 -> oauth2
        //     .userInfoEndpoint(userInfo -> userInfo
        //         // .userAuthoritiesMapper(this.userAuthoritiesMapper())
        //         .userService(this.oauth2UserService()
        //         // .oidcUserService(this.oidcUserService()
        //     ))
        // );
        .oauth2Login();
        // .oauth2Login().userInfoEndpoint().userAuthoritiesMapper(this.userAuthoritiesMapper());
        */
    }
}
