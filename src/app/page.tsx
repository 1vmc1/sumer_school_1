"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Button } from "antd";

/* ─────────────────────────────────────────────────────────────
   Данные для секций. {/* пример — можно заменить: цифры/факты *\/}
   ───────────────────────────────────────────────────────────── */

// Блок 3 — реальные рабочие задачи ML-инженера
const tasks = [
  {
    icon: "🧹",
    title: "Собирает и чистит данные",
    text: "Модель учится на данных, поэтому их сначала находят, приводят к порядку и убирают ошибки. «Мусор на входе — мусор на выходе».",
  },
  {
    icon: "🎯",
    title: "Обучает и дообучает модели",
    text: "Подбирает алгоритм и «скармливает» ему данные, чтобы модель научилась предсказывать: например, кто из абонентов скоро уйдёт.",
  },
  {
    icon: "📏",
    title: "Измеряет качество",
    text: "Проверяет метриками (числами качества), насколько модель точна, и честно отвечает: можно её запускать или ещё рано.",
  },
  {
    icon: "🚀",
    title: "Выводит модель в продакшн",
    text: "Превращает модель в сервис (API), которым пользуется приложение. Инференс — это когда обученная модель отвечает на реальные запросы.",
  },
  {
    icon: "📡",
    title: "Следит за моделью в бою",
    text: "Мониторит качество и дрифт данных (когда реальность меняется и модель устаревает), чтобы вовремя её переобучить.",
  },
  {
    icon: "⚡",
    title: "Ускоряет и удешевляет",
    text: "Оптимизирует скорость и стоимость инференса — чтобы ответы были быстрыми, а серверы не стоили как самолёт.",
  },
];

// Блок 4 — навыки
const hardSkills = [
  "Python — главный язык ML",
  "PyTorch / TensorFlow — нейросети",
  "pandas, NumPy — работа с данными",
  "SQL — доставать данные из баз",
  "Docker + основы MLOps — вывод в прод",
  "Статистика и линейная алгебра",
];
const softSkills = [
  "Аналитическое мышление",
  "Умение объяснять сложное просто",
  "Коммуникация и работа в команде",
  "Любопытство и желание разбираться",
  "Ответственность за результат в проде",
  "Терпение — эксперименты часто не взлетают",
];

// Блок 5 — путь в профессию
const path = [
  { step: "Python", text: "Освой основы программирования: переменные, циклы, функции, работа с файлами." },
  { step: "Математика", text: "Статистика и линейная алгебра на уровне понимания — без них ML это магия наугад." },
  { step: "Классический ML", text: "Регрессии, деревья, кластеризация на scikit-learn. Первые модели и метрики." },
  { step: "Нейросети", text: "PyTorch или TensorFlow: как устроено глубокое обучение, картинки и тексты." },
  { step: "Pet-проекты", text: "Сделай 2–3 своих проекта и выложи на GitHub — это твоё портфолио." },
  { step: "Стажировка", text: "Приходи стажёром в ИТ-команду — например, в ЭР-Телеком — и расти на реальных задачах." },
];

// Блок 6 — один день из жизни
const day = [
  { time: "09:30", title: "Утро — проверка «здоровья» моделей", text: "Смотрит дашборды: не просели ли метрики за ночь, нет ли дрифта данных, всё ли работает в проде." },
  { time: "11:00", title: "День — данные и эксперименты", text: "Готовит данные, запускает обучение новой версии модели, сравнивает с текущей. Пишет код, проходит код-ревью." },
  { time: "15:00", title: "После обеда — прод и коллеги", text: "Дорабатывает сервис инференса, обсуждает с аналитиками и продактами, какую задачу решать следующей." },
  { time: "18:00", title: "Вечер — итоги", text: "Фиксирует результаты экспериментов, планирует завтрашний день. Удачную модель готовит к выкатке." },
];

