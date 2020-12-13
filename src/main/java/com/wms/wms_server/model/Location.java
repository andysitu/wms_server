package com.wms.wms_server.model;

import org.springframework.stereotype.Component;

@Component
public class Location {
    private String area;
    private String loc;
    private int row;
    private int column;
    private int level;

    private String type;
    
    public Location() {

    }

    public Location(String area, String loc, int row, int column, int level) {
        this.area = area;
        this.loc = loc;
        this.row = row;
        this.column = column;
        this.level = level;
    }
}