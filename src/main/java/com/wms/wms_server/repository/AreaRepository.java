package com.wms.wms_server.repository;

import com.wms.wms_server.model.locations.Area;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AreaRepository extends JpaRepository<Area, Long>{
    
}
