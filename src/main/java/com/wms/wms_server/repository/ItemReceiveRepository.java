package com.wms.wms_server.repository;

import com.wms.wms_server.model.items.ItemReceive;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ItemReceiveRepository extends JpaRepository<ItemReceive, Long> {
    
}
