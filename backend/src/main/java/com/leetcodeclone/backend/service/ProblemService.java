package com.leetcodeclone.backend.service;

import com.leetcodeclone.backend.entity.Problem;
import com.leetcodeclone.backend.repository.ProblemRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProblemService {

    private final ProblemRepository problemRepository;

    public ProblemService(ProblemRepository problemRepository) {
        this.problemRepository = problemRepository;
    }

    public List<Problem> getAllProblems() {
        return problemRepository.findAll();
    }

    public Problem getProblemBySlug(String slug) {
        return problemRepository.findBySlug(slug)
                .orElseThrow(() -> new RuntimeException("Problem not found"));
    }

    public Problem createProblem(Problem problem) {
        // Simple logic for now
        return problemRepository.save(problem);
    }
}
