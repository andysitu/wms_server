package com.wms.wms_server.model.response;

public class LocationResponse {
    public String id;
    public String area;
    public String loc;
    public int row;
    public int column;
    public int level;
    public int shelf;

    public LocationResponse(String id, String area, String loc, int row, int column, int level, int shelf) {
        this.id = id;
        this.area = area;
        this.loc = loc;
        this.row = row;
        this.column = column;
        this.level = level;
        this.shelf = shelf;
    }
}