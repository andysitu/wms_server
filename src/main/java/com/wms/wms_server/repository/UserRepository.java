package com.wms.wms_server.repository;

import org.springframework.stereotype.Repository;
import org.springframework.data.mongodb.repository.MongoRepository;

import com.wms.wms_server.model.user.WMSUser;

@Repository
public interface UserRepository extends MongoRepository<User, String>{    
    WMSUser findByName(String name);
    WMSUser findBySub(String sub);
}