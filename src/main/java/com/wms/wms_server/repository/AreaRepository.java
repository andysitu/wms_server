package com.wms.wms_server.repository;

import com.wms.wms_server.model.locations.Area;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AreaRepository extends JpaRepository<Area, Long>{
    public Boolean existsByArea(String area);
    public Area getByArea(String area);
    public List<Area> findByWarehouseId(Long warehouseId);
}
 