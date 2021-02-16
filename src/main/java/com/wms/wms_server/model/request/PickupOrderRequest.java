package com.wms.wms_server.model.request;

public class PickupOrderRequest {
    public int quantity;
    public String locationCode;
    public String itemSku;
    public long orderPackageId;
}
