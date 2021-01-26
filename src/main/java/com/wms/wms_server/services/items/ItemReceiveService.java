package com.wms.wms_server.services.items;

import javax.servlet.http.HttpServletRequest;

import com.wms.wms_server.model.items.ItemInfo;
import com.wms.wms_server.model.items.ItemReceive;
import com.wms.wms_server.model.response.ItemReceiveResponse;
import com.wms.wms_server.model.shipments.ShipmentReceive;
import com.wms.wms_server.repository.ItemReceiveRepository;
import com.wms.wms_server.services.ItemInfoService;
import com.wms.wms_server.services.shipments.ShipmentReceiveService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ItemReceiveService {
    @Autowired
    ItemReceiveRepository itemReceiveRepository;
    @Autowired
    ShipmentReceiveService shipmentReceiveService;
    @Autowired
    ItemInfoService itemInfoService;

    public Boolean check_request(HttpServletRequest request, String parameter) {
        String result = request.getParameter(parameter);
        return (result != null && result.length() > 0);
    }

    public ItemReceive create_itemReceive(HttpServletRequest request) {
        if (check_request(request, "itemSku") && check_request(request, "shipmentCode")
            && check_request(request, "quantity")) {
            ShipmentReceive shipment = shipmentReceiveService.get_or_create_shipmentReceive(
                request.getParameter("shipmentCode"));
            ItemInfo itemInfo = itemInfoService.getItemInfoBySku(request.getParameter("itemSku"));
            if (itemInfo == null) {
                return null;
            }
            ItemReceive itemReceive = new ItemReceive(
                Integer.parseInt(request.getParameter("quantity")),
                request.getParameter("itemSku"),
                shipment,
                itemInfo
            );
            itemReceiveRepository.save(itemReceive);
            return itemReceive;
        }
        return null;
    }

    public ItemReceiveResponse convert_to_response(ItemReceive itemReceive) {
        ItemReceiveResponse response = new ItemReceiveResponse();
        response.id = itemReceive.getId();
        response.shipmentCode = itemReceive.getShipmentCode();
        response.quantity = itemReceive.getQuantity();
        return response;
    }
}