package com.wms.wms_server.firebase;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.io.IOException;

import javax.annotation.PostConstruct;

import com.google.cloud.firestore.Firestore;
import com.google.firebase.cloud.FirestoreClient;


@Configuration
public class FirebaseConfiguration {

    @Bean
    public Firestore getDb() {
        return FirestoreClient.getFirestore();
    }
}