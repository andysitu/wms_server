package com.wms.wms_server.model.response;

public class ItemInfoResponse {
    public String itemName;
    public String description;
    public float weight;
    
    public ItemInfoResponse(String itemName, String description, float weight) {
        this.itemName = itemName;
        this.description = description;
        this.weight = weight;
    }
}
