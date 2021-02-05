package com.wms.wms_server.repository.items;

import com.wms.wms_server.model.items.ItemInventory;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.*;

@Repository
public interface ItemInventoryRepository extends JpaRepository<ItemInventory, Long> {
    @Query("Select i from ItemInventory i INNER JOIN i.itemInfo iinfo WHERE LOWER(iinfo.itemName) LIKE LOWER(CONCAT('%',:name,'%'))")
    List<ItemInventory> findByItemName(String name);

    @Query("SELECT i FROM ItemInventory i INNER JOIN i.itemReceive ireceive INNER JOIN ireceive.shipmentReceive s WHERE lower(s.code) LIKE lower(CONCAT('%',:code,'%'))")
    List<ItemInventory> findByShipmentCode(String code);
}
