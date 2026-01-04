package com.leetcodeclone.backend.controller;

import com.leetcodeclone.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.sql.DataSource;
import java.sql.Connection;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/health")
public class HealthController {

    @Autowired
    private DataSource dataSource;

    @Autowired
    private UserRepository userRepository;

    @GetMapping("/status")
    public ResponseEntity<Map<String, Object>> getHealthStatus() {
        Map<String, Object> status = new HashMap<>();
        
        try {
            // Test database connection
            Connection connection = dataSource.getConnection();
            status.put("database", "Connected");
            status.put("databaseUrl", connection.getMetaData().getURL());
            connection.close();
            
            // Test repository
            long userCount = userRepository.count();
            status.put("userRepository", "Working");
            status.put("userCount", userCount);
            
            status.put("status", "UP");
            return ResponseEntity.ok(status);
            
        } catch (Exception e) {
            status.put("status", "DOWN");
            status.put("error", e.getMessage());
            return ResponseEntity.status(500).body(status);
        }
    }
}