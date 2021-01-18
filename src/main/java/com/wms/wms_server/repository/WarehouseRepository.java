package com.wms.wms_server.repository;

import org.springframework.stereotype.Repository;

import com.wms.wms_server.model.locations.Warehouse;

import org.springframework.data.jpa.repository.JpaRepository;

@Repository
public interface WarehouseRepository extends JpaRepository<Warehouse, Integer> {
    
}
