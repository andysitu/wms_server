package com.wms.wms_server.model.user;

// import org.springframework.data.annotation.Id;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class WMSUser {
    @Id
    @GeneratedValue(strategy=GenerationType.AUTO)
    private Integer id;
    private String email;
    private String name;

    private String[] roles;

    public enum ROLES {
        USER, ADMIN
    }

    private String sub;

    public WMSUser() {
        super();
    }

    public WMSUser(String email, String name, String sub) {
        this.email = email;
        this.name = name;
        this.sub = sub;
        this.roles = new String[]{"USER"};
    }

    public String getEmail() {
        return email;
    }
    public String getName() {
        return name;
    }
    public String getSub() {
        return this.sub;
    }

    public String toString() {
        return "Sub: " + this.sub + "\nEmail: " + this.email + "\nName " + this.name;
    }
}