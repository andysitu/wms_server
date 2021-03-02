package com.wms.wms_server.controllers.shipment;

import com.wms.wms_server.model.request.ShipmentRequest;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class ShipmentController {
    @RequestMapping(path="/shipments", produces="application/json",
            method = RequestMethod.POST, consumes="application/json")
    @ResponseBody
    public String createShipment(@RequestBody ShipmentRequest shipmentOrderRequest) {
        System.out.println(shipmentOrderRequest.items.length);
        System.out.println(shipmentOrderRequest.units.length);
        return "HEY";
    }
}
