package com.wms.wms_server.model.shipment;

import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import com.wms.wms_server.model.items.ItemOrder;

import javax.persistence.FetchType;

import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;
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

import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Entity
@EntityListeners(AuditingEntityListener.class)
public class ShipmentItem {
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

    @Getter private int quantity;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(nullable = true)
    @OnDelete(action = OnDeleteAction.NO_ACTION)
    @Getter private Shipment shipment;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(nullable = true)
    @OnDelete(action = OnDeleteAction.NO_ACTION)
    @Getter private ItemOrder itemOrder;

    public ShipmentItem() {}
    public ShipmentItem(int quantity, Shipment shipment, ItemOrder itemorder) {
        this.quantity = quantity;
        this.shipment = shipment;
        this.itemOrder = itemOrder;
    }
}
