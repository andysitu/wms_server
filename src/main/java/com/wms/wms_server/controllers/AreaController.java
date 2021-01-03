package com.wms.wms_server.controllers;

import com.wms.wms_server.repository.AreaRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.*;

import com.wms.wms_server.model.locations.Area;

@Controller
public class AreaController {
    @Autowired
    private AreaRepository areaRepository;

    @RequestMapping(path="/areas", produces="application/json",
        method=RequestMethod.GET)
    @ResponseBody
    public HashMap<String, Long> get_areas() {
        HashMap<String, Long> areaMap = new HashMap<>();
        for(Area area: areaRepository.findAll()) {
            areaMap.put(area.getArea(), area.getId());
        }
        return areaMap;
    }
}
