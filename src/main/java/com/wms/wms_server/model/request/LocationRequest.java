package com.wms.wms_server.model.request;

public class LocationRequest {
    public String area;
    public int row_start;
    public int row_end;
    public int bay_start;
    public int bay_end;
    public int level_start;
    public int level_end;
    public int shelf_start;
    public int shelf_end;

    public LocationRequest(String area,
        int row_start, int row_end, int bay_start, int bay_end, 
        int level_start, int level_end, int shelf_start, int shelf_end) {
        this.area = area;
        this.row_start = row_start;
        this.row_end = row_end;
        this.bay_start = bay_start;
        this.bay_end = bay_end;
        this.level_start = level_start;
        this.level_end = level_end;
        this.shelf_start = shelf_start;
        this.shelf_end = shelf_end;
    }
}