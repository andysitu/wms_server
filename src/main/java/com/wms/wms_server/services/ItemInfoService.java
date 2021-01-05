package com.wms.wms_server.services;

import com.wms.wms_server.model.items.ItemInfo;
import com.wms.wms_server.model.response.ItemInfoResponse;
import com.wms.wms_server.repository.ItemInfoRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

import javax.servlet.http.HttpServletRequest;

import java.util.ArrayList;

@Service
public class ItemInfoService {
    @Autowired
    ItemInfoRepository itemInfoRepository;

    public ItemInfo create_itemInfo(HttpServletRequest request) {
        if (request.getParameter("name") == null ||
                request.getParameter("description") == null ||
                request.getParameter("weight") == null) {
            return null;
        }
        ItemInfo itemInfo = new ItemInfo.Builder(
            request.getParameter("name"),
            request.getParameter("description"),
            Float.parseFloat(request.getParameter("weight"))
            ).build();
        itemInfoRepository.save(itemInfo);
        return itemInfo;
    }

    public List<ItemInfo> search_itemInfo(String type, String value) {
        if (type.equals("name")) {
            return itemInfoRepository.findByItemNameContainingIgnoreCase(value);
        } else if (type.equals("description")) {
            return itemInfoRepository.findByDescriptionContainingIgnoreCase(value);
        } else {
            return new ArrayList<>();
        }
    }

    public List<ItemInfoResponse> convert_list_to_responses(List<ItemInfo> items) {
        List<ItemInfoResponse> l = new ArrayList<>();
        ItemInfoResponse ir;
        for (ItemInfo item : items) {
            ir = this.convert_to_response(item);
            l.add(ir);
        }
        return l;
    }

    public ItemInfoResponse convert_to_response(ItemInfo item) {
        if (item == null) {
            return null;
        }
        return new ItemInfoResponse(
            item.getId(), item.getItemName(), item.getDescription(), item.getWeight());
    }

    public ItemInfo edit_itemInfo(Integer id, HttpServletRequest request) {
        Optional<ItemInfo> oItemInfo = itemInfoRepository.findById(id);
        if (oItemInfo.isPresent()) {
            ItemInfo itemInfo = oItemInfo.get();
            if (request.getParameter("name") != null) {
                itemInfo.setItemName(request.getParameter("name"));
            }
            if (request.getParameter("description") != null) {
                itemInfo.setDescription(request.getParameter("description"));
            }
            if (request.getParameter("weight") != null) {
                itemInfo.setWeight(Float.parseFloat(request.getParameter("weight")));
            }
            itemInfoRepository.save(itemInfo);
            return itemInfo;
        } else {
            return null;
        }
    }
}