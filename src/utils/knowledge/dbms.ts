export const dbmsKnowledge = [

{
id: "dbms-definition",
subject: "DBMS",
keywords: ["dbms", "database"],
answer: `

==============================
DATABASE MANAGEMENT SYSTEM
==============================

DEFINITION:
A DBMS is software that enables users to define, create, maintain and control access to databases.

------------------------------------------------
ACID PROPERTIES
------------------------------------------------

Atomicity:
Transaction completes fully or not at all.

Consistency:
Database moves from one valid state to another.

Isolation:
Transactions execute independently.

Durability:
Committed data is permanent.

Isolation Levels:
• Read Uncommitted
• Read Committed
• Repeatable Read
• Serializable

------------------------------------------------
NORMALIZATION
------------------------------------------------

Purpose:
Remove redundancy and anomalies.

1NF:
Atomic values.

2NF:
No partial dependency.

3NF:
No transitive dependency.

BCNF:
Stronger 3NF.

------------------------------------------------
INDEXING
------------------------------------------------

Used to speed up queries.

Types:
• Primary index
• Secondary index
• Clustered index
• Non-clustered index

Most DBs use B+ Tree.

------------------------------------------------
TRANSACTIONS
------------------------------------------------

BEGIN
COMMIT
ROLLBACK

------------------------------------------------
CAP THEOREM
------------------------------------------------

Consistency
Availability
Partition tolerance

A distributed system can guarantee only 2 out of 3.

------------------------------------------------
INTERVIEW QUESTIONS
------------------------------------------------

• Difference between DELETE and TRUNCATE?
• What is JOIN?
• What is indexing?
• What is deadlock in DB?
• What is normalization?

`
}

];