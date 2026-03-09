export const osKnowledge = [

  {
    id: "os-definition",
    subject: "OS",
    keywords: ["operating system", "os", "what is os", "os definition"],
    answer: `
==============================
OPERATING SYSTEM (OS)
==============================

DEFINITION:
OS ek system software hai jo hardware aur user ke beech interface
ka kaam karta hai. Hardware resources manage karta hai aur
programs ko common services provide karta hai.

TYPES OF OS:
  Batch OS        → Jobs batches mein process (no user interaction)
  Time-Sharing    → Multiple users simultaneously (UNIX)
  Real-Time OS    → Strict timing (medical devices, missiles)
  Distributed OS  → Multiple machines ek OS lagti hai
  Embedded OS     → Specific hardware ke liye (smartwatch, router)

CORE FUNCTIONS:
  1. Process Management   → Create, schedule, terminate processes
  2. Memory Management    → Allocate/deallocate RAM
  3. File System Mgmt     → Files create, access, store
  4. I/O Management       → Device drivers, buffering
  5. Security             → Authentication, authorization

SYSTEM CALLS:
  User space se kernel space mein jaane ka interface.
  Types: Process (fork, exec), File (open, read, write),
         Device (ioctl), Network (socket, bind)
`
  },

  {
    id: "os-process-thread",
    subject: "OS",
    keywords: ["process", "thread", "process vs thread", "context switching", "pcb", "multithreading"],
    answer: `
==============================
PROCESS & THREAD
==============================

PROCESS:
  • Program ka running instance
  • Apna memory space (code, data, stack, heap)
  • OS ke dwara manage hota hai
  • Heavyweight — creation expensive hai

PROCESS STATES:
  New → Ready → Running → Waiting → Terminated
  (Running → Ready: Time quantum expire)
  (Running → Waiting: I/O request)

PCB (Process Control Block):
  OS har process ke liye PCB maintain karta hai:
  → Process ID, State, Program Counter
  → CPU registers, Memory limits
  → Open files list, Priority

THREAD:
  • Process ke andar execution unit
  • Shared memory (code + data)
  • Lightweight — fast creation

PROCESS vs THREAD:
  Feature       Process           Thread
  Memory        Own (isolated)    Shared
  Creation      Slow (expensive)  Fast (cheap)
  Communication IPC needed        Direct (shared mem)
  Crash effect  Only self         Can crash process
  Switching     Expensive         Cheap

CONTEXT SWITCHING:
  CPU ek process se doosre pe switch karna.
  Steps: State save (PCB) → Load new state
  Overhead: Pure CPU time waste → minimize karo

MULTITHREADING MODELS:
  Many-to-One:  Many user threads → one kernel thread
  One-to-One:   One user → one kernel (Windows, Linux)
  Many-to-Many: Many user → many kernel (best flexibility)
`
  },

  {
    id: "os-scheduling",
    subject: "OS",
    keywords: ["cpu scheduling", "fcfs", "sjf", "round robin", "priority scheduling", "scheduling algorithms", "starvation", "aging"],
    answer: `
==============================
CPU SCHEDULING
==============================

PURPOSE:
  CPU ko maximize utilize karna aur response time minimize karna.

SCHEDULING CRITERIA:
  CPU Utilization  → CPU busy rehna chahiye (maximize)
  Throughput       → Processes per unit time (maximize)
  Turnaround Time  → Submit to completion (minimize)
  Waiting Time     → Ready queue mein time (minimize)
  Response Time    → First response time (minimize)

ALGORITHMS:

FCFS (First Come First Served):
  → Non-preemptive, simple
  → Convoy Effect: Short process lamba wait kare
  → Worst for response time

SJF (Shortest Job First):
  → Minimum average waiting time (optimal)
  → Non-preemptive: Current finishes, then shortest picks
  → Preemptive (SRTF): New shorter job → preempt current
  → Problem: Burst time predict karna mushkil

Round Robin (RR):
  → Time quantum (q) define karo (typically 10-100ms)
  → Preemptive, Fair, Best for time-sharing
  → Large q → FCFS jaisa; Small q → Too many context switches

Priority Scheduling:
  → Har process ko priority assign
  → Problem: Starvation (low priority starves)
  → Solution: AGING — waiting time ke saath priority badhao

Multilevel Feedback Queue:
  → Process queues ke beech move kar sakti hai
  → Most flexible, used in modern OS (Linux CFS)
`
  },

  {
    id: "os-deadlock",
    subject: "OS",
    keywords: ["deadlock", "deadlock prevention", "deadlock avoidance", "banker's algorithm", "deadlock detection", "circular wait"],
    answer: `
==============================
DEADLOCK
==============================

DEFINITION:
Processes ka ek set jahan har process kisi resource ka wait kar
rahi hai jo doosri process hold kiye hui hai.
Result: Sab blocked, koi progress nahi.

4 NECESSARY CONDITIONS (Coffman):
  1. Mutual Exclusion  → Resource sirf ek process use kare
  2. Hold and Wait     → Resource hold karo + aur maango
  3. No Preemption     → Resource forcibly nahi le sakte
  4. Circular Wait     → P1→P2→P3→P1 cycle

Deadlock tab hi hoga jab SAARI 4 conditions satisfy hon.

STRATEGIES:

PREVENTION (Ek condition tod do):
  Hold & Wait: Sab resources ek saath maango (or none)
  Circular Wait: Resources ko number do, in order maango

AVOIDANCE (Safe State maintain karo):
  Banker's Algorithm:
    • Request aane pe check: kya safe state mein rahenge?
    • Safe State: Ek sequence hai jisme sab process complete ho sakein
    • Need = Maximum - Allocated

DETECTION & RECOVERY:
  Detection: Wait-for graph mein cycle dhundho
  Recovery: Process abort karo, ya resource preempt karo

IGNORE (Ostrich Algorithm):
  → Deadlock rare hai, ignore karo
  → Windows/Linux yahi karte hain
`
  },

  {
    id: "os-memory",
    subject: "OS",
    keywords: ["memory management", "paging", "segmentation", "virtual memory", "page fault", "thrashing", "fragmentation", "tlb"],
    answer: `
==============================
MEMORY MANAGEMENT
==============================

FRAGMENTATION:
  Internal: Allocated > Required (wasted inside block)
  External: Free memory scattered (total enough but not contiguous)
  Solution: Compaction (defragmentation)

PAGING:
  • RAM ko fixed-size FRAMES mein divide karo
  • Process ko same-size PAGES mein divide karo
  • Page → Frame mapping (Page Table maintain karo)
  • No external fragmentation

TLB (Translation Lookaside Buffer):
  → Page table ka hardware cache
  → TLB hit → Fast, TLB miss → Page table access (slow)

SEGMENTATION:
  • Process ko logical segments mein divide karo
  • (Code, Data, Stack, Heap — variable sizes)
  • External fragmentation possible
  • Better protection (code segment: read-only)

VIRTUAL MEMORY & PAGE FAULT:
  Virtual Memory: Disk ko RAM ki tarah use karo
  Page Fault: Page RAM mein nahi → Disk se lao

PAGE REPLACEMENT ALGORITHMS:
  FIFO   → Oldest page replace (Belady's Anomaly possible)
  Optimal → Future mein sabse baad use hone wali page (theoretical)
  LRU    → Least Recently Used (best practical)
  Clock  → LRU approximation (cheap, used in practice)

THRASHING:
  → Process zyada time page swapping mein, less time working
  → Cause: Too many processes, insufficient RAM
  → Fix: Reduce multiprogramming, add RAM
`
  },

  {
    id: "os-synchronization",
    subject: "OS",
    keywords: ["synchronization", "mutex", "semaphore", "race condition", "critical section", "monitor", "producer consumer"],
    answer: `
==============================
PROCESS SYNCHRONIZATION
==============================

RACE CONDITION:
  Multiple processes shared data access karein aur result
  execution order pe depend kare.

CRITICAL SECTION:
  Shared resource access karne wala code portion.
  Requirements:
    Mutual Exclusion: Ek waqt sirf ek process
    Progress:        Koi decide kare ki kaun jayega
    Bounded Waiting: Koi starve na kare

MUTEX (Mutual Exclusion Lock):
  Binary lock — locked or unlocked
  lock() → critical section → unlock()
  Owner based: jo lock kare wohi unlock kare

SEMAPHORE:
  Integer variable — wait(P) aur signal(V)
  wait(S):   S-- ; if S<0 → block
  signal(S): S++ ; if S<=0 → wake one process

  Binary Semaphore: 0 or 1 (like mutex but no owner)
  Counting Semaphore: 0 to N (resource pool manage)

MUTEX vs SEMAPHORE:
  Mutex: Ownership, binary, used for mutual exclusion
  Semaphore: No ownership, counting, used for signaling

MONITOR:
  High-level sync construct
  Built-in mutual exclusion (Java synchronized)
  Condition variables: wait(), signal(), notifyAll()

CLASSIC PROBLEMS:
  Producer-Consumer: Buffer management (semaphores)
  Readers-Writers:   Multiple readers OR one writer
  Dining Philosophers: N processes, N resources (deadlock avoidance)
`
  },

  {
    id: "os-interview",
    subject: "OS",
    keywords: ["os interview", "operating system interview questions", "os interview prep"],
    answer: `
==============================
OS INTERVIEW Q&A
==============================

Q: Zombie process kya hai?
A: Child process complete ho gayi but parent ne wait() nahi kiya.
   PCB remain karta hai — "undead" process.
   Fix: Parent wait() call kare, or init process adopt kare.

Q: Orphan process kya hai?
A: Parent process child se pehle terminate ho gayi.
   init (PID 1) adopt kar leta hai.

Q: System call kya hai?
A: User space se kernel services access karna.
   Examples: fork(), exec(), open(), read(), write(), exit()

Q: Semaphore vs Mutex?
A: Mutex: Binary, ownership-based, locking
   Semaphore: Counting, signaling, no ownership

Q: Kernel kya hai?
A: OS ka core — hardware directly control karta hai.
   Monolithic: Sab ek kernel mein (Linux)
   Microkernel: Minimal kernel, rest user space (QNX)

Q: Paging vs Segmentation?
A: Paging: Fixed size, no external frag, user nahi dekh sakta
   Segmentation: Variable size, logical division, external frag

Q: Thrashing kaise identify karein?
A: High page fault rate, CPU utilization drop, disk I/O spike.
   Fix: Reduce processes, add RAM.

Q: Interrupt kya hai?
A: Hardware/software signal jo CPU ko current task rok ke
   interrupt handler (ISR) run karne ko kehta hai.
   Types: Hardware (keyboard), Software (system call), Timer

Q: What is spooling?
A: Simultaneous Peripheral Operations Online.
   Jobs disk pe queue karo, peripheral apni speed se process kare.
   Example: Print spooler.

Q: What is context switching?
A: CPU ek process se doosre process pe switch karna.
   Current process state save (PCB mein) → Load new process state.
   Pure overhead hai — minimize karo.
`
  }
];