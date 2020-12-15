package com.wms.wms_server.services;

import org.springframework.stereotype.Service;

import com.wms.wms_server.model.Location;
import com.wms.wms_server.model.response.LocationResponse;
import com.wms.wms_server.model.request.LocationRequest;

import java.util.List;
import java.util.ArrayList;

@Service
public class LocationService {
    public LocationResponse convertLocation(Location l) {
        return new LocationResponse(
            l.getId(), l.getArea(), l.getLoc(), l.getRow(), l.getColumn(), l.getLevel(), l.getShelf()
        );
    }

    public List<Location> buildLocations(LocationRequest locReq) {
        ArrayList<Location> locs_list = new ArrayList<Location>();
        Location loc;
        for (int row = locReq.row_start; row < locReq.row_end+1; row++ ) {
            for (int col = locReq.column_start; col < locReq.column_end+1; col++ ) {
                for (int level = locReq.level_start; level < locReq.level_end+1; level++ ) {
                    for (int shelf = locReq.shelf_start; shelf < locReq.shelf_end+1; shelf++ ) {
                        loc = new Location(
                            locReq.area, locReq.loc, row, col, level, shelf
                        );
                        locs_list.add(loc);
                    }
                }
            }   
        }
        return locs_list;
    }
}