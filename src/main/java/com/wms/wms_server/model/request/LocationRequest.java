package com.wms.wms_server.model.request;

public class LocationRequest {
    public String area;
    public String loc;
    public int row;
    public int column;
    public int level;
    public int shelf;

    public LocationRequest(String area, String loc, int row, int column, int level, int shelf) {
        this.area = area;
        this.loc = loc;
        this.row = row;
        this.column = column;
        this.level = level;
        this.shelf = shelf;
    }
}