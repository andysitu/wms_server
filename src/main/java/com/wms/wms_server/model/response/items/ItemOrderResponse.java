package com.wms.wms_server.model.response.items;

public class ItemOrderResponse {
    public long id;
    
    public int orderedQuantity;
    public int startQuantity;
    public int pickedQuantity;
    public int complete;

    public ItemInventoryResponse itemInventoryReseponse;
}
