package com.wms.wms_server.model.items;

import javax.persistence.Entity;
import javax.persistence.EntityListeners;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import com.wms.wms_server.model.shipments.ShipmentReceive;

import javax.persistence.FetchType;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import lombok.Getter;
import lombok.Setter;

@Entity
@EntityListeners(AuditingEntityListener.class)
public class ItemReceive {
    @Id
    @GeneratedValue(strategy=GenerationType.AUTO)
    private Long id;

    @Getter @Setter private int quantity;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="shipment_receive_id", nullable = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @Getter @Setter private ShipmentReceive shipmentReceive;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="item_info_id", nullable = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @Getter @Setter private ItemInfo itemInfo;


    public ItemReceive(int quantity, ShipmentReceive shipmentReceive, 
            ItemInfo itemInfo) {
        this.quantity = quantity;
        this.shipmentReceive = shipmentReceive;
        this.itemInfo = itemInfo;
    }
}