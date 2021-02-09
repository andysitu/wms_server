package com.wms.wms_server.services.items;

import com.wms.wms_server.repository.items.ItemOrderRepository;
import com.wms.wms_server.repository.items.OrderPackageRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class OrderPackageService {
    @Autowired
    private OrderPackageRepository orderPackageRepository;
    @Autowired
    private ItemOrderRepository itemOrderRepository;

    
}
