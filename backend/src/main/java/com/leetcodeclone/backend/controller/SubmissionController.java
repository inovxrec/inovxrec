package com.leetcodeclone.backend.controller;

import com.leetcodeclone.backend.entity.Submission;
import com.leetcodeclone.backend.service.SubmissionService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/submissions")
@CrossOrigin(origins = "http://localhost:5173")
public class SubmissionController {

    private final SubmissionService submissionService;

    public SubmissionController(SubmissionService submissionService) {
        this.submissionService = submissionService;
    }

    // Save a new submission
    @PostMapping
    public Submission createSubmission(@RequestBody Submission submission) {
        // In a real app, userId would come from the SecurityContext
        return submissionService.saveSubmission(submission);
    }

    // Get submissions for a user on a problem
    // Example: /api/submissions?userId=1&problemId=2
    @GetMapping
    public List<Submission> getSubmissions(
            @RequestParam Long userId,
            @RequestParam Long problemId) {
        return submissionService.getSubmissionsByProblem(userId, problemId);
    }
}
