package com.wms.wms_server.model.locations;

import javax.persistence.Entity;
import javax.persistence.EntityListeners;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import org.springframework.data.annotation.LastModifiedBy;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;
import org.springframework.data.annotation.CreatedBy;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.util.Date;

@Entity
@EntityListeners(AuditingEntityListener.class)
public class Location {
    @Id
    @GeneratedValue(strategy=GenerationType.AUTO)
    private Integer id;

    private int row;
    private int bay;
    private int level;
    private int shelf;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "area_id", nullable = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    private Area area;
    
    @CreatedDate
    private Date createdDate;
    @LastModifiedDate
    private Date lastModifiedDate;
    @CreatedBy
    private String createdBy;
    @LastModifiedBy
    private String modifiedBy;
        
    public Location() {}

    public Location(int row, int bay, int level, int shelf) {
        this.row = row;
        this.bay = bay;
        this.level = level;
        this.shelf = shelf;
    }

    public Integer getId() {
        return this.id;
    }
    public void setArea(Area area) {
        this.area = area;
    }
    public Area getArea() {
        return this.area;
    }
    public String getAreaString() {
        return this.area.getArea();
        // return this.area;
    }
    public int getRow() {
        return this.row;
    }
    public int getBay() {
        return this.bay;
    }
    public int getLevel() {
        return this.level;
    }
    public int getShelf() {
        return this.shelf;
    }
    public Date getCreatedDate() {
        // return new Date(this.createdDate.getTime());
        return this.createdDate;
    }
    public Date getModifiedDate() {
        // return new Date(this.lastModifiedDate.getTime());
        return this.lastModifiedDate;
    }
    public String getCreatedBy() {
        return this.createdBy;
    }
}