package com.wms.wms_server.model.items;

import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.FetchType;

import org.springframework.data.annotation.LastModifiedBy;
import org.springframework.data.annotation.CreatedBy;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;

import org.springframework.data.jpa.domain.support.AuditingEntityListener;
import javax.persistence.EntityListeners;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;

import java.util.Date;
import java.util.Set;

@Entity
@EntityListeners(AuditingEntityListener.class)
public class ItemInfo {
    @Id
    @GeneratedValue(strategy=GenerationType.AUTO)
    private Integer id;

    private String item_name;
    private String description;
    private float weight;

    @OneToMany(cascade=CascadeType.ALL, fetch = FetchType.LAZY)
    private Set<ReceiveShipment> receiveShipments;

    @CreatedDate
    private Date createdDate;
    @LastModifiedDate
    private Date lastModifiedDate;
    @CreatedBy
    public String createdBy;
    @LastModifiedBy
    public String modifiedBy;

    private ItemInfo(Builder builder) {
        this.item_name = builder.item_name;
        this.description = builder.description;
        this.weight = builder.weight;
    }

    public static class Builder {
        private final String item_name;
        private final String description;
        private final float weight;

        public Builder(String item_name, String description, float weight) {
            this.item_name = item_name;
            this.description = description;
            this.weight = weight;
        }

        public ItemInfo build() {
            return new ItemInfo(this);
        }
    }
}
