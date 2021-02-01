package com.wms.wms_server.repository.items;

import com.wms.wms_server.model.items.ItemInventory;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ItemInventoryRepository extends JpaRepository<ItemInventory, Long> {
    
}
