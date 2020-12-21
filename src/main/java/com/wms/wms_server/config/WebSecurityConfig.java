package com.wms.wms_server.config;

import java.util.HashSet;
import java.util.Set;

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
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.web.csrf.CookieCsrfTokenRepository;
import org.springframework.security.oauth2.core.user.DefaultOAuth2User;
import org.springframework.boot.autoconfigure.security.oauth2.resource.AuthoritiesExtractor;

import com.wms.wms_server.config.GPrincipalExtractor;

@Configuration
@EnableWebSecurity
@EnableGlobalMethodSecurity(securedEnabled = true)
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {
    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
        .logout(l -> {
            l.logoutSuccessUrl("/").permitAll();})
        .authorizeRequests(a -> a
            .antMatchers("/", "/error", "/login", "/js/**", "/css/**").permitAll()
            .antMatchers("/view_users").hasAuthority("ADMIN")
            .anyRequest().authenticated()
        )
        .csrf(c -> c
            .csrfTokenRepository(CookieCsrfTokenRepository.withHttpOnlyFalse())
        )
        .oauth2Login();
    }

        @Bean
        public PrincipalExtractor gPrincipalExtractor() {
            System.out.println("GET PRINCIPAL RIGHT NOW");
            return new GPrincipalExtractor();
        }

        @Bean
        public AuthoritiesExtractor gAuthoritiesExtractor() {
            return new GAuthoritiesExtractor();
        }

        // .oauth2Login(oauth2 -> oauth2
        //     .userInfoEndpoint(userInfo -> userInfo
        //         .userService(this.oauth2UserService()
        //     ))
        // );

    // private OAuth2UserService<OAuth2UserRequest, OAuth2User> oauth2UserService() {
    //     final OAuth2UserService delegate = new DefaultOAuth2UserService();
    //     System.out.println("\n\n\n\n\n\nhihihi");

    //     return (userRequest) -> {
    //         System.out.println("\n\n\n\n\n\nadfasfdsafsfs");
    //         OAuth2User oauth2User = delegate.loadUser(userRequest);
    //         OAuth2AccessToken accessToken = userRequest.getAccessToken();
    //         Set<GrantedAuthority> mappedAuthorities = new HashSet<>();

    //         System.out.println(oauth2User.getName());

    //         oauth2User = new DefaultOAuth2User(mappedAuthorities, 
    //                 oauth2User.getAttributes(), oauth2User.getName());
    //         return oauth2User;
    //     };
    // }
}
