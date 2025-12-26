export function getFeedback(attempted: number, total: number): string {
  const percent = (attempted / total) * 100;

  if (percent >= 90) return "Excellent attempt! Strong understanding 🚀";
  if (percent >= 70) return "Good attempt, keep practicing 👍";
  if (percent >= 40) return "Average attempt, needs improvement ⚠️";
  return "Very few answers attempted. Practice more ❌";
}
