package com.wms.wms_server.controllers.items;

import javax.servlet.http.HttpServletRequest;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class ItemOrderController {
    @RequestMapping(path="itemorder", produces="application/json;", method=RequestMethod.POST)
    @ResponseBody
    public String createItemOrder(HttpServletRequest request) {
        return "OK";
    }
}
