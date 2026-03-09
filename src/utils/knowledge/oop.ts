export const oopKnowledge = [

  {
    id: "oop-definition",
    subject: "OOP",
    keywords: ["oop", "object oriented programming", "oops concepts", "what is oop"],
    answer: `
==============================
OBJECT ORIENTED PROGRAMMING
==============================

DEFINITION:
OOP ek programming paradigm hai jahan software design
real-world objects ke concept pe based hoti hai.
Object = Data (attributes) + Behavior (methods)

WHY OOP?
  Procedural Problems:    OOP Solutions:
  Code duplication    →   Reusability (Inheritance)
  Hard to maintain    →   Modularity (Classes)
  Global state        →   Encapsulation
  No real-world model →   Object modeling

KEY TERMS:
  Class:  Blueprint/template (e.g., Car class)
  Object: Instance of class (e.g., myCar = new Car())
  Method: Function inside class
  Attribute: Variable inside class
  Constructor: Object initialize karne wala special method
  Destructor: Object destroy hone pe called

4 PILLARS:
  1. Encapsulation  → Data hiding
  2. Abstraction    → Complexity hiding
  3. Inheritance    → Code reuse
  4. Polymorphism   → Many forms
`
  },

  {
    id: "oop-encapsulation",
    subject: "OOP",
    keywords: ["encapsulation", "data hiding", "access modifiers", "getters", "setters", "private", "public", "protected"],
    answer: `
==============================
ENCAPSULATION
==============================

DEFINITION:
Data aur methods ko ek unit (class) mein bind karna aur
data ko direct access se protect karna.

HOW:
  Private variables + Public getters/setters

ACCESS MODIFIERS:
  public:    Everywhere accessible
  private:   Only within same class
  protected: Same class + subclasses
  default:   Same package (Java)

EXAMPLE:
  class BankAccount {
    private double balance;

    public void deposit(double amount) {
      if (amount > 0) balance += amount;
    }

    public double getBalance() { return balance; }
  }

WHY IMPORTANT:
  Data Security: Invalid values prevent karta hai
  Controlled Access: Validation possible
  Flexibility: Internal implementation change karo,
               external interface same rahega
  Maintainability: Changes isolated hoti hain

INTERVIEW TIP:
  "Encapsulation provides data hiding."
  Real example: ATM machine — balance is hidden,
  only deposit/withdraw methods exposed.
`
  },

  {
    id: "oop-abstraction",
    subject: "OOP",
    keywords: ["abstraction", "abstract class", "interface", "abstract method", "abstract vs interface"],
    answer: `
==============================
ABSTRACTION
==============================

DEFINITION:
Implementation details hide karo, sirf essential features expose karo.
"What it does" show karo, "How it does" hide karo.

REAL EXAMPLES:
  Car: Accelerate karo — engine internals hidden.
  Phone: Call karo — circuit level hidden.
  ATM: Withdraw karo — banking system internals hidden.

ABSTRACT CLASS:
  → abstract keyword
  → 0-100% abstraction
  → Constructor ho sakta hai
  → Abstract + concrete methods dono
  → Single inheritance only

  abstract class Animal {
    abstract void makeSound();  // must implement
    void breathe() { ... }     // concrete — inherited
  }

INTERFACE:
  → 100% abstraction (Java 8 se default methods bhi)
  → No constructor
  → Multiple inheritance possible
  → "Can-do" relationship

ABSTRACT CLASS vs INTERFACE:
  Feature           Abstract Class   Interface
  Abstraction       Partial          Full (default)
  Constructor       Yes              No
  Inheritance       Single           Multiple
  Relationship      "is-a"           "can-do"

When to use Abstract Class?
  Related classes share common code.

When to use Interface?
  Unrelated classes share behavior.
  Example: Shape (abstract) vs Serializable (interface)
`
  },

  {
    id: "oop-inheritance",
    subject: "OOP",
    keywords: ["inheritance", "single inheritance", "multiple inheritance", "multilevel", "hierarchical", "diamond problem", "super", "extends"],
    answer: `
==============================
INHERITANCE
==============================

DEFINITION:
Child class parent class ki properties aur methods inherit karta hai.
Code reuse + hierarchical classification.

"IS-A" relationship:
  Dog IS-A Animal
  Car IS-A Vehicle

TYPES:
  Single:       A → B
  Multilevel:   A → B → C
  Hierarchical: A → B, A → C
  Multiple:     A + B → C (C++ supports, Java nahi)

DIAMOND PROBLEM:
  A defines method m()
  B extends A, overrides m()
  C extends A, overrides m()
  D extends B and C → Which m() to call? AMBIGUOUS!

  Java Solution: Interfaces use karo
  C++ Solution: Virtual inheritance

IMPORTANT KEYWORDS:
  extends:  Class inherit karna (Java)
  super():  Parent constructor/method call karna
  override: Parent method ko redefine karna
  final:    Inheritance/overriding rok do

METHOD OVERRIDING RULES:
  → Same name, same parameters
  → Return type same (or covariant)
  → Access modifier same or more permissive
  → Cannot override final/static/private methods

CONSTRUCTOR CHAINING:
  Child constructor implicitly super() call karta hai.
  Parent constructor pehle execute hota hai, then child.
`
  },

  {
    id: "oop-polymorphism",
    subject: "OOP",
    keywords: ["polymorphism", "method overloading", "method overriding", "compile time", "runtime", "virtual function", "dynamic binding"],
    answer: `
==============================
POLYMORPHISM
==============================

DEFINITION:
"Many forms" — same interface, different implementations.

TYPES:

1. COMPILE-TIME (Static Binding):
   Method Overloading:
   → Same class, same name, DIFFERENT parameters
   → Resolved at compile time

   void print(int x) { }
   void print(String s) { }
   void print(int x, int y) { }

   NOTE: Return type se overloading nahi hoti!

2. RUNTIME (Dynamic Binding):
   Method Overriding:
   → Child class parent ka method redefine kare
   → Same signature
   → Resolved at RUNTIME (late binding)

   Animal a = new Dog();
   a.makeSound();  // Dog's makeSound() called → Runtime Poly

VIRTUAL FUNCTION (C++):
  → virtual keyword lagao parent mein
  → Without virtual → parent's method called (static binding)
  → With virtual → child's method called (dynamic binding)
  → Pure virtual: virtual void func() = 0; (must override)

VTABLE (Virtual Table):
  → Har class ka ek vtable hota hai
  → Function pointers store karta hai
  → Runtime pe correct function lookup hota hai

OBJECT SLICING:
  Dog d; Animal a = d; → Dog's extra data "sliced" off
  Happens when derived object assigned to base by value.
  Fix: Pointers/references use karo.
`
  },

  {
    id: "oop-advanced",
    subject: "OOP",
    keywords: ["solid principles", "composition", "aggregation", "association", "coupling", "cohesion", "design principles", "solid"],
    answer: `
==============================
ADVANCED OOP — SOLID & RELATIONSHIPS
==============================

SOLID PRINCIPLES:

S — Single Responsibility:
  Ek class ka ek hi kaam hona chahiye.
  Bad: UserService handles login + email + DB
  Good: UserService, EmailService, UserRepository (separate)

O — Open/Closed:
  Extension ke liye open, modification ke liye closed.
  New feature? New class add karo, existing mat badlo.

L — Liskov Substitution:
  Child class parent ki jagah use ho sake without issues.

I — Interface Segregation:
  Ek bada interface mat banao; small client-specific interfaces.

D — Dependency Inversion:
  Abstraction pe depend karo, concrete classes pe nahi.
  → Dependency Injection se achieve karo.

RELATIONSHIPS:

Association: Objects ek dusre ko use karte hain (no ownership)
Aggregation ("HAS-A", weak): Department HAS-A Teacher
  → Department deletes → Teacher still exists
Composition ("HAS-A", strong): House HAS-A Room
  → House deletes → Rooms bhi delete
Inheritance ("IS-A"): Dog IS-A Animal

COMPOSITION vs INHERITANCE:
  Favor Composition over Inheritance!
  Why: Inheritance = tight coupling, hard to change
       Composition = flexible, testable, no diamond problem

COUPLING & COHESION:
  Low Coupling:   Classes ek dusre pe kam depend karein (GOOD)
  High Cohesion:  Class ke methods closely related hon (GOOD)
`
  },

  {
    id: "oop-constructors",
    subject: "OOP",
    keywords: ["constructor", "destructor", "copy constructor", "deep copy", "shallow copy", "rule of three", "static", "singleton"],
    answer: `
==============================
CONSTRUCTORS, DESTRUCTORS & MEMORY
==============================

CONSTRUCTOR TYPES:
  Default:       No parameters — MyClass() {}
  Parameterized: With params — MyClass(int x) {}
  Copy:          Another object se copy — MyClass(const MyClass& obj)

DESTRUCTOR (C++):
  → Object destroy hone pe called
  → ~ClassName()
  → Virtual destructor karo agar inheritance use karo!

WHY VIRTUAL DESTRUCTOR?
  Animal* a = new Dog();
  delete a;
  → Without virtual → only Animal destructor called
  → Dog's destructor NOT called → MEMORY LEAK!
  Fix: virtual ~Animal() { }

SHALLOW COPY vs DEEP COPY:
  Shallow: References copy hote hain (same memory point)
           Ek change → dono affect
  Deep:    Actual data copy hoti hai (new memory)
           Independent copies

RULE OF 3 (C++):
  Agar inme se kuch define karo → teeno define karo:
  1. Destructor
  2. Copy Constructor
  3. Copy Assignment Operator

RULE OF 5 (C++11):
  Rule of 3 + Move Constructor + Move Assignment Operator

STATIC MEMBERS:
  → Class ke saare objects ke liye shared
  → Object ke bina access: ClassName::staticVar

SINGLETON PATTERN:
  → Sirf ek object exist kare class ka
  → Private constructor + Static instance
  → Use: Logger, Config, Database Connection
`
  },

  {
    id: "oop-interview",
    subject: "OOP",
    keywords: ["oop interview", "oops interview questions", "object oriented interview"],
    answer: `
==============================
OOP INTERVIEW Q&A
==============================

Q: Can constructor be virtual? (C++)
A: NO. Virtual functions runtime binding ke liye hain.
   Constructor object create karta hai — object exist karne se
   pehle vtable nahi hoti.

Q: Why destructor should be virtual?
A: Agar base class pointer se derived object delete karo
   aur destructor virtual nahi hai → derived destructor call
   nahi hoga → Memory leak.
   Fix: virtual ~BaseClass() { }

Q: Abstract class vs Interface?
A: Abstract Class: Partial implementation, single inheritance,
                   constructors allowed, "is-a"
   Interface:      Full abstraction, multiple inheritance,
                   no constructors, "can-do"

Q: What is object slicing?
A: Dog d; Animal a = d; → Dog-specific data lost.
   Fix: Pointers/references use karo.

Q: Why use composition over inheritance?
A: Inheritance = tight coupling, hard to test, diamond problem.
   Composition = flexible, easy to test, no diamond problem.

Q: Method overloading vs overriding?
A: Overloading: Same class, same name, different params (compile-time)
   Overriding: Child redefines parent's method (runtime)

Q: Can we override static methods?
A: NO. Static methods class se belong karte hain, object se nahi.
   Same static method in child = METHOD HIDING, overriding nahi.

Q: What is covariant return type?
A: Override mein return type parent ka subtype ho sakta hai.
   Parent: Animal* clone(); Child: Dog* clone(); — valid

Q: this vs super?
A: this: Current object reference
   super: Parent class reference (constructor/method access)
`
  }
];