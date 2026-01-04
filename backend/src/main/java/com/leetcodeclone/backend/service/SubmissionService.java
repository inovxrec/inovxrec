package com.leetcodeclone.backend.service;

import com.leetcodeclone.backend.entity.Submission;
import com.leetcodeclone.backend.repository.SubmissionRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SubmissionService {

    private final SubmissionRepository submissionRepository;

    public SubmissionService(SubmissionRepository submissionRepository) {
        this.submissionRepository = submissionRepository;
    }

    public Submission saveSubmission(Submission submission) {
        return submissionRepository.save(submission);
    }

    public List<Submission> getSubmissionsByProblem(Long userId, Long problemId) {
        return submissionRepository.findByUserIdAndProblemId(userId, problemId);
    }
}
