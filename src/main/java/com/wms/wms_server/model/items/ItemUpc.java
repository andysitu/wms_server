package com.wms.wms_server.model.items;

import javax.persistence.Entity;
import javax.persistence.EntityListeners;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import org.springframework.data.annotation.LastModifiedBy;
import org.springframework.data.annotation.CreatedBy;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.util.Date;

@Entity
@EntityListeners(AuditingEntityListener.class)
public class ItemUpc {
    @Id
    @GeneratedValue(strategy=GenerationType.AUTO)
    private Long id;

    @CreatedDate
    private Date createdDate;
    @LastModifiedDate
    private Date lastModifiedDate;
    @CreatedBy
    private String createdBy;
    @LastModifiedBy
    private String modifiedBy;

    private String upc;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "item_info_id", nullable = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    private ItemInfo itemInfo;

    public void setItemInfo(ItemInfo itemInfo) {
        this.itemInfo = itemInfo;
    }

    public String getUpc() {
        return this.upc;
    }
    public Long getId() {
        return this.id;
    }

    public ItemUpc() {}
    
    public ItemUpc(String upc) {
        this.upc = upc;
    }
}
