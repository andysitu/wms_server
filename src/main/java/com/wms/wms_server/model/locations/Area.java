package com.wms.wms_server.model.locations;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.EntityListeners;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;

import org.springframework.data.annotation.LastModifiedBy;
import org.springframework.data.annotation.CreatedBy;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;

import java.util.Set;
import java.util.Date;
import java.util.HashSet;

import org.springframework.data.jpa.domain.support.AuditingEntityListener;

@Entity
@EntityListeners(AuditingEntityListener.class)
public class Area {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String area;

    // @OneToMany(cascade = CascadeType.ALL, 
    //             fetch = FetchType.LAZY, mappedBy = "area")
    // private Set<Location> locations = new HashSet<>();

    public Area(String area) {
        this.area = area;
    }

    @CreatedDate
    private Date createdDate;
    @LastModifiedDate
    private Date lastModifiedDate;
    @CreatedBy
    public String createdBy;
    @LastModifiedBy
    public String modifiedBy;
}
