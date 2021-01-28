package com.wms.wms_server.repository;

import com.wms.wms_server.model.items.ItemReceive;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.*;

@Repository
public interface ItemReceiveRepository extends JpaRepository<ItemReceive, Long> {

    @Query("SELECT i FROM ItemReceive i inner join i.shipmentReceive s where lower(s.code) LIKE lower(CONCAT('%',:code,'%'))")
    List<ItemReceive> findByShipmentCode(String code);

    @Query("SELECT i from ItemReceive i INNER JOIN i.itemInfo iinfo where lower(iinfo.itemName) LIKE lower(CONCAT('%',:name,'%'))")
    List<ItemReceive> findByItemName(String name);
}
