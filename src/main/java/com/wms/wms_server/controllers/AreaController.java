package com.wms.wms_server.controllers;

import com.wms.wms_server.repository.AreaRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.*;

import com.wms.wms_server.model.locations.Area;
import com.wms.wms_server.model.response.AreaResponse;

@Controller
public class AreaController {
    @Autowired
    private AreaRepository areaRepository;

    @RequestMapping(path="/areas", produces="application/json",
        method=RequestMethod.GET)
    @ResponseBody
    public ArrayList<AreaResponse> get_areas() {
        ArrayList<AreaResponse> areaList = new ArrayList<>();
        AreaResponse a;
        for(Area area: areaRepository.findAll()) {
            a = new AreaResponse(area.getArea(), area.getId());
            areaList.add(a);
        }
        return areaList;
    }

    @RequestMapping(path="/areas/{areaId}", produces="text/plain",
        method=RequestMethod.DELETE)
    @ResponseBody
    public String delete_area(@PathVariable("areaId") Long areaId) {
        System.out.print(areaId);
        return "OK";
    }
}
