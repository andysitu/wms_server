package com.wms.wms_server.controllers;

import org.springframework.web.bind.annotation.*;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;
import com.wms.wms_server.model.user.User;


@RestController
public class GreetingController {

    // @Autowired
    // FirebaseService firebaseService;

    @GetMapping("/greeting")
    public String greeting() {
        // try {
        //     List<QueryDocumentSnapshot> documents = firebaseService.getUsers();
        //     String s = "";
        //     User u = null;
        //     for (QueryDocumentSnapshot doc : documents) {
        //         u = (User) doc.toObject(User.class);
        //         s += u.getEmail();
        //     }
        //     return "hello world! " + s;
        // } catch (Exception e) {
        //     e.printStackTrace();
        //     return null;
        // }     
        return "Greetings!";
    }
}