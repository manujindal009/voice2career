export function getRandomQuestions(
  mainQuestions: string[],
  count: number
) {
  const shuffled = [...mainQuestions].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}
