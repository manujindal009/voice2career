export type Question = {
  id: string;
  section: "aptitude" | "logical" | "cs" | "dsa";
  difficulty: "easy" | "medium" | "hard";
  question: string;
  options: string[];
  answer: number;
};

export const QUESTION_POOL: Question[] = [
  {
    id: "apt-e-1",
    section: "aptitude",
    difficulty: "easy",
    question: "If CP = 200 and SP = 240, profit % is?",
    options: ["10%", "15%", "20%", "25%"],
    answer: 2,
  },
  {
    id: "dsa-m-1",
    section: "dsa",
    difficulty: "medium",
    question: "Time complexity of binary search?",
    options: ["O(n)", "O(log n)", "O(n log n)", "O(1)"],
    answer: 1,
  },
  {
    id: "cs-h-1",
    section: "cs",
    difficulty: "hard",
    question: "Which deadlock condition is NOT required?",
    options: [
      "Mutual exclusion",
      "Hold and wait",
      "Preemption",
      "Circular wait",
    ],
    answer: 2,
  },
];
