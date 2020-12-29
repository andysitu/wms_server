package com.wms.wms_server.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class ItemController {
    @GetMapping("/view_item_info")
    public String view_item_info() {
        return "items/view_item_info";
    }
}
