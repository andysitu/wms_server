package com.wms.wms_server.controllers;

import java.util.ArrayList;

import com.wms.wms_server.model.items.ItemCategory;
import com.wms.wms_server.model.response.ItemCategoryResponse;
import com.wms.wms_server.repository.ItemCategoryRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import java.text.DateFormat;
import java.util.*;


@Controller
public class ItemCategoryController {
    @Autowired
    ItemCategoryRepository itemCategoryRepository;

    @GetMapping(value="/view_categories")
    public String view_categories() {
        return "category/view_categories";
    }
    
    @GetMapping(value="/categories")
    @ResponseBody
    public List<ItemCategoryResponse> get_categories() {
        List<ItemCategoryResponse> responses = new ArrayList<>();
        DateFormat dateFormat = DateFormat.getDateTimeInstance();
        for (ItemCategory category : itemCategoryRepository.findAll()) {
            responses.add(
                new ItemCategoryResponse(category.getId(), category.getName(), 
                dateFormat.format(category.getCreatedDate()), 
                dateFormat.format(category.getLastModifiedDate()))
            );
        }
        return responses;
    }
}
