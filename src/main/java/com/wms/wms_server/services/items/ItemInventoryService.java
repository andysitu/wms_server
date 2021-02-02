package com.wms.wms_server.services.items;

import javax.servlet.http.HttpServletRequest;

import com.wms.wms_server.repository.LocationRepository;
import com.wms.wms_server.repository.items.ItemInventoryRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ItemInventoryService {
    @Autowired
    private ItemInventoryRepository itemInventoryRepository;
    @Autowired
    private LocationRepository locationRepository;
    
    public Boolean check_request(HttpServletRequest request, String parameter) {
        String result = request.getParameter(parameter);
        return (result != null && result.length() > 0);
    }
}
