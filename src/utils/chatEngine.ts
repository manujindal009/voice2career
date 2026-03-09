import { knowledgeBase } from "./knowledge";

// ─── Normalize & Tokenize ────────────────────────────────────────────────────

function normalize(text: string): string {
  return text.toLowerCase().trim().replace(/[^\w\s]/gi, "");
}

function tokenize(text: string): string[] {
  return normalize(text).split(/\s+/).filter((w) => w.length > 0);
}

const STOP_WORDS = new Set([
  "what","is","are","the","a","an","of","in","on","how","why","when",
  "where","which","who","do","does","can","could","tell","me","about",
  "explain","define","difference","between","and","vs","or","to","for",
  "its","it","this","that","with","give","some","any","please","i","want",
  "know","need","help","understand","describe","show","list",
]);

function getMeaningfulTokens(tokens: string[]): string[] {
  const filtered = tokens.filter((t) => t.length > 1 && !STOP_WORDS.has(t));
  return filtered.length > 0 ? filtered : tokens;
}

// ─── Score a keyword against input tokens ────────────────────────────────────

function scoreKeyword(inputTokens: string[], keyword: string): number {
  const kwNorm = normalize(keyword);
  const kwTokens = tokenize(keyword);
  const inputFull = inputTokens.join(" ");

  let score = 0;

  if (inputFull === kwNorm)          score += 20;
  if (inputFull.includes(kwNorm))    score += 12;
  if (kwNorm.includes(inputFull))    score += 8;

  const allMatch = kwTokens.every((kt) =>
    inputTokens.some(
      (it) => it === kt || it.includes(kt) || kt.includes(it)
    )
  );
  if (allMatch && kwTokens.length > 0) score += 10;

  for (const kt of kwTokens) {
    for (const it of inputTokens) {
      if (it === kt)                             score += 6;
      else if (it.length >= 3 && kt.startsWith(it)) score += 3;
      else if (kt.length >= 3 && it.startsWith(kt)) score += 3;
      else if (it.length >= 4 && kt.includes(it))   score += 2;
      else if (kt.length >= 4 && it.includes(kt))   score += 2;
    }
  }

  return score;
}

// ─── Split answer into named sections ────────────────────────────────────────

interface Section {
  title: string;
  body: string;
}

function splitIntoSections(answer: string): Section[] {
  const lines = answer.split("\n");
  const sections: Section[] = [];
  let currentTitle = "";
  let currentBody: string[] = [];

  const isSectionHeader = (line: string): boolean => {
    const trimmed = line.trim();
    if (!trimmed) return false;
    // ALL CAPS line (header), or --- separator followed by text
    const isAllCaps = trimmed === trimmed.toUpperCase() && /[A-Z]/.test(trimmed);
    const isDivider = /^[-=]{4,}$/.test(trimmed);
    return isAllCaps || isDivider;
  };

  for (const line of lines) {
    const trimmed = line.trim();

    if (isSectionHeader(trimmed)) {
      // Save previous section
      if (currentBody.join("").trim()) {
        sections.push({ title: currentTitle, body: currentBody.join("\n") });
      }
      currentTitle = trimmed.replace(/^[-=]+$/, ""); // clear pure dividers
      currentBody = [];
    } else {
      currentBody.push(line);
    }
  }

  // Last section
  if (currentBody.join("").trim()) {
    sections.push({ title: currentTitle, body: currentBody.join("\n") });
  }

  return sections.filter((s) => s.body.trim().length > 20);
}

// ─── Find most relevant section from an answer ───────────────────────────────

function extractBestSection(answer: string, inputTokens: string[]): string {
  const sections = splitIntoSections(answer);

  // If only 1 section or very short answer — return full
  if (sections.length <= 1) return answer.trim();

  let bestSection: Section | null = null;
  let bestScore = 0;

  for (const section of sections) {
    const combined = normalize(section.title + " " + section.body);
    const sectionTokens = tokenize(combined);

    let score = 0;
    for (const it of inputTokens) {
      for (const st of sectionTokens) {
        if (it === st)                              score += 5;
        else if (it.length >= 3 && st.includes(it)) score += 3;
        else if (st.length >= 3 && it.includes(st)) score += 2;
      }
    }

    // Bonus if section TITLE directly contains the query
    if (normalize(section.title).includes(inputTokens.join(" "))) score += 15;
    for (const it of inputTokens) {
      if (normalize(section.title).includes(it)) score += 8;
    }

    if (score > bestScore) {
      bestScore = score;
      bestSection = section;
    }
  }

  // Only extract section if it's a confident match (score > 8)
  // Otherwise return full answer so user gets complete context
  if (bestSection && bestScore > 8) {
    const header = bestSection.title
      ? `${bestSection.title}\n${"─".repeat(bestSection.title.length)}\n`
      : "";
    return (header + bestSection.body).trim();
  }

  return answer.trim();
}

// ─── Main export ─────────────────────────────────────────────────────────────

export function getBotResponse(question: string): string {
  const rawTokens = tokenize(question);
  const inputTokens = getMeaningfulTokens(rawTokens);

  let bestMatch = null;
  let highestScore = 0;

  for (const item of knowledgeBase) {
    let totalScore = 0;

    for (const keyword of item.keywords) {
      totalScore += scoreKeyword(inputTokens, keyword);
    }

    // Bonus: subject name matches input
    if (item.subject) {
      const subNorm = normalize(item.subject);
      if (inputTokens.some((t) => subNorm.includes(t) || t.includes(subNorm))) {
        totalScore += 2;
      }
    }

    if (totalScore > highestScore) {
      highestScore = totalScore;
      bestMatch = item;
    }
  }

  if (bestMatch && highestScore >= 6) {
    // Extract only the relevant section from the matched entry
    return extractBestSection(bestMatch.answer, inputTokens);
  }

  return `I don't have specific information on "${question}" yet.\n\nTry asking about: DBMS, OS, CN, OOP, DSA, System Design, Cloud, Aptitude, HR, or English.\n\nExample: "What is BFS?", "Explain deadlock", "ACID properties"`;
}