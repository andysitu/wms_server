package com.wms.wms_server.repository;

import com.wms.wms_server.model.items.ItemInfo;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface ItemInfoRepository extends JpaRepository<ItemInfo, Integer>{
    List<ItemInfo> findByItemNameContainingIgnoreCase(String name);
    List<ItemInfo> findByDescriptionContainingIgnoreCase(String name);
}