// Блок 7 — зачем это ЭР-Телеком
const business = [
  { icon: "📉", title: "Прогноз оттока абонентов", text: "Модель заранее показывает, кто из клиентов может уйти, — и компания успевает предложить выгодные условия." },
  { icon: "🛡️", title: "Антифрод", text: "ИИ ловит подозрительные операции и мошеннические схемы быстрее и точнее человека." },
  { icon: "📶", title: "Оптимизация сети", text: "Предсказывает нагрузку и сбои, помогает держать интернет и ТВ стабильными для миллионов домов." },
  { icon: "🎬", title: "Рекомендации", text: "Подсказывает абоненту фильмы и услуги, которые ему действительно интересны." },
  { icon: "💬", title: "Поддержка на базе ИИ", text: "Умные чат-боты и подсказки операторам решают вопросы клиентов быстрее." },
  { icon: "📊", title: "Аналитика больших данных", text: "Из терабайтов данных достаёт пользу для бизнес-решений всей компании." },
];

// Блок 8 — тест «Моё ли это?»
const quiz = [
  "Мне нравится докапываться, почему что-то работает именно так",
  "Я готов(а) разбираться в математике, если это даёт результат",
  "Мне интересно программировать и автоматизировать рутину",
  "Я спокойно отношусь к тому, что эксперимент может не сработать",
  "Мне нравится объяснять сложные вещи простыми словами",
];

// Блок 8 — карточки «миф / правда»
const myths = [
  { myth: "ML — это только для гениев-математиков", truth: "Нужна база и упорство. Большинство навыков осваивается практикой, а не врождённым талантом." },
  { myth: "Нейросети сами всё решают, человек не нужен", truth: "Модель — инструмент. Данные, постановку задачи и контроль качества делает инженер." },
  { myth: "Надо знать всё, прежде чем начать", truth: "Учатся в процессе. Первый проект можно собрать уже после основ Python и scikit-learn." },
  { myth: "ML-инженер весь день пишет умные формулы", truth: "Бо́льшая часть работы — это данные, код, тесты и вывод модели в продакшн." },
];

/* ─────────────────────────────────────────────────────────────
   Мелкие переиспользуемые элементы
   ───────────────────────────────────────────────────────────── */

const BRAND = "#0aa89e";
const DEEP = "#0b7d75";

function Section({
  id,
  eyebrow,
  title,
  subtitle,
  children,
  tinted = false,
}: {
  id?: string;
  eyebrow: string;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  tinted?: boolean;
}) {
  return (
    <section
      id={id}
      style={tinted ? { background: "#f6fbfb", borderTop: "1px solid var(--line)", borderBottom: "1px solid var(--line)" } : undefined}
    >
      <div className="max-w-6xl mx-auto px-4 py-16 md:py-20 reveal">
        <div style={{ color: BRAND, fontWeight: 700, fontSize: 13, letterSpacing: "0.08em", textTransform: "uppercase" }}>
          {eyebrow}
        </div>
        <h2 style={{ fontSize: "clamp(1.6rem, 4vw, 2.4rem)", fontWeight: 800, color: "var(--ink)", margin: "8px 0 0", lineHeight: 1.15 }}>
          {title}
        </h2>
        {subtitle && (
          <p style={{ color: "var(--ink-soft)", fontSize: "1.05rem", maxWidth: 680, marginTop: 12 }}>{subtitle}</p>
        )}
        <div style={{ marginTop: 36 }}>{children}</div>
      </div>
    </section>
  );
}

const cardStyle: React.CSSProperties = {
  background: "#fff",
  border: "1px solid var(--line)",
  borderRadius: 16,
  padding: "22px 22px",
  height: "100%",
  transition: "box-shadow 0.2s, transform 0.2s, border-color 0.2s",
};

