package com.wms.wms_server.controllers;

import com.wms.wms_server.repository.WarehouseRepository;
import com.wms.wms_server.services.WarehouseService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RequestMethod;

import com.wms.wms_server.model.locations.Warehouse;
import com.wms.wms_server.model.response.WarehouseResponse;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;

import java.util.*;

@Controller
public class WarehouseController {
    @Autowired
    WarehouseRepository warehouseRepository;
    @Autowired
    WarehouseService warehouseService;
    
    @GetMapping(value = "/view_warehouses")
    public String view_warehouses() {
        return "locations/view_warehouses";
    }

    @GetMapping(value="/warehouses")
    @ResponseBody
    public List<WarehouseResponse> get_warehouses() {
        ArrayList<WarehouseResponse> responses = new ArrayList<>();
        for (Warehouse warehouse : warehouseRepository.findAll()) {
            responses.add(warehouseService.convert_to_response(warehouse));
        }
        return responses;
    }

    @PostMapping(value="/warehouses", consumes = "application/json")
    @ResponseBody
    public WarehouseResponse create_warehouse(@Valid @RequestBody Warehouse warehouse) {
        warehouseRepository.save(warehouse);
        return warehouseService.convert_to_response(warehouse);
    }

    @RequestMapping(path="/warehouses/{warehouseId}", method=RequestMethod.DELETE)
    @ResponseBody
    public String delete_warehouse(@PathVariable("warehouseId") Long warehouseId) {
        warehouseRepository.deleteById(warehouseId);
        return "OK";
    }

    @RequestMapping(path="/warehouses/{warehouseId}", method=RequestMethod.PATCH)
    @ResponseBody
    public String edit_warehouse(@PathVariable("warehouseId") Long warehouseId,
                    HttpServletRequest request) {
        warehouseService.update_warehouse(warehouseId, request);
        return "OK";
    }
}
