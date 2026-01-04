package com.leetcodeclone.backend.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "problems")
public class Problem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false)
    private String slug;

    @Column(nullable = false)
    private String title;

    @Lob
    @Column(columnDefinition = "TEXT")
    private String description;

    private String difficulty; // easy, medium, hard

    // Storing tags as comma separated string for simplicity
    private String tags;

    // Storing examples as JSON string
    @Lob
    @Column(columnDefinition = "TEXT")
    private String examples;

    // Storing constraints as JSON string
    @Lob
    @Column(columnDefinition = "TEXT")
    private String constraints;

    // Storing starterCode as JSON string
    @Lob
    @Column(columnDefinition = "TEXT")
    private String starterCode;
}
