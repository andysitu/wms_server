package com.wms.wms_server.services.items;

import java.util.ArrayList;
import java.util.Optional;

import com.wms.wms_server.model.items.ItemInventory;
import com.wms.wms_server.model.items.ItemOrder;
import com.wms.wms_server.model.items.OrderPackage;
import com.wms.wms_server.model.request.OrderPackageRequest;
import com.wms.wms_server.model.request.PickupOrderRequest;
import com.wms.wms_server.model.response.items.ItemOrderResponse;
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
    @Autowired
    private ItemOrderService itemOrderService;

    public Boolean isValidOrderPackageRequest(OrderPackageRequest request) {
        if (request.itemIds == null || request.itemIds.length == 0 ||
            request.quantities.length != request.itemIds.length ) 
        {
            return false;
        }
        return true;
    }

    public void pickupOrder(long orderPackageId, PickupOrderRequest pickupOrderRequest) {
        int currentQuantity = pickupOrderRequest.quantity;
        List<ItemOrder> itemOrders = itemOrderRepository.findByOrderPackageId(orderPackageId);
        for (ItemOrder itemOrder : itemOrders) {
            if (itemOrder.getItemInventory().getLocation().getLocationCode().equals(pickupOrderRequest.locationCode) &&
                itemOrder.getItemInventory().getItemReceive().getSku().equals(pickupOrderRequest.itemSku) &&
                itemOrder.getOrderedQuantity() > 0) {
                int quantity = Math.min(itemOrder.getOrderedQuantity(), currentQuantity);
                itemOrder.pickup(quantity);

                itemOrderRepository.save(itemOrder);

                currentQuantity -= quantity;
                if (currentQuantity <= 0) {
                    break;
                }
            }
        }
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
        response.id = orderPackage.getId();
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

    public List<OrderPackageResponse> getOrderResponses() {
        List<OrderPackageResponse> orderPackageResponses = new ArrayList<>();
        for (OrderPackage orderPackage : orderPackageRepository.findByComplete(0)) {
            OrderPackageResponse orderResponse = convertOrderToResponse(orderPackage);
            List<ItemOrder> itemOrders = itemOrderRepository.findByOrderPackageId(orderPackage.getId());

            orderResponse.itemOrderResponses = new ItemOrderResponse[itemOrders.size()];
            for (int i=0; i< itemOrders.size(); i++) {
                orderResponse.itemOrderResponses[i] = itemOrderService.convertToResponse(
                    itemOrders.get(i));
            }

            orderPackageResponses.add(orderResponse);
        }

        return orderPackageResponses;
    }
}
