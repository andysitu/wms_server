package com.wms.wms_server.controllers;

import org.springframework.web.bind.annotation.*;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;
import com.wms.wms_server.model.User;
import com.wms.wms_server.model.response.LocationResponse;
import com.wms.wms_server.model.request.LocationRequest;

import org.springframework.stereotype.Controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RequestBody;

import com.wms.wms_server.repository.LocationRepository;
import com.wms.wms_server.services.LocationService;
import com.wms.wms_server.model.Location;

import java.util.List;
import java.util.ArrayList;

@Controller
public class LocationController {
    @Autowired
    private LocationRepository locationRepository;

    @Autowired
    private LocationService locationService;

    @GetMapping("/locations")
    @ResponseBody
    public List<LocationResponse> get_locations() {
        ArrayList<LocationResponse> locs = new ArrayList<LocationResponse>();
        for(Location loc : locationRepository.findAll())  {
            locs.add(locationService.convertLocation(loc));
        }
        return locs;
    }

    @RequestMapping(path="/locations", produces="text/plain", method=RequestMethod.POST)
    public String create_location(@RequestBody LocationRequest lr) {
        System.out.println(lr.area);
        return "index";
    }

    @GetMapping(value={"/"})
    public String view_index() {
        return "index";
    }

    @GetMapping(value={"/view_locations"})
    public String view_locations() {
        return "locations/view_locations";
    }
}