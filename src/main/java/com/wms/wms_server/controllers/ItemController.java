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
    ItemInfoService ItemInfoService;

    @GetMapping("/view_item_info")
    public String view_item_info() {
        return "items/view_item_info";
    }

    @RequestMapping(path="/item_info", produces="application/json;", method=RequestMethod.POST)
    @ResponseBody
    public ItemInfo create_itemInfo(HttpServletRequest request) {
        ItemInfo itemInfo = new ItemInfo.Builder(
            request.getParameter("name"),
            request.getParameter("description"),
            Float.parseFloat(request.getParameter("weight"))
            ).build();
        itemInfoRepository.save(itemInfo);
        return itemInfo;
    }

    @RequestMapping(path="/item_info", produces="application/json;", method=RequestMethod.GET)
    @ResponseBody
    public List<ItemInfoResponse> search_itemInfos(@RequestParam String type, @RequestParam String value) {
        System.out.println(type);
        System.out.println(value);
        List<ItemInfo> items = ItemInfoService.search_itemInfo(type, value);
        for (ItemInfo item : items) {
            System.out.println("name " + item.getItemName());
        }
        return ItemInfoService.convert_list_to_response(items);
    }

    @RequestMapping(path="/item_info/{iteminfo_id}", produces="text/plain;", method=RequestMethod.DELETE)
    @ResponseBody
    public String delete_itemInfo(@PathVariable("iteminfo_id") Integer iteminfo_id) {
        itemInfoRepository.deleteById(iteminfo_id);
        return "OK";
    }

    @RequestMapping(path="/item_info", produces="text/plain;", method=RequestMethod.PATCH)
    @ResponseBody
    public String edit_itemInfo(@RequestParam("iteminfo_id") Integer iteminfo_id) {
        return "OK";
    }
}
