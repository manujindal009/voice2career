export function getRandomQuestions<T>(questions: T[], count: number = 10): T[] {
  // Safety check
  if (!Array.isArray(questions)) return [];

  // Shuffle questions
  const shuffled = [...questions].sort(() => Math.random() - 0.5);

  // Return only required number
  return shuffled.slice(0, count);
}
