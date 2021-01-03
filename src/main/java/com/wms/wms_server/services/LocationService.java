package com.wms.wms_server.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.wms.wms_server.model.locations.Location;
import com.wms.wms_server.model.response.LocationResponse;
import com.wms.wms_server.repository.AreaRepository;
import com.wms.wms_server.repository.LocationRepository;
import com.wms.wms_server.model.request.LocationRequest;

import com.wms.wms_server.model.locations.Area;

import java.util.List;
import java.util.ArrayList;

@Service
public class LocationService {
    @Autowired
    private LocationRepository locationRepository;
    @Autowired
    private AreaRepository areaRepository;

    public LocationResponse convertLocation(Location l) {
        return new LocationResponse(
            l.getId(), l.getAreaString(), l.getLoc(), l.getRow(), l.getBay(), l.getLevel(), l.getShelf()
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
        Area area;
        if (!areaRepository.existsByArea(locReq.area)) {
            area = new Area(locReq.area);
            areaRepository.save(area);
        } else {
            area = areaRepository.getByArea(locReq.area);
        }
        for (int row = locReq.row_start; row < locReq.row_end+1; row++ ) {
            for (int bay = locReq.bay_start; bay < locReq.bay_end+1; bay++ ) {
                for (int level = locReq.level_start; level < locReq.level_end+1; level++ ) {
                    for (int shelf = locReq.shelf_start; shelf < locReq.shelf_end+1; shelf++ ) {
                        loc = new Location(
                            locReq.area, locReq.loc, row, bay, level, shelf
                        );
                        loc.setArea(area);
                        locationRepository.save(loc);
                        locs_list.add(loc);
                    }
                }
            }   
        }
        return locs_list;
    }
}