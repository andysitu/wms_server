package com.wms.wms_server.repository.shipments;

import com.wms.wms_server.model.shipment.ShipmentUnit;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ShipmentUnitRepository extends JpaRepository<ShipmentUnit, Long> {
    
}
