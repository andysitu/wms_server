package com.wms.wms_server.model.items;

import javax.annotation.Generated;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

// import org.springframework.data.annotation.Id;

import org.springframework.stereotype.Component;


@Entity
public class ItemInfo {
    @Id
    @GeneratedValue(strategy=GenerationType.AUTO)
    private Integer id;
}
