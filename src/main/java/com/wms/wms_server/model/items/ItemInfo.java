package com.wms.wms_server.model.items;

import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.FetchType;

import org.springframework.data.annotation.LastModifiedBy;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;
import org.springframework.data.annotation.CreatedBy;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;

import org.springframework.data.jpa.domain.support.AuditingEntityListener;
import javax.persistence.EntityListeners;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;

import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Entity
@EntityListeners(AuditingEntityListener.class)
public class ItemInfo {
    @Id
    @GeneratedValue(strategy=GenerationType.AUTO)
    @Getter private Long id;

    @Getter @Setter private String itemName;
    @Getter @Setter private String description;
    @Getter @Setter private float weight;

    @Column(columnDefinition = "integer default 0")
    @Getter @Setter private int width;
    @Column(columnDefinition = "integer default 0")
    @Getter @Setter private int height;
    @Column(columnDefinition = "integer default 0")
    @Getter @Setter private int length;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="item_category_id", nullable = true)
    @OnDelete(action = OnDeleteAction.NO_ACTION)
    private ItemCategory itemCategory;

    public void setItemCategory(ItemCategory itemCategory) {
        this.itemCategory = itemCategory;
    }
    public Long getItemCategoryId() {
        if (this.itemCategory != null) {
            return this.itemCategory.getId();
        } else {
            return null;
        }
    }
    public String getItemCategoryName() {
        if (this.itemCategory != null) {
            return this.itemCategory.getName();
        } else {
            return "";
        }
    }

    @CreatedDate
    private Date createdDate;
    @LastModifiedDate
    private Date lastModifiedDate;
    @CreatedBy
    private String createdBy;
    @LastModifiedBy
    private String modifiedBy;

    public ItemInfo() {}

    private ItemInfo(Builder builder) {
        itemName        = builder.itemName;
        description     = builder.description;
        weight          = builder.weight;
        height          = builder.height;
        width           = builder.width;
        length          = builder.length;
        itemCategory    = builder.itemCategory;
    }

    public static class Builder {
        private final String itemName;
        private final String description;
        private final float weight;

        private int width;
        private int height;
        private int length;

        private ItemCategory itemCategory;

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
        public void itemCategory(ItemCategory itemCategory) {
            this.itemCategory = itemCategory;
        }

        public ItemInfo build() {
            return new ItemInfo(this);
        }
    }
}