function HoverCard({ children }: { children: React.ReactNode }) {
  const [hover, setHover] = useState(false);
  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        ...cardStyle,
        boxShadow: hover ? "0 12px 30px rgba(10,168,158,0.12)" : "0 1px 2px rgba(15,23,42,0.04)",
        transform: hover ? "translateY(-3px)" : "none",
        borderColor: hover ? "rgba(10,168,158,0.4)" : "var(--line)",
      }}
    >
      {children}
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   Интерактив 1 — тест «Моё ли это?»
   ───────────────────────────────────────────────────────────── */
function QuizBlock() {
  // answers[i] = true (про меня) / false (не очень) / undefined (не отвечено)
  const [answers, setAnswers] = useState<(boolean | undefined)[]>(Array(quiz.length).fill(undefined));
  const [done, setDone] = useState(false);

  const answered = answers.filter((a) => a !== undefined).length;
  const score = answers.filter((a) => a === true).length;

  const result =
    score >= 4
      ? { emoji: "🚀", head: "Похоже, это твоё!", text: "У тебя как раз тот склад ума, который нужен ML-инженеру. Загляни в раздел «С чего начать» — и вперёд." }
      : score >= 2
      ? { emoji: "🌱", head: "Есть хорошая основа", text: "Многое уже про тебя. Попробуй пройти вводный курс по Python и ML — вдруг это твоя профессия." }
      : { emoji: "🧭", head: "Присмотрись поближе", text: "Пока откликается не всё — и это нормально. Полистай сайт: возможно, профессия раскроется с новой стороны." };

  return (
    <HoverCard>
      {!done ? (
        <div>
          {quiz.map((q, i) => (
            <div key={i} style={{ padding: "14px 0", borderBottom: i < quiz.length - 1 ? "1px solid var(--line)" : "none" }}>
              <div style={{ color: "var(--ink)", fontWeight: 500, marginBottom: 10 }}>{i + 1}. {q}</div>
              <div className="flex gap-2 flex-wrap">
                {[
                  { label: "Это про меня", val: true },
                  { label: "Не очень", val: false },
                ].map((opt) => {
                  const active = answers[i] === opt.val;
                  return (
                    <button
                      key={String(opt.val)}
                      onClick={() => setAnswers((a) => a.map((x, idx) => (idx === i ? opt.val : x)))}
                      style={{
                        cursor: "pointer",
                        borderRadius: 10,
                        padding: "8px 16px",
                        fontSize: 14,
                        fontWeight: 500,
                        border: `1.5px solid ${active ? BRAND : "var(--line)"}`,
                        background: active ? BRAND : "#fff",
                        color: active ? "#fff" : "var(--ink-soft)",
                        transition: "all 0.15s",
                      }}
                    >
                      {opt.label}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
          <div className="flex items-center gap-4 flex-wrap" style={{ marginTop: 20 }}>
            <Button type="primary" size="large" disabled={answered < quiz.length} onClick={() => setDone(true)}>
              Показать результат
            </Button>
            <span style={{ color: "var(--ink-soft)", fontSize: 14 }}>
              Отвечено {answered} из {quiz.length}
            </span>
          </div>
        </div>
      ) : (
        <div style={{ textAlign: "center", padding: "16px 8px" }}>
          <div style={{ fontSize: 56 }}>{result.emoji}</div>
          <h3 style={{ fontSize: "1.6rem", fontWeight: 800, color: "var(--ink)", margin: "8px 0" }}>{result.head}</h3>
          <p style={{ color: "var(--ink-soft)", maxWidth: 480, margin: "0 auto 8px" }}>{result.text}</p>
          <p style={{ color: DEEP, fontWeight: 600 }}>Совпадений: {score} из {quiz.length}</p>
          <div className="flex gap-3 justify-center flex-wrap" style={{ marginTop: 16 }}>
            <Button onClick={() => { setDone(false); setAnswers(Array(quiz.length).fill(undefined)); }}>Пройти заново</Button>
            <Link href="#path"><Button type="primary">С чего начать</Button></Link>
          </div>
        </div>
      )}
    </HoverCard>
  );
}

/* ─────────────────────────────────────────────────────────────
   Интерактив 2 — карточки «миф / правда» (переворот по клику)
   ───────────────────────────────────────────────────────────── */
function FlipCard({ myth, truth }: { myth: string; truth: string }) {
  const [flipped, setFlipped] = useState(false);
  return (
    <button
      onClick={() => setFlipped((f) => !f)}
      style={{ perspective: 1000, border: "none", background: "none", padding: 0, cursor: "pointer", width: "100%", height: 200, textAlign: "left" }}
      aria-label="Перевернуть карточку"
    >
      <div
        style={{
          position: "relative",
          width: "100%",
          height: "100%",
          transition: "transform 0.5s",
          transformStyle: "preserve-3d",
          transform: flipped ? "rotateY(180deg)" : "none",
        }}
      >
        {/* Лицо — миф */}
        <div style={{ position: "absolute", inset: 0, backfaceVisibility: "hidden", borderRadius: 16, border: "1px solid var(--line)", background: "#fff", padding: 22, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
          <span style={{ color: "#ef4444", fontWeight: 700, fontSize: 12, letterSpacing: "0.06em", textTransform: "uppercase" }}>Миф</span>
          <p style={{ color: "var(--ink)", fontSize: "1.05rem", fontWeight: 500, margin: 0 }}>«{myth}»</p>
          <span style={{ color: "var(--ink-soft)", fontSize: 13 }}>Нажми, чтобы узнать правду →</span>
        </div>
        {/* Оборот — правда */}
        <div style={{ position: "absolute", inset: 0, backfaceVisibility: "hidden", transform: "rotateY(180deg)", borderRadius: 16, background: "linear-gradient(135deg, var(--brand-deep), var(--brand-bright))", color: "#fff", padding: 22, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
          <span style={{ fontWeight: 700, fontSize: 12, letterSpacing: "0.06em", textTransform: "uppercase", opacity: 0.9 }}>Правда</span>
          <p style={{ fontSize: "1rem", margin: 0 }}>{truth}</p>
          <span style={{ fontSize: 13, opacity: 0.85 }}>← Нажми, чтобы вернуться</span>
        </div>
      </div>
    </button>
  );
}

/* ─────────────────────────────────────────────────────────────
   Страница
   ───────────────────────────────────────────────────────────── */
export default function HomePage() {
  // Плавное появление секций при скролле
  const rootRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const els = rootRef.current?.querySelectorAll(".reveal") ?? [];
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add("is-visible")),
      { threshold: 0.12 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <div ref={rootRef}>
      {/* ── Блок 1 + 2: название и простое объяснение ── */}
      <section className="brand-hero-bg">
        <div className="max-w-6xl mx-auto px-4 pt-16 pb-20 md:pt-24 md:pb-28 text-center">
          <span
            className="inline-block reveal"
            style={{ background: "rgba(10,168,158,0.10)", color: DEEP, fontWeight: 600, fontSize: 14, padding: "6px 14px", borderRadius: 999 }}
          >
            Профессия будущего · ЭР-Телеком Холдинг
          </span>
          <h1 className="reveal" style={{ fontSize: "clamp(2.4rem, 8vw, 4.5rem)", fontWeight: 900, lineHeight: 1.05, margin: "20px 0 0", color: "var(--ink)" }}>
            <span className="brand-gradient-text">ML-инженер</span>
          </h1>
          <p className="reveal" style={{ fontSize: "1.25rem", color: "var(--ink)", fontWeight: 600, marginTop: 8 }}>
            Инженер машинного обучения
          </p>
          <p className="reveal" style={{ fontSize: "clamp(1.05rem, 2.5vw, 1.35rem)", color: "var(--ink-soft)", maxWidth: 720, margin: "20px auto 0", lineHeight: 1.6 }}>
            ML-инженер учит компьютер находить закономерности в данных и принимать решения самому:
            предсказывать, кто уйдёт к другому провайдеру, ловить мошенников, рекомендовать фильмы.
            Проще говоря — превращает данные в пользу для людей и бизнеса.
          </p>
          <div className="reveal flex gap-3 justify-center flex-wrap" style={{ marginTop: 32 }}>
            <Link href="#quiz"><Button type="primary" size="large">Пройти тест «Моё ли это?»</Button></Link>
            <Link href="#path"><Button size="large">С чего начать</Button></Link>
          </div>

          {/* Быстрые факты */}
          <div className="reveal grid grid-cols-3 gap-4" style={{ maxWidth: 620, margin: "48px auto 0" }}>
            {[
              { n: "№1", l: "по востребованности в ИИ" },
              { n: "6+", l: "задач бизнеса решает" },
              { n: "0→", l: "старт с нуля реален" },
            ].map((s) => (
              <div key={s.l}>
                <div style={{ fontSize: "clamp(1.4rem, 5vw, 2rem)", fontWeight: 800, color: DEEP }}>{s.n}</div>
                <div style={{ fontSize: 13, color: "var(--ink-soft)", marginTop: 4 }}>{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Блок 3: чем занимается ── */}
      <Section eyebrow="Чем занимается" title="Реальные задачи ML-инженера" subtitle="Не абстрактная наука, а конкретная работа: превратить сырые данные в модель, которая приносит пользу — и удержать её в рабочем состоянии.">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {tasks.map((t) => (
            <HoverCard key={t.title}>
              <div style={{ fontSize: 30 }}>{t.icon}</div>
              <h3 style={{ fontSize: "1.15rem", fontWeight: 700, color: "var(--ink)", margin: "12px 0 8px" }}>{t.title}</h3>
              <p style={{ color: "var(--ink-soft)", fontSize: 15, margin: 0, lineHeight: 1.55 }}>{t.text}</p>
            </HoverCard>
          ))}
        </div>
      </Section>

      {/* ── Блок 4: навыки ── */}
      <Section eyebrow="Навыки" title="Что нужно уметь" subtitle="Hard skills — это инструменты и знания. Soft skills — то, как ты думаешь и работаешь с людьми. Сильному инженеру нужны и те, и другие." tinted>
        <div className="grid gap-6 md:grid-cols-2">
          {[
            { head: "🛠️ Hard skills", sub: "Технические навыки", list: hardSkills, tint: "rgba(10,168,158,0.08)" },
            { head: "💬 Soft skills", sub: "Личные качества", list: softSkills, tint: "rgba(40,232,220,0.10)" },
          ].map((col) => (
            <div key={col.head} style={{ ...cardStyle, background: col.tint }}>
              <h3 style={{ fontSize: "1.3rem", fontWeight: 800, color: "var(--ink)", margin: 0 }}>{col.head}</h3>
              <div style={{ color: "var(--ink-soft)", fontSize: 14, marginBottom: 16 }}>{col.sub}</div>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "grid", gap: 12 }}>
                {col.list.map((s) => (
                  <li key={s} style={{ display: "flex", gap: 10, alignItems: "flex-start", color: "var(--ink)", fontSize: 15 }}>
                    <span style={{ color: DEEP, fontWeight: 800 }}>✓</span>
                    <span>{s}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Section>

      {/* ── Блок 5: путь ── */}
      <Section id="path" eyebrow="Дорожная карта" title="Как прийти в профессию" subtitle="Путь с нуля выглядит длинным, но он разбит на понятные шаги. Каждый следующий опирается на предыдущий — не нужно учить всё сразу.">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {path.map((p, i) => (
            <HoverCard key={p.step}>
              <div className="flex items-center gap-3" style={{ marginBottom: 10 }}>
                <span style={{ display: "grid", placeItems: "center", width: 34, height: 34, borderRadius: 10, background: "linear-gradient(135deg, var(--brand-deep), var(--brand-bright))", color: "#fff", fontWeight: 800 }}>{i + 1}</span>
                <h3 style={{ fontSize: "1.15rem", fontWeight: 700, color: "var(--ink)", margin: 0 }}>{p.step}</h3>
              </div>
              <p style={{ color: "var(--ink-soft)", fontSize: 15, margin: 0, lineHeight: 1.55 }}>{p.text}</p>
            </HoverCard>
          ))}
        </div>
      </Section>

      {/* ── Блок 6: один день ── */}
      <Section eyebrow="Изнутри" title="Один день из жизни" subtitle="Чтобы почувствовать профессию — вот как выглядит обычный рабочий день ML-инженера в ИТ-команде." tinted>
        <div style={{ position: "relative" }}>
          <div className="grid gap-5 md:grid-cols-2">
            {day.map((d) => (
              <div key={d.time} style={{ ...cardStyle, display: "flex", gap: 16, alignItems: "flex-start" }}>
                <div style={{ minWidth: 62, fontWeight: 800, color: DEEP, fontSize: "1.1rem" }}>{d.time}</div>
                <div>
                  <h3 style={{ fontSize: "1.1rem", fontWeight: 700, color: "var(--ink)", margin: "0 0 6px" }}>{d.title}</h3>
                  <p style={{ color: "var(--ink-soft)", fontSize: 15, margin: 0, lineHeight: 1.55 }}>{d.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* ── Блок 7: зачем ЭР-Телеком ── */}
      <Section eyebrow="Ценность для бизнеса" title="Зачем ML-инженер ЭР-Телеком Холдингу" subtitle="ЭР-Телеком — это интернет, ТВ и цифровые сервисы для миллионов домов. За таким масштабом стоят огромные данные — и модели, которые превращают их в качество услуг и экономию.">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {business.map((b) => (
            <HoverCard key={b.title}>
              <div style={{ fontSize: 30 }}>{b.icon}</div>
              <h3 style={{ fontSize: "1.15rem", fontWeight: 700, color: "var(--ink)", margin: "12px 0 8px" }}>{b.title}</h3>
              <p style={{ color: "var(--ink-soft)", fontSize: 15, margin: 0, lineHeight: 1.55 }}>{b.text}</p>
            </HoverCard>
          ))}
        </div>
      </Section>

      {/* ── Блок 8: интерактив — тест ── */}
      <Section id="quiz" eyebrow="Интерактив" title="Тест: подходит ли тебе профессия?" subtitle="Ответь на 5 вопросов честно — и узнай, насколько склад твоего ума подходит ML-инженеру. Никаких «правильных» ответов, просто про тебя." tinted>
        <div style={{ maxWidth: 720, margin: "0 auto" }}>
          <QuizBlock />
        </div>
      </Section>

      {/* ── Блок 8: интерактив — миф/правда ── */}
      <Section eyebrow="Интерактив" title="Миф или правда?" subtitle="Нажми на карточку и переверни её — проверь, что из этого о профессии правда, а что застрявший стереотип.">
        <div className="grid gap-5 sm:grid-cols-2">
          {myths.map((m) => (
            <FlipCard key={m.myth} {...m} />
          ))}
        </div>
      </Section>

      {/* ── Финальный призыв ── */}
      <section className="brand-hero-bg">
        <div className="max-w-4xl mx-auto px-4 py-20 text-center reveal">
          <h2 style={{ fontSize: "clamp(1.8rem, 5vw, 2.8rem)", fontWeight: 900, color: "var(--ink)", margin: 0 }}>
            Готов сделать первый шаг?
          </h2>
          <p style={{ color: "var(--ink-soft)", fontSize: "1.15rem", maxWidth: 560, margin: "16px auto 28px" }}>
            Посмотри примеры проектов, попробуй интерактивную RL-игру и собери подборку ресурсов для старта.
          </p>
          <div className="flex gap-3 justify-center flex-wrap">
            <Link href="/rl-game"><Button type="primary" size="large">Попробовать RL-игру</Button></Link>
            <Link href="/resources"><Button size="large">Ресурсы для старта</Button></Link>
          </div>
        </div>
      </section>
    </div>
  );
}
