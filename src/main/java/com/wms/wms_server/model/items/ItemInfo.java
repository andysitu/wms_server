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
import javax.persistence.Column;
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

    private String itemName;
    private String description;
    private float weight;

    @Column(columnDefinition = "integer default 0")
    private int width;
    @Column(columnDefinition = "integer default 0")
    private int height;
    @Column(columnDefinition = "integer default 0")
    private int length;

    public String getItemName() {
        return this.itemName;
    }
    public void setItemName(String itemName) {
        this.itemName = itemName;
    }
    public String getDescription() {
        return this.description;
    }
    public void setDescription(String description) {
        this.description = description;
    }
    public void setWeight(float weight) {
        this.weight = weight;
    }
    public float getWeight() {
        return this.weight;
    }
    public Integer getId() {
        return this.id;
    }

    @OneToMany(cascade=CascadeType.ALL, fetch = FetchType.LAZY)
    private Set<ReceiveShipment> receiveShipments;

    @CreatedDate
    private Date createdDate;
    @LastModifiedDate
    private Date lastModifiedDate;
    @CreatedBy
    private String createdBy;
    @LastModifiedBy
    private String modifiedBy;

    private ItemInfo() {}

    private ItemInfo(Builder builder) {
        itemName    = builder.itemName;
        description = builder.description;
        weight      = builder.weight;
        height      = builder.height;
        width       = builder.width;
        length      = builder.length;
    }

    public static class Builder {
        private final String itemName;
        private final String description;
        private final float weight;

        private int width;
        private int height;
        private int length;

        public Builder(String itemName, String description, float weight) {
            this.itemName = itemName;
            this.description = description;
            this.weight = weight;
        }

        public void width(int width) {
            this.width = width;
        }
        public void height(int height) {
            this.height = height;
        }
        public void length(int length) {
            this.length = length;
        }

        public ItemInfo build() {
            return new ItemInfo(this);
        }
    }
}
