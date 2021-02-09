package com.wms.wms_server.model.request;

import com.wms.wms_server.model.items.OrderPackage;

public class OrderPackageRequest {
    public long[] itemIds;
    public int test;
    public String orderName;
    public String description;

    public String contactName;
    public String companyName;
    public String address1;
    public String address2;
    public String city;
    public String state;
    public String zip;

    public String transportName;

    OrderPackageRequest() {
        itemIds = new long[1];
    }

    OrderPackageRequest(long[] itemIds, int test) {
        this.itemIds = itemIds;
        this.test = test;
    }
}
