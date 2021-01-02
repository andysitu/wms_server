package com.wms.wms_server.repository;

import org.springframework.stereotype.Repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

import com.wms.wms_server.model.locations.Location;

@Repository
public interface LocationRepository extends JpaRepository<Location, Integer> {
    Page<Location> findByAreaId(Long areaId, Pageable pageable);
    Optional<Location> findByIdAndAreaId(Integer id, Long areaId);
}