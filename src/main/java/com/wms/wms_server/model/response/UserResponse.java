package com.wms.wms_server.model.response;

public class UserResponse {
    public String name;
    public String email;
    public String sub;
    
    public UserResponse(String sub, String name, String email) {
        this.sub = sub;
        this.name = name;
        this.email = email;
    }
}
