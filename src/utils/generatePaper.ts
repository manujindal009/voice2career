type Question = {
  id: number;
  section: string;
  difficulty: "easy" | "medium" | "hard";
  question: string;
  options: string[];
  answer: number;
};

const QUESTION_BANK: Question[] = [
  {
    id: 1,
    section: "Aptitude",
    difficulty: "easy",
    question: "If 5 apples cost ₹25, what is the cost of 1 apple?",
    options: ["₹3", "₹4", "₹5", "₹6"],
    answer: 2,
  },
  {
    id: 2,
    section: "Aptitude",
    difficulty: "easy",
    question: "What is 20% of 200?",
    options: ["20", "30", "40", "50"],
    answer: 2,
  },
  {
    id: 3,
    section: "Aptitude",
    difficulty: "medium",
    question: "A train travels 60 km in 1.5 hours. What is its speed?",
    options: ["30 km/h", "40 km/h", "45 km/h", "60 km/h"],
    answer: 2,
  },
  {
    id: 4,
    section: "DSA",
    difficulty: "easy",
    question: "Which data structure works on FIFO?",
    options: ["Stack", "Queue", "Tree", "Graph"],
    answer: 1,
  },
  {
    id: 5,
    section: "DSA",
    difficulty: "medium",
    question: "Time complexity of Binary Search?",
    options: ["O(n)", "O(log n)", "O(n log n)", "O(1)"],
    answer: 1,
  },
];

function shuffle<T>(array: T[]) {
  return [...array].sort(() => Math.random() - 0.5);
}

export function generatePaper(testId: string) {
  let easyCount = 0;
  let mediumCount = 0;
  let hardCount = 0;

  if (testId === "easy-medium") {
    easyCount = 3;
    mediumCount = 2;
  } else if (testId === "medium") {
    mediumCount = 3;
    hardCount = 2;
  } else if (testId === "hard") {
    mediumCount = 2;
    hardCount = 3;
  }

  const easy = shuffle(
    QUESTION_BANK.filter(q => q.difficulty === "easy")
  ).slice(0, easyCount);

  const medium = shuffle(
    QUESTION_BANK.filter(q => q.difficulty === "medium")
  ).slice(0, mediumCount);

  const hard = shuffle(
    QUESTION_BANK.filter(q => q.difficulty === "hard")
  ).slice(0, hardCount);

  return shuffle([...easy, ...medium, ...hard]);
}
