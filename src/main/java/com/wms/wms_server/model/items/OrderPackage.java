package com.wms.wms_server.model.items;

import org.springframework.data.annotation.CreatedBy;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.annotation.LastModifiedBy;

import org.springframework.data.jpa.domain.support.AuditingEntityListener;
import javax.persistence.EntityListeners;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;

import javax.persistence.Id;

import com.wms.wms_server.model.request.OrderPackageRequest;

import java.util.Date;

import lombok.Getter;
import lombok.Setter;

@Entity
@EntityListeners(AuditingEntityListener.class)
public class OrderPackage {
    @Id
    @GeneratedValue(strategy=GenerationType.AUTO)
    @Getter private Long id;

    @CreatedDate
    private Date createdDate;
    @LastModifiedDate
    private Date lastModifiedDate;
    @CreatedBy
    private String createdBy;
    @LastModifiedBy
    private String modifiedBy;

    @Getter private String orderName;
    @Getter private String description;

    @Getter private String contactName;
    @Getter private String companyName;
    @Getter private String address1;
    @Getter private String address2;
    @Getter private String city;
    @Getter private String state;
    @Getter private String zip;
    @Getter private String phone;
    @Getter private String email;

    @Getter private String transportName;

    @Column(columnDefinition = "integer default 0")
    @Getter private int complete;

    public OrderPackage() {}

    public OrderPackage(OrderPackageRequest request) {
        this.orderName = request.orderName;
        this.description = request.description;
        this.contactName = request.contactName;
        this.companyName = request.companyName;

        this.address1 = request.address1;
        this.address2 = request.address2;
        this.city = request.city;
        this.state = request.state;
        this.zip = request.zip;

        this.transportName = request.transportName;
    }
}
