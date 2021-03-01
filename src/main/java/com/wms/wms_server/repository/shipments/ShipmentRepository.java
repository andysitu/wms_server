package com.wms.wms_server.repository.shipments;

import com.wms.wms_server.model.shipment.Shipment;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ShipmentRepository extends JpaRepository<Shipment, Long> {

}