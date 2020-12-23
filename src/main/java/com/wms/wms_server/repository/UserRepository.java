package com.wms.wms_server.repository;

import org.springframework.stereotype.Repository;
import org.springframework.data.repository.CrudRepository;

import com.wms.wms_server.model.user.WMSUser;

@Repository
public interface UserRepository extends CrudRepository<WMSUser, Integer>{    
    WMSUser findByName(String name);
    WMSUser findBySub(String sub);
}