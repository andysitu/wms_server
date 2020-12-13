package com.wms.wms_server.model;

import org.springframework.stereotype.Component;

@Component
public class Location {
    private String loc;
    private String area;
    private int area_number;
    private int level;

    private String type;
    
    public Location() {

    }

    public Location(String loc, String area, int area_number, int level) {
        this.loc = loc;
        this.area = area;
        this.area_number = area_number;
        this.level = level;
    }
}