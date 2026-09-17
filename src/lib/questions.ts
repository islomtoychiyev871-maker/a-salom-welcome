export type Level = "A1" | "A2" | "B1" | "B2" | "C1";
export type Skill = "Grammatik" | "Vocabulary" | "Reading";
export type Lang = "de" | "en";

export interface Question {
  id: string;
  level: Level;
  skill: Skill;
  text: string;
  passage?: string;
  options: [string, string, string, string];
  correct: 0 | 1 | 2 | 3;
  explanation: string;
}

export const LEVELS: Level[] = ["A1", "A2", "B1", "B2", "C1"];

const de: Question[] = [
  { id: "de-a1-1", level: "A1", skill: "Grammatik", text: "___ heiße Anna.", options: ["Ich", "Du", "Er", "Wir"], correct: 0, explanation: "«heiße» — 1-shaxs birlik shakli, shuning uchun «ich»." },
  { id: "de-a1-2", level: "A1", skill: "Grammatik", text: "Das ist ___ Buch.", options: ["ein", "eine", "einen", "einem"], correct: 0, explanation: "«Buch» — neutrum (das), nominativda noaniq artikl «ein»." },
  { id: "de-a1-3", level: "A1", skill: "Vocabulary", text: "Wie viel Uhr ist es? — Es ist halb ___ (7:30).", options: ["sieben", "acht", "sechs", "neun"], correct: 1, explanation: "Nemischa «halb acht» = 7:30, ya'ni keyingi soatga yarim qolgan." },
  { id: "de-a1-4", level: "A1", skill: "Vocabulary", text: "Man kauft Brot in der ___.", options: ["Apotheke", "Bäckerei", "Bank", "Bibliothek"], correct: 1, explanation: "Bäckerei — non do'koni." },
  { id: "de-a1-5", level: "A1", skill: "Reading", passage: "Hallo! Ich bin Tom. Ich komme aus Berlin und wohne jetzt in Wien. Ich bin Student.", text: "Wo wohnt Tom jetzt?", options: ["In Berlin", "In Wien", "In München", "In Zürich"], correct: 1, explanation: "Matnda «wohne jetzt in Wien» deyilgan." },

  { id: "de-a2-1", level: "A2", skill: "Grammatik", text: "Gestern ___ ich ins Kino gegangen.", options: ["habe", "bin", "war", "werde"], correct: 1, explanation: "«gehen» harakat fe'li — Perfektda «sein» yordamchi fe'li bilan keladi." },
  { id: "de-a2-2", level: "A2", skill: "Grammatik", text: "Ich helfe ___ Mann.", options: ["der", "den", "dem", "des"], correct: 2, explanation: "«helfen» Dativ talab qiladi: dem Mann." },
  { id: "de-a2-3", level: "A2", skill: "Grammatik", text: "Wir fahren ___ Bus zur Arbeit.", options: ["mit dem", "mit der", "auf dem", "in den"], correct: 0, explanation: "Transport vositasi bilan «mit + Dativ»: mit dem Bus." },
  { id: "de-a2-4", level: "A2", skill: "Vocabulary", text: "Sie ist krank, deshalb geht sie zum ___.", options: ["Lehrer", "Arzt", "Kellner", "Verkäufer"], correct: 1, explanation: "Kasal odam shifokorga (Arzt) boradi." },
  { id: "de-a2-5", level: "A2", skill: "Reading", passage: "Das Museum ist von Dienstag bis Sonntag von 10 bis 18 Uhr geöffnet. Montags ist es geschlossen. Der Eintritt kostet 8 Euro, für Studenten 5 Euro.", text: "Was ist richtig?", options: ["Montags kann man das Museum besuchen.", "Studenten zahlen weniger.", "Das Museum öffnet um 8 Uhr.", "Der Eintritt ist frei."], correct: 1, explanation: "Talabalar uchun 5 evro, ya'ni arzonroq." },

  { id: "de-b1-1", level: "B1", skill: "Grammatik", text: "Wenn ich mehr Zeit ___, würde ich Klavier lernen.", options: ["habe", "hätte", "hatte", "haben"], correct: 1, explanation: "Irreal shart — Konjunktiv II: «hätte»." },
  { id: "de-b1-2", level: "B1", skill: "Grammatik", text: "Der Brief ___ gestern geschrieben.", options: ["wird", "wurde", "hat", "ist worden"], correct: 1, explanation: "O'tgan zamon passivi: «wurde ... geschrieben»." },
  { id: "de-b1-3", level: "B1", skill: "Grammatik", text: "Ich freue mich ___ die Ferien.", options: ["über", "auf", "für", "an"], correct: 1, explanation: "«sich freuen auf» — kelajakdagi voqeani kutish." },
  { id: "de-b1-4", level: "B1", skill: "Vocabulary", text: "Er hat die Prüfung bestanden, obwohl er kaum ___ hatte.", options: ["gelernt", "gelehrt", "gelehnt", "geleert"], correct: 0, explanation: "«lernen» = o'rganish; «lehren» = o'qitish." },
  { id: "de-b1-5", level: "B1", skill: "Reading", passage: "Immer mehr Berufstätige arbeiten von zu Hause. Sie sparen Fahrzeit, klagen aber oft darüber, dass der Kontakt zu Kollegen fehlt.", text: "Welcher Nachteil wird genannt?", options: ["Höhere Kosten", "Weniger sozialer Kontakt", "Längere Fahrzeit", "Schlechtere Bezahlung"], correct: 1, explanation: "Matnda hamkasblar bilan aloqa yetishmasligi aytilgan." },

  { id: "de-b2-1", level: "B2", skill: "Grammatik", text: "___ des schlechten Wetters fand das Konzert statt.", options: ["Wegen", "Trotz", "Während", "Statt"], correct: 1, explanation: "Qarama-qarshilik: «trotz + Genitiv» — yomon havoga qaramay." },
  { id: "de-b2-2", level: "B2", skill: "Grammatik", text: "Das ist der Kollege, ___ Vorschlag angenommen wurde.", options: ["dessen", "deren", "der", "den"], correct: 0, explanation: "Erkak jinsdagi egalik olmoshli nisbiy olmosh: «dessen»." },
  { id: "de-b2-3", level: "B2", skill: "Grammatik", text: "Er behauptet, er ___ nichts davon gewusst.", options: ["hat", "habe", "hätte", "haben"], correct: 1, explanation: "Bilvosita nutq — Konjunktiv I: «habe»." },
  { id: "de-b2-4", level: "B2", skill: "Vocabulary", text: "Die Firma musste erhebliche Verluste ___.", options: ["hinnehmen", "annehmen", "aufnehmen", "übernehmen"], correct: 0, explanation: "«Verluste hinnehmen» — zararga chidashga majbur bo'lmoq." },
  { id: "de-b2-5", level: "B2", skill: "Reading", passage: "Die Studie legt nahe, dass frühkindliche Mehrsprachigkeit kognitive Flexibilität fördert, wenngleich die Effekte im Erwachsenenalter schwächer ausfallen.", text: "Was sagt der Text aus?", options: ["Mehrsprachigkeit schadet Kindern.", "Der Effekt bleibt lebenslang gleich stark.", "Der Vorteil nimmt mit dem Alter ab.", "Die Studie ist widerlegt."], correct: 2, explanation: "«im Erwachsenenalter schwächer» — samara yosh ortishi bilan kamayadi." },

  { id: "de-c1-1", level: "C1", skill: "Grammatik", text: "___ hätte ich das Angebot niemals angenommen.", options: ["An deiner Stelle", "In deinem Platz", "Auf deine Stelle", "Bei dir Stelle"], correct: 0, explanation: "Turg'un ibora: «an deiner Stelle» — sening o'rningda." },
  { id: "de-c1-2", level: "C1", skill: "Grammatik", text: "Die zu ___ Aufgaben sind im Anhang aufgelistet.", options: ["lösende", "lösen", "gelösten", "lösender"], correct: 0, explanation: "Gerundivum: «zu + Partizip I» — hal qilinishi kerak bo'lgan." },
  { id: "de-c1-3", level: "C1", skill: "Vocabulary", text: "Seine Argumentation war zwar elegant, aber letztlich ___.", options: ["stichhaltig", "fadenscheinig", "tiefgründig", "schlüssig"], correct: 1, explanation: "«fadenscheinig» — asossiz, puch; qolganlari ijobiy ma'noda." },
  { id: "de-c1-4", level: "C1", skill: "Vocabulary", text: "Er nahm die Kritik mit ___ Gelassenheit hin.", options: ["stoischer", "stolzer", "stürmischer", "strenger"], correct: 0, explanation: "«stoische Gelassenheit» — barqaror kollokatsiya." },
  { id: "de-c1-5", level: "C1", skill: "Reading", passage: "Der Autor wendet sich gegen die verbreitete Annahme, technologische Innovation sei per se fortschrittlich; vielmehr, so sein Einwand, verschleiere dieser Glaube bestehende Machtasymmetrien.", text: "Welche Position vertritt der Autor?", options: ["Technik ist immer fortschrittlich.", "Technikglaube verdeckt Machtverhältnisse.", "Innovation sollte verboten werden.", "Machtasymmetrien existieren nicht."], correct: 1, explanation: "Muallif texnologiyaga ishonch hokimiyat tengsizligini yashiradi deydi." },
];

