package com.wms.wms_server.model.request;

public class OrderPackageRequest {
    public long id;
    public int[] quantities;
    public long[] itemIds;
    public String orderName;
    public String description;

    public String contactName;
    public String companyName;
    public String address1;
    public String address2;
    public String city;
    public String state;
    public String zip;
    
    public String phone;
    public String email;

    public String transportName;

    OrderPackageRequest() {
        itemIds = new long[1];
    }

    OrderPackageRequest(long[] itemIds) {
        this.itemIds = itemIds;
    }
}
