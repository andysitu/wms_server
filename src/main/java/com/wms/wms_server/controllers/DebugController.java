package com.wms.wms_server.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class DebugController {
    @GetMapping("/view_debug")
    public String view_debug() {
        return "debug/view_debug";
    }
}
