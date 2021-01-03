package com.wms.wms_server.model.items;

import javax.persistence.Id;

import org.springframework.data.annotation.LastModifiedBy;
import org.springframework.data.annotation.CreatedBy;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;

import org.springframework.data.jpa.domain.support.AuditingEntityListener;
import javax.persistence.EntityListeners;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;

import java.util.Date;

@Entity
@EntityListeners(AuditingEntityListener.class)
public class ReceiveShipment {
    @Id
    @GeneratedValue(strategy=GenerationType.AUTO)
    private Integer id;

    @CreatedDate
    private Date createdDate;
    @LastModifiedDate
    private Date lastModifiedDate;
    @CreatedBy
    private String createdBy;
    @LastModifiedBy
    private String modifiedBy;  
}