package com.wms.wms_server.model.locations;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EntityListeners;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import org.springframework.data.annotation.LastModifiedBy;
import org.springframework.data.annotation.CreatedBy;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.util.Date;

import lombok.Getter;
import lombok.Setter;

@Entity
@EntityListeners(AuditingEntityListener.class)
public class Location {
    @Id
    @GeneratedValue(strategy=GenerationType.AUTO)
    @Getter private Integer id;

    @Getter private int row;
    @Getter private int bay;
    @Getter private int level;
    @Getter private int shelf;
    @Column(unique=true)
    @Getter private String locationCode;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "area_id", nullable = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    private Area area;
    
    @CreatedDate
    @Getter private Date createdDate;
    @LastModifiedDate
    @Getter private Date lastModifiedDate;
    @CreatedBy
    @Getter private String createdBy;
    @LastModifiedBy
    @Getter private String modifiedBy;
        
    public Location() {}

    public Location(Area area, int row, int bay, int level, int shelf) {
        this.area = area;
        this.row = row;
        this.bay = bay;
        this.level = level;
        this.shelf = shelf;
        this.locationCode = getAreaString() + "-" + Integer.toString(row) + "-" +
            Integer.toString(bay) + "-" + Integer.toString(level) + "-" +
            Integer.toString(shelf);
    }

    public Area getArea() {
        return this.area;
    }
    public String getAreaString() {
        return this.area.getArea();
        // return this.area;
    }
    
}