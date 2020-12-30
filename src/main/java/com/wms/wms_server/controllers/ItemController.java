package com.wms.wms_server.controllers;

import javax.servlet.http.HttpServletRequest;

import com.wms.wms_server.model.items.ItemInfo;
import com.wms.wms_server.repository.ItemInfoRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class ItemController {
    @Autowired
    ItemInfoRepository itemInfoRepository;

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
    public ItemInfo search_itemInfos(@RequestParam String type, @RequestParam String value) {
        System.out.println(type);
        System.out.println(value);
        return null;
    }
}
