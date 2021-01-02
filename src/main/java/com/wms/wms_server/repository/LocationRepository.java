package com.wms.wms_server.repository;

import org.springframework.stereotype.Repository;
import org.springframework.data.repository.CrudRepository;

import com.wms.wms_server.model.locations.Location;

@Repository
public interface LocationRepository extends CrudRepository<Location, Integer> {
}