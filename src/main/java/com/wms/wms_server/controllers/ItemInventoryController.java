package com.wms.wms_server.controllers;

import javax.servlet.http.HttpServletRequest;

import com.wms.wms_server.model.items.ItemInventory;
import com.wms.wms_server.services.items.ItemInventoryService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;


@Controller
public class ItemInventoryController {
    @Autowired
    ItemInventoryService itemInventoryService;

    @GetMapping("/view_item_putaway")
    public String view_item_putaway() {
        return "items/view_item_putaway";
    }

    @RequestMapping(value="/iteminventory", method=RequestMethod.POST)
    @ResponseBody
    public String createItemInventory(HttpServletRequest request) {
        ItemInventory item = itemInventoryService.createItemInventory(request);
        
        return "OK";
        
    }
    
}
