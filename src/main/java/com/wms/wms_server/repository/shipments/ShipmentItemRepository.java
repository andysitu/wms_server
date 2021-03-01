package com.wms.wms_server.repository.shipments;

import com.wms.wms_server.model.shipment.ShipmentItem;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ShipmentItemRepository extends JpaRepository<ShipmentItem, Long> {
    
}
