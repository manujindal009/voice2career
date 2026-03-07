export const cloudKnowledge = [

  {
    id: "cloud-definition",
    subject: "Cloud",
    keywords: ["cloud computing", "what is cloud", "cloud definition", "cloud characteristics"],
    answer: `
==============================
CLOUD COMPUTING
==============================

DEFINITION:
Internet ke through computing services (servers, storage, databases,
networking, software) deliver karna — hardware khud khareedne ki
jagah rent karo AWS jaise providers se.

KEY CHARACTERISTICS (NIST):
  • On-Demand Self-Service  → Khud resources lo, bina kisi se pooche
  • Broad Network Access    → Kahi se bhi access karo
  • Resource Pooling        → Ek server pe kai logon ka kaam
  • Rapid Elasticity        → Zaroorat ke hisaab se badhao/ghataao
  • Measured Service        → Jitna use karo, utna pay karo

SERVICE MODELS:
  IaaS → Sirf infrastructure (EC2) — OS + app aap manage karo
  PaaS → Platform ready (Heroku) — sirf app manage karo
  SaaS → Poora software ready (Gmail) — bas use karo

DEPLOYMENT MODELS:
  Public  → AWS/Azure — shared, pay-as-you-go, scalable
  Private → Sirf ek organization — secure, expensive (banks/govt)
  Hybrid  → Public + Private ka mix (sensitive data private rakho)
  Multi   → Multiple providers — avoid vendor lock-in
`
  },

  {
    id: "aws-core-services",
    subject: "Cloud",
    keywords: ["AWS", "EC2", "S3", "RDS", "Lambda", "AWS services", "core services"],
    answer: `
==============================
AWS CORE SERVICES
==============================

--- COMPUTE ---
EC2:     Virtual machine — OS/RAM/CPU choose karo, per hour billing
Lambda:  Serverless — code run karo bina server manage kiye, per request billing
ECS/EKS: Docker containers run karo (EKS = Kubernetes on AWS)

--- STORAGE ---
S3:      Object storage — files/images/videos, unlimited, 11 nines durability
EBS:     EC2 ka hard drive (block storage), ek EC2 se attached
EFS:     Shared file system — multiple EC2 mount kar sakte hain
Glacier: Archive storage — bahut sasta, retrieval slow

--- DATABASE ---
RDS:       Managed SQL (MySQL, PostgreSQL, Oracle) — AWS handles backup/patching
Aurora:    AWS ka SQL — MySQL se 5x fast, auto-scales to 128TB
DynamoDB:  NoSQL — serverless, ms latency, auto-scaling
ElastiCache: In-memory cache — Redis ya Memcached

--- NETWORKING ---
VPC:          Apna private network AWS ke andar
Route 53:     DNS service — domain → IP
CloudFront:   CDN — nearest location se content serve karo
ELB:          Load Balancer — traffic distribute karo
API Gateway:  REST/WebSocket APIs banao aur manage karo

--- SECURITY ---
IAM:     WHO can access WHAT — Users, Groups, Roles, Policies
KMS:     Encryption key management
WAF:     Web Application Firewall — SQL injection/XSS se bachao
Shield:  DDoS protection
`
  },

  {
    id: "cloud-vpc-networking",
    subject: "Cloud",
    keywords: ["VPC", "subnet", "security group", "NACL", "NAT gateway", "internet gateway", "networking"],
    answer: `
==============================
VPC & NETWORKING
==============================

VPC = Apna isolated private network AWS ke andar

KEY COMPONENTS:
  CIDR Block       → IP range (e.g. 10.0.0.0/16)
  Public Subnet    → Internet access hai (web servers)
  Private Subnet   → No internet (databases, backend)
  Internet Gateway → VPC ko internet se connect karta hai
  NAT Gateway      → Private subnet → internet (outbound only)
  Route Table      → Traffic kahan jaye — rules define karo

SECURITY:
  Security Groups (Instance level):
    → Stateful, Allow rules only
    → Return traffic automatically allowed

  NACL (Subnet level):
    → Stateless, Allow + Deny rules
    → Inbound aur outbound dono explicitly allow karo

  Feature         Security Group    NACL
  Level           Instance          Subnet
  State           Stateful          Stateless
  Rules           Allow only        Allow + Deny

VPC PEERING:
  → Do VPCs ko connect karo (AWS network pe, internet nahi)
  → Non-transitive: A↔B, B↔C means A↔C nahi

VPC ENDPOINTS:
  → S3/DynamoDB access karo bina internet ke
`
  },

  {
    id: "cloud-serverless-scaling",
    subject: "Cloud",
    keywords: ["serverless", "Lambda", "auto scaling", "scaling", "load balancer", "horizontal", "vertical"],
    answer: `
==============================
SERVERLESS & SCALING
==============================

--- LAMBDA ---
Kaise kaam karta hai:
  1. Function likho (Python/Node.js/Java)
  2. Trigger define karo (API call, S3 upload, schedule)
  3. Event aaya → Lambda runs → billing sirf execution time ka

Limits:
  Memory: 128MB – 10GB  |  Timeout: Max 15 min
  Package: 50MB zip     |  Concurrency: 1000 default

Cold Start vs Warm Start:
  Cold → Container pehli baar start (100ms-1s delay)
  Warm → Container already running (fast)
  Fix  → Provisioned Concurrency use karo

--- SCALING ---
Vertical (Scale Up):
  → Machine powerful banao (t2.micro → t2.xlarge)
  → Limit hai, downtime possible

Horizontal (Scale Out):
  → Aur machines add karo — preferred for web apps
  → Load Balancer ke saath use karo

Auto Scaling Group (ASG):
  → Min/Max/Desired capacity set karo
  → Policies: Target Tracking, Step Scaling, Scheduled

Load Balancer Types:
  ALB → Layer 7 (HTTP) — URL/header based routing, web apps
  NLB → Layer 4 (TCP) — ultra fast, gaming/IoT
  CLB → Old, avoid karo
`
  },

  {
    id: "cloud-storage-database",
    subject: "Cloud",
    keywords: ["S3 classes", "storage classes", "RDS", "DynamoDB", "Multi-AZ", "read replica", "ElastiCache", "Aurora"],
    answer: `
==============================
STORAGE & DATABASE — DEEP DIVE
==============================

--- S3 STORAGE CLASSES ---
  Standard          → Frequent access, costly
  Standard-IA       → Infrequent access, retrieval fee
  One Zone-IA       → Single AZ, risky but cheap
  Intelligent-Tier  → AWS auto manages tiers
  Glacier Instant   → Archive, ms retrieval, 90 day min
  Glacier Flexible  → Archive, minutes-hours retrieval
  Glacier Deep      → Cheapest, 12hr retrieval, compliance

S3 Key Features:
  Versioning, Lifecycle Rules, CRR/SRR Replication,
  Encryption (SSE-S3/KMS/C), Static Website Hosting

--- RDS ---
  Multi-AZ    → Synchronous standby, auto failover = HIGH AVAILABILITY
  Read Replica → Asynchronous copy = READ SCALING (5 max)
  Rule: Multi-AZ = HA, Read Replica = Performance

--- AURORA ---
  → MySQL/PostgreSQL compatible, 5x faster
  → 6 copies across 3 AZs, auto-scales to 128TB
  → Aurora Serverless = capacity auto-scale

--- DYNAMODB ---
  → NoSQL, serverless, ms latency
  → Table → Items → Attributes
  → Primary Key = Partition Key (+ optional Sort Key)
  → DAX = in-memory cache for DynamoDB
  → Use: Gaming, shopping cart, session store

--- ELASTICACHE ---
  Redis:     Strings/Lists/Sets, persistence, pub/sub
  Memcached: Simple KV, multi-threaded, no persistence
`
  },

  {
    id: "cloud-security-monitoring",
    subject: "Cloud",
    keywords: ["IAM", "security", "CloudWatch", "CloudTrail", "encryption", "shared responsibility", "monitoring"],
    answer: `
==============================
SECURITY & MONITORING
==============================

--- IAM ---
  Users   → Individual login (avoid root for daily use)
  Groups  → Users ka collection — group pe policy lagao
  Roles   → Temp permissions, no password (EC2/Lambda use karte hain)
  Policies → JSON — Allow/Deny, which actions, which resources

Best Practices:
  ✓ Root pe MFA lagao  ✓ Least privilege follow karo
  ✓ EC2/Lambda ke liye Roles use karo (not access keys)
  ✓ Access keys regularly rotate karo

--- ENCRYPTION ---
  At Rest    → KMS se keys manage, S3/EBS/RDS encrypt
  In Transit → TLS/SSL (HTTPS), ACM se free certs

--- SHARED RESPONSIBILITY ---
  AWS ka kaam  → Hardware, network, physical infra ("OF the cloud")
  Tera kaam    → Data, IAM, OS patching, security groups ("IN the cloud")
  Rule: Tune configure kiya → teri responsibility

--- CLOUDWATCH vs CLOUDTRAIL ---
  CloudWatch → Performance monitor (CPU, memory, logs, alarms)
              → Metrics, Logs, Alarms, Events/EventBridge
              → Default EC2: CPU, Network (Memory ke liye agent chahiye)

  CloudTrail → API audit (WHO did WHAT, WHEN, from WHERE)
             → Security investigation, compliance

--- AWS CONFIG ---
  → Resource configuration changes track karo
  → Compliance rules check karo
  → Example: "All S3 buckets must have encryption"
`
  },

  {
    id: "cloud-ha-dr",
    subject: "Cloud",
    keywords: ["high availability", "disaster recovery", "RTO", "RPO", "regions", "availability zones", "fault tolerance"],
    answer: `
==============================
HIGH AVAILABILITY & DISASTER RECOVERY
==============================

--- KEY TERMS ---
  HA (High Availability)  → System runs even if component fails
  Fault Tolerance         → Zero downtime despite failures (stronger than HA)
  RTO → Max acceptable downtime ("kitne time mein restore?")
  RPO → Max acceptable data loss ("kitna purana data restore karein?")
  Rule: Lower RTO/RPO = More expensive

Availability levels:
  99.9%  → ~8.7 hrs downtime/year
  99.99% → ~52 min downtime/year
  99.999% (5 nines) → ~5 min downtime/year

--- REGIONS & AZs ---
  Region → Geographic area (Mumbai = ap-south-1)
         → Completely independent power + network

  AZ     → 1+ data centers in a region (2-6 per region)
         → Low-latency fiber se connected
         → Separate power, cooling, networking

  Edge Locations → CloudFront CDN cache (400+ worldwide)

--- DISASTER RECOVERY STRATEGIES ---

  Backup & Restore  → S3 backups, restore when needed
                    → RTO: Hours | RPO: Hours | Cheapest

  Pilot Light       → Core systems always on in DR region
                    → RTO: Minutes | RPO: Minutes

  Warm Standby      → Scaled-down system in DR region
                    → RTO: Minutes | RPO: Seconds

  Multi-Site Active → Full system in multiple regions
                    → RTO: ~Zero | RPO: ~Zero | Most Expensive
`
  },

  {
    id: "cloud-interview-questions",
    subject: "Cloud",
    keywords: ["interview", "interview questions", "cloud interview", "AWS interview", "interview prep"],
    answer: `
==============================
CLOUD / AWS INTERVIEW Q&A
==============================

Q: EC2 aur S3 mein difference?
A: EC2 = Virtual server (code/app run karta hai)
   S3 = Object storage (files/images/backups store karta hai)

Q: Serverless kya hai?
A: Server manage kiye bina code run karna. Lambda auto-provision
   karta hai, scales karta hai. Pay per execution, idle time nahi.

Q: Auto Scaling kya hai?
A: Demand ke basis pe EC2 automatically add/remove karna.
   Performance ensure karta hai aur cost kam karta hai.

Q: Multi-AZ vs Read Replica?
A: Multi-AZ = Synchronous standby = HIGH AVAILABILITY (failover)
   Read Replica = Asynchronous copy = READ SCALING (performance)

Q: Security Group vs NACL?
A: SG = Instance level, stateful, allow only
   NACL = Subnet level, stateless, allow + deny

Q: CloudWatch vs CloudTrail?
A: CloudWatch = Performance monitor (CPU, logs, alarms)
   CloudTrail = API audit (who did what)

Q: Shared Responsibility Model?
A: AWS = Hardware/infra secure karta hai
   Customer = Data, IAM, OS, app config secure karta hai

Q: VPC kya hai?
A: AWS ke andar apna private isolated network.
   Subnets, route tables, security controls sab aap define karo.

Q: High Availability kaise design karein?
A: Route53 → CloudFront → ALB → EC2 (ASG, Multi-AZ)
   → RDS Multi-AZ → ElastiCache → S3 (static assets)
   → CloudWatch (monitoring) + CloudTrail (audit)

Q: AWS cost kaise reduce karein?
A: Reserved Instances (40-60% savings), Spot Instances (90% savings),
   S3 Lifecycle policies, Right-size EC2, Auto Scaling,
   Delete unused resources (EIPs, snapshots, old AMIs)
`
  }

];