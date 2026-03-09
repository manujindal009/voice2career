export const aptitudeKnowledge = [

  {
    id: "aptitude-percentage",
    subject: "Aptitude",
    keywords: ["percentage", "profit", "loss", "discount", "markup"],
    answer: `
==============================
PERCENTAGE, PROFIT & LOSS
==============================

PERCENTAGE FORMULA:
  Percentage = (Part / Whole) x 100
  Increase% = [(New - Old) / Old] x 100
  Decrease% = [(Old - New) / Old] x 100

SUCCESSIVE CHANGE:
  Two changes x% then y%:
  Net change = x + y + (xy/100)%
  Example: 20% increase then 20% decrease:
  Net = 20 + (-20) + (20x(-20)/100) = -4% (net loss)

PROFIT & LOSS:
  Profit = SP - CP
  Loss   = CP - SP
  Profit% = (Profit / CP) x 100
  SP = CP x (1 + Profit%/100)
  CP = SP / (1 + Profit%/100)

DISCOUNT:
  Discount = MP x (Discount%/100)
  SP = MP x (1 - Discount%/100)
  Profit% calculated on CP, Discount on MP

SUCCESSIVE DISCOUNTS d1% and d2%:
  Effective = d1 + d2 - (d1 x d2/100)%
  Example: 20% + 10% off = 28% effective discount
`
  },

  {
    id: "aptitude-time-work",
    subject: "Aptitude",
    keywords: ["time and work", "work", "efficiency", "pipes cisterns", "wages"],
    answer: `
==============================
TIME AND WORK
==============================

BASIC CONCEPT:
  If A completes work in n days → 1 day work = 1/n

COMBINED WORK:
  A (10 days) + B (15 days) together:
  1 day work = 1/10 + 1/15 = 5/30 = 1/6
  Together finish in 6 days

FORMULA:
  Time = (a x b) / (a + b)

LCM METHOD (Easier):
  LCM(10, 15) = 30 units total work
  A = 3 units/day, B = 2 units/day
  Together = 5 units/day → Time = 30/5 = 6 days

EFFICIENCY:
  A twice as efficient as B:
  If B does in n days, A does in n/2 days

PIPES & CISTERNS:
  Inlet pipe (fill): Positive work
  Outlet pipe (empty): Negative work

  Pipe A fills in 6 hrs, Pipe B empties in 9 hrs (both open):
  Net/hr = 1/6 - 1/9 = 1/18
  Tank fills in 18 hrs
`
  },

  {
    id: "aptitude-speed-distance",
    subject: "Aptitude",
    keywords: ["speed distance time", "relative speed", "train problems", "boat stream", "average speed"],
    answer: `
==============================
SPEED, DISTANCE & TIME
==============================

BASIC FORMULA:
  Speed = Distance / Time
  Distance = Speed x Time
  Time = Distance / Speed

UNIT CONVERSION:
  km/hr to m/s: multiply by 5/18
  m/s to km/hr: multiply by 18/5
  72 km/hr = 72 x 5/18 = 20 m/s

AVERAGE SPEED:
  Two equal distances at s1 and s2:
  Average = 2s1s2 / (s1 + s2)  (Harmonic Mean, NOT arithmetic!)

RELATIVE SPEED:
  Same direction: |s1 - s2|
  Opposite direction: s1 + s2

TRAIN PROBLEMS:
  Crosses a pole: Time = Train Length / Speed
  Crosses platform: Time = (Train Length + Platform) / Speed
  Two trains opposite: Time = (L1+L2) / (s1+s2)
  Two trains same dir: Time = (L1+L2) / (s1-s2)

BOAT & STREAM:
  u = boat speed (still water), v = current speed
  Downstream = u + v
  Upstream = u - v
  u = (Downstream + Upstream) / 2
  v = (Downstream - Upstream) / 2
`
  },

  {
    id: "aptitude-number-series",
    subject: "Aptitude",
    keywords: ["number series", "ratio proportion", "ages", "simple interest", "compound interest", "mixture", "alligation"],
    answer: `
==============================
NUMBER SERIES & MISC APTITUDE
==============================

SIMPLE INTEREST:
  SI = (P x R x T) / 100
  Amount = P + SI

COMPOUND INTEREST:
  A = P(1 + R/100)^T
  CI = A - P
  Half-yearly: A = P(1 + R/200)^(2T)
  SI vs CI: CI always > SI for T > 1
  Difference (2 years) = P(R/100)^2

RATIO & PROPORTION:
  a:b = c:d → a x d = b x c
  Dividing X in ratio a:b:
  First part = X x a/(a+b)

MIXTURE & ALLIGATION:
  Alligation rule: (Dearer - Mean) : (Mean - Cheaper)
  Example: Milk at Rs 20 + Water at Rs 0 → Rs 16/L
  Milk : Water = (16-0) : (20-16) = 16:4 = 4:1

AGES:
  Present age = x, setup equations from given conditions.
  "A is twice B" → a = 2b
  "10 years later" → a+10 = 2(b+10)

NUMBER SERIES PATTERNS:
  Arithmetic: +2, +4, +6 (increasing difference)
  Geometric:  x2, x2, x2
  Primes:     2, 3, 5, 7, 11, 13
  Squares:    1, 4, 9, 16, 25
  Fibonacci:  1, 1, 2, 3, 5, 8, 13
`
  },

  {
    id: "aptitude-logical",
    subject: "Aptitude",
    keywords: ["logical reasoning", "syllogism", "blood relations", "coding decoding", "direction sense", "seating arrangement"],
    answer: `
==============================
LOGICAL REASONING
==============================

SYLLOGISM:
  All A are B + All B are C → All A are C
  Some A are B + All B are C → Some A are C
  No A are B + All B are C → No A are C
  Draw Venn diagrams mentally.
  "Definitely true" vs "Possibly true" distinguish karo.

BLOOD RELATIONS:
  Father's father = Paternal grandfather
  Mother's brother = Maternal uncle
  Spouse's father = Father-in-law
  Tip: Family tree draw karo.

DIRECTION SENSE:
  Right turn: N→E→S→W→N
  Left turn:  N→W→S→E→N
  Pythagoras for diagonal distance.

CODING-DECODING:
  A=1, B=2... or Z=1, Y=2 (reverse)
  Letter shift by n positions.
  Mirror patterns.

SEATING ARRANGEMENT:
  Circular: Relative positions (clockwise/anticlockwise)
  Linear: Absolute or relative positions.
  Draw and fill given info, then deduce.

DATA SUFFICIENCY:
  (A) alone sufficient → Answer 1
  (B) alone sufficient → Answer 2
  Both together → Answer 3
  Neither sufficient → Answer 4
  Either alone → Answer 5
`
  }
];