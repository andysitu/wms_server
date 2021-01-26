package com.wms.wms_server.controllers;

import javax.servlet.http.HttpServletRequest;

import com.wms.wms_server.model.items.ItemReceive;
import com.wms.wms_server.model.response.ItemInfoResponse;
import com.wms.wms_server.model.response.ItemReceiveResponse;
import com.wms.wms_server.repository.ItemReceiveRepository;
import com.wms.wms_server.repository.ShipmentReceiveRepository;
import com.wms.wms_server.services.ItemInfoService;
import com.wms.wms_server.services.items.ItemReceiveService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.*;

@Controller
public class ItemReceiveController {
    @Autowired
    ItemReceiveRepository itemReceiveRepository;
    @Autowired
    ShipmentReceiveRepository shipmentReceiveRepository;
    @Autowired 
    ItemReceiveService itemReceiveService;
    @Autowired
    ItemInfoService itemInfoService;

    @GetMapping(value = "receive_items")
    public String view_receiving_items() {
        return "items/receive_items";
    }

    @GetMapping(value = "view_item_receive")
    public String view_item_receive() {
        return "items/view_item_receive";
    }

    @RequestMapping(path="/itemreceive", produces="application/json;", 
        method=RequestMethod.GET)
    @ResponseBody
    public List<ItemReceiveResponse> get_itemReceive() {
        List<ItemReceiveResponse> responses = new ArrayList<>();
        for (ItemReceive item : itemReceiveRepository.findAll()) {
            ItemReceiveResponse response = itemReceiveService.convert_to_response(item);
            ItemInfoResponse infoResponse = itemInfoService.convert_to_response(item.getItemInfo());
            response.itemInfoResponse = infoResponse;
            responses.add(response);
        }
        return responses;
    }

    @RequestMapping(path="/itemreceive", produces="application/json;", 
        method=RequestMethod.POST)
    @ResponseBody
    public ItemReceiveResponse create_itemReceive(HttpServletRequest request) {
        ItemReceive itemReceive = itemReceiveService.create_itemReceive(request);
        if (itemReceive == null) {
            return null;
        }
        return itemReceiveService.convert_to_response(itemReceive);
    }

    @RequestMapping(path="/itemreceive/:itemReceive_id", produces="text/plain;", 
        method=RequestMethod.DELETE)
    @ResponseBody
    public String delete_itemReceive(@PathVariable("itemReceive_id") Long itemReceive_id) {
        itemReceiveRepository.deleteById(itemReceive_id);
        return "OK";
    }
}
}
