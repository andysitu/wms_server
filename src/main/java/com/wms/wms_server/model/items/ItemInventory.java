package com.wms.wms_server.model.items;

import javax.persistence.Entity;
import javax.persistence.EntityListeners;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import org.springframework.data.annotation.LastModifiedBy;
import org.springframework.data.annotation.CreatedBy;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;

import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.FetchType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import java.util.Date;

import com.wms.wms_server.model.locations.Location;

import lombok.Getter;
import lombok.Setter;

@Entity
@EntityListeners(AuditingEntityListener.class)
public class ItemInventory {
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

    @Getter private int startQuantity;
    @Getter private int quantity;

    @Getter private int reservedQuantity = 0;

    public int reserveQuantity(int amount) {
        if (amount > quantity) {
            return -1;
        }
        this.quantity -= amount;
        this.reservedQuantity += amount;
        return amount;
    }

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(nullable = false)
    @Getter private Location location;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(nullable = false)
    @Getter private ItemInfo itemInfo;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(nullable = false)
    @Getter private ItemReceive itemReceive;

    // Default constructor needed for JPA
    public ItemInventory() {}

    public ItemInventory(ItemInfo itemInfo, Location location, int quantity, ItemReceive itemReceive) {
        this.location = location;
        this.itemInfo = itemInfo;
        this.quantity = this.startQuantity = quantity;
        this.itemReceive = itemReceive;
    }
}