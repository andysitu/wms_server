package com.wms.wms_server.controllers.items;

import javax.validation.Valid;

import com.wms.wms_server.model.items.OrderPackage;
import com.wms.wms_server.model.request.OrderPackageRequest;
import com.wms.wms_server.model.request.PickupOrderRequest;
import com.wms.wms_server.model.response.items.OrderPackageResponse;
import com.wms.wms_server.services.items.OrderPackageService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.*;

@Controller
public class OrderPackageController {
    @Autowired
    OrderPackageService orderPackageService;

    @RequestMapping(value="/orderpackages", consumes = "application/json", 
        produces="application/json;", method=RequestMethod.POST)
    @ResponseBody
    public ResponseEntity createOrderPackage(
            @Valid @RequestBody OrderPackageRequest orderPackageRequest) {
        if (!orderPackageService.isValidOrderPackageRequest(orderPackageRequest)) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("BAD REQUEST");
        }
        OrderPackage orderPackage = orderPackageService.createOrderPackageAndItemOrder(orderPackageRequest);
        if (orderPackage == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
        }
        
        return ResponseEntity.status(HttpStatus.OK).body(orderPackage);
    }

    @RequestMapping(value="/orderpackages/{order_id}", 
        produces="application/json;", method=RequestMethod.POST)
    @ResponseBody
    public ResponseEntity pickupOrder(
            @PathVariable("order_id") Long order_id,
            @Valid @RequestBody PickupOrderRequest pickOrderRequest) 
        {
        int newQuantity = orderPackageService.pickupOrder(order_id, pickOrderRequest);
        if (newQuantity > 0) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
        }
        
        return ResponseEntity.status(HttpStatus.OK).body(null);
    }

    @RequestMapping(value="/orderpackages", 
        produces="application/json;", method=RequestMethod.GET)
    @ResponseBody
    public ResponseEntity getOrders(
        @RequestParam(required = false) String type
    ) {
        List<OrderPackageResponse> responses = orderPackageService.getOrderResponses(type);
        return ResponseEntity.status(HttpStatus.OK).body(responses);
    }

    @GetMapping("/create_order")
    public String viewCreateOrder() {
        return "items/create_order";
    }    

    @GetMapping("/pickup_order")
    public String viewPickupOrder() {
        return "items/pickup_order";
    }

    @GetMapping("/ship_order")
    public String viewShipOrder() {
        return "shipments/ship_order";
    }
}
