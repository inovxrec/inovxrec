package com.leetcodeclone.backend.controller;

import com.leetcodeclone.backend.service.AuthService;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:5173") // React dev server port
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    // Signup endpoint
    @PostMapping("/signup")
    public Map<String, Boolean> signup(@RequestBody Map<String, String> body) {
        String username = body.get("username");
        String email = body.get("email");
        String password = body.get("password");

        boolean success = authService.signup(username, email, password);
        return Map.of("success", success);
    }

    // Login endpoint
    @PostMapping("/login")
    public Map<String, Boolean> login(@RequestBody Map<String, String> body) {
        String email = body.get("email");
        String password = body.get("password");

        boolean success = authService.login(email, password);
        return Map.of("success", success);
    }
}
