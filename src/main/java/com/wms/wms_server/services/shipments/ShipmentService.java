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

    public Shipment createShipment(ShipmentRequest request) {
        Optional<OrderPackage> opOrderPackage = orderPackageRepository.findById(
            request.orderPackageId);
        if (opOrderPackage.isEmpty()) {
            return null;
        }
        OrderPackage orderPackage = opOrderPackage.get();
        Shipment shipment = new Shipment(orderPackage);
        shipment.setContactName(request.contactName);
        shipment.setCompanyName(request.companyName);
        shipment.setAddress1(request.address1);
        shipment.setAddress2(request.address2);
        shipment.setCity(request.city);
        shipment.setState(request.state);
        shipment.setZip(request.zip);
        shipment.setPhone(request.phone);
        shipment.setEmail(request.email);
        shipment.setTracking(request.tracking);
        shipment.setTransportName(request.transportName);
        shipment.setShipmentType(request.shipmentType);
        System.out.println(shipment.getId());

        return shipment;
    }

    public Shipment processShipment(ShipmentRequest request) {
        createShipment(request);
        return null;
    }
}
