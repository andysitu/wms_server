package com.wms.wms_server.model.response.items;

import com.wms.wms_server.model.request.ShipmentData;

public class OrderPackageResponse {
    public long id;
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

    public int complete;

    public ItemOrderResponse[] itemOrderResponses;
    public ShipmentData[] shipments;
}