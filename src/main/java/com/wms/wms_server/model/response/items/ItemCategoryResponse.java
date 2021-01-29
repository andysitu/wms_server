package com.wms.wms_server.model.response.items;

import java.util.Date;

public class ItemCategoryResponse {
    public String createdDate;
    public String lastModifiedDate;
    public String name;
    public long id;

    public ItemCategoryResponse(long id, String name, 
        String createdDate, String lastModifiedDate) 
    {
        this.name = name;
        this.id = id;
        this.createdDate = createdDate;
        this.lastModifiedDate = lastModifiedDate;
    }
}
