package com.wms.wms_server.controllers.shipment;

import java.util.List;

import com.wms.wms_server.model.request.ShipmentData;
import com.wms.wms_server.services.shipments.ShipmentService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
@RequestMapping("/shipments")
public class ShipmentController {
    @Autowired
    ShipmentService shipmentService;

    @RequestMapping(path="", method=RequestMethod.GET, produces="application/json")
    @ResponseBody
    public List<ShipmentData> getShipments() {
        return shipmentService.getShipmentsData();
    }

    @RequestMapping(path="", produces="application/json",
            method = RequestMethod.POST, consumes="application/json")
    @ResponseBody
    public String createShipment(@RequestBody ShipmentData shipmentOrderRequest) {
        shipmentService.processShipment(shipmentOrderRequest);
        return "OK";
    }

    @GetMapping("/view")
    public String viewShipmentPage() {
        return "/shipments/view_shipments";
    }
    
}
