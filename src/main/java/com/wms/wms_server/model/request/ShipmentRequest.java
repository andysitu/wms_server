package com.wms.wms_server.model.request;

public class ShipmentRequest {
    public long orderPackageId;
    public String contactName;
    public String companyName;
    public String address1;
    public String address2;
    public String city;
    public String state;
    public String zip;
    public String phone;
    public String email;

    public String tracking;
    public String transportName;
    public String shipmentType;

    public ShipmentItemRequest[] items;
    public ShipmentUnitRequest[] units;
}
