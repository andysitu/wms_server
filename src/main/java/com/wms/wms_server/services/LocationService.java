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
            l.getId(), l.getArea(), l.getLoc(), l.getRow(), l.getBay(), l.getLevel(), l.getShelf()
        );
    }

    /**
     * Creates a list of locations specified by LocationRequest
     * @param locReq : LocationRequest specifying the parameter range for Location
     * @return ArrayList of location objects
     */
    public List<Location> buildLocations(LocationRequest locReq) {
        ArrayList<Location> locs_list = new ArrayList<Location>();
        Location loc;
        for (int row = locReq.row_start; row < locReq.row_end+1; row++ ) {
            for (int bay = locReq.bay_start; bay < locReq.bay_end+1; bay++ ) {
                for (int level = locReq.level_start; level < locReq.level_end+1; level++ ) {
                    for (int shelf = locReq.shelf_start; shelf < locReq.shelf_end+1; shelf++ ) {
                        loc = new Location(
                            locReq.area, locReq.loc, row, bay, level, shelf
                        );
                        locs_list.add(loc);
                    }
                }
            }   
        }
        return locs_list;
    }
}