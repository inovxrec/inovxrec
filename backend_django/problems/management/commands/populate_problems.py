from django.core.management.base import BaseCommand
from problems.models import Problem, Tag


class Command(BaseCommand):
    help = 'Populate database with sample problems'

    def handle(self, *args, **options):
        # Create tags
        tags_data = [
            'Array', 'Hash Table', 'Linked List', 'Math', 'Recursion',
            'String', 'Binary Search', 'Dynamic Programming', 'Tree',
            'Graph', 'Sorting', 'Stack', 'Queue', 'Greedy'
        ]
        
        tags = {}
        for tag_name in tags_data:
            tag, created = Tag.objects.get_or_create(name=tag_name)
            tags[tag_name] = tag
            if created:
                self.stdout.write(f'Created tag: {tag_name}')

        # Create problems
        problems_data = [
            {
                'title': 'Two Sum',
                'slug': 'two-sum',
                'difficulty': 'easy',
                'description': '''Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.

You may assume that each input would have exactly one solution, and you may not use the same element twice.

You can return the answer in any order.''',
                'examples': [
                    {
                        'input': 'nums = [2,7,11,15], target = 9',
                        'output': '[0,1]',
                        'explanation': 'Because nums[0] + nums[1] == 9, we return [0, 1].'
                    },
                    {
                        'input': 'nums = [3,2,4], target = 6',
                        'output': '[1,2]'
                    },
                    {
                        'input': 'nums = [3,3], target = 6',
                        'output': '[0,1]'
                    }
                ],
                'constraints': [
                    '2 <= nums.length <= 10^4',
                    '-10^9 <= nums[i] <= 10^9',
                    '-10^9 <= target <= 10^9',
                    'Only one valid answer exists.'
                ],
                'starter_code': {
                    'javascript': '''/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
function twoSum(nums, target) {
    // Your code here
}''',
                    'python': '''class Solution:
    def twoSum(self, nums: List[int], target: int) -> List[int]:
        # Your code here
        pass''',
                    'java': '''class Solution {
    public int[] twoSum(int[] nums, int target) {
        // Your code here
        return new int[]{};
    }
}''',
                    'cpp': '''class Solution {
public:
    vector<int> twoSum(vector<int>& nums, int target) {
        // Your code here
        return {};
    }
};'''
                },
                'tags': ['Array', 'Hash Table']
            },
            {
                'title': 'Add Two Numbers',
                'slug': 'add-two-numbers',
                'difficulty': 'medium',
                'description': '''You are given two non-empty linked lists representing two non-negative integers. The digits are stored in reverse order, and each of their nodes contains a single digit. Add the two numbers and return the sum as a linked list.

You may assume the two numbers do not contain any leading zero, except the number 0 itself.''',
                'examples': [
                    {
                        'input': 'l1 = [2,4,3], l2 = [5,6,4]',
                        'output': '[7,0,8]',
                        'explanation': '342 + 465 = 807.'
                    },
                    {
                        'input': 'l1 = [0], l2 = [0]',
                        'output': '[0]'
                    }
                ],
                'constraints': [
                    'The number of nodes in each linked list is in the range [1, 100].',
                    '0 <= Node.val <= 9',
                    'It is guaranteed that the list represents a number that does not have leading zeros.'
                ],
                'starter_code': {
                    'javascript': '''/**
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
}''',
                    'python': '''# Definition for singly-linked list.
# class ListNode:
#     def __init__(self, val=0, next=None):
#         self.val = val
#         self.next = next
class Solution:
    def addTwoNumbers(self, l1: Optional[ListNode], l2: Optional[ListNode]) -> Optional[ListNode]:
        # Your code here
        pass''',
                    'java': '''/**
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
}''',
                    'cpp': '''/**
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
};'''
                },
                'tags': ['Linked List', 'Math', 'Recursion']
            },
            {
                'title': 'Longest Substring Without Repeating Characters',
                'slug': 'longest-substring-without-repeating-characters',
                'difficulty': 'medium',
                'description': '''Given a string s, find the length of the longest substring without repeating characters.''',
                'examples': [
                    {
                        'input': 's = "abcabcbb"',
                        'output': '3',
                        'explanation': 'The answer is "abc", with the length of 3.'
                    },
                    {
                        'input': 's = "bbbbb"',
                        'output': '1',
                        'explanation': 'The answer is "b", with the length of 1.'
                    }
                ],
                'constraints': [
                    '0 <= s.length <= 5 * 10^4',
                    's consists of English letters, digits, symbols and spaces.'
                ],
                'starter_code': {
                    'javascript': '''/**
 * @param {string} s
 * @return {number}
 */
function lengthOfLongestSubstring(s) {
    // Your code here
}''',
                    'python': '''class Solution:
    def lengthOfLongestSubstring(self, s: str) -> int:
        # Your code here
        pass''',
                    'java': '''class Solution {
    public int lengthOfLongestSubstring(String s) {
        // Your code here
        return 0;
    }
}''',
                    'cpp': '''class Solution {
public:
    int lengthOfLongestSubstring(string s) {
        // Your code here
        return 0;
    }
};'''
                },
                'tags': ['Hash Table', 'String']
            }
        ]

        for problem_data in problems_data:
            problem, created = Problem.objects.get_or_create(
                slug=problem_data['slug'],
                defaults={
                    'title': problem_data['title'],
                    'difficulty': problem_data['difficulty'],
                    'description': problem_data['description'],
                    'examples': problem_data['examples'],
                    'constraints': problem_data['constraints'],
                    'starter_code': problem_data['starter_code']
                }
            )
            
            if created:
                # Add tags
                for tag_name in problem_data['tags']:
                    problem.tags.add(tags[tag_name])
                
                self.stdout.write(f'Created problem: {problem.title}')
            else:
                self.stdout.write(f'Problem already exists: {problem.title}')

        self.stdout.write(self.style.SUCCESS('Successfully populated problems!'))