import { createFileRoute, Link, useParams } from "@tanstack/react-router";
import { useCallback, useEffect, useMemo, useState } from "react";

import {
  BLOCK_SIZE,
  MAX_BLOCKS,
  TEST_SECONDS,
  blockFor,
  computeResult,
  nextLevel,
  LEVEL_DESCRIPTION,
  type Answer,
} from "@/lib/adaptive";
import { LEVELS, type Lang, type Level, type Question } from "@/lib/questions";

export const Route = createFileRoute("/test/$lang")({
  head: () => ({
    meta: [
      { title: "Test paneli — CEFR daraja aniqlash testi" },
      {
        name: "description",
        content: "Adaptiv CEFR testi: grammatika, lug'at va o'qish savollariga vaqt ichida javob bering.",
      },
      { property: "og:title", content: "Test paneli — CEFR daraja aniqlash testi" },
      {
        property: "og:description",
        content: "Nemis yoki ingliz tili bo'yicha adaptiv daraja aniqlash testini yeching.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: TestPage,
});

const START_LEVEL: Level = "A2";

function TestPage() {
  const { lang: raw } = useParams({ from: "/test/$lang" });
  const lang: Lang = raw === "de" ? "de" : "en";
  const title = lang === "de" ? "Deutsch · Einstufungstest" : "English · Placement test";

  const [level, setLevel] = useState<Level>(START_LEVEL);
  const [used, setUsed] = useState<Set<string>>(() => new Set());
  const [block, setBlock] = useState<Question[]>(() => blockFor(lang, START_LEVEL, new Set()));
  const [blockCount, setBlockCount] = useState(1);
  const [i, setI] = useState(0);
  const [chosen, setChosen] = useState<number | null>(null);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [done, setDone] = useState(false);
  const [left, setLeft] = useState(TEST_SECONDS);

  useEffect(() => {
    if (done) return;
    const t = setInterval(() => {
      setLeft((s) => {
        if (s <= 1) {
          setDone(true);
          return 0;
        }
        return s - 1;
      });
    }, 1000);
    return () => clearInterval(t);
  }, [done]);

  const q = block[i];
  const totalAsked = answers.length;

  const submit = useCallback(() => {
    if (chosen === null || !q) return;
    const answer: Answer = { question: q, chosen, correct: chosen === q.correct };
    const all = [...answers, answer];
    setAnswers(all);
    setChosen(null);

    if (i + 1 < block.length) {
      setI(i + 1);
      return;
    }

    // Blok yakunlandi -> adaptiv qaror
    const blockAnswers = all.slice(-block.length);
    const score = blockAnswers.filter((a) => a.correct).length;
    const next = nextLevel(level, score);
    const nextUsed = new Set(used);
    block.forEach((bq) => nextUsed.add(bq.id));
    setUsed(nextUsed);

    if (!next || blockCount >= MAX_BLOCKS) {
      setDone(true);
      return;
    }
    const nb = blockFor(lang, next, nextUsed);
    if (nb.length === 0) {
      setDone(true);
      return;
    }
    setLevel(next);
    setBlock(nb);
    setBlockCount(blockCount + 1);
    setI(0);
  }, [answers, block, blockCount, chosen, i, lang, level, q, used]);

  const result = useMemo(() => (done ? computeResult(answers) : null), [done, answers]);

  if (done && result) return <ResultView result={result} answers={answers} title={title} />;

  if (!q) {
    return (
      <Shell title={title}>
        <p className="text-muted-foreground">Savollar topilmadi.</p>
      </Shell>
    );
  }

  const maxQuestions = BLOCK_SIZE * MAX_BLOCKS;
  const progress = Math.round((totalAsked / maxQuestions) * 100);

  return (
    <Shell title={title}>
      <div className="flex flex-wrap items-center justify-between gap-3 text-sm">
        <span className="rounded-full border border-border px-3 py-1">
          Joriy daraja: <strong className="text-primary">{level}</strong>
        </span>
        <span className="rounded-full border border-border px-3 py-1">{q.skill}</span>
        <span
          className={`rounded-full px-3 py-1 font-mono ${
            left < 60 ? "bg-destructive text-destructive-foreground" : "border border-border"
          }`}
        >
          {String(Math.floor(left / 60)).padStart(2, "0")}:{String(left % 60).padStart(2, "0")}
        </span>
      </div>

      <div className="mt-4 h-1.5 w-full overflow-hidden rounded-full bg-secondary">
        <div className="h-full bg-primary transition-all" style={{ width: `${progress}%` }} />
      </div>

      <p className="mt-6 text-xs uppercase tracking-widest text-muted-foreground">
        Savol {totalAsked + 1} / max {maxQuestions}
      </p>

      {q.passage && (
        <blockquote className="mt-4 rounded-xl border border-border bg-secondary/50 p-4 text-sm leading-relaxed">
          {q.passage}
        </blockquote>
      )}

      <h2 className="mt-4 text-2xl font-semibold leading-snug">{q.text}</h2>

      <div className="mt-6 grid gap-3">
        {q.options.map((opt, idx) => (
          <button
            key={opt}
            onClick={() => setChosen(idx)}
            className={`flex items-center gap-3 rounded-xl border p-4 text-left transition-colors ${
              chosen === idx
                ? "border-primary bg-primary/10"
                : "border-border bg-card hover:border-primary/50"
            }`}
          >
            <span className="flex size-7 shrink-0 items-center justify-center rounded-md bg-secondary font-mono text-xs">
              {"ABCD"[idx]}
            </span>
            <span>{opt}</span>
          </button>
        ))}
      </div>

      <div className="mt-8 flex items-center justify-between">
        <Link to="/" className="text-sm text-muted-foreground hover:text-foreground">
          ← Bekor qilish
        </Link>
        <button
          onClick={submit}
          disabled={chosen === null}
          className="rounded-lg bg-primary px-6 py-3 font-medium text-primary-foreground transition-opacity disabled:opacity-40"
        >
          Keyingi savol
        </button>
      </div>
    </Shell>
  );
}

function ResultView({
  result,
  answers,
  title,
}: {
  result: ReturnType<typeof computeResult>;
  answers: Answer[];
  title: string;
}) {
  return (
    <Shell title={title}>
      <div className="rounded-2xl border border-primary/40 bg-card p-8 text-center">
        <p className="text-sm uppercase tracking-widest text-muted-foreground">Sizning darajangiz</p>
        <p className="mt-2 text-6xl font-bold text-primary">{result.level}</p>
        <p className="mx-auto mt-3 max-w-md text-sm text-muted-foreground">
          {LEVEL_DESCRIPTION[result.level]}
        </p>
        <p className="mt-4 text-sm">
          To'g'ri javoblar: <strong>{result.correct}</strong> / {result.total} ({result.percent}%)
        </p>
        <div className="mt-6 flex justify-center gap-1">
          {LEVELS.map((l) => (
            <span
              key={l}
              className={`rounded-md px-3 py-1 text-xs font-medium ${
                l === result.level ? "bg-primary text-primary-foreground" : "bg-secondary"
              }`}
            >
              {l}
            </span>
          ))}
        </div>
      </div>

      <h3 className="mt-10 font-semibold">Ko'nikmalar bo'yicha tahlil</h3>
      <div className="mt-3 grid gap-3 sm:grid-cols-3">
        {result.bySkill.map((s) => (
          <div key={s.skill} className="rounded-xl border border-border bg-card p-4">
            <p className="text-sm text-muted-foreground">{s.skill}</p>
            <p className="mt-1 text-xl font-semibold">
              {s.total ? Math.round((s.correct / s.total) * 100) : 0}%
            </p>
            <p className="text-xs text-muted-foreground">
              {s.correct}/{s.total} to'g'ri
            </p>
          </div>
        ))}
      </div>

      <h3 className="mt-10 font-semibold">Javoblar tahlili</h3>
      <div className="mt-3 grid gap-3">
        {answers.map((a, idx) => (
          <div key={a.question.id} className="rounded-xl border border-border bg-card p-4">
            <p className="text-sm">
              <span className="font-mono text-xs text-muted-foreground">
                {idx + 1}. [{a.question.level} · {a.question.skill}]
              </span>{" "}
              {a.question.text}
            </p>
            <p className={`mt-2 text-sm ${a.correct ? "text-primary" : "text-destructive"}`}>
              {a.correct ? "✓ To'g'ri" : "✗ Xato"} — to'g'ri javob:{" "}
              <strong>{a.question.options[a.question.correct]}</strong>
            </p>
            <p className="mt-1 text-xs text-muted-foreground">{a.question.explanation}</p>
          </div>
        ))}
      </div>

      <div className="mt-8 flex gap-3">
        <button
          onClick={() => window.location.reload()}
          className="rounded-lg bg-primary px-5 py-3 font-medium text-primary-foreground"
        >
          Qaytadan ishlash
        </button>
        <Link
          to="/"
          className="rounded-lg border border-border px-5 py-3 font-medium hover:bg-secondary"
        >
          Bosh sahifa
        </Link>
      </div>
    </Shell>
  );
}

function Shell({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <main className="ink-grid min-h-screen bg-background text-foreground">
      <div className="mx-auto max-w-2xl px-6 py-12">
        <p className="mb-8 text-xs font-semibold uppercase tracking-[0.3em] text-primary">{title}</p>
        {children}
      </div>
    </main>
  );
}
