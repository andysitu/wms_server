package com.wms.wms_server.model;

import org.springframework.stereotype.Component;

import org.springframework.data.annotation.Id;

@Component
public class Location {
    @Id
    private String id;

    private String area;
    private String loc;
    private int row;
    private int column;
    private int level;
    private int shelf;

    private String type;
    
    public Location() {

    }

    public Location(String area, String loc, int row, int column, int level, int shelf) {
        this.area = area;
        this.loc = loc;
        this.row = row;
        this.column = column;
        this.level = level;
        this.shelf = shelf;
    }

    public String getId() {
        return this.id;
    }
    public String getArea() {
        return this.area;
    }
    public String getLoc() {
        return this.loc;
    }
    public int getRow() {
        return this.row;
    }
    public int getColumn() {
        return this.column;
    }
    public int getLevel() {
        return this.level;
    }
    public int getShelf() {
        return this.shelf;
    }
}