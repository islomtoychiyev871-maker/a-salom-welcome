import { LEVELS, questionsFor, type Lang, type Level, type Question } from "./questions";

export interface Answer {
  question: Question;
  chosen: number;
  correct: boolean;
}

export const BLOCK_SIZE = 5;
export const MAX_BLOCKS = 4;
export const TEST_SECONDS = 15 * 60;

const idx = (l: Level) => LEVELS.indexOf(l);

/** Adaptiv mantiq: har blokdan keyin natijaga qarab daraja ko'tariladi/tushadi. */
export function nextLevel(current: Level, blockScore: number): Level | null {
  const ratio = blockScore / BLOCK_SIZE;
  const i = idx(current);
  if (ratio >= 0.8) return i < LEVELS.length - 1 ? LEVELS[i + 1]! : null;
  if (ratio <= 0.4) return i > 0 ? LEVELS[i - 1]! : null;
  return null; // daraja barqarorlashdi -> testni yakunlash
}

export function blockFor(lang: Lang, level: Level, used: Set<string>): Question[] {
  return questionsFor(lang, level)
    .filter((q) => !used.has(q.id))
    .slice(0, BLOCK_SIZE);
}

export interface Result {
  level: Level;
  percent: number;
  correct: number;
  total: number;
  bySkill: { skill: string; correct: number; total: number }[];
}

export function computeResult(answers: Answer[]): Result {
  const total = answers.length;
  const correct = answers.filter((a) => a.correct).length;
  const percent = total ? Math.round((correct / total) * 100) : 0;

  // Daraja: to'g'ri javob berilgan eng yuqori daraja (kamida 60% shu darajada)
  let best: Level = "A1";
  for (const l of LEVELS) {
    const at = answers.filter((a) => a.question.level === l);
    if (at.length && at.filter((a) => a.correct).length / at.length >= 0.6) best = l;
  }

  const skills = ["Grammatik", "Vocabulary", "Reading"];
  const bySkill = skills.map((skill) => {
    const at = answers.filter((a) => a.question.skill === skill);
    return { skill, correct: at.filter((a) => a.correct).length, total: at.length };
  });

  return { level: best, percent, correct, total, bySkill };
}

export const LEVEL_DESCRIPTION: Record<Level, string> = {
  A1: "Boshlang'ich: oddiy iboralar, tanishuv, kundalik savollar.",
  A2: "Elementar: kundalik mavzularda sodda muloqot qila olasiz.",
  B1: "O'rta: tanish mavzularda erkin gapirasiz, matnlarni tushunasiz.",
  B2: "O'rta-yuqori: murakkab matnlar va bahslarda qatnasha olasiz.",
  C1: "Yuqori: nozik ma'nolarni ilg'aysiz, akademik tilni erkin ishlatasiz.",
};
