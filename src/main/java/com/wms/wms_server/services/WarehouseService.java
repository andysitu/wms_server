package com.wms.wms_server.services;

import com.wms.wms_server.model.locations.Warehouse;
import com.wms.wms_server.model.response.WarehouseResponse;
import com.wms.wms_server.repository.WarehouseRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class WarehouseService {
    @Autowired
    WarehouseRepository warehouseRepository;

    public WarehouseResponse convert_to_response(Warehouse warehouse) {
        WarehouseResponse response = new WarehouseResponse(warehouse.getName());
        response.setDescription(warehouse.getDescription());
        response.setAddress1(warehouse.getAddress1());
        response.setAddress2(warehouse.getAddress2());
        response.setCity(warehouse.getCity());
        response.setZip(warehouse.getZip());
        response.setState(warehouse.getState());
        response.setId(warehouse.getId());
        response.setPhone(warehouse.getPhone());

        return response;
    }
}
