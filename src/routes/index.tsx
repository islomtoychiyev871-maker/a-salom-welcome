import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Einstufungstest — nemis va ingliz tili darajangizni aniqlang" },
      {
        name: "description",
        content:
          "CEFR (A1–C1) bo'yicha adaptiv onlayn daraja aniqlash testi: grammatika, lug'at va o'qish tushunish bo'limlari bilan.",
      },
      { property: "og:title", content: "Einstufungstest — til darajangizni aniqlang" },
      {
        property: "og:description",
        content: "15 daqiqada nemis yoki ingliz tilidagi CEFR darajangizni bilib oling.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Home,
});

const STEPS = [
  { n: "01", t: "Tilni tanlang", d: "Nemis yoki ingliz tili." },
  { n: "02", t: "Adaptiv test", d: "Javoblaringizga qarab savollar qiyinlashadi yoki soddalashadi." },
  { n: "03", t: "Natija va tahlil", d: "CEFR darajangiz va ko'nikmalar bo'yicha taqsimot." },
];

function Home() {
  return (
    <main className="ink-grid min-h-screen bg-background text-foreground">
      <div className="mx-auto max-w-5xl px-6 py-20">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">
          Einstufungstest · Placement test
        </p>
        <h1 className="mt-5 text-4xl font-bold leading-tight tracking-tight sm:text-6xl">
          Til darajangizni 15 daqiqada aniqlang
        </h1>
        <p className="mt-5 max-w-2xl text-lg text-muted-foreground">
          Adaptiv test grammatika, lug'at va o'qish tushunish bo'yicha savollar beradi va
          natijada CEFR darajangizni (A1–C1) ko'rsatadi.
        </p>

        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          <LangCard
            to="de"
            flag="🇩🇪"
            title="Deutsch"
            sub="Nemis tili · Grammatik, Wortschatz, Lesen"
          />
          <LangCard
            to="en"
            flag="🇬🇧"
            title="English"
            sub="Ingliz tili · Grammar, Vocabulary, Reading"
          />
        </div>

        <div className="mt-16 grid gap-6 sm:grid-cols-3">
          {STEPS.map((s) => (
            <div key={s.n} className="rounded-xl border border-border bg-card p-6">
              <span className="font-mono text-sm text-primary">{s.n}</span>
              <h3 className="mt-2 font-semibold">{s.t}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{s.d}</p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}

function LangCard({
  to,
  flag,
  title,
  sub,
}: {
  to: string;
  flag: string;
  title: string;
  sub: string;
}) {
  return (
    <Link
      to="/test/$lang"
      params={{ lang: to }}
      className="group flex items-center gap-4 rounded-2xl border border-border bg-card p-6 transition-colors hover:border-primary"
    >
      <span className="text-4xl">{flag}</span>
      <span>
        <span className="block text-xl font-semibold group-hover:text-primary">{title}</span>
        <span className="block text-sm text-muted-foreground">{sub}</span>
      </span>
      <span className="ml-auto text-primary opacity-0 transition-opacity group-hover:opacity-100">
        →
      </span>
    </Link>
  );
}
