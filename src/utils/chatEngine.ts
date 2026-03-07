import { knowledgeBase } from "./knowledgeBase";

function normalize(text: string) {
  return text.toLowerCase().replace(/[^\w\s]/gi, "");
}

export function getBotResponse(question: string): string {
  const input = normalize(question);

  let bestMatch = null;
  let highestScore = 0;

  for (const item of knowledgeBase) {
    let score = 0;

    for (const keyword of item.keywords) {
      const normalizedKeyword = normalize(keyword);

      // exact match gets high score
      if (input === normalizedKeyword) {
        score += 10;
      }

      // partial match
      if (input.includes(normalizedKeyword)) {
        score += 5;
      }

      // reverse partial match
      if (normalizedKeyword.includes(input)) {
        score += 3;
      }
    }

    if (score > highestScore) {
      highestScore = score;
      bestMatch = item;
    }
  }

  if (bestMatch && highestScore > 0) {
    return bestMatch.answer;
  }

  return `
I currently don't have sufficient information on this topic.

For accurate guidance, please approach your mentors or subject experts.
`;
}