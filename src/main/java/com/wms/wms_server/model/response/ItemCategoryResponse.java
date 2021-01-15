package com.wms.wms_server.model.response;

import java.util.Date;

public class ItemCategoryResponse {
    public Date createdDate;
    public Date lastModifiedDate;
    public String name;
    public long id;

    public ItemCategoryResponse(long id, String name, 
        Date createdDate, Date lastModifiedDate) 
    {
        this.name = name;
        this.id = id;
        this.createdDate = createdDate;
        this.lastModifiedDate = lastModifiedDate;
    }
}
