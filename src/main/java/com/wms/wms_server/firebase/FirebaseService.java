package com.wms.wms_server.firebase;

import com.wms.wms_server.model.User;

import org.springframework.stereotype.Service;

import com.google.api.core.ApiFuture;
import com.google.cloud.firestore.QuerySnapshot;
import com.google.cloud.firestore.QueryDocumentSnapshot;
import com.google.cloud.firestore.DocumentReference;

import com.google.cloud.firestore.Firestore;
import com.google.firebase.cloud.FirestoreClient;

import java.util.List;
import java.util.concurrent.ExecutionException;

@Service
public class FirebaseService {
    public List<QueryDocumentSnapshot> getUsers() throws InterruptedException, ExecutionException{
        Firestore db = FirestoreClient.getFirestore();

        ApiFuture<QuerySnapshot> query = db.collection("users").get();

        User u = null;

        QuerySnapshot querySnapspot = query.get();
        List<QueryDocumentSnapshot> documents = querySnapspot.getDocuments();
        // for (QueryDocumentSnapshot doc : documents) {
        //     u = (User) doc.toObject(User.class);
        //     System.out.println(u.getEmail());
        // }
        return documents;
    }
}