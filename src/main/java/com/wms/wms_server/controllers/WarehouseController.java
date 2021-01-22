package com.wms.wms_server.controllers;

import com.wms.wms_server.repository.AreaRepository;
import com.wms.wms_server.repository.WarehouseRepository;
import com.wms.wms_server.services.LocationService;
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

import com.wms.wms_server.model.locations.Area;
import com.wms.wms_server.model.locations.Warehouse;
import com.wms.wms_server.model.request.LocationRequest;
import com.wms.wms_server.model.response.AreaResponse;
import com.wms.wms_server.model.response.WarehouseResponse;
import com.wms.wms_server.model.locations.Location;
import com.wms.wms_server.model.response.LocationResponse;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;

import java.util.*;

@Controller
public class WarehouseController {
    @Autowired
    WarehouseRepository warehouseRepository;
    @Autowired
    WarehouseService warehouseService;
    @Autowired
    AreaRepository areaRepository;
    @Autowired
    LocationService locationService;
    
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

    @RequestMapping(path="/warehouses/{warehouseId}/areas", produces="application/json",
        method=RequestMethod.GET)
    @ResponseBody
    public ArrayList<AreaResponse> get_areas(@PathVariable("warehouseId") Long warehouseId) {
        ArrayList<AreaResponse> areaList = new ArrayList<>();
        AreaResponse a;
        for(Area area: areaRepository.findByWarehouseId(warehouseId)) {
            a = new AreaResponse(area.getArea(), area.getId());
            areaList.add(a);
        }
        return areaList;
    }

    @RequestMapping(path="/warehouses/{warehouseId}", method=RequestMethod.PATCH)
    @ResponseBody
    public WarehouseResponse edit_warehouse(@PathVariable("warehouseId") Long warehouseId,
                    HttpServletRequest request) {
        Warehouse warehouse = warehouseService.update_warehouse(warehouseId, request);
        return warehouseService.convert_to_response(warehouse);
    }

    @RequestMapping(path="/warehouses/{warehouseId}/locations", produces="application/json",
        method=RequestMethod.POST)
    @ResponseBody
    public List<LocationResponse> create_locations(
        @PathVariable("warehouseId") Long warehouseId,
        @RequestBody LocationRequest lr) 
    {
        List<Location> locs = locationService.buildLocations(warehouseId, lr);
        return locationService.convertLocations(locs);
        
    }
}
