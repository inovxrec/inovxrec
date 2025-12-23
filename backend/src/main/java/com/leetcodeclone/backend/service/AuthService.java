package com.leetcodeclone.backend.service;

import org.springframework.stereotype.Service;
import java.util.HashMap;
import java.util.Map;

@Service
public class AuthService {

    // In-memory storage for users
    private final Map<String, String> users = new HashMap<>(); // key: email, value: password
    private final Map<String, String> usernames = new HashMap<>(); // key: email, value: username

    // Signup method
    public boolean signup(String username, String email, String password) {
        if (users.containsKey(email)) {
            return false; // user already exists
        }
        users.put(email, password);      // store email & password
        usernames.put(email, username);  // store username
        return true;                     // signup successful
    }

    // Login method
    public boolean login(String email, String password) {
        return users.containsKey(email) && users.get(email).equals(password);
    }

    // Optional: get username by email
    public String getUsername(String email) {
        return usernames.get(email);
    }
}
