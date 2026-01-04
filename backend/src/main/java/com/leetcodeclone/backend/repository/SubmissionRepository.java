package com.leetcodeclone.backend.repository;

import com.leetcodeclone.backend.entity.Submission;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SubmissionRepository extends JpaRepository<Submission, Long> {
    List<Submission> findByUserIdAndProblemId(Long userId, Long problemId);

    List<Submission> findByUserId(Long userId);
}
