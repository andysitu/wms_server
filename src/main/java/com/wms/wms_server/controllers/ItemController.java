package com.wms.wms_server.controllers;

import javax.servlet.http.HttpServletRequest;

import com.wms.wms_server.model.items.ItemCategory;
import com.wms.wms_server.model.items.ItemInfo;
import com.wms.wms_server.model.response.ItemInfoResponse;
import com.wms.wms_server.repository.ItemCategoryRepository;
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

import java.util.*;

@Controller
public class ItemController {
    @Autowired
    ItemInfoRepository itemInfoRepository;
    @Autowired
    ItemCategoryRepository ItemCategoryRepository;

    @Autowired
    ItemInfoService itemInfoService;

    @GetMapping("/view_item_info")
    public String view_item_info() {
        return "items/view_item_info";
    }

    @RequestMapping(path="/item_info", produces="application/json;", method=RequestMethod.POST)
    @ResponseBody
    public ItemInfoResponse create_itemInfo(HttpServletRequest request) {
        return itemInfoService.convert_to_response(
        itemInfoService.create_itemInfo(request));
    }

    @RequestMapping(path="/item_info", produces="application/json;", method=RequestMethod.GET)
    @ResponseBody
    public List<ItemInfoResponse> search_itemInfos(@RequestParam String type, @RequestParam String value) {
        List<ItemInfo> items = itemInfoService.search_itemInfo(type, value);
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
    
    @RequestMapping(path="/item_info/{iteminfo_id}/itemskus", 
        produces="application/json;", method=RequestMethod.POST)
    @ResponseBody
    public Map<String, String> create_barcode(
            @PathVariable("iteminfo_id") Long iteminfo_id,
            HttpServletRequest request) {
        return itemInfoService.convert_itemSku_to_obj(
            itemInfoService.add_barcode(iteminfo_id, request.getParameter("sku"))
        );
    }

    @RequestMapping(path="/item_info/{iteminfo_id}/itemskus/{itemsku_id}", 
        produces="text/plain;", method=RequestMethod.DELETE)
    @ResponseBody
    public String delete_barcode(
            @PathVariable("iteminfo_id") Long iteminfo_id,
            @PathVariable("itemsku_id") Long itemsku_id) 
    {
        itemInfoService.delete_itemSku(iteminfo_id, itemsku_id);
        return "OK";
    }

    @RequestMapping(path="/item_categories", 
        produces="application/json;", method=RequestMethod.POST)
    @ResponseBody
    public Map<String, String> create_itemCategories(HttpServletRequest request) {
        ItemCategory itemCategory = new ItemCategory(request.getParameter("name"));
        ItemCategoryRepository.save(itemCategory);

        Map<String, String> c = new HashMap<>();
        c.put("name", itemCategory.getName());
        c.put("id", Long.toString(itemCategory.getId()));
        return c;
    }
}