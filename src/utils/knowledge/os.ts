export const osKnowledge = [

{
id: "os-definition",
subject: "OS",
keywords: ["operating system", "os"],
answer: `

==============================
OPERATING SYSTEM (OS)
==============================

DEFINITION:
An Operating System is system software that manages computer hardware, software resources, and provides common services for computer programs.

It acts as an interface between user and hardware.

------------------------------------------------
CORE FUNCTIONS
------------------------------------------------

1️⃣ Process Management
• Creating and deleting processes
• Scheduling
• Synchronization

2️⃣ Memory Management
• Allocation and deallocation
• Paging and segmentation
• Virtual memory

3️⃣ File System Management
• File creation
• Access control
• Storage management

4️⃣ I/O Management
• Device drivers
• Buffering

------------------------------------------------
PROCESS vs THREAD
------------------------------------------------

Process:
• Independent execution unit
• Own memory space

Thread:
• Lightweight process
• Shared memory

Context switching:
Process switching is expensive compared to threads.

------------------------------------------------
DEADLOCK
------------------------------------------------

DEFINITION:
Deadlock is a situation where a set of processes are blocked because each process is holding a resource and waiting for another resource held by another process.

4 Necessary Conditions:
• Mutual Exclusion
• Hold and Wait
• No Preemption
• Circular Wait

Solutions:
• Prevention
• Avoidance (Banker’s Algorithm)
• Detection and Recovery

------------------------------------------------
CPU SCHEDULING
------------------------------------------------

Algorithms:
• FCFS
• SJF
• Round Robin
• Priority Scheduling

Important Concepts:
• Starvation
• Aging
• Throughput
• Turnaround time

------------------------------------------------
MEMORY MANAGEMENT
------------------------------------------------

Paging:
Fixed-size memory blocks.

Segmentation:
Variable-size blocks.

Virtual Memory:
Uses disk to extend RAM.

Thrashing:
Excessive paging causing performance drop.

------------------------------------------------
INTERVIEW QUESTIONS
------------------------------------------------

• What is race condition?
• Difference between semaphore and mutex?
• What is system call?
• What is context switching?
• What is zombie process?

`
}

];