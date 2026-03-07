type Answer = { question: string; answer: string };

export function calculateInterviewScore(answers: Answer[]) {
  if (!answers || answers.length === 0) {
    return zeroScore();
  }

  let contentScore = 0;
  let grammarPenalty = 0;
  let repetitionPenalty = 0;
  let totalWords = 0;

  answers.forEach(a => {
    const text = a.answer.toLowerCase().trim();
    const words = text.split(/\s+/).filter(Boolean);
    totalWords += words.length;

    // ---------- CONTENT ----------
    let score = 20;
    if (words.length > 15) score += 10;
    if (words.length > 30) score += 15;
    if (words.length > 60) score += 20;

    if (/[.!?]/.test(text)) score += 10;
    if (/\b(because|since|therefore|while|when)\b/.test(text)) score += 10;
    if (/\b(managed|built|handled|improved|created|led)\b/.test(text))
      score += 15;

    contentScore += Math.min(score, 90);

    // ---------- REPETITION ----------
    const freq: Record<string, number> = {};
    words.forEach(w => (freq[w] = (freq[w] || 0) + 1));
    const maxRepeat = Math.max(...Object.values(freq));
    const ratio = maxRepeat / words.length;

    if (ratio > 0.35) repetitionPenalty += 30;
    else if (ratio > 0.25) repetitionPenalty += 20;
    else if (ratio > 0.15) repetitionPenalty += 10;

    // ---------- GRAMMAR ----------
    if (words.length < 6) grammarPenalty += 15;
    if (!/[.!?]/.test(text)) grammarPenalty += 10;
    if (!/\b(is|was|are|were|have|has|did|do)\b/.test(text))
      grammarPenalty += 10;
  });

  const attempts = answers.length;
  contentScore /= attempts;
  grammarPenalty /= attempts;
  repetitionPenalty /= attempts;

  let raw = contentScore - grammarPenalty - repetitionPenalty;
  raw = Math.max(0, raw);

  return {
    quality: Math.round(contentScore),
    communication: Math.max(0, 100 - repetitionPenalty),
    confidence: Math.max(0, 100 - grammarPenalty),
    overall: Math.round(raw),
  };
}

export function calculateFinalInterviewScore(
  answers: Answer[],
  totalQuestions: number
) {
  if (answers.length === 0) return zeroScore();

  const base = calculateInterviewScore(answers);

  const attemptRatio = answers.length / totalQuestions;

  const totalWords = answers.reduce(
    (a, b) => a + b.answer.split(/\s+/).length,
    0
  );

  let effortMultiplier = 1;
  if (totalWords < 25) effortMultiplier = 0.3;
  else if (totalWords < 60) effortMultiplier = 0.5;
  else if (totalWords < 120) effortMultiplier = 0.75;

  const overall = Math.round(
    base.overall * attemptRatio * effortMultiplier
  );
// 🔥 ADD: penalty based system (DO NOT REMOVE EXISTING CODE)

let attemptPenalty = 0;
if (attemptRatio < 0.3) attemptPenalty = 40;
else if (attemptRatio < 0.5) attemptPenalty = 25;
else if (attemptRatio < 0.7) attemptPenalty = 10;

let effortPenalty = 0;
if (effortMultiplier === 0.3) effortPenalty = 20;
else if (effortMultiplier === 0.5) effortPenalty = 10;

// 🔥 override overall safely
const fixedOverall = Math.max(
  0,
  Math.round(base.overall - attemptPenalty - effortPenalty)
);

  return {
    quality: base.quality,
    communication: base.communication,
    confidence: base.confidence,
    overall: Math.min(100, fixedOverall),
  };
}

function zeroScore() {
  return {
    quality: 0,
    communication: 0,
    confidence: 0,
    overall: 0,
  };
}
