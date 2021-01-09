package com.wms.wms_server.services;

import com.wms.wms_server.model.items.ItemInfo;
import com.wms.wms_server.model.items.ItemUpc;
import com.wms.wms_server.model.request.ItemInfoRequest;
import com.wms.wms_server.model.response.ItemInfoResponse;
import com.wms.wms_server.repository.ItemInfoRepository;
import com.wms.wms_server.repository.ItemUpcRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

import javax.servlet.http.HttpServletRequest;

import java.util.ArrayList;
import java.util.HashMap;;

@Service
public class ItemInfoService {
    @Autowired
    ItemInfoRepository itemInfoRepository;
    @Autowired
    ItemUpcRepository itemUpcRepository;

    public ItemInfo create_itemInfo(HttpServletRequest request) {
        if (request.getParameter("name") == null ||
                request.getParameter("description") == null ||
                request.getParameter("weight") == null) {
            return null;
        }
        ItemInfo.Builder builder = new ItemInfo.Builder(
            request.getParameter("name"),
            request.getParameter("description"),
            Float.parseFloat(request.getParameter("weight"))
            );
        if (request.getParameter("height") != null && 
                request.getParameter("height").length() > 0 &&
                request.getParameter("width") != null &&
                request.getParameter("width").length() > 0 &&
                request.getParameter("length") != null &&
                request.getParameter("length").length() > 0) {
            builder.height(Integer.parseInt(request.getParameter("height")));
            builder.width(Integer.parseInt(request.getParameter("width")));
            builder.length(Integer.parseInt(request.getParameter("length")));
        }
        ItemInfo itemInfo = builder.build();
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
        ItemInfoResponse response = new ItemInfoResponse(
            item.getId(), item.getItemName(), item.getDescription(), item.getWeight());

        List<HashMap<String, String>> upcs = new ArrayList<>();
        HashMap<String, String> upc;
        // List<String> barcodes = new ArrayList<>();
        for (ItemUpc itemUpc : itemUpcRepository.findByItemInfoId(item.getId())) {
            upc = new HashMap<>();
            upc.put("upc", itemUpc.getUpc());
            upc.put("id", Long.toString(itemUpc.getId()));
            upcs.add(upc);
        }
        response.itemupcs = upcs;
        response.setDimensions(item.getWidth(), item.getLength(), item.getHeight());
        return response;
    }

    public ItemInfo edit_itemInfo(Long id, HttpServletRequest request) {
        Optional<ItemInfo> oItemInfo = itemInfoRepository.findById(id);
        if (oItemInfo.isPresent()) {
            ItemInfo itemInfo = oItemInfo.get();
            if (request.getParameter("name") != null && request.getParameter("name").length() > 0) {
                itemInfo.setItemName(request.getParameter("name"));
            }
            if (request.getParameter("description") != null && request.getParameter("description").length() > 0) {
                itemInfo.setDescription(request.getParameter("description"));
            }
            if (request.getParameter("weight" ) != null && request.getParameter("weight").length() > 0) {
                itemInfo.setWeight(Float.parseFloat(request.getParameter("weight")));
            }
            itemInfoRepository.save(itemInfo);
            return itemInfo;
        } else {
            return null;
        }
    }

    public ItemInfo add_barcodes(Long itemInfo_id, String upc) {
        Optional<ItemInfo> oItemInfo = itemInfoRepository.findById(itemInfo_id);
        if (oItemInfo.isPresent()) {
            ItemInfo itemInfo = oItemInfo.get();
            ItemUpc itemUpc = new ItemUpc(upc);
            itemUpc.setItemInfo(itemInfo);
            itemUpcRepository.save(itemUpc);
            return itemInfo;
        } else {
            return null;
        }
    }

    public void delete_itemUpc(Long itemInfo_id, Long itemUpc_id) {
        Optional<ItemUpc> oItemUpc = itemUpcRepository.findByIdAndItemInfoId(itemUpc_id, itemInfo_id);
        if (oItemUpc.isPresent()) {
            itemUpcRepository.delete(oItemUpc.get());
        }
    }
}