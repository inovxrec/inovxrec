package com.leetcodeclone.backend.repository;

import com.leetcodeclone.backend.entity.Problem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ProblemRepository extends JpaRepository<Problem, Long> {
    Optional<Problem> findBySlug(String slug);
}
