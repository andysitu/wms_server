// package com.wms.wms_server.config;

// import com.wms.wms_server.repository.UserRepository;
// import com.wms.wms_server.model.user.User;

// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.security.core.userdetails.UserDetails;

// import org.springframework.security.core.userdetails.UserDetailsService;
// import org.springframework.security.core.userdetails.UsernameNotFoundException;
// import org.springframework.transaction.annotation.Transactional;

// @Transactional
// public class UserServiceImp implements UserDetailsService {
//     @Autowired
//     private UserRepository userRepository;

//     public UserDetails loadUserByUsername(String userId) throws UsernameNotFoundException {
//         User user = userRepository.findBySub(userId);
//         if (user == null) {
//             throw new UsernameNotFoundException(("User not found"));
//         }
//     }
// }
