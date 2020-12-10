package com.wms.wms_server.firebase;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.io.IOException;

import javax.annotation.PostConstruct;

import org.springframework.stereotype.Service;

import com.google.auth.oauth2.GoogleCredentials;
import com.google.cloud.firestore.Firestore;

import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;
import com.google.firebase.cloud.FirestoreClient;

// import java.io.FileInputStream;
// import java.io.InputStream;

@Service
public class FirebaseInitialize {
    @PostConstruct
    public void initialize() throws IOException {
        // InputStream serviceAccount = new FileInputStream("./wms-server-firestore.json");
        FirebaseOptions options = new FirebaseOptions.Builder()
            .setCredentials(GoogleCredentials.getApplicationDefault())
            // .setCredentials(GoogleCredentials.fromStream(serviceAccount))
            .build();

        FirebaseApp.initializeApp(options);
    }
}