package com.wms.wms_server.repository;

import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.*;

import com.wms.wms_server.model.locations.Location;

@Repository
public interface LocationRepository extends JpaRepository<Location, Integer> {
    List<Location> findByAreaId(Long areaId);
    Optional<Location> findByIdAndAreaId(Integer id, Long areaId);
    List<Location> findByLocationCode(String locationCode);
}