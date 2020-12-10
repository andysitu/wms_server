package com.wms.wms_server;

import org.springframework.web.bind.annotation.*;

@RestController
public class GreetingController {
    @GetMapping("/greeting")
    public String greeting() {
        return "hello world!";
    }
}