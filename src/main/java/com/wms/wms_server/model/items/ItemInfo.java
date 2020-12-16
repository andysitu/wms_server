package com.wms.wms_server.model.items;

import org.springframework.data.annotation.Id;

import org.springframework.stereotype.Component;

import org.springframework.data.mongodb.core.mapping.Document;

@Document
public class ItemInfo {
    @Id
    private String id;
}
