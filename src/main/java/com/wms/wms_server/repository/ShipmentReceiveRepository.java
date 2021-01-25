package com.wms.wms_server.repository;

import com.wms.wms_server.model.shipments.ShipmentReceive;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ShipmentReceiveRepository extends JpaRepository<ShipmentReceive, Long> {
    
}
