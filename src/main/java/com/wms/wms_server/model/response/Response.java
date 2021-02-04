package com.wms.wms_server.model.response;

import java.util.Date;
import java.text.DateFormat;
import java.util.*;

public abstract class Response {
    public String createdDate;

    public void setCreatedDate(Date date) {
        this.createdDate = convertDateToString(date);
    }
    
    public String convertDateToString(Date date) {
        DateFormat dateFormat = DateFormat.getDateTimeInstance();
        return dateFormat.format(date);
    }
}
