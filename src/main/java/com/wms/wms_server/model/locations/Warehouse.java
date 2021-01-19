package com.wms.wms_server.model.locations;

import javax.persistence.Entity;
import javax.persistence.EntityListeners;

import org.springframework.data.annotation.LastModifiedBy;
import org.springframework.data.annotation.CreatedBy;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import java.util.Date;
import lombok.Getter;
import lombok.Setter;

@Entity
@EntityListeners(AuditingEntityListener.class)
public class Warehouse {
    @Id
    @GeneratedValue(strategy=GenerationType.AUTO)
    private Integer id;

    @Getter private String name;
    @Getter private String description;
    @Getter private String phone;
    @Getter private String address_1;
    @Getter private String address_2;
    @Getter private String city;
    @Getter private String state;
    @Getter private String country;
    @Getter private String zip;

    public String getName() {
        return this.name;
    }

    @CreatedDate
    private Date createdDate;
    @LastModifiedDate
    private Date lastModifiedDate;
    @CreatedBy
    private String createdBy;
    @LastModifiedBy
    private String modifiedBy;
}
