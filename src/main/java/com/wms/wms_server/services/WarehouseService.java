package com.wms.wms_server.services;

import java.util.Optional;

import javax.servlet.http.HttpServletRequest;

import com.wms.wms_server.model.locations.Warehouse;
import com.wms.wms_server.model.response.WarehouseResponse;
import com.wms.wms_server.repository.WarehouseRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;

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

    public Boolean check_request(HttpServletRequest request, String parameter) {
        String result = request.getParameter(parameter);
        return (result != null && result.length() > 0);
    }

    public void update_warehouse(Long warehouseId, HttpServletRequest request) {
        Optional<Warehouse> oWarehouse = warehouseRepository.findById(warehouseId);
        if (oWarehouse.isPresent()) {
            Warehouse warehouse = oWarehouse.get();
            if (check_request(request, "name") == true) {
                warehouse.setName(request.getParameter("name"));
            }
            if (check_request(request, "description") == true) {
                warehouse.setDescription(request.getParameter("description"));
            }
            if (check_request(request, "address1") == true) {
                warehouse.setAddress1(request.getParameter("address1"));
            }
            if (check_request(request, "address2") == true) {
                warehouse.setAddress2(request.getParameter("address2"));
            }
            if (check_request(request, "city") == true) {
                warehouse.setCity(request.getParameter("city"));
            }
            if (check_request(request, "state") == true) {
                warehouse.setState(request.getParameter("state"));
            }
            if (check_request(request, "zip") == true) {
                warehouse.setZip(request.getParameter("zip"));
            }
            if (check_request(request, "phone") == true) {
                warehouse.setPhone(request.getParameter("phone"));
            }
            warehouseRepository.save(warehouse);
        }
    }
}
