package com.wms.wms_server.services;

import com.wms.wms_server.model.user.User;
import com.wms.wms_server.repository.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;  

    public User getBySub(String sub) {
        return userRepository.findBySub(sub);
    }
}
