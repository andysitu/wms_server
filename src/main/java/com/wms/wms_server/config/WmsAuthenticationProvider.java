// package com.wms.wms_server.config;

// import org.springframework.security.core.Authentication;
// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.security.authentication.AuthenticationProvider;
// import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
// import org.springframework.stereotype.Component;

// import org.springframework.security.core.AuthenticationException;
// import org.springframework.security.authentication.BadCredentialsException;

// import com.wms.wms_server.repository.UserRepository;

// import java.util.Collections;

// import com.wms.wms_server.model.user.User;

// @Component
// public class WmsAuthenticationProvider implements AuthenticationProvider{
//     @Autowired
//     private UserRepository userRepository;

//     @Override
//     public Authentication authenticate(Authentication authentication) throws AuthenticationException {
//         final UsernamePasswordAuthenticationToken upAuthTok = (UsernamePasswordAuthenticationToken) authentication;
//         final String name = (String) authentication.getPrincipal();

//         final String password = (String) upAuthTok.getCredentials();

//         User u = userRepository.findByUsername(name);
//         String actual_password = u.getPassword();
//         // System.out.println(name + " " + password + " " + actual_password);

//         if (!password.equals(actual_password) || password.equals("")) {
//             throw new BadCredentialsException(("Invalid ID or Password"));
//         }

//         UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken (
//             authentication.getPrincipal(),
//             authentication.getCredentials(),
//             // AuthorityUtils.createAuthorityList(user.getRoles().toArray(new String[0]))
//             Collections.emptyList()
//         );
//         authToken.setDetails(authentication.getDetails());

//         return authToken;
//     }

//     @Override
//     public boolean supports(Class<?> authentication) {
//         return true;
//     }
// }
