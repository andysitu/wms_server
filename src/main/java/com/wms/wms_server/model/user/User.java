package com.wms.wms_server.model.user;

import org.springframework.data.annotation.Id;

import org.springframework.data.mongodb.core.mapping.Document;

@Document
public class User {
    @Id
    private String id;
    private String email;
    private String name;

    private String sub;

    public User() {
        super();
    }

    public User(String email, String name, String sub) {
        this.email = email;
        this.name = name;
        this.sub = sub;
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