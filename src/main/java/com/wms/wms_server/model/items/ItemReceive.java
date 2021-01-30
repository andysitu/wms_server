package com.wms.wms_server.model.items;

import javax.persistence.Entity;
import javax.persistence.EntityListeners;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import org.springframework.data.annotation.CreatedBy;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.annotation.LastModifiedBy;

import com.wms.wms_server.model.shipments.ShipmentReceive;

import javax.persistence.FetchType;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Entity
@EntityListeners(AuditingEntityListener.class)
public class ItemReceive {
    @Id
    @GeneratedValue(strategy=GenerationType.AUTO)
    @Getter @Setter private Long id;

    @CreatedDate
    @Getter private Date createdDate;
    @LastModifiedDate
    @Getter private Date lastModifiedDate;
    @CreatedBy
    @Getter private String createdBy;
    @LastModifiedBy
    @Getter private String modifiedBy;

    @Getter @Setter private int quantity;
    @Getter private int startQuantity;

    @Getter private String sku;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="shipment_receive_id", nullable = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @Getter @Setter private ShipmentReceive shipmentReceive;

    public String getShipmentCode() {
        return this.shipmentReceive.getCode();
    }

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="item_info_id", nullable = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @Getter @Setter private ItemInfo itemInfo;

    public ItemReceive() {}
    public ItemReceive(int quantity, String sku,
            ShipmentReceive shipmentReceive, ItemInfo itemInfo) {
        this.sku = sku;
        this.quantity = quantity;
        this.startQuantity = quantity;
        this.shipmentReceive = shipmentReceive;
        this.itemInfo = itemInfo;
    }
}