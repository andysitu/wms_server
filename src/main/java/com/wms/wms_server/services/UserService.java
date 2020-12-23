package com.wms.wms_server.services;

import com.wms.wms_server.model.user.WMSUser;
import com.wms.wms_server.repository.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;  

    public WMSUser getBySub(String sub) {
        return userRepository.findBySub(sub);
    }
}
