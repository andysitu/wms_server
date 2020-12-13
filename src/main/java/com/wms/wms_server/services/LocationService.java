package com.wms.wms_server.services;

import org.springframework.stereotype.Service;

import com.wms.wms_server.model.Location;
import com.wms.wms_server.model.response.LocationResponse;

@Service
public class LocationService {
    public LocationResponse convertLocation(Location l) {
        return new LocationResponse(
            l.getArea(), l.getLoc(), l.getRow(), l.getColumn(), l.getLevel()
        );
    }
}