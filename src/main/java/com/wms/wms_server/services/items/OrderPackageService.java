package com.wms.wms_server.services.items;

import java.util.ArrayList;
import java.util.Optional;

import com.wms.wms_server.model.items.ItemInventory;
import com.wms.wms_server.model.items.ItemOrder;
import com.wms.wms_server.model.items.OrderPackage;
import com.wms.wms_server.model.request.OrderPackageRequest;
import com.wms.wms_server.model.response.items.OrderPackageResponse;
import com.wms.wms_server.repository.items.ItemInventoryRepository;
import com.wms.wms_server.repository.items.ItemOrderRepository;
import com.wms.wms_server.repository.items.OrderPackageRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class OrderPackageService {
    @Autowired
    private OrderPackageRepository orderPackageRepository;
    @Autowired
    private ItemOrderRepository itemOrderRepository;
    @Autowired
    private ItemInventoryRepository itemInventoryRepository;

    public Boolean isValidOrderPackageRequest(OrderPackageRequest request) {
        if (request.itemIds == null || request.itemIds.length == 0 ||
            request.quantities.length != request.itemIds.length ) 
        {
            return false;
        }
        return true;
    }

    public OrderPackage createOrderPackageAndItemOrder(OrderPackageRequest request) {
        ArrayList<ItemInventory> itemInventories = new ArrayList<>();
        ArrayList<ItemOrder> itemOrders = new ArrayList<>();

        OrderPackage orderPackage = new OrderPackage(request);

        ItemInventory itemInventory;
        ItemOrder itemOrder;

        for(int i=0; i<request.itemIds.length; i++) {
            Optional<ItemInventory> oItemInventory = itemInventoryRepository.findById(request.itemIds[i]);
            if (oItemInventory.isEmpty()) {
                return null;
            }
            itemInventory = oItemInventory.get();
            int reservedAmount = itemInventory.reserveQuantity(request.quantities[i]);
            if (reservedAmount < 0)
                return null;
            itemInventories.add(itemInventory);
            itemOrder = new ItemOrder(request.quantities[i], itemInventory, orderPackage);
            itemOrders.add(itemOrder);
        }
        orderPackageRepository.save(orderPackage);
        itemOrderRepository.saveAll(itemOrders);
        itemInventoryRepository.saveAll(itemInventories);

        return orderPackage;
    }

    public OrderPackageResponse convertOrderToResponse(OrderPackage orderPackage) {
        OrderPackageResponse response = new OrderPackageResponse();
        response.orderName = orderPackage.getOrderName();
        response.description = orderPackage.getDescription();
        response.contactName = orderPackage.getContactName();
        response.companyName = orderPackage.getCompanyName();
        response.address1 = orderPackage.getAddress1();
        response.address2 = orderPackage.getAddress2();
        response.city = orderPackage.getCity();
        response.state = orderPackage.getState();
        response.zip = orderPackage.getZip();
        response.transportName = orderPackage.getTransportName();
        response.complete = orderPackage.getComplete();
        return response;
    }

    public List<OrderPackage> getOrders() {
        return orderPackageRepository.findAll();
    }
}
