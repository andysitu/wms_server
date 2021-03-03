package com.wms.wms_server.services.shipments;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Optional;

import com.wms.wms_server.model.items.ItemOrder;
import com.wms.wms_server.model.items.OrderPackage;
import com.wms.wms_server.model.request.ShipmentRequest;
import com.wms.wms_server.model.request.ShipmentUnitRequest;
import com.wms.wms_server.model.shipment.Shipment;
import com.wms.wms_server.model.shipment.ShipmentItem;
import com.wms.wms_server.model.shipment.ShipmentUnit;
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

        shipmentRepository.save(shipment);

        return shipment;
    }

    public void createShipmentItems(Shipment shipment, ShipmentRequest request) {
        List<ItemOrder> itemOrders = itemOrderRepository.findByOrderPackageId(
            request.orderPackageId
        );

        // Map out all item orders  with the orderPackage ID
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

        ShipmentItem shipmentItem;
        for(int i=0; i<request.items.length; i++) {
            String itemSku = request.items[i].itemSku;
            int remaining = request.items[i].shippingQuantity;
            searchedItemOrders = itemOrderMap.get(itemSku);
            for (int j=0; j<searchedItemOrders.size(); j++) {
                itemOrder = searchedItemOrders.get(j);
                int count = Math.min(remaining, itemOrder.getPickedQuantity());
                itemOrder.ship(count);
                shipmentItem = new ShipmentItem(count, shipment, itemOrder);

                itemOrderRepository.save(itemOrder);
                shipmentItemRepository.save(shipmentItem);
            }
        }
    }

    public void createShipmentUnits(Shipment shipment, ShipmentRequest request) {
        ShipmentUnit shipmentUnit;
        for (int i = 0; i < request.units.length; i++) {
            ShipmentUnitRequest ur = request.units[i];
            shipmentUnit = new ShipmentUnit(
                shipment,
                request.shipmentType,
                ur.weight,
                ur.length,
                ur.width,
                ur.height
            );
            shipmentUnitRepository.save(shipmentUnit);
        }
    }

    public Shipment processShipment(ShipmentRequest request) {
        Shipment shipment = createShipment(request);
        if (shipment == null) {
            return null;
        }
        createShipmentItems(shipment, request);
        
        createShipmentUnits(shipment, request);

        return shipment;
    }
}
