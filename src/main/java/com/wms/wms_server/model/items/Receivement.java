package com.wms.wms_server.model.items;

import org.springframework.data.annotation.Id;

import java.util.Date;

import org.springframework.data.mongodb.core.mapping.Document;

@Document
public class Receivement {
    private String item_name;
    public String description;
    private Date receivement_date;
}