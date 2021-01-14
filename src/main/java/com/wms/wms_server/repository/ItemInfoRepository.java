package com.wms.wms_server.repository;

import com.wms.wms_server.model.items.ItemInfo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface ItemInfoRepository extends JpaRepository<ItemInfo, Long>{
    List<ItemInfo> findByItemNameContainingIgnoreCase(String name);
    List<ItemInfo> findByDescriptionContainingIgnoreCase(String name);

    @Query("SELECT i FROM ItemInfo i inner join i.itemCategory c where c.name = :name")
    List<ItemInfo> findByItemCategoryName(String name);
}
