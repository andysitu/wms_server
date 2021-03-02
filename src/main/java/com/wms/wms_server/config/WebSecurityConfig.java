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
        
    }

    // private OAuth2UserService<OidcUserRequest, OidcUser> oidcUserService() {
    //     final OidcUserService delegate = new OidcUserService();
    //     System.out.println("HIHI\n\n\n\n\n\n\n\n\n\n\n\n");

    //     return (userRequest) -> {
    //         System.out.println("BYEBYE\n\n\n\n\n\n\n\n\n\n\n\n");
    //         // Delegate to the default implementation for loading a user
    //         OidcUser oidcUser = delegate.loadUser(userRequest);

    //         OAuth2AccessToken accessToken = userRequest.getAccessToken();
    //         Set<GrantedAuthority> mappedAuthorities = new HashSet<>();

    //         // TODO
    //         // 1) Fetch the authority information from the protected resource using accessToken
    //         // 2) Map the authority information to one or more GrantedAuthority's and add it to mappedAuthorities

    //         // 3) Create a copy of oidcUser but use the mappedAuthorities instead
    //         oidcUser = new DefaultOidcUser(mappedAuthorities, 
    //             oidcUser.getIdToken(), oidcUser.getUserInfo());

    //         return oidcUser;
    //     };
    // }

    // @Bean
    // public PrincipalExtractor gPrincipalExtractor() {
    //     System.out.println("GET PRINCIPAL RIGHT NOW");
    //     return new GPrincipalExtractor();
    // }

    // @Bean
    // public AuthoritiesExtractor gAuthoritiesExtractor() {
    //     return new GAuthoritiesExtractor();
    // }

    // private GrantedAuthoritiesMapper userAuthoritiesMapper() {
    //     System.out.println("B\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n");
    //     return (authorities) -> {
    //         System.out.print("HIHIHIHIHIH\n\n\n\n\n\n\n\n\n\n\n");
    //         Set<GrantedAuthority> mappedAuthorities = new HashSet<>();

    //         mappedAuthorities.add(new SimpleGrantedAuthority("ROLE_ADMIN"));

    //         return mappedAuthorities;
    //     };
    // }

    // private OAuth2UserService<OAuth2UserRequest, OAuth2User> oauth2UserService() {
    //     final DefaultOAuth2UserService delegate = new DefaultOAuth2UserService();
    //     System.out.println("B\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n");

    //     return (userRequest) -> {
    //         System.out.println("\n\n\n\n\n\nhihihi");
    //         OAuth2User oauth2User = delegate.loadUser(userRequest);
    //         // OAuth2AccessToken accessToken = userRequest.getAccessToken();

    //         // GrantedAuthority auths = new OAuth2UserAuthority("ADMIN", oauth2User.getAttributes());

    //         Set<GrantedAuthority> mappedAuthorities = new HashSet<>();
    //         // mappedAuthorities.add(auths);

    //         mappedAuthorities.add(new SimpleGrantedAuthority("ROLE_ADMIN"));

    //         // System.out.println(oauth2User.getName());

    //         oauth2User = new DefaultOAuth2User(mappedAuthorities, 
    //                 oauth2User.getAttributes(), oauth2User.getName());
    //         return oauth2User;
    //     };
    // }
}
