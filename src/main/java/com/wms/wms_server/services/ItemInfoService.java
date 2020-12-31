package com.wms.wms_server.services;

import com.wms.wms_server.model.items.ItemInfo;
import com.wms.wms_server.model.response.ItemInfoResponse;
import com.wms.wms_server.repository.ItemInfoRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.ArrayList;

@Service
public class ItemInfoService {
    @Autowired
    ItemInfoRepository itemInfoRepository;

    public List<ItemInfo> search_itemInfo(String type, String value) {
        if (type.equals("name")) {
            return itemInfoRepository.findByItemNameContainingIgnoreCase(value);
        } else if (type.equals("description")) {
            return itemInfoRepository.findByDescriptionContainingIgnoreCase(value);
        } else {
            return new ArrayList<>();
        }
    }

    public List<ItemInfoResponse> convert_list_to_response(List<ItemInfo> items) {
        List<ItemInfoResponse> l = new ArrayList<>();
        ItemInfoResponse ir;
        for (ItemInfo i : items) {
            ir = new ItemInfoResponse(i.getId(), i.getItemName(), i.getDescription(), i.getWeight());
            l.add(ir);
        }
        return l;
    }
}
