package com.wms.wms_server.model;

import org.springframework.stereotype.Component;

@Component
public class Location {
    private String location;

    public Location() {

    }

    public Location(String location) {
        this.location = location;
    }

    public String getLocation() {
        return location;
    }
}