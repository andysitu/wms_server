package com.wms.wms_server.controllers.items;

import javax.servlet.http.HttpServletRequest;

import com.wms.wms_server.model.request.OrderPackageRequest;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestBody;


@Controller
public class OrderPackageController {
    @RequestMapping(value="orderpackage", consumes = "application/json", 
        produces="application/json;", method=RequestMethod.POST)
    @ResponseBody
    public String createOrderPackage(
        // long[] itemIds,
        // @RequestParam String param
        @RequestBody OrderPackageRequest orderPackageRequest
        // HttpServletRequest request
        ) {
        System.out.println(orderPackageRequest.itemIds.length);
            // System.out.println(request.getParameter("itemIds"));
        // System.out.println(itemIds);
        return "OK";
    }
       
}
