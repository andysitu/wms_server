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
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.FetchType;

import java.util.Date;

import lombok.Getter;
import lombok.Setter;

@Entity
@EntityListeners(AuditingEntityListener.class)
public class ItemOrder {
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

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(nullable = false)
    @Getter private ItemInventory itemInventory;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(nullable = false)
    @Getter private OrderPackage orderPackage;

    @Getter private int orderedQuantity;
    @Getter private int startQuantity;
    @Column(columnDefinition = "integer default 0")
    @Getter private int pickedQuantity = 0;
    @Column(columnDefinition = "integer default 0")
    @Getter private int completeQuantity = 0;

    /***
     * Increases pickedQuantity and decreases orderedQuantity by
     * amount specified by quantity.
     * @param quantity Number of items picked up
     * @return quantity
     */
    public int pickup(int quantity) {
        if (quantity > this.orderedQuantity) {
            return -1;
        }
        this.pickedQuantity += quantity;
        this.orderedQuantity -= quantity;
        return quantity;
    }

    @Column(columnDefinition = "integer default 0")
    @Getter private int complete;

    public String getItemSku() {
        return this.itemInventory.getItemReceive().getSku();
    }

    public ItemOrder() {}

    public ItemOrder(int quantity, ItemInventory itemInventory, 
            OrderPackage orderPackage) 
    {
        this.orderedQuantity = this.startQuantity = quantity;
        this.itemInventory = itemInventory;
        this.orderPackage = orderPackage;
    }
}
