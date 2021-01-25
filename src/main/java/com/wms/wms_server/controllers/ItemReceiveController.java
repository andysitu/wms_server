package com.wms.wms_server.controllers;

import javax.servlet.http.HttpServletRequest;

import com.wms.wms_server.model.items.ItemReceive;
import com.wms.wms_server.repository.ItemReceiveRepository;
import com.wms.wms_server.repository.ShipmentReceiveRepository;
import com.wms.wms_server.services.items.ItemReceiveService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class ItemReceiveController {
    @Autowired
    ItemReceiveRepository itemReceiveRepository;
    @Autowired
    ShipmentReceiveRepository shipmentReceiveRepository;
    @Autowired 
    ItemReceiveService itemReceiveService;

    @GetMapping(value = "receive_items")
    public String view_receiving_items() {
        return "items/receive_items";
    }

    @GetMapping(value = "view_item_receive")
    public String view_item_receive() {
        return "items/view_item_receive";
    }

    @RequestMapping(path="/itemreceive", produces="application/json;", 
        method=RequestMethod.POST)
    @ResponseBody
    public String create_itemReceive(HttpServletRequest request) {
        itemReceiveService.create_itemReceive(request);
        System.out.println("itemreceive");
        return "HI";
    }
}
