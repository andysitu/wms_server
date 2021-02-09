package com.wms.wms_server.controllers.items;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;


@Controller
public class OrderPackageController {
    @RequestMapping(value="orderpackage", produces="application/json;",method=RequestMethod.GET)
    @ResponseBody
    public String createOrderPackage() {
        return "OK";
    }
       
}
