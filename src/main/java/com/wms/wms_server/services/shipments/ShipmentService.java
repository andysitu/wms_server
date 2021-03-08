package com.wms.wms_server.services.shipments;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Optional;

import com.wms.wms_server.model.items.ItemOrder;
import com.wms.wms_server.model.items.OrderPackage;
import com.wms.wms_server.model.request.ShipmentData;
import com.wms.wms_server.model.request.ShipmentUnitData;
import com.wms.wms_server.model.shipment.Shipment;
import com.wms.wms_server.model.shipment.ShipmentItem;
import com.wms.wms_server.model.shipment.ShipmentUnit;
import com.wms.wms_server.repository.items.ItemOrderRepository;
import com.wms.wms_server.repository.items.OrderPackageRepository;
import com.wms.wms_server.repository.shipments.ShipmentItemRepository;
import com.wms.wms_server.repository.shipments.ShipmentRepository;
import com.wms.wms_server.repository.shipments.ShipmentUnitRepository;
import com.wms.wms_server.services.items.OrderPackageService;

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
    @Autowired
    OrderPackageService orderPackageService;

    public Shipment createShipment(ShipmentData shipmentData) {
        Optional<OrderPackage> opOrderPackage = orderPackageRepository.findById(
            shipmentData.orderPackageId);
        if (opOrderPackage.isEmpty()) {
            return null;
        }
        OrderPackage orderPackage = opOrderPackage.get();
        Shipment shipment = new Shipment(orderPackage);
        shipment.setContactName(shipmentData.contactName);
        shipment.setCompanyName(shipmentData.companyName);
        shipment.setAddress1(shipmentData.address1);
        shipment.setAddress2(shipmentData.address2);
        shipment.setCity(shipmentData.city);
        shipment.setState(shipmentData.state);
        shipment.setZip(shipmentData.zip);
        shipment.setPhone(shipmentData.phone);
        shipment.setEmail(shipmentData.email);
        shipment.setTracking(shipmentData.tracking);
        shipment.setTransportName(shipmentData.transportName);
        shipment.setShipmentType(shipmentData.shipmentType);

        shipmentRepository.save(shipment);

        return shipment;
    }

    public List<ShipmentItem> createShipmentItems(
            Shipment shipment, ShipmentData shipmentData) {
        List<ShipmentItem> items = new ArrayList<>();
        List<ItemOrder> itemOrders = itemOrderRepository.findByOrderPackageId(
            shipmentData.orderPackageId
        );

        // Map out all item orders  with the orderPackage ID
        HashMap<String, List<ItemOrder>> itemOrderMap = new HashMap<>();
        List<ItemOrder> searchedItemOrders;
        for (ItemOrder itemOrder: itemOrders) {
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
        for(int i=0; i<shipmentData.items.length; i++) {
            String itemSku = shipmentData.items[i].itemSku;
            int remaining = shipmentData.items[i].shippingQuantity;
            searchedItemOrders = itemOrderMap.get(itemSku);
            for (int j=0; j<searchedItemOrders.size(); j++) {
                ItemOrder itemOrder = searchedItemOrders.get(j);
                int count = Math.min(remaining, itemOrder.getPickedQuantity());

                itemOrder.ship(count);
                shipmentItem = new ShipmentItem(count, shipment, itemOrder);

                itemOrderRepository.save(itemOrder);
                shipmentItemRepository.save(shipmentItem);
                items.add(shipmentItem);
            }
        }
        // status checker if orderPackage is complete
        boolean completeOrder = true;
        for (ItemOrder itemOrder: itemOrders) {
            // mark completeOrder as false if an itemOrder isn't done
            if (!itemOrder.isComplete()) {
                completeOrder = false;
                break;
            }         
        }

        if (completeOrder) { // Complete the OrderPackage if done
            orderPackageService.checkComplete(shipmentData.orderPackageId);
        }
    }

    public void createShipmentUnits(Shipment shipment, ShipmentData shipmentData) {
    public List<ShipmentUnit> createShipmentUnits(Shipment shipment, ShipmentData shipmentData) {
        List<ShipmentUnit> units = new ArrayList<>();
        ShipmentUnit shipmentUnit;
        for (int i = 0; i < shipmentData.units.length; i++) {
            ShipmentUnitData ur = shipmentData.units[i];
            shipmentUnit = new ShipmentUnit(
                shipment,
                shipmentData.shipmentType,
                ur.weight,
                ur.length,
                ur.width,
                ur.height
            );
            shipmentUnitRepository.save(shipmentUnit);
            units.add(shipmentUnit);
        }
        return units;
    }

    public Shipment processShipment(ShipmentData shipmentData) {
        Shipment shipment = createShipment(shipmentData);
        if (shipment == null) {
            return null;
        }
        createShipmentItems(shipment, shipmentData);
        
        createShipmentUnits(shipment, shipmentData);

        return shipment;
    }

    public List<ShipmentData> getShipmentsData() {
        List<ShipmentData> shipmentsData = new ArrayList<>();
        ShipmentData shipmentData;
        for (Shipment shipment : shipmentRepository.findAll()) {
            shipmentData = convertShipment(shipment);
            shipmentsData.add(shipmentData);
        }
        return shipmentsData;
    }

    public ShipmentData convertShipment(Shipment shipment) {
        ShipmentData shipmentData = new ShipmentData();
        shipmentData.id = shipment.getId();
        shipmentData.orderPackageId = shipment.getOrderPackageId();
        shipmentData.contactName = shipment.getContactName();
        shipmentData.companyName = shipment.getCompanyName();
        shipmentData.address1 = shipment.getAddress1();
        shipmentData.address2 = shipment.getAddress2();
        shipmentData.city = shipment.getCity();
        shipmentData.state = shipment.getState();
        shipmentData.zip = shipment.getZip();
        shipmentData.phone = shipment.getPhone();
        shipmentData.email = shipment.getEmail();
        shipmentData.tracking = shipment.getTracking();
        shipmentData.transportName = shipment.getTransportName();
        shipmentData.shipmentType = shipment.getShipmentType();
        return shipmentData;
    }
}
