package com.wms.wms_server.services.shipments;

import com.wms.wms_server.model.shipments.ShipmentReceive;
import com.wms.wms_server.repository.ShipmentReceiveRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class ShipmentReceiveService {
    @Autowired
    ShipmentReceiveRepository shipmentReceiveRepository;

    public ShipmentReceive get_or_create_shipmentReceive(String shipmentCode) {
        List<ShipmentReceive> shipments = shipmentReceiveRepository.findByCode(shipmentCode);
        if (shipments.size() > 0) {
            return shipments.get(0);
        } else {
            ShipmentReceive shipment = new ShipmentReceive(shipmentCode);
            shipmentReceiveRepository.save(shipment);
            return shipment;
        }
    }
}
