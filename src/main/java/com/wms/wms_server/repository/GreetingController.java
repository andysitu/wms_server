package com.wms.wms_server;

import org.springframework.web.bind.annotation.*;
import org.springframework.beans.factory.annotation.Autowired;

import com.wms.wms_server.firebase.FirebaseService;

@RestController
public class GreetingController {

    @Autowired
    FirebaseService firebaseService;

    @GetMapping("/greeting")
    public String greeting() {
        try {
            firebaseService.getUsers();
        } catch (Exception e) {
            e.printStackTrace();
        }
        

        return "hello world!";
    }
}