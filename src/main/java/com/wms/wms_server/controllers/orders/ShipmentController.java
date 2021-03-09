package com.wms.wms_server.controllers.orders;

import java.util.List;

import com.wms.wms_server.model.request.ShipmentData;
import com.wms.wms_server.services.shipments.ShipmentService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
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

    @RequestMapping(path="/{shipmentId}", produces="application/json",
            method = RequestMethod.GET)
    @ResponseBody
    public ShipmentData getShipment(@PathVariable("shipmentId") Long shipmentId) {
        ShipmentData data = shipmentService.getShipmentData(shipmentId);
        return data;
    }
}
