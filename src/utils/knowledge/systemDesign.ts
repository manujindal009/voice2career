export const systemDesignKnowledge = [

  {
    id: "system-design-definition",
    subject: "System Design",
    keywords: ["system design", "what is system design", "system design basics", "scalability", "availability", "reliability"],
    answer: `
==============================
SYSTEM DESIGN
==============================

DEFINITION:
Large-scale, distributed systems ko design karna jo
scalable, reliable, aur efficient hon.

KEY METRICS:
  Latency:    Request-response time (ms mein)
              P99 latency = 99% requests served in this time
  Throughput: Requests per second (RPS)
  Availability: Uptime percentage
              99.9%  = 8.7 hrs downtime/year
              99.99% = 52 min downtime/year
  Reliability: Consistent performance
  Durability:  Data loss nahi hoga

BACK OF ENVELOPE CALCULATIONS:
  1 million users, 10 req/day = 10M req/day
  10M / 86400 seconds ≈ 116 RPS (normal)
  Peak = 5x → 580 RPS
  Storage: 1M users x 1KB profile = 1GB

DESIGN PROCESS (Interview):
  1. Clarify requirements (functional + non-functional)
  2. Estimate scale (users, RPS, storage)
  3. High-level design
  4. Deep dive (bottlenecks, optimize)
  5. Summarize trade-offs
`
  },

  {
    id: "system-design-load-balancing",
    subject: "System Design",
    keywords: ["load balancer", "horizontal scaling", "vertical scaling", "auto scaling", "stateless", "consistent hashing"],
    answer: `
==============================
SCALABILITY & LOAD BALANCING
==============================

VERTICAL SCALING (Scale Up):
  → Server powerful banao (CPU, RAM, SSD)
  → Simple, no code change
  → Limit hai (max machine size), Single point of failure

HORIZONTAL SCALING (Scale Out):
  → Multiple servers add karo
  → No single limit
  → Load Balancer needed, No downtime

STATELESS SERVERS:
  → Any server can handle any request
  → Sessions → External store (Redis)
  → Horizontally scale easily

LOAD BALANCER ALGORITHMS:
  Round Robin:       Requests sequentially distribute
  Least Connections: Fewest active connections wale pe
  IP Hash:           Client IP se server (sticky sessions)
  Weighted:          Powerful servers ko zyada traffic

  Layer 4: TCP/UDP based, fast
  Layer 7: HTTP based, content-aware routing
  Tools: Nginx, HAProxy, AWS ALB

CONSISTENT HASHING:
  → Horizontal scaling mein servers add/remove karo
  → Minimal key remapping
  → Virtual nodes: Uneven load prevent karo
  Use: Distributed caches, Databases (DynamoDB, Cassandra)
`
  },

  {
    id: "system-design-caching",
    subject: "System Design",
    keywords: ["caching", "cache", "redis", "memcached", "cdn", "cache invalidation", "ttl", "cache aside", "write through"],
    answer: `
==============================
CACHING
==============================

DEFINITION:
Frequently accessed data ko fast storage mein store karo.
DB calls reduce karo, latency improve karo.

CACHE STRATEGIES:

Cache-Aside (Lazy Loading): Most common
  1. Check cache
  2. Cache miss → DB se read → Store in cache → Return
  Good for read-heavy workloads

Write-Through:
  Write → Cache → DB (synchronously)
  Always consistent, write latency higher

Write-Behind (Write-Back):
  Write → Cache → return (async DB write later)
  Fast writes, risk of data loss if cache fails

CACHE EVICTION POLICIES:
  LRU: Least Recently Used (most popular)
  LFU: Least Frequently Used
  FIFO: First In First Out
  TTL: Time to Live (expire after time)

REDIS vs MEMCACHED:
  Feature       Redis              Memcached
  Data types    Rich (list,set...) String only
  Persistence   Yes                No
  Replication   Yes                No
  Use case      Sessions, queues   Simple KV cache

CDN (Content Delivery Network):
  → Static assets globally distribute karo
  → User nearest edge server se content lete hain
  → Tools: Cloudflare, AWS CloudFront, Akamai

CACHE INVALIDATION:
  TTL set karo, Event-driven invalidation,
  Write-through cache.
`
  },

  {
    id: "system-design-databases",
    subject: "System Design",
    keywords: ["database scaling", "sharding", "replication", "partitioning", "read replica", "master slave", "sql nosql"],
    answer: `
==============================
DATABASE DESIGN & SCALING
==============================

DATABASE REPLICATION:
  Master-Slave:
    Master: Writes handle karta hai
    Slaves: Reads handle karte hain
    Async replication → eventual consistency
    Benefits: Read scaling, Fault tolerance

  Master-Master:
    Both handle reads + writes
    Conflict resolution needed

DATABASE SHARDING:
  Data ko multiple databases mein horizontally partition karo.

  Range-based: ID ranges (hotspot possible)
  Hash-based:  hash(key) % shards (even distribution)
  Directory:   Lookup table (flexible but single point)

  Problems: Cross-shard joins, Resharding, Hotspot

INDEXING IN SYSTEM DESIGN:
  Write: Slow (index maintain karna)
  Read: Fast (O(log n))
  Selective indexing: High cardinality columns pe

SQL vs NoSQL:
  SQL when: ACID needed, complex queries, structured data
  NoSQL when: Massive scale, flexible schema, low latency

TIME-SERIES DATABASES:
  → Time-stamped data (metrics, IoT, logs)
  → Tools: InfluxDB, TimescaleDB, Prometheus

SEARCH DATABASES:
  → Full-text search
  → Elasticsearch (inverted index)
  Use: E-commerce search, Log analysis
`
  },

  {
    id: "system-design-message-queue",
    subject: "System Design",
    keywords: ["message queue", "kafka", "rabbitmq", "pub sub", "async", "event driven", "message broker"],
    answer: `
==============================
MESSAGE QUEUES & ASYNC PROCESSING
==============================

WHY MESSAGE QUEUES?
  → Services ko decouple karo
  → Async processing (non-blocking)
  → Load spikes buffer karo
  → Retry mechanism
  → Fault tolerance

PRODUCER → QUEUE → CONSUMER

KAFKA (Most popular at scale):
  → Distributed streaming platform
  → Topics mein messages organize
  → Partitions: Parallelism ke liye
  → Consumer Groups: Same topic, multiple consumers
  → Retention: Messages time-based retain
  → High throughput: Millions of msgs/sec
  → Use: Event streaming, log aggregation, real-time analytics

RABBITMQ:
  → Traditional message broker
  → AMQP protocol
  → Complex routing (exchanges, bindings)
  → Message acknowledgment, dead letter queues
  → Use: Task queues, RPC, microservices

PATTERNS:
  Dead Letter Queue (DLQ): Failed messages → separate queue
  Saga Pattern: Distributed transactions via events
  CQRS: Writes aur Reads separate models
`
  },

  {
    id: "system-design-api",
    subject: "System Design",
    keywords: ["api design", "rest api", "graphql", "grpc", "rate limiting", "api gateway", "microservices", "monolith"],
    answer: `
==============================
API DESIGN & MICROSERVICES
==============================

REST API DESIGN:
  → HTTP methods: GET, POST, PUT/PATCH, DELETE
  → Stateless
  → Resource-based URLs: /users/123/orders
  → Status codes: 200, 201, 400, 401, 403, 404, 429, 500

REST vs GraphQL vs gRPC:
  REST:    Simple, HTTP, JSON, widely understood
  GraphQL: Client queries exactly what it needs (mobile apps)
  gRPC:    Binary (Protocol Buffers), low latency, streaming
           Use: Microservices internal communication

RATE LIMITING:
  Fixed Window:   X requests per window
  Sliding Window: Smooth rate limiting
  Token Bucket:   Tokens refill at rate (burst allowed)
  Leaky Bucket:   Constant output rate

API GATEWAY:
  → Single entry point
  → Auth, Rate limiting, Routing, Logging, SSL termination
  → Tools: Kong, AWS API Gateway, Nginx

MONOLITH vs MICROSERVICES:
  Monolith: Simple deploy, easy debug, no network latency
            But: Scale entire app, tight coupling

  Microservices: Independent scale + deploy, tech flexibility
                 But: Complexity, distributed tracing challenges

  Start monolith → Extract services when clearly needed.
`
  },

  {
    id: "system-design-cap",
    subject: "System Design",
    keywords: ["cap theorem", "consistency", "availability", "partition tolerance", "eventual consistency", "strong consistency"],
    answer: `
==============================
CAP THEOREM & CONSISTENCY
==============================

CAP THEOREM:
  Distributed system mein sirf 2 guarantee ho sakti hain:

  C — Consistency:    Har read latest write return kare
  A — Availability:   Har request response mile
  P — Partition Tol:  Network partition pe bhi kaam kare

REAL WORLD: P is mandatory (network fails hote hain)
Choice: CP or AP

CP Systems: (Consistency over Availability)
  → MongoDB, HBase, ZooKeeper, Redis Cluster
  → Use: Banking, inventory

AP Systems: (Availability over Consistency)
  → Cassandra, CouchDB, DynamoDB
  → Use: Social media, DNS

CONSISTENCY MODELS:

Strong Consistency:
  → Write ke baad immediately consistent
  → Slower, expensive
  → Use: Bank transactions, inventory

Eventual Consistency:
  → Eventually sab nodes consistent
  → Faster, more available
  → Use: Social media likes, DNS

PACELC:
  Even without partitions: Latency vs Consistency trade-off bhi hai.
`
  },

  {
    id: "system-design-case-studies",
    subject: "System Design",
    keywords: ["url shortener", "design instagram", "design twitter", "design whatsapp", "design youtube", "system design case study"],
    answer: `
==============================
SYSTEM DESIGN CASE STUDIES
==============================

URL SHORTENER (like bit.ly):
  Core: Base62 encoding → 62^7 ≈ 3.5T unique URLs
  DB: Key-Value store (short → long URL)
  Cache: Redis for popular URLs
  Flow: Hash → Collision check → Store → Redirect

INSTAGRAM/PHOTO SHARING:
  Storage: S3 for photos, CDN for delivery
  DB: Users/Follows in SQL, Photos in NoSQL
  Feed: Pre-compute (celebrities), Pull (regular) — Hybrid
  Cache: Redis for hot feeds

TWITTER/MICROBLOGGING:
  Timeline: Hybrid — push normal users, pull celebrities
  Trending: Sliding window count (Count-Min Sketch)
  Storage: Tweets NoSQL, Social graph separate

WHATSAPP/CHAT:
  Protocol: WebSocket for real-time
  Storage: Messages temporary (deliver + delete), Media on S3
  Delivery: 3-state (sent, delivered, read)
  Group: Message fan-out to all members

DESIGN STEPS (Framework):
  1. Functional Requirements: What does it do?
  2. Non-Functional: Scale, latency, availability?
  3. Estimate: Users, RPS, Storage
  4. High-Level Design: Major components
  5. Deep Dive: Bottleneck, hotspot, tradeoffs
`
  },

  {
    id: "system-design-interview",
    subject: "System Design",
    keywords: ["system design interview", "system design questions", "interview prep system design"],
    answer: `
==============================
SYSTEM DESIGN INTERVIEW Q&A
==============================

Q: Monolith se Microservices kab migrate karein?
A: Jab team badi ho, independent deployment chahiye ho,
   ya specific component scale karna ho.
   Rule: Pehle monolith, jab clearly needed ho tab extract.

Q: Database choose kaise karein?
A: SQL: ACID, complex queries, structured data (banking, ERP)
   NoSQL: Scale, flexible schema, low latency (social, gaming)

Q: How to handle 10x traffic spike?
A: Auto Scaling, CDN for static content,
   Cache (Redis) for DB load,
   Queue for async processing,
   Rate limiting to protect backend.

Q: Database slow hai kya karein?
A: 1. Query optimize (EXPLAIN analyze)
   2. Proper indexes add karo
   3. Connection pooling
   4. Read replicas
   5. Cache layer (Redis)
   6. Sharding (last resort)

Q: Single point of failure kaise eliminate karein?
A: Multiple instances, Load balancer with health checks,
   DB replication, Multi-AZ deployment, Circuit breaker.

Q: 99.99% availability kaise design karein?
A: Multi-region, Active-active or active-passive,
   Auto-failover, Circuit breaker,
   Graceful degradation, Chaos engineering.

Q: Cache consistency kaise maintain karein?
A: TTL set karo, Event-driven invalidation,
   Write-through cache,
   Accept eventual consistency for non-critical data.
`
  }
];