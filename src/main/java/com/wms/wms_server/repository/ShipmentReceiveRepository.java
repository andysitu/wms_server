package com.wms.wms_server.repository;

import com.wms.wms_server.model.items.ShipmenetReceive;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ShipmentReceiveRepository extends JpaRepository<ShipmenetReceive, Long> {
    
}
