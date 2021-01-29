package com.wms.wms_server.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
public class ItemInventoryController {
    @GetMapping("/view_item_putaway")
    public String view_item_putaway() {
        return "items/view_item_putaway";
    }
}
