package com.leetcodeclone.backend.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.time.LocalDateTime;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "submissions")
public class Submission {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long userId; // Simplified foreign key
    private Long problemId; // Simplified foreign key

    @Lob
    @Column(columnDefinition = "TEXT")
    private String code;

    private String language;

    private String status; // accepted, wrong_answer, etc.

    private Double runtime; // in ms
    private Double memory; // in MB

    private LocalDateTime timestamp;

    @PrePersist
    protected void onCreate() {
        timestamp = LocalDateTime.now();
    }
}
