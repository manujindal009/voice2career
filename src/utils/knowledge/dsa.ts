export const dsaKnowledge = [

  {
    id: "dsa-definition",
    subject: "DSA",
    keywords: ["dsa", "data structures", "algorithms", "what is dsa", "big o", "time complexity"],
    answer: `
==============================
DATA STRUCTURES & ALGORITHMS
==============================

DEFINITION:
Data Structure: Data ko organize karne ka tarika.
Algorithm: Problem solve karne ke steps.

BIG-O NOTATION:
  O(1)       → Constant     : Array index access
  O(log n)   → Logarithmic  : Binary search
  O(n)       → Linear       : Linear search
  O(n log n) → Linearithmic : Merge sort
  O(n²)      → Quadratic    : Bubble sort
  O(2^n)     → Exponential  : Fibonacci (naive recursion)
  O(n!)      → Factorial    : Permutations

SPACE COMPLEXITY:
  Extra memory use karna.
  Recursive calls → O(n) stack space.
  In-place algorithms → O(1) extra space.

IMPORTANT DATA STRUCTURES:
  Array, Linked List, Stack, Queue, Heap,
  Hash Map, Tree, Graph, Trie, Segment Tree

IMPORTANT ALGORITHMS:
  Sorting: Merge Sort, Quick Sort, Heap Sort
  Searching: Binary Search
  Graph: BFS, DFS, Dijkstra, Bellman-Ford
  DP: Knapsack, LCS, LIS, Coin Change
`
  },

  {
    id: "dsa-arrays-strings",
    subject: "DSA",
    keywords: ["array", "string", "two pointer", "sliding window", "prefix sum", "kadane", "subarray"],
    answer: `
==============================
ARRAYS & STRINGS
==============================

ARRAY:
  → Contiguous memory, same type
  → O(1) access, O(n) insert/delete (middle)

TWO POINTER:
  → Dono ends se pointers move karo
  → Sorted array mein useful
  Use: Two Sum (sorted), Palindrome check,
       Container with most water, Remove duplicates

  Example (Palindrome):
  left=0, right=n-1
  while left < right: check arr[left]==arr[right], move both

SLIDING WINDOW:
  → Fixed/Variable size window slide karo
  → Subarray problems ke liye

  Fixed window: sum = first k, then subtract left add right
  Variable window: expand right, shrink left when condition fails
  Use: Max sum subarray (size k), Longest substring without repeat

PREFIX SUM:
  → pre[i] = arr[0] + arr[1] + ... + arr[i]
  → Range sum O(1): sum(l,r) = pre[r] - pre[l-1]
  Use: Range queries, Subarray sum = k

KADANE'S ALGORITHM (Max Subarray Sum):
  maxSum = arr[0], curSum = arr[0]
  for i in 1..n:
    curSum = max(arr[i], curSum + arr[i])
    maxSum = max(maxSum, curSum)
  Time: O(n), Space: O(1)

BINARY SEARCH ON ANSWER:
  → Answer ki range define karo
  → Mid check karo, narrow karo
  Use: Minimum days, Koko eating bananas, Aggressive cows
`
  },

  {
    id: "dsa-linked-list",
    subject: "DSA",
    keywords: ["linked list", "singly linked list", "doubly linked list", "circular linked list", "floyd cycle", "reverse linked list"],
    answer: `
==============================
LINKED LIST
==============================

TYPES:
  Singly:   Each node → next pointer
  Doubly:   Each node → next + prev pointer
  Circular: Last node → first node

OPERATIONS:
  Insert head: O(1)
  Insert tail: O(n) singly, O(1) with tail pointer
  Delete:      O(n) find + O(1) delete
  Search:      O(n)

vs ARRAY:
  Array: O(1) random access, O(n) insert/delete
  LL:    O(n) access, O(1) insert/delete (if pointer known)

KEY ALGORITHMS:

Reverse LL:
  prev=None, curr=head
  while curr:
    next=curr.next, curr.next=prev, prev=curr, curr=next
  return prev

Detect Cycle (Floyd's Algorithm):
  slow=fast=head
  while fast and fast.next:
    slow=slow.next, fast=fast.next.next
    if slow==fast: CYCLE found!
  Cycle start: Reset slow to head, move both 1 step at a time.

Find Middle:
  slow=fast=head
  while fast.next and fast.next.next:
    slow=slow.next, fast=fast.next.next
  return slow (middle)

Nth from end:
  Move fast pointer n steps ahead.
  Then move both together until fast reaches end.
  Slow is at nth from end.
`
  },

  {
    id: "dsa-stack-queue",
    subject: "DSA",
    keywords: ["stack", "queue", "deque", "monotonic stack", "priority queue", "heap"],
    answer: `
==============================
STACK & QUEUE
==============================

STACK (LIFO):
  push(), pop(), peek(), isEmpty() — all O(1)
  Use: Function call stack, Expression evaluation,
       Undo/Redo, Browser back, DFS

MONOTONIC STACK:
  → Next Greater Element: stack mein smaller elements pop karo
  → Temperatures, Stock span, Largest rectangle histogram

Valid Parentheses:
  Open → push, Close → check top matches
  End mein stack empty hona chahiye

QUEUE (FIFO):
  enqueue(), dequeue(), front() — O(1)
  Use: BFS, Task scheduling, Printer queue

DEQUE (Double Ended Queue):
  → Both ends pe insert/delete
  Use: Sliding window maximum (monotonic deque)

PRIORITY QUEUE / HEAP:
  → Min Heap: Smallest element at top
  → Max Heap: Largest element at top
  → Insert: O(log n), Delete: O(log n), Peek: O(1)

HEAP USES:
  Dijkstra's shortest path, Median of stream,
  Top K elements, K-th largest, Merge K sorted lists

HEAP SORT:
  Build max heap: O(n)
  Extract max n times: O(n log n)
  In-place, not stable
`
  },

  {
    id: "dsa-trees",
    subject: "DSA",
    keywords: ["tree", "binary tree", "bst", "binary search tree", "avl tree", "tree traversal", "inorder", "preorder", "postorder", "level order", "height", "diameter", "lca", "trie", "segment tree"],
    answer: `
==============================
TREES
==============================

BINARY TREE TYPES:
  Full BT:      Har node 0 or 2 children
  Complete BT:  Saare levels fill, last level left se fill
  Perfect BT:   Saare leaves same level
  Balanced BT:  Height = O(log n)
  BST:          Left < Root < Right

TRAVERSALS:
  Inorder   (L-Root-R): BST mein sorted order
  Preorder  (Root-L-R): Tree copy, serialize
  Postorder (L-R-Root): Delete tree, evaluate expression
  Level Order (BFS):    Level by level (queue use karo)

KEY ALGORITHMS:

Height of tree:
  return 1 + max(height(left), height(right))

Diameter (Longest path between any two nodes):
  At each node: left_height + right_height
  Return max across all nodes.

LCA (Lowest Common Ancestor):
  if root==None or root==p or root==q: return root
  left = LCA(root.left, p, q)
  right = LCA(root.right, p, q)
  if left and right: return root
  return left or right

BST:
  Search/Insert/Delete: O(log n) average, O(n) worst
  Inorder → Sorted output

TRIE (Prefix Tree):
  String storage, prefix search
  Insert/Search: O(L) where L = string length
  Use: Autocomplete, spell check, IP routing

SEGMENT TREE:
  Range queries (sum, min, max) in O(log n)
  Point update in O(log n)
  Build: O(n)
`
  },

  {
    id: "dsa-graphs",
    subject: "DSA",
    keywords: ["graph", "bfs", "dfs", "dijkstra", "bellman ford", "floyd warshall", "topological sort", "union find", "minimum spanning tree", "cycle detection"],
    answer: `
==============================
GRAPHS
==============================

REPRESENTATION:
  Adjacency Matrix: O(V²) space, O(1) edge check
  Adjacency List:   O(V+E) space, O(degree) edge check

BFS (Breadth-First Search):
  → Queue use karo, level by level explore
  → Shortest path (unweighted)
  → Time: O(V+E)

DFS (Depth-First Search):
  → Stack/Recursion, deep explore
  → Time: O(V+E)
  → Use: Cycle detection, Topological sort, Connected components

TOPOLOGICAL SORT (DAG only):
  Kahn's Algorithm (BFS): In-degree track karo
  DFS: Finish order reverse karo
  Use: Task scheduling, Course prerequisites

CYCLE DETECTION:
  Undirected: DFS with parent tracking
  Directed: DFS with visited + recursion stack

UNION-FIND (Disjoint Set):
  → find(x): x ka root (path compression)
  → union(x,y): Dono ke roots merge (rank)
  → O(alpha(n)) ≈ O(1) per operation

SHORTEST PATH:
  Dijkstra: Non-negative weights, Min heap, O((V+E) log V)
  Bellman-Ford: Negative weights, O(VE), detect negative cycles
  Floyd-Warshall: All pairs, O(V³)
    dp[i][j] = min(dp[i][j], dp[i][k] + dp[k][j])

MINIMUM SPANNING TREE:
  Kruskal: Sort edges, Union-Find — O(E log E)
  Prim:    Min heap, grow from one node — O(E log V)
`
  },

  {
    id: "dsa-dp",
    subject: "DSA",
    keywords: ["dynamic programming", "dp", "memoization", "tabulation", "knapsack", "lcs", "lis", "coin change", "dp problems"],
    answer: `
==============================
DYNAMIC PROGRAMMING (DP)
==============================

WHEN TO USE?
  → Optimal substructure: Optimal solution uses optimal subproblems
  → Overlapping subproblems: Same subproblems repeat

APPROACHES:
  Top-Down (Memoization): Recursion + cache
  Bottom-Up (Tabulation): Iterative, fill table from base case

1D DP PROBLEMS:
  Fibonacci: dp[i] = dp[i-1] + dp[i-2]
  Climbing Stairs: Same as Fibonacci
  House Robber: dp[i] = max(dp[i-1], dp[i-2] + arr[i])
  Coin Change (min): dp[i] = min(dp[i-coin]+1) for all coins
  LIS (Longest Increasing Subsequence): O(n²) DP, O(n log n) binary search

2D DP PROBLEMS:
  0/1 Knapsack:
    dp[i][w] = max(dp[i-1][w], dp[i-1][w-wt[i]] + val[i])

  Longest Common Subsequence (LCS):
    if s1[i]==s2[j]: dp[i][j] = dp[i-1][j-1] + 1
    else: dp[i][j] = max(dp[i-1][j], dp[i][j-1])

  Edit Distance:
    if s1[i]==s2[j]: dp[i][j] = dp[i-1][j-1]
    else: dp[i][j] = 1 + min(insert, delete, replace)

GRID DP:
  Unique Paths: dp[i][j] = dp[i-1][j] + dp[i][j-1]
  Min Path Sum: dp[i][j] = grid[i][j] + min(dp[i-1][j], dp[i][j-1])

SPACE OPTIMIZATION:
  2D DP → 1D array (current row only needs prev row)
`
  },

  {
    id: "dsa-sorting-searching",
    subject: "DSA",
    keywords: ["sorting", "merge sort", "quick sort", "heap sort", "bubble sort", "binary search", "sorting algorithms"],
    answer: `
==============================
SORTING & SEARCHING
==============================

ALGORITHM       TIME (avg)   TIME (worst)  SPACE  STABLE
Bubble Sort     O(n²)        O(n²)         O(1)   Yes
Selection Sort  O(n²)        O(n²)         O(1)   No
Insertion Sort  O(n²)        O(n²)         O(1)   Yes
Merge Sort      O(n log n)   O(n log n)    O(n)   Yes
Quick Sort      O(n log n)   O(n²)         O(log n) No
Heap Sort       O(n log n)   O(n log n)    O(1)   No
Counting Sort   O(n+k)       O(n+k)        O(k)   Yes

MERGE SORT:
  Divide → Sort → Merge
  Preferred for: Linked lists, stable sort requirement

QUICK SORT:
  Pivot choose → partition → recurse
  Fastest in practice (cache friendly)
  Worst case with bad pivot → use random pivot

BINARY SEARCH:
  PREREQUISITE: Array must be sorted!

  low=0, high=n-1
  while low<=high:
    mid = low + (high-low)//2
    if arr[mid]==target: return mid
    elif arr[mid]<target: low=mid+1
    else: high=mid-1

  Find First Occurrence: When found, continue searching left
  Find Last Occurrence: When found, continue searching right
  Lower Bound: First position >= target
  Upper Bound: First position > target

BINARY SEARCH ON ANSWER:
  When: Minimize/maximize value with a condition.
  lo=min_possible, hi=max_possible
  while lo<hi:
    mid=...
    if condition(mid): hi=mid
    else: lo=mid+1
`
  },

  {
    id: "dsa-interview",
    subject: "DSA",
    keywords: ["dsa interview", "algorithm interview", "data structure interview questions", "coding interview", "backtracking"],
    answer: `
==============================
DSA INTERVIEW Q&A
==============================

Q: BFS vs DFS?
A: BFS: Queue, Level-order, Shortest path (unweighted), More memory
   DFS: Stack/Recursion, Deep explore, Less memory for sparse graphs
   Use BFS for shortest path, DFS for connectivity/topological sort.

Q: When to use DP?
A: When problem has overlapping subproblems + optimal substructure.
   Examples: Knapsack, LCS, shortest paths.

Q: What is backtracking?
A: Systematically explore all possibilities.
   Ek choice lo → explore → agar dead end → undo → try next.
   Use: N-Queens, Sudoku, Permutations, Subset sum.
   Pruning: Invalid paths early cut karo.

Q: Sliding Window kab use karein?
A: Contiguous subarray/substring problems.
   Fixed: Max sum of k elements.
   Variable: Longest substring without repeating characters.

Q: Two Pointer kab use karein?
A: Sorted array mein, dono ends se kaam karna ho.
   Pair sum, three sum, palindrome check.

Q: HashMap kab use karein?
A: O(1) lookup chahiye.
   Frequency count, Two sum, Group anagrams, Duplicate detection.

Q: Recursion vs Iteration?
A: Recursion: Tree/graph problems, cleaner code, stack overhead.
   Iteration: Better space, no stack overflow risk.
   Convert recursion to iteration using explicit stack.

Q: Time complexity kaise improve karein?
A: O(n²) → O(n log n): Sorting, Divide & Conquer
   O(n log n) → O(n): Hashing, Linear scan
   Overlapping subproblems? DP/Memoization.
   Search? Binary search ya HashMap.
`
  }
];