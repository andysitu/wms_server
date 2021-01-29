package com.wms.wms_server.model.response;

import java.util.Date;
import java.text.DateFormat;
import java.util.*;

public abstract class Response {
    public String convertDateToString(Date date) {
        DateFormat dateFormat = DateFormat.getDateTimeInstance();
        return dateFormat.format(date);
    }
}
