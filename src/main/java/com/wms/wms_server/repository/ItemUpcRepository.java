package com.wms.wms_server.repository;

import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.*;

import com.wms.wms_server.model.items.ItemUpc;

@Repository
public interface ItemUpcRepository extends JpaRepository<ItemUpc, Long> {
    List<ItemUpc> findByItemInfoId(Long itemInfoId);
    Optional<ItemUpc> findByIdAndItemInfoId(Long id, Long itemInfoId);
}
