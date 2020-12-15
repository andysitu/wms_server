package com.wms.wms_server.model.request;

public class LocationRequest {
    public String area;
    public String loc;
    public int row_start;
    public int row_end;
    public int column_start;
    public int column_end;
    public int level_start;
    public int level_end;
    public int shelf_start;
    public int shelf_end;

    public LocationRequest(String area, String loc, 
        int row_start, int row_end, int column_start, int column_end, 
        int level_start, int level_end, int shelf_start, int shelf_end) {
        this.area = area;
        this.loc = loc;
        this.row_start = row_start;
        this.row_end = row_end;
        this.column_start = column_start;
        this.column_end = column_end;
        this.level_start = level_start;
        this.level_end = level_end;
        this.shelf_start = shelf_start;
        this.shelf_end = shelf_end;
    }
}