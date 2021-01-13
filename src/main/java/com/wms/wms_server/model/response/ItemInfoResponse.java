package com.wms.wms_server.model.response;

import java.util.*;

public class ItemInfoResponse {
    public Long id;
    public String itemName;
    public String description;
    public float weight;

    public int width;
    public int length;
    public int height;

    public long itemCategoryId;
    public String itemCategoryName;

    public List<HashMap<String, String>> itemskus;
    
    public ItemInfoResponse(Long id, String itemName, String description, float weight) {
        this.id = id;
        this.itemName = itemName;
        this.description = description;
        this.weight = weight;
    }

    public void setDimensions(int width, int length, int height) {
        this.width = width;
        this.length = length;
        this.height = height;
    }
}
