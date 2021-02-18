package com.wms.wms_server.controllers.items;

import java.util.List;

import com.wms.wms_server.model.items.ItemSku;
import com.wms.wms_server.repository.items.ItemSkuRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class ItemSkuController {
    @Autowired
    ItemSkuRepository itemSkuRepository;
    
    @RequestMapping(path="/itemsku/check_sku/{sku}", method=RequestMethod.GET)
    @ResponseBody
    public Boolean checkIfSkuExists(@PathVariable("sku") String sku) {
        List<ItemSku> skus = itemSkuRepository.findBySku(sku);
        return !skus.isEmpty();
    }
}
