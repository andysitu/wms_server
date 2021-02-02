package com.wms.wms_server.services.items;

import javax.servlet.http.HttpServletRequest;

import com.wms.wms_server.model.items.ItemInventory;
import com.wms.wms_server.model.items.ItemReceive;
import com.wms.wms_server.model.locations.Location;
import com.wms.wms_server.repository.LocationRepository;
import com.wms.wms_server.repository.items.ItemInventoryRepository;
import com.wms.wms_server.repository.items.ItemReceiveRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class ItemInventoryService {
    @Autowired
    private ItemInventoryRepository itemInventoryRepository;
    @Autowired
    private LocationRepository locationRepository;
    @Autowired
    private ItemReceiveRepository itemReceiveRepository;
    
    public Boolean check_request(HttpServletRequest request, String parameter) {
        String result = request.getParameter(parameter);
        return (result != null && result.length() > 0);
    }

    public ItemInventory createItemInventory(HttpServletRequest request) {
        // Check that all parameters are given
        if (!check_request(request, "locationCode") || 
            !check_request(request, "itemReceiveId") ||
            !check_request(request, "quantity") ||
            !check_request(request, "shipmentCode")) {
            return null;
        }

        List<Location> locations = locationRepository.findByLocationCode(
                                    request.getParameter("locationCode"));
        if (locations.size() == 0) return null;
        Location location = locations.get(0);

        Optional<ItemReceive> oItemReceive = itemReceiveRepository.findById(
                            Long.parseLong(request.getParameter("itemReceiveId")));
        if (oItemReceive.isEmpty()) return null;
        ItemReceive itemReceive = oItemReceive.get();

        int quantity = Integer.parseInt(request.getParameter("quantity"));

        if (itemReceive.getQuantity() < quantity) return null;
        
        String shipmentCode = request.getParameter("shipmentCode");

        ItemInventory itemInventory = new ItemInventory(itemReceive.getItemInfo(), location, quantity, itemReceive.getShipmentCode());
        itemReceive.setQuantity(itemReceive.getQuantity() - quantity);

        itemInventoryRepository.save(itemInventory);
        itemReceiveRepository.save(itemReceive);
        
        return itemInventory;
    }
}
