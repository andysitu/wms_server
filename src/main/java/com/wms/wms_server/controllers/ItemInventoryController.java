package com.wms.wms_server.controllers;

import javax.servlet.http.HttpServletRequest;

import com.wms.wms_server.model.items.ItemInventory;
import com.wms.wms_server.model.response.items.ItemInventoryResponse;
import com.wms.wms_server.services.items.ItemInventoryService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.*;

@Controller
public class ItemInventoryController {
    @Autowired
    ItemInventoryService itemInventoryService;

    @GetMapping("/view_item_putaway")
    public String view_item_putaway() {
        return "items/view_item_putaway";
    }

    @GetMapping("/view_inventory")
    public String view_inventory() {
        return "items/view_inventory";
    }

    @RequestMapping(value="/iteminventory", produces = "application/json",
        method=RequestMethod.GET)
    @ResponseBody
    public List<ItemInventoryResponse> getItemInventory(HttpServletRequest request) {
        List<ItemInventoryResponse> responses = new ArrayList<>();
        for (ItemInventory item: itemInventoryService.getItems()) {
            responses.add(itemInventoryService.convert_to_response(item));
        }
        return responses;
    }

    @RequestMapping(value="/iteminventory", produces = "application/json",
        method=RequestMethod.POST)
    @ResponseBody
    public ResponseEntity createItemInventory(HttpServletRequest request) {
        ItemInventory item = itemInventoryService.createItemInventory(request);
        if (item != null) {
            ItemInventoryResponse response = itemInventoryService.convert_to_response(item);
            return ResponseEntity.status(HttpStatus.OK).body(response);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }
    
}
