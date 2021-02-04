package com.wms.wms_server.model.response.items;

import com.wms.wms_server.model.response.Response;

public class ItemInventoryResponse extends Response {
    public int quantity;
    public long id;
    public String itemName;
    public String locationCode;
    public String shipmentCode;
    public String itemSku;
}
