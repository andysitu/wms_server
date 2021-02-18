package com.wms.wms_server.controllers.items;

import java.util.List;

import com.wms.wms_server.model.items.ItemSku;
import com.wms.wms_server.services.items.ItemSkuService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class ItemSkuController {
    @Autowired
    ItemSkuService itemSkuService;
    
    @RequestMapping(path="/itemsku/check_sku/{sku}", method=RequestMethod.GET)
    @ResponseBody
    public boolean checkIfSkuExists(@PathVariable("sku") String sku) {
        return itemSkuService.checkIfSkuExists(sku);
    }
}
