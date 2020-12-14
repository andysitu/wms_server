package com.wms.wms_server.services;

import org.springframework.stereotype.Service;

import com.wms.wms_server.model.Location;
import com.wms.wms_server.model.response.LocationResponse;
import com.wms.wms_server.model.request.LocationRequest;

@Service
public class LocationService {
    public LocationResponse convertLocation(Location l) {
        return new LocationResponse(
            l.getId(), l.getArea(), l.getLoc(), l.getRow(), l.getColumn(), l.getLevel()
        );
    }

    public Location buildLocation(LocationRequest locReq) {
        return new Location(
            locReq.area, locReq.loc, locReq.row, locReq.column, locReq.level
        );
    }
}