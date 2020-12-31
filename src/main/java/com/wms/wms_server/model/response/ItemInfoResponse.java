package com.wms.wms_server.model.response;

public class ItemInfoResponse {
    public int id;
    public String itemName;
    public String description;
    public float weight;
    
    public ItemInfoResponse(int id, String itemName, String description, float weight) {
        this.id = id;
        this.itemName = itemName;
        this.description = description;
        this.weight = weight;
    }
}
