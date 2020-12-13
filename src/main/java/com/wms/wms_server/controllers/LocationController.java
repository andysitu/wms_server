package com.wms.wms_server.controllers;

import org.springframework.web.bind.annotation.*;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;
import com.wms.wms_server.model.User;

import org.springframework.stereotype.Controller;

import com.wms.wms_server.repository.LocationRepository;

@Controller
public class LocationController {
    @Autowired
    private LocationRepository locationRepository;

    @GetMapping("/locations")
    public String greeting() {
        return "Greetings!";
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