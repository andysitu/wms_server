package com.wms.wms_server.model.response;

import lombok.Getter;
import lombok.Setter;

public class WarehouseResponse {
    @Getter @Setter private long id;    
    @Getter @Setter private String name;
    @Getter @Setter private String description;
    @Getter @Setter private String address1;
    @Getter @Setter private String address2;
    @Getter @Setter private String city;
    @Getter @Setter private String state;
    @Getter @Setter private String country;
    @Getter @Setter private String zip;
    @Getter @Setter private String phone;

    public WarehouseResponse(String name) {
        this.name = name;
    }
}
