package com.wms.wms_server.services.items;

import com.wms.wms_server.model.items.ItemOrder;
import com.wms.wms_server.model.response.items.ItemOrderResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ItemOrderService {
    @Autowired ItemInventoryService itemInventoryService;

    public ItemOrderResponse convertToResponse(ItemOrder itemOrder) {
        ItemOrderResponse response = new ItemOrderResponse();
        response.id = itemOrder.getId();

        response.orderedQuantity = itemOrder.getOrderedQuantity();
        response.startQuantity = itemOrder.getStartQuantity();
        response.pickedQuantity = itemOrder.getPickedQuantity();
        response.completeQuantity = itemOrder.getCompleteQuantity();

        response.complete = itemOrder.getComplete();
        response.itemInventoryReseponse = itemInventoryService.convert_to_response(
            itemOrder.getItemInventory());
        return response;
    }
}
