package com.wms.wms_server.model.response;

import java.util.Date;

public class ItemReceiveResponse {
    public Long id;
    public int quantity;
    public String itemSku;
    public String shipmentCode;

    public ItemInfoResponse itemInfoResponse;

    public Date createdDate;
}
