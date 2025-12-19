import { Problem, Submission, User } from '@/types';

export const mockProblems: Problem[] = [
  {
    id: '1',
    title: 'Two Sum',
    slug: 'two-sum',
    difficulty: 'easy',
    tags: ['Array', 'Hash Table'],
    solved: true,
    description: `Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.

You may assume that each input would have exactly one solution, and you may not use the same element twice.

You can return the answer in any order.`,
    examples: [
      {
        input: 'nums = [2,7,11,15], target = 9',
        output: '[0,1]',
        explanation: 'Because nums[0] + nums[1] == 9, we return [0, 1].',
      },
      {
        input: 'nums = [3,2,4], target = 6',
        output: '[1,2]',
      },
      {
        input: 'nums = [3,3], target = 6',
        output: '[0,1]',
      },
    ],
    constraints: [
      '2 <= nums.length <= 10^4',
      '-10^9 <= nums[i] <= 10^9',
      '-10^9 <= target <= 10^9',
      'Only one valid answer exists.',
    ],
    starterCode: {
      javascript: `/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
function twoSum(nums, target) {
    // Your code here
}`,
      python: `class Solution:
    def twoSum(self, nums: List[int], target: int) -> List[int]:
        # Your code here
        pass`,
      java: `class Solution {
    public int[] twoSum(int[] nums, int target) {
        // Your code here
        return new int[]{};
    }
}`,
      cpp: `class Solution {
public:
    vector<int> twoSum(vector<int>& nums, int target) {
        // Your code here
        return {};
    }
};`,
    },
  },
  {
    id: '2',
    title: 'Add Two Numbers',
    slug: 'add-two-numbers',
    difficulty: 'medium',
    tags: ['Linked List', 'Math', 'Recursion'],
    solved: false,
    description: `You are given two non-empty linked lists representing two non-negative integers. The digits are stored in reverse order, and each of their nodes contains a single digit. Add the two numbers and return the sum as a linked list.

You may assume the two numbers do not contain any leading zero, except the number 0 itself.`,
    examples: [
      {
        input: 'l1 = [2,4,3], l2 = [5,6,4]',
        output: '[7,0,8]',
        explanation: '342 + 465 = 807.',
      },
      {
        input: 'l1 = [0], l2 = [0]',
        output: '[0]',
      },
    ],
    constraints: [
      'The number of nodes in each linked list is in the range [1, 100].',
      '0 <= Node.val <= 9',
      'It is guaranteed that the list represents a number that does not have leading zeros.',
    ],
    starterCode: {
      javascript: `/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
function addTwoNumbers(l1, l2) {
    // Your code here
}`,
      python: `# Definition for singly-linked list.
# class ListNode:
#     def __init__(self, val=0, next=None):
#         self.val = val
#         self.next = next

class Solution:
    def addTwoNumbers(self, l1: Optional[ListNode], l2: Optional[ListNode]) -> Optional[ListNode]:
        # Your code here
        pass`,
      java: `/**
 * Definition for singly-linked list.
 * public class ListNode {
 *     int val;
 *     ListNode next;
 *     ListNode() {}
 *     ListNode(int val) { this.val = val; }
 *     ListNode(int val, ListNode next) { this.val = val; this.next = next; }
 * }
 */
class Solution {
    public ListNode addTwoNumbers(ListNode l1, ListNode l2) {
        // Your code here
        return null;
    }
}`,
      cpp: `/**
 * Definition for singly-linked list.
 * struct ListNode {
 *     int val;
 *     ListNode *next;
 *     ListNode() : val(0), next(nullptr) {}
 *     ListNode(int x) : val(x), next(nullptr) {}
 *     ListNode(int x, ListNode *next) : val(x), next(next) {}
 * };
 */
class Solution {
public:
    ListNode* addTwoNumbers(ListNode* l1, ListNode* l2) {
        // Your code here
        return nullptr;
    }
};`,
    },
  },
  {
    id: '3',
    title: 'Median of Two Sorted Arrays',
    slug: 'median-of-two-sorted-arrays',
    difficulty: 'hard',
    tags: ['Array', 'Binary Search', 'Divide and Conquer'],
    solved: false,
    description: `Given two sorted arrays nums1 and nums2 of size m and n respectively, return the median of the two sorted arrays.

The overall run time complexity should be O(log (m+n)).`,
    examples: [
      {
        input: 'nums1 = [1,3], nums2 = [2]',
        output: '2.00000',
        explanation: 'merged array = [1,2,3] and median is 2.',
      },
      {
        input: 'nums1 = [1,2], nums2 = [3,4]',
        output: '2.50000',
        explanation: 'merged array = [1,2,3,4] and median is (2 + 3) / 2 = 2.5.',
      },
    ],
    constraints: [
      'nums1.length == m',
      'nums2.length == n',
      '0 <= m <= 1000',
      '0 <= n <= 1000',
      '1 <= m + n <= 2000',
      '-10^6 <= nums1[i], nums2[i] <= 10^6',
    ],
    starterCode: {
      javascript: `/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number}
 */
function findMedianSortedArrays(nums1, nums2) {
    // Your code here
}`,
      python: `class Solution:
    def findMedianSortedArrays(self, nums1: List[int], nums2: List[int]) -> float:
        # Your code here
        pass`,
      java: `class Solution {
    public double findMedianSortedArrays(int[] nums1, int[] nums2) {
        // Your code here
        return 0.0;
    }
}`,
      cpp: `class Solution {
public:
    double findMedianSortedArrays(vector<int>& nums1, vector<int>& nums2) {
        // Your code here
        return 0.0;
    }
};`,
    },
  },
  {
    id: '4',
    title: 'Valid Parentheses',
    slug: 'valid-parentheses',
    difficulty: 'easy',
    tags: ['String', 'Stack'],
    solved: true,
    description: `Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.

An input string is valid if:
1. Open brackets must be closed by the same type of brackets.
2. Open brackets must be closed in the correct order.
3. Every close bracket has a corresponding open bracket of the same type.`,
    examples: [
      {
        input: 's = "()"',
        output: 'true',
      },
      {
        input: 's = "()[]{}"',
        output: 'true',
      },
      {
        input: 's = "(]"',
        output: 'false',
      },
    ],
    constraints: [
      '1 <= s.length <= 10^4',
      "s consists of parentheses only '()[]{}'.",
    ],
    starterCode: {
      javascript: `/**
 * @param {string} s
 * @return {boolean}
 */
function isValid(s) {
    // Your code here
}`,
      python: `class Solution:
    def isValid(self, s: str) -> bool:
        # Your code here
        pass`,
      java: `class Solution {
    public boolean isValid(String s) {
        // Your code here
        return false;
    }
}`,
      cpp: `class Solution {
public:
    bool isValid(string s) {
        // Your code here
        return false;
    }
};`,
    },
  },
  {
    id: '5',
    title: 'Merge Two Sorted Lists',
    slug: 'merge-two-sorted-lists',
    difficulty: 'easy',
    tags: ['Linked List', 'Recursion'],
    solved: false,
    description: `You are given the heads of two sorted linked lists list1 and list2.

Merge the two lists into one sorted list. The list should be made by splicing together the nodes of the first two lists.

Return the head of the merged linked list.`,
    examples: [
      {
        input: 'list1 = [1,2,4], list2 = [1,3,4]',
        output: '[1,1,2,3,4,4]',
      },
      {
        input: 'list1 = [], list2 = []',
        output: '[]',
      },
    ],
    constraints: [
      'The number of nodes in both lists is in the range [0, 50].',
      '-100 <= Node.val <= 100',
      'Both list1 and list2 are sorted in non-decreasing order.',
    ],
    starterCode: {
      javascript: `/**
 * @param {ListNode} list1
 * @param {ListNode} list2
 * @return {ListNode}
 */
function mergeTwoLists(list1, list2) {
    // Your code here
}`,
      python: `class Solution:
    def mergeTwoLists(self, list1: Optional[ListNode], list2: Optional[ListNode]) -> Optional[ListNode]:
        # Your code here
        pass`,
      java: `class Solution {
    public ListNode mergeTwoLists(ListNode list1, ListNode list2) {
        // Your code here
        return null;
    }
}`,
      cpp: `class Solution {
public:
    ListNode* mergeTwoLists(ListNode* list1, ListNode* list2) {
        // Your code here
        return nullptr;
    }
};`,
    },
  },
  {
    id: '6',
    title: 'Longest Substring Without Repeating Characters',
    slug: 'longest-substring-without-repeating-characters',
    difficulty: 'medium',
    tags: ['Hash Table', 'String', 'Sliding Window'],
    solved: true,
    description: `Given a string s, find the length of the longest substring without repeating characters.`,
    examples: [
      {
        input: 's = "abcabcbb"',
        output: '3',
        explanation: 'The answer is "abc", with the length of 3.',
      },
      {
        input: 's = "bbbbb"',
        output: '1',
        explanation: 'The answer is "b", with the length of 1.',
      },
    ],
    constraints: [
      '0 <= s.length <= 5 * 10^4',
      's consists of English letters, digits, symbols and spaces.',
    ],
    starterCode: {
      javascript: `/**
 * @param {string} s
 * @return {number}
 */
function lengthOfLongestSubstring(s) {
    // Your code here
}`,
      python: `class Solution:
    def lengthOfLongestSubstring(self, s: str) -> int:
        # Your code here
        pass`,
      java: `class Solution {
    public int lengthOfLongestSubstring(String s) {
        // Your code here
        return 0;
    }
}`,
      cpp: `class Solution {
public:
    int lengthOfLongestSubstring(string s) {
        // Your code here
        return 0;
    }
};`,
    },
  },
  {
    id: '7',
    title: 'Regular Expression Matching',
    slug: 'regular-expression-matching',
    difficulty: 'hard',
    tags: ['String', 'Dynamic Programming', 'Recursion'],
    solved: false,
    description: `Given an input string s and a pattern p, implement regular expression matching with support for '.' and '*' where:

'.' Matches any single character.
'*' Matches zero or more of the preceding element.

The matching should cover the entire input string (not partial).`,
    examples: [
      {
        input: 's = "aa", p = "a"',
        output: 'false',
        explanation: '"a" does not match the entire string "aa".',
      },
      {
        input: 's = "aa", p = "a*"',
        output: 'true',
        explanation: '"*" means zero or more of the preceding element, "a". Therefore, by repeating "a" once, it becomes "aa".',
      },
    ],
    constraints: [
      '1 <= s.length <= 20',
      '1 <= p.length <= 20',
      's contains only lowercase English letters.',
      "p contains only lowercase English letters, '.', and '*'.",
      "It is guaranteed for each appearance of the character '*', there will be a previous valid character to match.",
    ],
    starterCode: {
      javascript: `/**
 * @param {string} s
 * @param {string} p
 * @return {boolean}
 */
function isMatch(s, p) {
    // Your code here
}`,
      python: `class Solution:
    def isMatch(self, s: str, p: str) -> bool:
        # Your code here
        pass`,
      java: `class Solution {
    public boolean isMatch(String s, String p) {
        // Your code here
        return false;
    }
}`,
      cpp: `class Solution {
public:
    bool isMatch(string s, string p) {
        // Your code here
        return false;
    }
};`,
    },
  },
  {
    id: '8',
    title: 'Container With Most Water',
    slug: 'container-with-most-water',
    difficulty: 'medium',
    tags: ['Array', 'Two Pointers', 'Greedy'],
    solved: false,
    description: `You are given an integer array height of length n. There are n vertical lines drawn such that the two endpoints of the ith line are (i, 0) and (i, height[i]).

Find two lines that together with the x-axis form a container, such that the container contains the most water.

Return the maximum amount of water a container can store.

Notice that you may not slant the container.`,
    examples: [
      {
        input: 'height = [1,8,6,2,5,4,8,3,7]',
        output: '49',
        explanation: 'The above vertical lines are represented by array [1,8,6,2,5,4,8,3,7]. In this case, the max area of water (blue section) the container can contain is 49.',
      },
      {
        input: 'height = [1,1]',
        output: '1',
      },
    ],
    constraints: [
      'n == height.length',
      '2 <= n <= 10^5',
      '0 <= height[i] <= 10^4',
    ],
    starterCode: {
      javascript: `/**
 * @param {number[]} height
 * @return {number}
 */
function maxArea(height) {
    // Your code here
}`,
      python: `class Solution:
    def maxArea(self, height: List[int]) -> int:
        # Your code here
        pass`,
      java: `class Solution {
    public int maxArea(int[] height) {
        // Your code here
        return 0;
    }
}`,
      cpp: `class Solution {
public:
    int maxArea(vector<int>& height) {
        // Your code here
        return 0;
    }
};`,
    },
  },
];

