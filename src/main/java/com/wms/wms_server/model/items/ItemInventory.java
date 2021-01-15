package com.wms.wms_server.model.items;

import javax.persistence.Entity;
import javax.persistence.EntityListeners;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
@EntityListeners(AuditingEntityListener.class)
public class ItemInventory {
    @Id
    @GeneratedValue(strategy=GenerationType.AUTO)
    private Long id;

    private int quantity;
}