package com.wms.wms_server.repository.items;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import java.util.List;

import com.wms.wms_server.model.items.OrderPackage;

import java.util.*;

@Repository
public interface OrderPackageRepository extends JpaRepository<OrderPackage, Long> {

    List<OrderPackage> findByComplete(int complete);
}
