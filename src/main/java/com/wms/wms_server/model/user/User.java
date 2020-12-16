package com.wms.wms_server.model.user;

import org.springframework.stereotype.Component;

import org.springframework.data.annotation.Id;

import org.springframework.data.mongodb.core.mapping.Document;

// @Document(collection="user")
@Component
public class User {
    @Id
    private String id;
    private String email;
    private String password;
    private String user;

    public User() {
        super();
    }

    public User(String email, String password, String user) {
        this.email = email;
        this.user = user;
        this.password = password;
    }

    public String getEmail() {
        return email;
    }
}