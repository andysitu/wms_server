package com.wms.wms_server.controllers.shipment;

import com.wms.wms_server.model.request.ShipmentRequest;
import com.wms.wms_server.services.shipments.ShipmentService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class ShipmentController {
    @Autowired
    ShipmentService shipmentService;

    @RequestMapping(path="/shipments", produces="application/json",
            method = RequestMethod.POST, consumes="application/json")
    @ResponseBody
    public String createShipment(@RequestBody ShipmentRequest shipmentOrderRequest) {
        shipmentService.processShipment(shipmentOrderRequest);
        return "HEY";
    }
}
