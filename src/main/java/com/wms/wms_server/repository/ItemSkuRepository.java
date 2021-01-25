package com.wms.wms_server.repository;

import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.*;

import com.wms.wms_server.model.items.ItemSku;

@Repository
public interface ItemSkuRepository extends JpaRepository<ItemSku, Long> {
    List<ItemSku> findByItemInfoId(Long itemInfoId);
    Optional<ItemSku> findByIdAndItemInfoId(Long id, Long itemInfoId);
    List<ItemSku> findBySkuContainingIgnoreCase(String sku);
    List<ItemSku> findBySku(String sku);
}
