package com.wms.wms_server.controllers.items;

import javax.servlet.http.HttpServletRequest;

import com.wms.wms_server.model.request.OrderPackageRequest;
import com.wms.wms_server.services.items.OrderPackageService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestBody;


@Controller
public class OrderPackageController {
    @Autowired
    OrderPackageService orderPackageService;

    @RequestMapping(value="orderpackage", consumes = "application/json", 
        produces="application/json;", method=RequestMethod.POST)
    @ResponseBody
    public ResponseEntity createOrderPackage(
            @RequestBody OrderPackageRequest orderPackageRequest) {
        if (!orderPackageService.isValidOrderPackageRequest(orderPackageRequest)) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("BAD REQUEST");
        }
        return ResponseEntity.status(HttpStatus.OK).body("OK");
    }
       
}
