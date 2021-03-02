package com.wms.wms_server.services.shipments;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Optional;

import com.wms.wms_server.model.items.ItemOrder;
import com.wms.wms_server.model.items.OrderPackage;
import com.wms.wms_server.model.request.ShipmentRequest;
import com.wms.wms_server.model.shipment.Shipment;
import com.wms.wms_server.repository.items.ItemOrderRepository;
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
    @Autowired
    ItemOrderRepository itemOrderRepository;

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

        return shipment;
    }

    public Shipment processShipment(ShipmentRequest request) {
        Shipment shipment = createShipment(request);

        List<ItemOrder> itemOrders = itemOrderRepository.findByOrderPackageId(
            request.orderPackageId
        );

        HashMap<String, List<ItemOrder>> itemOrderMap = new HashMap<>();
        ItemOrder itemOrder; 
        List<ItemOrder> searchedItemOrders;
        for (int i=0; i< itemOrders.size(); i++) {
            itemOrder = itemOrders.get(i);
            String sku = itemOrder.getItemSku();
            if (itemOrderMap.containsKey(sku)) {
                searchedItemOrders = itemOrderMap.get(sku);
                searchedItemOrders.add(itemOrder);
            } else {
                searchedItemOrders = new ArrayList<>();
                searchedItemOrders.add(itemOrder);
                itemOrderMap.put(sku, searchedItemOrders);
            }
        }

        for(int i=0; i<request.items.length; i++) {
            System.out.println(request.items[i].itemSku);
        }

        return shipment;
    }
}
