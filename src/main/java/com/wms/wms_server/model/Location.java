package com.wms.wms_server.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

// import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.LastModifiedBy;
import org.springframework.data.annotation.CreatedBy;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;

import java.util.Date;

@Entity
public class Location {
    @Id
    @GeneratedValue(strategy=GenerationType.AUTO)
    private Integer id;

    private String area;
    private String loc;
    private int row;
    private int bay;
    private int level;
    private int shelf;

    @CreatedDate
    private Date createdDate;
    @LastModifiedDate
    private Date lastModifiedDate;
    @CreatedBy
    public String created;
    @LastModifiedBy
    public String modified;
        
    public Location() {

    }

    public Location(String area, String loc, int row, int bay, int level, int shelf) {
        this.area = area;
        this.loc = loc;
        this.row = row;
        this.bay = bay;
        this.level = level;
        this.shelf = shelf;
    }

    public Integer getId() {
        return this.id;
    }
    public String getArea() {
        return this.area;
    }
    public String getLoc() {
        return this.loc;
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
        return new Date(this.createdDate.getTime());
    }
    public Date getModifiedDate() {
        return new Date(this.lastModifiedDate.getTime());
    }
}