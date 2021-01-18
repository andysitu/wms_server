package com.wms.wms_server.controllers;

import com.wms.wms_server.repository.WarehouseRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

import com.wms.wms_server.model.locations.Warehouse;

import java.util.*;

@Controller
public class WarehouseController {
    @Autowired
    WarehouseRepository warehouseRepository;
    
    @GetMapping(value = "/view_warehouses")
    public String view_warehouses() {
        return "locations/view_warehouses";
    }

    @GetMapping(value="/warehouses")
    public List<Warehouse> get_warehouses() {
        List<Warehouse> warehouses = warehouseRepository.findAll();
        return warehouses;
    }
}
