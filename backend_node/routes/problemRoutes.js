const express = require('express');
const router = express.Router();

// Mock problems data
const problems = [
    {
        id: "1",
        title: "Two Sum",
        difficulty: "Easy",
        category: "Array",
        status: "Solved",
        acceptance: "49.5%",
        tags: ["Array", "Hash Table"]
    },
    {
        id: "2",
        title: "Add Two Numbers",
        difficulty: "Medium",
        category: "Linked List",
        status: "Attempted",
        acceptance: "39.1%",
        tags: ["Linked List", "Math"]
    }
];

router.get('/', (req, res) => {
    res.json(problems);
});

router.get('/tags', (req, res) => {
    const tags = Array.from(new Set(problems.flatMap(p => p.tags)));
    res.json(tags);
});

module.exports = router;
