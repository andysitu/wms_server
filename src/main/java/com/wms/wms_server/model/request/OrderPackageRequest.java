package com.wms.wms_server.model.request;

import com.wms.wms_server.model.items.OrderPackage;

public class OrderPackageRequest {
    public long[] itemIds;
    public int test;

    OrderPackageRequest() {
        itemIds = new long[1];
    }

    OrderPackageRequest(long[] itemIds, int test) {
        this.itemIds = itemIds;
        this.test = test;
    }
}
