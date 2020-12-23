package com.wms.wms_server.model.response;

public class LocationResponse {
    public Integer id;
    public String area;
    public String loc;
    public int row;
    public int bay;
    public int level;
    public int shelf;

    public LocationResponse(Integer id, String area, String loc, int row, int bay, int level, int shelf) {
        this.id = id;
        this.area = area;
        this.loc = loc;
        this.row = row;
        this.bay = bay;
        this.level = level;
        this.shelf = shelf;
    }
}