const en: Question[] = [
  { id: "en-a1-1", level: "A1", skill: "Grammatik", text: "She ___ a teacher.", options: ["am", "is", "are", "be"], correct: 1, explanation: "3-shaxs birlik bilan «is» ishlatiladi." },
  { id: "en-a1-2", level: "A1", skill: "Grammatik", text: "There ___ two books on the table.", options: ["is", "are", "was", "be"], correct: 1, explanation: "Ko'plik «two books» — «there are»." },
  { id: "en-a1-3", level: "A1", skill: "Vocabulary", text: "We buy medicine at the ___.", options: ["bakery", "pharmacy", "library", "garage"], correct: 1, explanation: "Pharmacy — dorixona." },
  { id: "en-a1-4", level: "A1", skill: "Vocabulary", text: "My father's sister is my ___.", options: ["aunt", "uncle", "niece", "cousin"], correct: 0, explanation: "Otaning singlisi — aunt (amma)." },
  { id: "en-a1-5", level: "A1", skill: "Reading", passage: "Hi, I'm Mia. I live in Madrid with my brother. I work in a small café.", text: "Where does Mia work?", options: ["In a school", "In a café", "In a shop", "At home"], correct: 1, explanation: "«I work in a small café»." },

  { id: "en-a2-1", level: "A2", skill: "Grammatik", text: "I ___ to Italy last summer.", options: ["go", "went", "have gone", "was going"], correct: 1, explanation: "«last summer» — aniq o'tgan vaqt, Past Simple." },
  { id: "en-a2-2", level: "A2", skill: "Grammatik", text: "This film is ___ than the other one.", options: ["interesting", "more interesting", "most interesting", "interestinger"], correct: 1, explanation: "Uzun sifat qiyosiy darajada «more + adjective»." },
  { id: "en-a2-3", level: "A2", skill: "Grammatik", text: "You ___ smoke here. It's forbidden.", options: ["mustn't", "don't have to", "needn't", "couldn't"], correct: 0, explanation: "Taqiq uchun «mustn't»; «don't have to» — shart emas." },
  { id: "en-a2-4", level: "A2", skill: "Vocabulary", text: "I'm looking ___ my keys.", options: ["at", "for", "after", "up"], correct: 1, explanation: "«look for» — izlamoq." },
  { id: "en-a2-5", level: "A2", skill: "Reading", passage: "The library opens at 9 a.m. on weekdays and closes at 6 p.m. On Saturdays it opens later, at 11 a.m. It is closed on Sundays.", text: "Which statement is true?", options: ["It opens at 9 on Saturday.", "It is closed on Sunday.", "It closes at 11 p.m.", "It opens every day at 9."], correct: 1, explanation: "«It is closed on Sundays»." },

  { id: "en-b1-1", level: "B1", skill: "Grammatik", text: "If I ___ more time, I would travel more.", options: ["have", "had", "will have", "having"], correct: 1, explanation: "Second conditional: if + past simple, would + infinitive." },
  { id: "en-b1-2", level: "B1", skill: "Grammatik", text: "She has lived here ___ 2015.", options: ["for", "since", "from", "during"], correct: 1, explanation: "Aniq boshlanish nuqtasi bilan «since»." },
  { id: "en-b1-3", level: "B1", skill: "Grammatik", text: "The report ___ by the manager yesterday.", options: ["wrote", "was written", "is written", "has written"], correct: 1, explanation: "O'tgan zamon passivi: was + V3." },
  { id: "en-b1-4", level: "B1", skill: "Vocabulary", text: "I can't ___ to buy a new laptop right now.", options: ["afford", "offer", "allow", "admit"], correct: 0, explanation: "«afford» — moliyaviy imkoni bo'lmoq." },
  { id: "en-b1-5", level: "B1", skill: "Reading", passage: "More employees now work remotely. They save commuting time, but many report feeling isolated from their colleagues.", text: "What disadvantage is mentioned?", options: ["Longer commute", "Feeling isolated", "Lower salary", "More meetings"], correct: 1, explanation: "Matnda yolg'izlik hissi aytilgan." },

  { id: "en-b2-1", level: "B2", skill: "Grammatik", text: "___ the heavy rain, the match went ahead.", options: ["Despite", "Although", "However", "Because of"], correct: 0, explanation: "«Despite + noun»; «although» gap bilan keladi." },
  { id: "en-b2-2", level: "B2", skill: "Grammatik", text: "I wish I ___ told her the truth.", options: ["have", "had", "would", "did"], correct: 1, explanation: "O'tmishdagi afsus: «wish + past perfect»." },
  { id: "en-b2-3", level: "B2", skill: "Grammatik", text: "Hardly ___ the door when the phone rang.", options: ["I had opened", "had I opened", "I opened", "did I open"], correct: 1, explanation: "«Hardly» gap boshida — inversiya: had I opened." },
  { id: "en-b2-4", level: "B2", skill: "Vocabulary", text: "The company had to ___ significant losses.", options: ["undergo", "incur", "commit", "engage"], correct: 1, explanation: "«incur losses» — barqaror kollokatsiya." },
  { id: "en-b2-5", level: "B2", skill: "Reading", passage: "The study suggests that early bilingualism enhances cognitive flexibility, although the effect appears less pronounced in adulthood.", text: "What does the text claim?", options: ["Bilingualism harms children.", "The benefit weakens with age.", "The effect is identical for all ages.", "The study was retracted."], correct: 1, explanation: "«less pronounced in adulthood» — samara yosh bilan susayadi." },

  { id: "en-c1-1", level: "C1", skill: "Grammatik", text: "___ for his intervention, the project would have collapsed.", options: ["Were it not", "If it was not", "Had not it", "Should it not"], correct: 0, explanation: "Rasmiy inversiyali shart: «Were it not for ...»." },
  { id: "en-c1-2", level: "C1", skill: "Grammatik", text: "No sooner ___ the announcement than shares plummeted.", options: ["they made", "did they make", "had they made", "they had made"], correct: 2, explanation: "«No sooner had + V3 ... than ...»." },
  { id: "en-c1-3", level: "C1", skill: "Vocabulary", text: "His argument was elegant but ultimately ___.", options: ["cogent", "specious", "compelling", "sound"], correct: 1, explanation: "«Specious» — tashqi ko'rinishi ishonarli, aslida asossiz." },
  { id: "en-c1-4", level: "C1", skill: "Vocabulary", text: "She accepted the criticism with ___ equanimity.", options: ["stoic", "stark", "staunch", "stern"], correct: 0, explanation: "«Stoic equanimity» — barqaror kollokatsiya." },
  { id: "en-c1-5", level: "C1", skill: "Reading", passage: "The author challenges the prevailing assumption that technological innovation is inherently progressive, contending instead that such faith obscures entrenched power asymmetries.", text: "What is the author's position?", options: ["Technology is always progressive.", "Faith in technology masks power imbalances.", "Innovation should be banned.", "Power asymmetries are imaginary."], correct: 1, explanation: "Muallif texnologiyaga ishonch hokimiyat tengsizligini yashirishini ta'kidlaydi." },
];

export const BANK: Record<Lang, Question[]> = { de, en };

export function questionsFor(lang: Lang, level: Level): Question[] {
  return BANK[lang].filter((q) => q.level === level);
}
