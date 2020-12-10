package com.wms.wms_server.model;

import org.springframework.stereotype.Component;

@Component
public class User {
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