package com.wms.wms_server.services;

import com.wms.wms_server.repository.AreaRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AreaService {
    @Autowired
    AreaRepository areaRepository;

    public void deleteArea(Long areaId) {
        areaRepository.deleteById(areaId);
    }
}
