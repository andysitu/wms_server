package com.wms.wms_server.repository;

import org.springframework.stereotype.Repository;
import org.springframework.data.mongodb.repository.MongoRepository;

import com.wms.wms_server.model.user.User;

@Repository
public interface UserRepository extends MongoRepository<User, String>{    
    User findByName(String name);
    User findBySub(String sub);
}