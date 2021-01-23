package com.wms.wms_server.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class ReceivingItemsController {
    @GetMapping(value = "receive_items")
    public String view_receiving_items() {
        return "items/receive_items";
    }   
}
