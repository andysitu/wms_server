package com.wms.wms_server.controllers;

import javax.servlet.http.HttpServletRequest;

import com.wms.wms_server.model.items.ItemInfo;
import com.wms.wms_server.model.response.ItemInfoResponse;
import com.wms.wms_server.repository.ItemInfoRepository;
import com.wms.wms_server.services.ItemInfoService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;

@Controller
public class ItemController {
    @Autowired
    ItemInfoRepository itemInfoRepository;

    @Autowired
    ItemInfoService itemInfoService;

    @GetMapping("/view_item_info")
    public String view_item_info() {
        return "items/view_item_info";
    }

    @RequestMapping(path="/item_info", produces="application/json;", method=RequestMethod.POST)
    @ResponseBody
    public ItemInfo create_itemInfo(HttpServletRequest request) {
        return itemInfoService.create_itemInfo(request);
    }

    @RequestMapping(path="/item_info", produces="application/json;", method=RequestMethod.GET)
    @ResponseBody
    public List<ItemInfoResponse> search_itemInfos(@RequestParam String type, @RequestParam String value) {
        System.out.println(type);
        System.out.println(value);
        List<ItemInfo> items = itemInfoService.search_itemInfo(type, value);
        for (ItemInfo item : items) {
            System.out.println("name " + item.getItemName());
        }
        return itemInfoService.convert_list_to_responses(items);
    }

    @RequestMapping(path="/item_info/{iteminfo_id}", produces="text/plain;", method=RequestMethod.DELETE)
    @ResponseBody
    public String delete_itemInfo(@PathVariable("iteminfo_id") Long iteminfo_id) {
        itemInfoRepository.deleteById(iteminfo_id);
        return "OK";
    }

    @RequestMapping(path="/item_info/{iteminfo_id}", produces="application/json;", method=RequestMethod.PATCH)
    @ResponseBody
    public ItemInfoResponse edit_itemInfo(@PathVariable("iteminfo_id") Long iteminfo_id,
            HttpServletRequest request) {
        ItemInfo itemInfo = itemInfoService.edit_itemInfo(iteminfo_id, request);

        return itemInfoService.convert_to_response(itemInfo);
    }
    
    @RequestMapping(path="/item_info/{iteminfo_id}/itemupcs", produces="application/json;", method=RequestMethod.POST)
    @ResponseBody
    public ItemInfoResponse create_barcodes(
            @PathVariable("iteminfo_id") Long iteminfo_id,
            HttpServletRequest request) {
        return itemInfoService.convert_to_response(
            itemInfoService.add_barcodes(iteminfo_id, request.getParameter("upc"))
        );
    }

    @RequestMapping(path="/item_info/{iteminfo_id}/itemupcs/{itemupc_id}", produces="application/json;", method=RequestMethod.DELETE)
    @ResponseBody
    public String create_barcodes(
            @PathVariable("iteminfo_id") Long iteminfo_id,
            @PathVariable("itemupc_id") Long itemupc_id) 
    {
        itemInfoService.delete_itemUpc(iteminfo_id, itemupc_id);
        return "HI";
    }
}