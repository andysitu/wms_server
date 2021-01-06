package com.wms.wms_server.model.response;

public class ItemInfoResponse {
    public int id;
    public String itemName;
    public String description;
    public float weight;

    public int width;
    public int length;
    public int height;
    
    public ItemInfoResponse(int id, String itemName, String description, float weight) {
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
