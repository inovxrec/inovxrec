package com.leetcodeclone.backend.controller;

import com.leetcodeclone.backend.entity.Problem;
import com.leetcodeclone.backend.service.ProblemService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/problems")
@CrossOrigin(origins = "http://localhost:5173")
public class ProblemController {

    private final ProblemService problemService;

    public ProblemController(ProblemService problemService) {
        this.problemService = problemService;
    }

    @GetMapping
    public List<Problem> getAllProblems() {
        return problemService.getAllProblems();
    }

    @GetMapping("/{slug}")
    public Problem getProblemBySlug(@PathVariable String slug) {
        return problemService.getProblemBySlug(slug);
    }

    @PostMapping
    public Problem createProblem(@RequestBody Problem problem) {
        return problemService.createProblem(problem);
    }
}