export const mockSubmissions: Submission[] = [
  {
    id: '1',
    problemId: '1',
    status: 'accepted',
    language: 'javascript',
    runtime: 56,
    memory: 42.1,
    code: `function twoSum(nums, target) {
    const map = new Map();
    for (let i = 0; i < nums.length; i++) {
        const complement = target - nums[i];
        if (map.has(complement)) {
            return [map.get(complement), i];
        }
        map.set(nums[i], i);
    }
}`,
    timestamp: new Date(Date.now() - 1000 * 60 * 30),
  },
  {
    id: '2',
    problemId: '4',
    status: 'accepted',
    language: 'javascript',
    runtime: 48,
    memory: 41.8,
    code: `function isValid(s) {
    const stack = [];
    const pairs = { ')': '(', '}': '{', ']': '[' };
    for (const char of s) {
        if (!pairs[char]) {
            stack.push(char);
        } else if (stack.pop() !== pairs[char]) {
            return false;
        }
    }
    return stack.length === 0;
}`,
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2),
  },
  {
    id: '3',
    problemId: '6',
    status: 'accepted',
    language: 'python',
    runtime: 52,
    memory: 14.2,
    code: `class Solution:
    def lengthOfLongestSubstring(self, s: str) -> int:
        seen = {}
        start = maxLen = 0
        for i, char in enumerate(s):
            if char in seen and seen[char] >= start:
                start = seen[char] + 1
            else:
                maxLen = max(maxLen, i - start + 1)
            seen[char] = i
        return maxLen`,
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24),
  },
  {
    id: '4',
    problemId: '2',
    status: 'wrong_answer',
    language: 'javascript',
    code: `function addTwoNumbers(l1, l2) {
    // Incorrect implementation
    return null;
}`,
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 48),
    failedTestCase: {
      input: 'l1 = [2,4,3], l2 = [5,6,4]',
      expected: '[7,0,8]',
      actual: 'null',
    },
  },
];

export const mockUser: User = {
  id: '1',
  username: 'cybercoder',
  email: 'cybercoder@example.com',
  totalSolved: 4,
  easySolved: 2,
  mediumSolved: 1,
  hardSolved: 0,
  streak: 7,
  recentSubmissions: mockSubmissions,
};

export const getAllTags = (): string[] => {
  const tags = new Set<string>();
  mockProblems.forEach((p) => p.tags.forEach((t) => tags.add(t)));
  return Array.from(tags).sort();
};
