package com.wms.wms_server.controllers;

import com.wms.wms_server.repository.WarehouseRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;

import com.wms.wms_server.model.locations.Warehouse;

import javax.validation.Valid;

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
    @ResponseBody
    public List<Warehouse> get_warehouses() {
        List<Warehouse> warehouses = warehouseRepository.findAll();
        return warehouses;
    }

    @PostMapping(value="/warehouses", consumes = "application/json")
    @ResponseBody
    public Warehouse create_warehouse(@Valid @RequestBody Warehouse warehouse) {
        return warehouseRepository.save(warehouse);
    }
}
