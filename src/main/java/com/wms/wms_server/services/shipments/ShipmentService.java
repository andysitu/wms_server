package com.wms.wms_server.services.shipments;

import java.util.Optional;

import com.wms.wms_server.model.items.OrderPackage;
import com.wms.wms_server.model.request.ShipmentRequest;
import com.wms.wms_server.model.shipment.Shipment;
import com.wms.wms_server.repository.items.OrderPackageRepository;
import com.wms.wms_server.repository.shipments.ShipmentItemRepository;
import com.wms.wms_server.repository.shipments.ShipmentRepository;
import com.wms.wms_server.repository.shipments.ShipmentUnitRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ShipmentService {
    @Autowired
    ShipmentRepository shipmentRepository;
    @Autowired
    ShipmentItemRepository shipmentItemRepository;
    @Autowired
    ShipmentUnitRepository shipmentUnitRepository;
    @Autowired
    OrderPackageRepository orderPackageRepository;
    public Shipment processShipment(ShipmentRequest request) {
        return null;
    }
}
