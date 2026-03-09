export const dbmsKnowledge = [

  {
    id: "dbms-definition",
    subject: "DBMS",
    keywords: ["dbms", "database", "what is dbms", "database management"],
    answer: `
==============================
DATABASE MANAGEMENT SYSTEM
==============================

DEFINITION:
DBMS ek software hai jo users ko databases define, create, maintain
aur control karne ki ability deta hai.

WHY DBMS?
  File System problems:
    • Data redundancy (duplication)
    • Inconsistency
    • No concurrent access
    • No security
  DBMS solves yeh sab.

TYPES OF DBMS:
  Relational (RDBMS) → Tables (MySQL, PostgreSQL, Oracle)
  NoSQL              → Key-Value, Document, Graph (MongoDB, Redis)
  Hierarchical       → Tree structure (IBM IMS)
  Network            → Graph structure
  Object-Oriented    → Objects store karta hai

COMPONENTS:
  • Query Processor  → SQL parse + execute karta hai
  • Storage Manager  → Data disk pe store/retrieve karta hai
  • Buffer Manager   → RAM me data cache karta hai
  • Transaction Mgr  → ACID ensure karta hai
  • Catalog/Dictionary → Schema metadata store karta hai
`
  },

  {
    id: "dbms-acid",
    subject: "DBMS",
    keywords: ["acid", "acid properties", "atomicity", "consistency", "isolation", "durability", "transaction"],
    answer: `
==============================
ACID PROPERTIES
==============================

A — ATOMICITY
  Transaction ya poori hogi ya bilkul nahi.
  Example: Bank transfer — debit hua but credit fail →
           poori transaction rollback hogi.
  Achieved by: Undo logs, Rollback

C — CONSISTENCY
  Database ek valid state se doosri valid state mein jayegi.
  Example: Balance kabhi negative nahi hoga (constraint).
  Achieved by: Constraints, Cascades, Triggers

I — ISOLATION
  Concurrent transactions ek dusre ko affect nahi karti.
  Example: Do log same seat book karein → ek ko success milega.
  Achieved by: Locks, MVCC (Multi-Version Concurrency Control)

D — DURABILITY
  Committed transaction permanent hai, even after crash.
  Achieved by: Write-Ahead Logging (WAL), Redo logs

------------------------------------------------
ISOLATION LEVELS (Low to High)
------------------------------------------------

Read Uncommitted → Dirty reads possible (fastest, least safe)
Read Committed   → No dirty reads (PostgreSQL default)
Repeatable Read  → No dirty + phantom reads possible (MySQL default)
Serializable     → Full isolation (slowest, safest)

PROBLEMS:
  Dirty Read     → Uncommitted data read karna
  Non-Repeatable → Same row do baar read → different values
  Phantom Read   → New rows appear between two reads of same query
`
  },

  {
    id: "dbms-normalization",
    subject: "DBMS",
    keywords: ["normalization", "1nf", "2nf", "3nf", "bcnf", "denormalization", "functional dependency"],
    answer: `
==============================
NORMALIZATION
==============================

PURPOSE:
  Redundancy hatana, anomalies remove karna.

ANOMALIES (Problems without normalization):
  Insert anomaly  → Data insert karne ke liye extra data chahiye
  Update anomaly  → Ek jagah update → baaki jagah stale data
  Delete anomaly  → Row delete → useful data bhi chali jaati hai

FUNCTIONAL DEPENDENCY:
  A → B means: A ki value se B uniquely determine hoti hai
  Example: StudentID → StudentName

NORMAL FORMS:

1NF (First Normal Form):
  Rule: Har cell atomic ho (single value), no repeating groups
  Violation: Phone: "9999, 8888" (multiple values in one cell)
  Fix: Separate row for each phone number

2NF (Second Normal Form):
  Rule: 1NF + No partial dependency
  Violation: (StudentID, CourseID) → StudentName
             StudentName sirf StudentID pe dependent hai
  Fix: StudentName ko separate table mein le jao

3NF (Third Normal Form):
  Rule: 2NF + No transitive dependency
  Violation: StudentID → Dept → DeptHead
  Fix: Dept table alag banao

BCNF (Boyce-Codd NF):
  Rule: Har functional dependency mein LHS superkey ho
  Stricter version of 3NF

DENORMALIZATION:
  Intentionally redundancy add karna for PERFORMANCE
  Use case: Read-heavy systems, Data warehouses
`
  },

  {
    id: "dbms-indexing",
    subject: "DBMS",
    keywords: ["indexing", "index", "b tree", "b+ tree", "clustered index", "non clustered", "query optimization"],
    answer: `
==============================
INDEXING
==============================

DEFINITION:
Index ek data structure hai jo queries ko fast karta hai —
jaise book ka index page.

WITHOUT INDEX: Full table scan → O(n)
WITH INDEX:    B+ Tree search  → O(log n)

TYPES OF INDEXES:

Primary Index:
  → Primary key pe automatically banta hai
  → Data physically sorted hota hai is key pe
  → Only one per table

Clustered Index:
  → Data rows physically is index ke order mein store hoti hain
  → Ek table mein sirf EK clustered index ho sakta hai
  → Range queries ke liye bahut fast

Non-Clustered Index:
  → Separate structure hota hai actual data se
  → Multiple ho sakte hain ek table mein
  → Pointer store karta hai actual row ki taraf

Composite Index:
  → Multiple columns pe index
  → Order matters! (col1, col2) → query on col1 works, col2 alone may not

Covering Index:
  → Query ke saare columns index mein hain
  → Table access hi nahi karna padta (fastest)

B+ TREE (Most Common):
  • Balanced tree → always O(log n)
  • Leaf nodes: actual data pointers
  • Leaf nodes linked: range queries fast
  • Insertion/Deletion auto-balance karta hai

WHEN NOT TO USE INDEX:
  • Small tables
  • High write tables (INSERT/UPDATE/DELETE slow hoga)
  • Low cardinality columns (e.g., gender: M/F)
`
  },

  {
    id: "dbms-joins",
    subject: "DBMS",
    keywords: ["joins", "inner join", "outer join", "left join", "right join", "full join", "cross join", "self join", "sql joins"],
    answer: `
==============================
SQL JOINS
==============================

INNER JOIN:
  Dono tables mein matching rows return karta hai.
  SELECT * FROM A INNER JOIN B ON A.id = B.id;

LEFT JOIN (LEFT OUTER):
  Left table ki saari rows + right table ki matching rows.
  Non-matching right side = NULL

RIGHT JOIN (RIGHT OUTER):
  Right table ki saari rows + left table ki matching rows.
  Non-matching left side = NULL

FULL OUTER JOIN:
  Dono tables ki saari rows.
  Non-matching side = NULL

CROSS JOIN:
  Cartesian product — A ki har row x B ki har row
  N x M rows return karta hai

SELF JOIN:
  Table khud se join hoti hai (hierarchy/reporting structure)
  SELECT e.name, m.name as manager
  FROM Employee e JOIN Employee m ON e.managerID = m.id;

------------------------------------------------
IMPORTANT SQL COMMANDS
------------------------------------------------

DDL: CREATE, ALTER, DROP, TRUNCATE, RENAME
DML: SELECT, INSERT, UPDATE, DELETE
DCL: GRANT, REVOKE
TCL: COMMIT, ROLLBACK, SAVEPOINT

DELETE vs TRUNCATE vs DROP:
  DELETE   → Rows delete, logged, WHERE clause use kar sakte ho, rollback possible
  TRUNCATE → Saari rows fast delete, not logged, no WHERE, no rollback
  DROP     → Table hi delete ho jaati hai structure sahit

HAVING vs WHERE:
  WHERE   → Group banne se pehle filter (individual rows)
  HAVING  → Group banne ke baad filter (aggregated results)

Query Execution Order:
  FROM → JOIN → WHERE → GROUP BY → HAVING → SELECT → ORDER BY → LIMIT
`
  },

  {
    id: "dbms-transactions-locks",
    subject: "DBMS",
    keywords: ["transaction", "deadlock", "locking", "concurrency", "rollback", "commit", "savepoint", "mvcc"],
    answer: `
==============================
TRANSACTIONS & CONCURRENCY
==============================

TRANSACTION:
  Ek ya zyada operations ka logical unit.
  BEGIN → operations → COMMIT or ROLLBACK

SAVEPOINT:
  Transaction ke andar checkpoint
  ROLLBACK TO sp1; (partial rollback possible)

CONCURRENCY PROBLEMS:
  Dirty Read:     Uncommitted data read karna
  Lost Update:    Do transactions same data update → ek ka update lost
  Phantom Read:   New rows appear between two reads
  Deadlock:       Circular wait between processes

DEADLOCK:
  4 Conditions:
    1. Mutual Exclusion
    2. Hold and Wait
    3. No Preemption
    4. Circular Wait

  Detection: Wait-For Graph (cycle = deadlock)
  Prevention: At least ek condition tod do
  Avoidance:  Banker's Algorithm
  Recovery:   Process kill karo ya rollback karo

LOCKING:
  Shared Lock (S): Read allowed, write blocked
  Exclusive Lock (X): Read + Write both blocked

  2-Phase Locking (2PL):
    Growing Phase: Locks acquire karo (no release)
    Shrinking Phase: Locks release karo (no new acquire)

MVCC (Multi-Version Concurrency Control):
  → Read ke liye old version use karo
  → Write ke liye naya version banao
  → Readers writers ko block nahi karte
  → PostgreSQL, MySQL InnoDB use karte hain
`
  },

  {
    id: "dbms-nosql-cap",
    subject: "DBMS",
    keywords: ["nosql", "cap theorem", "mongodb", "redis", "cassandra", "sql vs nosql", "document database"],
    answer: `
==============================
NoSQL & CAP THEOREM
==============================

SQL vs NoSQL:
  Feature        SQL              NoSQL
  Schema         Fixed            Flexible
  Scaling        Vertical         Horizontal
  ACID           Full             Partial (BASE)
  Use case       Banking, ERP     Social, Real-time

NOSQL TYPES:
  Key-Value   → Redis, DynamoDB (session, cache)
  Document    → MongoDB (user profiles, catalogs)
  Column      → Cassandra, HBase (time-series, IoT)
  Graph       → Neo4j (social networks, recommendations)

BASE (NoSQL alternative to ACID):
  Basically Available  → System hamesha respond karta hai
  Soft State           → State change ho sakta hai without input
  Eventual Consistency → Eventually sab nodes consistent ho jayenge

CAP THEOREM:
  C — Consistency:   Har read latest write return kare
  A — Availability:  Har request response mile
  P — Partition Tol: Network partition ho tab bhi kaam kare

  Rule: Distributed system mein sirf 2 guarantee ho sakti hain

  CA: Traditional RDBMS
  CP: MongoDB, HBase (consistency over availability)
  AP: Cassandra, CouchDB (availability over consistency)
`
  },

  {
    id: "dbms-interview",
    subject: "DBMS",
    keywords: ["dbms interview", "database interview questions", "sql interview"],
    answer: `
==============================
DBMS INTERVIEW Q&A
==============================

Q: Primary Key vs Unique Key?
A: Primary Key: NULL nahi, sirf ek per table, clustered index
   Unique Key: NULL allowed (ek), multiple per table

Q: View kya hai?
A: Virtual table — stored query hai, actual data nahi.
   Security ke liye use karo (sensitive columns hide karo).

Q: Stored Procedure vs Function?
A: Procedure: DML operations kar sakta hai, return optional
   Function: Return mandatory, DML nahi (pure functions)

Q: Trigger kya hai?
A: Auto-execute hota hai INSERT/UPDATE/DELETE pe.
   BEFORE / AFTER triggers hote hain.
   Use: Audit logging, validation, cascading changes.

Q: What is denormalization?
A: Performance ke liye redundancy intentionally add karna.
   Read-heavy systems mein useful.

Q: Explain Query Execution Order:
A: FROM → JOIN → WHERE → GROUP BY → HAVING → SELECT → ORDER BY → LIMIT

Q: Difference between OLTP and OLAP?
A: OLTP: Transactional (INSERT/UPDATE/DELETE), normalized, real-time
   OLAP: Analytical (SELECT heavy), denormalized, historical data

Q: What is sharding?
A: Data ko multiple databases mein horizontally split karna.
   Example: User IDs 1-1M → DB1, 1M-2M → DB2

Q: DELETE vs TRUNCATE?
A: DELETE: Row by row, logged, rollback possible, WHERE allowed
   TRUNCATE: All rows at once, not logged, no rollback, no WHERE
`
  }
];