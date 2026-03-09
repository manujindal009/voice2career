export const cnKnowledge = [

  {
    id: "cn-definition",
    subject: "CN",
    keywords: ["computer networks", "cn", "what is network", "network definition"],
    answer: `
==============================
COMPUTER NETWORKS
==============================

DEFINITION:
Computer network = interconnected devices jo data share karte hain.

NETWORK TYPES:
  PAN: Personal Area (Bluetooth, 1-10m)
  LAN: Local Area (office/home, up to 1km)
  MAN: Metropolitan Area (city level)
  WAN: Wide Area (countries/continents, Internet)

NETWORK TOPOLOGIES:
  Bus:   Ek cable, sab connected → single point of failure
  Star:  Central hub/switch → hub fail = all fail (most common)
  Ring:  Circular → token passing → failure breaks ring
  Mesh:  Har device directly connected → expensive, reliable
  Tree:  Star networks connected hierarchically

TRANSMISSION MODES:
  Simplex:    One direction only (TV broadcast)
  Half-Duplex: Both directions, not simultaneously (walkie-talkie)
  Full-Duplex: Both simultaneously (phone call)
`
  },

  {
    id: "cn-osi-model",
    subject: "CN",
    keywords: ["osi model", "osi layers", "network layers", "7 layers", "osi reference model"],
    answer: `
==============================
OSI MODEL (7 LAYERS)
==============================

Mnemonic: "Please Do Not Throw Sausage Pizza Away"
(Physical, Data Link, Network, Transport, Session, Presentation, Application)

7. APPLICATION LAYER
   → User directly interact karta hai
   → Protocols: HTTP, HTTPS, FTP, SMTP, DNS, SSH, DHCP
   → Data unit: Data/Message

6. PRESENTATION LAYER
   → Data format, encryption, compression
   → SSL/TLS encryption yahan hoti hai
   → Data unit: Data

5. SESSION LAYER
   → Sessions establish, maintain, terminate karta hai
   → Authentication, Authorization
   → Protocols: NetBIOS, RPC

4. TRANSPORT LAYER
   → End-to-end delivery
   → Flow control, Error control
   → Protocols: TCP, UDP
   → Data unit: Segment (TCP) / Datagram (UDP)

3. NETWORK LAYER
   → Logical addressing (IP addressing)
   → Routing — best path find karna
   → Protocols: IP, ICMP, OSPF, BGP
   → Devices: Router
   → Data unit: Packet

2. DATA LINK LAYER
   → Physical addressing (MAC address)
   → Framing, Error detection (CRC)
   → Protocols: Ethernet, Wi-Fi (802.11)
   → Devices: Switch, Bridge
   → Data unit: Frame

1. PHYSICAL LAYER
   → Bits ko signals mein convert
   → Cables, connectors, voltages, bit rate
   → Devices: Hub, Repeater
   → Data unit: Bit

TCP/IP MODEL (4 layers):
  Application     → OSI 5+6+7
  Transport       → OSI 4
  Internet        → OSI 3
  Network Access  → OSI 1+2
`
  },

  {
    id: "cn-tcp-udp",
    subject: "CN",
    keywords: ["tcp", "udp", "tcp vs udp", "tcp udp difference", "reliable", "connectionless", "3 way handshake"],
    answer: `
==============================
TCP vs UDP
==============================

TCP (Transmission Control Protocol):
  → Connection-oriented (3-way handshake)
  → Reliable delivery guaranteed
  → In-order delivery
  → Flow control + Congestion control
  → Slower (overhead)
  → Use: HTTP/S, Email, File Transfer, SSH

UDP (User Datagram Protocol):
  → Connectionless (no handshake)
  → No delivery guarantee
  → No ordering
  → Very fast (minimal overhead)
  → Use: Video streaming, Gaming, DNS, VoIP

  Feature       TCP              UDP
  Connection    Yes              No
  Reliable      Yes              No
  Ordered       Yes              No
  Speed         Slower           Faster
  Header size   20 bytes         8 bytes

3-WAY HANDSHAKE (TCP Connection):
  Client → Server: SYN (seq=x)
  Server → Client: SYN-ACK (seq=y, ack=x+1)
  Client → Server: ACK (ack=y+1)
  [Connection Established]

4-WAY TERMINATION:
  Client → FIN → Server → ACK → Server → FIN → Client → ACK

TCP CONGESTION CONTROL:
  Slow Start:
    → cwnd = 1 MSS, exponential growth
    → ssthresh tak badhta hai

  Congestion Avoidance:
    → ssthresh ke baad linear growth (+1 MSS per RTT)

  Fast Retransmit:
    → 3 duplicate ACKs → packet lost → immediately retransmit

  Fast Recovery:
    → ssthresh = cwnd/2, cwnd = ssthresh (not 1)
`
  },

  {
    id: "cn-ip-addressing",
    subject: "CN",
    keywords: ["ip address", "ipv4", "ipv6", "subnetting", "cidr", "nat", "private ip", "subnet mask"],
    answer: `
==============================
IP ADDRESSING & SUBNETTING
==============================

IPv4:
  → 32-bit address (4 octets)
  → Example: 192.168.1.1
  → Total: ~4.3 billion addresses (exhausted)

IPv6:
  → 128-bit address
  → Example: 2001:0db8:85a3::8a2e:0370:7334
  → Total: 340 undecillion (practically unlimited)
  → No NAT needed, IPSec built-in

PRIVATE IP RANGES:
  10.0.0.0     → 10.255.255.255  (Class A private)
  172.16.0.0   → 172.31.255.255  (Class B private)
  192.168.0.0  → 192.168.255.255 (Class C private)
  127.x.x.x   → Loopback (localhost)

CIDR (Classless Inter-Domain Routing):
  192.168.1.0/24
  /24 = 24 bits network, 8 bits host
  Hosts = 2^8 - 2 = 254

SUBNETTING EXAMPLE:
  192.168.1.0/24 ko 4 subnets mein divide karo:
  → /26 use karo (2 extra bits → 4 subnets)
  → Har subnet mein 62 hosts (2^6 - 2)
  Subnet 1: 192.168.1.0/26   (hosts: .1 - .62)
  Subnet 2: 192.168.1.64/26  (hosts: .65 - .126)
  Subnet 3: 192.168.1.128/26 (hosts: .129 - .190)
  Subnet 4: 192.168.1.192/26 (hosts: .193 - .254)

NAT (Network Address Translation):
  → Private IP → Public IP translation (router karta hai)
  → Multiple devices ek public IP share karte hain
  → Port numbers se differentiate karta hai (PAT)
`
  },

  {
    id: "cn-protocols",
    subject: "CN",
    keywords: ["dns", "dhcp", "http", "https", "ftp", "smtp", "arp", "icmp", "ssh", "protocols", "http vs https"],
    answer: `
==============================
KEY NETWORK PROTOCOLS
==============================

DNS (Domain Name System):
  → Domain → IP address resolve karta hai
  → Port 53 (UDP for queries)
  → Records: A (IPv4), AAAA (IPv6), MX (mail), CNAME (alias)
  → Process: Browser → Local cache → OS cache → Router → Resolver → Root → TLD → Authoritative

DHCP (Dynamic Host Configuration Protocol):
  → Automatically IP assign karta hai
  → Process: DISCOVER → OFFER → REQUEST → ACKNOWLEDGE (DORA)
  → Port 67 (server), 68 (client)

HTTP vs HTTPS:
  HTTP:  Port 80, plaintext, no encryption
  HTTPS: Port 443, TLS/SSL encryption, certificate needed

FTP:
  → File Transfer Protocol
  → Port 21 (control), 20 (data)
  → Insecure → Use SFTP instead

SMTP / POP3 / IMAP:
  SMTP: Email bhejna → Port 25/587
  POP3: Download + delete from server → Port 110
  IMAP: Stay on server, sync → Port 143

SSH:
  → Secure remote login → Port 22
  → Encrypted, replaces Telnet

ARP (Address Resolution Protocol):
  → IP → MAC address resolve karta hai (same network)
  → Broadcast: "Kaun hai 192.168.1.1?"
  → ARP table/cache maintain hota hai

ICMP:
  → Error reporting + diagnostics
  → ping (echo request/reply)
  → traceroute (TTL expiry messages)
  → Not for data transfer
`
  },

  {
    id: "cn-routing",
    subject: "CN",
    keywords: ["routing", "ospf", "bgp", "rip", "static routing", "dynamic routing", "routing protocols"],
    answer: `
==============================
ROUTING & ROUTING PROTOCOLS
==============================

ROUTING:
  Network layer ka kaam — best path find karo source se destination tak.

STATIC vs DYNAMIC:
  Static:  Admin manually routes configure karta hai
           + Simple, secure, predictable
           - No auto-adaptation to failures

  Dynamic: Routers automatically paths discover + update
           + Adapts to failures, scalable
           - Complex, overhead

ROUTING ALGORITHM TYPES:

Distance Vector:
  → Neighbors se distances share karo
  → Bellman-Ford algorithm
  → Slow convergence, Count-to-Infinity problem
  → RIP — max 15 hops, Port 520

Link State:
  → Poora network topology know karo
  → Dijkstra's algorithm
  → Fast convergence
  → OSPF

OSPF (Open Shortest Path First):
  → Interior Gateway Protocol (IGP)
  → Areas use karta hai (Area 0 = backbone)
  → Metric = Cost (bandwidth based)
  → Fast convergence

BGP (Border Gateway Protocol):
  → Internet ka backbone
  → Between Autonomous Systems (ISPs)
  → Path Vector protocol
  → Port 179 (TCP)

COMPARISON:
  RIP:  Simple, small networks, max 15 hops
  OSPF: Large networks, fast convergence, hierarchical
  BGP:  Internet routing, between ISPs
`
  },

  {
    id: "cn-interview",
    subject: "CN",
    keywords: ["cn interview", "network interview questions", "computer network interview"],
    answer: `
==============================
CN INTERVIEW Q&A
==============================

Q: Hub vs Switch vs Router?
A: Hub:    Layer 1, broadcast to all ports, dumb device
   Switch: Layer 2, MAC-based forwarding, smart
   Router: Layer 3, IP-based routing, connects networks

Q: What is subnetting?
A: Network ko smaller sub-networks mein divide karna.
   CIDR notation use karo: 192.168.1.0/24

Q: What is ARP?
A: IP address se MAC address resolve karna (same network).
   ARP Table mein results cache hote hain.

Q: HTTP vs HTTPS?
A: HTTP: Port 80, plaintext, insecure
   HTTPS: Port 443, TLS encrypted, certificate se verify

Q: What is NAT?
A: Private IPs ko public IP se translate karna.
   Multiple devices ek public IP share karte hain.

Q: DNS kaise kaam karta hai?
A: Browser → Local cache → OS cache → Router cache
   → Recursive Resolver → Root → TLD → Authoritative → IP return

Q: TCP reliable kyun hai?
A: Sequence numbers, acknowledgments, retransmission,
   checksums, flow control, congestion control.

Q: What is a MAC address?
A: Hardware address — 48 bits (6 bytes)
   Format: AA:BB:CC:DD:EE:FF
   Layer 2 pe kaam karta hai, globally unique.

Q: What is VLAN?
A: Virtual LAN — ek switch pe multiple logical networks.
   Traffic isolation without physical separation.

Q: Bandwidth vs Throughput vs Latency?
A: Bandwidth: Max capacity (highway ki width)
   Throughput: Actual data transferred
   Latency: Delay (time to travel source to dest)
`
  }
];