package com.wms.wms_server.model.items;

import javax.persistence.Column;
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

import lombok.Getter;

import java.util.Date;

@Entity
@EntityListeners(AuditingEntityListener.class)
public class ItemSku {
    @Id
    @GeneratedValue(strategy=GenerationType.AUTO)
    @Getter private Long id;

    @CreatedDate
    @Getter private Date createdDate;
    @LastModifiedDate
    @Getter private Date lastModifiedDate;
    @CreatedBy
    @Getter private String createdBy;
    @LastModifiedBy
    @Getter private String modifiedBy;

    @Column(unique=true)
    @Getter private String sku;

    public void setSku(String sku) {
        sku = sku.replaceAll("\\s", "");
        this.sku = sku;
    }

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "item_info_id", nullable = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @Getter private ItemInfo itemInfo;

    public void setItemInfo(ItemInfo itemInfo) {
        this.itemInfo = itemInfo;
    }

    public ItemSku() {}
    
    public ItemSku(String sku) {
        setSku(sku);
    }
}
